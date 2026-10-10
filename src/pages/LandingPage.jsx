import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useNotification } from '../context/NotificationContext';
import { mockDoctors } from '../data/mockData';
import {
  Sparkles,
  Stethoscope,
  Video,
  QrCode,
  Truck,
  WifiOff,
  Search,
  ArrowRight,
  Star,
  CheckCircle2,
  Users,
  Building2,
  Award,
  ChevronDown,
  PhoneCall,
  Send,
  Activity,
  Bot
} from 'lucide-react';

export default function LandingPage() {
  const { t } = useLanguage();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [faqOpen, setFaqOpen] = useState(null);
  const [contactForm, setContactForm] = useState({ name: '', phone: '', message: '', village: '' });

  const handleBookDoctor = (doc) => {
    addToast(`Selected ${doc.name} for appointment. Redirecting to booking...`, 'success', 'Doctor Selected');
    navigate(`/patient-dashboard?doctor=${encodeURIComponent(doc.name)}`);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) {
      addToast('Please enter your name and phone number.', 'warning', 'Contact Form');
      return;
    }
    addToast('Thank you! Our Village Healthcare Representative will call you shortly.', 'success', 'Request Sent');
    setContactForm({ name: '', phone: '', message: '', village: '' });
  };

  const filteredDoctors = mockDoctors.filter(doc => {
    const matchesDept = selectedDept === 'All' || doc.specialization.toLowerCase().includes(selectedDept.toLowerCase());
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || doc.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const faqs = [
    {
      q: "How does the AI Symptom Checker help rural patients?",
      a: "Patients or village healthcare workers input basic symptoms in English, Tamil, or Hindi. The AI engine instantly prioritizes severity (Mild, Moderate, Emergency) and points you directly to the correct doctor or emergency ambulance."
    },
    {
      q: "Can I use ArogyaGram without internet connection?",
      a: "Yes! ArogyaGram features offline state synchronization. Your QR Health Card and emergency details remain accessible offline on your smartphone or ASHA worker's tablet."
    },
    {
      q: "How do I download my QR Code Health Card?",
      a: "Once registered, your digital QR Health Card is automatically generated in your Patient Dashboard. You can print it or keep it saved on your phone for instant doctor scan."
    },
    {
      q: "What happens when I trigger an Emergency Ambulance (108)?",
      a: "Our system broadcasts your precise GPS location to the nearest rural 108 dispatch unit, allowing you to track the driver's real-time ETA on an interactive map."
    }
  ];

  return (
    <div className="space-y-24 pb-12">

      {/* Hero Section */}
      <section className="relative pt-12 lg:pt-20 overflow-hidden">
        
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-emeraldCustom-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-bold tracking-wide">
                <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                <span>Next-Gen Rural Tele-Health & AI System</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.15] tracking-tight">
                {t('heroTitle')}
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                {t('heroSub')}
              </p>

              {/* Dynamic Search Bar */}
              <div className="p-2 rounded-2xl glass-card border shadow-xl flex items-center space-x-2 max-w-xl">
                <Search className="w-5 h-5 text-slate-400 ml-3" />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none focus:outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm font-medium"
                />
                <button
                  onClick={() => {
                    const el = document.getElementById('doctor-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-3 rounded-xl glass-button text-white text-xs font-bold flex items-center space-x-1 shrink-0"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Call to Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/ai-symptom-checker"
                  className="px-6 py-3.5 rounded-xl glass-button text-white font-bold text-sm flex items-center space-x-2 shadow-lg shadow-brand-500/25"
                >
                  <Bot className="w-5 h-5 text-amber-300" />
                  <span>{t('tryAiChecker')}</span>
                </Link>
                <Link
                  to="/ambulance-tracker"
                  className="px-6 py-3.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm flex items-center space-x-2 shadow-lg shadow-rose-500/25 transition-all"
                >
                  <PhoneCall className="w-5 h-5 animate-bounce" />
                  <span>{t('emergencyCall')}</span>
                </Link>
              </div>

              {/* Badges */}
              <div className="pt-4 flex items-center space-x-6 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emeraldCustom-500" />
                  <span>ABDM Compliant</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emeraldCustom-500" />
                  <span>Instant QR Card</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emeraldCustom-500" />
                  <span>Tamil & Hindi Support</span>
                </div>
              </div>

            </motion.div>

            {/* Right Hero Interactive Graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="p-6 rounded-3xl glass-card border shadow-2xl space-y-6 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                      <Stethoscope className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">Live Village Tele-Clinic</div>
                      <div className="text-xs text-emeraldCustom-500 font-semibold flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-emeraldCustom-500 animate-ping" />
                        <span>Connected to 45 Rural Centers</span>
                      </div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold border border-sky-500/20">
                    24/7 Active
                  </span>
                </div>

                {/* Floating Preview Cards */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                        <QrCode className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Digital QR Health Card</div>
                        <div className="text-[11px] text-slate-500">Scan at any village PHC</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">READY</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">108 Emergency Ambulance</div>
                        <div className="text-[11px] text-slate-500">Live GPS tracking unit</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400">8 MIN ETA</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white flex items-center justify-between shadow-lg">
                  <div>
                    <div className="text-xs font-medium text-sky-100">Need Immediate Health Guidance?</div>
                    <div className="text-sm font-bold">Ask AI Doctor Bot</div>
                  </div>
                  <Link
                    to="/ai-symptom-checker"
                    className="px-3.5 py-1.5 rounded-xl bg-white text-brand-600 text-xs font-bold shadow hover:bg-sky-50 transition-colors"
                  >
                    Open AI Chat
                  </Link>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* Statistics Counter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl glass-card border shadow-xl grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-brand-600 dark:text-brand-400">50,000+</div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">{t('statsPatients')}</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-emeraldCustom-500">120+</div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">{t('statsDoctors')}</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-purple-500">45+</div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">{t('statsVillages')}</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-500">99.2%</div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">{t('statsSatisfaction')}</div>
          </div>
        </div>
      </section>


      {/* Key Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Designed specifically for Rural Healthcare Challenges
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Empowering remote villages with high-tech telemedicine, automated AI diagnosis, and emergency response capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="p-6 rounded-3xl glass-card border hover:border-brand-500/50 transition-all duration-300 group space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">AI Symptom Triage</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Interactive AI engine asking intelligent clinical questions in English, Tamil, or Hindi to assess risk severity and direct patients to the right specialist.
            </p>
            <Link to="/ai-symptom-checker" className="inline-flex items-center space-x-1 text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline">
              <span>Launch Symptom Checker</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl glass-card border hover:border-emeraldCustom-500/50 transition-all duration-300 group space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emeraldCustom-500/10 text-emeraldCustom-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">24/7 Telemedicine Consult</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              High-quality video calling optimized for low-bandwidth village networks, with instant digital prescriptions sent via SMS and WhatsApp.
            </p>
            <Link to="/telemedicine" className="inline-flex items-center space-x-1 text-xs font-bold text-emeraldCustom-500 hover:underline">
              <span>Enter Telemedicine Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl glass-card border hover:border-amber-500/50 transition-all duration-300 group space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Digital QR Health Card</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Unified digital health identity storing blood group, allergies, vaccination logs, and emergency contact details for instant scanning.
            </p>
            <Link to="/patient-dashboard" className="inline-flex items-center space-x-1 text-xs font-bold text-amber-500 hover:underline">
              <span>Generate My QR Card</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl glass-card border hover:border-rose-500/50 transition-all duration-300 group space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Emergency 108 GPS Tracker</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Real-time map simulation broadcasting driver position, vehicle speed, and estimated arrival time to worried family members.
            </p>
            <Link to="/ambulance-tracker" className="inline-flex items-center space-x-1 text-xs font-bold text-rose-500 hover:underline">
              <span>Track Ambulance</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl glass-card border hover:border-purple-500/50 transition-all duration-300 group space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <WifiOff className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Offline Synchronization</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Guarantees zero data loss when ASHA workers or patients travel into zero-network forest or tribal regions.
            </p>
            <span className="text-xs font-bold text-purple-500 flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Automatic Background Sync</span>
            </span>
          </div>

          <div className="p-6 rounded-3xl glass-card border hover:border-indigo-500/50 transition-all duration-300 group space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Health Risk Predictor</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Predictive risk analytics for Diabetes, Cardiovascular disease, Hypertension, and Malnutrition tailored to rural lifestyles.
            </p>
            <Link to="/ai-symptom-checker?tab=risk" className="inline-flex items-center space-x-1 text-xs font-bold text-indigo-500 hover:underline">
              <span>Run Risk Predictor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>


      {/* Doctor Showcase Section */}
      <section id="doctor-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">Available Doctors</div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Consult Verified Rural Specialists</h2>
          </div>

          {/* Department Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {['All', 'General Medicine', 'Cardiology', 'Pediatrics', 'Orthopedics'].map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedDept === dept
                    ? 'bg-brand-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDoctors.map((doc) => (
            <div key={doc.id} className="p-5 rounded-3xl glass-card border hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-200">
                  <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emeraldCustom-500 text-white text-[10px] font-extrabold shadow">
                    AVAILABLE TODAY
                  </span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{doc.name}</h4>
                  <div className="text-xs font-semibold text-brand-600 dark:text-brand-400">{doc.specialization}</div>
                  <div className="text-[11px] text-slate-500">{doc.degree} • {doc.experience} Experience</div>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 pt-1">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-slate-900 dark:text-white">{doc.rating}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">Reach: {doc.villageReach}</div>
                </div>
              </div>

              <button
                onClick={() => handleBookDoctor(doc)}
                className="w-full py-2.5 rounded-xl glass-button text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Book Consultation</span>
              </button>
            </div>
          ))}
        </div>
      </section>


      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">Everything you need to know about ArogyaGram healthcare services.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-2xl glass-card border overflow-hidden">
              <button
                onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-brand-500 transition-transform duration-300 ${faqOpen === idx ? 'rotate-180' : ''}`} />
              </button>
              {faqOpen === idx && (
                <div className="p-5 pt-0 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>


      {/* Contact & Village Healthcare Request */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl glass-card border shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <span className="px-3 py-1 rounded-full bg-emeraldCustom-500/10 text-emeraldCustom-600 dark:text-emeraldCustom-400 text-xs font-bold border border-emeraldCustom-500/20">
              Community Health Desk
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Need Assistance in Your Village?</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Request a visit from an ArogyaGram ASHA Worker or set up a Telemedicine Kiosk in your village panchayat.
            </p>
            <div className="space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emeraldCustom-500" />
                <span>Free Health Checkup Camps for Rural Senior Citizens</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emeraldCustom-500" />
                <span>Free Medicine Distribution through Government PHC</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleContactSubmit} className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Full Name"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className="p-3.5 rounded-xl glass-input text-sm w-full font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                className="p-3.5 rounded-xl glass-input text-sm w-full font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <input
              type="text"
              placeholder="Village Name & District"
              value={contactForm.village}
              onChange={(e) => setContactForm({ ...contactForm, village: e.target.value })}
              className="p-3.5 rounded-xl glass-input text-sm w-full font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <textarea
              rows={3}
              placeholder="Describe your health concern or request..."
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              className="p-3.5 rounded-xl glass-input text-sm w-full font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
            />
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl glass-button text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-lg"
            >
              <Send className="w-4 h-4" />
              <span>Submit Request to Health Desk</span>
            </button>
          </form>

        </div>
      </section>

    </div>
  );
}
