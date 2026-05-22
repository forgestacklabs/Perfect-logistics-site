import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from './route';

describe('Admin Reviews API (GET)', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
    process.env.ADMIN_SECRET = 'test-admin-secret';
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test-supabase.com';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-key';
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it('should return 401 Unauthorized if x-admin-secret header is missing', async () => {
    const req = new NextRequest('http://localhost/api/admin/reviews', {
      method: 'GET',
    });

    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(401);
    expect(data).toEqual({ error: 'Unauthorized' });
  });

  it('should return 401 Unauthorized if x-admin-secret header is incorrect', async () => {
    const req = new NextRequest('http://localhost/api/admin/reviews', {
      method: 'GET',
      headers: {
        'x-admin-secret': 'wrong-secret',
      },
    });

    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(401);
    expect(data).toEqual({ error: 'Unauthorized' });
  });

  it('should return reviews data if x-admin-secret header is correct', async () => {
    const mockReviews = [
      { id: 1, content: 'Great service!', rating: 5 },
      { id: 2, content: 'Could be better.', rating: 3 },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockReviews),
    });

    const req = new NextRequest('http://localhost/api/admin/reviews', {
      method: 'GET',
      headers: {
        'x-admin-secret': 'test-admin-secret',
      },
    });

    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual(mockReviews);

    // Verify fetch was called correctly
    expect(global.fetch).toHaveBeenCalledWith(
      'https://test-supabase.com/rest/v1/reviews?order=created_at.desc',
      {
        headers: {
          'apikey': 'test-service-key',
          'Authorization': 'Bearer test-service-key',
        },
      }
    );
  });
});
