import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeroArt } from './HeroArt';

const meta: Meta<typeof HeroArt> = {
  title: 'Hero/HeroArt',
  component: HeroArt,
  decorators: [(Story) => <div style={{ maxWidth: 360 }}>{Story()}</div>],
};
export default meta;

type Story = StoryObj<typeof HeroArt>;

export const Default: Story = {};
