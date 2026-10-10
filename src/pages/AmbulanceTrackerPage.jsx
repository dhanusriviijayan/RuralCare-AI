import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNotification } from '../context/NotificationContext';
import { mockAmbulances } from '../data/mockData';
import {
  Truck,
  PhoneCall,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Navigation,
  User,
  Radio
} from 'lucide-react';

export default function AmbulanceTrackerPage() {
  const { addToast } = useNotification();
  const [activeAmbulance, setActiveAmbulance] = useState(mockAmbulances[0]);
  const [eta, setEta] = useState(activeAmbulance.etaMinutes || 8);
  const [isDispatched, setIsDispatched] = useState(true);

  useEffect(() => {
    if (eta > 0 && isDispatched) {
      const timer = setInterval(() => {
        setEta(prev => Math.max(prev - 1, 0));
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [eta, isDispatched]);

  const handleManualDispatch = () => {
    setIsDispatched(true);
    setEta(10);
    addToast('108 Emergency Dispatch unit notified! Driver assigned.', 'success', 'Ambulance Dispatched');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-700 via-rose-800 to-slate-950 text-white shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-rose-200 text-xs font-bold backdrop-blur-md">
            <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>National Emergency Helpline 108 • Live Satellite Tracking</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Emergency Ambulance GPS Tracker
          </h1>
          <p className="text-xs sm:text-sm text-rose-100 max-w-xl">
            Real-time GPS telemetry for rural patients & village community health centers.
          </p>
        </div>

        <button
          onClick={handleManualDispatch}
          className="px-6 py-3.5 rounded-2xl bg-white text-rose-700 hover:bg-rose-50 text-xs font-black flex items-center space-x-2 shadow-xl transition-all relative z-10"
        >
          <Truck className="w-5 h-5 animate-bounce" />
          <span>Dispatch New 108 Unit</span>
        </button>
      </div>

      {/* Map & Telemetry Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Interactive SVG GPS Map Simulator */}
        <div className="lg:col-span-8 p-6 rounded-3xl glass-card border space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Navigation className="w-4 h-4 text-rose-500" />
              <span>Sirsi Rural Sector GPS Live Map</span>
            </div>
            <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emeraldCustom-500/10 text-emeraldCustom-500 border border-emeraldCustom-500/20">
              GPS SIGNAL STRONG
            </span>
          </div>

          {/* Map Simulation Graphic */}
          <div className="relative h-96 rounded-2xl bg-slate-900 overflow-hidden border border-slate-700 flex items-center justify-center">
            
            {/* Grid & Map Roads Canvas Mockup */}
            <svg className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* Road Path */}
              <path d="M 50 300 Q 200 150 400 200 T 700 100" fill="none" stroke="#0284c7" strokeWidth="6" strokeDasharray="8 8" />
            </svg>

            {/* Hospital Marker */}
            <div className="absolute top-16 right-16 flex flex-col items-center">
              <div className="p-3 rounded-2xl bg-emeraldCustom-500 text-white shadow-xl animate-pulse">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-emeraldCustom-400 bg-slate-950/80 px-2 py-0.5 rounded mt-1">
                Sirsi District Hospital
              </span>
            </div>

            {/* Moving Ambulance Marker */}
            <motion.div
              animate={{ x: [0, 80, 160, 240, 320], y: [0, -30, -10, -50, -80] }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-24 left-20 flex flex-col items-center"
            >
              <div className="p-3 rounded-2xl bg-rose-600 text-white shadow-2xl border-2 border-white animate-bounce">
                <Truck className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-bold text-rose-300 bg-slate-950/90 px-2.5 py-0.5 rounded mt-1 border border-rose-500/30">
                108 Ambulance ({eta} mins away)
              </span>
            </motion.div>

            {/* Target Patient Marker */}
            <div className="absolute bottom-16 right-48 flex flex-col items-center">
              <div className="p-2.5 rounded-full bg-amber-500 text-white shadow-lg">
                <User className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-amber-300 bg-slate-950/80 px-2 py-0.5 rounded mt-1">
                Patient Pickup Location
              </span>
            </div>

          </div>
        </div>

        {/* Right Side: Driver & Vehicle Telemetry Panel */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* ETA Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-rose-900 to-slate-900 text-white border border-rose-500/40 shadow-2xl text-center space-y-2">
            <div className="text-xs font-bold opacity-80 uppercase tracking-wider">Estimated Arrival Time</div>
            <div className="text-5xl font-black text-amber-300 tracking-tight">
              {eta} <span className="text-lg text-white font-bold">MINS</span>
            </div>
            <div className="text-[11px] text-rose-200 font-medium">Vehicle En Route • Driving at 55 km/h</div>
          </div>

          {/* Driver Contact Details */}
          <div className="p-6 rounded-3xl glass-card border space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Assigned Ambulance Unit</h3>
            
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-slate-400 font-medium">Vehicle ID</div>
                  <div className="font-bold text-rose-500 text-sm">{activeAmbulance.id}</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emeraldCustom-500/10 text-emeraldCustom-500 font-bold text-[10px]">
                  ICU EQUIPPED
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-slate-400 font-medium">Driver Name</div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">{activeAmbulance.driverName}</div>
                </div>
                <a
                  href={`tel:${activeAmbulance.driverPhone}`}
                  className="p-2.5 rounded-xl bg-emeraldCustom-500 text-white font-bold flex items-center space-x-1 shadow hover:bg-emeraldCustom-600 transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call</span>
                </a>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-300">
                <span className="font-bold">Target Emergency Patient: </span>
                {activeAmbulance.targetPatient}
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
