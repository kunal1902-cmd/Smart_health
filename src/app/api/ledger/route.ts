import { NextResponse } from 'next/server';
import { initialTransferRecords } from '@/data/mockData';

export async function GET() {
  return NextResponse.json({
    success: true,
    totalRecords: initialTransferRecords.length,
    consensus: 'Proof-of-Authority (PoA)',
    records: initialTransferRecords,
    timestamp: new Date().toISOString(),
  });
}
