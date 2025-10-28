import { supabase } from '../config/supabase';
import type { User, Ticket, Notification } from '../config/supabase';

// ============================================
// AUTHENTICATION SERVICES
// ============================================

/**
 * Sign up a new user with email and password
 */
export const signUp = async (email: string, password: string, fullName: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * Sign in an existing user
 */
export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * Sign out the current user
 */
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * Get the current user session
 */
export const getCurrentUser = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session?.user || null;
  } catch (error) {
    return null;
  }
};

/**
 * Send password reset email
 */
export const resetPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'dreamticket://reset-password',
    });
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * Update user password
 */
export const updatePassword = async (newPassword: string) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * Sign in with OAuth provider (Facebook, Google)
 */
export const signInWithOAuth = async (provider: 'facebook' | 'google') => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: 'dreamticket://auth/callback',
      },
    });
    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// ============================================
// USER PROFILE SERVICES
// ============================================

/**
 * Get user profile data
 */
export const getUserProfile = async (userId: string): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .maybeSingle(); // Use maybeSingle() instead of single() to handle no rows gracefully

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

/**
 * Create user profile if it doesn't exist
 */
export const createUserProfile = async (userId: string, email: string, fullName?: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          id: userId,
          email: email,
          full_name: fullName || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * Get or create user profile (handles both cases)
 */
export const getOrCreateUserProfile = async (userId: string, email: string, fullName?: string): Promise<User | null> => {
  try {
    // First try to get existing profile
    let profile = await getUserProfile(userId);
    
    // If no profile exists, create one
    if (!profile) {
      console.log('No profile found, creating new one...');
      const createResult = await createUserProfile(userId, email, fullName);
      if (createResult.success) {
        profile = createResult.data;
      }
    }
    
    return profile;
  } catch (error) {
    console.error('Error getting or creating user profile:', error);
    return null;
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (userId: string, updates: Partial<User>) => {
  try {
    console.log('Updating user profile for:', userId);
    console.log('Updates:', updates);
    
    const { data, error } = await supabase
      .from('users')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
    
    console.log('Profile updated successfully:', data);
    return { success: true, data };
  } catch (error: any) {
    console.error('Failed to update profile:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Upload user avatar to Supabase Storage
 */
export const uploadAvatar = async (userId: string, imageUri: string) => {
  try {
    console.log('Starting avatar upload for user:', userId);
    console.log('Image URI:', imageUri);
    
    // Generate unique filename
    const fileExt = imageUri.split('.').pop() || 'jpg';
    const fileName = `${userId}_${Date.now()}.${fileExt}`;
    
    console.log('Uploading file:', fileName);

    // For React Native, create a file object that Supabase can handle
    const file = {
      uri: imageUri,
      type: `image/${fileExt}`,
      name: fileName,
    };

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('user-avatars')
      .upload(fileName, file as any, {
        cacheControl: '3600',
        upsert: true,
        contentType: `image/${fileExt}`,
      });

    if (error) {
      console.error('Upload error:', error);
      throw error;
    }

    console.log('Upload successful:', data);

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('user-avatars')
      .getPublicUrl(fileName);

    console.log('Public URL:', publicUrl);

    return { success: true, url: publicUrl };
  } catch (error: any) {
    console.error('Avatar upload failed:', error);
    return { success: false, error: error.message };
  }
};

// ============================================
// TICKET SERVICES
// ============================================

/**
 * Save a generated ticket to the database
 */
export const saveTicket = async (ticket: Omit<Ticket, 'id' | 'created_at'>) => {
  try {
    const { data, error } = await supabase
      .from('tickets')
      .insert([ticket])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * Get all tickets for a user
 */
export const getUserTickets = async (userId: string): Promise<Ticket[]> => {
  try {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return [];
  }
};

/**
 * Delete a ticket
 */
export const deleteTicket = async (ticketId: string) => {
  try {
    const { error } = await supabase
      .from('tickets')
      .delete()
      .eq('id', ticketId);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * Upload ticket image to Supabase Storage
 */
export const uploadTicketImage = async (userId: string, imageUri: string) => {
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const fileName = `${userId}_${Date.now()}.png`;
    const filePath = `tickets/${fileName}`;

    const { data, error } = await supabase.storage
      .from('ticket-images')
      .upload(filePath, blob, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('ticket-images')
      .getPublicUrl(filePath);

    return { success: true, url: publicUrl };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// ============================================
// NOTIFICATION SERVICES
// ============================================

/**
 * Get user notifications
 */
export const getUserNotifications = async (userId: string): Promise<Notification[]> => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};

/**
 * Get notifications for a user
 */
export const getNotifications = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * Mark notification as read
 */
export const markNotificationAsRead = async (notificationId: string) => {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * Delete a notification
 */
export const deleteNotification = async (notificationId: string) => {
  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * Clear all notifications for a user
 */
export const clearAllNotifications = async (userId: string) => {
  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// ============================================
// REAL-TIME SUBSCRIPTIONS
// ============================================

/**
 * Subscribe to new notifications in real-time
 */
export const subscribeToNotifications = (
  userId: string,
  callback: (notification: Notification) => void
) => {
  return supabase
    .channel('notifications')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        callback(payload.new as Notification);
      }
    )
    .subscribe();
};

// ============================================
// ACCOUNT SETTINGS SERVICES
// ============================================

/**
 * Change user password
 */
export const changePassword = async (currentPassword: string, newPassword: string) => {
  try {
    console.log('Changing password...');
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    // Update password using Supabase Auth
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      console.error('Password change error:', error);
      throw error;
    }

    console.log('Password changed successfully');
    return { success: true };
  } catch (error: any) {
    console.error('Failed to change password:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get user settings
 */
export const getUserSettings = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      throw error;
    }

    return { success: true, data: data || null };
  } catch (error: any) {
    console.error('Error fetching user settings:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update user settings
 */
export const updateUserSettings = async (userId: string, settings: {
  auto_backup?: boolean;
  sound_effects?: boolean;
  haptic_feedback?: boolean;
  notifications_enabled?: boolean;
  theme_preference?: string;
}) => {
  try {
    console.log('Updating user settings for:', userId);
    console.log('Settings:', settings);

    // First, try to get existing settings
    const { data: existingSettings, error: fetchError } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single();

    let result;
    if (fetchError && fetchError.code === 'PGRST116') {
      // No existing settings, create new ones
      console.log('No existing settings found, creating new ones...');
      result = await supabase
        .from('user_settings')
        .insert({
          user_id: userId,
          ...settings,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();
    } else if (fetchError) {
      throw fetchError;
    } else {
      // Update existing settings
      console.log('Updating existing settings...');
      result = await supabase
        .from('user_settings')
        .update({
          ...settings,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId)
        .select()
        .single();
    }

    if (result.error) {
      console.error('Error updating settings:', result.error);
      throw result.error;
    }

    console.log('Settings updated successfully:', result.data);
    return { success: true, data: result.data };
  } catch (error: any) {
    console.error('Failed to update settings:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Clear user cache/data
 */
export const clearUserCache = async (userId: string) => {
  try {
    console.log('Clearing cache for user:', userId);
    
    // Clear cached tickets (optional - you might want to keep some)
    const { error: ticketsError } = await supabase
      .from('tickets')
      .delete()
      .eq('user_id', userId)
      .eq('is_cached', true); // Assuming you have an is_cached field

    if (ticketsError) {
      console.warn('Error clearing cached tickets:', ticketsError);
    }

    // Clear cached images from storage (optional)
    const { data: files, error: listError } = await supabase.storage
      .from('ticket-images')
      .list(userId);

    if (!listError && files) {
      const fileNames = files.map(file => file.name);
      if (fileNames.length > 0) {
        const { error: deleteError } = await supabase.storage
          .from('ticket-images')
          .remove(fileNames);
        
        if (deleteError) {
          console.warn('Error clearing cached images:', deleteError);
        }
      }
    }

    console.log('Cache cleared successfully');
    return { success: true };
  } catch (error: any) {
    console.error('Failed to clear cache:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get storage usage for user
 */
export const getUserStorageUsage = async (userId: string) => {
  try {
    console.log('Getting storage usage for user:', userId);
    
    // Get ticket images
    const { data: ticketImages, error: ticketError } = await supabase.storage
      .from('ticket-images')
      .list(userId);

    // Get avatar
    const { data: avatarFiles, error: avatarError } = await supabase.storage
      .from('user-avatars')
      .list(userId);

    let totalSize = 0;
    let fileCount = 0;

    if (!ticketError && ticketImages) {
      totalSize += ticketImages.reduce((sum, file) => sum + (file.metadata?.size || 0), 0);
      fileCount += ticketImages.length;
    }

    if (!avatarError && avatarFiles) {
      totalSize += avatarFiles.reduce((sum, file) => sum + (file.metadata?.size || 0), 0);
      fileCount += avatarFiles.length;
    }

    const usage = {
      totalSizeBytes: totalSize,
      totalSizeMB: Math.round((totalSize / (1024 * 1024)) * 100) / 100,
      fileCount,
      ticketImages: ticketImages?.length || 0,
      avatarFiles: avatarFiles?.length || 0,
    };

    console.log('Storage usage:', usage);
    return { success: true, data: usage };
  } catch (error: any) {
    console.error('Failed to get storage usage:', error);
    return { success: false, error: error.message };
  }
};

