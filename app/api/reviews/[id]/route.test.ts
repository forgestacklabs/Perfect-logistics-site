import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DELETE } from './route';
import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

vi.mock('@/lib/supabase', () => ({
  supabaseAdmin: {
    from: vi.fn(),
  },
}));

const ADMIN_SECRET = 'perfectlogistics123';

describe('DELETE /api/reviews/[id]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 401 if unauthorized', async () => {
    const req = new NextRequest('http://localhost/api/reviews/123');
    const params = Promise.resolve({ id: '123' });

    const response = await DELETE(req, { params });
    const json = await response.json();

    expect(response.status).toBe(401);
    expect(json).toEqual({ error: 'Unauthorized' });
  });

  it('should delete review and return success', async () => {
    const req = new NextRequest('http://localhost/api/reviews/123', {
      headers: {
        'x-admin-secret': ADMIN_SECRET,
      },
    });
    const params = Promise.resolve({ id: '123' });

    const eqMock = vi.fn().mockResolvedValue({ error: null });
    const deleteMock = vi.fn().mockReturnValue({ eq: eqMock });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(supabaseAdmin.from).mockReturnValue({ delete: deleteMock } as any);

    const response = await DELETE(req, { params });
    const json = await response.json();

    expect(supabaseAdmin.from).toHaveBeenCalledWith('reviews');
    expect(deleteMock).toHaveBeenCalled();
    expect(eqMock).toHaveBeenCalledWith('id', '123');
    expect(response.status).toBe(200);
    expect(json).toEqual({ success: true });
  });

  it('should return 500 if supabase returns an error', async () => {
    const req = new NextRequest('http://localhost/api/reviews/123', {
      headers: {
        'x-admin-secret': ADMIN_SECRET,
      },
    });
    const params = Promise.resolve({ id: '123' });
    const mockError = new Error('Database error');

    const eqMock = vi.fn().mockResolvedValue({ error: mockError });
    const deleteMock = vi.fn().mockReturnValue({ eq: eqMock });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(supabaseAdmin.from).mockReturnValue({ delete: deleteMock } as any);

    const response = await DELETE(req, { params });
    const json = await response.json();

    expect(supabaseAdmin.from).toHaveBeenCalledWith('reviews');
    expect(deleteMock).toHaveBeenCalled();
    expect(eqMock).toHaveBeenCalledWith('id', '123');
    expect(response.status).toBe(500);
    expect(json).toEqual({ error: 'Database error' });
  });
});
