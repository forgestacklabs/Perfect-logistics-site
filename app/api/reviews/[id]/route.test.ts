import { DELETE, PATCH } from './route';
import { NextRequest } from 'next/server';

jest.mock('@/lib/supabase', () => ({
  supabaseAdmin: {
    from: jest.fn(() => ({
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: { id: '1' }, error: null }),
    })),
  },
}));

describe('Review API route', () => {
  it('should return 401 for unauthorized PATCH request', async () => {
    const req = new NextRequest('http://localhost:3000/api/reviews/1', {
      method: 'PATCH',
      headers: new Headers({}),
    });
    const params = Promise.resolve({ id: '1' });
    const response = await PATCH(req, { params });
    expect(response.status).toBe(401);
  });

  it('should return 401 for unauthorized DELETE request', async () => {
    const req = new NextRequest('http://localhost:3000/api/reviews/1', {
      method: 'DELETE',
      headers: new Headers({}),
    });
    const params = Promise.resolve({ id: '1' });
    const response = await DELETE(req, { params });
    expect(response.status).toBe(401);
  });
});
