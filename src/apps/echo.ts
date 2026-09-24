import type { Command } from '../shell/types';

export const echo: Command = {
  name: 'echo',
  description: 'display a line of text',
  async run(ctx, argv) {
    ctx.stdout.print(argv.slice(1).join(' '));
  },
};
