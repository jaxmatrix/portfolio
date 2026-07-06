import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pillars, Pillar } from './Pillars';

const meta: Meta<typeof Pillars> = {
  title: 'Sections/Pillars',
  component: Pillars,
};
export default meta;

type Story = StoryObj<typeof Pillars>;

export const Default: Story = {
  render: () => (
    <Pillars>
      <Pillar n="LAYER 00 — METAL" title="Machine & Firmware">
        Designed and built precision machines end-to-end. Rust firmware on RP2040 / ESP32,
        motion control, closed-loop vision, custom instruments.
      </Pillar>
      <Pillar n="LAYER 01 — SOFTWARE" title="Full-stack & Systems">
        React / TypeScript / Rust across desktop, web, and cloud. Real-time collaboration
        (Yjs/CRDT), microservices, AWS infra, cross-platform apps.
      </Pillar>
      <Pillar n="LAYER 02 — INTELLIGENCE" title="AI & Orchestration">
        Agentic workflows, RAG, computer-vision pipelines, context engineering — from video
        agents to secure multi-machine orchestration.
      </Pillar>
    </Pillars>
  ),
};
