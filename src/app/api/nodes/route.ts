import { NextResponse } from 'next/server';
import { initialPHCNodes } from '@/data/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nodeId = searchParams.get('id');

  if (nodeId) {
    const node = initialPHCNodes.find((n) => n.id === nodeId);
    if (!node) {
      return NextResponse.json({ error: 'PHC Node not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, node });
  }

  return NextResponse.json({
    success: true,
    totalNodes: initialPHCNodes.length,
    nodes: initialPHCNodes,
    timestamp: new Date().toISOString(),
  });
}
