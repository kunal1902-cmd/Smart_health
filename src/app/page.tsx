'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '../components/Header';
import { StatsOverview } from '../components/StatsOverview';
import { TelemetryTicker } from '../components/TelemetryTicker';
import { PHCNetworkGrid } from '../components/PHCNetworkGrid';
import { PredictiveMedicineModule } from '../components/PredictiveMedicineModule';
import { SupplyChainMap } from '../components/SupplyChainMap';
import { TransferModal } from '../components/TransferModal';
import { AuditLedgerModal } from '../components/AuditLedgerModal';
import { PHCDetailModal } from '../components/PHCDetailModal';

import { 
  initialPHCNodes, 
  initialMedicines, 
  initialTelemetryAlerts, 
  initialTransferRecords 
} from '../data/mockData';
import { PHCNode, TelemetryAlert, TransferRecord } from '../types';

export default function Home() {
  const [nodes, setNodes] = useState<PHCNode[]>(initialPHCNodes);
  const [medicines, setMedicines] = useState(initialMedicines);
  const [telemetryAlerts, setTelemetryAlerts] = useState<TelemetryAlert[]>(initialTelemetryAlerts);
  const [transferRecords, setTransferRecords] = useState<TransferRecord[]>(initialTransferRecords);

  const [selectedNodeId, setSelectedNodeId] = useState<string>('phc-a');
  const [selectedMedicineId, setSelectedMedicineId] = useState<string>('ors-sachets');
  const [isRedistributed, setIsRedistributed] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  // Modals state
  const [isTransferModalOpen, setIsTransferModalOpen] = useState<boolean>(false);
  const [isLedgerModalOpen, setIsLedgerModalOpen] = useState<boolean>(false);
  const [detailModalNode, setDetailModalNode] = useState<PHCNode | null>(null);

  const handleSelectNode = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    const found = nodes.find(n => n.id === nodeId) || null;
    setDetailModalNode(found);
  };

  const handleConfirmRedistribution = () => {
    setIsRedistributed(true);

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-IN', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const newAlert: TelemetryAlert = {
      id: `tel-${Date.now()}`,
      timestamp: timeStr,
      phcId: 'phc-a',
      district: 'District 1 (Rampur)',
      severity: 'SUCCESS',
      message: 'INTER-PHC REALLOCATION: +900 ORS Sachets dispatched from donor PHC C (Ganga Valley) via NH-27 green corridor. Facility deficit resolved.',
      metric: 'Buffer Surge',
      delta: '+900 Units Dispatched',
    };
    setTelemetryAlerts(prev => [newAlert, ...prev]);

    const newRecord: TransferRecord = {
      id: `rec-${Date.now()}`,
      dispatchId: 'DISP-9942',
      timestamp: timeStr,
      medicineId: selectedMedicineId,
      medicineName: selectedMedicineId === 'ors-sachets' ? 'ORS Sachets' : 'Enoxaparin Sodium',
      fromPhcId: 'phc-c',
      fromPhcName: 'PHC C (Ganga Valley)',
      toPhcId: 'phc-a',
      toPhcName: 'PHC A (Rampur)',
      quantity: selectedMedicineId === 'ors-sachets' ? 900 : 350,
      unit: selectedMedicineId === 'ors-sachets' ? 'sachets' : 'syringes',
      distanceKm: 34,
      etaMinutes: 135,
      status: 'CONFIRMED',
      temperatureC: selectedMedicineId === 'ors-sachets' ? 21.4 : 4.1,
      txHash: '0x4a9b882e9110d7f12a64c58190be47109283fa71',
      carrierType: 'Autonomous EV Fleet',
    };
    setTransferRecords(prev => [newRecord, ...prev]);

    setNodes(prev => prev.map(n => {
      if (n.id === 'phc-a') {
        return {
          ...n,
          status: 'STABLE',
          medicineStockSummary: {
            ...n.medicineStockSummary,
            criticalDeficits: 0,
            stockValueScore: 92,
          },
          incomingSupply: {
            quantity: 900,
            unit: 'reallocated ORS units',
            expectedEtaHours: 2,
            carrier: 'Electric Logistics Van #EV-902 (from PHC C)',
            status: 'IN_TRANSIT',
            manifestId: 'MNF-P2P-2026-9942',
          },
        };
      }
      if (n.id === 'phc-c') {
        return {
          ...n,
          medicines: {
            ...n.medicines,
            'ors-sachets': {
              ...n.medicines['ors-sachets'],
              currentStock: n.medicines['ors-sachets'].currentStock - 900,
            }
          }
        };
      }
      return n;
    }));
  };

  const handleReset = () => {
    setIsRedistributed(false);
    setNodes(initialPHCNodes);
    setMedicines(initialMedicines);
    setTelemetryAlerts(initialTelemetryAlerts);
    setTransferRecords(initialTransferRecords);
  };

  const handleSimulateSurge = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-IN', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

    setNodes(prev => prev.map(n => {
      if (n.id === 'phc-a') {
        return {
          ...n,
          patientFootfall: {
            ...n.patientFootfall,
            opdToday: n.patientFootfall.opdToday + 45,
            trendPercentage: 28.5,
            isIncreasing: true,
          }
        };
      }
      return n;
    }));

    const surgeAlert: TelemetryAlert = {
      id: `tel-${Date.now()}`,
      timestamp: timeStr,
      phcId: 'phc-a',
      district: 'District 1 (Rampur)',
      severity: 'CRITICAL',
      message: 'SIMULATED OUTBREAK SPIKE: Acute diarrhea admissions elevated +35%. PHC A burn rate accelerated to 215 units/day.',
      metric: 'Surge Factor',
      delta: '+35% Outbreak Spike',
    };
    setTelemetryAlerts(prev => [surgeAlert, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060911] text-slate-100 font-sans">
      
      {/* 1. National Command Center Header */}
      <Header
        onReset={handleReset}
        onSimulateSurge={handleSimulateSurge}
        onOpenLedger={() => setIsLedgerModalOpen(true)}
        isRedistributed={isRedistributed}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      {/* Main Container */}
      <main className="flex-1 px-4 sm:px-6 py-5 max-w-[1600px] w-full mx-auto space-y-5">
        
        {/* Aggregated National Stats Overview */}
        <StatsOverview
          nodes={nodes}
          isRedistributed={isRedistributed}
        />

        {/* Live Telemetry Ticker */}
        <TelemetryTicker alerts={telemetryAlerts} />

        {/* Multi-PHC Network Grid */}
        <PHCNetworkGrid
          nodes={nodes}
          selectedNodeId={selectedNodeId}
          onSelectNode={handleSelectNode}
          isRedistributed={isRedistributed}
        />

        {/* 3. Interactive Predictive Medicine Module (The Core Demo Flow) */}
        <PredictiveMedicineModule
          selectedMedicineId={selectedMedicineId}
          onSelectMedicine={setSelectedMedicineId}
          medicineData={medicines}
          isRedistributed={isRedistributed}
          onOpenTransferModal={() => setIsTransferModalOpen(true)}
          onReset={handleReset}
        />

        {/* Tactical Geographic Supply Corridor Map */}
        <SupplyChainMap
          nodes={nodes}
          isRedistributed={isRedistributed}
          selectedNodeId={selectedNodeId}
          onSelectNode={handleSelectNode}
        />

      </main>

      {/* Footer */}
      <footer className="mt-8 border-t border-slate-800 bg-[#070b16] py-5 px-6 text-xs font-mono text-slate-400">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-[1600px] mx-auto">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-xs"></span>
            <span className="font-semibold text-slate-200">AAROGYA-GRID NATIONAL HEALTH RESOURCE PLATFORM</span>
          </div>
          <div>
            Government of India | Ministry of Health and Family Welfare | National Health Mission (NHM)
          </div>
          <div className="flex items-center space-x-4">
            <a href="/presentation.html" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 font-semibold transition-colors underline">
              Slide Deck (PPT)
            </a>
            <span className="text-slate-600">|</span>
            <Link href="/nodes" className="hover:text-white transition-colors underline">
              PHC Directory
            </Link>
            <span className="text-slate-600">|</span>
            <Link href="/ledger" className="hover:text-white transition-colors underline">
              Audit Ledger
            </Link>
            <span className="text-slate-600">|</span>
            <Link href="/privacy" className="hover:text-white transition-colors underline">
              Privacy Policy
            </Link>
            <span className="text-slate-600">|</span>
            <Link href="/terms" className="hover:text-white transition-colors underline">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        onConfirmRedistribution={handleConfirmRedistribution}
        medicineName={selectedMedicineId === 'ors-sachets' ? 'ORS Sachets' : 'Enoxaparin Sodium'}
        transferQuantity={selectedMedicineId === 'ors-sachets' ? 900 : 350}
        soundEnabled={soundEnabled}
      />

      <AuditLedgerModal
        isOpen={isLedgerModalOpen}
        onClose={() => setIsLedgerModalOpen(false)}
        records={transferRecords}
      />

      <PHCDetailModal
        node={detailModalNode}
        isOpen={Boolean(detailModalNode)}
        onClose={() => setDetailModalNode(null)}
        isRedistributed={isRedistributed}
      />

    </div>
  );
}
