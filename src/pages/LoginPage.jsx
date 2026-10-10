import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import {
  HeartPulse,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Stethoscope,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Smartphone
} from 'lucide-react';

export default function LoginPage() {
  const { login, switchRole } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('patient');
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      addToast('Please enter your email or phone number', 'warning', 'Validation');
      return;
    }
    switchRole(selectedRole);
    addToast(`Welcome back! Logged in as ${selectedRole.toUpperCase()}.`, 'success', 'Login Successful');
    
    if (selectedRole === 'doctor') navigate('/doctor-dashboard');
    else if (selectedRole === 'admin') navigate('/admin-dashboard');
    else navigate('/patient-dashboard');
  };

  const handleDemoQuickLogin = (role) => {
    setSelectedRole(role);
    switchRole(role);
    addToast(`Quick Logged in as ${role.toUpperCase()} Demo User`, 'success', 'Demo Login');
    if (role === 'doctor') navigate('/doctor-dashboard');
    else if (role === 'admin') navigate('/admin-dashboard');
    else navigate('/patient-dashboard');
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (!resetEmail) {
      addToast('Please enter your registered email/phone', 'warning');
      return;
    }
    addToast(`Password reset link sent to ${resetEmail}. Check your SMS/email.`, 'success', 'OTP Sent');
    setForgotModalOpen(false);
    setResetEmail('');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      
      {/* Dynamic Glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full p-8 rounded-3xl glass-card border shadow-2xl space-y-6 relative z-10"
      >
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-brand-600 to-emeraldCustom-500 flex items-center justify-center text-white shadow-xl shadow-brand-500/20">
            <HeartPulse className="w-8 h-8 animate-pulse" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Sign In to ArogyaGram
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Access your rural health records, appointments, and telemedicine portal.
          </p>
        </div>

        {/* Quick Role Selector Demo Bar */}
        <div className="p-1 rounded-xl bg-slate-200/60 dark:bg-slate-800 flex items-center justify-between text-xs font-bold">
          <button
            type="button"
            onClick={() => setSelectedRole('patient')}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center space-x-1 ${
              selectedRole === 'patient' ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm' : 'text-slate-500'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Patient</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole('doctor')}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center space-x-1 ${
              selectedRole === 'doctor' ? 'bg-white dark:bg-slate-700 text-emeraldCustom-600 dark:text-emeraldCustom-400 shadow-sm' : 'text-slate-500'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Doctor</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole('admin')}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center space-x-1 ${
              selectedRole === 'admin' ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm' : 'text-slate-500'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Email or Mobile Number
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input
                type="text"
                placeholder={selectedRole === 'patient' ? 'ramu.village@arogyagram.in' : selectedRole === 'doctor' ? 'dr.ananya@arogyagram.in' : 'admin@arogyagram.gov.in'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl glass-input text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
              <span className="text-slate-600 dark:text-slate-400">Remember Me</span>
            </label>
            <button
              type="button"
              onClick={() => setForgotModalOpen(true)}
              className="font-bold text-brand-600 dark:text-brand-400 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl glass-button text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-lg"
          >
            <span>Sign In to Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo One-Click Login Shortcuts */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <div className="text-[11px] text-center font-bold text-slate-400 uppercase tracking-wider">
            One-Click Demo Shortcuts
          </div>
          <div className="grid grid-cols-3 gap-2 text-[11px]">
            <button
              onClick={() => handleDemoQuickLogin('patient')}
              className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 font-bold hover:scale-105 transition-transform"
            >
              Patient Demo
            </button>
            <button
              onClick={() => handleDemoQuickLogin('doctor')}
              className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-bold hover:scale-105 transition-transform"
            >
              Doctor Demo
            </button>
            <button
              onClick={() => handleDemoQuickLogin('admin')}
              className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 font-bold hover:scale-105 transition-transform"
            >
              Admin Demo
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500">
          Don't have a village health card?{' '}
          <Link to="/register" className="font-bold text-brand-600 dark:text-brand-400 hover:underline">
            Register New Patient
          </Link>
        </div>

      </motion.div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-sm w-full p-6 rounded-3xl glass-card border shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Reset Account Password</h3>
            <p className="text-xs text-slate-500">
              Enter your registered village phone number or email to receive an instant OTP.
            </p>
            <form onSubmit={handleResetSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Mobile number or email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full p-3 rounded-xl glass-input text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <div className="flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl glass-button text-white text-xs font-bold"
                >
                  Send OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
