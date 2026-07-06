/* eslint-disable jsx-a11y/aria-role --
   `role` here is a TimelineItem prop (the job role), not a DOM ARIA role. */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Timeline, TimelineItem } from './Timeline';

const meta: Meta<typeof Timeline> = {
  title: 'Sections/Timeline',
  component: Timeline,
};
export default meta;

type Story = StoryObj<typeof Timeline>;

export const Default: Story = {
  render: () => (
    <Timeline>
      <TimelineItem
        when="FEB 2025 — PRESENT"
        role="Founding Engineer"
        org={
          <>
            <b>SlidelyAI</b> (Y Combinator-backed) · Bengaluru
          </>
        }
        desc="Windows desktop software, web application, AI orchestration layer and cloud infrastructure for an AI-native slide product."
      />
      <TimelineItem
        when="JUN 2024 — JAN 2025"
        role="Founder"
        org={
          <>
            <b>Vasinya Yunaan</b> · Pune
          </>
        }
        desc="Built a platform analyzing 10,000+ patents for diagnostics market trends with RAG over OpenAI APIs; raised an initial $20,000."
      />
    </Timeline>
  ),
};
