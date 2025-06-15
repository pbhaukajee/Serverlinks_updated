import { describe, it, expect, vi, beforeEach } from 'vitest';
import checkStatus from '../checkStatus';
// import formatStatus from '../../utils/formatStatus';

vi.mock('../../utils/formatStatus', () => ({
  default: (status) => ({ status }),
}));

beforeEach(() => {
  vi.resetAllMocks();
});

describe('checkStatus', () => {
  it('returns "DOWN" if fetch fails', async () => {
    global.fetch = vi.fn(() => {
      throw new Error('network error');
    });

    const result = await checkStatus('http://fake-url');
    expect(result.status).toBe('DOWN');
  });

  it('returns "SERVER NOT AVAILABLE" if response.ok is false', async () => {
    global.fetch = vi.fn(() => Promise.resolve({ ok: false }));

    const result = await checkStatus('http://fake-url');
    expect(result.status).toBe('SERVER NOT AVAILABLE');
  });

  it('returns UP if response text is "2"', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve('2'),
      })
    );
    const result = await checkStatus('http://fake-url');
    expect(result.status).toBe('UP');
  });

  it('returns FAILED TO START if JSON is invalid', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve('not-json'),
      })
    );

    const result = await checkStatus('http://fake-url');
    expect(result.status).toBe('FAILED TO START');
  });
});
