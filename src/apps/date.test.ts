import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { Command } from '../shell/types';
import { date } from './date';

/** Run a command with a stdout that captures printed lines. */
async function capture(cmd: Command, argv: string[]): Promise<string[]> {
  const lines: string[] = [];
  await cmd.run({ stdout: { print: (s) => void lines.push(s) } } as never, argv);
  return lines;
}

// e.g. "Thu Sep 24 10:40:19 AM PDT 2026"
const FORMAT = /^(Mon|Tue|Wed|Thu|Fri|Sat) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{1,2} \d{2}:\d{2}:\d{2} (AM|PM) \S+ \d{4}$/;

test('date: output matches the Linux date format', async () => {
  const [out] = await capture(date, ['date']);
  assert.ok(FORMAT.test(out), `output was: ${out}`);
});

test('date: date fields agree with the system clock', async () => {
  const [out] = await capture(date, ['date']);
  // The command runs in milliseconds, so day/month/year must match the
  // clock right next to it (time itself may tick over a second — not checked).
  const now = new Date();
  const [weekday, month, day, , , , year] = out.split(' ');
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  assert.equal(weekday, DAYS[now.getDay()]);
  assert.equal(month, MONTHS[now.getMonth()]);
  assert.equal(day, String(now.getDate()));
  assert.equal(year, String(now.getFullYear()));
});
