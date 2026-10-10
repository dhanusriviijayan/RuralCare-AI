// Initial Mock Data for ArogyaGram Rural Healthcare Platform

export const mockUsers = {
  patient: {
    id: "PAT-8842",
    name: "Ramu Somayya",
    role: "PATIENT",
    email: "ramu.village@arogyagram.in",
    phone: "+91 98450 12345",
    age: 42,
    gender: "Male",
    bloodGroup: "O+",
    village: "Sirsi Rural",
    district: "Uttara Kannada",
    qrCode: "AG-PAT-8842-RAMU-SOMAYYA-O-PLUS",
    emergencyContact: { name: "Lakshmi Somayya (Wife)", phone: "+91 98450 99999" },
    allergies: ["Penicillin", "Dust Mites"],
    chronicConditions: ["Hypertension (Mild)", "Type 2 Diabetes"],
    healthScore: 84,
    vitals: {
      bp: "128/84 mmHg",
      heartRate: "74 bpm",
      bmi: "24.2 (Normal)",
      sugarLevel: "115 mg/dL",
      oxygen: "98%"
    }
  },
  doctor: {
    id: "DOC-102",
    name: "Dr. Ananya Sharma",
    role: "DOCTOR",
    email: "dr.ananya@arogyagram.in",
    specialization: "General Physician & Rural Health Specialist",
    department: "General Medicine",
    qualification: "MBBS, MD (General Medicine, AIIMS)",
    experience: "12 Years",
    rating: 4.9,
    reviewsCount: 340,
    hospital: "Sirsi Community Health Centre",
    consultationFee: "₹150",
    availableToday: true
  },
  admin: {
    id: "ADM-001",
    name: "Rajesh Kumar (District Health Officer)",
    role: "ADMIN",
    email: "dho.admin@arogyagram.gov.in"
  }
};

export const mockDoctors = [
  {
    id: "DOC-101",
    name: "Dr. Ananya Sharma",
    specialization: "General Medicine",
    degree: "MBBS, MD",
    rating: 4.9,
    experience: "12 Yrs",
    villageReach: "Sirsi & Kumta Block",
    availableSlots: ["09:30 AM", "11:00 AM", "02:30 PM", "04:00 PM"],
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "DOC-102",
    name: "Dr. Murugan Velu",
    specialization: "Cardiology & Emergency",
    degree: "MBBS, DM (Cardiology)",
    rating: 4.8,
    experience: "15 Yrs",
    villageReach: "Madurai Rural District",
    availableSlots: ["10:00 AM", "01:00 PM", "05:00 PM"],
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "DOC-103",
    name: "Dr. Sunita Patel",
    specialization: "Pediatrics & Child Health",
    degree: "MBBS, DCH",
    rating: 4.95,
    experience: "9 Yrs",
    villageReach: "Vadodara Tribal Belt",
    availableSlots: ["09:00 AM", "11:30 AM", "03:00 PM"],
    image: "https://images.unsplash.com/photo-1594824813566-88855ce7890c?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "DOC-104",
    name: "Dr. Rajeshwar Rao",
    specialization: "Orthopedics & Joint Care",
    degree: "MBBS, MS (Ortho)",
    rating: 4.7,
    experience: "18 Yrs",
    villageReach: "Warangal Rural PHC",
    availableSlots: ["10:30 AM", "02:00 PM", "04:30 PM"],
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400"
  }
];

export const mockAppointments = [
  {
    id: "APT-901",
    patientName: "Ramu Somayya",
    patientId: "PAT-8842",
    doctorName: "Dr. Ananya Sharma",
    department: "General Medicine",
    date: "2026-08-02",
    time: "10:30 AM",
    type: "TELEMEDICINE",
    status: "CONFIRMED",
    symptoms: "Mild fever, cough, joint ache for 2 days",
    severity: "Moderate"
  },
  {
    id: "APT-902",
    patientName: "Kavitha Sundaram",
    patientId: "PAT-7721",
    doctorName: "Dr. Murugan Velu",
    department: "Cardiology",
    date: "2026-08-02",
    time: "11:45 AM",
    type: "IN_PERSON",
    status: "IN_QUEUE",
    symptoms: "Chest tightness during farm work",
    severity: "High"
  },
  {
    id: "APT-903",
    patientName: "Gopal Yadav",
    patientId: "PAT-6610",
    doctorName: "Dr. Sunita Patel",
    department: "Pediatrics",
    date: "2026-08-03",
    time: "02:00 PM",
    type: "TELEMEDICINE",
    status: "PENDING",
    symptoms: "Child vaccination review & rash",
    severity: "Low"
  }
];

