'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Truck,
  Building2,
  Pill,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  Clock,
  Database,
  Users,
  Bed,
  Search,
  Bell,
  ExternalLink,
  X,
  ChevronRight,
  Copy,
  Check
} from 'lucide-react';

// ==========================================
// 1. DATA TYPES & IMMUTABLE RECORDS
// ==========================================

interface PHCNode {
  id: string;
  name: string;
  district: string;
  division: string;
  stock: number;
  dailyBurn: number;
  bedOccupancy: number;
  totalBeds: number;
  coldChainTemp: number;
  dailyFootfall: number;
  icuBeds: number;
  generatorStatus: 'ONLINE (100% FUEL)' | 'STANDBY (GRID ACTIVE)';
  staffOnDuty: number;
  status: 'CRITICAL_DEFICIT' | 'NOMINAL' | 'SURPLUS_HUB';
  coordinates: [number, number];
  criticalSupplies: {
    name: string;
    stock: number;
    threshold: number;
    unit: string;
  }[];
}

interface TransferRecord {
  id: string;
  txHash: string;
  blockHeight: number;
  timestamp: string;
  fromNode: string;
  toNode: string;
  medicine: string;
  quantity: number;
  corridor: string;
  eta: string;
  status: 'DISPATCHED_IN_TRANSIT' | 'CONFIRMED_ON_CHAIN';
  merkleRoot: string;
}

interface TelemetryLog {
  id: number;
  time: string;
  district: string;
  event: string;
  status: 'WARNING' | 'NOMINAL' | 'SYNCED';
}

// ==========================================
// 2. MOCK DATASETS
// ==========================================

const INITIAL_PHC_NODES: PHCNode[] = [
  {
    id: 'phc-a',
    name: 'PHC A (District 1)',
    district: 'Lucknow',
    division: 'Lucknow Rural Division',
    stock: 1240,
    dailyBurn: 185,
    bedOccupancy: 88,
    totalBeds: 120,
    coldChainTemp: 4.2,
    dailyFootfall: 340,
    icuBeds: 12,
    generatorStatus: 'ONLINE (100% FUEL)',
    staffOnDuty: 28,
    status: 'CRITICAL_DEFICIT',
    coordinates: [26.8467, 80.9462],
    criticalSupplies: [
      { name: 'ORS Sachets', stock: 1240, threshold: 2000, unit: 'sachets' },
      { name: 'Enoxaparin (40mg/0.4ml)', stock: 95, threshold: 150, unit: 'pre-filled syringes' },
      { name: 'IV Normal Saline 500ml', stock: 320, threshold: 300, unit: 'bottles' },
      { name: 'Amoxicillin 500mg', stock: 1800, threshold: 1200, unit: 'capsules' }
    ]
  },
  {
    id: 'phc-b',
    name: 'PHC B (District 2)',
    district: 'Varanasi',
    division: 'Varanasi Riverine Sector',
    stock: 5800,
    dailyBurn: 240,
    bedOccupancy: 68,
    totalBeds: 160,
    coldChainTemp: 3.8,
    dailyFootfall: 210,
    icuBeds: 18,
    generatorStatus: 'STANDBY (GRID ACTIVE)',
    staffOnDuty: 34,
    status: 'NOMINAL',
    coordinates: [25.3176, 82.9739],
    criticalSupplies: [
      { name: 'ORS Sachets', stock: 5800, threshold: 2500, unit: 'sachets' },
      { name: 'Enoxaparin (40mg/0.4ml)', stock: 450, threshold: 200, unit: 'pre-filled syringes' },
      { name: 'IV Normal Saline 500ml', stock: 1100, threshold: 500, unit: 'bottles' },
      { name: 'Paracetamol 650mg', stock: 4200, threshold: 1500, unit: 'tablets' }
    ]
  },
  {
    id: 'phc-c',
    name: 'PHC C (District 3)',
    district: 'Kanpur',
    division: 'Kanpur Industrial Hub',
    stock: 14350,
    dailyBurn: 320,
    bedOccupancy: 54,
    totalBeds: 240,
    coldChainTemp: 4.0,
    dailyFootfall: 480,
    icuBeds: 24,
    generatorStatus: 'STANDBY (GRID ACTIVE)',
    staffOnDuty: 52,
    status: 'SURPLUS_HUB',
    coordinates: [26.4499, 80.3319],
    criticalSupplies: [
      { name: 'ORS Sachets', stock: 14350, threshold: 4000, unit: 'sachets' },
      { name: 'Enoxaparin (40mg/0.4ml)', stock: 890, threshold: 300, unit: 'pre-filled syringes' },
      { name: 'IV Normal Saline 500ml', stock: 2900, threshold: 800, unit: 'bottles' },
      { name: 'Rabies Immunoglobulin', stock: 450, threshold: 120, unit: 'vials' }
    ]
  }
];

