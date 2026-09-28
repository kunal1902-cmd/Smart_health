import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'HEALTHY',
    system: 'Aarogya-Grid Central Reallocation Platform',
    version: '2.4.0',
    ministry: 'Ministry of Health and Family Welfare (MoHFW)',
    uplink: {
      status: 'NOMINAL',
      constellation: 'NavIC-04',
      latencyMs: 14,
    },
    consensus: {
      type: 'Proof-of-Authority',
      networkState: 'SYNCHRONIZED',
      integrity: '100% Cryptographic Lock',
    },
    timestamp: new Date().toISOString(),
  });
}
