import React from 'react';
import { HeartPulse, PhoneCall, Mail, MapPin, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-emeraldCustom-500 flex items-center justify-center shadow-lg">
                <HeartPulse className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-brand-600 to-emeraldCustom-500 bg-clip-text text-transparent">
                ArogyaGram
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Bridging the healthcare divide in rural villages through AI symptom triage, digital prescriptions, instant QR health cards, and emergency response.
            </p>
            <div className="pt-2 flex items-center space-x-2 text-xs font-semibold text-rose-500 bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50">
              <PhoneCall className="w-4 h-4 animate-bounce" />
              <span>National Emergency Helpline: 108 / 112</span>
            </div>
          </div>

          {/* Col 2: Quick Healthcare Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Healthcare Suite
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/ai-symptom-checker" className="hover:text-brand-500 transition-colors flex items-center space-x-1">
                  <span>AI Symptom Checker</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link to="/telemedicine" className="hover:text-brand-500 transition-colors flex items-center space-x-1">
                  <span>24/7 Telemedicine Video Consult</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link to="/ambulance-tracker" className="hover:text-brand-500 transition-colors flex items-center space-x-1">
                  <span>Emergency 108 GPS Tracker</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link to="/patient-dashboard" className="hover:text-brand-500 transition-colors flex items-center space-x-1">
                  <span>QR Health Card Generator</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Community & Governance */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Rural Health Network
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>Primary Health Centres (PHC)</li>
              <li>ASHA & Village Worker Portal</li>
              <li>Tele-Consultation Kiosks</li>
              <li>District Medical Analytics</li>
              <li>Medicine Stock Transparency</li>
            </ul>
          </div>

          {/* Col 4: Reach Us */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Contact & Support
            </h4>
            <div className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-brand-500 mt-1 shrink-0" />
                <span>Sirsi Block Community Health Hub, Uttara Kannada District, Karnataka 581401</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emeraldCustom-500 shrink-0" />
                <span>support@arogyagram.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                <span>ISO 27001 & ABDM Compliant</span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div>
            © 2026 ArogyaGram Rural Healthcare Management System. All rights reserved.
          </div>
          <div className="flex items-center space-x-1 mt-4 sm:mt-0">
            <span>Engineered with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for Village Communities</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
