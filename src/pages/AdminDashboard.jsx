import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { mockDoctors, mockMedicines, mockAmbulances } from '../data/mockData';
import {
  Users,
  Building2,
  Activity,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Plus,
  Search,
  Pill,
  Truck,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle2,
  Trash2
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function AdminDashboard() {
  const { user } = useAuth();
  const { addToast } = useNotification();

  const [activeSection, setActiveSection] = useState('analytics'); // analytics, doctors, pharmacy, emergency
  const [medicines, setMedicines] = useState(mockMedicines);

  // Chart Data 1: Monthly Patient Visits (Line Chart)
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'In-Person Rural PHC Visits',
        data: [2800, 3200, 4100, 3900, 4800, 5200, 6100],
        borderColor: '#0284c7',
        backgroundColor: 'rgba(2, 132, 199, 0.15)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Telemedicine Consultations',
        data: [1200, 1600, 2400, 3100, 3900, 4700, 5500],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  // Chart Data 2: Department Distribution (Donut Chart)
  const donutChartData = {
    labels: ['General Medicine', 'Pediatrics', 'Cardiology', 'Orthopedics', 'Gynecology'],
    datasets: [
      {
        data: [45, 20, 15, 12, 8],
        backgroundColor: ['#0284c7', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'],
        borderWidth: 0
      }
    ]
  };

  // Chart Data 3: Emergency Ambulances Dispatched per District (Bar Chart)
  const barChartData = {
    labels: ['Sirsi Block', 'Kumta Block', 'Madurai Rural', 'Vadodara Tribal', 'Warangal PHC'],
    datasets: [
      {
        label: '108 Ambulance Dispatches',
        data: [42, 28, 65, 39, 51],
        backgroundColor: '#f43f5e',
        borderRadius: 8
      }
    ]
  };

  const handleStockAdd = () => {
    addToast('New medicine batch added to Pharmacy Inventory.', 'success', 'Inventory Updated');
  };

  const handleDeleteMed = (id) => {
    setMedicines(prev => prev.filter(m => m.id !== id));
    addToast(`Removed item ${id} from stock registry.`, 'warning');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Top Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-700 via-orange-800 to-slate-950 text-white shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-bold backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>District Health Officer Governance Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            District Medical Analytics & Command Center
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 max-w-xl">
            Monitoring 45 Village Health Centers • 120 Doctors • 15 Emergency Response Units
          </p>
        </div>

        <button
          onClick={() => addToast('Exporting District Health Report PDF...', 'info', 'Report Generation')}
          className="px-4 py-2.5 rounded-2xl bg-white text-slate-900 hover:bg-amber-50 text-xs font-extrabold flex items-center space-x-2 shadow-lg transition-all relative z-10"
        >
          <FileSpreadsheet className="w-4 h-4 text-amber-600" />
          <span>Export Monthly Governance Report</span>
        </button>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl glass-card border flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-500">Total Rural Patients</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">54,820</div>
            <div className="text-[11px] font-semibold text-emeraldCustom-500 flex items-center mt-0.5">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +14.2% this month
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-brand-500/10 text-brand-600">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-3xl glass-card border flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-500">Active Doctors</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">124</div>
            <div className="text-[11px] font-semibold text-emeraldCustom-500 flex items-center mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5 mr-0.5" /> 98% On-Duty Today
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-emeraldCustom-500/10 text-emeraldCustom-500">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-3xl glass-card border flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-500">Emergency Dispatches</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">225</div>
            <div className="text-[11px] font-semibold text-rose-500 flex items-center mt-0.5">
              <Activity className="w-3.5 h-3.5 mr-0.5" /> Avg Response 8.4 Min
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-500">
            <Truck className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-3xl glass-card border flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-500">Medicine Stock Level</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">94.8%</div>
            <div className="text-[11px] font-semibold text-amber-500 flex items-center mt-0.5">
              <AlertTriangle className="w-3.5 h-3.5 mr-0.5" /> 1 Item Critical Low
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
            <Pill className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {[
          { id: 'analytics', label: 'Analytics Charts', icon: Activity },
          { id: 'doctors', label: 'Doctors Registry', icon: Users },
          { id: 'pharmacy', label: 'Pharmacy Stock Management', icon: Pill },
          { id: 'emergency', label: 'Emergency 108 Vehicles', icon: Truck }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
              activeSection === tab.id
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Section 1: Analytics Charts */}
      {activeSection === 'analytics' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Line Chart: Patient Visits */}
            <div className="lg:col-span-8 p-6 rounded-3xl glass-card border space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Monthly Rural Patient Trends</h3>
              <div className="h-72">
                <Line
                  data={lineChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'top' } }
                  }}
                />
              </div>
            </div>

            {/* Donut Chart: Department Distribution */}
            <div className="lg:col-span-4 p-6 rounded-3xl glass-card border space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Department Demand</h3>
              <div className="h-72 flex items-center justify-center">
                <Doughnut
                  data={donutChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom' } }
                  }}
                />
              </div>
            </div>

          </div>

          {/* Bar Chart: Emergency Ambulance Dispatches */}
          <div className="p-6 rounded-3xl glass-card border space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">108 Emergency Ambulance Dispatches by Village Block</h3>
            <div className="h-64">
              <Bar
                data={barChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } }
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Section 2: Doctors Registry Table */}
      {activeSection === 'doctors' && (
        <div className="p-6 rounded-3xl glass-card border space-y-4 overflow-x-auto">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Registered Rural Specialists</h3>
            <button
              onClick={() => addToast('Opening New Doctor Registration Form', 'info')}
              className="px-4 py-2 rounded-xl glass-button text-white text-xs font-bold flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Doctor</span>
            </button>
          </div>

          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase">
                <th className="pb-3">Doctor Name</th>
                <th className="pb-3">Specialization</th>
                <th className="pb-3">Degree</th>
                <th className="pb-3">Experience</th>
                <th className="pb-3">Assigned Region</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {mockDoctors.map(doc => (
                <tr key={doc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 font-bold text-slate-900 dark:text-white">{doc.name}</td>
                  <td className="py-3 text-brand-600">{doc.specialization}</td>
                  <td className="py-3 text-slate-500">{doc.degree}</td>
                  <td className="py-3">{doc.experience}</td>
                  <td className="py-3 text-slate-500">{doc.villageReach}</td>
                  <td className="py-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-emeraldCustom-500/10 text-emeraldCustom-500 font-bold text-[10px]">
                      ACTIVE ON DUTY
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Section 3: Pharmacy Management */}
      {activeSection === 'pharmacy' && (
        <div className="p-6 rounded-3xl glass-card border space-y-4 overflow-x-auto">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Rural Pharmacy Stock & Inventory</h3>
            <button
              onClick={handleStockAdd}
              className="px-4 py-2 rounded-xl glass-button text-white text-xs font-bold flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add Stock Batch</span>
            </button>
          </div>

          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase">
                <th className="pb-3">Medicine Name</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Current Stock</th>
                <th className="pb-3">Price / Unit</th>
                <th className="pb-3">Stock Status</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {medicines.map(med => (
                <tr key={med.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 font-bold text-slate-900 dark:text-white">{med.name}</td>
                  <td className="py-3 text-slate-500">{med.category}</td>
                  <td className="py-3 font-bold">{med.stock} {med.unit}</td>
                  <td className="py-3 text-emeraldCustom-500 font-bold">{med.price}</td>
                  <td className="py-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      med.status === 'IN_STOCK' ? 'bg-emeraldCustom-500/10 text-emeraldCustom-500' : 'bg-rose-500 text-white animate-pulse'
                    }`}>
                      {med.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => handleDeleteMed(med.id)}
                      className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Section 4: Emergency Ambulances Table */}
      {activeSection === 'emergency' && (
        <div className="p-6 rounded-3xl glass-card border space-y-4 overflow-x-auto">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">108 Emergency Ambulance Dispatches</h3>
            <span className="text-xs font-bold text-rose-500 bg-rose-500/10 px-2.5 py-1 rounded-full">
              GPS LIVE MONITOR
            </span>
          </div>

          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase">
                <th className="pb-3">Unit Vehicle ID</th>
                <th className="pb-3">Driver Name</th>
                <th className="pb-3">Contact</th>
                <th className="pb-3">Station Location</th>
                <th className="pb-3">Assigned Emergency</th>
                <th className="pb-3">GPS Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {mockAmbulances.map(amb => (
                <tr key={amb.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 font-bold text-rose-500">{amb.id}</td>
                  <td className="py-3 font-bold text-slate-900 dark:text-white">{amb.driverName}</td>
                  <td className="py-3 text-slate-500">{amb.driverPhone}</td>
                  <td className="py-3">{amb.locationName}</td>
                  <td className="py-3 text-amber-500 font-bold">{amb.targetPatient}</td>
                  <td className="py-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-emeraldCustom-500/10 text-emeraldCustom-500 font-bold text-[10px]">
                      {amb.status} (ETA: {amb.etaMinutes} mins)
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
