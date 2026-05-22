import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { PATCH, DELETE } from './route';

// Mock Next.js Response
vi.mock('next/server', () => {
  return {
    NextResponse: {
      json: vi.fn((body, init) => {
        return {
          body,
          status: init?.status ?? 200,
        };
      }),
    },
    NextRequest: vi.fn(),
  };
});

// Mock Supabase
vi.mock('@/lib/supabase', () => ({
  supabaseAdmin: {
    from: vi.fn(() => ({
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn(() => Promise.resolve({ data: { id: '123', approved: true }, error: null }))
          }))
        }))
      })),
      delete: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ error: null }))
      }))
    })),
  },
}));

describe('Review API [id] Route', () => {
  const mockParams = Promise.resolve({ id: '123' });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('PATCH', () => {
    it('returns 401 when x-admin-secret header is missing', async () => {
      const req = {
        headers: new Headers(),
      } as unknown as NextRequest;

      const response = await PATCH(req, { params: mockParams }) as any;

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Unauthorized' });
    });

    it('returns 401 when x-admin-secret header is invalid', async () => {
      const req = {
        headers: new Headers({
          'x-admin-secret': 'invalid_secret'
        }),
      } as unknown as NextRequest;

      const response = await PATCH(req, { params: mockParams }) as any;

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Unauthorized' });
    });

    it('processes request when x-admin-secret header is valid', async () => {
      const req = {
        headers: new Headers({
          'x-admin-secret': 'perfectlogistics123'
        }),
      } as unknown as NextRequest;

      const response = await PATCH(req, { params: mockParams }) as any;

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ id: '123', approved: true });
    });
  });

  describe('DELETE', () => {
    it('returns 401 when x-admin-secret header is missing', async () => {
      const req = {
        headers: new Headers(),
      } as unknown as NextRequest;

      const response = await DELETE(req, { params: mockParams }) as any;

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Unauthorized' });
    });

    it('returns 401 when x-admin-secret header is invalid', async () => {
      const req = {
        headers: new Headers({
          'x-admin-secret': 'invalid_secret'
        }),
      } as unknown as NextRequest;

      const response = await DELETE(req, { params: mockParams }) as any;

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Unauthorized' });
    });

    it('processes request when x-admin-secret header is valid', async () => {
      const req = {
        headers: new Headers({
          'x-admin-secret': 'perfectlogistics123'
        }),
      } as unknown as NextRequest;

      const response = await DELETE(req, { params: mockParams }) as any;

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ success: true });
    });
  });
});
