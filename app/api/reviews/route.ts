import { supabase, supabaseAdmin } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

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
  const body = await req.json();
  let { name, company, designation, message } = body;
  const { rating } = body;

  // Type and length validation
  if (
    typeof name !== 'string' || !name.trim() || name.length > 100 ||
    typeof company !== 'string' || !company.trim() || company.length > 100 ||
    typeof designation !== 'string' || !designation.trim() || designation.length > 100 ||
    typeof message !== 'string' || !message.trim() || message.length > 1000 ||
    typeof rating !== 'number' || !Number.isInteger(rating) || rating < 1 || rating > 5
  ) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  // Trim inputs
  name = name.trim();
  company = company.trim();
  designation = designation.trim();
  message = message.trim();

  const { data, error } = await supabaseAdmin
    .from('reviews')
    .insert([{ name, company, designation, rating, message }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}