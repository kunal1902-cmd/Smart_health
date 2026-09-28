'use client';

import React, { useState } from 'react';
import { 
  Pill, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  TrendingDown, 
  Calendar, 
  Info,
  Package,
  Route,
  ShieldCheck
} from 'lucide-react';
import { MedicineInventory } from '../types';

interface PredictiveMedicineModuleProps {
  selectedMedicineId: string;
  onSelectMedicine: (id: string) => void;
  medicineData: Record<string, MedicineInventory>;
  isRedistributed: boolean;
  onOpenTransferModal: () => void;
  onReset: () => void;
}

export const PredictiveMedicineModule: React.FC<PredictiveMedicineModuleProps> = ({
  selectedMedicineId,
  onSelectMedicine,
  medicineData,
  isRedistributed,
  onOpenTransferModal,
  onReset,
}) => {
  const [activeTab, setActiveTab] = useState<'ORS' | 'ENOXAPARIN'>(
    selectedMedicineId === 'enoxaparin' ? 'ENOXAPARIN' : 'ORS'
  );

  const currentMedKey = activeTab === 'ORS' ? 'ors-sachets' : 'enoxaparin';
  const med = medicineData[currentMedKey] || medicineData['ors-sachets'];

  const isORS = currentMedKey === 'ors-sachets';

  const stock = isORS 
    ? (isRedistributed ? 2140 : 1240)
    : (isRedistributed ? 670 : 320);

  const dailyConsumption = isORS ? 185 : 48;
  const incomingSupply = isORS ? 500 : 100;
  const predictedDemand = isORS ? 2100 : 560;
  
  const estimatedDays = isORS
    ? (isRedistributed ? 18 : 5)
    : (isRedistributed ? 14 : 4);

  const handleTabChange = (tab: 'ORS' | 'ENOXAPARIN') => {
    setActiveTab(tab);
    onSelectMedicine(tab === 'ORS' ? 'ors-sachets' : 'enoxaparin');
  };

  return (
    <div className="rounded border border-slate-800 bg-[#090e1a] overflow-hidden">
      {/* Module Title Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-[#0b111e] flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded border border-slate-700 bg-slate-900 text-sky-400">
            <Activity className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                INTERFACILITY PREDICTIVE MEDICINE MODULE
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                ACTIVE REQUISITION PROTOCOL
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Target Facility: <span className="text-slate-200 font-semibold">PHC A (District 1 - Rampur)</span> | Algorithmic Demand Forecasting & Inter-PHC Stock Balancing
            </p>
          </div>
        </div>

        {/* Medicine Selector Tabs */}
        <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded border border-slate-800">
          <button
            onClick={() => handleTabChange('ORS')}
            className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors ${
              activeTab === 'ORS'
                ? 'bg-slate-800 text-sky-300 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ORS Sachets
          </button>
          <button
            onClick={() => handleTabChange('ENOXAPARIN')}
            className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors ${
              activeTab === 'ENOXAPARIN'
                ? 'bg-slate-800 text-sky-300 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Enoxaparin Inj.
          </button>
        </div>
      </div>

      {/* Main Core Content Grid */}
      <div className="p-4 sm:p-6 space-y-6">
        
        {/* Top: 5 Required Stat Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          
          {/* 1. Current Stock */}
          <div className="p-3.5 rounded bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-mono uppercase">Current Stock</span>
              <Package className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <div className="mt-2">
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold font-metric text-white">
                  {stock.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">{isORS ? 'sachets' : 'syringes'}</span>
              </div>
              {isRedistributed && (
                <div className="mt-1 text-[10px] text-emerald-400 font-mono flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-xs"></span>
                  +{isORS ? '900' : '350'} Reallocated
                </div>
              )}
            </div>
            <div className="mt-2 text-[10px] text-slate-500 font-mono">
              Batch: {med.batchNumber}
            </div>
          </div>

          {/* 2. Daily Consumption */}
          <div className="p-3.5 rounded bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-mono uppercase">Daily Consumption</span>
              <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
            </div>
            <div className="mt-2">
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold font-metric text-white">
                  {dailyConsumption}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">units/day</span>
              </div>
              <div className="mt-1 text-[10px] text-rose-400 font-mono flex items-center gap-1">
                <ArrowRight className="w-2.5 h-2.5 rotate-45" />
                +24% Burn Acceleration
              </div>
            </div>
            <div className="mt-2 text-[10px] text-slate-500 font-mono">
              7-Day Rolling Mean
            </div>
          </div>

          {/* 3. Incoming Supply */}
          <div className="p-3.5 rounded bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-mono uppercase">Incoming Supply</span>
              <Activity className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="mt-2">
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold font-metric text-white">
                  +{incomingSupply}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">units</span>
              </div>
              <div className="mt-1 text-[10px] text-amber-400 font-mono">
                {isRedistributed ? 'Green Corridor Priority' : 'Delayed (+48h Weather)'}
              </div>
            </div>
            <div className="mt-2 text-[10px] text-slate-500 font-mono truncate">
              Central Depot Route NH-24
            </div>
          </div>

          {/* 4. Predicted Demand */}
          <div className="p-3.5 rounded bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-mono uppercase">Predicted Demand</span>
              <Activity className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <div className="mt-2">
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold font-metric text-white">
                  {predictedDemand.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">units (7d)</span>
              </div>
              <div className="mt-1 text-[10px] text-sky-300 font-mono">
                Surge Coefficient: 1.42
              </div>
            </div>
            <div className="mt-2 text-[10px] text-slate-500 font-mono">
              HMIS Outbreak Forecast
            </div>
          </div>

          {/* 5. Estimated Stockout (The Hero Status) */}
          <div className={`p-3.5 rounded border flex flex-col justify-between col-span-2 sm:col-span-1 transition-colors ${
            isRedistributed
              ? 'bg-[#091510] border-emerald-700'
              : 'bg-[#150a0e] border-rose-700'
          }`}>
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-mono uppercase">Estimated Stockout</span>
              <Calendar className={`w-3.5 h-3.5 ${isRedistributed ? 'text-emerald-400' : 'text-rose-400'}`} />
            </div>
            <div className="mt-2">
              <div className="flex items-baseline space-x-1">
                <span className={`text-3xl font-bold font-metric ${
                  isRedistributed ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {estimatedDays}
                </span>
                <span className="text-sm font-semibold text-slate-300 font-mono">days</span>
              </div>
              <div className="mt-1.5">
                {isRedistributed ? (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-xs"></span>
                    STABLE
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-600">
                    <span className="w-1.5 h-1.5 bg-rose-400 rounded-xs"></span>
                    HIGH RISK
                  </span>
                )}
              </div>
            </div>
            <div className="mt-2 text-[10px] font-mono text-slate-400">
              Safety Threshold: &gt;10 Days
            </div>
          </div>

        </div>

        {/* Middle: Visual Stock Burn-Down & Trajectory Projection */}
        <div className="p-4 sm:p-5 rounded bg-slate-950 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>7-DAY DEPLETION AND BURN-DOWN TRAJECTORY</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  REAL-TIME SIMULATION
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Depletion projection comparing Baseline Deficit against Post-Reallocation Inventory Buffer
              </p>
            </div>

            <div className="flex items-center space-x-4 text-xs font-mono">
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-0.5 bg-rose-500"></span>
                <span className="text-rose-400">Baseline (Zero at Day 5)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-0.5 bg-emerald-400"></span>
                <span className="text-emerald-400">Post-Transfer (Safe Buffer)</span>
              </div>
            </div>
          </div>

          {/* SVG Burn-Down Chart */}
          <div className="relative h-48 w-full">
            <svg viewBox="0 0 700 180" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="gradientRedClean" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="gradientGreenClean" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="50" y1="20" x2="680" y2="20" stroke="#1e293b" strokeDasharray="3 3" />
              <line x1="50" y1="60" x2="680" y2="60" stroke="#1e293b" strokeDasharray="3 3" />
              <line x1="50" y1="100" x2="680" y2="100" stroke="#1e293b" strokeDasharray="3 3" />
              <line x1="50" y1="140" x2="680" y2="140" stroke="#1e293b" />

              {/* Y Axis Labels */}
              <text x="40" y="24" textAnchor="end" fill="#64748b" fontSize="10" fontFamily="monospace">2,500</text>
              <text x="40" y="64" textAnchor="end" fill="#64748b" fontSize="10" fontFamily="monospace">1,800</text>
              <text x="40" y="104" textAnchor="end" fill="#64748b" fontSize="10" fontFamily="monospace">1,000</text>
              <text x="40" y="144" textAnchor="end" fill="#ef4444" fontSize="10" fontFamily="monospace">0 (Stockout)</text>

              {/* Stockout Zone highlight */}
              <rect x="420" y="20" width="260" height="120" fill="#ef4444" fillOpacity="0.03" />
              <text x="550" y="40" textAnchor="middle" fill="#ef4444" fontSize="10" fontFamily="monospace">
                CRITICAL STOCKOUT WINDOW
              </text>

              {/* Red Line (Baseline Deficit) */}
              <path
                d="M 60 85 L 160 97 L 260 110 L 360 125 L 460 140 L 560 140 L 660 140"
                fill="none"
                stroke="#ef4444"
                strokeWidth={isRedistributed ? '1.5' : '2.5'}
                strokeDasharray={isRedistributed ? '3 3' : 'none'}
                opacity={isRedistributed ? 0.35 : 1}
              />
              <path
                d="M 60 85 L 160 97 L 260 110 L 360 125 L 460 140 L 660 140 L 660 140 L 60 140 Z"
                fill="url(#gradientRedClean)"
                opacity={isRedistributed ? 0.1 : 0.5}
              />

              {/* Day 5 Marker */}
              <rect x="456" y="136" width="8" height="8" fill="#ef4444" />
              <text x="460" y="160" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold" fontFamily="monospace">
                Day 5: STOCKOUT
              </text>

              {/* Green Line (Post Redistribution) */}
              {isRedistributed && (
                <>
                  <path
                    d="M 60 36 L 160 48 L 260 62 L 360 76 L 460 92 L 560 108 L 660 124"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                  />
                  <path
                    d="M 60 36 L 160 48 L 260 62 L 360 76 L 460 92 L 560 108 L 660 124 L 660 140 L 60 140 Z"
                    fill="url(#gradientGreenClean)"
                  />
                  {[
                    { cx: 60, cy: 36, val: '2,140' },
                    { cx: 260, cy: 62, val: '1,720' },
                    { cx: 460, cy: 92, val: '1,220' },
                    { cx: 660, cy: 124, val: '640' },
                  ].map((pt, i) => (
                    <g key={i}>
                      <rect x={pt.cx - 3} y={pt.cy - 3} width="6" height="6" fill="#10b981" />
                      <text x={pt.cx} y={pt.cy - 10} textAnchor="middle" fill="#10b981" fontSize="10" fontFamily="monospace" fontWeight="bold">
                        {pt.val}
                      </text>
                    </g>
                  ))}
                </>
              )}

              {/* X Axis Day Labels */}
              <text x="60" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">Day 1 (Current)</text>
              <text x="160" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">Day 2</text>
              <text x="260" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">Day 3</text>
              <text x="360" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">Day 4</text>
              <text x="460" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">Day 5</text>
              <text x="560" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">Day 6</text>
              <text x="660" y="175" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">Day 7</text>
            </svg>
          </div>
        </div>

        {/* Bottom Section: AI Insight Box + Action Execution Button */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* AI Insight Box (Takes 2 cols) */}
          <div className={`lg:col-span-2 rounded p-4 sm:p-5 border transition-colors ${
            isRedistributed
              ? 'bg-[#091510] border-emerald-700'
              : 'bg-[#150a0e] border-rose-700'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Activity className={`w-4 h-4 ${isRedistributed ? 'text-emerald-400' : 'text-rose-400'}`} />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                  PREDICTIVE STOCKOUT SURVEILLANCE // EPIDEMIC VULNERABILITY MODEL (HMIS INTEGRATION)
                </span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                isRedistributed ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-rose-950 text-rose-300 border border-rose-700'
              }`}>
                {isRedistributed ? 'DEFICIT RESOLVED' : 'SURGE CORRELATION DETECTED'}
              </span>
            </div>

            {/* The Prompt Question & Answer */}
            <div className="mt-3.5 space-y-2.5">
              <div className="text-xs font-mono text-sky-300 font-semibold flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-sky-400" />
                <span>QUERY: Will this PHC run out of this medicine soon?</span>
              </div>

              {!isRedistributed ? (
                /* High Risk Warning Readout without em dashes or emojis */
                <div className="space-y-2 text-xs text-slate-300 font-sans leading-relaxed">
                  <p className="font-semibold text-rose-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>WARNING: YES - COMPLETE STOCKOUT IMMINENT WITHIN 5 DAYS (120 HOURS).</span>
                  </p>
                  <p className="text-slate-300">
                    Epidemiological surveillance model correlates an <span className="text-amber-300 font-medium">+18.4% surge in gastro-enteritis footfall</span> due to monsoon water-table disruption in District 1. Burn rate is elevated at <span className="text-white font-mono">185 sachets/day</span> against a reserve of only <span className="text-white font-mono">1,240 sachets</span>.
                  </p>
                  <div className="p-2.5 rounded bg-rose-950/60 border border-rose-800 font-mono text-[11px] text-rose-200 space-y-1">
                    <div>* Vulnerability Factor: Routine central shipment #TR-881 delayed by 48h (Flooding NH-24).</div>
                    <div>* Prescriptive Directive: Immediate auto-redistribution of <strong>900 units</strong> from donor node <strong>PHC C (District 3 - Ganga Valley)</strong> which holds 8,420 units (healthy 76-day buffer).</div>
                  </div>
                </div>
              ) : (
                /* Mitigated Stable Readout without em dashes or emojis */
                <div className="space-y-2 text-xs text-slate-300 font-sans leading-relaxed">
                  <p className="font-semibold text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>RESOLUTION CONFIRMED: STOCKOUT THREAT SAFELY ELIMINATED.</span>
                  </p>
                  <p className="text-slate-300">
                    A payload of <span className="text-emerald-400 font-bold font-mono">900 units</span> has been auto-reallocated from <span className="text-white font-semibold">PHC C (Ganga Valley)</span>. Total on-site + en-route inventory increased to <span className="text-white font-mono">2,140 units</span>.
                  </p>
                  <div className="p-2.5 rounded bg-emerald-950/60 border border-emerald-800 font-mono text-[11px] text-emerald-200 space-y-1">
                    <div>* Projected Reserve Buffer: <strong>18 Days</strong> (Well above 10-day safety margin).</div>
                    <div>* Transit Mode: Electric Logistics Van #EV-902 via green corridor NH-27 (ETA: 2h 15m).</div>
                    <div>* Donor Impact: PHC C retains 7,520 units (68-day buffer remaining, zero compromise).</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Execution Button Card (Takes 1 col) */}
          <div className="rounded p-4 sm:p-5 border border-slate-800 bg-slate-900 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                <Route className="w-3.5 h-3.5 text-sky-400" />
                <span>Inter-Facility Stock Rebalancing</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-2">
                Automated Buffer Reallocation Protocol
              </h4>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Connects PHC A with neighboring surplus node PHC C (District 3) to execute inter-facility supply rebalancing without awaiting central warehouse consignments.
              </p>

              <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 mb-4 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Source Donor:</span>
                  <span className="text-emerald-400 font-semibold">PHC C (District 3)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Transfer Payload:</span>
                  <span className="text-sky-300 font-bold">{isORS ? '+900 ORS' : '+350 Enox'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Transit Distance:</span>
                  <span className="text-slate-300">34 km (Corridor NH-27)</span>
                </div>
              </div>
            </div>

            <div>
              {!isRedistributed ? (
                <button
                  onClick={onOpenTransferModal}
                  className="w-full py-3 px-4 rounded font-mono text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 border border-emerald-500 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Activity className="w-4 h-4 text-white" />
                  <span>Execute Auto-Transfer / Redistribution</span>
                </button>
              ) : (
                <div className="space-y-2">
                  <div className="w-full py-2.5 px-3 rounded font-mono text-xs font-bold text-center bg-emerald-950 text-emerald-300 border border-emerald-600 flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>REDISTRIBUTION DISPATCHED</span>
                  </div>
                  <button
                    onClick={onReset}
                    className="w-full py-2 px-3 rounded font-mono text-xs text-slate-400 hover:text-white bg-slate-950 border border-slate-800 hover:border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Simulation Baseline</span>
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
