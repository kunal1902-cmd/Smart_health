'use client';

import React from 'react';
import { 
  MapPin, 
  Truck, 
  Navigation, 
  AlertTriangle,
  Building,
  CheckCircle2
} from 'lucide-react';
import { PHCNode } from '../types';

interface SupplyChainMapProps {
  nodes: PHCNode[];
  isRedistributed: boolean;
  selectedNodeId: string;
  onSelectNode: (id: string) => void;
}

export const SupplyChainMap: React.FC<SupplyChainMapProps> = ({
  nodes,
  isRedistributed,
  selectedNodeId,
  onSelectNode,
}) => {
  return (
    <div className="rounded border border-slate-800 bg-[#090e1a] overflow-hidden">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded border border-slate-700 bg-slate-900 text-sky-400">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              TACTICAL REGIONAL SUPPLY CORRIDOR
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                LIVE GEO-GRID
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Inter-facility routing network and real-time transit telemetry
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-emerald-400 rounded-xs"></span>
            Green Corridor NH-27
          </span>
          <span className="flex items-center gap-1.5 text-rose-400">
            <AlertTriangle className="w-3 h-3" />
            NH-24 Weather Disruption
          </span>
        </div>
      </div>

      {/* SVG Map Canvas */}
      <div className="relative p-4 sm:p-6 bg-[#070b14] overflow-hidden">
        <svg viewBox="0 0 800 320" className="w-full h-64 sm:h-72 select-none overflow-visible">
          <defs>
            <linearGradient id="corridorGreenClean" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>

          {/* Central Medical Depot (Depot Hub) */}
          <g transform="translate(400, 45)">
            <rect x="-16" y="-16" width="32" height="32" rx="3" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
            <rect x="-5" y="-5" width="10" height="10" rx="1" fill="#94a3b8" />
            <text x="0" y="-22" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace" fontWeight="bold">
              CENTRAL MEDICAL DEPOT (CMSD)
            </text>
            <text x="0" y="32" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">
              Regional Drug Warehouse (Varanasi Gateway)
            </text>
          </g>

          {/* Delayed Routine Highway NH-24 (Central -> PHC A) */}
          <path
            d="M 385 50 Q 240 70 140 160"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeDasharray="4 4"
            opacity="0.6"
          />
          {/* Flood alert marker on NH-24 */}
          <g transform="translate(250, 100)">
            <rect x="-55" y="-12" width="110" height="24" rx="2" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
            <text x="0" y="4" textAnchor="middle" fill="#fca5a5" fontSize="9" fontFamily="monospace" fontWeight="bold">
              NH-24 DELAY (48h)
            </text>
          </g>

          {/* Regular Route to PHC B */}
          <path
            d="M 400 62 L 400 215"
            fill="none"
            stroke="#334155"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <text x="410" y="140" fill="#64748b" fontSize="9" fontFamily="monospace">
            Route 11 (6h ETA)
          </text>

          {/* Regular Route to PHC C */}
          <path
            d="M 415 50 Q 560 70 660 160"
            fill="none"
            stroke="#10b981"
            strokeWidth="1.5"
            opacity="0.5"
          />

          {/* CRITICAL PEER-TO-PEER CORRIDOR NH-27 (PHC C -> PHC A) */}
          <path
            d="M 640 180 C 500 280, 300 280, 160 180"
            fill="none"
            stroke={isRedistributed ? 'url(#corridorGreenClean)' : '#334155'}
            strokeWidth={isRedistributed ? '3' : '1.5'}
            strokeDasharray={isRedistributed ? 'none' : '4 4'}
          />

          {/* Distance and corridor label */}
          <g 
            transform="translate(400, 280)"
            className="cursor-pointer"
            onClick={() => onSelectNode('phc-a')}
          >
            <rect 
              x="-110" 
              y="-14" 
              width="220" 
              height="28" 
              rx="2" 
              fill="#060911" 
              stroke={isRedistributed ? '#10b981' : '#1e293b'} 
              strokeWidth="1" 
            />
            <text 
              x="0" 
              y="4" 
              textAnchor="middle" 
              fill={isRedistributed ? '#34d399' : '#64748b'} 
              fontSize="10" 
              fontFamily="monospace" 
              fontWeight="bold"
            >
              {isRedistributed ? 'GREEN CORRIDOR NH-27: 34 KM' : 'STANDBY PEER LINK: 34 KM'}
            </text>
          </g>

          {/* Transit vehicle icon when redistributed */}
          {isRedistributed && (
            <g transform="translate(360, 260)">
              <rect x="-12" y="-12" width="24" height="24" rx="2" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
              <text x="0" y="3" textAnchor="middle" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">
                EV
              </text>
              <text x="0" y="-18" textAnchor="middle" fill="#34d399" fontSize="9" fontFamily="monospace" fontWeight="bold">
                EV-902 (+900 ORS)
              </text>
            </g>
          )}

          {/* Node 1: PHC A (Rampur) */}
          <g 
            transform="translate(140, 170)"
            className="cursor-pointer"
            onClick={() => onSelectNode('phc-a')}
          >
            <circle
              cx="0"
              cy="0"
              r={selectedNodeId === 'phc-a' ? '24' : '20'}
              fill={isRedistributed ? '#064e3b' : '#450a0a'}
              stroke={isRedistributed ? '#10b981' : '#ef4444'}
              strokeWidth="2"
            />
            <circle cx="0" cy="0" r="8" fill={isRedistributed ? '#10b981' : '#ef4444'} />
            <text x="0" y="-32" textAnchor="middle" fill="#ffffff" fontSize="12" fontFamily="monospace" fontWeight="bold">
              PHC A (Rampur)
            </text>
            <text 
              x="0" 
              y="40" 
              textAnchor="middle" 
              fill={isRedistributed ? '#34d399' : '#f87171'} 
              fontSize="10" 
              fontFamily="monospace" 
              fontWeight="bold"
            >
              {isRedistributed ? 'STABLE (18 Days)' : 'DEFICIT (5 Days)'}
            </text>
            <text x="0" y="54" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">
              District 1 | 6 Beds Free
            </text>
          </g>

          {/* Node 2: PHC B (Sitapur) */}
          <g 
            transform="translate(400, 220)"
            className="cursor-pointer"
            onClick={() => onSelectNode('phc-b')}
          >
            <circle
              cx="0"
              cy="0"
              r={selectedNodeId === 'phc-b' ? '24' : '18'}
              fill="#451a03"
              stroke="#f59e0b"
              strokeWidth="2"
            />
            <circle cx="0" cy="0" r="7" fill="#f59e0b" />
            <text x="0" y="-28" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold">
              PHC B (Sitapur)
            </text>
            <text x="0" y="36" textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="monospace">
              ELEVATED WATCH
            </text>
            <text x="0" y="50" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">
              District 2 | 22 Beds Free
            </text>
          </g>

          {/* Node 3: PHC C (Ganga Valley) */}
          <g 
            transform="translate(660, 170)"
            className="cursor-pointer"
            onClick={() => onSelectNode('phc-c')}
          >
            <circle
              cx="0"
              cy="0"
              r={selectedNodeId === 'phc-c' ? '24' : '20'}
              fill="#083344"
              stroke="#0ea5e9"
              strokeWidth="2"
            />
            <circle cx="0" cy="0" r="8" fill="#0ea5e9" />
            <text x="0" y="-32" textAnchor="middle" fill="#ffffff" fontSize="12" fontFamily="monospace" fontWeight="bold">
              PHC C (Ganga Valley)
            </text>
            <text x="0" y="40" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">
              DONOR BUFFER (8,420 Units)
            </text>
            <text x="0" y="54" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">
              District 3 | 38 Beds Free
            </text>
          </g>
        </svg>

        {/* Tactical Map Footer Legend */}
        <div className="mt-2 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-sky-400 rounded-xs"></span>
              <span>Reallocation Source (Donor)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-xs ${isRedistributed ? 'bg-emerald-400' : 'bg-rose-500'}`}></span>
              <span>Target Facility (Recipient)</span>
            </span>
          </div>

          <div className="text-slate-400">
            Coordinates: <span className="text-slate-200">26.8467° N, 80.9462° E</span> | NavIC Constellation Lock
          </div>
        </div>
      </div>
    </div>
  );
};
