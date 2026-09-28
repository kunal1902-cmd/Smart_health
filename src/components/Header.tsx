'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Activity, 
  ShieldCheck, 
  Radio, 
  RefreshCw, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  AlertTriangle, 
  Database,
  Satellite,
  FileText
} from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  onSimulateSurge: () => void;
  onOpenLedger: () => void;
  isRedistributed: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onReset,
  onSimulateSurge,
  onOpenLedger,
  isRedistributed,
  soundEnabled,
  onToggleSound,
}) => {
  const [timeString, setTimeString] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-IN', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <header className="border-b border-slate-800 bg-[#080d19] sticky top-0 z-40">
      {/* Top telemetry bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-1.5 border-b border-slate-850 bg-[#050811] text-[11px] font-mono text-slate-400">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 bg-emerald-500 rounded-xs"></span>
            <span className="font-semibold text-emerald-400 tracking-wider">NETWORK UPLINK: NOMINAL</span>
          </div>
          <span className="hidden md:inline text-slate-700">|</span>
          <div className="hidden md:flex items-center space-x-1.5 text-slate-400">
            <Satellite className="w-3 h-3 text-sky-400" />
            <span>SAT-COM NAVIC-04: LOCKED</span>
          </div>
          <span className="hidden lg:inline text-slate-700">|</span>
          <div className="hidden lg:flex items-center space-x-1.5 text-slate-400">
            <Database className="w-3 h-3 text-slate-300" />
            <span>REGISTRY: SHA-256 VALIDATED</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sky-300 font-medium">
            <span className="text-[10px] text-slate-500">SYSTEM TIME:</span>
            <span className="bg-slate-900 border border-slate-700 px-2 py-0.5 rounded-sm text-xs font-metric">
              {timeString || '16:27:26 IST'}
            </span>
          </div>
          <div className="hidden sm:block text-slate-500">
            LATENCY: <span className="text-emerald-400">14ms</span>
          </div>
        </div>
      </div>

      {/* Main command bar */}
      <div className="px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* National Identity */}
        <div className="flex items-center space-x-3.5">
          <div className="flex items-center justify-center w-10 h-10 rounded border border-sky-600/40 bg-slate-900">
            <Activity className="w-5 h-5 text-sky-400" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                AAROGYA-GRID
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-sky-300 font-mono font-medium">
                  v2.4
                </span>
              </h1>
              <span className="hidden xl:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                MoHFW CENTRAL DISPATCH NODE
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Ministry of Health and Family Welfare | Central Medicine Distribution and Buffer Reallocation System
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Statutory and Feature Route Links */}
          <a
            href="/presentation.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 rounded border border-sky-700/80 bg-sky-950/40 text-sky-300 hover:text-white text-xs font-mono font-semibold transition-colors flex items-center gap-1"
          >
            <span>Deck [PPT]</span>
          </a>
          <Link
            href="/nodes"
            className="px-2.5 py-1.5 rounded border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200 text-xs font-mono transition-colors"
          >
            PHC Nodes
          </Link>
          <Link
            href="/ledger"
            className="px-2.5 py-1.5 rounded border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200 text-xs font-mono transition-colors"
          >
            Ledger
          </Link>
          <Link
            href="/privacy"
            className="px-2.5 py-1.5 rounded border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200 text-xs font-mono transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="px-2.5 py-1.5 rounded border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200 text-xs font-mono transition-colors"
          >
            Terms
          </Link>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Disable Telemetry Audio Chime' : 'Enable Telemetry Audio Chime'}
            className={`p-1.5 rounded border text-xs flex items-center transition-all ${
              soundEnabled
                ? 'bg-slate-800 border-slate-700 text-sky-400'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Ledger Audit */}
          <button
            onClick={onOpenLedger}
            className="px-3 py-1.5 rounded border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>Audit Ledger</span>
          </button>

          {/* Outbreak Stress Test */}
          <button
            onClick={onSimulateSurge}
            className="px-3 py-1.5 rounded border border-amber-700/60 bg-amber-950/30 hover:bg-amber-900/40 text-amber-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
            title="Inject simulated spike in daily patient footfall and consumption"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Simulate Outbreak</span>
          </button>

          {/* Reset Demo State */}
          <button
            onClick={onReset}
            disabled={!isRedistributed}
            className={`px-3 py-1.5 rounded border text-xs font-mono flex items-center gap-1.5 transition-colors ${
              isRedistributed
                ? 'border-sky-600/60 bg-sky-950/40 text-sky-200 hover:bg-sky-900/50 cursor-pointer'
                : 'border-slate-800 bg-slate-900/40 text-slate-600 cursor-not-allowed'
            }`}
            title="Reset system state to initial pre-redistribution deficit"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>

          {/* Manual Refresh */}
          <button
            onClick={handleManualRefresh}
            className="p-1.5 rounded border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            title="Synchronize live node telemetry"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-sky-400' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  );
};
