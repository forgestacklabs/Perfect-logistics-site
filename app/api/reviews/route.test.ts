import { POST } from './route';
import { NextRequest } from 'next/server';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@/lib/supabase', () => ({
  supabase: {},
  supabaseAdmin: {
    from: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: { id: 1 }, error: null }),
  },
}));

describe('POST /api/reviews', () => {
  const missingFieldCases = [
    { name: 'Missing name', payload: { company: 'C', designation: 'D', rating: 5, message: 'M' } },
    { name: 'Missing company', payload: { name: 'N', designation: 'D', rating: 5, message: 'M' } },
    { name: 'Missing designation', payload: { name: 'N', company: 'C', rating: 5, message: 'M' } },
    { name: 'Missing rating', payload: { name: 'N', company: 'C', designation: 'D', message: 'M' } },
    { name: 'Missing message', payload: { name: 'N', company: 'C', designation: 'D', rating: 5 } },
  ];

  for (const { name, payload } of missingFieldCases) {
    it(`should return 400 - ${name}`, async () => {
      const req = new NextRequest('http://localhost/api/reviews', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'Missing fields' });
    });
  }

  it('should return 201 if all fields are present', async () => {
    const payload = {
      name: 'John Doe',
      company: 'Acme Corp',
      designation: 'CEO',
      rating: 5,
      message: 'Great service',
    };

    const req = new NextRequest('http://localhost/api/reviews', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data).toEqual({ id: 1 });
  });
});
