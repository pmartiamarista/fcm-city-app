import { getStatus } from './getStatus';

import { RequestStatus, Statuses } from '@/types/types';

describe('getStatus', () => {
  const baseStatus: RequestStatus = { status: 'succeeded' };

  it('should detect empty array', () => {
    const result = getStatus({ ...baseStatus, data: [] });
    expect(result.isEmpty).toBe(true);
  });

  it('should detect non-empty array', () => {
    const result = getStatus({ ...baseStatus, data: ['item'] });
    expect(result.isEmpty).toBe(false);
  });

  it('should detect empty Set', () => {
    const result = getStatus({ ...baseStatus, data: new Set() });
    expect(result.isEmpty).toBe(true);
  });

  it('should detect non-empty Set', () => {
    const result = getStatus({ ...baseStatus, data: new Set(['item']) });
    expect(result.isEmpty).toBe(false);
  });

  it('should detect empty Map', () => {
    const result = getStatus({ ...baseStatus, data: new Map() });
    expect(result.isEmpty).toBe(true);
  });

  it('should detect non-empty Map', () => {
    const result = getStatus({
      ...baseStatus,
      data: new Map([['key', 'value']]),
    });
    expect(result.isEmpty).toBe(false);
  });

  it('should detect null as empty', () => {
    const result = getStatus({ ...baseStatus, data: null });
    expect(result.isEmpty).toBe(true);
  });

  it('should detect undefined as empty', () => {
    const result = getStatus({ ...baseStatus, data: undefined });
    expect(result.isEmpty).toBe(true);
  });

  it('should detect empty object', () => {
    const result = getStatus({ ...baseStatus, data: {} });
    expect(result.isEmpty).toBe(true);
  });

  it('should detect non-empty object', () => {
    const result = getStatus({ ...baseStatus, data: { key: 'value' } });
    expect(result.isEmpty).toBe(false);
  });

  it('should reflect correct status flags', () => {
    const statuses: RequestStatus[] = [
      { status: 'idle' },
      { status: 'loading' },
      { status: 'failed' },
      { status: 'succeeded' },
    ];

    const expected: Partial<Statuses>[] = [
      { isIdle: true },
      { isLoading: true },
      { hasError: true },
      { isLoaded: true },
    ];

    statuses.forEach((s, i) => {
      const result = getStatus({ ...s, data: ['item'] });
      expect(result).toMatchObject(expected[i]);
    });
  });
});
