import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import {
  HeartPulse,
  Sun,
  Moon,
  Globe,
  Mic,
  PhoneCall,
  User,
  ShieldCheck,
  Stethoscope,
  UserCheck,
  Menu,
  X,
  Sparkles,
  QrCode,
  Activity
} from 'lucide-react';

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();
  const { user, logout, switchRole } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      addToast('Voice Search is not supported in this browser. Please use Chrome or Edge.', 'warning', 'Voice Search');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'ta' ? 'ta-IN' : lang === 'hi' ? 'hi-IN' : 'en-US';
    recognition.interimResults = false;

    setIsListening(true);
    addToast(t('speakNow'), 'info', t('voiceSearch'));

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      addToast(`Voice recognized: "${transcript}"`, 'success', 'Voice Search Result');
      navigate(`/?search=${encodeURIComponent(transcript)}`);
    };

    recognition.onerror = () => {
      setIsListening(false);
      addToast('Could not capture audio. Please try again.', 'error', 'Voice Search');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const navItems = [
    { label: t('navHome'), path: '/' },
    { label: t('navAiChecker'), path: '/ai-symptom-checker', highlight: true },
    { label: t('navTelemedicine'), path: '/telemedicine' },
    { label: t('navAmbulance'), path: '/ambulance-tracker', emergency: true },
  ];

  return (
    <header className="sticky top-0 z-40 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-emeraldCustom-500 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform duration-300">
              <HeartPulse className="w-7 h-7 text-white animate-pulse" />
            </div>
            <div>
              <div className="text-2xl font-extrabold bg-gradient-to-r from-brand-600 via-sky-500 to-emeraldCustom-500 bg-clip-text text-transparent tracking-tight">
                {t('brandName')}
              </div>
              <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                Rural Health Tech
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-1.5 ${
                    item.emergency
                      ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 hover:bg-rose-500/20'
                      : item.highlight
                      ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 hover:bg-brand-500/20'
                      : isActive
                      ? 'bg-slate-200/60 dark:bg-slate-800 text-brand-600 dark:text-brand-400'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {item.highlight && <Sparkles className="w-4 h-4 text-amber-500" />}
                  {item.emergency && <PhoneCall className="w-4 h-4 animate-bounce text-rose-500" />}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="hidden lg:flex items-center space-x-3">
            
            {/* Voice Search Button */}
            <button
              onClick={startVoiceSearch}
              title="Voice Search"
              className={`p-2.5 rounded-xl border transition-all duration-200 ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse border-rose-400 shadow-lg shadow-rose-500/30'
                  : 'bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-brand-500'
              }`}
            >
              <Mic className="w-5 h-5" />
            </button>

            {/* Multi-Language Selector */}
            <div className="relative flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
              <Globe className="w-4 h-4 ml-2 mr-1 text-brand-500" />
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded-lg transition-colors ${lang === 'en' ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('ta')}
                className={`px-2 py-1 rounded-lg transition-colors ${lang === 'ta' ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
              >
                தமிழ்
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2 py-1 rounded-lg transition-colors ${lang === 'hi' ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
              >
                हिंदी
              </button>
            </div>

            {/* Dark/Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
              title="Toggle Light/Dark Theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Role Switcher Demo Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-slate-800 to-slate-900 text-white dark:from-slate-700 dark:to-slate-800 border border-slate-700 shadow-md flex items-center space-x-1.5 hover:opacity-90 transition-opacity"
              >
                <Activity className="w-3.5 h-3.5 text-emeraldCustom-400" />
                <span>Role: {user ? user.role : 'Guest'}</span>
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl glass-card p-2 shadow-2xl z-50 text-xs font-semibold flex flex-col space-y-1">
                  <div className="px-3 py-1.5 text-[10px] text-slate-400 uppercase tracking-wider">Demo Role Switcher</div>
                  <button
                    onClick={() => { switchRole('patient'); setRoleDropdownOpen(false); navigate('/patient-dashboard'); }}
                    className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-left"
                  >
                    <User className="w-4 h-4 text-sky-500" />
                    <span>Patient View</span>
                  </button>
                  <button
                    onClick={() => { switchRole('doctor'); setRoleDropdownOpen(false); navigate('/doctor-dashboard'); }}
                    className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-left"
                  >
                    <Stethoscope className="w-4 h-4 text-emeraldCustom-500" />
                    <span>Doctor View</span>
                  </button>
                  <button
                    onClick={() => { switchRole('admin'); setRoleDropdownOpen(false); navigate('/admin-dashboard'); }}
                    className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-left"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-500" />
                    <span>Admin View</span>
                  </button>
                </div>
              )}
            </div>

            {/* Auth / Dashboard Button */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Link
                  to={
                    user.role === 'DOCTOR'
                      ? '/doctor-dashboard'
                      : user.role === 'ADMIN'
                      ? '/admin-dashboard'
                      : '/patient-dashboard'
                  }
                  className="px-4 py-2.5 rounded-xl glass-button text-white text-xs font-bold flex items-center space-x-2 shadow-lg"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>{t('navDashboard')}</span>
                </Link>
                <button
                  onClick={() => { logout(); navigate('/login'); }}
                  className="px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-rose-500/10 hover:text-rose-500 transition-colors"
                >
                  {t('logout')}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {t('navLogin')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2.5 rounded-xl glass-button text-white text-xs font-bold shadow-lg"
                >
                  {t('navRegister')}
                </Link>
              </div>
            )}

          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-card border-b px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 text-xs rounded font-bold ${lang === 'en' ? 'bg-brand-500 text-white' : 'text-slate-500'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('ta')}
                className={`px-2 py-1 text-xs rounded font-bold ${lang === 'ta' ? 'bg-brand-500 text-white' : 'text-slate-500'}`}
              >
                தமிழ்
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2 py-1 text-xs rounded font-bold ${lang === 'hi' ? 'bg-brand-500 text-white' : 'text-slate-500'}`}
              >
                हिंदी
              </button>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/patient-dashboard"
              onClick={() => { switchRole('patient'); setMobileMenuOpen(false); }}
              className="px-3 py-2 rounded-xl text-sm font-semibold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40"
            >
              Patient Dashboard
            </Link>
            <Link
              to="/doctor-dashboard"
              onClick={() => { switchRole('doctor'); setMobileMenuOpen(false); }}
              className="px-3 py-2 rounded-xl text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40"
            >
              Doctor Dashboard
            </Link>
            <Link
              to="/admin-dashboard"
              onClick={() => { switchRole('admin'); setMobileMenuOpen(false); }}
              className="px-3 py-2 rounded-xl text-sm font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40"
            >
              Admin Dashboard
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
