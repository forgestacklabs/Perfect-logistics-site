import { supabase, supabaseAdmin } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import rateLimit from '@/lib/ratelimit';

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

// GET — fetch all approved reviews
export async function GET() {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('approved', true)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST — submit a new review
export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';
    await limiter.check(5, ip); // 5 requests per minute
  } catch {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  const body = await req.json();
  const { name, company, designation, rating, message } = body;

  if (!name || !company || !designation || !rating || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('reviews')
    .insert([{ name, company, designation, rating, message }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
