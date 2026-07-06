import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeader } from './SectionHeader';

const meta: Meta<typeof SectionHeader> = {
  title: 'Atoms/SectionHeader',
  component: SectionHeader,
  args: { coord: 'WP-02', title: 'Featured builds' },
};
export default meta;

type Story = StoryObj<typeof SectionHeader>;

export const Default: Story = {};

export const WithNote: Story = {
  args: { coord: 'WP-02', title: 'Featured builds', note: '▶ drop your clips into each slot' },
};

export const WithLinkNote: Story = {
  args: {
    coord: 'WP-06',
    title: 'Research & recognition',
    note: (
      <a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer">
        Google Scholar ↗
      </a>
    ),
  },
};
