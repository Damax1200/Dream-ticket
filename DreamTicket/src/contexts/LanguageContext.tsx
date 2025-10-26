import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type LanguageType = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'zh';

interface Translations {
  // Auth
  welcomeBack: string;
  signInToContinue: string;
  signIn: string;
  createAccount: string;
  email: string;
  password: string;
  fullName: string;
  confirmPassword: string;
  forgotPassword: string;
  dontHaveAccount: string;
  alreadyHaveAccount: string;
  orSignUpWith: string;
  orSignInWith: string;
  continueWithFacebook: string;
  continueWithGoogle: string;
  creatingAccount: string;
  signingIn: string;
  
  // Navigation
  home: string;
  aiGenerator: string;
  generator: string;
  
  // Home
  welcome: string;
  exploreTickets: string;
  myTickets: string;
  
  // AI Ticket Generator
  dreamTicketGenerator: string;
  createLuckyTicket: string;
  uploadPhoto: string;
  takePhoto: string;
  uploadVideo: string;
  generateLuckyTicket: string;
  yourLuckyNumber: string;
  share: string;
  createNew: string;
  
  // Profile
  profile: string;
  personalInfo: string;
  preferences: string;
  changeLanguage: string;
  changeTheme: string;
  notifications: string;
  emailUpdates: string;
  saveChanges: string;
  logout: string;
  
  // Lucky Messages
  luckShines: string;
  dreamActivated: string;
  fortuneFavors: string;
  luckyMoment: string;
  dreamsComeTrue: string;
  magicInAir: string;
  starsAligned: string;
  luckOnSide: string;
  
  // Home Screen
  createLuckyTicketAI: string;
  premiumMember: string;
  freeUser: string;
  totalTickets: string;
  today: string;
  quickActions: string;
  createLuckyTicketAction: string;
  uploadPhotoVideo: string;
  savedTickets: string;
  howItWorks: string;
  uploadMedia: string;
  photoOrVideo: string;
  aiMagic: string;
  generatesLuckyNumber: string;
  getTicket: string;
  personalizedDreamTicket: string;
  shareAction: string;
  saveShareFriends: string;
  upgradeToPremium: string;
  premiumFeature1: string;
  premiumFeature2: string;
  premiumFeature3: string;
  premiumFeature4: string;
  perMonth: string;
  upgradeNow: string;
  disclaimerText: string;
  
  // Ticket Screen
  noTicketsYet: string;
  noTicketsMessage: string;
  ticketId: string;
  createdOn: string;
  deleteTicket: string;
  confirmDelete: string;
  confirmDeleteMessage: string;
  cancel: string;
  delete: string;
  
  // Profile Menu Items
  paymentMethods: string;
  helpSupport: string;
  settings: string;
  account: string;
  comingSoon: string;
  paymentMethodsComingSoon: string;
  notificationSettingsComingSoon: string;
  helpSupportComingSoon: string;
  settingsComingSoon: string;
  
  // Additional Auth & Legal
  termsConditions: string;
  privacyPolicy: string;
  changePassword: string;
  
  // Notifications Screen
  youreAllCaughtUp: string;
  noNewNotifications: string;
  
  // Settings Screen
  storageData: string;
  appVersion: string;
  buildNumber: string;
  accountSecurity: string;
  currentPassword: string;
  enterCurrentPassword: string;
  newPassword: string;
  enterNewPassword: string;
  confirmNewPassword: string;
  confirmNewPasswordPlaceholder: string;
  appSettings: string;
  autoBackup: string;
  backupTicketsAutomatically: string;
  soundEffects: string;
  playSoundsInApp: string;
  hapticFeedback: string;
  vibrationOnInteractions: string;
  clearCache: string;
  freeUpStorageSpace: string;
  storageUsage: string;
  about: string;
  error: string;
  success: string;
  pleaseFillAllPasswordFields: string;
  newPasswordsDoNotMatch: string;
  passwordMustBe6Characters: string;
  passwordChangedSuccessfully: string;
  areYouSureWantToClearCache: string;
  clear: string;
  cacheCleared: string;
  info: string;
  totalStorage: string;
  mbUsed: string;
  
  // Edit Profile
  editProfile: string;
  name: string;
  age: string;
  phone: string;
  location: string;
  bio: string;
  selectPhoto: string;
  
  // Common Actions
  close: string;
  save: string;
  edit: string;
  update: string;
  
  // Notifications Settings
  pushNotifications: string;
  receiveUpdates: string;
  promotionalEmails: string;
  
  // Notification Messages
  unread: string;
  clearAll: string;
  hoursAgo: string;
  dayAgo: string;
  daysAgo: string;
  welcomeToDreamTicket: string;
  thankYouForJoining: string;
  newFeatureAvailable: string;
  checkOutNewAiGenerator: string;
  ticketGenerated: string;
  yourLuckyTicketCreated: string;
  premiumUpgrade: string;
  upgradeToPremiumUnlimited: string;
}

