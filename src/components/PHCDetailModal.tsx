'use client';

import React from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  Bed, 
  Users, 
  UserCheck, 
  Truck, 
  Pill, 
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { PHCNode } from '../types';

interface PHCDetailModalProps {
  node: PHCNode | null;
  isOpen: boolean;
  onClose: () => void;
  isRedistributed: boolean;
}

export const PHCDetailModal: React.FC<PHCDetailModalProps> = ({
  node,
  isOpen,
  onClose,
  isRedistributed,
}) => {
  if (!isOpen || !node) return null;

  const isNodeA = node.id === 'phc-a';
  const displayStatus = isNodeA && isRedistributed ? 'STABLE' : node.status;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-sans">
      <div className="relative w-full max-w-2xl rounded border border-slate-700 bg-[#090e1a] p-6 text-slate-100 font-sans shadow-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded border border-slate-700 bg-slate-900 text-sky-400">
              <Building2 className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  {node.name} : FACILITY TELEMETRY DOSSIER
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {node.code}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {node.district}, {node.state} | Lat: {node.coordinates.lat}, Lng: {node.coordinates.lng}
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

        {/* Operational Status Readout */}
        <div className="my-4 p-4 rounded bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400">NODE STATUS</span>
            <div className="mt-1 flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${
                displayStatus === 'CRITICAL'
                  ? 'bg-rose-950 text-rose-300 border border-rose-700'
                  : displayStatus === 'ELEVATED'
                  ? 'bg-amber-950 text-amber-300 border border-amber-700'
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
              }`}>
                {displayStatus === 'CRITICAL' ? 'CRITICAL DEFICIT' : displayStatus === 'ELEVATED' ? 'ELEVATED WATCH' : 'STABLE BUFFER'}
              </span>
              {node.donorCapability && (
                <span className="text-xs font-mono text-sky-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-700">
                  Certified Regional Reallocation Donor
                </span>
              )}
            </div>
          </div>

          <div className="text-right text-xs font-mono">
            <span className="text-slate-500">INVENTORY HEALTH SCORE</span>
            <p className="text-xl font-bold font-metric text-sky-400">
              {isNodeA && isRedistributed ? '92/100' : `${node.medicineStockSummary.stockValueScore}/100`}
            </p>
          </div>
        </div>

        {/* 4 Pillars Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 text-xs font-mono">
          <div className="p-3 rounded bg-slate-950 border border-slate-850">
            <span className="text-slate-500 text-[10px]">PATIENT FOOTFALL</span>
            <p className="text-base font-bold text-white font-metric mt-1">
              {node.patientFootfall.opdToday + node.patientFootfall.ipdToday}
            </p>
            <p className="text-[10px] text-slate-400">OPD: {node.patientFootfall.opdToday} | IPD: {node.patientFootfall.ipdToday}</p>
          </div>

          <div className="p-3 rounded bg-slate-950 border border-slate-850">
            <span className="text-slate-500 text-[10px]">BED CAPACITY</span>
            <p className="text-base font-bold text-teal-400 font-metric mt-1">
              {node.beds.available} / {node.beds.total}
            </p>
            <p className="text-[10px] text-slate-400">ICU: {node.beds.icuAvailable} Free</p>
          </div>

          <div className="p-3 rounded bg-slate-950 border border-slate-850">
            <span className="text-slate-500 text-[10px]">DUTY ATTENDANCE</span>
            <p className="text-base font-bold text-slate-200 font-metric mt-1">
              {node.staffAttendance.percentage}%
            </p>
            <p className="text-[10px] text-slate-400">{node.staffAttendance.doctorsOnDuty} MDs, {node.staffAttendance.nursesOnDuty} RNs</p>
          </div>

          <div className="p-3 rounded bg-slate-950 border border-slate-850">
            <span className="text-slate-500 text-[10px]">INCOMING SUPPLY</span>
            <p className="text-base font-bold text-amber-300 font-metric mt-1">
              +{node.incomingSupply.quantity}
            </p>
            <p className="text-[10px] text-slate-400">{node.incomingSupply.status}</p>
          </div>
        </div>

        {/* Medicines Catalog at this facility */}
        <div className="mt-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 font-mono flex items-center gap-1.5">
            <Pill className="w-3.5 h-3.5 text-sky-400" />
            <span>Essential Medicine Formulary Status</span>
          </h4>
          <div className="rounded border border-slate-800 bg-slate-950 overflow-hidden font-mono text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-900 text-slate-400 text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-2.5">Medicine</th>
                  <th className="p-2.5">Category</th>
                  <th className="p-2.5">Current Stock</th>
                  <th className="p-2.5">Burn Rate</th>
                  <th className="p-2.5">Est. Days</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300 text-[11px]">
                {Object.values(node.medicines).map((m) => {
                  const isORS = m.id === 'ors-sachets';
                  const displayStock = isNodeA && isORS && isRedistributed ? 2140 : m.currentStock;
                  const displayDays = isNodeA && isORS && isRedistributed ? 18 : m.estimatedStockoutDays;
                  const status = isNodeA && isORS && isRedistributed ? 'STABLE' : m.status;

                  return (
                    <tr key={m.id} className="hover:bg-slate-900/60">
                      <td className="p-2.5 font-bold text-white">{m.name}</td>
                      <td className="p-2.5 text-slate-400 truncate max-w-[120px]">{m.category}</td>
                      <td className="p-2.5 font-metric font-semibold">{displayStock.toLocaleString()} {m.unit}</td>
                      <td className="p-2.5 font-metric text-rose-300">{m.dailyConsumption}/day</td>
                      <td className="p-2.5 font-metric font-bold">{displayDays} d</td>
                      <td className="p-2.5">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          status === 'HIGH RISK'
                            ? 'bg-rose-950 text-rose-300 border border-rose-700'
                            : status === 'SURPLUS'
                            ? 'bg-sky-950 text-sky-300 border border-sky-700'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                        }`}>
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-xs font-mono text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700"
          >
            Close Dossier
          </button>
        </div>

      </div>
    </div>
  );
};
