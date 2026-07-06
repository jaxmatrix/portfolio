import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
  args: { children: 'Precision machine', year: 'Utopic Tech · 2023–24' },
};
export default meta;

type Story = StoryObj<typeof Tag>;

export const Default: Story = {};

export const WithoutYear: Story = {
  args: { children: 'Embedded Rust', year: undefined },
};
