import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeroPortrait } from './HeroPortrait';

const meta: Meta<typeof HeroPortrait> = {
  title: 'Hero/HeroPortrait',
  component: HeroPortrait,
  decorators: [(Story) => <div style={{ maxWidth: 360 }}>{Story()}</div>],
};
export default meta;

type Story = StoryObj<typeof HeroPortrait>;

export const Default: Story = {
  args: {
    src: '/self.png',
    srcWebp: '/self.webp',
    alt: 'Jai Shukla',
    width: 900,
    height: 900,
  },
};
