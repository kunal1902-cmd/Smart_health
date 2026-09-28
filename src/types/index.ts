export type RiskLevel = 'CRITICAL' | 'ELEVATED' | 'STABLE' | 'OPTIMAL';

export interface MedicineInventory {
  id: string;
  name: string;
  genericName: string;
  category: string;
  dosage: string;
  currentStock: number;
  dailyConsumption: number;
  incomingSupply: number;
  predictedDemand: number;
  estimatedStockoutDays: number;
  status: 'HIGH RISK' | 'STABLE' | 'MODERATE' | 'SURPLUS';
  statusColor: 'red' | 'green' | 'amber' | 'blue';
  unit: string;
  bufferThreshold: number;
  batchNumber: string;
  expiryDate: string;
  temperatureRequirement: string;
  burnRateData: { day: string; baselineStock: number; projectedDemand: number; postTransferStock?: number }[];
}

export interface PHCNode {
  id: string;
  code: string;
  name: string;
  district: string;
  state: string;
  type: 'PHC' | 'CHC' | 'DISTRICT_HOSPITAL';
  coordinates: { lat: number; lng: number };
  status: RiskLevel;
  medicineStockSummary: {
    totalItems: number;
    criticalDeficits: number;
    stockValueScore: number; // 0 - 100
  };
  patientFootfall: {
    opdToday: number;
    ipdToday: number;
    trendPercentage: number;
    isIncreasing: boolean;
  };
  beds: {
    available: number;
    total: number;
    icuAvailable: number;
    icuTotal: number;
    occupancyRate: number;
  };
  staffAttendance: {
    percentage: number;
    present: number;
    total: number;
    doctorsOnDuty: number;
    nursesOnDuty: number;
  };
  incomingSupply: {
    quantity: number;
    unit: string;
    expectedEtaHours: number;
    carrier: string;
    status: 'IN_TRANSIT' | 'DELAYED' | 'DELIVERED' | 'SCHEDULED';
    manifestId: string;
  };
  medicines: Record<string, MedicineInventory>;
  donorCapability: boolean;
  surplusCapacity: number;
}

export interface TelemetryAlert {
  id: string;
  timestamp: string;
  phcId: string;
  district: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO' | 'SUCCESS';
  message: string;
  metric?: string;
  delta?: string;
  acknowledged?: boolean;
}

export interface TransferRecord {
  id: string;
  dispatchId: string;
  timestamp: string;
  medicineId: string;
  medicineName: string;
  fromPhcId: string;
  fromPhcName: string;
  toPhcId: string;
  toPhcName: string;
  quantity: number;
  unit: string;
  distanceKm: number;
  etaMinutes: number;
  status: 'PENDING' | 'IN_TRANSIT' | 'COMPLETED' | 'CONFIRMED';
  temperatureC: number;
  txHash: string;
  carrierType: 'Autonomous EV Fleet' | 'Cold-Chain Van' | 'Medical UAV Drone';
}
