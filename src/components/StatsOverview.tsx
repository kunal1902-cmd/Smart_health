'use client';

import React from 'react';
import { 
  Users, 
  Bed, 
  AlertTriangle, 
  ThermometerSnowflake, 
  Truck, 
  TrendingUp, 
  CheckCircle2 
} from 'lucide-react';
import { PHCNode } from '../types';

interface StatsOverviewProps {
  nodes: PHCNode[];
  isRedistributed: boolean;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ nodes, isRedistributed }) => {
  const totalOPD = nodes.reduce((sum, n) => sum + n.patientFootfall.opdToday, 0);
  const totalIPD = nodes.reduce((sum, n) => sum + n.patientFootfall.ipdToday, 0);
  const totalPatients = totalOPD + totalIPD;

  const totalBeds = nodes.reduce((sum, n) => sum + n.beds.total, 0);
  const availableBeds = nodes.reduce((sum, n) => sum + n.beds.available, 0);
  const occupiedBeds = totalBeds - availableBeds;
  const occupancyPercentage = ((occupiedBeds / totalBeds) * 100).toFixed(1);

  const totalICUBeds = nodes.reduce((sum, n) => sum + n.beds.icuTotal, 0);
  const availableICUBeds = nodes.reduce((sum, n) => sum + n.beds.icuAvailable, 0);

  const criticalDeficits = isRedistributed ? 1 : 3;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
      {/* Metric 1: Total Patients */}
      <div className="rounded border border-slate-800 bg-[#0b101c] p-4 transition-colors hover:border-slate-700">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Total Patients Monitored</span>
          <div className="p-1.5 rounded border border-slate-700 bg-slate-900 text-sky-400">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline space-x-2">
          <span className="text-2xl font-bold font-metric tracking-tight text-white">
            {totalPatients.toLocaleString()}
          </span>
          <span className="text-xs text-slate-400 font-mono">today</span>
        </div>
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2 font-mono">
          <span className="flex items-center gap-1 text-sky-300">
            <TrendingUp className="w-3 h-3 text-sky-400" />
            +12.8% vs 7d avg
          </span>
          <span>OPD: {totalOPD} | IPD: {totalIPD}</span>
        </div>
      </div>

      {/* Metric 2: Bed Occupancy */}
      <div className="rounded border border-slate-800 bg-[#0b101c] p-4 transition-colors hover:border-slate-700">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Bed Occupancy Rate</span>
          <div className="p-1.5 rounded border border-slate-700 bg-slate-900 text-slate-300">
            <Bed className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline space-x-2">
          <span className="text-2xl font-bold font-metric tracking-tight text-white">
            {occupancyPercentage}%
          </span>
          <span className="text-xs text-slate-400 font-mono">
            ({occupiedBeds}/{totalBeds})
          </span>
        </div>
        <div className="mt-2.5">
          <div className="w-full bg-slate-800 rounded-xs h-1.5 overflow-hidden">
            <div 
              className="bg-sky-500 h-1.5 rounded-xs" 
              style={{ width: `${occupancyPercentage}%` }}
            ></div>
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>Available: {availableBeds} beds</span>
            <span className="text-slate-300">ICU: {availableICUBeds}/{totalICUBeds} Free</span>
          </div>
        </div>
      </div>

      {/* Metric 3: Active Shortage Warnings */}
      <div className={`rounded border p-4 transition-colors ${
        criticalDeficits > 1 
          ? 'border-rose-900/80 bg-[#120b10]' 
          : 'border-emerald-900/80 bg-[#09130e]'
      }`}>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Shortage Warnings</span>
          <div className={`p-1.5 rounded border ${
            criticalDeficits > 1
              ? 'bg-rose-950 border-rose-700 text-rose-400'
              : 'bg-emerald-950 border-emerald-700 text-emerald-400'
          }`}>
            {criticalDeficits > 1 ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
          </div>
        </div>
        <div className="mt-2 flex items-baseline space-x-2">
          <span className={`text-2xl font-bold font-metric tracking-tight ${
            criticalDeficits > 1 ? 'text-rose-400' : 'text-emerald-400'
          }`}>
            {criticalDeficits} {criticalDeficits === 1 ? 'Alert' : 'Critical'}
          </span>
          <span className="text-xs text-slate-400 font-mono">active</span>
        </div>
        <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono border-t border-slate-800 pt-2">
          {criticalDeficits > 1 ? (
            <span className="text-rose-300 flex items-center gap-1.5 text-[11px]">
              <span className="w-2 h-2 bg-rose-500 rounded-xs"></span>
              PHC A: Stockout Imminent
            </span>
          ) : (
            <span className="text-emerald-400 flex items-center gap-1.5 text-[11px]">
              <span className="w-2 h-2 bg-emerald-500 rounded-xs"></span>
              PHC A: Buffer Restored
            </span>
          )}
          <span className="text-slate-500">Auto-Rebalance</span>
        </div>
      </div>

      {/* Metric 4: Cold Chain Integrity */}
      <div className="rounded border border-slate-800 bg-[#0b101c] p-4 transition-colors hover:border-slate-700">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Cold Chain Integrity</span>
          <div className="p-1.5 rounded border border-slate-700 bg-slate-900 text-teal-400">
            <ThermometerSnowflake className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline space-x-2">
          <span className="text-2xl font-bold font-metric tracking-tight text-teal-300">
            99.8%
          </span>
          <span className="text-xs text-emerald-400 font-mono">Nominal</span>
        </div>
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2 font-mono">
          <span className="text-teal-300">Mean Temp: 3.8°C</span>
          <span className="text-slate-500">128 IoT Sensors</span>
        </div>
      </div>

      {/* Metric 5: Active Logistics Convoys */}
      <div className="rounded border border-slate-800 bg-[#0b101c] p-4 transition-colors hover:border-slate-700">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Active Transit Fleets</span>
          <div className="p-1.5 rounded border border-slate-700 bg-slate-900 text-sky-400">
            <Truck className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline space-x-2">
          <span className="text-2xl font-bold font-metric tracking-tight text-white">
            {isRedistributed ? '3 Convoys' : '2 Convoys'}
          </span>
          <span className="text-xs text-sky-400 font-mono">en route</span>
        </div>
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2 font-mono">
          <span className="text-slate-300">
            {isRedistributed ? 'EV Logistics Van #EV-902 Active' : '1 Delayed (Weather)'}
          </span>
          <span className="text-sky-400 font-medium">GPS Tracked</span>
        </div>
      </div>
    </div>
  );
};
