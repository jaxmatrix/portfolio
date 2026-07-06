import type { Meta, StoryObj } from '@storybook/react-vite';
import { BuildCard } from './BuildCard';

const meta: Meta<typeof BuildCard> = {
  title: 'Composites/BuildCard',
  component: BuildCard,
  decorators: [
    (Story) => <div style={{ maxWidth: 1000, margin: '0 auto' }}>{Story()}</div>,
  ],
};
export default meta;

type Story = StoryObj<typeof BuildCard>;

/** Build 01 — the 5-axis deposition machine, copy lifted from index.html. */
export const DepositionMachine: Story = {
  args: {
    tag: 'Precision machine',
    year: 'Utopic Tech · 2023–24',
    title: 'A 5-axis micro-deposition machine, built end to end',
    role: 'mechanical design · firmware · control software · vision',
    paragraphs: [
      'Designed and built the machine from scratch — hardware, customized Marlin firmware, and the motion stack.',
      <span className="hard" key="hard">
        The hard part: <b>killing tip vibration</b> so material lands on a 100µm spot. I
        re-tuned the acceleration/deceleration profiles and paired high-count steppers with
        fine-pitch lead screws for ~50µm resolution, then closed the loop with image-based
        position correction to 10µm.
      </span>,
    ],
    chips: ['Marlin', 'Motion control', 'Stepper drives', 'OpenCV', 'Mechanical design'],
    mediaLabel: '5-axis deposition machine — live run',
    mediaHint: 'CLIP 01 · motion + toolpath + deposition',
  },
};

/** Even-index layout: media swaps to the right. */
export const Reversed: Story = {
  args: {
    ...DepositionMachine.args,
    reverse: true,
    tag: 'Embedded Rust',
    year: 'IIT Kharagpur · 2021–23',
    title: 'A self-built potentiostat and its Rust firmware',
    mediaLabel: 'Potentiostat firmware — a CV / EIS sweep running',
    mediaHint: 'CLIP 02 · RP2040 · embassy-rs · live measurement',
  },
};
