// home — open the home page. Behaves exactly like typing `index`: renders the
// index document wherever you are, without touching the cwd. Delegates to the
// index document command rather than duplicating render logic.
import type { Command } from '../shell/types';

export const home: Command = {
  name: 'home',
  description: 'open the home page (same as index)',
  async run(ctx) {
    const index = ctx.resolve('index');
    if (index) await index.run(ctx, ['index']);
  },
};
