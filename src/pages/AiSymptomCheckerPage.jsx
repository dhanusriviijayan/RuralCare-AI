import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useNotification } from '../context/NotificationContext';
import {
  Sparkles,
  Bot,
  Stethoscope,
  AlertTriangle,
  CheckCircle2,
  Activity,
  ArrowRight,
  Send,
  MessageSquare,
  ShieldCheck,
  Zap,
  Mic,
  RotateCcw
} from 'lucide-react';

export default function AiSymptomCheckerPage() {
  const { lang, t } = useLanguage();
  const { addToast } = useNotification();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialTab = searchParams.get('tab') === 'risk' ? 'risk' : searchParams.get('tab') === 'chat' ? 'chat' : 'checker';
  const [activeTab, setActiveTab] = useState(initialTab);

  // AI Symptom Checker State
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [customSymptomInput, setCustomSymptomInput] = useState('');
  const [duration, setDuration] = useState('1-3 days');
  const [checkerResult, setCheckerResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Health Risk Predictor State
  const [riskInputs, setRiskInputs] = useState({
    age: 45,
    gender: 'Male',
    bmi: 26.5,
    systolicBp: 135,
    diastolicBp: 88,
    fastingSugar: 125,
    familyHistory: true,
    smoking: false
  });
  const [riskAssessment, setRiskAssessment] = useState(null);

  // Chatbot State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'Namaste! I am your ArogyaGram AI Healthcare Assistant. You can ask me questions in English, தமிழ் (Tamil), or हिंदी (Hindi). How can I assist your health today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const commonSymptoms = [
    { id: 'fever', label: 'Fever / High Body Temp', cat: 'General' },
    { id: 'cough', label: 'Persistent Dry Cough', cat: 'Respiratory' },
    { id: 'chest_pain', label: 'Chest Pain or Pressure', cat: 'Cardiology', emergency: true },
    { id: 'shortness_breath', label: 'Difficulty Breathing', cat: 'Respiratory', emergency: true },
    { id: 'headache', label: 'Severe Headache / Dizziness', cat: 'Neurology' },
    { id: 'joint_pain', label: 'Joint Stiffness & Pain', cat: 'Orthopedics' },
    { id: 'stomach_pain', label: 'Abdominal Pain & Nausea', cat: 'Gastroenterology' },
    { id: 'fatigue', label: 'Extreme Fatigue & Weakness', cat: 'General' }
  ];

  const toggleSymptom = (sym) => {
    setSelectedSymptoms(prev =>
      prev.find(s => s.id === sym.id) ? prev.filter(s => s.id !== sym.id) : [...prev, sym]
    );
  };

  const handleAddCustomSymptom = (e) => {
    e.preventDefault();
    if (!customSymptomInput.trim()) return;
    const newSym = { id: `custom_${Date.now()}`, label: customSymptomInput, cat: 'Custom' };
    setSelectedSymptoms(prev => [...prev, newSym]);
    setCustomSymptomInput('');
  };

  const runAiAnalysis = () => {
    if (selectedSymptoms.length === 0) {
      addToast('Please select at least one symptom for AI triage analysis.', 'warning');
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      
      const hasEmergency = selectedSymptoms.some(s => s.emergency);
      const isHigh = hasEmergency || selectedSymptoms.length >= 4;

      let dept = 'General Medicine';
      if (selectedSymptoms.some(s => s.cat === 'Cardiology')) dept = 'Cardiology & Emergency';
      else if (selectedSymptoms.some(s => s.cat === 'Respiratory')) dept = 'Pulmonology / General Medicine';
      else if (selectedSymptoms.some(s => s.cat === 'Orthopedics')) dept = 'Orthopedics';
      else if (selectedSymptoms.some(s => s.cat === 'Gastroenterology')) dept = 'Gastroenterology';

      const result = {
        severity: isHigh ? 'HIGH RISK - EMERGENCY ALERT' : selectedSymptoms.length >= 2 ? 'MODERATE SEVERITY' : 'MILD / ROUTINE',
        recommendedDept: dept,
        confidence: '96.4%',
        suggestedDoctor: dept.includes('Cardiology') ? 'Dr. Murugan Velu' : 'Dr. Ananya Sharma',
        advice: isHigh
          ? 'CRITICAL ALERT: Your symptoms indicate potential acute cardiac or respiratory distress. Immediately dispatch a 108 Emergency Ambulance or visit the nearest Primary Health Centre.'
          : 'Schedule a Telemedicine video consultation within 24 hours. Keep warm, rest, and monitor fluid intake.',
        emergencyActionNeeded: isHigh
      };

      setCheckerResult(result);
      addToast('AI Triage Analysis Complete!', 'success', 'Result Ready');
    }, 1200);
  };

  const calculateHealthRisk = () => {
    let diabetesScore = 20;
    if (riskInputs.fastingSugar > 110) diabetesScore += 35;
    if (riskInputs.bmi > 25) diabetesScore += 25;
    if (riskInputs.familyHistory) diabetesScore += 15;

    let heartScore = 15;
    if (riskInputs.systolicBp > 130 || riskInputs.diastolicBp > 85) heartScore += 40;
    if (riskInputs.smoking) heartScore += 25;
    if (riskInputs.age > 40) heartScore += 15;

    setRiskAssessment({
      diabetesRisk: Math.min(diabetesScore, 95),
      heartRisk: Math.min(heartScore, 95),
      hypertensionRisk: riskInputs.systolicBp > 130 ? 78 : 22,
      obesityRisk: riskInputs.bmi > 28 ? 82 : riskInputs.bmi > 25 ? 45 : 18
    });
    addToast('Calculated clinical risk factors.', 'success', 'Risk Assessment');
  };

  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    setTimeout(() => {
      let reply = "I understand your health query. Based on rural clinical protocols, I recommend consulting Dr. Ananya Sharma via Telemedicine for exact dosage guidance.";
      if (userText.toLowerCase().includes('fever') || userText.toLowerCase().includes('காய்ச்சல்') || userText.toLowerCase().includes('बुखार')) {
        reply = "For mild fever: Stay hydrated with clean ORS water, rest adequately. If temp exceeds 101°F for over 2 days, book a consultation right away.";
      } else if (userText.toLowerCase().includes('ambulance') || userText.toLowerCase().includes('108')) {
        reply = "In case of emergency, please tap the Emergency 108 button on our top navigation bar for instant GPS vehicle dispatch.";
      }

      setChatMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-800 via-indigo-900 to-slate-950 text-white shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-bold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span>AI Clinical Decision Support Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Rural Healthcare AI Assistant
          </h1>
          <p className="text-xs sm:text-sm text-purple-100 max-w-xl">
            Triage symptoms, predict chronic disease risks, and chat with AI in English, Tamil, and Hindi.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-white/10 p-1.5 rounded-2xl backdrop-blur-md text-xs font-bold relative z-10">
          <button
            onClick={() => setActiveTab('checker')}
            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'checker' ? 'bg-white text-purple-950 shadow' : 'text-white hover:text-purple-200'}`}
          >
            Symptom Checker
          </button>
          <button
            onClick={() => setActiveTab('risk')}
            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'risk' ? 'bg-white text-purple-950 shadow' : 'text-white hover:text-purple-200'}`}
          >
            Risk Predictor
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'chat' ? 'bg-white text-purple-950 shadow' : 'text-white hover:text-purple-200'}`}
          >
            AI Chatbot
          </button>
        </div>
      </div>

      {/* Tab 1: AI Symptom Checker */}
      {activeTab === 'checker' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Symptom Selector */}
          <div className="lg:col-span-7 p-6 rounded-3xl glass-card border space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Bot className="w-5 h-5 text-brand-500" />
                <span>Select Patient Symptoms</span>
              </h2>
              <p className="text-xs text-slate-500">Tap common symptoms or type custom health complaints.</p>
            </div>

            {/* Symptoms Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {commonSymptoms.map(sym => {
                const isSelected = selectedSymptoms.some(s => s.id === sym.id);
                return (
                  <button
                    key={sym.id}
                    onClick={() => toggleSymptom(sym)}
                    className={`p-3.5 rounded-2xl border text-left text-xs transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-brand-500/10 border-brand-500 text-brand-900 dark:text-brand-100 font-bold shadow-md'
                        : 'bg-slate-100/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{sym.label}</span>
                    {sym.emergency && (
                      <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-500 text-[10px] font-extrabold">
                        HIGH
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Custom Input */}
            <form onSubmit={handleAddCustomSymptom} className="flex space-x-2">
              <input
                type="text"
                placeholder="Type additional symptom (e.g. Skin rash, ear pain)..."
                value={customSymptomInput}
                onChange={(e) => setCustomSymptomInput(e.target.value)}
                className="flex-1 p-3 rounded-xl glass-input text-xs font-medium focus:ring-2 focus:ring-brand-500"
              />
              <button
                type="submit"
                className="px-4 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-brand-500 hover:text-white transition-colors"
              >
                Add
              </button>
            </form>

            <button
              onClick={runAiAnalysis}
              disabled={isAnalyzing}
              className="w-full py-4 rounded-2xl glass-button text-white font-extrabold text-sm flex items-center justify-center space-x-2 shadow-xl"
            >
              {isAnalyzing ? (
                <span>Analyzing symptoms with AI Model...</span>
              ) : (
                <>
                  <Zap className="w-5 h-5 text-amber-300" />
                  <span>Run AI Triage & Doctor Recommendation</span>
                </>
              )}
            </button>
          </div>

          {/* Right Triage Analysis Result */}
          <div className="lg:col-span-5 space-y-4">
            {checkerResult ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-6 rounded-3xl border shadow-2xl space-y-5 ${
                  checkerResult.emergencyActionNeeded
                    ? 'bg-rose-950/90 border-rose-500 text-rose-100'
                    : 'glass-card border-brand-500/30'
                }`}
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-emeraldCustom-400" />
                    <span className="font-extrabold text-xs tracking-wider uppercase">AI Triage Report</span>
                  </div>
                  <span className="text-[10px] font-bold bg-white/10 px-2.5 py-0.5 rounded-full">
                    {checkerResult.confidence} Match
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold opacity-80">Assessed Severity:</div>
                  <div className={`text-xl font-black ${checkerResult.emergencyActionNeeded ? 'text-rose-400 animate-pulse' : 'text-emeraldCustom-400'}`}>
                    {checkerResult.severity}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 text-xs space-y-2">
                  <div>
                    <span className="opacity-70">Recommended Department: </span>
                    <span className="font-bold text-white">{checkerResult.recommendedDept}</span>
                  </div>
                  <div>
                    <span className="opacity-70">Suggested Specialist: </span>
                    <span className="font-bold text-amber-300">{checkerResult.suggestedDoctor}</span>
                  </div>
                </div>

                <div className="text-xs leading-relaxed opacity-90 p-3 rounded-xl bg-black/20">
                  <span className="font-bold">Clinical Advice: </span>
                  {checkerResult.advice}
                </div>

                {checkerResult.emergencyActionNeeded ? (
                  <button
                    onClick={() => navigate('/ambulance-tracker')}
                    className="w-full py-3.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs shadow-lg flex items-center justify-center space-x-2"
                  >
                    <span>Dispatch Emergency 108 Ambulance</span>
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/patient-dashboard?doctor=${encodeURIComponent(checkerResult.suggestedDoctor)}`)}
                    className="w-full py-3.5 rounded-xl glass-button text-white font-extrabold text-xs shadow-lg flex items-center justify-center space-x-2"
                  >
                    <Stethoscope className="w-4 h-4" />
                    <span>Book Consultation with {checkerResult.suggestedDoctor}</span>
                  </button>
                )}
              </motion.div>
            ) : (
              <div className="p-8 rounded-3xl glass-card border text-center space-y-4 text-slate-400">
                <Bot className="w-12 h-12 mx-auto text-brand-500 opacity-50" />
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">AI Triage Dashboard Ready</h3>
                <p className="text-xs">Select symptoms on the left and tap "Run AI Triage" to view severity scoring and doctor routing.</p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* Tab 2: Health Risk Predictor */}
      {activeTab === 'risk' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 p-6 rounded-3xl glass-card border space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Input Clinical Risk Parameters</h2>
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Age</label>
                <input
                  type="number"
                  value={riskInputs.age}
                  onChange={(e) => setRiskInputs({ ...riskInputs, age: Number(e.target.value) })}
                  className="w-full p-3 rounded-xl glass-input font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">BMI Index</label>
                <input
                  type="number"
                  step="0.1"
                  value={riskInputs.bmi}
                  onChange={(e) => setRiskInputs({ ...riskInputs, bmi: Number(e.target.value) })}
                  className="w-full p-3 rounded-xl glass-input font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Systolic BP (mmHg)</label>
                <input
                  type="number"
                  value={riskInputs.systolicBp}
                  onChange={(e) => setRiskInputs({ ...riskInputs, systolicBp: Number(e.target.value) })}
                  className="w-full p-3 rounded-xl glass-input font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Fasting Blood Sugar (mg/dL)</label>
                <input
                  type="number"
                  value={riskInputs.fastingSugar}
                  onChange={(e) => setRiskInputs({ ...riskInputs, fastingSugar: Number(e.target.value) })}
                  className="w-full p-3 rounded-xl glass-input font-medium"
                />
              </div>
            </div>

            <button
              onClick={calculateHealthRisk}
              className="w-full py-3.5 rounded-xl glass-button text-white font-bold text-xs shadow-lg"
            >
              Calculate AI Risk Assessment
            </button>
          </div>

          <div className="lg:col-span-6 space-y-4">
            {riskAssessment ? (
              <div className="p-6 rounded-3xl glass-card border space-y-6">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Predicted Health Risk Factors</h3>
                
                <div className="space-y-4 text-xs">
                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>Type 2 Diabetes Risk</span>
                      <span className="text-amber-500">{riskAssessment.diabetesRisk}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full" style={{ width: `${riskAssessment.diabetesRisk}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>Cardiovascular Disease Risk</span>
                      <span className="text-rose-500">{riskAssessment.heartRisk}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-rose-500 h-full" style={{ width: `${riskAssessment.heartRisk}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>Hypertension Risk</span>
                      <span className="text-purple-500">{riskAssessment.hypertensionRisk}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full" style={{ width: `${riskAssessment.hypertensionRisk}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-3xl glass-card border text-center space-y-2 text-slate-400">
                <Activity className="w-10 h-10 mx-auto text-brand-500 opacity-50" />
                <div className="text-xs font-bold text-slate-600 dark:text-slate-300">Risk Assessment Pending</div>
                <div className="text-[11px]">Fill clinical values on left to see predictive chronic disease risk scoring.</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: AI Chatbot */}
      {activeTab === 'chat' && (
        <div className="max-w-3xl mx-auto p-6 rounded-3xl glass-card border shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">ArogyaGram AI Health Chatbot</div>
                <div className="text-[11px] text-emeraldCustom-500 font-semibold">Online • Multilingual Assistant</div>
              </div>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="h-80 overflow-y-auto space-y-3 p-2">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-brand-600 text-white font-medium rounded-br-none shadow'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSendChatMessage} className="flex items-center space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <input
              type="text"
              placeholder="Ask about medicines, fever remedies, or village doctors..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 p-3 rounded-xl glass-input text-xs font-medium focus:ring-2 focus:ring-brand-500"
            />
            <button
              type="submit"
              className="p-3 rounded-xl glass-button text-white flex items-center justify-center shadow"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
