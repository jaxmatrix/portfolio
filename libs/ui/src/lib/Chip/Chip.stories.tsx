import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Atoms/Chip',
  component: Chip,
  args: { children: 'Marlin' },
};
export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {};

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {['Marlin', 'Motion control', 'Stepper drives', 'OpenCV', 'Mechanical design'].map(
        (c) => (
          <Chip key={c}>{c}</Chip>
        )
      )}
    </div>
  ),
};
