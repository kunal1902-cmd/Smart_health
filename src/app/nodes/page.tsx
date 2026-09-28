import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Building2, MapPin, Pill, Users, Bed, UserCheck, Truck } from 'lucide-react';
import { initialPHCNodes } from '@/data/mockData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PHC Nodes Directory | Aarogya-Grid National Health Resource Platform',
  description: 'Primary Health Centres (PHC) directory and live facility operational metrics.',
};

export default function NodesPage() {
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
            <span className="text-xs font-mono text-slate-400">NETWORK DIRECTORY</span>
          </div>

          <div className="text-xs font-mono text-sky-400 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-sky-400" />
            <span>3 PHC NODES REGISTERED</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-sky-400">Facility Network</span>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Primary Health Centres Network Dossier
          </h1>
          <p className="mt-2 text-xs font-mono text-slate-400">
            Real-time telemetry and resource capacity across connected district nodes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {initialPHCNodes.map((node) => (
            <div
              key={node.id}
              className="rounded border border-slate-800 bg-[#090e1a] p-5 space-y-4"
            >
              <div className="flex items-start justify-between pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                      {node.code}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-sky-400" />
                      {node.district}
                    </span>
                  </div>
                  <h2 className="mt-1 text-base font-bold text-white tracking-tight">{node.name}</h2>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  node.status === 'CRITICAL'
                    ? 'bg-rose-950 text-rose-300 border border-rose-700'
                    : node.status === 'ELEVATED'
                    ? 'bg-amber-950 text-amber-300 border border-amber-700'
                    : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                }`}>
                  {node.status}
                </span>
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Pill className="w-3.5 h-3.5 text-sky-400" />
                    Medicine Formulary:
                  </span>
                  <span className="text-white font-bold">{node.medicineStockSummary.totalItems} Items ({node.medicineStockSummary.stockValueScore}/100)</span>
                </div>

                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    Patient Footfall:
                  </span>
                  <span className="text-white font-bold">{node.patientFootfall.opdToday + node.patientFootfall.ipdToday} today</span>
                </div>

                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Bed className="w-3.5 h-3.5 text-teal-400" />
                    Bed Capacity:
                  </span>
                  <span className="text-teal-300 font-bold">{node.beds.available} / {node.beds.total} free</span>
                </div>

                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-sky-400" />
                    Duty Attendance:
                  </span>
                  <span className="text-emerald-400 font-bold">{node.staffAttendance.percentage}% ({node.staffAttendance.present}/{node.staffAttendance.total})</span>
                </div>

                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-amber-400" />
                    Supply Status:
                  </span>
                  <span className="text-amber-300 font-bold">{node.incomingSupply.status}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/"
                  className="block w-full py-2 rounded text-center text-xs font-mono text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
                >
                  Inspect in Live Command Grid
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
