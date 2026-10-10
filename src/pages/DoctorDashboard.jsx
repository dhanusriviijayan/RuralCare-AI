import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { mockAppointments, mockPrescriptions } from '../data/mockData';
import {
  Stethoscope,
  UserCheck,
  Video,
  FileText,
  Plus,
  Trash2,
  Send,
  Printer,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  ChevronRight,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DoctorDashboard() {
  const { user } = useAuth();
  const { addToast } = useNotification();

  const doctor = user || {
    name: "Dr. Ananya Sharma",
    specialization: "General Physician & Rural Specialist",
    hospital: "Sirsi Community Health Centre"
  };

  const [activeTab, setActiveTab] = useState('queue'); // queue, prescription, telemedicine
  const [selectedPatient, setSelectedPatient] = useState(mockAppointments[0]);

  // Digital Prescription Editor State
  const [rxForm, setRxForm] = useState({
    diagnosis: 'Acute Respiratory Tract Infection with Fever',
    advice: 'Drink warm boiled water, rest for 3 days, avoid heavy physical labor.',
    medications: [
      { name: 'Paracetamol 500mg', dosage: '1 Tab', frequency: 'TDS (3 times/day)', duration: '5 Days' },
      { name: 'Cetirizine 10mg', dosage: '1 Tab', frequency: 'OD (Night)', duration: '5 Days' }
    ]
  });

  const addMedication = () => {
    setRxForm(prev => ({
      ...prev,
      medications: [...prev.medications, { name: '', dosage: '1 Tab', frequency: 'BD (Twice/day)', duration: '3 Days' }]
    }));
  };

  const removeMedication = (index) => {
    setRxForm(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }));
  };

  const handleMedChange = (index, field, value) => {
    setRxForm(prev => {
      const updated = [...prev.medications];
      updated[index][field] = value;
      return { ...prev, medications: updated };
    });
  };

  const handleIssuePrescription = (e) => {
    e.preventDefault();
    addToast(`Digital Rx issued for ${selectedPatient.patientName}. Sent via SMS & WhatsApp!`, 'success', 'Prescription Signed');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Doctor Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold backdrop-blur-md">
            <Stethoscope className="w-4 h-4 text-emeraldCustom-400" />
            <span>Doctor Clinical Console • {doctor.hospital}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Welcome, {doctor.name}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
            Specialization: <span className="font-bold text-white">{doctor.specialization}</span> • Today's Patients: <span className="font-bold text-amber-300">12 Scheduled</span>
          </p>
        </div>

        <div className="flex items-center space-x-3 relative z-10">
          <button
            onClick={() => setActiveTab('prescription')}
            className="px-4 py-2.5 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 text-xs font-extrabold flex items-center space-x-2 shadow-lg transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>New Digital Prescription</span>
          </button>
          <button
            onClick={() => setActiveTab('telemedicine')}
            className="px-4 py-2.5 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-extrabold flex items-center space-x-2 shadow-lg transition-all"
          >
            <Video className="w-4 h-4" />
            <span>Telemedicine Studio</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Patient Queue & Interactive Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Patient Triage Queue */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Clock className="w-5 h-5 text-brand-500" />
              <span>Today's Patient Queue</span>
            </h3>
            <span className="text-xs font-extrabold text-emeraldCustom-500 bg-emeraldCustom-500/10 px-2.5 py-1 rounded-full">
              3 Active
            </span>
          </div>

          <div className="space-y-3">
            {mockAppointments.map(apt => (
              <div
                key={apt.id}
                onClick={() => setSelectedPatient(apt)}
                className={`p-4 rounded-3xl border cursor-pointer transition-all space-y-2 ${
                  selectedPatient?.id === apt.id
                    ? 'bg-brand-500/10 border-brand-500 text-brand-900 dark:text-brand-100 shadow-md scale-[1.02]'
                    : 'glass-card hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-slate-900 dark:text-white">{apt.patientName}</div>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    apt.severity === 'High' ? 'bg-rose-500 text-white animate-pulse' : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                  }`}>
                    {apt.severity} Triage
                  </span>
                </div>
                <div className="text-xs text-slate-500">{apt.time} • {apt.type}</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 italic truncate">
                  "{apt.symptoms}"
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Active Workspace (Queue / Prescription / Telemedicine) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Work Mode Toggle Tabs */}
          <div className="flex space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            {[
              { id: 'queue', label: 'Patient Clinical File', icon: UserCheck },
              { id: 'prescription', label: 'Digital Rx Editor', icon: FileText },
              { id: 'telemedicine', label: 'Telemedicine Video Studio', icon: Video }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
                  activeTab === tab.id
                    ? 'bg-emeraldCustom-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Mode 1: Patient Clinical File */}
          {activeTab === 'queue' && selectedPatient && (
            <div className="p-6 rounded-3xl glass-card border space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">{selectedPatient.patientName}</h2>
                  <div className="text-xs text-slate-500">Patient ID: {selectedPatient.patientId} • Department: {selectedPatient.department}</div>
                </div>
                <button
                  onClick={() => setActiveTab('prescription')}
                  className="px-4 py-2 rounded-xl glass-button text-white text-xs font-bold flex items-center space-x-1.5"
                >
                  <FileText className="w-4 h-4" />
                  <span>Write Prescription</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80">
                  <div className="text-slate-400 font-medium">Chief Complaint</div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 mt-1">{selectedPatient.symptoms}</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80">
                  <div className="text-slate-400 font-medium">Consultation Type</div>
                  <div className="font-bold text-brand-600 dark:text-brand-400 mt-1">{selectedPatient.type}</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 col-span-2 sm:col-span-1">
                  <div className="text-slate-400 font-medium">Triage Priority</div>
                  <div className="font-bold text-rose-500 mt-1">{selectedPatient.severity} Priority</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Previous Diagnosis & History</h4>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Patient reported mild seasonal fever and cough for 2 days. Known history of mild hypertension. Last lab checkup normal.
                </div>
              </div>
            </div>
          )}

          {/* Mode 2: Digital Prescription Editor */}
          {activeTab === 'prescription' && (
            <form onSubmit={handleIssuePrescription} className="p-6 rounded-3xl glass-card border space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Digital Prescription Editor</h3>
                  <div className="text-xs text-slate-500">Patient: <span className="font-bold text-brand-600">{selectedPatient?.patientName}</span></div>
                </div>
                <span className="text-xs font-bold bg-amber-500/10 text-amber-600 px-2.5 py-1 rounded-full">
                  OFFICIAL RX PENDING
                </span>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Clinical Diagnosis</label>
                <input
                  type="text"
                  value={rxForm.diagnosis}
                  onChange={(e) => setRxForm({ ...rxForm, diagnosis: e.target.value })}
                  className="w-full p-3 rounded-xl glass-input text-xs font-medium text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emeraldCustom-500"
                />
              </div>

              {/* Medications List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Prescribed Medications</label>
                  <button
                    type="button"
                    onClick={addMedication}
                    className="text-xs font-bold text-emeraldCustom-600 dark:text-emeraldCustom-400 flex items-center space-x-1 hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Medicine</span>
                  </button>
                </div>

                {rxForm.medications.map((med, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border grid grid-cols-12 gap-2 items-center text-xs">
                    <input
                      type="text"
                      placeholder="Medicine Name (e.g. Paracetamol)"
                      value={med.name}
                      onChange={(e) => handleMedChange(idx, 'name', e.target.value)}
                      className="col-span-5 p-2 rounded-lg glass-input font-medium"
                    />
                    <input
                      type="text"
                      placeholder="Dosage"
                      value={med.dosage}
                      onChange={(e) => handleMedChange(idx, 'dosage', e.target.value)}
                      className="col-span-2 p-2 rounded-lg glass-input font-medium"
                    />
                    <input
                      type="text"
                      placeholder="Frequency"
                      value={med.frequency}
                      onChange={(e) => handleMedChange(idx, 'frequency', e.target.value)}
                      className="col-span-3 p-2 rounded-lg glass-input font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => removeMedication(idx)}
                      className="col-span-2 p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Doctor Advice & Dietary Instructions</label>
                <textarea
                  rows={2}
                  value={rxForm.advice}
                  onChange={(e) => setRxForm({ ...rxForm, advice: e.target.value })}
                  className="w-full p-3 rounded-xl glass-input text-xs font-medium text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emeraldCustom-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <div className="text-[11px] text-slate-400 font-semibold flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4 text-emeraldCustom-500" />
                  <span>Digital Signature Attached ({doctor.name})</span>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-emeraldCustom-500 hover:bg-emeraldCustom-600 text-white text-xs font-bold flex items-center space-x-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Sign & Issue Prescription</span>
                </button>
              </div>
            </form>
          )}

          {/* Mode 3: Telemedicine Video Studio */}
          {activeTab === 'telemedicine' && (
            <div className="p-6 rounded-3xl glass-card border space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Live Video Consultation Studio</h3>
                </div>
                <span className="text-xs font-bold text-slate-400">Connected: {selectedPatient?.patientName}</span>
              </div>

              {/* Video Mockup Frame */}
              <div className="relative h-72 sm:h-80 rounded-2xl bg-slate-900 overflow-hidden flex items-center justify-center text-white border border-slate-700 shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
                  alt="Telemedicine Consultation"
                  className="w-full h-full object-cover opacity-80"
                />
                
                {/* PIP Doctor Self View */}
                <div className="absolute bottom-4 right-4 w-28 h-20 rounded-xl bg-slate-800 border-2 border-emeraldCustom-500 overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300"
                    alt="Doctor Self View"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[11px] font-bold text-emeraldCustom-400 flex items-center space-x-1.5 border border-emeraldCustom-500/30">
                  <Video className="w-3.5 h-3.5 animate-pulse text-emeraldCustom-400" />
                  <span>Bandwidth: 1.2 Mbps (Low Latency Village Mode)</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Link
                  to="/telemedicine"
                  className="px-4 py-2.5 rounded-xl glass-button text-white text-xs font-bold flex items-center space-x-1.5"
                >
                  <Video className="w-4 h-4" />
                  <span>Open Fullscreen Video Room</span>
                </Link>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
