import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle, CheckCircle2, AlertCircle, ArrowLeft, Lock, Edit2, Trash2, X, 
  UserPlus, Users, ShieldCheck, KeyRound, UserCheck, LogOut, Globe2, Key, ShieldAlert, Check, Mail
} from 'lucide-react';

const SUPER_ADMIN_PASSWORD = 'DLV0909';

const SECTORS_LIST = [
  'Educational',
  'Sports',
  'Arts & Culture',
  'Healthcare',
  'Business & Entrepreneurship',
  'Research & Innovation',
  'Agricultural',
  'Social Sector',
];

const emptyForm = {
  name: '',
  nameHi: '',
  description: '',
  descriptionHi: '',
  eligibility: '',
  eligibilityHi: '',
  sector: 'Educational',
  state: 'All States',
  category: ['General', 'OBC', 'SC', 'ST', 'EWS'],
  maxIncomeLimit: 800000,
  annualAmount: 50000,
  deadline: '',
  officialLink: '',
  grade: 'Bachelor',
  fieldOfStudy: 'Science',
  minCGPA: 60,
  sportType: 'Cricket',
  performanceLevel: 'State Level',
  ageGroup: '14-18',
  artDiscipline: 'Painting',
  proficiencyLevel: 'Intermediate',
  minYearsOfPractice: 2,
  medicalField: 'MBBS',
  qualificationLevel: 'Undergraduate',
  minNEETScore: 500,
  businessStage: 'Startup',
  businessType: ['Technology'],
  fundingAmount: 500000,
  researchField: 'AI',
  researchLevel: 'PhD',
  durationMonths: 12,
  agriField: 'Horticulture',
  agriQualification: 'Bachelor',
  farmType: ['Small (<5 acres)'],
  causeArea: 'Education',
  backgroundRequired: 'Fresh graduate',
  roleType: 'Implementation/Field work',
};

const INITIAL_MEMBERS = [
  { id: 'mem_1', name: 'ScholarSeek Admin', email: 'admin@scholarseek.ac.in', password: 'DLV69', role: 'Super Admin', assignedSectors: ['All Sectors'], addedAt: '2026-01-10' }
];

