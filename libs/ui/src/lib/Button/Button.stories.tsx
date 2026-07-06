import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'default'] },
  },
  args: { children: 'See the builds ↓', variant: 'default' },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Primary: Story = {
  args: { variant: 'primary', children: 'See the builds ↓' },
};

export const Row: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button variant="primary" href="#builds">
        See the builds ↓
      </Button>
      <Button href="#">Download résumé</Button>
      <Button href="#contact">Get in touch</Button>
    </div>
  ),
};
