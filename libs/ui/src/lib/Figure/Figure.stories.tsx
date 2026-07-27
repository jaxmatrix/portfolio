import type { Meta, StoryObj } from '@storybook/react-vite';
import { Figure } from './Figure';

/* An inline SVG data URI keeps the story self-contained — no network, and it
   renders identically in a built Storybook. */
const PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450">
       <rect width="800" height="450" fill="#e2e3db"/>
       <path d="M0 0h800v450H0z" fill="none" stroke="#171a19" stroke-opacity=".16"/>
       <text x="400" y="232" text-anchor="middle" font-family="monospace"
             font-size="20" fill="#7c2e8c" letter-spacing="6">PLATE 01</text>
     </svg>`,
  );

const meta: Meta<typeof Figure> = {
  title: 'Blog/Figure',
  component: Figure,
  args: {
    src: PLACEHOLDER,
    alt: 'The spindle mount, seen from the Z gantry',
    caption: 'The spindle mount, seen from the Z gantry.',
    index: '01',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 620, padding: 28 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Figure>;

export const Default: Story = {};
export const NoCaption: Story = { args: { caption: undefined } };
