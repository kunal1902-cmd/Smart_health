'use client';

import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  AlertTriangle, 
  Pause, 
  Play, 
  Maximize2,
  Minimize2
} from 'lucide-react';
import { TelemetryAlert } from '../types';

interface TelemetryTickerProps {
  alerts: TelemetryAlert[];
}

export const TelemetryTicker: React.FC<TelemetryTickerProps> = ({ alerts }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);

  useEffect(() => {
    if (isPaused || alerts.length === 0) return;
    const timer = setInterval(() => {
      setCurrentAlertIndex((prev) => (prev + 1) % alerts.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, alerts.length]);

  const filteredAlerts = filterSeverity === 'ALL' 
    ? alerts 
    : alerts.filter(a => a.severity === filterSeverity);

  const activeAlert = alerts[currentAlertIndex] || alerts[0];

  const getSeverityBadge = (severity: TelemetryAlert['severity']) => {
    switch (severity) {
      case 'CRITICAL':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-700">
            <span className="w-1.5 h-1.5 bg-rose-500 rounded-xs"></span>
            CRITICAL
          </span>
        );
      case 'WARNING':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-[10px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-700">
            <AlertTriangle className="w-2.5 h-2.5 text-amber-400" />
            WARNING
          </span>
        );
      case 'SUCCESS':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">
            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
            DISPATCH
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-[10px] font-mono font-bold bg-sky-950 text-sky-300 border border-sky-700">
            <Info className="w-2.5 h-2.5 text-sky-400" />
            TELEMETRY
          </span>
        );
    }
  };

  return (
    <div className="rounded border border-slate-800 bg-[#090e1a] overflow-hidden">
      {/* Primary Ticker Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-slate-800">
        <div className="flex items-center space-x-3 overflow-hidden flex-1 mr-2">
          {/* Channel Label */}
          <div className="flex items-center space-x-2 shrink-0 bg-slate-900 border border-slate-700 px-2.5 py-1 rounded text-xs font-mono">
            <Radio className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-semibold text-slate-200">INTER-DISTRICT TELEMETRY STREAM</span>
          </div>

          {/* Active Highlight Alert */}
          {activeAlert && (
            <div className="flex items-center space-x-2.5 text-xs truncate">
              {getSeverityBadge(activeAlert.severity)}
              <span className="font-mono text-sky-300 shrink-0 font-medium">
                [{activeAlert.timestamp}] {activeAlert.district}:
              </span>
              <span className="text-slate-300 truncate font-sans">
                {activeAlert.message}
              </span>
              {activeAlert.delta && (
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-sm text-[10px] font-mono bg-slate-800 text-sky-300 border border-slate-700 shrink-0">
                  {activeAlert.delta}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Ticker Controls */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            {isExpanded ? (
              <>
                <Minimize2 className="w-3 h-3" />
                <span>Collapse</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3 h-3" />
                <span>Log ({alerts.length})</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expanded Log Drawer */}
      {isExpanded && (
        <div className="p-3 bg-[#070b14] border-t border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-slate-400">
              FILTER DISTRICT TELEMETRY
            </span>
            <div className="flex items-center space-x-1">
              {['ALL', 'CRITICAL', 'WARNING', 'SUCCESS', 'INFO'].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setFilterSeverity(sev)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    filterSeverity === sev
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 font-mono text-xs">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start justify-between gap-3 p-2 rounded bg-slate-900/60 hover:bg-slate-900 border border-slate-800 transition-colors"
              >
                <div className="flex items-start space-x-2.5">
                  <span className="text-slate-500 text-[11px] pt-0.5">{alert.timestamp}</span>
                  <div className="pt-0.5">{getSeverityBadge(alert.severity)}</div>
                  <div>
                    <span className="text-sky-400 font-semibold mr-2">{alert.district}</span>
                    <span className="text-slate-300 font-sans text-xs">{alert.message}</span>
                  </div>
                </div>
                {alert.delta && (
                  <span className="text-[11px] text-sky-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700 shrink-0">
                    {alert.delta}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
