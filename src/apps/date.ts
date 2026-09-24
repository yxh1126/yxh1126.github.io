import type { Command } from '../shell/types';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Local timezone abbreviation (e.g. PDT), via Intl. */
function tzAbbr(d: Date): string {
  return (
    new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
      .formatToParts(d)
      .find((p) => p.type === 'timeZoneName')?.value ?? ''
  );
}

export const date: Command = {
  name: 'date',
  description: 'print the current date and time',
  async run(ctx) {
    const d = new Date();
    const hr = d.getHours() % 12 || 12; // 12-hour clock
    const ampm = d.getHours() < 12 ? 'AM' : 'PM';
    const pad = (n: number) => String(n).padStart(2, '0');
    ctx.stdout.print(
      `${DAYS[d.getDay()]} ${MONTHS[d.getMonth()]} ${d.getDate()} ` +
        `${pad(hr)}:${pad(d.getMinutes())}:${pad(d.getSeconds())} ${ampm} ` +
        `${tzAbbr(d)} ${d.getFullYear()}`
    );
  },
};