export const mockPrescriptions = [
  {
    id: "RX-5501",
    date: "2026-07-20",
    doctorName: "Dr. Ananya Sharma",
    diagnosis: "Seasonal Viral Upper Respiratory Infection",
    medications: [
      { name: "Paracetamol 500mg", dosage: "1 tablet", frequency: "Three times daily after food", duration: "5 days" },
      { name: "Cetirizine 10mg", dosage: "1 tablet", frequency: "Once daily at night", duration: "5 days" },
      { name: "ORS Electrolyte Powder", dosage: "1 sachet in 1L clean water", frequency: "Sip throughout day", duration: "3 days" }
    ],
    advice: "Drink warm clean water. Avoid heavy physical labor in midday sun. Rest adequately."
  }
];

export const mockMedicines = [
  { id: "MED-01", name: "Paracetamol 500mg", category: "Analgesic / Antipyretic", stock: 1200, unit: "Strips", price: "₹18", reorderLevel: 200, status: "IN_STOCK" },
  { id: "MED-02", name: "Amoxicillin 500mg", category: "Antibiotic", stock: 450, unit: "Strips", price: "₹65", reorderLevel: 100, status: "IN_STOCK" },
  { id: "MED-03", name: "Metformin 500mg", category: "Diabetes", stock: 80, unit: "Strips", price: "₹32", reorderLevel: 150, status: "LOW_STOCK" },
  { id: "MED-04", name: "Amlodipine 5mg", category: "Hypertension", stock: 600, unit: "Strips", price: "₹24", reorderLevel: 100, status: "IN_STOCK" },
  { id: "MED-05", name: "ORS Oral Rehydration Salts", category: "Essential Hydration", stock: 1500, unit: "Sachets", price: "₹6", reorderLevel: 300, status: "IN_STOCK" },
  { id: "MED-06", name: "Snake Antivenom Vial", category: "Emergency Critical", stock: 12, unit: "Vials", price: "₹450", reorderLevel: 20, status: "CRITICAL_LOW" }
];

export const mockAmbulances = [
  {
    id: "AMB-108-A1",
    driverName: "Suresh Gowda",
    driverPhone: "+91 99001 10801",
    locationName: "Near Sirsi Bus Stand Crossing",
    lat: 14.6195,
    lng: 74.8354,
    status: "DISPATCHED",
    etaMinutes: 8,
    targetPatient: "Ramu Somayya (Emergency Respiratory Support)"
  },
  {
    id: "AMB-108-B2",
    driverName: "Manjunath K",
    driverPhone: "+91 99001 10802",
    locationName: "Kumta Hospital Station",
    lat: 14.4264,
    lng: 74.4189,
    status: "STANDBY",
    etaMinutes: 0,
    targetPatient: "None"
  }
];

export const mockLabReports = [
  {
    id: "LAB-301",
    testName: "Fasting Blood Glucose & HbA1c",
    category: "Diabetic Profile",
    date: "2026-07-15",
    result: "115 mg/dL (HbA1c: 6.4%)",
    status: "NORMAL",
    doctor: "Dr. Ananya Sharma"
  },
  {
    id: "LAB-302",
    testName: "Complete Blood Count (CBC)",
    category: "General Hematology",
    date: "2026-06-10",
    result: "Hemoglobin 13.8 g/dL, WBC 7,200",
    status: "NORMAL",
    doctor: "Dr. Ananya Sharma"
  },
  {
    id: "LAB-303",
    testName: "Lipid Profile & Cholesterol",
    category: "Cardiovascular",
    date: "2026-05-20",
    result: "Total Cholesterol 210 mg/dL (Slightly Elevated)",
    status: "ABNORMAL",
    doctor: "Dr. Murugan Velu"
  }
];
