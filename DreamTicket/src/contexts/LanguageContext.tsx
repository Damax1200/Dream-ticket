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
    luckShines: 'Your luck shines today! ✨',
    dreamActivated: 'Dream Ticket activated! 🎫',
    fortuneFavors: 'Fortune favors you! 🍀',
    luckyMoment: 'Your lucky moment is here! 🌟',
    dreamsComeTrue: 'Dreams come true! 💫',
    magicInAir: 'Magic is in the air! ✨',
    starsAligned: 'Your stars are aligned! ⭐',
    luckOnSide: 'Luck is on your side! 🎰',
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
    luckShines: '¡Tu suerte brilla hoy! ✨',
    dreamActivated: '¡Dream Ticket activado! 🎫',
    fortuneFavors: '¡La fortuna te favorece! 🍀',
    luckyMoment: '¡Tu momento de suerte está aquí! 🌟',
    dreamsComeTrue: '¡Los sueños se hacen realidad! 💫',
    magicInAir: '¡Hay magia en el aire! ✨',
    starsAligned: '¡Tus estrellas están alineadas! ⭐',
    luckOnSide: '¡La suerte está de tu lado! 🎰',
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
    luckyMoment: 'Seu momento de sorte está aqui! 🌟',
    dreamsComeTrue: 'Sonhos se tornam realidade! 💫',
    magicInAir: 'Magia está no ar! ✨',
    starsAligned: 'Suas estrelas estão alinhadas! ⭐',
    luckOnSide: 'A sorte está do seu lado! 🎰',
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

