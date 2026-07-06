import type { Meta, StoryObj } from '@storybook/react-vite';
import { Reveal } from './Reveal';

const meta: Meta<typeof Reveal> = {
  title: 'Utilities/Reveal',
  component: Reveal,
  decorators: [
    (Story) => (
      <div style={{ minHeight: '160vh', paddingTop: '120vh' }}>{Story()}</div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Reveal>;

export const Default: Story = {
  args: {
    children: (
      <div
        style={{
          padding: 32,
          border: '1px solid var(--line)',
          background: 'var(--surface)',
          fontFamily: 'var(--mono)',
          color: 'var(--ink-2)',
        }}
      >
        Scroll down — this block fades and lifts into view.
      </div>
    ),
  },
};
