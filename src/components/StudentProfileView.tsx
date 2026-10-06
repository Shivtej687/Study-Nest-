import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Award, 
  BookOpen, 
  Clock, 
  ShieldCheck, 
  QrCode, 
  Printer, 
  Edit3, 
  Save, 
  X, 
  RefreshCcw, 
  CheckCircle2, 
  Flame, 
  TrendingUp, 
  FileText, 
  Receipt, 
  CreditCard, 
  Heart, 
  Compass, 
  School, 
  Users, 
  Sparkles,
  Download,
  AlertCircle
} from 'lucide-react';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

interface StudentProfileViewProps {
  currentUser: any;
  userProfile: any;
  onResetOrientation: () => void;
  onNavigateToTab?: (tab: 'home' | 'courses' | 'classes' | 'library' | 'quiz' | 'performance' | 'doubt' | 'receipt' | 'notifications' | 'profile') => void;
  triggerToast?: (msg: string) => void;
}

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({
  currentUser,
  userProfile,
  onResetOrientation,
  onNavigateToTab,
  triggerToast
}) => {
  // Extract or fallback student metadata
  const meta = userProfile?.studentMeta || {};
  const studentName = meta.name || userProfile?.fullName || 'Shivtej Pol';
  const studentAge = meta.age || '15';
  const studentStd = meta.std || 'Standard 10 (SSC)';
  const studentBoard = meta.board || 'Maharashtra State Board';
  const studyFocus = meta.studying || 'Algebra, Geometry, Science & Technology, Marathi';
  
  // Custom editable extended profile fields (persisted or defaults)
  const initialData = {
    phone: userProfile?.phone || '+91 98765 43210',
    dob: userProfile?.dob || '2011-08-15',
    bloodGroup: userProfile?.bloodGroup || 'O+ (Positive)',
    gender: userProfile?.gender || 'Male',
    city: userProfile?.city || 'Pune, Maharashtra',
    address: userProfile?.address || 'Flat 402, Shivshankar Heights, FC Road, Pune - 411004',
    schoolName: userProfile?.schoolName || 'Saraswati Vidyamandir English High School',
    rollNumber: userProfile?.rollNumber || `SN-2026-${(currentUser?.uid || '10482').slice(0, 5).toUpperCase()}`,
    batchName: userProfile?.batchName || 'Olympus Batch A (Morning 07:00 AM – 11:30 AM)',
    mentorName: userProfile?.mentorName || 'Prof. Anant Kulkarni (Senior Academic Dean)',
    fatherName: userProfile?.fatherName || 'Ramesh Pol',
    fatherContact: userProfile?.fatherContact || '+91 98220 11223',
    motherName: userProfile?.motherName || 'Sunita Pol',
    emergencyContact: userProfile?.emergencyContact || '+91 98220 11223 (Father)',
    careerAspiration: userProfile?.careerAspiration || 'Computer Science & AI Engineering (IIT / COEP)',
    favoriteSubject: userProfile?.favoriteSubject || 'Mathematics II (Geometry) & Physics',
    hobbies: userProfile?.hobbies || 'Speedcubing, Chess, Science Fiction & Astronomy',
    parentName: userProfile?.parentName || userProfile?.fatherName || 'Ramesh Pol',
    parentMobile: userProfile?.parentMobile || userProfile?.fatherContact || '+91 98220 11223',
  };

  const [profileData, setProfileData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [saving, setSaving] = useState(false);
  const [activeSubSection, setActiveSubSection] = useState<'info' | 'idcard' | 'academics' | 'guardian'>('info');

  React.useEffect(() => {
    if (userProfile) {
      const updated = {
        phone: userProfile.phone || '+91 98765 43210',
        dob: userProfile.dob || '2011-08-15',
        bloodGroup: userProfile.bloodGroup || 'O+ (Positive)',
        gender: userProfile.gender || 'Male',
        city: userProfile.city || 'Pune, Maharashtra',
        address: userProfile.address || 'Flat 402, Shivshankar Heights, FC Road, Pune - 411004',
        schoolName: userProfile.schoolName || 'Saraswati Vidyamandir English High School',
        rollNumber: userProfile.rollNumber || `SN-2026-${(currentUser?.uid || '10482').slice(0, 5).toUpperCase()}`,
        batchName: userProfile.batchName || 'Olympus Batch A (Morning 07:00 AM – 11:30 AM)',
        mentorName: userProfile.mentorName || 'Prof. Anant Kulkarni (Senior Academic Dean)',
        fatherName: userProfile.fatherName || 'Ramesh Pol',
        fatherContact: userProfile.fatherContact || '+91 98220 11223',
        motherName: userProfile.motherName || 'Sunita Pol',
        emergencyContact: userProfile.emergencyContact || '+91 98220 11223 (Father)',
        careerAspiration: userProfile.careerAspiration || 'Computer Science & AI Engineering (IIT / COEP)',
        favoriteSubject: userProfile.favoriteSubject || 'Mathematics II (Geometry) & Physics',
        hobbies: userProfile.hobbies || 'Speedcubing, Chess, Science Fiction & Astronomy',
        parentName: userProfile.parentName || userProfile.fatherName || 'Ramesh Pol',
        parentMobile: userProfile.parentMobile || userProfile.fatherContact || '+91 98220 11223',
      };
      setProfileData(updated);
      setFormData(updated);
    }
  }, [userProfile, currentUser]);

  // Handle Save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      setProfileData(formData);
      if (currentUser?.uid) {
        const userRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userRef, {
          ...formData,
          updatedAt: new Date().toISOString()
        });
      }
      setIsEditing(false);
      if (triggerToast) {
        triggerToast('✅ Student profile updated and saved to Sanctuary records!');
      }
    } catch (err) {
      console.warn('Could not update profile in Firestore:', err);
      setIsEditing(false);
      if (triggerToast) {
        triggerToast('Profile updated locally.');
      }
    } finally {
      setSaving(false);
    }
  };

  const handlePrintIdCard = () => {
    window.print();
  };

  return (
    <div className="text-left space-y-7 animate-fade-in pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
              Student Sanctuary Dossier
            </span>
            <span className="text-[11px] text-stone-500 font-serif">Roll ID: {profileData.rollNumber}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-stone-900 mt-1.5 flex items-center gap-2.5">
            <User className="w-7 h-7 text-amber-800" />
            <span>Seeker Profile & Information</span>
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Complete institutional credentials, student demographics, parent details, digital ID card and academic records.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              setFormData(profileData);
              setIsEditing(true);
            }}
            className="px-4 py-2.5 bg-[#1C1917] hover:bg-stone-800 text-amber-300 hover:text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Information</span>
          </button>

          <button
            onClick={onResetOrientation}
            className="px-4 py-2.5 border border-stone-300 hover:bg-stone-100 text-stone-700 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Recalibrate AI Orientation</span>
          </button>
        </div>
      </div>

      {/* Hero Profile Banner Card */}
      <div className="bg-white border-2 border-stone-850 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/5 rounded-bl-full pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-stone-100">
          <div className="flex items-center gap-5">
            {/* Student Avatar */}
            <div className="relative">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 flex items-center justify-center text-amber-300 text-3xl font-bold font-serif shadow-md border-2 border-amber-600/30">
                {studentName.charAt(0) || 'S'}
              </div>
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold" title="Enrolled & Active">
                ✓
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl md:text-2xl font-bold font-serif text-stone-900">
                  {studentName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider border border-emerald-300">
                  Verified Scholar
                </span>
              </div>
              <p className="text-xs text-stone-500 font-sans flex items-center gap-2">
                <span>{currentUser?.email || 'shivtejpol2880@gmail.com'}</span>
                <span>•</span>
                <span className="font-mono text-stone-700 font-semibold">{profileData.rollNumber}</span>
              </p>
              <p className="text-xs text-amber-800 font-serif font-medium">
                {studentStd} • {studentBoard} • {profileData.batchName.split('(')[0]}
              </p>
            </div>
          </div>

          {/* Quick Stat Badges */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl px-4 py-2.5 text-center min-w-[90px]">
              <span className="text-[9px] uppercase font-bold text-amber-800 font-serif block">Attendance</span>
              <span className="text-lg font-bold font-serif text-amber-950">96.4%</span>
            </div>
            <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl px-4 py-2.5 text-center min-w-[90px]">
              <span className="text-[9px] uppercase font-bold text-emerald-800 font-serif block">Mock Rank</span>
              <span className="text-lg font-bold font-serif text-emerald-950">#3 / 180</span>
            </div>
            <div className="bg-stone-100 border border-stone-200 rounded-2xl px-4 py-2.5 text-center min-w-[90px]">
              <span className="text-[9px] uppercase font-bold text-stone-600 font-serif block">Study Streak</span>
              <span className="text-lg font-bold font-serif text-stone-900 flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" /> 24d
              </span>
            </div>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-600">
            <School className="w-4 h-4 text-amber-800 shrink-0" />
            <span className="truncate">{profileData.schoolName}</span>
          </div>
          <div className="flex items-center gap-2 text-stone-600">
            <MapPin className="w-4 h-4 text-amber-800 shrink-0" />
            <span className="truncate">{profileData.city}</span>
          </div>
          <div className="flex items-center gap-2 text-stone-600">
            <GraduationCap className="w-4 h-4 text-amber-800 shrink-0" />
            <span className="truncate">Aim: {profileData.careerAspiration.split('(')[0]}</span>
          </div>
          <div className="flex items-center gap-2 text-stone-600">
            <Users className="w-4 h-4 text-amber-800 shrink-0" />
            <span className="truncate">Mentor: {profileData.mentorName.split('(')[0]}</span>
          </div>
        </div>
      </div>

      {/* Sub-Section Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-3">
        {[
          { key: 'info', label: 'Personal & Student Dossier', icon: User },
          { key: 'academics', label: 'Academic Details & Subjects', icon: BookOpen },
          { key: 'guardian', label: 'Parent & Guardian Information', icon: Users },
          { key: 'idcard', label: 'Digital Student ID Card', icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubSection === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveSubSection(tab.key as any)}
              className={`px-4 py-2 rounded-xl text-xs font-serif font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'bg-[#1C1917] text-amber-300 shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-SECTION 1: PERSONAL & STUDENT INFORMATION */}
      {activeSubSection === 'info' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* General Information Box */}
            <div className="bg-white border-2 border-stone-850 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-800" />
                  <span>Primary Identity Particulars</span>
                </h3>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-mono">ID: {profileData.rollNumber}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-stone-400 text-[10px] uppercase font-serif block">Full Legal Name:</span>
                  <strong className="text-stone-900 font-serif text-sm">{studentName}</strong>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] uppercase font-serif block">Date of Birth:</span>
                  <strong className="text-stone-800 font-sans">{profileData.dob} ({studentAge} Years)</strong>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] uppercase font-serif block">Gender:</span>
                  <strong className="text-stone-800">{profileData.gender}</strong>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] uppercase font-serif block">Blood Group:</span>
                  <strong className="text-stone-800 font-mono text-red-700 bg-red-50 px-2 py-0.5 rounded inline-block">{profileData.bloodGroup}</strong>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] uppercase font-serif block">Primary Email:</span>
                  <strong className="text-stone-800 font-sans">{currentUser?.email || 'shivtejpol2880@gmail.com'}</strong>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] uppercase font-serif block">Student Mobile:</span>
                  <strong className="text-stone-800 font-sans">{profileData.phone}</strong>
                </div>
              </div>
            </div>

            {/* Address & Residential Information */}
            <div className="bg-white border-2 border-stone-850 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-800" />
                  <span>Residential & Contact Coordinates</span>
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-stone-400 text-[10px] uppercase font-serif block">Residential Address:</span>
                  <p className="text-stone-800 font-sans font-medium mt-0.5">{profileData.address}</p>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] uppercase font-serif block">City / State:</span>
                  <p className="text-stone-800 font-sans font-medium mt-0.5">{profileData.city}</p>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] uppercase font-serif block">Emergency Hotline:</span>
                  <p className="text-rose-800 font-sans font-bold mt-0.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-rose-600" />
                    <span>{profileData.emergencyContact}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interests, Aspirations & Highlights */}
          <div className="bg-white border-2 border-stone-850 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
              <Sparkles className="w-4 h-4 text-amber-800" />
              <span>Aspirations, Target Goals & Hobbies</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80">
                <span className="text-[10px] uppercase font-bold text-amber-800 font-serif block">Target Career Path</span>
                <p className="text-stone-900 font-serif font-bold mt-1 text-sm">{profileData.careerAspiration}</p>
                <p className="text-[11px] text-stone-500 mt-1">Preparing for JEE / MHT-CET & State Board Topper Rank</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80">
                <span className="text-[10px] uppercase font-bold text-emerald-800 font-serif block">Favorite Subject</span>
                <p className="text-stone-900 font-serif font-bold mt-1 text-sm">{profileData.favoriteSubject}</p>
                <p className="text-[11px] text-stone-500 mt-1">Top scoring 100/100 target in Mathematics II proofs</p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] uppercase font-bold text-stone-600 font-serif block">Hobbies & Co-Curricular</span>
                <p className="text-stone-900 font-serif font-bold mt-1 text-sm">{profileData.hobbies}</p>
                <p className="text-[11px] text-stone-500 mt-1">Active participant in Nestoria Annual Chess & Science Fest</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-SECTION 2: ACADEMIC DETAILS & ENROLLED SUBJECTS */}
      {activeSubSection === 'academics' && (
        <div className="space-y-6 animate-fade-in">
          {/* Institutional Enrollment Details */}
          <div className="bg-white border-2 border-stone-850 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
              <School className="w-4 h-4 text-amber-800" />
              <span>Enrollment & Institutional Accreditation</span>
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-sans">
              <div>
                <span className="text-stone-400 text-[10px] uppercase font-serif block">Affiliated School:</span>
                <strong className="text-stone-900 text-sm font-serif">{profileData.schoolName}</strong>
              </div>
              <div>
                <span className="text-stone-400 text-[10px] uppercase font-serif block">Class Standard:</span>
                <strong className="text-stone-800 text-sm">{studentStd}</strong>
              </div>
              <div>
                <span className="text-stone-400 text-[10px] uppercase font-serif block">Curriculum Board:</span>
                <strong className="text-stone-800 text-sm">{studentBoard}</strong>
              </div>
              <div>
                <span className="text-stone-400 text-[10px] uppercase font-serif block">Assigned Batch:</span>
                <strong className="text-stone-800 text-sm font-mono text-amber-900">{profileData.batchName}</strong>
              </div>
              <div>
                <span className="text-stone-400 text-[10px] uppercase font-serif block">Academic Dean / Mentor:</span>
                <strong className="text-stone-800 text-sm">{profileData.mentorName}</strong>
              </div>
              <div>
                <span className="text-stone-400 text-[10px] uppercase font-serif block">Medium of Instruction:</span>
                <strong className="text-stone-800 text-sm">Semi-English / English</strong>
              </div>
              <div>
                <span className="text-stone-400 text-[10px] uppercase font-serif block">Admission Year:</span>
                <strong className="text-stone-800 text-sm">2026–2027</strong>
              </div>
              <div>
                <span className="text-stone-400 text-[10px] uppercase font-serif block">Current Term:</span>
                <strong className="text-emerald-800 text-sm font-bold">Term 1 (Mid-Term Phase)</strong>
              </div>
            </div>
          </div>

          {/* Enrolled Subjects Catalog */}
          <div className="bg-white border-2 border-stone-850 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-stone-100 pb-3">
              <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-800" />
                <span>Enrolled Syllabus Subjects (10 Complete Courses)</span>
              </h3>
              <span className="text-xs text-emerald-800 font-bold">100% Curriculum Access</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {[
                { name: 'Mathematics Part I (Algebra)', code: 'MTH-101', faculty: 'Prof. Anant Kulkarni', chapters: '6 Chapters', progress: '92%' },
                { name: 'Mathematics Part II (Geometry)', code: 'MTH-102', faculty: 'Prof. Anant Kulkarni', chapters: '7 Chapters', progress: '88%' },
                { name: 'Science & Technology Part 1 (Physics & Chem)', code: 'SCI-201', faculty: 'Dr. Ramesh Deshmukh', chapters: '10 Chapters', progress: '85%' },
                { name: 'Science & Technology Part 2 (Bio & Env)', code: 'SCI-202', faculty: 'Dr. Arvind Kelkar', chapters: '10 Chapters', progress: '90%' },
                { name: 'History & Political Science', code: 'SST-301', faculty: 'Prof. Sunita Rane', chapters: '9 Chapters', progress: '80%' },
                { name: 'Geography & Economics', code: 'SST-302', faculty: 'Prof. Sunita Rane', chapters: '9 Chapters', progress: '82%' },
                { name: 'Marathi Kumarbharati (First / Second Lang)', code: 'LAN-401', faculty: 'Smt. Madhuri Joshi', chapters: '16 Lessons/Poems', progress: '94%' },
                { name: 'English Yuvakbharati / Kumarbharati', code: 'LAN-402', faculty: 'Prof. Shailaja Mehta', chapters: '18 Lessons/Poems', progress: '89%' },
                { name: 'Hindi Lokbharati (Entire / Composite)', code: 'LAN-403', faculty: 'Smt. Kavita Sharma', chapters: '12 Chapters', progress: '86%' },
                { name: 'Sanskrit Amod / Anand (Composite)', code: 'LAN-404', faculty: 'Acharya Vidyadhar', chapters: '8 Units', progress: '95%' },
              ].map((sub, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-stone-200 hover:border-stone-400 transition-colors bg-stone-50/50 flex justify-between items-center text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 font-serif text-xs">{sub.name}</span>
                      <span className="px-1.5 py-0.2 bg-stone-200 text-stone-700 rounded font-mono text-[9px]">{sub.code}</span>
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">Faculty: {sub.faculty} • {sub.chapters}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-emerald-700 font-bold font-mono text-xs">{sub.progress}</span>
                    <span className="text-[9px] text-stone-400 block font-sans">Mastery</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-SECTION 3: PARENT & GUARDIAN DETAILS */}
      {activeSubSection === 'guardian' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Father's Particulars */}
            <div className="bg-white border-2 border-stone-850 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm">
                  👨‍💼
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900">Father / Primary Guardian</h3>
                  <p className="text-[10px] text-stone-400">Emergency & Financial Contact</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-stone-400 text-[10px] uppercase font-serif block">Full Name:</span>
                  <strong className="text-stone-900 font-serif text-sm">{profileData.fatherName}</strong>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] uppercase font-serif block">Contact Number:</span>
                  <strong className="text-stone-800 font-sans">{profileData.fatherContact}</strong>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] uppercase font-serif block">Relationship:</span>
                  <strong className="text-stone-800">Father</strong>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] uppercase font-serif block">Occupation / Profession:</span>
                  <strong className="text-stone-800">Civil Engineering Consultant</strong>
                </div>
              </div>
            </div>

            {/* Mother's Particulars */}
            <div className="bg-white border-2 border-stone-850 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm">
                  👩‍💼
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900">Mother / Secondary Guardian</h3>
                  <p className="text-[10px] text-stone-400">Academic & Health Notification Contact</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-stone-400 text-[10px] uppercase font-serif block">Full Name:</span>
                  <strong className="text-stone-900 font-serif text-sm">{profileData.motherName}</strong>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] uppercase font-serif block">Relationship:</span>
                  <strong className="text-stone-800">Mother</strong>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] uppercase font-serif block">Occupation / Profession:</span>
                  <strong className="text-stone-800">Educational Administrator & Teacher</strong>
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] uppercase font-serif block">Emergency Notification SMS:</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> SMS & WhatsApp Alerts Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Parent Portal Secure Authority & Integration Config */}
          <div className="bg-[#FAF9F5] border-2 border-stone-850 rounded-2xl p-6 shadow-sm space-y-4 mt-6">
            <div className="flex items-center gap-3 border-b border-stone-200 pb-3">
              <div className="w-9 h-9 rounded-xl bg-amber-950 text-amber-300 flex items-center justify-center font-bold text-sm animate-pulse">
                🛡️
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-stone-900">Parent Portal Authority & Integration</h3>
                <p className="text-[10px] text-stone-400">Secure configuration matching for separate Parent Companion App integration</p>
              </div>
            </div>

            <div className="bg-white border border-amber-500/10 rounded-xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider border border-amber-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-800" />
                  Integration Status: Ready for Link
                </span>
                <p className="text-xs text-stone-600 leading-relaxed max-w-lg">
                  To grant a parent the authority to sign in to the separate **Parent Portal Companion App**, you must register their specific parent name and mobile number. When the parent logs in on the dedicated portal, our secure databases will verify and match these parameters.
                </p>
              </div>
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs space-y-2 shrink-0 min-w-[220px]">
                <div>
                  <span className="text-stone-400 text-[9px] uppercase font-serif block">Authorized Parent Name:</span>
                  <strong className="text-stone-900 font-serif font-bold text-sm">{profileData.parentName || profileData.fatherName}</strong>
                </div>
                <div>
                  <span className="text-stone-400 text-[9px] uppercase font-serif block">Authorized Parent Mobile:</span>
                  <strong className="text-stone-800 font-mono text-sm">{profileData.parentMobile || profileData.fatherContact}</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-amber-50/25 border border-amber-200/50 rounded-xl text-[11px] text-stone-650">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Only the parent name and mobile number specified above are permitted to authenticate and pull live performance syncs in the parent portal.</span>
            </div>
          </div>
        </div>
      )}

      {/* SUB-SECTION 4: DIGITAL STUDENT IDENTITY CARD */}
      {activeSubSection === 'idcard' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center bg-stone-100 p-4 rounded-2xl border border-stone-200">
            <span className="text-xs text-stone-600 font-serif">
              Official Digital Student Identity Card issued by Study Nest Academy.
            </span>
            <button
              onClick={handlePrintIdCard}
              className="px-4 py-2 bg-[#1C1917] hover:bg-stone-800 text-amber-300 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download ID Slip</span>
            </button>
          </div>

          {/* Realistic High-Fidelity Student ID Card */}
          <div className="bg-white border-2 border-stone-900 rounded-3xl p-8 max-w-md mx-auto shadow-xl relative overflow-hidden font-serif">
            {/* Header stripe */}
            <div className="bg-stone-900 text-stone-100 -m-8 p-6 mb-6 flex items-center justify-between border-b-2 border-amber-500">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold text-lg">
                  SN
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wider uppercase text-amber-300">Study Nest Academy</h3>
                  <p className="text-[9px] text-stone-300 font-sans">Sanctuary of Academic Excellence • Reg: MH-EDU-2026</p>
                </div>
              </div>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded font-mono font-bold">
                2026–27
              </span>
            </div>

            {/* Photo & Primary details */}
            <div className="flex items-center gap-5 mt-4 pb-6 border-b border-stone-200">
              <div className="w-24 h-28 rounded-2xl bg-stone-800 text-amber-300 flex flex-col items-center justify-center border-2 border-amber-600/40 shrink-0 shadow-inner">
                <span className="text-3xl font-bold font-serif">{studentName.charAt(0)}</span>
                <span className="text-[8px] uppercase tracking-widest text-stone-400 mt-1 font-sans">Photo</span>
              </div>

              <div className="space-y-1 text-xs">
                <h2 className="text-lg font-bold text-stone-900 leading-tight">{studentName}</h2>
                <p className="font-mono text-amber-800 font-bold text-[11px]">{profileData.rollNumber}</p>
                <p className="text-stone-600 text-[11px] font-sans">{studentStd} ({studentBoard})</p>
                <p className="text-stone-500 text-[10px] font-sans">DOB: {profileData.dob} • {profileData.bloodGroup}</p>
              </div>
            </div>

            {/* Emergency & Barcode */}
            <div className="pt-4 space-y-3 text-[11px] font-sans">
              <div className="flex justify-between">
                <span className="text-stone-500">Guardian Contact:</span>
                <strong className="text-stone-800">{profileData.fatherContact}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">School / Center:</span>
                <span className="text-stone-800 font-medium truncate max-w-[200px]">{profileData.schoolName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Validity:</span>
                <strong className="text-emerald-700">Valid till May 31, 2027</strong>
              </div>
            </div>

            {/* Barcode representation */}
            <div className="mt-6 pt-4 border-t border-stone-200 flex justify-between items-end">
              <div className="space-y-1">
                <div className="font-mono text-[10px] tracking-widest text-stone-800 font-bold">
                  ||| | |||| | ||| |||| | |||||| || |
                </div>
                <div className="text-[8px] font-mono text-stone-400">UID: {currentUser?.uid?.slice(0, 16) || 'SN9048123048'}</div>
              </div>

              <div className="text-right">
                <div className="text-[10px] text-stone-800 font-serif italic font-bold">Principal / Dean</div>
                <div className="text-[8px] text-stone-400 font-serif uppercase">Authorized Seal</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDIT PROFILE MODAL ================= */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border-2 border-[#1C1917] rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-[0_30px_70px_rgba(28,25,23,0.25)] relative max-h-[90vh] overflow-y-auto animate-scale-up text-left">
            
            <div className="flex justify-between items-center border-b border-stone-200 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-800" />
                <h3 className="font-serif font-bold text-lg text-stone-900">Edit Student Sanctuary Profile</h3>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-500 font-serif block mb-1">Student Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-stone-900 font-sans"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-500 font-serif block mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-stone-900 font-sans"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-500 font-serif block mb-1">Blood Group</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-stone-900 font-sans"
                  >
                    <option value="A+ (Positive)">A+ (Positive)</option>
                    <option value="A- (Negative)">A- (Negative)</option>
                    <option value="B+ (Positive)">B+ (Positive)</option>
                    <option value="B- (Negative)">B- (Negative)</option>
                    <option value="O+ (Positive)">O+ (Positive)</option>
                    <option value="O- (Negative)">O- (Negative)</option>
                    <option value="AB+ (Positive)">AB+ (Positive)</option>
                    <option value="AB- (Negative)">AB- (Negative)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-500 font-serif block mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-stone-900 font-sans"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-500 font-serif block mb-1">Affiliated School Name</label>
                  <input
                    type="text"
                    value={formData.schoolName}
                    onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-stone-900 font-sans"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-500 font-serif block mb-1">City / Region</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-stone-900 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-stone-500 font-serif block mb-1">Residential Street Address</label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-stone-900 font-sans"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-amber-200 bg-amber-50/15 p-4 rounded-2xl border border-amber-100/50 my-2">
                <div className="col-span-1 md:col-span-2 pb-1">
                  <h4 className="font-serif font-bold text-xs text-amber-900 flex items-center gap-1.5">
                    <span>🛡️ Parent Portal Authority Settings (For App Integration)</span>
                  </h4>
                  <p className="text-[10px] text-stone-500 font-sans mt-0.5">Define who is authorized to log into the connected parent portal.</p>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-500 font-serif block mb-1">Authorized Parent Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-amber-600 font-sans font-medium text-stone-850"
                    placeholder="e.g. Ramesh Pol"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-500 font-serif block mb-1">Authorized Parent Mobile Number</label>
                  <input
                    type="text"
                    required
                    value={formData.parentMobile}
                    onChange={(e) => setFormData({ ...formData, parentMobile: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-amber-600 font-sans font-medium text-stone-850"
                    placeholder="e.g. +91 98220 11223"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-stone-200 pt-3">
                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-500 font-serif block mb-1">Father's Full Name</label>
                  <input
                    type="text"
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-stone-900 font-sans text-stone-850"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-500 font-serif block mb-1">Father / Guardian Contact</label>
                  <input
                    type="text"
                    value={formData.fatherContact}
                    onChange={(e) => setFormData({ ...formData, fatherContact: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-stone-900 font-sans"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-500 font-serif block mb-1">Mother's Full Name</label>
                  <input
                    type="text"
                    value={formData.motherName}
                    onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-stone-900 font-sans"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-500 font-serif block mb-1">Career Goal / Aspiration</label>
                  <input
                    type="text"
                    value={formData.careerAspiration}
                    onChange={(e) => setFormData({ ...formData, careerAspiration: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs focus:outline-none focus:border-stone-900 font-sans"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-stone-300 text-stone-600 rounded-xl text-xs font-semibold cursor-pointer hover:bg-stone-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-[#1C1917] hover:bg-stone-800 text-amber-300 hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
