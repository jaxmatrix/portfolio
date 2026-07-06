import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusPill } from './StatusPill';

const meta: Meta<typeof StatusPill> = {
  title: 'Atoms/StatusPill',
  component: StatusPill,
  args: {
    children: 'Founding Engineer @ SlidelyAI · open to hard hardware + software problems',
  },
};
export default meta;

type Story = StoryObj<typeof StatusPill>;

export const Default: Story = {};