const INITIAL_TRANSFERS: TransferRecord[] = [
  {
    id: 'tx-01',
    txHash: '0x8f4d9b2a7c5e31908a123df7a6b291c49e2187b5a034f7129c5e89d1b46a3e2a',
    blockHeight: 4892014,
    timestamp: '18:42:15 UTC',
    fromNode: 'PHC C (Kanpur Hub)',
    toNode: 'PHC A (Lucknow)',
    medicine: 'ORS Sachets',
    quantity: 850,
    corridor: 'NH-27 Express Supply Corridor',
    eta: '2.4 Hours',
    status: 'CONFIRMED_ON_CHAIN',
    merkleRoot: '0x3c71a980ff21e8d91039845acbc01a4e5f72810e82c8192305a4d9ef672b11a9'
  },
  {
    id: 'tx-02',
    txHash: '0x3a1b8c2d4e5f60718293a4b5c6d7e8f901a2b3c4d5e6f708192a3b4c5d6e9c4d',
    blockHeight: 4891980,
    timestamp: '17:15:00 UTC',
    fromNode: 'PHC B (Varanasi)',
    toNode: 'Mirzapur Sub-Divisional Hospital',
    medicine: 'Enoxaparin (40mg/0.4ml)',
    quantity: 400,
    corridor: 'SH-5 Riverine Medical Transit',
    eta: 'Delivered',
    status: 'CONFIRMED_ON_CHAIN',
    merkleRoot: '0x99201bcfea432019ffea8291039485acbfe12903847561029384756102938475'
  },
  {
    id: 'tx-03',
    txHash: '0x7e220f8c3a9d5e1b4c6a8f0d2b4e6a8c0e2a4c6e8a0c2e4a6c8e0a2c4e6a1a5f',
    blockHeight: 4891845,
    timestamp: '15:30:22 UTC',
    fromNode: 'Central Depo (Agra)',
    toNode: 'PHC C (Kanpur Hub)',
    medicine: 'Paracetamol 650mg',
    quantity: 5000,
    corridor: 'Agra-Lucknow Expressway',
    eta: 'Delivered',
    status: 'CONFIRMED_ON_CHAIN',
    merkleRoot: '0x1029384756102938475610293847561029384756102938475610293847561029'
  },
  {
    id: 'tx-04',
    txHash: '0x5d992e4a6c8e0a2c4e6a8c0e2a4c6e8a0c2e4a6c8e0a2c4e6a8c0e2a4c6e8b3c',
    blockHeight: 4891612,
    timestamp: '12:05:40 UTC',
    fromNode: 'Bareilly SDH',
    toNode: 'Pilibhit Rural PHC',
    medicine: 'IV Fluids (Normal Saline)',
    quantity: 600,
    corridor: 'NH-730 Medical Feeder',
    eta: 'Delivered',
    status: 'CONFIRMED_ON_CHAIN',
    merkleRoot: '0x8475610293847561029384756102938475610293847561029384756102938475'
  }
];

