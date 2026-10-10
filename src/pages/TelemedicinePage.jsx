import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNotification } from '../context/NotificationContext';
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Send,
  MessageSquare,
  FileText,
  User,
  ShieldCheck,
  Share2,
  Sparkles,
  Maximize2
} from 'lucide-react';

export default function TelemedicinePage() {
  const { addToast } = useNotification();
  
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);

  const [chatMessages, setChatMessages] = useState([
    { sender: 'doctor', text: 'Hello! I can see your video. How are you feeling today?' },
    { sender: 'patient', text: 'Doctor, I have had fever and cough since yesterday.' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const toggleMic = () => {
    setMicOn(!micOn);
    addToast(micOn ? 'Microphone Muted' : 'Microphone Unmuted', 'info');
  };

  const toggleVideo = () => {
    setVideoOn(!videoOn);
    addToast(videoOn ? 'Camera Turned Off' : 'Camera Turned On', 'info');
  };

  const toggleScreenShare = () => {
    setScreenSharing(!screenSharing);
    addToast(screenSharing ? 'Stopped Screen Sharing' : 'Screen Share Active', 'success');
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages(prev => [...prev, { sender: 'patient', text: chatInput }]);
    setChatInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Consultation Room Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl glass-card border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emeraldCustom-500 text-white flex items-center justify-center font-bold shadow">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Telemedicine Consultation Room
            </h1>
            <div className="text-xs text-slate-500">
              Doctor: <span className="font-bold text-brand-600">Dr. Ananya Sharma</span> • Patient: <span className="font-bold text-emeraldCustom-500">Ramu Somayya</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-bold text-emeraldCustom-500 bg-emeraldCustom-500/10 px-3 py-1.5 rounded-full border border-emeraldCustom-500/20">
          <span className="w-2.5 h-2.5 rounded-full bg-emeraldCustom-500 animate-ping" />
          <span>Low Bandwidth Village WebRTC Active</span>
        </div>
      </div>

      {/* Main Grid: Video Stream & Consultation Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Video Viewport & Call Controls */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative h-[450px] rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden flex items-center justify-center">
            
            {/* Main Remote Video Stream (Doctor View) */}
            {videoOn ? (
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1000"
                alt="Doctor Video Consultation"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center space-y-2 text-slate-500">
                <VideoOff className="w-12 h-12 mx-auto" />
                <div className="text-sm font-bold">Video Muted</div>
              </div>
            )}

            {/* Self PIP View (Patient Camera) */}
            <div className="absolute top-4 right-4 w-36 h-28 rounded-2xl bg-slate-900 border-2 border-brand-500 overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400"
                alt="Patient Self View"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1.5 left-2 text-[9px] font-bold text-white bg-slate-950/80 px-1.5 py-0.5 rounded">
                YOU
              </span>
            </div>

            {/* Bottom Floating Control Bar */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-3 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-700/60 shadow-2xl z-20">
              <button
                onClick={toggleMic}
                className={`p-3 rounded-xl transition-all ${
                  micOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-500 text-white animate-pulse'
                }`}
                title="Toggle Microphone"
              >
                {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>

              <button
                onClick={toggleVideo}
                className={`p-3 rounded-xl transition-all ${
                  videoOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-500 text-white animate-pulse'
                }`}
                title="Toggle Camera"
              >
                {videoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              <button
                onClick={toggleScreenShare}
                className={`p-3 rounded-xl transition-all ${
                  screenSharing ? 'bg-emeraldCustom-500 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
                title="Share Screen"
              >
                <Share2 className="w-5 h-5" />
              </button>

              <button
                onClick={() => addToast('Call Ended. Digital Prescription being generated...', 'warning', 'Call Disconnected')}
                className="p-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-lg transition-transform hover:scale-105"
                title="End Consultation Call"
              >
                <PhoneOff className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>

        {/* Right Side: Live Consultation Chat & Clinical Side Panel */}
        <div className="lg:col-span-4 p-6 rounded-3xl glass-card border flex flex-col justify-between h-[450px] space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-brand-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Consultation Live Chat</h3>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                  msg.sender === 'patient'
                    ? 'bg-brand-600 text-white rounded-br-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border rounded-bl-none'
                }`}>
                  <div className="text-[9px] opacity-70 mb-0.5 font-bold">
                    {msg.sender === 'patient' ? 'You' : 'Dr. Ananya Sharma'}
                  </div>
                  <div>{msg.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Send Form */}
          <form onSubmit={handleSendChat} className="flex items-center space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <input
              type="text"
              placeholder="Send message to doctor..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 p-2.5 rounded-xl glass-input text-xs font-medium focus:ring-2 focus:ring-brand-500"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl glass-button text-white flex items-center justify-center shadow"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
