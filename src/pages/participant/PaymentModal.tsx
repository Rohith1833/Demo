import React, { useState } from 'react';
import { useHackathon } from '../../context/HackathonContext';
import {
  CreditCard,
  QrCode,
  CheckCircle2,
  X,
  Smartphone,
  ShieldCheck,
  Building2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const { currentParticipant, simulatePayment } = useHackathon();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('arjun@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8291');
  const [isProcessing, setIsProcessing] = useState(false);
  const [txnSuccess, setTxnSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      simulatePayment(currentParticipant.id, paymentMethod.toUpperCase());
      setTxnSuccess(`TXN-NXH-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#0f111a] border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-in zoom-in-95">
        {/* Glow header */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {!txnSuccess ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-indigo-950/80 border border-indigo-500/30 text-indigo-400">
                <CreditCard className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">Event Registration Fee</h3>
                <p className="text-xs text-slate-400">NexHack 2026 • Verified Participant Checkout</p>
              </div>
            </div>

            {/* Fee summary card */}
            <div className="my-5 p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400">Participant</div>
                <div className="text-sm font-semibold text-white">{currentParticipant.name}</div>
                <div className="text-[10px] text-slate-500 font-mono">{currentParticipant.id}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400">Amount Due</div>
                <div className="text-2xl font-extrabold text-emerald-400">₹500.00</div>
                <div className="text-[10px] text-slate-500">Includes 24h food, kit & pass</div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2 mb-5">
              <label className="text-xs font-semibold text-slate-300">Select Simulated Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-medium ${
                    paymentMethod === 'upi'
                      ? 'border-indigo-500 bg-indigo-950/40 text-white shadow-sm'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-indigo-400" />
                  <span>UPI / QR</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-medium ${
                    paymentMethod === 'card'
                      ? 'border-indigo-500 bg-indigo-950/40 text-white shadow-sm'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-purple-400" />
                  <span>Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-medium ${
                    paymentMethod === 'netbanking'
                      ? 'border-indigo-500 bg-indigo-950/40 text-white shadow-sm'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>Net Banking</span>
                </button>
              </div>
            </div>

            {/* Simulated input based on method */}
            {paymentMethod === 'upi' && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 mb-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Scan QR or enter VPA</span>
                  <span className="text-emerald-400 font-mono text-[10px]">Instant Zero-Fee</span>
                </div>
                <div className="flex items-center gap-3">
                  {/* Mock QR box */}
                  <div className="w-20 h-20 bg-white p-1 rounded-lg flex items-center justify-center shrink-0">
                    <QrCode className="w-18 h-18 text-slate-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">UPI ID</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono mt-1"
                    />
                    <div className="text-[10px] text-slate-500 mt-1">Google Pay, PhonePe, Paytm, BHIM</div>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 mb-5">
                <label className="text-[10px] text-slate-400 uppercase font-semibold">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono"
                />
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <input
                    type="text"
                    defaultValue="08 / 28"
                    className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono text-center"
                  />
                  <input
                    type="password"
                    defaultValue="•••"
                    className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono text-center"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-5">
                <label className="text-[10px] text-slate-400 uppercase font-semibold">Select Bank</label>
                <select className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white mt-1">
                  <option>HDFC Bank</option>
                  <option>State Bank of India</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                </select>
              </div>
            )}

            {/* Test disclaimer */}
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-[11px] text-indigo-300 mb-5">
              <ShieldCheck className="w-4 h-4 shrink-0 text-indigo-400" />
              <span>Simulated Prototype Payment: No real cards or bank accounts are debited.</span>
            </div>

            {/* Pay Button */}
            <button
              onClick={handleSimulatePayment}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all hover:scale-102 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Simulated Transaction...</span>
                </>
              ) : (
                <>
                  <span>Simulate Successful Payment (₹500)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        ) : (
          /* Payment Success Screen */
          <div className="text-center py-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-xl font-bold text-white mb-1">Payment Successful!</h3>
            <p className="text-xs text-slate-400 mb-6">
              Your registration for NexHack 2026 is officially confirmed.
            </p>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-2 mb-6">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Transaction ID:</span>
                <span className="font-mono text-emerald-400 font-bold">{txnSuccess}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Amount Paid:</span>
                <span className="text-white font-semibold">₹500.00</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Participant ID:</span>
                <span className="font-mono text-indigo-400 font-bold">{currentParticipant.participantId}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Status:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified & Confirmed
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all"
            >
              Return to Participant Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
