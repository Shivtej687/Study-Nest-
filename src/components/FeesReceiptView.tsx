import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ShieldCheck, 
  QrCode, 
  Smartphone, 
  Building2, 
  Printer, 
  Download, 
  Receipt, 
  ArrowRight, 
  Check, 
  RefreshCw, 
  Calendar, 
  Tag, 
  Lock, 
  ChevronRight, 
  Sparkles,
  DollarSign,
  HelpCircle,
  FileCheck,
  X,
  Layers,
  Award
} from 'lucide-react';
import { db } from '../firebase';
import { doc, updateDoc, setDoc } from 'firebase/firestore';

export interface FeeItem {
  id: string;
  name: string;
  category: string;
  totalCost: number;
  paidAmount: number;
  status: 'PAID' | 'PARTIAL_PAID' | 'UNPAID';
  dueDate: string;
  description: string;
}

export interface FeeTransaction {
  id: string;
  txnId: string;
  date: string;
  amount: number;
  method: string;
  methodDetails: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  note: string;
}

interface FeesReceiptViewProps {
  currentUser?: any;
  userProfile?: any;
  triggerToast?: (msg: string) => void;
}

const TOTAL_MANDATED_FEES = 40000;

// Standard initial breakdown totaling ₹40,000
const INITIAL_FEE_BREAKDOWN: FeeItem[] = [
  {
    id: 'fee-1',
    name: 'Academic Tuition & Digital Classroom Coaching',
    category: 'Core Curriculum',
    totalCost: 18000,
    paidAmount: 18000,
    status: 'PAID',
    dueDate: 'July 15, 2026',
    description: 'Full syllabus mastery for 10 high-school subjects, interactive live classes & daily timetable'
  },
  {
    id: 'fee-2',
    name: 'Science & Tech Practical Laboratory Kit & Experiments',
    category: 'Practicals & Lab',
    totalCost: 6000,
    paidAmount: 3000,
    status: 'PARTIAL_PAID',
    dueDate: 'August 30, 2026',
    description: 'Hands-on scientific lab apparatus, interactive SVG diagrams & viva experiment manuals'
  },
  {
    id: 'fee-3',
    name: 'Handwritten Notes, Master Question Bank & Guide Sets',
    category: 'Study Material',
    totalCost: 5000,
    paidAmount: 2000,
    status: 'PARTIAL_PAID',
    dueDate: 'September 15, 2026',
    description: 'Topper handwritten solved notes, formula sheets, poem appreciation & question banks'
  },
  {
    id: 'fee-4',
    name: 'Board Exam Prelim Series, Mock Papers & Answer Evaluation',
    category: 'Examinations',
    totalCost: 4500,
    paidAmount: 0,
    status: 'UNPAID',
    dueDate: 'October 30, 2026',
    description: 'Pre-board full syllabus simulation tests, timed chapter papers & teacher checked scorecards'
  },
  {
    id: 'fee-5',
    name: 'NestAI 24/7 AI Doubt-Solving Companion & Server Access',
    category: 'AI Technology',
    totalCost: 3500,
    paidAmount: 0,
    status: 'UNPAID',
    dueDate: 'November 15, 2026',
    description: 'Round-the-clock Gemini-powered step-by-step doubt clearing, voice speech & personalized tips'
  },
  {
    id: 'fee-6',
    name: 'Co-Curricular, Career Guidance & Personality Development',
    category: 'Holistic Growth',
    totalCost: 3000,
    paidAmount: 0,
    status: 'UNPAID',
    dueDate: 'December 10, 2026',
    description: 'Special mentorship sessions, olympiad prep guidance & academic wellness counseling'
  }
];

const INITIAL_TRANSACTIONS: FeeTransaction[] = [
  {
    id: 'txn-1',
    txnId: 'TXN_SN_2026_884210',
    date: 'July 12, 2026 • 11:30 AM',
    amount: 18000,
    method: 'UPI (Google Pay)',
    methodDetails: 'UPI Ref: 620491823491',
    status: 'SUCCESS',
    note: 'Academic Tuition & Digital Classroom'
  },
  {
    id: 'txn-2',
    txnId: 'TXN_SN_2026_910482',
    date: 'August 28, 2026 • 04:15 PM',
    amount: 5000,
    method: 'HDFC Net Banking',
    methodDetails: 'Bank Ref: HDFC_9048123',
    status: 'SUCCESS',
    note: 'Science Lab (₹3k) + Handwritten Notes (₹2k)'
  }
];

