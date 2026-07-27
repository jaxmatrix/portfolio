import type { Meta, StoryObj } from '@storybook/react-vite';
import { AuthorCard } from './AuthorCard';

const meta: Meta<typeof AuthorCard> = {
  title: 'Blog/AuthorCard',
  component: AuthorCard,
  args: {
    name: 'Jai Shukla',
    role: 'Founding Engineer @ SlidelyAI',
    blurb:
      'I build the whole stack — precision machines, embedded firmware, full-stack software and AI systems.',
    links: [
      { label: 'GitHub', href: '#none', external: true },
      { label: 'LinkedIn', href: '#none', external: true },
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

type Story = StoryObj<typeof AuthorCard>;

export const Default: Story = {};
