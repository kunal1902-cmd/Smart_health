'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  FileText, 
  Activity, 
  Check,
  ThermometerSnowflake,
  Cpu
} from 'lucide-react';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmRedistribution: () => void;
  medicineName: string;
  transferQuantity: number;
  soundEnabled: boolean;
}

export const TransferModal: React.FC<TransferModalProps> = ({
  isOpen,
  onClose,
  onConfirmRedistribution,
  medicineName,
  transferQuantity,
  soundEnabled,
}) => {
  const [step, setStep] = useState<number>(1);
  const [progress, setProgress] = useState<number>(15);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const playChime = () => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
      
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch {
      // AudioContext fallback
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setProgress(15);
      setIsCompleted(false);
      return;
    }

    const t1 = setTimeout(() => {
      setStep(2);
      setProgress(50);
    }, 800);

    const t2 = setTimeout(() => {
      setStep(3);
      setProgress(80);
    }, 1600);

    const t3 = setTimeout(() => {
      setStep(4);
      setProgress(100);
      setIsCompleted(true);
      playChime();
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFinalize = () => {
    onConfirmRedistribution();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-sans">
      <div className="relative w-full max-w-2xl rounded border border-slate-700 bg-[#0a0f1d] p-6 text-slate-100 font-sans shadow-xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded border border-slate-700 bg-slate-900 text-sky-400">
              <Cpu className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  INTER-FACILITY MEDICINE REALLOCATION ORDER
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  DISP-9942
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Statutory Inter-PHC Stock Balancing Protocol | MoHFW Node Rampur-01
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Transfer Metadata Overview */}
        <div className="my-5 p-4 rounded bg-slate-900 border border-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center sm:text-left">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400">Donor Facility</span>
              <p className="text-sm font-bold text-emerald-400 font-mono">PHC C (Ganga Valley)</p>
              <p className="text-[11px] text-slate-400">District 3 | 8,420 units buffer</p>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded bg-slate-950 border border-slate-700 text-sky-300 font-mono text-xs">
                <Truck className="w-3.5 h-3.5 text-sky-400" />
                <span className="font-bold">+{transferQuantity.toLocaleString()} {medicineName}</span>
                <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
              </div>
            </div>
            <div className="sm:text-right">
              <span className="text-[10px] font-mono uppercase text-slate-400">Recipient Facility</span>
              <p className="text-sm font-bold text-sky-400 font-mono">PHC A (Rampur)</p>
              <p className="text-[11px] text-slate-400">District 1 | Deficit Mitigated</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 mb-6">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">VERIFICATION AND DISPATCH STAGES</span>
            <span className="text-sky-400 font-bold">{progress}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-xs overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-xs transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Step-by-Step Execution Stages */}
        <div className="space-y-2.5 font-mono text-xs">
          {/* Stage 1 */}
          <div className={`p-3 rounded border transition-colors ${
            step >= 1 
              ? 'bg-slate-900 border-slate-700 text-slate-200' 
              : 'bg-slate-950 border-slate-850 text-slate-500'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className={`w-5 h-5 rounded-xs flex items-center justify-center text-[10px] font-bold ${
                  step > 1 ? 'bg-emerald-600 text-white' : step === 1 ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {step > 1 ? <Check className="w-3 h-3" /> : '1'}
                </div>
                <span className="font-semibold">Algorithmic Routing Matrix Verification</span>
              </div>
              <span className="text-[11px] text-sky-400">
                {step > 1 ? 'VERIFIED' : 'EVALUATING'}
              </span>
            </div>
            {step >= 1 && (
              <p className="mt-1.5 ml-7 text-[11px] text-slate-400 font-sans">
                Corridor NH-27 analyzed (34 km). Donor buffer impact validated: PHC C retains 68 days of safety reserve.
              </p>
            )}
          </div>

          {/* Stage 2 */}
          <div className={`p-3 rounded border transition-colors ${
            step >= 2 
              ? 'bg-slate-900 border-slate-700 text-slate-200' 
              : 'bg-slate-950 border-slate-850 text-slate-500'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className={`w-5 h-5 rounded-xs flex items-center justify-center text-[10px] font-bold ${
                  step > 2 ? 'bg-emerald-600 text-white' : step === 2 ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {step > 2 ? <Check className="w-3 h-3" /> : '2'}
                </div>
                <span className="font-semibold">Batch Quality and Cold-Chain Integrity Seal</span>
              </div>
              <span className="text-[11px] text-sky-400">
                {step > 2 ? 'SEALED' : step === 2 ? 'IN PROGRESS' : 'QUEUED'}
              </span>
            </div>
            {step >= 2 && (
              <p className="mt-1.5 ml-7 text-[11px] text-slate-400 font-sans">
                Batch #ORS-2026-X88 cryptographically signed. Sensor telemetry confirms storage at nominal ambient temperature.
              </p>
            )}
          </div>

          {/* Stage 3 */}
          <div className={`p-3 rounded border transition-colors ${
            step >= 3 
              ? 'bg-slate-900 border-slate-700 text-slate-200' 
              : 'bg-slate-950 border-slate-850 text-slate-500'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className={`w-5 h-5 rounded-xs flex items-center justify-center text-[10px] font-bold ${
                  step > 3 ? 'bg-emerald-600 text-white' : step === 3 ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {step > 3 ? <Check className="w-3 h-3" /> : '3'}
                </div>
                <span className="font-semibold">Electric Logistics Fleet Dispatch (#EV-902)</span>
              </div>
              <span className="text-[11px] text-sky-400">
                {step > 3 ? 'EN ROUTE' : step === 3 ? 'DISPATCHING' : 'QUEUED'}
              </span>
            </div>
            {step >= 3 && (
              <p className="mt-1.5 ml-7 text-[11px] text-slate-400 font-sans">
                Electric logistics van dispatched from Ganga Valley docking bay. Green corridor clearance authorized by District Transport Officer.
              </p>
            )}
          </div>

          {/* Stage 4 */}
          <div className={`p-3 rounded border transition-colors ${
            step >= 4 
              ? 'bg-emerald-950/40 border-emerald-700 text-emerald-200' 
              : 'bg-slate-950 border-slate-850 text-slate-500'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className={`w-5 h-5 rounded-xs flex items-center justify-center text-[10px] font-bold ${
                  step >= 4 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {step >= 4 ? <Check className="w-3 h-3" /> : '4'}
                </div>
                <span className="font-semibold">National Health Registry Consensus Settlement</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-bold">
                {step >= 4 ? 'CONFIRMED' : 'QUEUED'}
              </span>
            </div>
            {step >= 4 && (
              <p className="mt-1.5 ml-7 text-[11px] text-emerald-300 font-sans">
                Manifest recorded: <code className="text-white font-mono">0x4a9b...7f12</code>. PHC A stockout risk suppressed from HIGH RISK (5 Days) to STABLE (18 Days).
              </p>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-xs font-mono text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
          >
            Cancel
          </button>

          <button
            disabled={!isCompleted}
            onClick={handleFinalize}
            className={`px-5 py-2.5 rounded font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors ${
              isCompleted
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500 cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Commit Redistribution to Grid</span>
          </button>
        </div>

      </div>
    </div>
  );
};
