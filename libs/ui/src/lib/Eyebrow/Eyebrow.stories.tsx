import type { Meta, StoryObj } from '@storybook/react-vite';
import { Eyebrow } from './Eyebrow';

const meta: Meta<typeof Eyebrow> = {
  title: 'Atoms/Eyebrow',
  component: Eyebrow,
  args: { children: 'Publications · 5' },
};
export default meta;

type Story = StoryObj<typeof Eyebrow>;

export const Default: Story = {};
