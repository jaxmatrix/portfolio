import type { Meta, StoryObj } from '@storybook/react-vite';
import { Gallery } from './Gallery';

const meta: Meta<typeof Gallery> = {
  title: 'Sections/Gallery',
  component: Gallery,
};
export default meta;

type Story = StoryObj<typeof Gallery>;

/** Tiles without a `src` fall back to the grid placeholder. */
export const Placeholders: Story = {
  args: {
    items: [
      { caption: '5-axis deposition machine — the full rig I designed and built' },
      { caption: 'Deposition head — tuned to land material on a 100µm spot' },
      { caption: 'Custom potentiostat board (RP2040) running embassy-rs firmware' },
      { caption: 'RF/DC sputtering chamber — rebuilt from a full teardown' },
      { caption: 'Multiplexed sensor array, DLP-patterned at 50µm' },
      { caption: 'Rust (egui) control software driving the machine' },
    ],
  },
};

/**
 * The carousel loops by rendering three copies of `items` and parking on the
 * middle one, so it needs enough tiles to overflow before the wrap is
 * meaningful. Images resolve against the web app's public/ directory and will
 * be missing in Storybook — the layout is the point here.
 */
export const Carousel: Story = {
  args: {
    items: [
      { src: '/gallery/deposition-rig.webp', caption: 'The 5-axis deposition rig, first full assembly.' },
      { src: '/gallery/sputtering-chamber.webp', caption: 'The RF/DC sputtering chamber before the teardown.' },
      { src: '/gallery/potentiostat-v4.webp', caption: 'Potentiostat v4 — a Pico W driving the analog front end.' },
      { src: '/gallery/electrodes-18.webp', caption: 'Eighteen electrodes across a chip the size of a fingertip.' },
      { src: '/gallery/rust-display-driver.webp', caption: 'Writing an ILI9225 SPI driver in Rust.' },
      { src: '/gallery/home-lab.webp', caption: 'The hostel-room lab at IIT Kharagpur.' },
    ],
  },
};
