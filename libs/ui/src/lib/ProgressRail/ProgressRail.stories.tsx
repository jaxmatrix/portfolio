import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressRail } from './ProgressRail';

const meta: Meta<typeof ProgressRail> = {
  title: 'Layout/ProgressRail',
  component: ProgressRail,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '220vh' }}>
        {Story()}
        <p style={{ padding: '48px', color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>
          Scroll the preview — the rail fill and head track page position.
        </p>
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ProgressRail>;

export const Default: Story = {};
