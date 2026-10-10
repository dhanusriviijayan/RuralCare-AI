import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import {
  User,
  Heart,
  PhoneCall,
  MapPin,
  Camera,
  QrCode,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function RegisterPage() {
  const { setUser } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: 'Muthu Swamy',
    age: '38',
    gender: 'Male',
    phone: '+91 94432 77890',
    email: 'muthu.swamy@arogyagram.in',
    bloodGroup: 'B+',
    allergies: 'Peanuts, Penicillin',
    chronicConditions: 'Mild Asthma',
    district: 'Uttara Kannada',
    village: 'Siddapur Gram Panchayat',
    emergencyName: 'Kamala Swamy (Wife)',
    emergencyPhone: '+91 94432 99911',
    photoUrl: ''
  });

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.phone)) {
      addToast('Please enter your full name and mobile number.', 'warning');
      return;
    }
    setStep(prev => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleCompleteRegistration = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });

    const newPatient = {
      id: `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.name,
      role: 'PATIENT',
      email: formData.email,
      phone: formData.phone,
      age: formData.age,
      gender: formData.gender,
      bloodGroup: formData.bloodGroup,
      village: formData.village,
      district: formData.district,
      qrCode: `AG-PAT-${formData.name.toUpperCase().replace(/\s+/g, '-')}-${formData.bloodGroup.replace('+', 'PLUS')}`,
      emergencyContact: { name: formData.emergencyName, phone: formData.emergencyPhone },
      allergies: formData.allergies.split(',').map(s => s.trim()),
      chronicConditions: formData.chronicConditions.split(',').map(s => s.trim()),
      healthScore: 90,
      vitals: {
        bp: "120/80 mmHg",
        heartRate: "72 bpm",
        bmi: "22.8 (Normal)",
        sugarLevel: "98 mg/dL",
        oxygen: "99%"
      }
    };

    setUser(newPatient);
    addToast('Registration Complete! Welcome to ArogyaGram Health Network.', 'success', 'QR Card Generated');
    navigate('/patient-dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="p-8 sm:p-10 rounded-3xl glass-card border shadow-2xl space-y-8">
        
        {/* Header & Step Progress Bar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center font-extrabold shadow">
                {step}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Rural Patient Registration</h2>
                <div className="text-xs text-slate-500">Step {step} of 4</div>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emeraldCustom-500/10 text-emeraldCustom-600 dark:text-emeraldCustom-400 text-xs font-bold border border-emeraldCustom-500/20">
              Free Village Health Pass
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-500 via-sky-400 to-emeraldCustom-500 transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          {/* Step Labels */}
          <div className="grid grid-cols-4 text-center text-[11px] font-bold text-slate-500">
            <span className={step >= 1 ? 'text-brand-600 dark:text-brand-400' : ''}>1. Personal</span>
            <span className={step >= 2 ? 'text-brand-600 dark:text-brand-400' : ''}>2. Medical</span>
            <span className={step >= 3 ? 'text-brand-600 dark:text-brand-400' : ''}>3. Emergency</span>
            <span className={step >= 4 ? 'text-brand-600 dark:text-brand-400' : ''}>4. QR Pass</span>
          </div>
        </div>

        {/* Wizard Form Steps */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-2">
                <User className="w-5 h-5 text-brand-500" />
                <span>Personal & Contact Information</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 rounded-xl glass-input text-xs font-medium focus:ring-2 focus:ring-brand-500"
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full p-3 rounded-xl glass-input text-xs font-medium focus:ring-2 focus:ring-brand-500"
                    placeholder="Age in years"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full p-3 rounded-xl glass-input text-xs font-medium focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Mobile Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 rounded-xl glass-input text-xs font-medium focus:ring-2 focus:ring-brand-500"
                    placeholder="+91 98000 00000"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-2">
                <Heart className="w-5 h-5 text-rose-500" />
                <span>Medical History & Blood Profile</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Blood Group</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full p-3 rounded-xl glass-input text-xs font-medium focus:ring-2 focus:ring-brand-500"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Known Drug/Food Allergies</label>
                  <input
                    type="text"
                    value={formData.allergies}
                    onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                    className="w-full p-3 rounded-xl glass-input text-xs font-medium focus:ring-2 focus:ring-brand-500"
                    placeholder="e.g. Penicillin, Dust, Peanuts"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Pre-existing Health Conditions</label>
                <input
                  type="text"
                  value={formData.chronicConditions}
                  onChange={(e) => setFormData({ ...formData, chronicConditions: e.target.value })}
                  className="w-full p-3 rounded-xl glass-input text-xs font-medium focus:ring-2 focus:ring-brand-500"
                  placeholder="e.g. Diabetes, Hypertension, Asthma"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-emeraldCustom-500" />
                <span>Village Address & Emergency Contact</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">District Name</label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full p-3 rounded-xl glass-input text-xs font-medium focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Village / Gram Panchayat</label>
                  <input
                    type="text"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    className="w-full p-3 rounded-xl glass-input text-xs font-medium focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Emergency Contact Person</label>
                  <input
                    type="text"
                    value={formData.emergencyName}
                    onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                    className="w-full p-3 rounded-xl glass-input text-xs font-medium focus:ring-2 focus:ring-brand-500"
                    placeholder="Name & Relationship"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Emergency Phone</label>
                  <input
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                    className="w-full p-3 rounded-xl glass-input text-xs font-medium focus:ring-2 focus:ring-brand-500"
                    placeholder="+91 90000 00000"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emeraldCustom-500/10 text-emeraldCustom-600 dark:text-emeraldCustom-400 text-xs font-bold">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>QR Code Health Card Preview</span>
              </div>

              {/* Digital QR Health Card Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-brand-700 via-sky-800 to-indigo-900 text-white shadow-2xl border border-sky-400/30 max-w-sm mx-auto space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-sky-400/20 pb-3">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-emeraldCustom-400" />
                    <span className="font-extrabold text-sm tracking-wide">ArogyaGram Health Pass</span>
                  </div>
                  <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-md">VERIFIED</span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-white rounded-2xl shadow-inner">
                    <QRCodeSVG
                      value={`AG-PATIENT-${formData.name}-${formData.phone}`}
                      size={100}
                      level="H"
                    />
                  </div>
                  <div className="text-left space-y-1 text-xs">
                    <div className="font-extrabold text-base">{formData.name}</div>
                    <div className="text-sky-200">Age: {formData.age} yrs • Gender: {formData.gender}</div>
                    <div className="text-amber-300 font-bold">Blood Group: {formData.bloodGroup}</div>
                    <div className="text-[11px] text-sky-300">{formData.village}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-sky-400/20 text-[10px] text-sky-200 flex justify-between">
                  <span>Emergency: {formData.emergencyPhone}</span>
                  <span>ID: AG-8842</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Wizard Controls */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={handlePrev}
              className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center space-x-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : <div />}

          {step < 4 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl glass-button text-white text-xs font-bold flex items-center space-x-1.5 shadow-lg"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleCompleteRegistration}
              className="px-8 py-3 rounded-xl bg-emeraldCustom-500 hover:bg-emeraldCustom-600 text-white text-xs font-black flex items-center space-x-2 shadow-xl shadow-emeraldCustom-500/30 transition-transform hover:scale-105"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Generate Health Card & Finish</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
