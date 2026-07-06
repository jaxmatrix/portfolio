import type { Meta, StoryObj } from '@storybook/react-vite';
import { Gallery } from './Gallery';

const meta: Meta<typeof Gallery> = {
  title: 'Sections/Gallery',
  component: Gallery,
};
export default meta;

type Story = StoryObj<typeof Gallery>;

export const Placeholders: Story = {
  args: {
    items: [
      { tall: true, caption: '5-axis deposition machine — the full rig I designed and built' },
      { caption: 'Deposition head — tuned to land material on a 100µm spot' },
      { caption: 'Custom potentiostat board (RP2040) running embassy-rs firmware' },
      { tall: true, caption: 'RF/DC sputtering chamber — rebuilt from a full teardown' },
      { caption: 'Multiplexed sensor array, DLP-patterned at 50µm' },
      { caption: 'Rust (egui) control software driving the machine' },
    ],
  },
};
