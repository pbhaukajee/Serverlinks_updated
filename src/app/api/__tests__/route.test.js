import { describe, it, expect, vi } from 'vitest';

vi.mock('../checkStatus', () => ({
  default: vi.fn(() =>
    Promise.resolve({
      status: 'up',
      runLevelName: 'MULTIUSER',
      runLevelCode: 5,
      uptimeSeconds: 1234,
      runLevelOrdinal: 5,
    })
  ),
}));

vi.mock('../../../utils/environments', () => ({
  environments: [
    {
      envName: 'Test',
      servers: {
        PC: 'http://fake-url',
      },
    },
  ],
}));

import { GET } from '../serverStatus/route';

describe('GET API route', () => {
  it('returns 200 if everything is ok', async () => {
    const res = await GET();
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data[0].envName).toBe('Test');
    expect(data[0].serverStatus.PC.status).toBe('up');
  });
});
