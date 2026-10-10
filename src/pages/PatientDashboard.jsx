import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { mockAppointments, mockPrescriptions, mockLabReports } from '../data/mockData';
import {
  Heart,
  Activity,
  Calendar,
  Clock,
  Pill,
  FileText,
  QrCode,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Download,
  Plus,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
  User,
  Video,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PatientDashboard() {
  const { user } = useAuth();
  const { addToast } = useNotification();

  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // overview, appointments, prescriptions, labs
  const [reminders, setReminders] = useState([
    { id: 1, name: 'Paracetamol 500mg', time: '08:00 AM', taken: true },
    { id: 2, name: 'Metformin 500mg', time: '01:30 PM', taken: false },
    { id: 3, name: 'Cetirizine 10mg', time: '09:00 PM', taken: false }
  ]);

  const patient = user || {
    name: "Ramu Somayya",
    id: "PAT-8842",
    age: 42,
    gender: "Male",
    bloodGroup: "O+",
    village: "Sirsi Rural",
    healthScore: 84,
    vitals: { bp: "128/84 mmHg", heartRate: "74 bpm", bmi: "24.2 (Normal)", sugarLevel: "115 mg/dL", oxygen: "98%" },
    emergencyContact: { name: "Lakshmi Somayya", phone: "+91 98450 99999" }
  };

  const toggleReminder = (id) => {
    setReminders(prev => prev.map(r => {
      if (r.id === id) {
        const nextState = !r.taken;
        addToast(nextState ? `Marked ${r.name} as TAKEN.` : `Unchecked ${r.name}`, 'info', 'Medicine Reminder');
        return { ...r, taken: nextState };
      }
      return r;
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-700 via-sky-800 to-indigo-900 text-white shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-sky-200 text-xs font-bold backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emeraldCustom-400" />
            <span>Rural Patient Portal • ID: {patient.id}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Welcome back, {patient.name}!
          </h1>
          <p className="text-xs sm:text-sm text-sky-100 max-w-xl">
            Village: <span className="font-bold text-white">{patient.village}</span> • Blood Group: <span className="font-bold text-amber-300">{patient.bloodGroup}</span>
          </p>
        </div>

        <div className="flex items-center space-x-3 relative z-10">
          <button
            onClick={() => setQrModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-white text-brand-700 hover:bg-sky-50 text-xs font-extrabold flex items-center space-x-2 shadow-lg transition-all"
          >
            <QrCode className="w-4 h-4" />
            <span>View Digital Health Card</span>
          </button>
          <Link
            to="/ai-symptom-checker"
            className="px-4 py-2.5 rounded-2xl bg-emeraldCustom-500 hover:bg-emeraldCustom-600 text-white text-xs font-extrabold flex items-center space-x-2 shadow-lg transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Symptom Check</span>
          </Link>
        </div>
      </div>

      {/* Vitals & Health Score Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        
        {/* Health Score Card */}
        <div className="p-5 rounded-3xl glass-card border flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold">Health Score</span>
            <TrendingUp className="w-4 h-4 text-emeraldCustom-500" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-emeraldCustom-500">{patient.healthScore}</span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-emeraldCustom-500 h-full rounded-full" style={{ width: `${patient.healthScore}%` }} />
          </div>
        </div>

        {/* Blood Pressure */}
        <div className="p-5 rounded-3xl glass-card border flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold">Blood Pressure</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">
            {patient.vitals?.bp || '128/84 mmHg'}
          </div>
          <div className="text-[11px] font-semibold text-emeraldCustom-500">Optimal Range</div>
        </div>

        {/* Heart Rate */}
        <div className="p-5 rounded-3xl glass-card border flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold">Heart Rate</span>
            <Activity className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">
            {patient.vitals?.heartRate || '74 bpm'}
          </div>
          <div className="text-[11px] font-semibold text-sky-500">Resting Normal</div>
        </div>

        {/* BMI Index */}
        <div className="p-5 rounded-3xl glass-card border flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold">BMI Index</span>
            <User className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">
            {patient.vitals?.bmi || '24.2'}
          </div>
          <div className="text-[11px] font-semibold text-emeraldCustom-500">Healthy Mass</div>
        </div>

        {/* Oxygen SPO2 */}
        <div className="p-5 rounded-3xl glass-card border flex flex-col justify-between space-y-2 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold">Blood Oxygen</span>
            <Sparkles className="w-4 h-4 text-brand-500" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">
            {patient.vitals?.oxygen || '98%'}
          </div>
          <div className="text-[11px] font-semibold text-brand-500">SPO2 Healthy</div>
        </div>

      </div>

      {/* Main Grid: Left Details & Right Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (Appointments & Medical Records) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Dashboard Navigation Tabs */}
          <div className="flex space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            {[
              { id: 'overview', label: 'Upcoming Consultations', icon: Calendar },
              { id: 'prescriptions', label: 'Digital Prescriptions', icon: FileText },
              { id: 'labs', label: 'Diagnostic Lab Reports', icon: Activity }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab 1: Appointments */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {mockAppointments.map(apt => (
                <div key={apt.id} className="p-6 rounded-3xl glass-card border hover:border-brand-500/40 transition-all space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-2xl bg-brand-500/10 text-brand-600 flex items-center justify-center font-bold">
                        <Stethoscope className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-base font-bold text-slate-900 dark:text-white">{apt.doctorName}</div>
                        <div className="text-xs text-slate-500">{apt.department} • {apt.type}</div>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-sky-500/10 text-sky-600 border border-sky-500/20 self-start sm:self-auto">
                      {apt.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <div className="text-slate-400">Date & Time</div>
                      <div className="font-bold text-slate-800 dark:text-slate-200">{apt.date} at {apt.time}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Triage Severity</div>
                      <div className="font-bold text-amber-500">{apt.severity}</div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <div className="text-slate-400">Symptoms</div>
                      <div className="font-medium text-slate-700 dark:text-slate-300 truncate">{apt.symptoms}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-2">
                    <Link
                      to="/telemedicine"
                      className="px-4 py-2 rounded-xl bg-emeraldCustom-500 hover:bg-emeraldCustom-600 text-white text-xs font-bold flex items-center space-x-1.5 shadow"
                    >
                      <Video className="w-4 h-4" />
                      <span>Join Telemedicine Video Call</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Prescriptions */}
          {activeTab === 'prescriptions' && (
            <div className="space-y-4">
              {mockPrescriptions.map(rx => (
                <div key={rx.id} className="p-6 rounded-3xl glass-card border space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">Diagnosis: {rx.diagnosis}</div>
                      <div className="text-xs text-slate-500">Issued by {rx.doctorName} on {rx.date}</div>
                    </div>
                    <span className="text-xs font-bold text-emeraldCustom-500 bg-emeraldCustom-500/10 px-2.5 py-1 rounded-full">
                      ACTIVE RX
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Prescribed Dosage Schedule:</div>
                    <div className="space-y-2">
                      {rx.medications.map((med, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 text-xs flex items-center justify-between">
                          <div className="font-bold text-slate-800 dark:text-slate-200">{med.name}</div>
                          <div className="text-slate-500">{med.dosage} • {med.frequency} ({med.duration})</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-400 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                    <span className="font-bold text-amber-600">Doctor Advice: </span>
                    {rx.advice}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Lab Reports */}
          {activeTab === 'labs' && (
            <div className="space-y-4">
              {mockLabReports.map(lab => (
                <div key={lab.id} className="p-5 rounded-3xl glass-card border flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{lab.testName}</div>
                    <div className="text-xs text-slate-500">{lab.category} • Tested: {lab.date}</div>
                    <div className="text-xs font-semibold text-brand-600">{lab.result}</div>
                  </div>
                  <button
                    onClick={() => addToast(`Downloading official PDF for ${lab.testName}`, 'info', 'Lab Report')}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-brand-500 hover:text-white text-xs font-bold flex items-center space-x-1 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Right Column (Medicine Reminders & Quick Health Actions) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Medicine Reminder Widget */}
          <div className="p-6 rounded-3xl glass-card border space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Pill className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Daily Medicine Schedule</h3>
              </div>
              <span className="text-[11px] font-bold text-slate-400">TODAY</span>
            </div>

            <div className="space-y-3">
              {reminders.map(rem => (
                <div
                  key={rem.id}
                  onClick={() => toggleReminder(rem.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    rem.taken
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                      : 'bg-slate-100/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-xl ${rem.taken ? 'bg-emeraldCustom-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${rem.taken ? 'line-through opacity-70' : ''}`}>{rem.name}</div>
                      <div className="text-[11px] text-slate-400">{rem.time}</div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${rem.taken ? 'bg-emeraldCustom-500 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                    {rem.taken ? 'TAKEN' : 'PENDING'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Ambulance Shortcut */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-rose-600 to-rose-800 text-white shadow-xl space-y-3">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-6 h-6 text-amber-300 animate-bounce" />
              <span className="font-extrabold text-base">Rural Ambulance (108)</span>
            </div>
            <p className="text-xs text-rose-100 leading-relaxed">
              Facing an emergency in your village? Tap below to dispatch the nearest unit and track live GPS coordinates.
            </p>
            <Link
              to="/ambulance-tracker"
              className="w-full py-3 rounded-xl bg-white text-rose-600 hover:bg-rose-50 text-xs font-extrabold flex items-center justify-center space-x-2 shadow"
            >
              <span>Dispatch Emergency Ambulance</span>
            </Link>
          </div>

        </div>

      </div>

      {/* QR Code Health Card Modal */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full p-8 rounded-3xl glass-card border shadow-2xl space-y-6 relative">
            <button
              onClick={() => setQrModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">ArogyaGram Digital Health Pass</h3>
              <p className="text-xs text-slate-500">Scan at any village hospital or ASHA kiosk for instant medical records.</p>
            </div>

            <div className="p-6 rounded-3xl bg-white text-slate-900 border-2 border-brand-500 shadow-xl text-center space-y-4">
              <QRCodeSVG
                value={`AG-PATIENT-${patient.name}-${patient.id}`}
                size={180}
                className="mx-auto"
                level="H"
              />
              <div>
                <div className="text-lg font-black text-brand-700">{patient.name}</div>
                <div className="text-xs font-bold text-slate-600">ID: {patient.id} • Blood: {patient.bloodGroup}</div>
                <div className="text-[11px] text-slate-400 mt-1">{patient.village}</div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  addToast('QR Health Card PNG downloaded to your device', 'success');
                  setQrModalOpen(false);
                }}
                className="w-full py-3 rounded-xl glass-button text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow"
              >
                <Download className="w-4 h-4" />
                <span>Save to Phone</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
