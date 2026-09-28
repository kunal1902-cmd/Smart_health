'use client';

import React from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Database, 
  ExternalLink, 
  ThermometerSnowflake, 
  Truck 
} from 'lucide-react';
import { TransferRecord } from '../types';

interface AuditLedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: TransferRecord[];
}

export const AuditLedgerModal: React.FC<AuditLedgerModalProps> = ({
  isOpen,
  onClose,
  records,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-sans">
      <div className="relative w-full max-w-3xl rounded border border-slate-700 bg-[#090e1a] p-6 text-slate-100 font-sans shadow-xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded border border-slate-700 bg-slate-900 text-sky-400">
              <Database className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  NATIONAL HEALTH RESOURCE DISPATCH REGISTRY
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  MoHFW CONSENSUS NODE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Immutable, tamper-evident audit trail for public health resource reallocations
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

        {/* Ledger stats banner */}
        <div className="my-4 grid grid-cols-3 gap-3 p-3 rounded bg-slate-950 border border-slate-800 text-xs font-mono">
          <div>
            <span className="text-slate-500 text-[10px]">CONSENSUS PROTOCOL</span>
            <p className="text-slate-200 font-bold">Proof-of-Authority (National Nodes)</p>
          </div>
          <div>
            <span className="text-slate-500 text-[10px]">VERIFIED TRANSACTIONS</span>
            <p className="text-sky-300 font-bold">{records.length} Dispatches Logged</p>
          </div>
          <div>
            <span className="text-slate-500 text-[10px]">NETWORK INTEGRITY</span>
            <p className="text-emerald-400 font-bold">100% Cryptographic Lock</p>
          </div>
        </div>

        {/* Ledger Transaction Rows */}
        <div className="max-h-[380px] overflow-y-auto space-y-3 pr-1 font-mono text-xs">
          {records.map((rec) => (
            <div
              key={rec.id}
              className="p-4 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors space-y-2"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <span className="text-sky-400 font-bold">{rec.dispatchId}</span>
                  <span className="text-slate-500">[{rec.timestamp}]</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {rec.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
                <div>
                  <span className="text-slate-500">Resource: </span>
                  <span className="text-white font-bold">{rec.medicineName}</span>
                  <span className="text-sky-300 ml-1 font-bold">({rec.quantity} {rec.unit})</span>
                </div>
                <div>
                  <span className="text-slate-500">Route: </span>
                  <span className="text-emerald-400">{rec.fromPhcName}</span>
                  <span className="text-slate-500 mx-1">{"->"}</span>
                  <span className="text-sky-400">{rec.toPhcName}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <Truck className="w-3 h-3 text-slate-400" />
                  <span>{rec.carrierType} | {rec.distanceKm} km ({rec.etaMinutes}m ETA)</span>
                </div>
                <div className="flex items-center gap-1 text-teal-300">
                  <ThermometerSnowflake className="w-3 h-3 text-teal-400" />
                  <span>Thermal Telemetry: {rec.temperatureC}°C (Conforming)</span>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-800">
                <span className="truncate max-w-[400px]">
                  TxHash: <code className="text-slate-400">{rec.txHash}</code>
                </span>
                <span className="text-sky-400 flex items-center gap-0.5">
                  Verified <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-xs font-mono text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700"
          >
            Close Registry
          </button>
        </div>

      </div>
    </div>
  );
};