export default function Admin() {
  const navigate = useNavigate();

  // Authentication State
  const [loginMethod, setLoginMethod] = useState('super'); // 'super' or 'member'
  const [superEmail, setSuperEmail] = useState('');
  const [inputPass, setInputPass] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [memberPass, setMemberPass] = useState('');
  const [passError, setPassError] = useState('');
  
  const [activeSession, setActiveSession] = useState(() => {
    const saved = sessionStorage.getItem('admin_active_session');
    return saved ? JSON.parse(saved) : null;
  });

  // Scholarship State
  const [formData, setFormData] = useState(emptyForm);
  const [scholarships, setScholarships] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Team Member Management State
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);

  const fetchTeamMembers = async () => {
    try {
      const res = await axios.get('/api/auth/members');
      if (res.data && res.data.success && Array.isArray(res.data.members)) {
        setTeamMembers(res.data.members);
      }
    } catch (e) {
      console.warn('Error fetching team members from MongoDB:', e.message);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Administrator',
    assignedSectors: ['Educational']
  });

  // Edit Member Modal State
  const [editingMember, setEditingMember] = useState(null);
  
  const [memberMsg, setMemberMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Compute allowed sectors for active session
  const allowedSectors = React.useMemo(() => {
    if (!activeSession) return [];
    if (activeSession.isSuperAdmin) return SECTORS_LIST;
    const sectors = activeSession.assignedSectors || [];
    if (sectors.includes('All Sectors')) return SECTORS_LIST;
    return sectors.length > 0 ? sectors : SECTORS_LIST;
  }, [activeSession]);

  // Handle active session persistence
  useEffect(() => {
    if (activeSession) {
      sessionStorage.setItem('admin_active_session', JSON.stringify(activeSession));
      fetchScholarships();
      
      if (allowedSectors.length > 0 && !allowedSectors.includes(formData.sector)) {
        setFormData(prev => ({ ...prev, sector: allowedSectors[0] }));
      }
    } else {
      sessionStorage.removeItem('admin_active_session');
    }
  }, [activeSession, allowedSectors]);

  const handleSuperAdminAuth = (e) => {
    e.preventDefault();
    setPassError('');

    const emailInput = superEmail.trim().toLowerCase();
    const passInput = inputPass.trim();

    if (!emailInput || !passInput) {
      setPassError('Please enter Super Admin Email and Password.');
      return;
    }

    if (
      emailInput === 'admin@scholarseek.ac.in' &&
      (passInput === 'DLV69' || passInput === SUPER_ADMIN_PASSWORD)
    ) {
      const session = {
        isSuperAdmin: true,
        name: 'ScholarSeek Admin',
        email: 'admin@scholarseek.ac.in',
        role: 'Super Admin',
        assignedSectors: ['All Sectors']
      };
      setActiveSession(session);
    } else {
      setPassError('Invalid Admin Email or Password! Access Denied.');
    }
  };

  const handleMemberAuth = (e) => {
    e.preventDefault();
    // Re-routed to the single universal admin auth
    handleSuperAdminAuth(e);
  };

  const handleAdminLogout = () => {
    setActiveSession(null);
    setInputPass('');
    setMemberEmail('');
    setMemberPass('');
  };

  const fetchScholarships = async () => {
    try {
      const res = await axios.get('/api/scholarships');
      if (res.data.success) {
        setScholarships(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching scholarships:', err);
    }
  };

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleCategoryToggle = (cat) => {
    setFormData((prev) => {
      const exists = prev.category.includes(cat);
      if (exists) {
        return { ...prev, category: prev.category.filter((c) => c !== cat) };
      } else {
        return { ...prev, category: [...prev.category, cat] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    const finalSector = allowedSectors.includes(formData.sector)
      ? formData.sector
      : (allowedSectors[0] || 'Educational');

    const finalData = {
      ...formData,
      sector: finalSector
    };

    try {
      if (editingId) {
        const response = await axios.put(`/api/scholarships/${editingId}`, finalData, {
          headers: { 'x-admin-key': SUPER_ADMIN_PASSWORD },
        });
        if (response.data && response.data.success) {
          setSuccessMsg(`🎉 Scholarship "${finalData.name}" updated successfully!`);
          setEditingId(null);
          setFormData({ ...emptyForm, sector: allowedSectors[0] || 'Educational' });
          fetchScholarships();
        }
      } else {
        const response = await axios.post('/api/scholarships', finalData, {
          headers: { 'x-admin-key': SUPER_ADMIN_PASSWORD },
        });
        if (response.data && response.data.success) {
          setSuccessMsg(`🎉 Scholarship "${finalData.name}" added successfully!`);
          setFormData({ ...emptyForm, sector: allowedSectors[0] || 'Educational' });
          fetchScholarships();
        }
      }
    } catch (err) {
      console.error('Error saving scholarship:', err);
      setErrorMsg(
        err.response?.data?.message || 'Failed to save scholarship. Check network connection.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (scholarship) => {
    setEditingId(scholarship._id);
    const formattedData = {
      ...emptyForm,
      ...scholarship,
      deadline: scholarship.deadline ? scholarship.deadline.split('T')[0] : '',
    };
    setFormData(formattedData);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = async (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to permanently delete "${name}"?`);
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`/api/scholarships/${id}`, {
        headers: { 'x-admin-key': SUPER_ADMIN_PASSWORD },
      });
      if (response.data && response.data.success) {
        setSuccessMsg(`🗑️ Scholarship "${name}" deleted successfully.`);
        fetchScholarships();
      }
    } catch (err) {
      console.error('Error deleting scholarship:', err);
      setErrorMsg(
        err.response?.data?.message || 'Failed to delete scholarship.'
      );
    }
  };

  const handleDeleteAllScholarships = async () => {
    const confirmDelete = window.confirm('⚠️ ARE YOU SURE? This will permanently delete ALL scholarships from the database and website.');
    if (!confirmDelete) return;

    try {
      const response = await axios.delete('/api/scholarships/all/delete-all', {
        headers: { 'x-admin-key': SUPER_ADMIN_PASSWORD },
      });
      if (response.data && response.data.success) {
        setSuccessMsg('🗑️ All scholarships deleted successfully.');
        setScholarships([]);
      }
    } catch (err) {
      console.error('Error deleting all scholarships:', err);
      setErrorMsg(
        err.response?.data?.message || 'Failed to delete all scholarships.'
      );
    }
  };

  // Super Admin Member Management Handlers
  const handleToggleNewMemberSector = (sectorName) => {
    setNewMember(prev => {
      let current = [...prev.assignedSectors];
      if (sectorName === 'All Sectors') {
        return { ...prev, assignedSectors: ['All Sectors'] };
      }
      current = current.filter(s => s !== 'All Sectors');
      if (current.includes(sectorName)) {
        current = current.filter(s => s !== sectorName);
      } else {
        current.push(sectorName);
      }
      if (current.length === 0) current = ['Educational'];
      return { ...prev, assignedSectors: current };
    });
  };

  const handleToggleEditMemberSector = (sectorName) => {
    setEditingMember(prev => {
      if (!prev) return prev;
      let current = [...prev.assignedSectors];
      if (sectorName === 'All Sectors') {
        return { ...prev, assignedSectors: ['All Sectors'] };
      }
      current = current.filter(s => s !== 'All Sectors');
      if (current.includes(sectorName)) {
        current = current.filter(s => s !== sectorName);
      } else {
        current.push(sectorName);
      }
      if (current.length === 0) current = ['Educational'];
      return { ...prev, assignedSectors: current };
    });
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    setMemberMsg('');

    const trimmedName = newMember.name.trim();
    const trimmedEmail = newMember.email.trim();
    const trimmedPassword = newMember.password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      setMemberMsg('⚠️ Please fill out name, email, and password.');
      return;
    }

    try {
      const response = await axios.post('/api/auth/members', {
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
        role: newMember.role || 'Administrator',
        assignedSectors: newMember.assignedSectors.length > 0 ? newMember.assignedSectors : ['All Sectors']
      });

      if (response.data && response.data.success) {
        setMemberMsg(`✅ Team member "${trimmedName}" saved permanently in MongoDB database!`);
        setNewMember({ name: '', email: '', password: '', role: 'Administrator', assignedSectors: ['Educational'] });
        await fetchTeamMembers();
        setTimeout(() => setMemberMsg(''), 4000);
      } else {
        setMemberMsg(`⚠️ ${response.data?.message || 'Error saving team member.'}`);
      }
    } catch (err) {
      console.error('Backend team member add error:', err);
      setMemberMsg(`⚠️ ${err.response?.data?.message || err.message || 'Error saving team member.'}`);
    }
  };

  const handleStartEditMember = (member) => {
    setEditingMember({
      id: member.id,
      name: member.name,
      email: member.email,
      password: member.password || '',
      role: member.role || 'Administrator',
      assignedSectors: Array.isArray(member.assignedSectors) ? [...member.assignedSectors] : ['All Sectors']
    });
  };

  const handleSaveEditedMember = async (e) => {
    e.preventDefault();
    if (!editingMember) return;

    if (!editingMember.name.trim() || !editingMember.email.trim() || !editingMember.password.trim()) {
      alert('Name, Email, and Password cannot be blank.');
      return;
    }

    try {
      const response = await axios.put(`/api/auth/members/${editingMember.id}`, {
        name: editingMember.name.trim(),
        email: editingMember.email.trim(),
        password: editingMember.password.trim(),
        role: editingMember.role,
        assignedSectors: editingMember.assignedSectors
      });

      if (response.data && response.data.success) {
        setMemberMsg(`✅ Member "${editingMember.name}" updated permanently in MongoDB!`);
        setEditingMember(null);
        fetchTeamMembers();
        setTimeout(() => setMemberMsg(''), 4000);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating member.');
    }
  };

  const handleDeleteMember = async (id, name) => {
    const confirmDelete = window.confirm(`Remove team member "${name}" permanently from MongoDB database?`);
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`/api/auth/members/${id}`);
      if (response.data && response.data.success) {
        setMemberMsg(`🗑️ Member "${name}" deleted permanently from MongoDB.`);
        fetchTeamMembers();
        setTimeout(() => setMemberMsg(''), 4000);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting member.');
    }
  };

  // Filter scholarships based on user access
  const visibleScholarships = activeSession?.isSuperAdmin || (activeSession?.assignedSectors && activeSession.assignedSectors.includes('All Sectors'))
    ? scholarships
    : scholarships.filter(s => allowedSectors.includes(s.sector));

  // ==========================================
  // UNAUTHENTICATED ADMIN LOGIN SCREEN
  // ==========================================
  if (!activeSession) {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-2xl space-y-6 animate-fade-in">
          
          <div className="w-16 h-16 bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <KeyRound className="w-8 h-8" />
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">ScholarSeek Admin Portal</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Select login mode to manage scholarship schemes &amp; team domains.
            </p>
          </div>

          {passError && (
            <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-bold p-3.5 rounded-xl flex items-center justify-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{passError}</span>
            </div>
          )}

          <form onSubmit={handleSuperAdminAuth} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                  Admin Email ID *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={superEmail}
                    onChange={(e) => setSuperEmail(e.target.value)}
                    placeholder="Enter Email"
                    className="w-full h-12 pl-10 pr-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                  Admin Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={inputPass}
                    onChange={(e) => setInputPass(e.target.value)}
                    placeholder="Enter Password"
                    className="w-full h-12 pl-10 pr-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-md cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Log In to Admin Portal</span>
              </button>
            </form>

          <p className="text-[11px] text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-800 pt-4 text-center">
            Protected Admin Route — Official Team &amp; Super Admin Access
          </p>

        </div>
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED ADMIN PORTAL
  // ==========================================
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Website
        </button>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <span className="block text-xs font-bold text-gray-900 dark:text-white">{activeSession.name}</span>
            <span className="block text-[10px] text-gray-500 dark:text-gray-400">
              Sectors: <strong className="text-brand-600 dark:text-brand-400">{allowedSectors.length === SECTORS_LIST.length ? 'All Sectors' : allowedSectors.join(', ')}</strong>
            </span>
          </div>

          <button
            onClick={handleAdminLogout}
            className="inline-flex items-center text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 mr-1" />
            <span>Logout Session</span>
          </button>
        </div>
      </div>

      {/* Title Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-brand-600 rounded-2xl text-white shadow-lg">
            {editingId ? <Edit2 className="w-6 h-6" /> : <PlusCircle className="w-6 h-6" />}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {activeSession.isSuperAdmin ? 'Super Admin Portal' : `Team Portal (${allowedSectors.length} Sectors Assigned)`}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Multi-sector delegation, bilingual (English &amp; Hindi) scholarship authoring, and member editing controls.
            </p>
          </div>
        </div>

        <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
          <UserCheck className="w-3.5 h-3.5 mr-1" />
          <span>{activeSession.isSuperAdmin ? 'Super Admin' : activeSession.role}</span>
        </div>
      </div>

      {/* System Notifications */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm font-semibold flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-sm font-semibold flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* ==========================================
          SECTION 2: BILINGUAL SCHOLARSHIP EDITOR FORM
          ========================================== */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm p-8 rounded-3xl space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-brand-700 dark:text-brand-400 uppercase tracking-wider flex items-center space-x-2">
              <Globe2 className="w-5 h-5 text-brand-600" />
              <span>{editingId ? 'Edit Scholarship Scheme (Dual Language)' : 'Add New Scholarship Scheme (Dual Language)'}</span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Provide entries in both English and Hindi for automatic site-wide language switching.
            </p>
          </div>

          {!activeSession.isSuperAdmin && (
            <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center space-x-1.5">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Authorized Sectors: {allowedSectors.join(', ')}</span>
            </div>
          )}
        </div>

        <div className="space-y-6">

          {/* Bilingual English & Hindi Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                Scholarship Name (English) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. PM Tribal Overseas Assistance Scheme"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2">
                छात्रवृत्ति का नाम (हिंदी में - Hindi) *
              </label>
              <input
                type="text"
                required
                placeholder="उदा. प्रधानमंत्री जनजातीय ओवरसीज सहायता योजना"
                value={formData.nameHi}
                onChange={(e) => handleChange('nameHi', e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Bilingual English & Hindi Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                Description (English) *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Brief summary of scholarship benefits..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2">
                विवरण (हिंदी में - Hindi) *
              </label>
              <textarea
                required
                rows={3}
                placeholder="छात्रवृत्ति के लाभों का संक्षिप्त विवरण..."
                value={formData.descriptionHi}
                onChange={(e) => handleChange('descriptionHi', e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Bilingual English & Hindi Eligibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                Eligibility Criteria (English) *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Academic, income limits, domicile requirements..."
                value={formData.eligibility}
                onChange={(e) => handleChange('eligibility', e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2">
                पात्रता मापदंड (हिंदी में - Hindi) *
              </label>
              <textarea
                required
                rows={3}
                placeholder="शैक्षणिक योग्यता, आय सीमा, मूल निवासी आवश्यकताएं..."
                value={formData.eligibilityHi}
                onChange={(e) => handleChange('eligibilityHi', e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Sector & State Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                Sector * {allowedSectors.length < SECTORS_LIST.length && `(Select from ${allowedSectors.length} Assigned Sectors)`}
              </label>
              <select
                value={formData.sector}
                onChange={(e) => handleChange('sector', e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none"
              >
                {allowedSectors.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">State *</label>
              <select
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none"
              >
                {[
                  'All States',
                  'Gujarat',
                  'Maharashtra',
                  'Delhi',
                  'Karnataka',
                  'Rajasthan',
                  'UP',
                  'Tamil Nadu',
                  'West Bengal',
                  'Punjab',
                ].map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Financial & Deadline Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">Annual Amount (₹) *</label>
              <input
                type="number"
                required
                placeholder="50000"
                value={formData.annualAmount}
                onChange={(e) => handleChange('annualAmount', Number(e.target.value))}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">Max Income Limit (₹) *</label>
              <input
                type="number"
                required
                placeholder="800000"
                value={formData.maxIncomeLimit}
                onChange={(e) => handleChange('maxIncomeLimit', Number(e.target.value))}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">Application Deadline *</label>
              <input
                type="date"
                required
                value={formData.deadline}
                onChange={(e) => handleChange('deadline', e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">Official Application Link URL *</label>
            <input
              type="url"
              required
              placeholder="https://scholarships.gov.in"
              value={formData.officialLink}
              onChange={(e) => handleChange('officialLink', e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none"
            />
          </div>

          {/* Category Checkboxes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">Eligible Social Categories</label>
            <div className="flex flex-wrap gap-3">
              {['General', 'OBC', 'SC', 'ST', 'EWS'].map((cat) => (
                <label
                  key={cat}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl border text-xs cursor-pointer ${
                    formData.category.includes(cat)
                      ? 'bg-brand-50 dark:bg-brand-950 border-brand-500 text-brand-700 dark:text-brand-300 font-bold'
                      : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.category.includes(cat)}
                    onChange={() => handleCategoryToggle(cat)}
                    className="accent-brand-500"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-4 px-6 rounded-2xl font-bold text-sm text-white bg-brand-600 hover:bg-brand-700 transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-2 shadow-md"
          >
            <Lock className="w-4 h-4" />
            <span>{loading ? 'Saving...' : (editingId ? 'Update Scholarship Scheme' : 'Save Scholarship Scheme (Bilingual)')}</span>
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ ...emptyForm, sector: allowedSectors[0] || 'Educational' });
              }}
              className="py-4 px-6 rounded-2xl font-bold text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1.5"
            >
              <X className="w-4 h-4" />
              <span>Cancel Edit</span>
            </button>
          )}
        </div>

      </form>

      {/* ==========================================
          SECTION 3: SCHOLARSHIPS DIRECTORY
          ========================================== */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm p-8 rounded-3xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Active Schemes Directory ({visibleScholarships.length})
          </h2>
          <div className="flex items-center space-x-2">
            {activeSession.isSuperAdmin && visibleScholarships.length > 0 && (
              <button
                type="button"
                onClick={handleDeleteAllScholarships}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 hover:bg-red-100 transition-colors cursor-pointer"
              >
                🗑️ Delete All Scholarships
              </button>
            )}
            {!activeSession.isSuperAdmin && (
              <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
                Showing Sectors: {allowedSectors.join(', ')}
              </span>
            )}
          </div>
        </div>

        {visibleScholarships.length === 0 ? (
          <p className="text-gray-500 text-sm">No scholarships found for your assigned sector access.</p>
        ) : (
          <div className="space-y-3">
            {visibleScholarships.map((s) => (
              <div key={s._id} className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-brand-500/50 transition-colors">
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-gray-900 dark:text-white font-bold text-sm">{s.name}</h4>
                    {s.nameHi && (
                      <span className="text-[10px] bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold px-2 py-0.5 rounded-full border border-brand-200 dark:border-brand-800">
                        Hindi Ready
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <span className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded font-medium text-gray-700 dark:text-gray-300">{s.sector}</span>
                    <span>•</span>
                    <span className="font-bold text-brand-600 dark:text-brand-400">₹{s.annualAmount}/yr</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditClick(s)}
                    className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 hover:bg-brand-100 transition-colors"
                    title="Edit Scholarship"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(s._id, s.name)}
                    className="p-2 rounded-xl bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 hover:bg-red-100 transition-colors"
                    title="Delete Scholarship"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
