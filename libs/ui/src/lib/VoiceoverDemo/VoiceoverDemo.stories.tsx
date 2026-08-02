import type { Meta, StoryObj } from '@storybook/react-vite';
import { VoiceoverDemo } from './VoiceoverDemo';

const meta: Meta<typeof VoiceoverDemo> = {
  title: 'Blog/VoiceoverDemo',
  component: VoiceoverDemo,
};

export default meta;
type Story = StoryObj<typeof VoiceoverDemo>;

const SAMPLES = [
  {
    label: 'Headings',
    markdown: '# Deployment\n\nRun the migration first.\n\n## Rollback',
  },
  {
    label: 'Code',
    markdown: '```rust\nfn main() {\n    println!("hi");\n}\n```',
  },
];

/**
 * The wasm engine is served from the web app's `public/` directory, so it will
 * 404 in Storybook. That is the point of this story: it exercises the offline
 * path, where the component falls back to the pre-computed output and says so.
 */
export const EngineUnavailable: Story = {
  args: {
    samples: SAMPLES,
    fallbackOutput: 'Heading: Deployment. Run the migration first. Section: Rollback.',
  },
};
