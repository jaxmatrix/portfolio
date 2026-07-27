import type { Meta, StoryObj } from '@storybook/react-vite';
import { NewsletterCard } from './NewsletterCard';

const meta: Meta<typeof NewsletterCard> = {
  title: 'Blog/NewsletterCard',
  component: NewsletterCard,
  args: {
    blurb: 'No mailing list yet. Point a reader at the feed, or email me directly.',
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

type Story = StoryObj<typeof NewsletterCard>;

/** What actually ships today: no provider, so no input — just honest links. */
export const NoProvider: Story = {
  args: {
    fallbackLinks: [
      { label: 'RSS feed', href: '#none' },
      { label: 'Email me', href: '#none', external: true },
    ],
  },
};

/** What appears once an endpoint is configured. */
export const WithProvider: Story = {
  args: { action: 'https://example.com/subscribe' },
};
