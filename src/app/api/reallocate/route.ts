import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fromPhcId = 'phc-c', toPhcId = 'phc-a', medicineId = 'ors-sachets', quantity = 900 } = body;

    // Validation
    if (quantity <= 0) {
      return NextResponse.json({ error: 'Transfer payload must be greater than 0' }, { status: 400 });
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-IN', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const txHash = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    const dispatchManifest = {
      dispatchId: `DISP-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: timeStr,
      fromPhcId,
      fromPhcName: 'PHC C (Ganga Valley)',
      toPhcId,
      toPhcName: 'PHC A (Rampur)',
      medicineId,
      medicineName: medicineId === 'ors-sachets' ? 'ORS Sachets' : 'Enoxaparin Sodium',
      quantity,
      unit: medicineId === 'ors-sachets' ? 'sachets' : 'syringes',
      corridor: 'Green Corridor NH-27',
      distanceKm: 34,
      etaMinutes: 135,
      carrier: 'Electric Logistics Fleet #EV-902',
      temperatureC: 21.4,
      status: 'CONFIRMED',
      txHash,
      recipientProjectedStock: 2140,
      recipientProjectedBufferDays: 18,
      recipientStatus: 'STABLE',
    };

    return NextResponse.json({
      success: true,
      message: 'Inter-facility reallocation order confirmed and committed to registry.',
      dispatch: dispatchManifest,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Malformed request body' }, { status: 400 });
  }
}
