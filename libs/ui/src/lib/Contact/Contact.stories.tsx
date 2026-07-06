import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContactGrid, ContactRow } from './Contact';

const meta: Meta<typeof ContactGrid> = {
  title: 'Sections/Contact',
  component: ContactGrid,
  // The rows are designed for the dark contact footer.
  parameters: { backgrounds: { default: 'ink' } },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--ink)', padding: 40 }}>{Story()}</div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ContactGrid>;

export const Default: Story = {
  render: () => (
    <ContactGrid>
      <ContactRow label="Email" value="jaishukla7768@gmail.com" href="mailto:jaishukla7768@gmail.com" />
      <ContactRow label="Phone" value="+91 78729 13111" href="tel:+917872913111" />
      <ContactRow label="GitHub" value="github.com/… ↗" href="#" external />
      <ContactRow label="LinkedIn" value="linkedin.com/in/… ↗" href="#" external />
    </ContactGrid>
  ),
};
