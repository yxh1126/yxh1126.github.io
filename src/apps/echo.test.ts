import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { Command } from '../shell/types';
import { echo } from './echo';

/** Run a command with a stdout that captures printed lines. */
async function capture(cmd: Command, argv: string[]): Promise<string[]> {
  const lines: string[] = [];
  await cmd.run({ stdout: { print: (s: string) => void lines.push(s) } } as never, argv);
  return lines;
}

test('echo: joins arguments with single spaces', async () => {
  assert.deepEqual(await capture(echo, ['echo', 'hello', 'world']), ['hello world']);
});

test('echo: no arguments prints an empty line', async () => {
  assert.deepEqual(await capture(echo, ['echo']), ['']);
});