const translations: Record<LanguageType, Translations> = {
  en: {
    welcomeBack: 'Welcome Back!',
    signInToContinue: 'Sign in to continue to Dream Ticket',
    signIn: 'Sign In',
    createAccount: 'Create Account',
    email: 'Email Address',
    password: 'Password',
    fullName: 'Full Name',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password?',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    orSignUpWith: 'OR SIGN UP WITH',
    orSignInWith: 'OR SIGN IN WITH',
    continueWithFacebook: 'Continue with Facebook',
    continueWithGoogle: 'Continue with Google',
    creatingAccount: 'Creating Account...',
    signingIn: 'Signing In...',
    home: 'HOME',
    aiGenerator: 'AI Ticket Generator',
    generator: 'GENERATOR',
    welcome: 'Welcome',
    exploreTickets: 'Explore Tickets',
    myTickets: 'My Tickets',
    dreamTicketGenerator: 'DreamTicket Generator',
    createLuckyTicket: 'Create your lucky ticket with AI magic',
    uploadPhoto: 'Upload Photo',
    takePhoto: 'Take Photo',
    uploadVideo: 'Upload Video',
    generateLuckyTicket: 'Generate Lucky Ticket',
    yourLuckyNumber: 'Your Lucky Number',
    share: 'Share',
    createNew: 'Create New',
    profile: 'Profile',
    personalInfo: 'Personal Information',
    preferences: 'Preferences',
    changeLanguage: 'Change Language',
    changeTheme: 'Change Theme',
    notifications: 'Notifications',
    emailUpdates: 'Email Updates',
    saveChanges: 'Save Changes',
    logout: 'Logout',
    luckShines: 'Your brilliance illuminates the path ahead! ✨\nEvery dream you dare to dream is within your reach.\nYour courage ignites unstoppable momentum.\nBelieve in your infinite potential and divine purpose.\nThe universe conspires in your favor—victory is yours!',
    dreamActivated: 'Your vision is awakening into reality! 🎫\nStrength flows through every fiber of your being.\nYou are destined for extraordinary achievements.\nEmbrace your power and step boldly into greatness.\nThis is your moment—claim it with confidence!',
    fortuneFavors: 'Fortune smiles upon your fearless heart! 🍀\nYour resilience transforms obstacles into opportunities.\nAbundance and prosperity align with your purpose.\nYou possess the strength to conquer any challenge.\nSuccess is not a dream—it is your destiny!',
    luckyMoment: 'This is your defining moment of triumph! 🌟\nYour passion fuels unstoppable progress toward greatness.\nEvery step forward is a step toward your breakthrough.\nYou are worthy of every blessing coming your way.\nRise with purpose, shine with confidence!',
    dreamsComeTrue: 'Your dreams are manifesting into reality! 💫\nYou carry within you the strength of champions.\nNo force can stop your determined spirit.\nYour journey is guided by clarity and purpose.\nEmbrace your power—miracles are unfolding now!',
    magicInAir: 'Divine energy surrounds your every move! ✨\nYour potential is limitless, your spirit unbreakable.\nYou are meant for greatness beyond imagination.\nEvery challenge strengthens your resolve and vision.\nStep forward boldly—the world awaits your brilliance!',
    starsAligned: 'The cosmos aligns to amplify your success! ⭐\nYour vision is clear, your purpose unwavering.\nStrength and wisdom guide your every decision.\nYou are a force of nature, destined to inspire.\nYour breakthrough moment has arrived—seize it!',
    luckOnSide: 'Victory flows through your courageous actions! 🎰\nYou possess unstoppable energy and relentless determination.\nEvery dream you pursue is within your grasp.\nYour purpose is powerful, your future bright.\nBelieve fiercely—greatness is your birthright!',
    createLuckyTicketAI: 'Create your lucky ticket with AI magic',
    premiumMember: '⭐ Premium Member',
    freeUser: '🆓 Free User',
    totalTickets: 'Total Tickets',
    today: 'Today',
    quickActions: 'Quick Actions',
    createLuckyTicketAction: 'Create Lucky Ticket',
    uploadPhotoVideo: 'Upload photo or video',
    savedTickets: 'saved tickets',
    howItWorks: 'How It Works',
    uploadMedia: 'Upload Media',
    photoOrVideo: 'Photo or video (5-10 seconds)',
    aiMagic: 'AI Magic',
    generatesLuckyNumber: 'Generates lucky number',
    getTicket: 'Get Ticket',
    personalizedDreamTicket: 'Personalized DreamTicket',
    shareAction: 'Share',
    saveShareFriends: 'Save and share with friends',
    upgradeToPremium: 'Upgrade to Premium',
    premiumFeature1: '3 video tickets per day (5-10 seconds)',
    premiumFeature2: 'Unlimited image tickets',
    premiumFeature3: 'Priority AI processing',
    premiumFeature4: 'Exclusive visual effects',
    perMonth: '/month',
    upgradeNow: 'Upgrade Now',
    disclaimerText: '💡 DreamTicket is a visual entertainment app. All tickets are symbolic and for fun only. No real lottery or prizes.',
    noTicketsYet: 'No Tickets Yet',
    noTicketsMessage: 'Create your first dream ticket to see it here!',
    ticketId: 'Ticket ID',
    createdOn: 'Created on',
    deleteTicket: 'Delete Ticket',
    confirmDelete: 'Delete Ticket?',
    confirmDeleteMessage: 'Are you sure you want to delete this ticket? This action cannot be undone.',
    cancel: 'Cancel',
    delete: 'Delete',
    paymentMethods: 'Payment Methods',
    helpSupport: 'Help & Support',
    settings: 'Settings',
    account: 'Account',
    comingSoon: 'Coming Soon',
    paymentMethodsComingSoon: 'Payment methods feature coming soon!',
    notificationSettingsComingSoon: 'Notification settings coming soon!',
    helpSupportComingSoon: 'Help & support coming soon!',
    settingsComingSoon: 'Settings coming soon!',
    termsConditions: 'Terms & Conditions',
    privacyPolicy: 'Privacy Policy',
    changePassword: 'Change Password',
    youreAllCaughtUp: "You're all caught up!",
    noNewNotifications: 'No new notifications',
    storageData: 'Storage & Data',
    appVersion: 'App Version',
    buildNumber: 'Build Number',
    accountSecurity: 'Account Security',
    currentPassword: 'Current Password',
    enterCurrentPassword: 'Enter current password',
    newPassword: 'New Password',
    enterNewPassword: 'Enter new password',
    confirmNewPassword: 'Confirm New Password',
    confirmNewPasswordPlaceholder: 'Confirm new password',
    appSettings: 'App Settings',
    autoBackup: 'Auto Backup',
    backupTicketsAutomatically: 'Backup tickets automatically',
    soundEffects: 'Sound Effects',
    playSoundsInApp: 'Play sounds in app',
    hapticFeedback: 'Haptic Feedback',
    vibrationOnInteractions: 'Vibration on interactions',
    clearCache: 'Clear Cache',
    freeUpStorageSpace: 'Free up storage space',
    storageUsage: 'Storage Usage',
    about: 'About',
    error: 'Error',
    success: 'Success',
    pleaseFillAllPasswordFields: 'Please fill in all password fields',
    newPasswordsDoNotMatch: 'New passwords do not match',
    passwordMustBe6Characters: 'Password must be at least 6 characters',
    passwordChangedSuccessfully: 'Password changed successfully!',
    areYouSureWantToClearCache: 'Are you sure you want to clear app cache?',
    clear: 'Clear',
    cacheCleared: 'Cache cleared successfully!',
    info: 'Info',
    totalStorage: 'Total storage',
    mbUsed: 'MB used',
    editProfile: 'Edit Profile',
    name: 'Name',
    age: 'Age',
    phone: 'Phone',
    location: 'Location',
    bio: 'Bio',
    selectPhoto: 'Select Photo',
    close: 'Close',
    save: 'Save',
    edit: 'Edit',
    update: 'Update',
    pushNotifications: 'Push Notifications',
    receiveUpdates: 'Receive Updates',
    promotionalEmails: 'Promotional Emails',
    unread: 'unread',
    clearAll: 'Clear All',
    hoursAgo: 'hours ago',
    dayAgo: 'day ago',
    daysAgo: 'days ago',
    welcomeToDreamTicket: '🎉 Welcome to DreamTicket!',
    thankYouForJoining: 'Thank you for joining us. Create your first lucky ticket now!',
    newFeatureAvailable: '✨ New Feature Available',
    checkOutNewAiGenerator: 'Check out our new AI-powered ticket generator with enhanced effects!',
    ticketGenerated: '🎫 Ticket Generated',
    yourLuckyTicketCreated: 'Your lucky ticket #12345 has been created successfully!',
    premiumUpgrade: '⚡ Premium Upgrade',
    upgradeToPremiumUnlimited: 'Upgrade to premium and unlock unlimited tickets!',
  },
  es: {
    welcomeBack: '¡Bienvenido de nuevo!',
    signInToContinue: 'Inicia sesión para continuar a Dream Ticket',
    signIn: 'Iniciar Sesión',
    createAccount: 'Crear Cuenta',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    fullName: 'Nombre Completo',
    confirmPassword: 'Confirmar Contraseña',
    forgotPassword: '¿Olvidaste tu contraseña?',
    dontHaveAccount: '¿No tienes cuenta?',
    alreadyHaveAccount: '¿Ya tienes cuenta?',
    orSignUpWith: 'O REGÍSTRATE CON',
    orSignInWith: 'O INICIA SESIÓN CON',
    continueWithFacebook: 'Continuar con Facebook',
    continueWithGoogle: 'Continuar con Google',
    creatingAccount: 'Creando Cuenta...',
    signingIn: 'Iniciando Sesión...',
    home: 'INICIO',
    aiGenerator: 'Generador de Tickets IA',
    generator: 'GENERADOR',
    welcome: 'Bienvenido',
    exploreTickets: 'Explorar Tickets',
    myTickets: 'Mis Tickets',
    dreamTicketGenerator: 'Generador DreamTicket',
    createLuckyTicket: 'Crea tu ticket de la suerte con magia IA',
    uploadPhoto: 'Subir Foto',
    takePhoto: 'Tomar Foto',
    uploadVideo: 'Subir Video',
    generateLuckyTicket: 'Generar Ticket de la Suerte',
    yourLuckyNumber: 'Tu Número de la Suerte',
    share: 'Compartir',
    createNew: 'Crear Nuevo',
    profile: 'Perfil',
    personalInfo: 'Información Personal',
    preferences: 'Preferencias',
    changeLanguage: 'Cambiar Idioma',
    changeTheme: 'Cambiar Tema',
    notifications: 'Notificaciones',
    emailUpdates: 'Actualizaciones por Email',
    saveChanges: 'Guardar Cambios',
    logout: 'Cerrar Sesión',
    luckShines: '¡Tu brillantez ilumina el camino por delante! ✨\nCada sueño que te atreves a soñar está a tu alcance.\nTu coraje enciende un impulso imparable.\nCree en tu potencial infinito y propósito divino.\n¡El universo conspira a tu favor—la victoria es tuya!',
    dreamActivated: '¡Tu visión está despertando a la realidad! 🎫\nLa fuerza fluye por cada fibra de tu ser.\nEstás destinado a logros extraordinarios.\nAcepta tu poder y avanza con valentía hacia la grandeza.\n¡Este es tu momento—reclámalo con confianza!',
    fortuneFavors: '¡La fortuna sonríe a tu corazón intrépido! 🍀\nTu resiliencia transforma obstáculos en oportunidades.\nLa abundancia y prosperidad se alinean con tu propósito.\nPosees la fuerza para conquistar cualquier desafío.\n¡El éxito no es un sueño—es tu destino!',
    luckyMoment: '¡Este es tu momento definitorio de triunfo! 🌟\nTu pasión impulsa un progreso imparable hacia la grandeza.\nCada paso adelante es un paso hacia tu avance.\nEres digno de cada bendición que viene en tu camino.\n¡Levántate con propósito, brilla con confianza!',
    dreamsComeTrue: '¡Tus sueños se están manifestando en realidad! 💫\nLlevas dentro de ti la fuerza de los campeones.\nNinguna fuerza puede detener tu espíritu determinado.\nTu viaje está guiado por claridad y propósito.\n¡Acepta tu poder—los milagros se están desplegando ahora!',
    magicInAir: '¡La energía divina rodea cada uno de tus movimientos! ✨\nTu potencial es ilimitado, tu espíritu inquebrantable.\nEstás destinado a una grandeza más allá de la imaginación.\nCada desafío fortalece tu resolución y visión.\n¡Avanza con valentía—el mundo espera tu brillantez!',
    starsAligned: '¡El cosmos se alinea para amplificar tu éxito! ⭐\nTu visión es clara, tu propósito inquebrantable.\nLa fuerza y sabiduría guían cada una de tus decisiones.\nEres una fuerza de la naturaleza, destinado a inspirar.\n¡Tu momento de avance ha llegado—aprovéchalo!',
    luckOnSide: '¡La victoria fluye a través de tus acciones valientes! 🎰\nPosees energía imparable y determinación incansable.\nCada sueño que persigues está a tu alcance.\nTu propósito es poderoso, tu futuro brillante.\n¡Cree ferozmente—la grandeza es tu derecho de nacimiento!',
    createLuckyTicketAI: 'Crea tu ticket de la suerte con magia IA',
    premiumMember: '⭐ Miembro Premium',
    freeUser: '🆓 Usuario Gratis',
    totalTickets: 'Tickets Totales',
    today: 'Hoy',
    quickActions: 'Acciones Rápidas',
    createLuckyTicketAction: 'Crear Ticket de la Suerte',
    uploadPhotoVideo: 'Subir foto o video',
    savedTickets: 'tickets guardados',
    howItWorks: 'Cómo Funciona',
    uploadMedia: 'Subir Medios',
    photoOrVideo: 'Foto o video (5-10 segundos)',
    aiMagic: 'Magia IA',
    generatesLuckyNumber: 'Genera número de la suerte',
    getTicket: 'Obtener Ticket',
    personalizedDreamTicket: 'DreamTicket Personalizado',
    shareAction: 'Compartir',
    saveShareFriends: 'Guarda y comparte con amigos',
    upgradeToPremium: 'Actualizar a Premium',
    premiumFeature1: '3 tickets de video por día (5-10 segundos)',
    premiumFeature2: 'Tickets de imagen ilimitados',
    premiumFeature3: 'Procesamiento IA prioritario',
    premiumFeature4: 'Efectos visuales exclusivos',
    perMonth: '/mes',
    upgradeNow: 'Actualizar Ahora',
    disclaimerText: '💡 DreamTicket es una aplicación de entretenimiento visual. Todos los tickets son simbólicos y solo para diversión. Sin lotería ni premios reales.',
    noTicketsYet: 'Sin Tickets Aún',
    noTicketsMessage: '¡Crea tu primer dream ticket para verlo aquí!',
    ticketId: 'ID de Ticket',
    createdOn: 'Creado el',
    deleteTicket: 'Eliminar Ticket',
    confirmDelete: '¿Eliminar Ticket?',
    confirmDeleteMessage: '¿Estás seguro de que quieres eliminar este ticket? Esta acción no se puede deshacer.',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    paymentMethods: 'Métodos de Pago',
    helpSupport: 'Ayuda y Soporte',
    settings: 'Configuración',
    account: 'Cuenta',
    comingSoon: 'Próximamente',
    paymentMethodsComingSoon: '¡La función de métodos de pago llegará pronto!',
    notificationSettingsComingSoon: '¡La configuración de notificaciones llegará pronto!',
    helpSupportComingSoon: '¡Ayuda y soporte llegarán pronto!',
    settingsComingSoon: '¡La configuración llegará pronto!',
    termsConditions: 'Términos y Condiciones',
    privacyPolicy: 'Política de Privacidad',
    changePassword: 'Cambiar Contraseña',
    youreAllCaughtUp: '¡Estás al día!',
    noNewNotifications: 'No hay nuevas notificaciones',
    storageData: 'Almacenamiento y Datos',
    appVersion: 'Versión de la Aplicación',
    buildNumber: 'Número de Compilación',
    accountSecurity: 'Seguridad de la Cuenta',
    currentPassword: 'Contraseña Actual',
    enterCurrentPassword: 'Ingrese contraseña actual',
    newPassword: 'Nueva Contraseña',
    enterNewPassword: 'Ingrese nueva contraseña',
    confirmNewPassword: 'Confirmar Nueva Contraseña',
    confirmNewPasswordPlaceholder: 'Confirme nueva contraseña',
    appSettings: 'Configuración de la Aplicación',
    autoBackup: 'Copia de Seguridad Automática',
    backupTicketsAutomatically: 'Respaldar tickets automáticamente',
    soundEffects: 'Efectos de Sonido',
    playSoundsInApp: 'Reproducir sonidos en la aplicación',
    hapticFeedback: 'Respuesta Háptica',
    vibrationOnInteractions: 'Vibración en interacciones',
    clearCache: 'Borrar Caché',
    freeUpStorageSpace: 'Liberar espacio de almacenamiento',
    storageUsage: 'Uso de Almacenamiento',
    about: 'Acerca de',
    error: 'Error',
    success: 'Éxito',
    pleaseFillAllPasswordFields: 'Por favor complete todos los campos de contraseña',
    newPasswordsDoNotMatch: 'Las nuevas contraseñas no coinciden',
    passwordMustBe6Characters: 'La contraseña debe tener al menos 6 caracteres',
    passwordChangedSuccessfully: '¡Contraseña cambiada exitosamente!',
    areYouSureWantToClearCache: '¿Estás seguro de que quieres borrar el caché de la aplicación?',
    clear: 'Borrar',
    cacheCleared: '¡Caché borrado exitosamente!',
    info: 'Información',
    totalStorage: 'Almacenamiento total',
    mbUsed: 'MB usados',
    editProfile: 'Editar Perfil',
    name: 'Nombre',
    age: 'Edad',
    phone: 'Teléfono',
    location: 'Ubicación',
    bio: 'Biografía',
    selectPhoto: 'Seleccionar Foto',
    close: 'Cerrar',
    save: 'Guardar',
    edit: 'Editar',
    update: 'Actualizar',
    pushNotifications: 'Notificaciones Push',
    receiveUpdates: 'Recibir Actualizaciones',
    promotionalEmails: 'Correos Promocionales',
    unread: 'no leídos',
    clearAll: 'Borrar Todo',
    hoursAgo: 'horas atrás',
    dayAgo: 'día atrás',
    daysAgo: 'días atrás',
    welcomeToDreamTicket: '🎉 ¡Bienvenido a DreamTicket!',
    thankYouForJoining: 'Gracias por unirte. ¡Crea tu primer ticket de la suerte ahora!',
    newFeatureAvailable: '✨ Nueva Función Disponible',
    checkOutNewAiGenerator: '¡Descubre nuestro nuevo generador de tickets con IA y efectos mejorados!',
    ticketGenerated: '🎫 Ticket Generado',
    yourLuckyTicketCreated: '¡Tu ticket de la suerte #12345 ha sido creado exitosamente!',
    premiumUpgrade: '⚡ Actualización Premium',
    upgradeToPremiumUnlimited: '¡Actualiza a premium y desbloquea tickets ilimitados!',
  },
  fr: {
    welcomeBack: 'Bon retour!',
    signInToContinue: 'Connectez-vous pour continuer vers Dream Ticket',
    signIn: 'Se connecter',
    createAccount: 'Créer un compte',
    email: 'Adresse e-mail',
    password: 'Mot de passe',
    fullName: 'Nom complet',
    confirmPassword: 'Confirmer le mot de passe',
    forgotPassword: 'Mot de passe oublié?',
    dontHaveAccount: "Vous n'avez pas de compte?",
    alreadyHaveAccount: 'Vous avez déjà un compte?',
    orSignUpWith: 'OU S\'INSCRIRE AVEC',
    orSignInWith: 'OU SE CONNECTER AVEC',
    continueWithFacebook: 'Continuer avec Facebook',
    continueWithGoogle: 'Continuer avec Google',
    creatingAccount: 'Création du compte...',
    signingIn: 'Connexion en cours...',
    home: 'ACCUEIL',
    aiGenerator: 'Générateur de Billets IA',
    generator: 'GÉNÉRATEUR',
    welcome: 'Bienvenue',
    exploreTickets: 'Explorer les billets',
    myTickets: 'Mes billets',
    dreamTicketGenerator: 'Générateur DreamTicket',
    createLuckyTicket: 'Créez votre billet chanceux avec la magie IA',
    uploadPhoto: 'Télécharger une photo',
    takePhoto: 'Prendre une photo',
    uploadVideo: 'Télécharger une vidéo',
    generateLuckyTicket: 'Générer un billet chanceux',
    yourLuckyNumber: 'Votre numéro chanceux',
    share: 'Partager',
    createNew: 'Créer nouveau',
    profile: 'Profil',
    personalInfo: 'Informations personnelles',
    preferences: 'Préférences',
    changeLanguage: 'Changer de langue',
    changeTheme: 'Changer de thème',
    notifications: 'Notifications',
    emailUpdates: 'Mises à jour par e-mail',
    saveChanges: 'Enregistrer les modifications',
    logout: 'Se déconnecter',
    luckShines: 'Votre chance brille aujourd\'hui! ✨',
    dreamActivated: 'Dream Ticket activé! 🎫',
    fortuneFavors: 'La fortune vous favorise! 🍀',
    luckyMoment: 'Votre moment de chance est là! 🌟',
    dreamsComeTrue: 'Les rêves deviennent réalité! 💫',
    magicInAir: 'La magie est dans l\'air! ✨',
    starsAligned: 'Vos étoiles sont alignées! ⭐',
    luckOnSide: 'La chance est de votre côté! 🎰',
    createLuckyTicketAI: 'Créez votre billet chanceux avec la magie IA',
    premiumMember: '⭐ Membre Premium',
    freeUser: '🆓 Utilisateur Gratuit',
    totalTickets: 'Billets Totaux',
    today: 'Aujourd\'hui',
    quickActions: 'Actions Rapides',
    createLuckyTicketAction: 'Créer un Billet Chanceux',
    uploadPhotoVideo: 'Télécharger photo ou vidéo',
    savedTickets: 'billets enregistrés',
    howItWorks: 'Comment Ça Marche',
    uploadMedia: 'Télécharger Média',
    photoOrVideo: 'Photo ou vidéo (5-10 secondes)',
    aiMagic: 'Magie IA',
    generatesLuckyNumber: 'Génère un numéro chanceux',
    getTicket: 'Obtenir le Billet',
    personalizedDreamTicket: 'DreamTicket Personnalisé',
    shareAction: 'Partager',
    saveShareFriends: 'Enregistrer et partager avec des amis',
    upgradeToPremium: 'Passer à Premium',
    premiumFeature1: '3 billets vidéo par jour (5-10 secondes)',
    premiumFeature2: 'Billets image illimités',
    premiumFeature3: 'Traitement IA prioritaire',
    premiumFeature4: 'Effets visuels exclusifs',
    perMonth: '/mois',
    upgradeNow: 'Mettre à Niveau Maintenant',
    disclaimerText: '💡 DreamTicket est une application de divertissement visuel. Tous les billets sont symboliques et pour le plaisir uniquement. Pas de vraie loterie ou prix.',
    noTicketsYet: 'Pas Encore de Billets',
    noTicketsMessage: 'Créez votre premier dream ticket pour le voir ici!',
    ticketId: 'ID du Billet',
    createdOn: 'Créé le',
    deleteTicket: 'Supprimer le Billet',
    confirmDelete: 'Supprimer le Billet?',
    confirmDeleteMessage: 'Êtes-vous sûr de vouloir supprimer ce billet? Cette action ne peut pas être annulée.',
    cancel: 'Annuler',
    delete: 'Supprimer',
    paymentMethods: 'Moyens de Paiement',
    helpSupport: 'Aide & Support',
    settings: 'Paramètres',
    account: 'Compte',
    comingSoon: 'Bientôt Disponible',
    paymentMethodsComingSoon: 'La fonction de moyens de paiement arrive bientôt!',
    notificationSettingsComingSoon: 'Les paramètres de notification arrivent bientôt!',
    helpSupportComingSoon: 'Aide & support arrivent bientôt!',
    settingsComingSoon: 'Les paramètres arrivent bientôt!',
    termsConditions: 'Termes et Conditions',
    privacyPolicy: 'Politique de Confidentialité',
    changePassword: 'Changer le Mot de Passe',
    youreAllCaughtUp: 'Vous êtes à jour!',
    noNewNotifications: 'Aucune nouvelle notification',
    storageData: 'Stockage et Données',
    appVersion: "Version de l'Application",
    buildNumber: 'Numéro de Build',
    accountSecurity: 'Sécurité du Compte',
    currentPassword: 'Mot de Passe Actuel',
    enterCurrentPassword: 'Entrez le mot de passe actuel',
    newPassword: 'Nouveau Mot de Passe',
    enterNewPassword: 'Entrez le nouveau mot de passe',
    confirmNewPassword: 'Confirmer le Nouveau Mot de Passe',
    confirmNewPasswordPlaceholder: 'Confirmez le nouveau mot de passe',
    appSettings: 'Paramètres de l\'Application',
    autoBackup: 'Sauvegarde Automatique',
    backupTicketsAutomatically: 'Sauvegarder les billets automatiquement',
    soundEffects: 'Effets Sonores',
    playSoundsInApp: 'Jouer des sons dans l\'application',
    hapticFeedback: 'Retour Haptique',
    vibrationOnInteractions: 'Vibration sur les interactions',
    clearCache: 'Effacer le Cache',
    freeUpStorageSpace: 'Libérer de l\'espace de stockage',
    storageUsage: 'Utilisation du Stockage',
    about: 'À Propos',
    error: 'Erreur',
    success: 'Succès',
    pleaseFillAllPasswordFields: 'Veuillez remplir tous les champs de mot de passe',
    newPasswordsDoNotMatch: 'Les nouveaux mots de passe ne correspondent pas',
    passwordMustBe6Characters: 'Le mot de passe doit contenir au moins 6 caractères',
    passwordChangedSuccessfully: 'Mot de passe changé avec succès!',
    areYouSureWantToClearCache: 'Êtes-vous sûr de vouloir effacer le cache de l\'application?',
    clear: 'Effacer',
    cacheCleared: 'Cache effacé avec succès!',
    info: 'Info',
    totalStorage: 'Stockage total',
    mbUsed: 'Mo utilisés',
    editProfile: 'Modifier le Profil',
    name: 'Nom',
    age: 'Âge',
    phone: 'Téléphone',
    location: 'Localisation',
    bio: 'Biographie',
    selectPhoto: 'Sélectionner une Photo',
    close: 'Fermer',
    save: 'Enregistrer',
    edit: 'Modifier',
    update: 'Mettre à Jour',
    pushNotifications: 'Notifications Push',
    receiveUpdates: 'Recevoir les Mises à Jour',
    promotionalEmails: 'E-mails Promotionnels',
    unread: 'non lus',
    clearAll: 'Tout Effacer',
    hoursAgo: 'il y a des heures',
    dayAgo: 'il y a un jour',
    daysAgo: 'il y a des jours',
    welcomeToDreamTicket: '🎉 Bienvenue sur DreamTicket!',
    thankYouForJoining: 'Merci de nous rejoindre. Créez votre premier billet chanceux maintenant!',
    newFeatureAvailable: '✨ Nouvelle Fonctionnalité Disponible',
    checkOutNewAiGenerator: 'Découvrez notre nouveau générateur de billets alimenté par IA avec des effets améliorés!',
    ticketGenerated: '🎫 Billet Généré',
    yourLuckyTicketCreated: 'Votre billet chanceux #12345 a été créé avec succès!',
    premiumUpgrade: '⚡ Mise à Niveau Premium',
    upgradeToPremiumUnlimited: 'Passez à premium et débloquez des billets illimités!',
  },
  de: {
    welcomeBack: 'Willkommen zurück!',
    signInToContinue: 'Melden Sie sich an, um fortzufahren',
    signIn: 'Anmelden',
    createAccount: 'Konto erstellen',
    email: 'E-Mail-Adresse',
    password: 'Passwort',
    fullName: 'Vollständiger Name',
    confirmPassword: 'Passwort bestätigen',
    forgotPassword: 'Passwort vergessen?',
    dontHaveAccount: 'Haben Sie kein Konto?',
    alreadyHaveAccount: 'Haben Sie bereits ein Konto?',
    orSignUpWith: 'ODER REGISTRIEREN MIT',
    orSignInWith: 'ODER ANMELDEN MIT',
    continueWithFacebook: 'Mit Facebook fortfahren',
    continueWithGoogle: 'Mit Google fortfahren',
    creatingAccount: 'Konto wird erstellt...',
    signingIn: 'Anmeldung läuft...',
    home: 'STARTSEITE',
    aiGenerator: 'KI-Ticket-Generator',
    generator: 'GENERATOR',
    welcome: 'Willkommen',
    exploreTickets: 'Tickets erkunden',
    myTickets: 'Meine Tickets',
    dreamTicketGenerator: 'DreamTicket Generator',
    createLuckyTicket: 'Erstellen Sie Ihr Glücksticket mit KI-Magie',
    uploadPhoto: 'Foto hochladen',
    takePhoto: 'Foto aufnehmen',
    uploadVideo: 'Video hochladen',
    generateLuckyTicket: 'Glücksticket generieren',
    yourLuckyNumber: 'Ihre Glückszahl',
    share: 'Teilen',
    createNew: 'Neu erstellen',
    profile: 'Profil',
    personalInfo: 'Persönliche Informationen',
    preferences: 'Einstellungen',
    changeLanguage: 'Sprache ändern',
    changeTheme: 'Thema ändern',
    notifications: 'Benachrichtigungen',
    emailUpdates: 'E-Mail-Updates',
    saveChanges: 'Änderungen speichern',
    logout: 'Abmelden',
    luckShines: 'Ihr Glück strahlt heute! ✨',
    dreamActivated: 'Dream Ticket aktiviert! 🎫',
    fortuneFavors: 'Das Glück ist auf Ihrer Seite! 🍀',
    luckyMoment: 'Ihr Glücksmoment ist da! 🌟',
    dreamsComeTrue: 'Träume werden wahr! 💫',
    magicInAir: 'Magie liegt in der Luft! ✨',
    starsAligned: 'Ihre Sterne sind ausgerichtet! ⭐',
    luckOnSide: 'Das Glück ist auf Ihrer Seite! 🎰',
    createLuckyTicketAI: 'Erstellen Sie Ihr Glücksticket mit KI-Magie',
    premiumMember: '⭐ Premium-Mitglied',
    freeUser: '🆓 Kostenloser Benutzer',
    totalTickets: 'Gesamte Tickets',
    today: 'Heute',
    quickActions: 'Schnellaktionen',
    createLuckyTicketAction: 'Glücksticket Erstellen',
    uploadPhotoVideo: 'Foto oder Video hochladen',
    savedTickets: 'gespeicherte Tickets',
    howItWorks: 'Wie Es Funktioniert',
    uploadMedia: 'Medien Hochladen',
    photoOrVideo: 'Foto oder Video (5-10 Sekunden)',
    aiMagic: 'KI-Magie',
    generatesLuckyNumber: 'Generiert Glückszahl',
    getTicket: 'Ticket Erhalten',
    personalizedDreamTicket: 'Personalisiertes DreamTicket',
    shareAction: 'Teilen',
    saveShareFriends: 'Speichern und mit Freunden teilen',
    upgradeToPremium: 'Auf Premium upgraden',
    premiumFeature1: '3 Video-Tickets pro Tag (5-10 Sekunden)',
    premiumFeature2: 'Unbegrenzte Bild-Tickets',
    premiumFeature3: 'Prioritäre KI-Verarbeitung',
    premiumFeature4: 'Exklusive visuelle Effekte',
    perMonth: '/Monat',
    upgradeNow: 'Jetzt Upgraden',
    disclaimerText: '💡 DreamTicket ist eine visuelle Unterhaltungs-App. Alle Tickets sind symbolisch und nur zum Spaß. Keine echte Lotterie oder Preise.',
    noTicketsYet: 'Noch Keine Tickets',
    noTicketsMessage: 'Erstellen Sie Ihr erstes Dream-Ticket, um es hier zu sehen!',
    ticketId: 'Ticket-ID',
    createdOn: 'Erstellt am',
    deleteTicket: 'Ticket Löschen',
    confirmDelete: 'Ticket Löschen?',
    confirmDeleteMessage: 'Sind Sie sicher, dass Sie dieses Ticket löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
    cancel: 'Abbrechen',
    delete: 'Löschen',
    paymentMethods: 'Zahlungsmethoden',
    helpSupport: 'Hilfe & Support',
    settings: 'Einstellungen',
    account: 'Konto',
    comingSoon: 'Demnächst',
    paymentMethodsComingSoon: 'Zahlungsmethoden-Funktion kommt bald!',
    notificationSettingsComingSoon: 'Benachrichtigungseinstellungen kommen bald!',
    helpSupportComingSoon: 'Hilfe & Support kommen bald!',
    settingsComingSoon: 'Einstellungen kommen bald!',
    termsConditions: 'Allgemeine Geschäftsbedingungen',
    privacyPolicy: 'Datenschutzrichtlinie',
    changePassword: 'Passwort Ändern',
    youreAllCaughtUp: 'Sie sind auf dem neuesten Stand!',
    noNewNotifications: 'Keine neuen Benachrichtigungen',
    storageData: 'Speicher & Daten',
    appVersion: 'App-Version',
    buildNumber: 'Build-Nummer',
    accountSecurity: 'Konto-Sicherheit',
    currentPassword: 'Aktuelles Passwort',
    enterCurrentPassword: 'Aktuelles Passwort eingeben',
    newPassword: 'Neues Passwort',
    enterNewPassword: 'Neues Passwort eingeben',
    confirmNewPassword: 'Neues Passwort Bestätigen',
    confirmNewPasswordPlaceholder: 'Neues Passwort bestätigen',
    appSettings: 'App-Einstellungen',
    autoBackup: 'Automatisches Backup',
    backupTicketsAutomatically: 'Tickets automatisch sichern',
    soundEffects: 'Soundeffekte',
    playSoundsInApp: 'Sounds in der App abspielen',
    hapticFeedback: 'Haptisches Feedback',
    vibrationOnInteractions: 'Vibration bei Interaktionen',
    clearCache: 'Cache Leeren',
    freeUpStorageSpace: 'Speicherplatz freigeben',
    storageUsage: 'Speichernutzung',
    about: 'Über',
    error: 'Fehler',
    success: 'Erfolg',
    pleaseFillAllPasswordFields: 'Bitte füllen Sie alle Passwort-Felder aus',
    newPasswordsDoNotMatch: 'Neue Passwörter stimmen nicht überein',
    passwordMustBe6Characters: 'Passwort muss mindestens 6 Zeichen haben',
    passwordChangedSuccessfully: 'Passwort erfolgreich geändert!',
    areYouSureWantToClearCache: 'Möchten Sie den App-Cache wirklich löschen?',
    clear: 'Löschen',
    cacheCleared: 'Cache erfolgreich gelöscht!',
    info: 'Info',
    totalStorage: 'Gesamtspeicher',
    mbUsed: 'MB verwendet',
    editProfile: 'Profil Bearbeiten',
    name: 'Name',
    age: 'Alter',
    phone: 'Telefon',
    location: 'Ort',
    bio: 'Biografie',
    selectPhoto: 'Foto Auswählen',
    close: 'Schließen',
    save: 'Speichern',
    edit: 'Bearbeiten',
    update: 'Aktualisieren',
    pushNotifications: 'Push-Benachrichtigungen',
    receiveUpdates: 'Updates Erhalten',
    promotionalEmails: 'Werbe-E-Mails',
    unread: 'ungelesen',
    clearAll: 'Alle Löschen',
    hoursAgo: 'Stunden her',
    dayAgo: 'Tag her',
    daysAgo: 'Tage her',
    welcomeToDreamTicket: '🎉 Willkommen bei DreamTicket!',
    thankYouForJoining: 'Danke, dass Sie sich uns angeschlossen haben. Erstellen Sie jetzt Ihr erstes Glücksticket!',
    newFeatureAvailable: '✨ Neue Funktion Verfügbar',
    checkOutNewAiGenerator: 'Schauen Sie sich unseren neuen KI-gestützten Ticket-Generator mit verbesserten Effekten an!',
    ticketGenerated: '🎫 Ticket Generiert',
    yourLuckyTicketCreated: 'Ihr Glücksticket #12345 wurde erfolgreich erstellt!',
    premiumUpgrade: '⚡ Premium-Upgrade',
    upgradeToPremiumUnlimited: 'Upgraden Sie auf Premium und schalten Sie unbegrenzte Tickets frei!',
  },
  pt: {
    welcomeBack: 'Bem-vindo de volta!',
    signInToContinue: 'Faça login para continuar no Dream Ticket',
    signIn: 'Entrar',
    createAccount: 'Criar Conta',
    email: 'Endereço de e-mail',
    password: 'Senha',
    fullName: 'Nome Completo',
    confirmPassword: 'Confirmar Senha',
    forgotPassword: 'Esqueceu a senha?',
    dontHaveAccount: 'Não tem uma conta?',
    alreadyHaveAccount: 'Já tem uma conta?',
    orSignUpWith: 'OU REGISTRAR-SE COM',
    orSignInWith: 'OU ENTRAR COM',
    continueWithFacebook: 'Continuar com Facebook',
    continueWithGoogle: 'Continuar com Google',
    creatingAccount: 'Criando Conta...',
    signingIn: 'Entrando...',
    home: 'INÍCIO',
    aiGenerator: 'Gerador de Bilhetes IA',
    generator: 'GERADOR',
    welcome: 'Bem-vindo',
    exploreTickets: 'Explorar Bilhetes',
    myTickets: 'Meus Bilhetes',
    dreamTicketGenerator: 'Gerador DreamTicket',
    createLuckyTicket: 'Crie seu bilhete da sorte com magia IA',
    uploadPhoto: 'Enviar Foto',
    takePhoto: 'Tirar Foto',
    uploadVideo: 'Enviar Vídeo',
    generateLuckyTicket: 'Gerar Bilhete da Sorte',
    yourLuckyNumber: 'Seu Número da Sorte',
    share: 'Compartilhar',
    createNew: 'Criar Novo',
    profile: 'Perfil',
    personalInfo: 'Informações Pessoais',
    preferences: 'Preferências',
    changeLanguage: 'Mudar Idioma',
    changeTheme: 'Mudar Tema',
    notifications: 'Notificações',
    emailUpdates: 'Atualizações por e-mail',
    saveChanges: 'Salvar Alterações',
    logout: 'Sair',
    luckShines: 'Sua sorte brilha hoje! ✨',
    dreamActivated: 'Dream Ticket ativado! 🎫',
    fortuneFavors: 'A fortuna favorece você! 🍀',
    luckyMoment: 'Seu momento de sorte está aquí! 🌟',
    dreamsComeTrue: 'Sonhos se tornam realidade! 💫',
    magicInAir: 'Magia está no ar! ✨',
    starsAligned: 'Suas estrelas estão alinhadas! ⭐',
    luckOnSide: 'A sorte está do seu lado! 🎰',
    createLuckyTicketAI: 'Crie seu bilhete da sorte com magia IA',
    premiumMember: '⭐ Membro Premium',
    freeUser: '🆓 Usuário Grátis',
    totalTickets: 'Total de Bilhetes',
    today: 'Hoje',
    quickActions: 'Ações Rápidas',
    createLuckyTicketAction: 'Criar Bilhete da Sorte',
    uploadPhotoVideo: 'Enviar foto ou vídeo',
    savedTickets: 'bilhetes salvos',
    howItWorks: 'Como Funciona',
    uploadMedia: 'Enviar Mídia',
    photoOrVideo: 'Foto ou vídeo (5-10 segundos)',
    aiMagic: 'Magia IA',
    generatesLuckyNumber: 'Gera número da sorte',
    getTicket: 'Obter Bilhete',
    personalizedDreamTicket: 'DreamTicket Personalizado',
    shareAction: 'Compartilhar',
    saveShareFriends: 'Salvar e compartilhar com amigos',
    upgradeToPremium: 'Atualizar para Premium',
    premiumFeature1: '3 bilhetes de vídeo por dia (5-10 segundos)',
    premiumFeature2: 'Bilhetes de imagem ilimitados',
    premiumFeature3: 'Processamento IA prioritário',
    premiumFeature4: 'Efeitos visuais exclusivos',
    perMonth: '/mês',
    upgradeNow: 'Atualizar Agora',
    disclaimerText: '💡 DreamTicket é um aplicativo de entretenimento visual. Todos os bilhetes são simbólicos e apenas para diversão. Sem loteria ou prêmios reais.',
    noTicketsYet: 'Ainda Sem Bilhetes',
    noTicketsMessage: 'Crie seu primeiro dream ticket para vê-lo aqui!',
    ticketId: 'ID do Bilhete',
    createdOn: 'Criado em',
    deleteTicket: 'Excluir Bilhete',
    confirmDelete: 'Excluir Bilhete?',
    confirmDeleteMessage: 'Tem certeza de que deseja excluir este bilhete? Esta ação não pode ser desfeita.',
    cancel: 'Cancelar',
    delete: 'Excluir',
    paymentMethods: 'Métodos de Pagamento',
    helpSupport: 'Ajuda & Suporte',
    settings: 'Configurações',
    account: 'Conta',
    comingSoon: 'Em Breve',
    paymentMethodsComingSoon: 'Recurso de métodos de pagamento em breve!',
    notificationSettingsComingSoon: 'Configurações de notificação em breve!',
    helpSupportComingSoon: 'Ajuda & suporte em breve!',
    settingsComingSoon: 'Configurações em breve!',
    termsConditions: 'Termos e Condições',
    privacyPolicy: 'Política de Privacidade',
    changePassword: 'Alterar Senha',
    youreAllCaughtUp: 'Você está em dia!',
    noNewNotifications: 'Sem novas notificações',
    storageData: 'Armazenamento e Dados',
    appVersion: 'Versão do Aplicativo',
    buildNumber: 'Número da Build',
    accountSecurity: 'Segurança da Conta',
    currentPassword: 'Senha Atual',
    enterCurrentPassword: 'Digite a senha atual',
    newPassword: 'Nova Senha',
    enterNewPassword: 'Digite a nova senha',
    confirmNewPassword: 'Confirmar Nova Senha',
    confirmNewPasswordPlaceholder: 'Confirme a nova senha',
    appSettings: 'Configurações do Aplicativo',
    autoBackup: 'Backup Automático',
    backupTicketsAutomatically: 'Fazer backup dos bilhetes automaticamente',
    soundEffects: 'Efeitos Sonoros',
    playSoundsInApp: 'Reproduzir sons no aplicativo',
    hapticFeedback: 'Feedback Tátil',
    vibrationOnInteractions: 'Vibração nas interações',
    clearCache: 'Limpar Cache',
    freeUpStorageSpace: 'Liberar espaço de armazenamento',
    storageUsage: 'Uso de Armazenamento',
    about: 'Sobre',
    error: 'Erro',
    success: 'Sucesso',
    pleaseFillAllPasswordFields: 'Por favor, preencha todos os campos de senha',
    newPasswordsDoNotMatch: 'As novas senhas não coincidem',
    passwordMustBe6Characters: 'A senha deve ter pelo menos 6 caracteres',
    passwordChangedSuccessfully: 'Senha alterada com sucesso!',
    areYouSureWantToClearCache: 'Tem certeza de que deseja limpar o cache do aplicativo?',
    clear: 'Limpar',
    cacheCleared: 'Cache limpo com sucesso!',
    info: 'Info',
    totalStorage: 'Armazenamento total',
    mbUsed: 'MB usados',
    editProfile: 'Editar Perfil',
    name: 'Nome',
    age: 'Idade',
    phone: 'Telefone',
    location: 'Localização',
    bio: 'Biografia',
    selectPhoto: 'Selecionar Foto',
    close: 'Fechar',
    save: 'Salvar',
    edit: 'Editar',
    update: 'Atualizar',
    pushNotifications: 'Notificações Push',
    receiveUpdates: 'Receber Atualizações',
    promotionalEmails: 'E-mails Promocionais',
    unread: 'não lidos',
    clearAll: 'Limpar Tudo',
    hoursAgo: 'horas atrás',
    dayAgo: 'dia atrás',
    daysAgo: 'dias atrás',
    welcomeToDreamTicket: '🎉 Bem-vindo ao DreamTicket!',
    thankYouForJoining: 'Obrigado por se juntar a nós. Crie seu primeiro bilhete da sorte agora!',
    newFeatureAvailable: '✨ Nova Funcionalidade Disponível',
    checkOutNewAiGenerator: 'Confira nosso novo gerador de bilhetes com IA e efeitos aprimorados!',
    ticketGenerated: '🎫 Bilhete Gerado',
    yourLuckyTicketCreated: 'Seu bilhete da sorte #12345 foi criado com sucesso!',
    premiumUpgrade: '⚡ Atualização Premium',
    upgradeToPremiumUnlimited: 'Atualize para premium e desbloqueie bilhetes ilimitados!',
  },
  zh: {
    welcomeBack: '欢迎回来！',
    signInToContinue: '登录以继续使用 Dream Ticket',
    signIn: '登录',
    createAccount: '创建账户',
    email: '电子邮箱',
    password: '密码',
    fullName: '全名',
    confirmPassword: '确认密码',
    forgotPassword: '忘记密码？',
    dontHaveAccount: '还没有账户？',
    alreadyHaveAccount: '已有账户？',
    orSignUpWith: '或使用以下方式注册',
    orSignInWith: '或使用以下方式登录',
    continueWithFacebook: '继续使用 Facebook',
    continueWithGoogle: '继续使用 Google',
    creatingAccount: '正在创建账户...',
    signingIn: '正在登录...',
    home: '首页',
    aiGenerator: 'AI门票生成器',
    generator: '生成器',
    welcome: '欢迎',
    exploreTickets: '探索门票',
    myTickets: '我的门票',
    dreamTicketGenerator: 'DreamTicket 生成器',
    createLuckyTicket: '用AI魔法创建你的幸运票',
    uploadPhoto: '上传照片',
    takePhoto: '拍照',
    uploadVideo: '上传视频',
    generateLuckyTicket: '生成幸运票',
    yourLuckyNumber: '你的幸运号码',
    share: '分享',
    createNew: '创建新的',
    profile: '个人资料',
    personalInfo: '个人信息',
    preferences: '偏好设置',
    changeLanguage: '更改语言',
    changeTheme: '更改主题',
    notifications: '通知',
    emailUpdates: '电子邮件更新',
    saveChanges: '保存更改',
    logout: '登出',
    luckShines: '你的运气今天闪耀！✨',
    dreamActivated: 'Dream Ticket 已激活！🎫',
    fortuneFavors: '幸运眷顾你！🍀',
    luckyMoment: '你的幸运时刻到了！🌟',
    dreamsComeTrue: '梦想成真！💫',
    magicInAir: '空气中充满魔力！✨',
    starsAligned: '你的星辰已对齐！⭐',
    luckOnSide: '运气站在你这边！🎰',
    createLuckyTicketAI: '用AI魔法创建你的幸运票',
    premiumMember: '⭐ 高级会员',
    freeUser: '🆓 免费用户',
    totalTickets: '总门票',
    today: '今天',
    quickActions: '快捷操作',
    createLuckyTicketAction: '创建幸运票',
    uploadPhotoVideo: '上传照片或视频',
    savedTickets: '已保存的门票',
    howItWorks: '工作原理',
    uploadMedia: '上传媒体',
    photoOrVideo: '照片或视频（5-10秒）',
    aiMagic: 'AI魔法',
    generatesLuckyNumber: '生成幸运号码',
    getTicket: '获取门票',
    personalizedDreamTicket: '个性化DreamTicket',
    shareAction: '分享',
    saveShareFriends: '保存并与朋友分享',
    upgradeToPremium: '升级到高级版',
    premiumFeature1: '每天3张视频门票（5-10秒）',
    premiumFeature2: '无限图片门票',
    premiumFeature3: '优先AI处理',
    premiumFeature4: '独家视觉效果',
    perMonth: '/月',
    upgradeNow: '立即升级',
    disclaimerText: '💡 DreamTicket是一个视觉娱乐应用。所有门票都是象征性的，仅供娱乐。没有真正的彩票或奖品。',
    noTicketsYet: '还没有门票',
    noTicketsMessage: '创建你的第一张梦想门票以在此处查看！',
    ticketId: '门票ID',
    createdOn: '创建于',
    deleteTicket: '删除门票',
    confirmDelete: '删除门票？',
    confirmDeleteMessage: '您确定要删除此门票吗？此操作无法撤消。',
    cancel: '取消',
    delete: '删除',
    paymentMethods: '支付方式',
    helpSupport: '帮助与支持',
    settings: '设置',
    account: '账户',
    comingSoon: '即将推出',
    paymentMethodsComingSoon: '支付方式功能即将推出！',
    notificationSettingsComingSoon: '通知设置即将推出！',
    helpSupportComingSoon: '帮助与支持即将推出！',
    settingsComingSoon: '设置即将推出！',
    termsConditions: '条款与条件',
    privacyPolicy: '隐私政策',
    changePassword: '更改密码',
    youreAllCaughtUp: '您已查看所有内容！',
    noNewNotifications: '没有新通知',
    storageData: '存储和数据',
    appVersion: '应用版本',
    buildNumber: '构建编号',
    accountSecurity: '账户安全',
    currentPassword: '当前密码',
    enterCurrentPassword: '输入当前密码',
    newPassword: '新密码',
    enterNewPassword: '输入新密码',
    confirmNewPassword: '确认新密码',
    confirmNewPasswordPlaceholder: '确认新密码',
    appSettings: '应用设置',
    autoBackup: '自动备份',
    backupTicketsAutomatically: '自动备份门票',
    soundEffects: '音效',
    playSoundsInApp: '在应用中播放声音',
    hapticFeedback: '触觉反馈',
    vibrationOnInteractions: '交互时振动',
    clearCache: '清除缓存',
    freeUpStorageSpace: '释放存储空间',
    storageUsage: '存储使用情况',
    about: '关于',
    error: '错误',
    success: '成功',
    pleaseFillAllPasswordFields: '请填写所有密码字段',
    newPasswordsDoNotMatch: '新密码不匹配',
    passwordMustBe6Characters: '密码必须至少6个字符',
    passwordChangedSuccessfully: '密码已成功更改！',
    areYouSureWantToClearCache: '您确定要清除应用缓存吗？',
    clear: '清除',
    cacheCleared: '缓存已成功清除！',
    info: '信息',
    totalStorage: '总存储',
    mbUsed: 'MB已使用',
    editProfile: '编辑个人资料',
    name: '姓名',
    age: '年龄',
    phone: '电话',
    location: '位置',
    bio: '简介',
    selectPhoto: '选择照片',
    close: '关闭',
    save: '保存',
    edit: '编辑',
    update: '更新',
    pushNotifications: '推送通知',
    receiveUpdates: '接收更新',
    promotionalEmails: '促销电子邮件',
    unread: '未读',
    clearAll: '全部清除',
    hoursAgo: '小时前',
    dayAgo: '天前',
    daysAgo: '天前',
    welcomeToDreamTicket: '🎉 欢迎来到DreamTicket！',
    thankYouForJoining: '感谢您加入我们。现在就创建您的第一张幸运票吧！',
    newFeatureAvailable: '✨ 新功能可用',
    checkOutNewAiGenerator: '查看我们新的AI驱动门票生成器，带有增强效果！',
    ticketGenerated: '🎫 门票已生成',
    yourLuckyTicketCreated: '您的幸运票 #12345 已成功创建！',
    premiumUpgrade: '⚡ 高级升级',
    upgradeToPremiumUnlimited: '升级到高级版并解锁无限门票！',
  },
};

const languageNames: Record<LanguageType, string> = {
  en: '🇺🇸 English',
  es: '🇪🇸 Español',
  fr: '🇫🇷 Français',
  de: '🇩🇪 Deutsch',
  pt: '🇧🇷 Português',
  zh: '🇨🇳 中文',
};

interface LanguageContextType {
  language: LanguageType;
  t: Translations;
  setLanguage: (lang: LanguageType) => void;
  getLanguageName: (lang: LanguageType) => string;
  availableLanguages: LanguageType[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setCurrentLanguage] = useState<LanguageType>('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLang = await AsyncStorage.getItem('selectedLanguage');
      if (savedLang && savedLang in translations) {
        setCurrentLanguage(savedLang as LanguageType);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const setLanguage = async (lang: LanguageType) => {
    try {
      await AsyncStorage.setItem('selectedLanguage', lang);
      setCurrentLanguage(lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const getLanguageName = (lang: LanguageType): string => {
    return languageNames[lang];
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        t: translations[language],
        setLanguage,
        getLanguageName,
        availableLanguages: Object.keys(translations) as LanguageType[],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

