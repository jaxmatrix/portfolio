import type { Meta, StoryObj } from '@storybook/react-vite';
import { Capabilities, CapabilityCard } from './Capabilities';

const meta: Meta<typeof Capabilities> = {
  title: 'Sections/Capabilities',
  component: Capabilities,
};
export default meta;

type Story = StoryObj<typeof Capabilities>;

export const Default: Story = {
  render: () => (
    <Capabilities>
      <CapabilityCard title="Languages" items={['Rust', 'TypeScript', 'Python', 'C', 'C# / VB (.NET)']} />
      <CapabilityCard
        title="Hardware & Firmware"
        items={['embassy-rs', 'esp-idf-rs', 'RP2040 / ESP32', 'Marlin / motion', 'OpenCV']}
      />
      <CapabilityCard title="Frontend & Apps" items={['React', 'Next.js', 'Angular', 'egui', 'Tauri', 'WebGL']} />
      <CapabilityCard title="AI & Agents" items={['Agentic workflows', 'RAG', 'LangGraph', 'Qdrant', 'Computer vision']} />
    </Capabilities>
  ),
};
