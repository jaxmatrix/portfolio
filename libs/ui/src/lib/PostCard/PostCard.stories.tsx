import type { Meta, StoryObj } from '@storybook/react-vite';
import { PostCard } from './PostCard';

const meta: Meta<typeof PostCard> = {
  title: 'Blog/PostCard',
  component: PostCard,
  args: {
    href: '#none',
    title: 'Closing the loop on a cheap spindle',
    summary:
      'A £40 spindle has no encoder, no torque feedback and no shame. Here is how I gave one a closed control loop without replacing it.',
    coord: 'LOG-001',
    dateDisplay: '18 Jul 2026',
    readingLabel: '5 min read',
    tags: [
      { label: 'Firmware', href: '#none' },
      { label: 'Control', href: '#none' },
    ],
  },
};
export default meta;

type Story = StoryObj<typeof PostCard>;

/** No cover image — falls back to the grid-paper coordinate plate. */
export const Default: Story = {};

export const Draft: Story = { args: { draft: true } };
