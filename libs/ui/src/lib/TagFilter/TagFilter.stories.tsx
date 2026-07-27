import type { Meta, StoryObj } from '@storybook/react-vite';
import { TagFilter } from './TagFilter';

const meta: Meta<typeof TagFilter> = {
  title: 'Blog/TagFilter',
  component: TagFilter,
  args: {
    allHref: '#none',
    allCount: 7,
    tags: [
      { label: 'Firmware', href: '#none', count: 4 },
      { label: 'Hardware', href: '#none', count: 3 },
      { label: 'Control', href: '#none', count: 2 },
      { label: 'AI', href: '#none', count: 1 },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: 300, border: '1px solid var(--line-soft)' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof TagFilter>;

export const Default: Story = {};

export const Filtered: Story = { args: { activeTag: 'Hardware' } };
