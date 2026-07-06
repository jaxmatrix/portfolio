import type { Meta, StoryObj } from '@storybook/react-vite';
import { Nav } from './Nav';

const meta: Meta<typeof Nav> = {
  title: 'Layout/Nav',
  component: Nav,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof Nav>;

export const Default: Story = {
  args: {
    brand: (
      <>
        JAI<span>/</span>SHUKLA
      </>
    ),
    links: [
      { label: 'Builds', href: '#builds' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'Path', href: '#path' },
      { label: 'Stack', href: '#stack' },
      { label: 'Research', href: '#research' },
      { label: 'Contact', href: '#contact' },
    ],
    cta: { label: 'Résumé ↗', href: '#' },
  },
};