// ==========================================
// 3. MASTER COMPONENT
// ==========================================

export default function AarogyaGridCommandCenter() {
  // Core Reallocation Simulation State
  const [selectedMedicine, setSelectedMedicine] = useState<string>('ORS Sachets');
  const [isReallocated, setIsReallocated] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  // Modals State
  const [selectedPHC, setSelectedPHC] = useState<PHCNode | null>(null);
  const [selectedTx, setSelectedTx] = useState<TransferRecord | null>(null);

  // Dynamic Metrics Calculation
  const isHighRisk = !isReallocated;
  const currentStock = isReallocated ? 2090 : 1240;
  const burnRate = 185;
  const incomingSupply = isReallocated ? '500 (+850 Transit)' : '500';
  const predictedDemand = 2100;
  const daysRemaining = isReallocated ? 18 : 5;

  // Handlers
  const handleReallocate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsReallocated(true);
    }, 1500);
  };

  const handleReset = () => {
    setIsReallocated(false);
    setIsProcessing(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#eef2f6] text-slate-800 flex flex-col font-sans">
      {/* ---------------------------------------------------- */}
      {/* HEADER: AAROGYA-GRID NATIONAL HEALTH COMMAND CENTER  */}
      {/* ---------------------------------------------------- */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          {/* Logo & Platform Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#00897b] flex items-center justify-center text-white shadow-sm">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-slate-900">
                  AAROGYA-GRID
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-slate-100 text-slate-600 border border-slate-200">
                  Govt of India
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                National Public Health Logistics & Supply Chain Command Center
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search PHC nodes, drug batches, consignment IDs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#00897b] focus:bg-white text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Live Status & Actions (strictly NO profile element beside bell per rule) */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_#10b981]" />
              <span className="hidden sm:inline">CENTRAL GRID ONLINE</span>
              <span className="sm:hidden">ONLINE</span>
            </div>

            <button
              title="Notifications"
              className="p-2 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <button
              onClick={handleReset}
              title="Reset Simulation Demo"
              className="p-2 rounded-md text-slate-500 hover:text-[#00897b] hover:bg-slate-100 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------- */}
      {/* MAIN CONTAINER CONTENT                               */}
      {/* ---------------------------------------------------- */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* 1. CENTRAL TELEMETRY BROADCAST BANNER */}
        <div className="bg-[#111827] text-white rounded-lg p-3.5 border border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500 shadow-[0_0_8px_#10b981] shrink-0" />
            <span className="text-emerald-400 font-bold text-xs tracking-wider shrink-0">
              CENTRAL TELEMETRY FEED:
            </span>
            <span className="text-slate-300 text-xs truncate">
              DISTRICT 01 (LUCKNOW): HIGH BURN DETECTED | DISTRICT 02 (VARANASI): 68% BED OCCUPANCY | DISTRICT 03 (KANPUR): SURPLUS CAPACITY 2,400 UNITS
            </span>
          </div>
          <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[11px] border border-emerald-500/30">
              GRID SYNCHRONIZED
            </span>
            <span className="font-mono text-xs text-slate-400">
              LATENCY: 24ms
            </span>
          </div>
        </div>

        {/* 2. THE FOUR AGGREGATED NATIONAL METRIC CARDS */}
        {/* All 4 cards have identical initial dimensions and scale-up zoom-out hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Total Patient Footfall */}
          <div className="min-h-[180px] h-full flex flex-col justify-between p-5 bg-white rounded-lg shadow-sm border border-slate-200 border-l-4 border-l-[#00897b] transition-all duration-300 ease-out hover:scale-[1.04] hover:shadow-xl hover:z-10 cursor-pointer">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Total Patient Footfall (24h)
              </span>
              <Users className="w-5 h-5 text-[#00897b]" />
            </div>
            <div className="my-auto py-1">
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                14,820
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                  +12.4%
                </span>
                <span className="text-xs text-slate-500">
                  vs 7-day average
                </span>
              </div>
            </div>
            <div className="text-xs text-slate-400">
              Aggregated across 75 active nodes
            </div>
          </div>

          {/* Card 2: National Bed Occupancy */}
          <div className="min-h-[180px] h-full flex flex-col justify-between p-5 bg-white rounded-lg shadow-sm border border-slate-200 border-l-4 border-l-[#0284c7] transition-all duration-300 ease-out hover:scale-[1.04] hover:shadow-xl hover:z-10 cursor-pointer">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                National Bed Occupancy
              </span>
              <Bed className="w-5 h-5 text-[#0284c7]" />
            </div>
            <div className="my-auto py-1">
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                84.2%
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                <div
                  className="bg-[#0284c7] h-2 rounded-full transition-all duration-500"
                  style={{ width: '84.2%' }}
                />
              </div>
            </div>
            <div className="text-xs text-slate-400">
              3,420 of 4,060 allocated beds occupied
            </div>
          </div>

          {/* Card 3: Active Shortage Warnings */}
          <div
            className={`min-h-[180px] h-full flex flex-col justify-between p-5 bg-white rounded-lg shadow-sm border border-slate-200 border-l-4 transition-all duration-300 ease-out hover:scale-[1.04] hover:shadow-xl hover:z-10 cursor-pointer ${
              isHighRisk ? 'border-l-red-500' : 'border-l-emerald-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Active Shortage Warnings
              </span>
              <AlertTriangle
                className={`w-5 h-5 ${isHighRisk ? 'text-red-500' : 'text-emerald-600'}`}
              />
            </div>
            <div className="my-auto py-1">
              <div
                className={`text-3xl font-extrabold tracking-tight ${
                  isHighRisk ? 'text-red-600' : 'text-emerald-600'
                }`}
              >
                {isHighRisk ? '1 CRITICAL' : '0 PENDING'}
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isHighRisk ? 'bg-red-500' : 'bg-emerald-500'
                  }`}
                />
                <span
                  className={`text-xs font-bold ${
                    isHighRisk ? 'text-red-600' : 'text-emerald-600'
                  }`}
                >
                  {isHighRisk ? 'Requires immediate action' : 'System nominal'}
                </span>
              </div>
            </div>
            <div className="text-xs text-slate-400">
              {isHighRisk
                ? 'PHC A (District 1) stockout in 5 days'
                : 'All monitored nodes within safety stock'}
            </div>
          </div>

          {/* Card 4: Active Fleet Reallocations */}
          <div className="min-h-[180px] h-full flex flex-col justify-between p-5 bg-white rounded-lg shadow-sm border border-slate-200 border-l-4 border-l-amber-500 transition-all duration-300 ease-out hover:scale-[1.04] hover:shadow-xl hover:z-10 cursor-pointer">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Active Fleet Reallocations
              </span>
              <Truck className="w-5 h-5 text-amber-500" />
            </div>
            <div className="my-auto py-1">
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {isReallocated ? '5 CONVOYS' : '4 CONVOYS'}
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-xs font-bold text-amber-700">
                  {isReallocated ? 'Dynamic routing live' : 'Scheduled dispatch'}
                </span>
              </div>
            </div>
            <div className="text-xs text-slate-400">
              {isReallocated
                ? 'Convoy #AR-882 en route (850 units)'
                : 'Normal inter-district supply routing'}
            </div>
          </div>
        </div>

        {/* 3. PREDICTIVE MEDICINE SUPPLY ENGINE & STOCKOUT PREVENTION */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Predictive Medicine Supply Engine & Stockout Prevention
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Machine-learning driven burn analysis and peer-to-peer inter-facility buffer leveling
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-1 text-xs font-bold rounded-md ${
                  isHighRisk
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}
              >
                {isHighRisk ? 'ACTION REQUIRED' : 'STABILIZED'}
              </span>
              <button
                onClick={handleReset}
                className="px-3 py-1.5 text-xs font-semibold rounded-md border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Demo</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
            {/* Left: Asset Selection & Telemetry Breakdown */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  MONITORED PHARMACEUTICAL ASSET:
                </span>
                <div className="flex items-center gap-2 mt-2">
                  {['ORS Sachets', 'Enoxaparin (40mg/0.4ml)'].map((med) => (
                    <button
                      key={med}
                      onClick={() => setSelectedMedicine(med)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                        selectedMedicine === med
                          ? 'bg-[#00897b] text-white shadow-sm'
                          : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {med}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4 Telemetry Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <span className="text-[11px] font-semibold text-slate-500">Current Stock</span>
                  <div
                    className={`text-xl font-extrabold mt-0.5 ${
                      isHighRisk ? 'text-red-600' : 'text-emerald-600'
                    }`}
                  >
                    {currentStock.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-400">PHC A Node</span>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <span className="text-[11px] font-semibold text-slate-500">Daily Burn</span>
                  <div className="text-xl font-extrabold text-slate-900 mt-0.5">
                    {burnRate}
                  </div>
                  <span className="text-[10px] text-slate-400">units / 24h</span>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <span className="text-[11px] font-semibold text-slate-500">Incoming Supply</span>
                  <div className="text-xl font-extrabold text-[#00897b] mt-0.5">
                    {incomingSupply}
                  </div>
                  <span className="text-[10px] text-slate-400">scheduled pipeline</span>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <span className="text-[11px] font-semibold text-slate-500">Forecasted Demand</span>
                  <div className="text-xl font-extrabold text-slate-900 mt-0.5">
                    {predictedDemand.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-400">next 14 days</span>
                </div>
              </div>

              {/* Status Banner */}
              <div
                className={`p-4 rounded-lg border flex items-start justify-between gap-3 ${
                  isHighRisk
                    ? 'bg-red-50/70 border-red-200 text-red-900'
                    : 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                }`}
              >
                <div className="flex items-start gap-3">
                  {isHighRisk ? (
                    <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  ) : (
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4
                      className={`text-xs font-bold uppercase tracking-wide ${
                        isHighRisk ? 'text-red-700' : 'text-emerald-700'
                      }`}
                    >
                      {isHighRisk
                        ? 'CRITICAL STOCKOUT WARNING: 5 DAYS REMAINING'
                        : 'STABLE OPERATIONAL RESERVE: 18 DAYS REMAINING'}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {isHighRisk
                        ? 'Demand acceleration will exhaust local inventory prior to district batch delivery. Automated rebalancing is recommended.'
                        : '850 units successfully reallocated from surplus hub PHC C (Kanpur) via convoy #AR-882.'}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 text-[10px] font-extrabold rounded shrink-0 uppercase ${
                    isHighRisk
                      ? 'bg-red-200 text-red-800'
                      : 'bg-emerald-200 text-emerald-800'
                  }`}
                >
                  {isHighRisk ? 'STATUS: HIGH RISK' : 'STATUS: STABLE'}
                </span>
              </div>
            </div>

            {/* Right: Automated Cross-District Reallocation Module */}
            <div className="lg:col-span-5">
              <div className="bg-[#111827] text-white rounded-lg p-5 flex flex-col justify-between h-full shadow-sm">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-5 h-5 text-[#00897b]" />
                    <h3 className="text-base font-bold text-white">
                      Cross-District Auto-Transfer
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    The National Grid has detected 14,350 units at PHC C (Kanpur Hub) with only 320 daily burn. An automated emergency stock balance can be dispatched immediately.
                  </p>

                  <div className="bg-[#1f2937] rounded-md p-3.5 mb-4 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Source Node:</span>
                      <span className="font-bold text-white">PHC C (District 3 - Kanpur)</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Destination Node:</span>
                      <span className="font-bold text-white">PHC A (District 1 - Lucknow)</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Transfer Volume:</span>
                      <span className="font-bold text-[#26a69a]">850 Units (ORS)</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Transit ETA:</span>
                      <span className="font-bold text-white">2.4 Hours (Express Corridor)</span>
                    </div>
                  </div>
                </div>

                {/* THE REALLOCATE BUTTON WITH THE HOVER ZOOM-OUT / SCALE-UP EFFECT */}
                <button
                  disabled={isReallocated || isProcessing}
                  onClick={handleReallocate}
                  className={`w-full py-3 px-4 rounded-md font-extrabold text-xs tracking-wider uppercase transition-all duration-300 ease-out will-change-transform ${
                    isReallocated
                      ? 'bg-emerald-600 text-white cursor-default opacity-90'
                      : isProcessing
                      ? 'bg-[#00897b]/70 text-white cursor-wait'
                      : 'bg-[#00897b] text-white hover:scale-[1.04] hover:shadow-[0_10px_24px_rgba(0,137,123,0.45)] active:scale-[0.98] cursor-pointer'
                  }`}
                >
                  {isProcessing
                    ? 'CALCULATING ROUTE & DISPATCHING...'
                    : isReallocated
                    ? 'TRANSFER DISPATCHED AND VERIFIED'
                    : 'AUTO-REALLOCATE STOCK FROM PHC C'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4. MULTI-PHC PRIMARY HEALTHCARE NETWORK GRID */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Multi-PHC Primary Healthcare Network Grid
              </h3>
              <p className="text-xs text-slate-500">
                Live district telemetry synchronized every 30 seconds across UP East Cluster
              </p>
            </div>
            <span className="text-xs font-medium text-slate-400">
              3 Nodes Monitored
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {INITIAL_PHC_NODES.map((phc) => {
              const isPhcA = phc.id === 'phc-a';
              const dynamicStock = isPhcA ? currentStock : phc.stock;
              const dynamicStatus = isPhcA
                ? isHighRisk
                  ? 'CRITICAL_DEFICIT'
                  : 'NOMINAL'
                : phc.status;

              return (
                <div
                  key={phc.id}
                  className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 flex flex-col justify-between transition-all hover:shadow-md"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{phc.name}</h4>
                        <span className="text-xs text-slate-400">{phc.division}</span>
                      </div>
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                          dynamicStatus === 'CRITICAL_DEFICIT'
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : dynamicStatus === 'SURPLUS_HUB'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {dynamicStatus === 'CRITICAL_DEFICIT'
                          ? 'SHORTAGE ALERT'
                          : dynamicStatus === 'SURPLUS_HUB'
                          ? 'SURPLUS HUB'
                          : 'STABLE'}
                      </span>
                    </div>

                    <div className="space-y-2 py-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Medicine Stock:</span>
                        <span
                          className={`font-bold ${
                            dynamicStatus === 'CRITICAL_DEFICIT'
                              ? 'text-red-600'
                              : 'text-slate-900'
                          }`}
                        >
                          {dynamicStock.toLocaleString()} units
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Daily Footfall:</span>
                        <span className="font-bold text-slate-900">
                          {phc.dailyFootfall} patients/day
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Bed Occupancy:</span>
                        <span className="font-bold text-slate-900">
                          {phc.bedOccupancy}% ({Math.round((phc.bedOccupancy / 100) * phc.totalBeds)} / {phc.totalBeds})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Cold Chain Temp:</span>
                        <span className="font-bold text-emerald-600">
                          {phc.coldChainTemp}°C (Safe Range: 2-8°C)
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPHC(phc)}
                    className="w-full mt-2 py-2 px-3 text-xs font-semibold text-[#00897b] bg-[#00897b]/10 hover:bg-[#00897b]/15 rounded-md flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Inspect Node Telemetry</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. CENTRAL TRANSFER AUDIT STREAM & INTEGRITY LEDGER */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Central Transfer Audit Stream & Integrity Ledger
              </h3>
              <p className="text-xs text-slate-500">
                Cryptographically verifiable, immutable record of inter-facility pharmaceutical reallocations
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
              SHA-256 STATE ROOT VALIDATED
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-bold uppercase tracking-wider">
                  <th className="py-2.5 px-3">TIMESTAMP</th>
                  <th className="py-2.5 px-3">TRANSACTION HASH</th>
                  <th className="py-2.5 px-3">DISPATCH ROUTE</th>
                  <th className="py-2.5 px-3">ASSET</th>
                  <th className="py-2.5 px-3">QUANTITY</th>
                  <th className="py-2.5 px-3">STATUS</th>
                  <th className="py-2.5 px-3 text-right">VERIFICATION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {INITIAL_TRANSFERS.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-mono text-slate-500 whitespace-nowrap">
                      {tx.timestamp}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5 font-mono text-slate-700">
                        <span>{tx.txHash.slice(0, 10)}...{tx.txHash.slice(-8)}</span>
                        <button
                          onClick={() => copyToClipboard(tx.txHash)}
                          title="Copy Full SHA-256 Hash"
                          className="text-slate-400 hover:text-slate-700 p-0.5"
                        >
                          {copiedHash === tx.txHash ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-800">
                      {tx.fromNode} → {tx.toNode}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-700">
                      {tx.medicine}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900">
                      {tx.quantity.toLocaleString()} units
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {tx.status === 'CONFIRMED_ON_CHAIN' ? 'CONFIRMED' : 'DISPATCHED'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedTx(tx)}
                        className="text-xs font-semibold text-[#00897b] hover:text-[#00796b] underline inline-flex items-center gap-1"
                      >
                        <span>Inspect Receipt</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* ---------------------------------------------------- */}
      {/* FOOTER: LEGAL & STATUTORY DPDP / INFRASTRUCTURE      */}
      {/* ---------------------------------------------------- */}
      <footer className="bg-white border-t border-slate-200 mt-10 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Aarogya-Grid National Healthcare Grid System - Official MoHFW Digital Public Infrastructure
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-slate-600 hover:text-[#00897b] transition-colors underline font-medium"
            >
              DPDP Act 2023 Compliant
            </Link>
            <span className="text-slate-300">|</span>
            <Link
              href="/terms"
              className="text-slate-600 hover:text-[#00897b] transition-colors underline font-medium"
            >
              Public Healthcare Infrastructure
            </Link>
          </div>
        </div>
      </footer>

      {/* ==================================================== */}
      {/* EMBEDDED MODAL 1: PHC TELEMETRY DETAILS DIALOG       */}
      {/* ==================================================== */}
      {selectedPHC && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-lg shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-[#00897b]" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {selectedPHC.name} - Telemetry Inspector
                  </h3>
                  <span className="text-xs text-slate-400">
                    {selectedPHC.division} | Node Coordinates: [{selectedPHC.coordinates.join(', ')}]
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedPHC(null)}
                className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-5 text-xs">
              {/* Telemetry Status Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
                  <span className="text-[10px] text-slate-400 block uppercase">Bed Capacity</span>
                  <span className="text-sm font-bold text-slate-800">
                    {Math.round((selectedPHC.bedOccupancy / 100) * selectedPHC.totalBeds)} / {selectedPHC.totalBeds} ({selectedPHC.bedOccupancy}%)
                  </span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
                  <span className="text-[10px] text-slate-400 block uppercase">ICU Ventilator Beds</span>
                  <span className="text-sm font-bold text-slate-800">{selectedPHC.icuBeds} Units Available</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
                  <span className="text-[10px] text-slate-400 block uppercase">Cold Chain Temp</span>
                  <span className="text-sm font-bold text-emerald-600">{selectedPHC.coldChainTemp}°C (Nominal)</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
                  <span className="text-[10px] text-slate-400 block uppercase">Staff On Duty</span>
                  <span className="text-sm font-bold text-slate-800">{selectedPHC.staffOnDuty} Medical Officers</span>
                </div>
              </div>

              {/* Power & Infrastructure Status */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-md space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600">Auxiliary Diesel Generator:</span>
                  <span className="font-bold text-emerald-700">{selectedPHC.generatorStatus}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-600">Tele-Health Satellite Uplink:</span>
                  <span className="font-bold text-emerald-700">ACTIVE (GSAT-11 HEALTHNET)</span>
                </div>
              </div>

              {/* Critical Supplies Inventory Table */}
              <div>
                <h4 className="font-bold text-slate-900 mb-2">Facility Critical Drug Inventory</h4>
                <div className="border border-slate-200 rounded-md overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="py-2 px-3">DRUG ASSET</th>
                        <th className="py-2 px-3">STOCK LEVEL</th>
                        <th className="py-2 px-3">MIN SAFETY THRESHOLD</th>
                        <th className="py-2 px-3 text-right">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedPHC.criticalSupplies.map((item, idx) => {
                        const isUnder = item.stock < item.threshold;
                        return (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            <td className="py-2 px-3 font-medium text-slate-800">{item.name}</td>
                            <td className="py-2 px-3 font-bold text-slate-900">{item.stock.toLocaleString()} {item.unit}</td>
                            <td className="py-2 px-3 text-slate-500">{item.threshold.toLocaleString()} {item.unit}</td>
                            <td className="py-2 px-3 text-right">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  isUnder
                                    ? 'bg-red-50 text-red-700 border border-red-200'
                                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                }`}
                              >
                                {isUnder ? 'BELOW BUFFER' : 'SUFFICIENT'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-end bg-slate-50/50">
              <button
                onClick={() => setSelectedPHC(null)}
                className="px-4 py-2 text-xs font-semibold bg-slate-800 text-white rounded-md hover:bg-slate-900 transition-colors"
              >
                Close Telemetry Panel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* EMBEDDED MODAL 2: CRYPTOGRAPHIC AUDIT PROOF DIALOG   */}
      {/* ==================================================== */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-lg shadow-2xl border border-slate-200 max-w-xl w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <Database className="w-5 h-5 text-[#00897b]" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Cryptographic Transfer Audit Receipt
                  </h3>
                  <span className="text-xs text-slate-400">
                    State Block #{selectedTx.blockHeight} | Consensus Verified
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedTx(null)}
                className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 text-xs font-mono">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-md space-y-2">
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-sans">
                    SHA-256 Digest:
                  </span>
                  <span className="text-slate-800 break-all select-all font-bold">
                    {selectedTx.txHash}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-sans">
                    Merkle State Root:
                  </span>
                  <span className="text-slate-600 break-all select-all">
                    {selectedTx.merkleRoot}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 font-sans">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
                  <span className="text-slate-400 text-[10px] block uppercase">From Dispatch Hub:</span>
                  <span className="font-bold text-slate-800">{selectedTx.fromNode}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
                  <span className="text-slate-400 text-[10px] block uppercase">To Destination Facility:</span>
                  <span className="font-bold text-slate-800">{selectedTx.toNode}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
                  <span className="text-slate-400 text-[10px] block uppercase">Reallocated Drug Asset:</span>
                  <span className="font-bold text-[#00897b]">{selectedTx.medicine} ({selectedTx.quantity} units)</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
                  <span className="text-slate-400 text-[10px] block uppercase">Transport Corridor:</span>
                  <span className="font-bold text-slate-800">{selectedTx.corridor}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
              <button
                onClick={() => copyToClipboard(selectedTx.txHash)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 flex items-center gap-1.5"
              >
                {copiedHash === selectedTx.txHash ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Hash Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Hash</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setSelectedTx(null)}
                className="px-4 py-1.5 text-xs font-semibold bg-slate-800 text-white rounded-md hover:bg-slate-900 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
