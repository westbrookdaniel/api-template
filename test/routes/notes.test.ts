import { test, describe, expect } from 'vitest';
import { build } from '../helper';
import { notes } from '../../src/schema';

describe('notes', () => {
  test('GET /notes', async () => {
    const app = await build();

    const res1 = await app.inject({ url: '/notes' });

    expect(res1.json()).toEqual([]);

    await app.db.insert(notes).values({
      title: 'Test',
      description: 'Content',
    });

    const res2 = await app.inject({ url: '/notes' });

    expect(res2.json()).toEqual([
      {
        id: 1,
        title: 'Test',
        description: 'Content',
      },
    ]);
  });
});
