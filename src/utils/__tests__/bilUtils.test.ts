import React from 'react';
import { getTotal } from '../billUtils';

describe('Test Bill Utils', () => {
  test('undefined values return 0', () => {
    const result = getTotal([
      {
        name: 'Alan',
        pending: [],
      },
      {
        name: 'test',
        pending: [],
      },
    ]);

    expect(result).toBe(0);
  });

  test('null values work', () => {
    const result = getTotal([
      {
        name: 'Alan',
        paid: null,
        pending: [],
      },
      {
        name: 'test',
        paid: 10,
        pending: [],
      },
      {
        name: 'test',
        paid: null,
        pending: [],
      },
    ]);

    expect(result).toBe(10);
  });
});
