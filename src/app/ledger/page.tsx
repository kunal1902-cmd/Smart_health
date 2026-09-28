import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Database, ShieldCheck, CheckCircle2, Truck, ThermometerSnowflake, ExternalLink } from 'lucide-react';
import { initialTransferRecords } from '@/data/mockData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Audit Ledger | Aarogya-Grid National Health Resource Platform',
  description: 'Immutable, tamper-evident audit trail for public health resource reallocations.',
};

export default function LedgerPage() {
  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex flex-col font-sans">
      <header className="border-b border-slate-800 bg-[#080d19] sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-700 bg-slate-900 text-xs font-mono text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Command Center</span>
            </Link>
            <span className="text-slate-600">|</span>
            <span className="text-xs font-mono text-slate-400">DISPATCH REGISTRY</span>
          </div>

          <div className="text-xs font-mono text-sky-400 flex items-center gap-1.5">
            <Database className="w-4 h-4 text-sky-400" />
            <span>MoHFW CONSENSUS NODE</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-sky-400">Registry Ledger</span>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-white">
            National Health Resource Dispatch Registry
          </h1>
          <p className="mt-2 text-xs font-mono text-slate-400">
            Immutable, tamper-evident audit trail for public health resource reallocations across Primary Health Centres
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 p-4 rounded bg-slate-950 border border-slate-800 text-xs font-mono">
          <div>
            <span className="text-slate-500 text-[10px]">CONSENSUS PROTOCOL</span>
            <p className="text-slate-200 font-bold">Proof-of-Authority (PoA)</p>
          </div>
          <div>
            <span className="text-slate-500 text-[10px]">VERIFIED TRANSACTIONS</span>
            <p className="text-sky-300 font-bold">{initialTransferRecords.length} Dispatches Logged</p>
          </div>
          <div>
            <span className="text-slate-500 text-[10px]">NETWORK INTEGRITY</span>
            <p className="text-emerald-400 font-bold">100% Cryptographic Lock</p>
          </div>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {initialTransferRecords.map((rec) => (
            <div
              key={rec.id}
              className="p-4 rounded bg-slate-900 border border-slate-800 space-y-2"
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
                <span className="truncate max-w-[450px]">
                  TxHash: <code className="text-slate-400">{rec.txHash}</code>
                </span>
                <span className="text-sky-400 flex items-center gap-0.5">
                  Verified <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
