import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const secret = process.env.ADMIN_SECRET;
  const hasHeader = req.headers.get('x-admin-secret') === secret;
  const hasCookie = req.cookies.get('admin_token')?.value === secret;

  if (!secret || (!hasHeader && !hasCookie)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  const res = await fetch(`${url}/rest/v1/reviews?order=created_at.desc`, {
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`,
    }
  });

  const data = await res.json();
  return NextResponse.json(data);
}