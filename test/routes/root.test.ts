import { test, describe, expect } from 'vitest';
import { build } from '../helper';

describe('root', () => {
  test('GET /', async () => {
    const app = await build();

    const res = await app.inject({ url: '/' });

    expect(res.json()).toEqual({
      message: 'Hello World!',
    });
  });
});
