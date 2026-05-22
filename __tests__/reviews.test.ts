import { POST, GET } from '../app/api/reviews/route';
import { NextRequest } from 'next/server';

vi.mock('@/lib/supabase', () => ({
  supabaseAdmin: {
    from: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: { id: 1 }, error: null }),
  },
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    order: vi.fn().mockResolvedValue({ data: [], error: null }),
  }
}));

describe('Reviews API', () => {
  it('should return 400 if fields are missing', async () => {
    const req = new NextRequest('http://localhost/api/reviews', {
      method: 'POST',
      body: JSON.stringify({ name: 'John' }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('should return 201 on success', async () => {
    const req = new NextRequest('http://localhost/api/reviews', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John',
        company: 'Acme',
        designation: 'CEO',
        rating: 5,
        message: 'Great!',
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(201);
  });

  it('should rate limit', async () => {
    for (let i = 0; i < 5; i++) {
        const req = new NextRequest('http://localhost/api/reviews', {
        method: 'POST',
        headers: { 'x-forwarded-for': '1.2.3.4' },
        body: JSON.stringify({
            name: 'John',
            company: 'Acme',
            designation: 'CEO',
            rating: 5,
            message: 'Great!',
        }),
        });
        await POST(req);
    }
    const req = new NextRequest('http://localhost/api/reviews', {
        method: 'POST',
        headers: { 'x-forwarded-for': '1.2.3.4' },
        body: JSON.stringify({
            name: 'John',
            company: 'Acme',
            designation: 'CEO',
            rating: 5,
            message: 'Great!',
        }),
    });
    const res = await POST(req);
    expect(res.status).toBe(429);
  });
});
