import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from './Section';

const meta: Meta<typeof Section> = {
  title: 'Layout/Section',
  component: Section,
};
export default meta;

type Story = StoryObj<typeof Section>;

export const WithHeader: Story = {
  args: {
    id: 'builds',
    coord: 'WP-02',
    title: 'Featured builds',
    note: '▶ drop your clips into each slot',
    children: <p style={{ color: 'var(--ink-2)' }}>Section body goes here.</p>,
  },
};

export const Bare: Story = {
  args: {
    children: <p style={{ color: 'var(--ink-2)' }}>A section with no header.</p>,
  },
};
