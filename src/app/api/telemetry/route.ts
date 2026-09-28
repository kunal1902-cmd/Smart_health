import { NextResponse } from 'next/server';
import { initialTelemetryAlerts } from '@/data/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const severity = searchParams.get('severity');

  let alerts = initialTelemetryAlerts;
  if (severity && severity !== 'ALL') {
    alerts = alerts.filter((a) => a.severity === severity.toUpperCase());
  }

  return NextResponse.json({
    success: true,
    count: alerts.length,
    alerts,
    timestamp: new Date().toISOString(),
  });
}