export const FeesReceiptView: React.FC<FeesReceiptViewProps> = ({
  currentUser,
  userProfile,
  triggerToast
}) => {
  // State for fee breakdown items
  const [feeItems, setFeeItems] = useState<FeeItem[]>(() => {
    const saved = localStorage.getItem('study_nest_fee_items');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_FEE_BREAKDOWN;
  });

  // State for transaction logs
  const [transactions, setTransactions] = useState<FeeTransaction[]>(() => {
    const saved = localStorage.getItem('study_nest_transactions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_TRANSACTIONS;
  });

  // Tab filter: 'all' | 'paid' | 'partial' | 'unpaid' | 'receipt'
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'paid' | 'partial' | 'unpaid' | 'receipt'>('all');

  // Payment Gateway Modal State
  const [isGatewayOpen, setIsGatewayOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'SELECT_AMOUNT' | 'PAYMENT_METHOD' | 'PROCESSING' | 'SUCCESS'>('SELECT_AMOUNT');
  const [payAmount, setPayAmount] = useState<number>(5000);
  const [customAmountInput, setCustomAmountInput] = useState<string>('');
  const [selectedMethod, setSelectedMethod] = useState<'UPI' | 'CARD' | 'NET_BANKING' | 'EMI'>('UPI');

  // Gateway Form Fields
  const [upiId, setUpiId] = useState('shivtejpol@oksbi');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardHolder, setCardHolder] = useState('SHIVTEJ POL');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('842');
  const [selectedBank, setSelectedBank] = useState('State Bank of India');
  const [selectedEmiPlan, setSelectedEmiPlan] = useState('3_MONTHS');

  // Processing Simulation State
  const [processingStatusText, setProcessingStatusText] = useState('Initiating 256-bit SSL encrypted tunnel...');
  const [latestCompletedTxn, setLatestCompletedTxn] = useState<FeeTransaction | null>(null);

  // Sync to Firestore if user profile exists
  useEffect(() => {
    if (userProfile?.feesRecord?.items) {
      setFeeItems(userProfile.feesRecord.items);
    }
    if (userProfile?.feesRecord?.transactions) {
      setTransactions(userProfile.feesRecord.transactions);
    }
  }, [userProfile]);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('study_nest_fee_items', JSON.stringify(feeItems));
  }, [feeItems]);

  useEffect(() => {
    localStorage.setItem('study_nest_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Aggregate Calculations
  const totalFees = TOTAL_MANDATED_FEES; // Mandated 40,000 Rs.
  const totalPaid = feeItems.reduce((acc, item) => acc + item.paidAmount, 0);
  const totalUnpaid = Math.max(0, totalFees - totalPaid);
  const paymentPercentage = Math.min(100, Math.round((totalPaid / totalFees) * 100));

  // Determine overall status
  const overallStatus: 'PAID' | 'PARTIAL_PAID' | 'UNPAID' = 
    totalPaid >= totalFees ? 'PAID' : totalPaid > 0 ? 'PARTIAL_PAID' : 'UNPAID';

  // Filtered fee items
  const paidItems = feeItems.filter(item => item.status === 'PAID');
  const partialItems = feeItems.filter(item => item.status === 'PARTIAL_PAID');
  const unpaidItems = feeItems.filter(item => item.status === 'UNPAID');

  const displayedItems = 
    activeSubTab === 'paid' ? paidItems :
    activeSubTab === 'partial' ? partialItems :
    activeSubTab === 'unpaid' ? unpaidItems :
    feeItems;

  // Student Profile Data
  const studentName = userProfile?.studentMeta?.name || userProfile?.fullName || 'Shivtej Pol';
  const studentStd = userProfile?.studentMeta?.std || 'Standard 10';
  const studentBoard = userProfile?.studentMeta?.board || 'State Board / CBSE';
  const studentRollNo = `SN-2026-${(currentUser?.uid || '10482').slice(0, 5).toUpperCase()}`;

  // Open Gateway with a specific target amount
  const handleOpenGateway = (targetAmount?: number) => {
    const amountToSet = targetAmount && targetAmount > 0 
      ? Math.min(targetAmount, totalUnpaid) 
      : (totalUnpaid > 0 ? Math.min(10000, totalUnpaid) : 0);

    setPayAmount(amountToSet);
    setCustomAmountInput(amountToSet > 0 ? amountToSet.toString() : '');
    setPaymentStep('SELECT_AMOUNT');
    setIsGatewayOpen(true);
  };

  // Process Payment through Simulated Bank Gateway
  const handleProcessPayment = async () => {
    if (payAmount <= 0) return;

    setPaymentStep('PROCESSING');
    setProcessingStatusText('Connecting to RBI / NPCI Payment Gateway...');

    await new Promise(r => setTimeout(r, 900));
    setProcessingStatusText(`Authorizing ₹${payAmount.toLocaleString('en-IN')} via ${selectedMethod}...`);
    
    await new Promise(r => setTimeout(r, 1100));
    setProcessingStatusText('Verifying bank security token & 2FA clearance...');
    
    await new Promise(r => setTimeout(r, 900));

    // Generate Transaction
    const newTxnId = `TXN_SN_${Date.now().toString().slice(-6)}`;
    const methodDesc = 
      selectedMethod === 'UPI' ? `UPI (${upiId})` :
      selectedMethod === 'CARD' ? `Card (Ending in ${cardNumber.slice(-4)})` :
      selectedMethod === 'NET_BANKING' ? `${selectedBank} NetBanking` :
      `EMI Plan (${selectedEmiPlan.replace('_', ' ')})`;

    const newTxn: FeeTransaction = {
      id: `txn-${Date.now()}`,
      txnId: newTxnId,
      date: new Date().toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      amount: payAmount,
      method: methodDesc,
      methodDetails: `Auth Code: APPR_${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'SUCCESS',
      note: 'Online Fee Installment Clearance'
    };

    // Distribute the paid amount across unpaid and partially paid fee items
    let remainingToAllocate = payAmount;
    const updatedFeeItems = feeItems.map(item => {
      if (remainingToAllocate <= 0) return item;
      const needed = item.totalCost - item.paidAmount;
      if (needed <= 0) return item;

      const allocate = Math.min(remainingToAllocate, needed);
      const newPaid = item.paidAmount + allocate;
      remainingToAllocate -= allocate;

      const newStatus: 'PAID' | 'PARTIAL_PAID' | 'UNPAID' = 
        newPaid >= item.totalCost ? 'PAID' : newPaid > 0 ? 'PARTIAL_PAID' : 'UNPAID';

      return {
        ...item,
        paidAmount: newPaid,
        status: newStatus
      };
    });

    const updatedTransactions = [newTxn, ...transactions];

    setFeeItems(updatedFeeItems);
    setTransactions(updatedTransactions);
    setLatestCompletedTxn(newTxn);
    setPaymentStep('SUCCESS');

    if (triggerToast) {
      triggerToast(`🎉 Payment of ₹${payAmount.toLocaleString('en-IN')} confirmed successfully!`);
    }

    // Persist to Firestore if user is authenticated
    if (currentUser?.uid) {
      try {
        const userRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userRef, {
          feesRecord: {
            totalFees: TOTAL_MANDATED_FEES,
            totalPaid: totalPaid + payAmount,
            updatedAt: new Date().toISOString(),
            items: updatedFeeItems,
            transactions: updatedTransactions
          }
        });
      } catch (err) {
        console.warn('Firestore update for fees skipped:', err);
      }
    }
  };

  // Reset demo state
  const handleResetToDemo = () => {
    setFeeItems(INITIAL_FEE_BREAKDOWN);
    setTransactions(INITIAL_TRANSACTIONS);
    localStorage.removeItem('study_nest_fee_items');
    localStorage.removeItem('study_nest_transactions');
    if (triggerToast) {
      triggerToast('Reset fees to initial status (₹23,000 Paid / ₹17,000 Due).');
    }
  };

  // Print Receipt
  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="text-left space-y-7 animate-fade-in pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
              Academic Finance & Billing
            </span>
            <span className="text-[11px] text-stone-500 font-serif">Academic Year 2026–2027</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-stone-900 mt-1.5 flex items-center gap-2.5">
            <Receipt className="w-7 h-7 text-amber-800" />
            <span>Fees & Payment Sanctuary</span>
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Comprehensive breakdown of mandatory academic fees, paid receipts, and instant payment gateway.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleOpenGateway()}
            disabled={totalUnpaid <= 0}
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all cursor-pointer ${
              totalUnpaid <= 0 
                ? 'bg-emerald-100 text-emerald-800 cursor-default' 
                : 'bg-[#1C1917] hover:bg-stone-800 text-amber-300 hover:text-white shadow-stone-900/10'
            }`}
          >
            {totalUnpaid <= 0 ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>All Fees Cleared (₹40,000)</span>
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                <span>Pay Dues Online (₹{totalUnpaid.toLocaleString('en-IN')})</span>
              </>
            )}
          </button>
          
          <button
            onClick={handleResetToDemo}
            title="Reset fee states to default preview"
            className="p-2.5 border border-stone-200 hover:bg-stone-100 text-stone-600 rounded-xl text-xs transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3 Metric Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Mandated Fees */}
        <div className="bg-white border-2 border-stone-850 rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 font-serif">
              Total Academic Fees
            </span>
            <span className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-700 font-bold text-xs">
              ₹
            </span>
          </div>
          <div className="text-2xl md:text-3xl font-bold font-serif text-stone-900 mt-2">
            ₹{totalFees.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-stone-500 mt-1 font-sans">
            Full annual syllabus & coaching tuition
          </p>
        </div>

        {/* Paid Section Card */}
        <div className="bg-emerald-50/70 border-2 border-emerald-300/80 rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 font-serif flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Paid Amount</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-bold">
              {paymentPercentage}%
            </span>
          </div>
          <div className="text-2xl md:text-3xl font-bold font-serif text-emerald-900 mt-2">
            ₹{totalPaid.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-emerald-700 mt-1 font-sans">
            {paidItems.length} fully paid • {partialItems.length} partial
          </p>
        </div>

        {/* Partial Paid / Unpaid Remaining */}
        <div className={`border-2 rounded-2xl p-5 shadow-sm relative overflow-hidden ${
          totalUnpaid > 0 ? 'bg-amber-50/70 border-amber-300/80' : 'bg-stone-50 border-stone-200'
        }`}>
          <div className="flex justify-between items-start">
            <span className={`text-[10px] font-bold uppercase tracking-widest font-serif flex items-center gap-1 ${
              totalUnpaid > 0 ? 'text-amber-800' : 'text-stone-500'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>Unpaid / Due Balance</span>
            </span>
            {totalUnpaid > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold">
                {100 - paymentPercentage}% Due
              </span>
            )}
          </div>
          <div className={`text-2xl md:text-3xl font-bold font-serif mt-2 ${
            totalUnpaid > 0 ? 'text-amber-950' : 'text-stone-400'
          }`}>
            ₹{totalUnpaid.toLocaleString('en-IN')}
          </div>
          <p className={`text-[11px] mt-1 font-sans ${totalUnpaid > 0 ? 'text-amber-700' : 'text-stone-400'}`}>
            {totalUnpaid > 0 ? 'Eligible for instant online clearance' : 'No outstanding balance'}
          </p>
        </div>

        {/* Overall Status Badge */}
        <div className="bg-stone-900 text-stone-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-amber-400 font-serif font-bold">
              Account Status
            </span>
            <div className="mt-2 flex items-center gap-2">
              {overallStatus === 'PAID' && (
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" /> Paid in Full
                </span>
              )}
              {overallStatus === 'PARTIAL_PAID' && (
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Partial Paid
                </span>
              )}
              {overallStatus === 'UNPAID' && (
                <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" /> Unpaid
                </span>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
            <span>Progress:</span>
            <span className="font-mono text-amber-300">₹{totalPaid.toLocaleString('en-IN')} / ₹40,000</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-2 border-stone-850 rounded-2xl p-4 shadow-sm space-y-2">
        <div className="flex justify-between items-center text-xs font-serif">
          <span className="font-semibold text-stone-800">Fee Clearance Progression</span>
          <span className="font-bold text-amber-800">{paymentPercentage}% Cleared</span>
        </div>
        <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden border border-stone-200 flex">
          <div 
            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-500 transition-all duration-700" 
            style={{ width: `${paymentPercentage}%` }}
          />
          <div 
            className="h-full bg-amber-200/50 transition-all duration-700" 
            style={{ width: `${100 - paymentPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-stone-400 font-sans">
          <span>₹0 (Start)</span>
          <span>Target Total: ₹40,000 Rs.</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs: All / Paid / Partial Paid / Unpaid / Tax Invoice */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-3">
        <button
          onClick={() => setActiveSubTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-serif font-semibold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'all'
              ? 'bg-[#1C1917] text-white shadow-sm'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All Fee Heads ({feeItems.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('paid')}
          className={`px-4 py-2 rounded-xl text-xs font-serif font-semibold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'paid'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Paid Section ({paidItems.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('partial')}
          className={`px-4 py-2 rounded-xl text-xs font-serif font-semibold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'partial'
              ? 'bg-amber-800 text-white shadow-sm'
              : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200/60'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-amber-500" />
          <span>Partial Paid Section ({partialItems.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('unpaid')}
          className={`px-4 py-2 rounded-xl text-xs font-serif font-semibold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'unpaid'
              ? 'bg-rose-800 text-white shadow-sm'
              : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200/60'
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
          <span>Unpaid Section ({unpaidItems.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('receipt')}
          className={`px-4 py-2 rounded-xl text-xs font-serif font-semibold transition-all cursor-pointer flex items-center gap-2 ml-auto ${
            activeSubTab === 'receipt'
              ? 'bg-amber-700 text-white shadow-sm'
              : 'bg-white border-2 border-stone-850 text-stone-800 hover:bg-stone-50'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5 text-amber-600" />
          <span>Official Tax Invoice & Receipt</span>
        </button>
      </div>

      {/* Main Content Area based on Active Sub-Tab */}
      {activeSubTab !== 'receipt' ? (
        <div className="space-y-6">
          {/* Section Description */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-xs text-stone-600 flex items-center justify-between">
            <div>
              {activeSubTab === 'all' && <span>Showing all 6 itemized academic fee components totaling <strong>₹40,000 Rs.</strong></span>}
              {activeSubTab === 'paid' && <span>Showing fee components that are <strong>100% Paid and Cleared</strong>.</span>}
              {activeSubTab === 'partial' && <span>Showing fee components that have <strong>Partial payments received</strong> with remaining dues.</span>}
              {activeSubTab === 'unpaid' && <span>Showing fee components that are currently <strong>Unpaid / Pending</strong>.</span>}
            </div>
            {totalUnpaid > 0 && (
              <button
                onClick={() => handleOpenGateway()}
                className="text-amber-800 font-bold underline hover:text-amber-900 cursor-pointer ml-4"
              >
                Pay Pending Dues Now →
              </button>
            )}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedItems.map((item) => {
              const itemUnpaid = item.totalCost - item.paidAmount;
              const itemPct = Math.round((item.paidAmount / item.totalCost) * 100);

              return (
                <div 
                  key={item.id}
                  className={`bg-white border-2 rounded-2xl p-5 shadow-sm transition-all hover:shadow-md flex flex-col justify-between ${
                    item.status === 'PAID' ? 'border-emerald-200 hover:border-emerald-400' :
                    item.status === 'PARTIAL_PAID' ? 'border-amber-200 hover:border-amber-400' :
                    'border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <div>
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-serif">
                          {item.category}
                        </span>
                        <h3 className="text-base font-serif font-bold text-stone-900 mt-0.5">
                          {item.name}
                        </h3>
                      </div>

                      {/* Status Tag */}
                      <div>
                        {item.status === 'PAID' && (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Paid
                          </span>
                        )}
                        {item.status === 'PARTIAL_PAID' && (
                          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-600" /> Partial Paid
                          </span>
                        )}
                        {item.status === 'UNPAID' && (
                          <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 text-rose-600" /> Unpaid
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Progress Bar for each item */}
                    <div className="mt-4 pt-3 border-t border-stone-100 space-y-1.5">
                      <div className="flex justify-between text-[11px] font-sans">
                        <span className="text-stone-500">Paid: <strong>₹{item.paidAmount.toLocaleString('en-IN')}</strong> / ₹{item.totalCost.toLocaleString('en-IN')}</span>
                        <span className={`font-bold ${
                          item.status === 'PAID' ? 'text-emerald-700' :
                          item.status === 'PARTIAL_PAID' ? 'text-amber-700' :
                          'text-stone-500'
                        }`}>{itemPct}%</span>
                      </div>
                      <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                        <div 
                          className={`h-full ${
                            item.status === 'PAID' ? 'bg-emerald-600' :
                            item.status === 'PARTIAL_PAID' ? 'bg-amber-500' :
                            'bg-stone-300'
                          }`}
                          style={{ width: `${itemPct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom / Action */}
                  <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div className="text-[11px] text-stone-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Due: {item.dueDate}</span>
                    </div>

                    {itemUnpaid > 0 ? (
                      <button
                        onClick={() => handleOpenGateway(itemUnpaid)}
                        className="px-3.5 py-1.5 bg-[#1C1917] hover:bg-stone-800 text-amber-300 hover:text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Pay ₹{itemUnpaid.toLocaleString('en-IN')}</span>
                      </button>
                    ) : (
                      <span className="text-emerald-700 text-xs font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Fully Settled
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Installment Plan Structure (Term-wise) */}
          <div className="bg-white border-2 border-stone-850 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-stone-200 pb-4 mb-5">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-amber-700 font-serif font-bold">Recommended Schedule</span>
                <h3 className="text-lg font-bold font-serif text-stone-900 mt-0.5">3-Term Structured Installment Plan</h3>
              </div>
              <p className="text-xs text-stone-400">Total Sum = ₹40,000 Rs. (No Additional Interest or Fees)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Term 1 */}
              <div className="border border-stone-200 rounded-xl p-4 bg-stone-50/50">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-stone-800 font-serif">Term 1 Installment</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">Cleared</span>
                </div>
                <div className="text-xl font-bold font-serif text-stone-900 mt-2">₹15,000</div>
                <p className="text-[11px] text-stone-500 mt-1">Admission, Syllabus Activation & Foundation</p>
                <div className="mt-3 text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3" /> Paid on July 12, 2026
                </div>
              </div>

              {/* Term 2 */}
              <div className="border border-amber-200 rounded-xl p-4 bg-amber-50/30">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-stone-800 font-serif">Term 2 Installment</span>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-bold rounded">Partial Paid</span>
                </div>
                <div className="text-xl font-bold font-serif text-stone-900 mt-2">₹15,000</div>
                <p className="text-[11px] text-stone-500 mt-1">Science Labs, Notes & Seminars</p>
                <div className="mt-3 text-[10px] text-amber-800 font-semibold flex items-center justify-between">
                  <span>₹8,000 Paid • ₹7,000 Due</span>
                  <button 
                    onClick={() => handleOpenGateway(7000)}
                    className="text-amber-900 underline font-bold cursor-pointer"
                  >
                    Pay
                  </button>
                </div>
              </div>

              {/* Term 3 */}
              <div className="border border-stone-200 rounded-xl p-4 bg-stone-50/50">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-stone-800 font-serif">Term 3 Installment</span>
                  <span className="px-2 py-0.5 bg-rose-100 text-rose-800 text-[10px] font-bold rounded">Upcoming Due</span>
                </div>
                <div className="text-xl font-bold font-serif text-stone-900 mt-2">₹10,000</div>
                <p className="text-[11px] text-stone-500 mt-1">Board Test Series, Prelims & Final Clearance</p>
                <div className="mt-3 text-[10px] text-rose-800 font-semibold flex items-center justify-between">
                  <span>Due by Oct 30, 2026</span>
                  <button 
                    onClick={() => handleOpenGateway(10000)}
                    className="text-amber-900 underline font-bold cursor-pointer"
                  >
                    Pay
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Payment History Log */}
          <div className="bg-white border-2 border-stone-850 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center border-b border-stone-200 pb-4 mb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-amber-700 font-serif font-bold">Ledger Transactions</span>
                <h3 className="text-lg font-bold font-serif text-stone-900 mt-0.5">Payment Activity Log</h3>
              </div>
              <span className="text-xs text-stone-400">{transactions.length} Verified Records</span>
            </div>

            <div className="divide-y divide-stone-100">
              {transactions.map((txn) => (
                <div key={txn.id} className="py-3.5 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm text-stone-900">{txn.method}</span>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold rounded uppercase">
                          {txn.status}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 font-sans mt-0.5">{txn.note}</p>
                      <div className="flex items-center gap-3 text-[10px] text-stone-400 font-mono mt-1">
                        <span>TXN: {txn.txnId}</span>
                        <span>•</span>
                        <span>{txn.methodDetails}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left md:text-right shrink-0">
                    <div className="font-serif font-bold text-base text-emerald-800">
                      + ₹{txn.amount.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-stone-400 font-sans mt-0.5">
                      {txn.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* OFFICIAL TAX INVOICE & PRINTABLE RECEIPT VIEW */
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-stone-100 p-4 rounded-2xl border border-stone-200">
            <span className="text-xs text-stone-600 font-serif">
              Official Tax Invoice conforming to educational compliance standards.
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrintReceipt}
                className="px-4 py-2 bg-[#1C1917] hover:bg-stone-800 text-amber-300 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>

          {/* Printable Formal Institutional Slip */}
          <div id="study-nest-official-receipt" className="bg-white border-2 border-stone-850 rounded-3xl p-8 md:p-12 max-w-3xl mx-auto shadow-md relative overflow-hidden font-serif">
            {/* Watermark crest */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] text-9xl select-none">
              STUDY NEST
            </div>

            {/* Institutional Header */}
            <div className="border-b-2 border-stone-900 pb-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center text-amber-400 font-bold text-sm">
                    SN
                  </div>
                  <h1 className="text-xl md:text-2xl font-bold tracking-wider uppercase text-stone-900">
                    Study Nest Academy
                  </h1>
                </div>
                <p className="text-xs text-stone-500 mt-1 italic font-sans">
                  Educational Excellence Sanctuary • State Board & CBSE Division
                </p>
                <p className="text-[10px] text-stone-400 font-mono mt-0.5">
                  Reg No: MH-EDU-2026-90412 • GSTIN: 27AAACS1429B1Z8
                </p>
              </div>

              <div className="text-left md:text-right">
                <span className="px-3 py-1 bg-stone-900 text-amber-300 text-xs font-bold uppercase tracking-widest rounded-lg inline-block">
                  Fee Receipt
                </span>
                <div className="text-xs font-mono text-stone-600 mt-2">
                  Receipt No: <strong className="text-stone-900">REC-2026-{transactions[0]?.txnId.slice(-6) || '901248'}</strong>
                </div>
                <div className="text-[11px] text-stone-500 font-sans mt-0.5">
                  Date: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            </div>

            {/* Student & Course Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-stone-50 border border-stone-200 rounded-2xl p-4 mb-6 text-xs font-sans">
              <div>
                <span className="text-stone-400 text-[10px] uppercase font-serif block">Student Name:</span>
                <strong className="text-stone-900 font-serif text-sm">{studentName}</strong>
              </div>
              <div>
                <span className="text-stone-400 text-[10px] uppercase font-serif block">Student ID / Roll:</span>
                <strong className="text-stone-800 font-mono">{studentRollNo}</strong>
              </div>
              <div>
                <span className="text-stone-400 text-[10px] uppercase font-serif block">Class Standard:</span>
                <strong className="text-stone-800">{studentStd}</strong>
              </div>
              <div>
                <span className="text-stone-400 text-[10px] uppercase font-serif block">Academic Board:</span>
                <strong className="text-stone-800">{studentBoard}</strong>
              </div>
            </div>

            {/* Ledger Table */}
            <table className="w-full text-left text-xs mb-6 font-sans">
              <thead>
                <tr className="border-b-2 border-stone-800 text-stone-600 text-[10px] uppercase font-serif tracking-wider">
                  <th className="py-2.5">#</th>
                  <th className="py-2.5">Fee Particulars / Category</th>
                  <th className="py-2.5 text-right">Standard Fee (₹)</th>
                  <th className="py-2.5 text-right">Amount Paid (₹)</th>
                  <th className="py-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {feeItems.map((item, idx) => (
                  <tr key={item.id} className="py-2.5">
                    <td className="py-2.5 text-stone-400 font-mono">{idx + 1}</td>
                    <td className="py-2.5">
                      <div className="font-semibold text-stone-800">{item.name}</div>
                      <div className="text-[10px] text-stone-400">{item.category}</div>
                    </td>
                    <td className="py-2.5 text-right font-mono text-stone-700">₹{item.totalCost.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 text-right font-mono font-semibold text-emerald-800">₹{item.paidAmount.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 text-right font-mono text-[10px]">
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        item.status === 'PAID' ? 'bg-emerald-100 text-emerald-900' :
                        item.status === 'PARTIAL_PAID' ? 'bg-amber-100 text-amber-900' :
                        'bg-rose-100 text-rose-900'
                      }`}>
                        {item.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total Balance Calculation Box */}
            <div className="border-t-2 border-stone-900 pt-4 space-y-2 max-w-xs ml-auto text-xs font-sans">
              <div className="flex justify-between text-stone-600">
                <span>Total Prescribed Fees:</span>
                <strong className="font-mono text-stone-900">₹{totalFees.toLocaleString('en-IN')}</strong>
              </div>
              <div className="flex justify-between text-emerald-800 font-semibold">
                <span>Total Amount Paid:</span>
                <strong className="font-mono">₹{totalPaid.toLocaleString('en-IN')}</strong>
              </div>
              <div className="flex justify-between text-stone-900 font-bold border-t border-stone-300 pt-2 text-sm font-serif">
                <span>Net Outstanding Balance:</span>
                <span className="font-mono text-amber-900">₹{totalUnpaid.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Official Stamps & Signatures */}
            <div className="mt-12 pt-8 border-t border-stone-200 flex justify-between items-end text-xs">
              <div className="space-y-1">
                <div className="w-16 h-16 rounded-full border-2 border-amber-800/40 flex items-center justify-center text-amber-900 text-[9px] uppercase font-bold text-center leading-tight p-2 rotate-[-12deg]">
                  Official Sealed Study Nest
                </div>
                <p className="text-[10px] text-stone-400 font-sans mt-2">
                  Generated digitally by Study Nest Platform. Valid without physical signature.
                </p>
              </div>

              <div className="text-right space-y-1">
                <div className="font-serif italic text-base text-stone-800 font-bold">
                  Accounts & Bursar
                </div>
                <div className="text-[10px] uppercase tracking-wider text-stone-400 font-serif">
                  Authorized Signatory
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= PAYMENT GATEWAY MODAL ================= */}
      {isGatewayOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border-2 border-[#1C1917] rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-[0_30px_70px_rgba(28,25,23,0.25)] relative overflow-hidden animate-scale-up text-left">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b border-stone-100 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-stone-900 flex items-center justify-center text-amber-400 font-bold text-xs">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900">Study Nest Payment Gateway</h3>
                  <p className="text-[10px] text-stone-400 font-sans flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>256-Bit SSL Encrypted • PCI-DSS Certified</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsGatewayOpen(false)}
                className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* STEP 1: SELECT AMOUNT */}
            {paymentStep === 'SELECT_AMOUNT' && (
              <div className="space-y-5">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-stone-400 font-serif font-bold block mb-1">
                    Choose Amount to Pay (₹)
                  </label>
                  <p className="text-xs text-stone-500 mb-3">
                    Total fees: ₹40,000 | Current unpaid dues: <strong className="text-amber-900">₹{totalUnpaid.toLocaleString('en-IN')}</strong>
                  </p>

                  {/* Preset Amount Chips */}
                  <div className="grid grid-cols-3 gap-2.5 mb-3">
                    {[
                      { label: 'Full Balance', amount: totalUnpaid },
                      { label: 'Term Installment', amount: Math.min(10000, totalUnpaid) },
                      { label: 'Partial Token', amount: Math.min(5000, totalUnpaid) }
                    ].map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setPayAmount(preset.amount);
                          setCustomAmountInput(preset.amount.toString());
                        }}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          payAmount === preset.amount
                            ? 'bg-amber-50 border-amber-800 text-amber-950 font-bold shadow-xs'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        <div className="text-[10px] uppercase tracking-wider text-stone-400">{preset.label}</div>
                        <div className="text-sm font-bold font-serif mt-0.5">₹{preset.amount.toLocaleString('en-IN')}</div>
                      </button>
                    ))}
                  </div>

                  {/* Custom Input */}
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 font-bold text-sm">₹</span>
                    <input
                      type="number"
                      placeholder="Enter custom amount"
                      value={customAmountInput}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setCustomAmountInput(e.target.value);
                        if (!isNaN(val)) {
                          setPayAmount(Math.min(val, totalUnpaid));
                        }
                      }}
                      className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl pl-8 pr-4 py-2.5 text-sm font-serif font-bold text-stone-900 focus:outline-none focus:border-stone-850"
                    />
                  </div>
                </div>

                <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-3 text-xs text-amber-900 flex items-center justify-between">
                  <span>Selected Payment Amount:</span>
                  <span className="font-bold font-serif text-base">₹{payAmount.toLocaleString('en-IN')}</span>
                </div>

                <button
                  onClick={() => setPaymentStep('PAYMENT_METHOD')}
                  disabled={payAmount <= 0}
                  className="w-full py-3 bg-[#1C1917] hover:bg-stone-800 disabled:bg-stone-300 text-amber-300 hover:text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Proceed to Payment Options</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2: CHOOSE PAYMENT METHOD */}
            {paymentStep === 'PAYMENT_METHOD' && (
              <div className="space-y-5">
                {/* Method Tabs */}
                <div className="grid grid-cols-4 gap-2 border-b border-stone-100 pb-3">
                  {[
                    { id: 'UPI', label: 'UPI / QR', icon: Smartphone },
                    { id: 'CARD', label: 'Card', icon: CreditCard },
                    { id: 'NET_BANKING', label: 'NetBank', icon: Building2 },
                    { id: 'EMI', label: 'EMI / Later', icon: Tag }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setSelectedMethod(tab.id as any)}
                        className={`py-2 px-1 rounded-xl text-[11px] font-serif font-semibold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                          selectedMethod === tab.id
                            ? 'bg-[#1C1917] text-amber-300 shadow-xs'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* UPI / QR View */}
                {selectedMethod === 'UPI' && (
                  <div className="space-y-4">
                    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex flex-col items-center text-center">
                      <div className="w-32 h-32 bg-white p-2 border-2 border-stone-900 rounded-xl flex items-center justify-center shadow-xs mb-2">
                        {/* Interactive Simulated QR */}
                        <div className="w-full h-full border-4 border-dashed border-stone-800 rounded flex flex-col items-center justify-center p-1 bg-amber-50/30">
                          <QrCode className="w-16 h-16 text-stone-900" />
                          <span className="text-[8px] font-mono text-stone-600 mt-1">₹{payAmount.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-stone-600 font-semibold">
                        Scan with Google Pay, PhonePe, Paytm, or BHIM
                      </p>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-stone-400 font-serif font-bold block mb-1">
                        Or Enter UPI ID / VPA
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="e.g. mobile@upi or name@okaxis"
                        className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-2.5 text-xs font-mono text-stone-900 focus:outline-none focus:border-stone-850"
                      />
                    </div>
                  </div>
                )}

                {/* Card View */}
                {selectedMethod === 'CARD' && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-stone-400 font-serif font-bold block mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-2.5 text-xs font-mono text-stone-900 focus:outline-none focus:border-stone-850"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-stone-400 font-serif font-bold block mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-2.5 text-xs font-mono text-stone-900 focus:outline-none focus:border-stone-850"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-stone-400 font-serif font-bold block mb-1">
                          CVV
                        </label>
                        <input
                          type="password"
                          value={cardCvv}
                          maxLength={4}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-2.5 text-xs font-mono text-stone-900 focus:outline-none focus:border-stone-850"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-stone-400 font-serif font-bold block mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-2.5 text-xs uppercase text-stone-900 focus:outline-none focus:border-stone-850"
                      />
                    </div>
                  </div>
                )}

                {/* Net Banking */}
                {selectedMethod === 'NET_BANKING' && (
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-wider text-stone-400 font-serif font-bold block">
                      Select Your Bank
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'State Bank of India',
                        'HDFC Bank',
                        'ICICI Bank',
                        'Axis Bank',
                        'Kotak Mahindra Bank',
                        'Punjab National Bank'
                      ].map((bank) => (
                        <button
                          key={bank}
                          type="button"
                          onClick={() => setSelectedBank(bank)}
                          className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                            selectedBank === bank
                              ? 'bg-amber-50 border-amber-800 text-amber-950 font-bold'
                              : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                          }`}
                        >
                          {bank}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* EMI */}
                {selectedMethod === 'EMI' && (
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-wider text-stone-400 font-serif font-bold block">
                      No-Cost Easy Monthly Installments (EMI)
                    </label>
                    <div className="space-y-2">
                      {[
                        { id: '3_MONTHS', tenure: '3 Months Plan', perMonth: Math.round(payAmount / 3), note: '0% Interest • ₹0 Processing fee' },
                        { id: '6_MONTHS', tenure: '6 Months Plan', perMonth: Math.round(payAmount / 6), note: 'No Cost EMI via Study Nest Partner Banks' }
                      ].map((plan) => (
                        <button
                          key={plan.id}
                          type="button"
                          onClick={() => setSelectedEmiPlan(plan.id)}
                          className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex justify-between items-center ${
                            selectedEmiPlan === plan.id
                              ? 'bg-amber-50 border-amber-800 text-amber-950 font-bold'
                              : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold">{plan.tenure}</div>
                            <div className="text-[10px] text-stone-400 font-sans">{plan.note}</div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-serif font-bold">₹{plan.perMonth.toLocaleString('en-IN')}/mo</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setPaymentStep('SELECT_AMOUNT')}
                    className="px-4 py-3 border border-stone-300 hover:bg-stone-100 text-stone-700 rounded-xl text-xs font-serif font-semibold cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleProcessPayment}
                    className="flex-1 py-3 bg-[#1C1917] hover:bg-stone-800 text-amber-300 hover:text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Authorize & Pay ₹{payAmount.toLocaleString('en-IN')}</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PROCESSING STATE */}
            {paymentStep === 'PROCESSING' && (
              <div className="py-10 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-14 h-14 rounded-full border-4 border-amber-200 border-t-amber-800 animate-spin" />
                <div>
                  <h4 className="font-serif font-bold text-base text-stone-900">Processing Secure Transaction</h4>
                  <p className="text-xs text-stone-500 mt-1">{processingStatusText}</p>
                </div>
                <div className="bg-stone-50 px-3 py-1.5 rounded-full border border-stone-200 text-[10px] text-stone-400 font-mono">
                  Please do not refresh or close this window
                </div>
              </div>
            )}

            {/* STEP 4: PAYMENT SUCCESS */}
            {paymentStep === 'SUCCESS' && latestCompletedTxn && (
              <div className="space-y-5 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 font-serif">
                    Payment Successful
                  </span>
                  <h3 className="text-2xl font-bold font-serif text-stone-900 mt-1">
                    ₹{latestCompletedTxn.amount.toLocaleString('en-IN')} Received
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Your fee balance and tax invoice have been updated immediately.
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-xs space-y-2 text-left font-sans">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Transaction ID:</span>
                    <span className="font-mono font-bold text-stone-800">{latestCompletedTxn.txnId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Payment Mode:</span>
                    <span className="font-semibold text-stone-800">{latestCompletedTxn.method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Date & Timestamp:</span>
                    <span className="text-stone-800">{latestCompletedTxn.date}</span>
                  </div>
                  <div className="flex justify-between border-t border-stone-200 pt-2 font-serif font-bold">
                    <span>Remaining Balance:</span>
                    <span className="text-amber-900">₹{totalUnpaid.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setIsGatewayOpen(false);
                      setActiveSubTab('receipt');
                    }}
                    className="flex-1 py-3 bg-[#1C1917] hover:bg-stone-800 text-amber-300 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>View Official Receipt</span>
                  </button>
                  <button
                    onClick={() => setIsGatewayOpen(false)}
                    className="px-4 py-3 border border-stone-300 hover:bg-stone-100 text-stone-700 rounded-xl text-xs font-serif font-semibold cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
