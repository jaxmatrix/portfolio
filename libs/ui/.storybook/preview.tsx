import type { Preview, Decorator } from '@storybook/react-vite';
import '../src/styles/tokens.css';

/* Every story renders on the paper + machinist-grid surface, matching the
   design reference, so components are always evaluated in-context. */
const withPaper: Decorator = (Story) => (
  <div className="paper-surface" style={{ minHeight: '100vh', padding: '48px' }}>
    <Story />
  </div>
);

const preview: Preview = {
  decorators: [withPaper],
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
  },
};

export default preview;
