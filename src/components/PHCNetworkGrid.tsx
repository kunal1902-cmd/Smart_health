'use client';

import React from 'react';
import { 
  Building2, 
  Pill, 
  Users, 
  Bed, 
  UserCheck, 
  Truck, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  ShieldAlert,
  MapPin
} from 'lucide-react';
import { PHCNode } from '../types';

interface PHCNetworkGridProps {
  nodes: PHCNode[];
  selectedNodeId: string;
  onSelectNode: (nodeId: string) => void;
  isRedistributed: boolean;
}

export const PHCNetworkGrid: React.FC<PHCNetworkGridProps> = ({
  nodes,
  selectedNodeId,
  onSelectNode,
  isRedistributed,
}) => {
  return (
    <div className="space-y-3">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded border border-slate-700 bg-slate-900 text-sky-400">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              MULTI-PHC NETWORK GRID
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                DISTRICT NODES: 3
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Live operational telemetry across sub-district Primary Health Centres
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-rose-500 rounded-xs"></span>
            <span>Critical Deficit</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-amber-500 rounded-xs"></span>
            <span>Elevated</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-emerald-500 rounded-xs"></span>
            <span>Surplus / Stable</span>
          </div>
        </div>
      </div>

      {/* Grid of 3 PHC Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {nodes.map((node) => {
          const isSelected = selectedNodeId === node.id;
          
          const isNodeA = node.id === 'phc-a';
          const nodeStatus = isNodeA && isRedistributed ? 'STABLE' : node.status;
          
          const isCritical = nodeStatus === 'CRITICAL';
          const isElevated = nodeStatus === 'ELEVATED';
          const isOptimal = nodeStatus === 'OPTIMAL' || nodeStatus === 'STABLE';

          const cardBorder = isSelected
            ? 'border-sky-500 ring-1 ring-sky-500/50'
            : isCritical
            ? 'border-rose-900/80 hover:border-rose-700'
            : isElevated
            ? 'border-amber-900/70 hover:border-amber-700'
            : 'border-slate-800 hover:border-emerald-800/80';

          const headerBg = isCritical
            ? 'bg-[#140b0f]'
            : isElevated
            ? 'bg-[#141009]'
            : 'bg-[#09140e]';

          return (
            <div
              key={node.id}
              onClick={() => onSelectNode(node.id)}
              className={`rounded border bg-[#090e1a] overflow-hidden transition-colors cursor-pointer flex flex-col justify-between ${cardBorder}`}
            >
              {/* Card Header */}
              <div className={`p-4 border-b border-slate-800 ${headerBg}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                        {node.code}
                      </span>
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-sky-400" />
                        {node.district}
                      </span>
                    </div>
                    <h3 className="mt-1 text-base font-bold text-white tracking-tight flex items-center gap-2">
                      {node.name}
                      {node.donorCapability && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 font-medium">
                          DONOR NODE
                        </span>
                      )}
                    </h3>
                  </div>

                  {/* Status Badge without emojis or pill shapes */}
                  <div>
                    {isCritical && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-bold bg-rose-950 text-rose-300 border border-rose-700">
                        <span className="w-2 h-2 bg-rose-500 rounded-xs"></span>
                        CRITICAL DEFICIT
                      </span>
                    )}
                    {isElevated && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-bold bg-amber-950 text-amber-300 border border-amber-700">
                        <span className="w-2 h-2 bg-amber-500 rounded-xs"></span>
                        ELEVATED WATCH
                      </span>
                    )}
                    {isOptimal && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">
                        <span className="w-2 h-2 bg-emerald-500 rounded-xs"></span>
                        {isNodeA && isRedistributed ? 'STABLE (REBALANCED)' : 'SURPLUS BUFFER'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Body - 5 Mandatory Metrics */}
              <div className="p-4 space-y-3.5 text-xs font-mono">
                
                {/* 1. Medicine Stock */}
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                      <Pill className="w-3.5 h-3.5 text-sky-400" />
                      1. Medicine Stock
                    </span>
                    <span className="text-[11px]">
                      {isNodeA && !isRedistributed ? (
                        <span className="text-rose-400 font-bold">3 Critical Alerts</span>
                      ) : (
                        <span className="text-emerald-400">Inventory Normal</span>
                      )}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between mt-1">
                    <div>
                      <span className="text-lg font-bold font-metric text-white">
                        {isNodeA 
                          ? (isRedistributed ? '2,140' : '1,240') 
                          : node.id === 'phc-b' 
                          ? '4,890' 
                          : '8,420'}
                      </span>
                      <span className="text-slate-400 ml-1 text-[11px]">units (ORS Sachets)</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      isNodeA && !isRedistributed
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}>
                      {isNodeA && !isRedistributed ? '5 Days Left' : isNodeA ? '18 Days Left' : 'Healthy Buffer'}
                    </span>
                  </div>
                </div>

                {/* 2. Patient Footfall */}
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                      <Users className="w-3.5 h-3.5 text-slate-300" />
                      2. Patient Footfall
                    </span>
                    <span className={`flex items-center gap-1 text-[11px] ${
                      node.patientFootfall.isIncreasing ? 'text-rose-400' : 'text-emerald-400'
                    }`}>
                      {node.patientFootfall.isIncreasing ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {node.patientFootfall.trendPercentage > 0 ? '+' : ''}{node.patientFootfall.trendPercentage}%
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-lg font-bold font-metric text-white">
                        {node.patientFootfall.opdToday + node.patientFootfall.ipdToday}
                      </span>
                      <span className="text-slate-400 ml-1 text-[11px]">patients today</span>
                    </div>
                    <span className="text-slate-400 text-[11px]">
                      OPD: <span className="text-slate-200">{node.patientFootfall.opdToday}</span> | IPD: <span className="text-slate-200">{node.patientFootfall.ipdToday}</span>
                    </span>
                  </div>
                </div>

                {/* 3. Beds Available */}
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                      <Bed className="w-3.5 h-3.5 text-teal-400" />
                      3. Beds Available
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Occupancy: <span className={node.beds.occupancyRate > 80 ? 'text-rose-400 font-bold' : 'text-slate-200'}>{node.beds.occupancyRate}%</span>
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className={`text-lg font-bold font-metric ${
                        node.beds.available < 10 ? 'text-rose-400' : 'text-emerald-400'
                      }`}>
                        {node.beds.available}
                      </span>
                      <span className="text-slate-400 ml-1 text-[11px]">/ {node.beds.total} Available</span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      ICU: <span className="text-teal-300 font-semibold">{node.beds.icuAvailable}/{node.beds.icuTotal} Free</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-xs mt-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-xs ${
                        node.beds.occupancyRate > 80 
                          ? 'bg-rose-500' 
                          : node.beds.occupancyRate > 50 
                          ? 'bg-amber-500' 
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${node.beds.occupancyRate}%` }}
                    ></div>
                  </div>
                </div>

                {/* 4. Staff Attendance */}
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                      <UserCheck className="w-3.5 h-3.5 text-sky-400" />
                      4. Staff Attendance
                    </span>
                    <span className="text-emerald-400 font-bold text-[11px]">
                      {node.staffAttendance.percentage}% Present
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-lg font-bold font-metric text-white">
                        {node.staffAttendance.present}
                      </span>
                      <span className="text-slate-400 ml-1 text-[11px]">/ {node.staffAttendance.total} Duty Staff</span>
                    </div>
                    <span className="text-slate-400 text-[11px]">
                      MD: <span className="text-sky-300">{node.staffAttendance.doctorsOnDuty}</span> | RN: <span className="text-slate-300">{node.staffAttendance.nursesOnDuty}</span>
                    </span>
                  </div>
                </div>

                {/* 5. Incoming Supply */}
                <div className={`p-2.5 rounded border ${
                  node.incomingSupply.status === 'DELAYED' && !isRedistributed
                    ? 'bg-rose-950/20 border-rose-800/60'
                    : 'bg-slate-900 border-slate-800'
                }`}>
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                      <Truck className="w-3.5 h-3.5 text-amber-400" />
                      5. Incoming Supply
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      node.incomingSupply.status === 'DELAYED' && !isRedistributed
                        ? 'bg-rose-950 text-rose-300 border border-rose-700'
                        : node.incomingSupply.status === 'DELIVERED'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                        : 'bg-sky-950 text-sky-300 border border-sky-700'
                    }`}>
                      {isNodeA && isRedistributed ? 'DISPATCH ACTIVE' : node.incomingSupply.status}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-lg font-bold font-metric text-white">
                        {isNodeA && isRedistributed ? '+900' : `+${node.incomingSupply.quantity}`}
                      </span>
                      <span className="text-slate-400 ml-1 text-[11px]">
                        {node.incomingSupply.unit}
                      </span>
                    </div>
                    <div className="text-right text-[11px]">
                      {isNodeA && isRedistributed ? (
                        <span className="text-emerald-400 font-bold">ETA: 2h 15m (NH-27)</span>
                      ) : node.incomingSupply.status === 'DELAYED' ? (
                        <span className="text-rose-400 font-bold flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          +48h Bottleneck
                        </span>
                      ) : node.incomingSupply.status === 'DELIVERED' ? (
                        <span className="text-emerald-400">On-Site Buffer</span>
                      ) : (
                        <span className="text-sky-400">ETA: {node.incomingSupply.expectedEtaHours} hrs</span>
                      )}
                    </div>
                  </div>
                  <div className="mt-1 text-[10px] text-slate-400 truncate">
                    Carrier: {isNodeA && isRedistributed ? 'Electric Logistics Van #EV-902 (from PHC C)' : node.incomingSupply.carrier}
                  </div>
                </div>

              </div>

              {/* Card Footer Action */}
              <div className="px-4 py-2.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 font-mono">
                  {isSelected ? '[ACTIVE NODE FOCUS]' : 'Click to inspect node dossier'}
                </span>
                <span className={`text-xs font-mono font-medium flex items-center gap-1 ${
                  isSelected ? 'text-sky-400 font-bold' : 'text-slate-400'
                }`}>
                  {isCritical ? 'Resolve Deficit ->' : 'Facility Dossier ->'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
