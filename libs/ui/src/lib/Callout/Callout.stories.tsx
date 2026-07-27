import type { Meta, StoryObj } from '@storybook/react-vite';
import { Callout } from './Callout';

const meta: Meta<typeof Callout> = {
  title: 'Blog/Callout',
  component: Callout,
  args: { children: 'The integrator clamp matters more than either gain.' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 620, padding: 28 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Callout>;

export const Note: Story = { args: { title: 'Note' } };
export const Warn: Story = { args: { tone: 'warn', title: 'Watch out' } };
export const Spec: Story = { args: { tone: 'spec', title: 'Spec' } };
