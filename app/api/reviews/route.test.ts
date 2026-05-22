import { GET } from './route';
import { supabase } from '@/lib/supabase';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(),
  },
  supabaseAdmin: {
    from: vi.fn(),
  },
}));

describe('GET /api/reviews', () => {
  it('should return approved reviews successfully', async () => {
    const mockReviews = [
      { id: 1, name: 'Alice', message: 'Great!', approved: true },
      { id: 2, name: 'Bob', message: 'Awesome!', approved: true },
    ];

    const mockOrder = vi.fn().mockResolvedValue({ data: mockReviews, error: null });
    const mockEq = vi.fn().mockReturnValue({ order: mockOrder });
    const mockSelect = vi.fn().mockReturnValue({ eq: mockEq });
    (supabase.from as any).mockReturnValue({ select: mockSelect });

    const response = await GET();
    const data = await response.json();

    expect(supabase.from).toHaveBeenCalledWith('reviews');
    expect(mockSelect).toHaveBeenCalledWith('*');
    expect(mockEq).toHaveBeenCalledWith('approved', true);
    expect(mockOrder).toHaveBeenCalledWith('created_at', { ascending: false });

    expect(response.status).toBe(200);
    expect(data).toEqual(mockReviews);
  });

  it('should return 500 when supabase throws an error', async () => {
    const mockError = { message: 'Database connection failed' };

    const mockOrder = vi.fn().mockResolvedValue({ data: null, error: mockError });
    const mockEq = vi.fn().mockReturnValue({ order: mockOrder });
    const mockSelect = vi.fn().mockReturnValue({ eq: mockEq });
    (supabase.from as any).mockReturnValue({ select: mockSelect });

    const response = await GET();
    const data = await response.json();

    expect(supabase.from).toHaveBeenCalledWith('reviews');

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'Database connection failed' });
  });
});
