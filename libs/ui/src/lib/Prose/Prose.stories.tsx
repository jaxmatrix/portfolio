import type { Meta, StoryObj } from '@storybook/react-vite';
import { Prose } from './Prose';

const meta: Meta<typeof Prose> = {
  title: 'Blog/Prose',
  component: Prose,
};
export default meta;

type Story = StoryObj<typeof Prose>;

/** The full type ramp, as MDX would emit it. */
export const TypeRamp: Story = {
  render: () => (
    <div style={{ maxWidth: 760, padding: 28 }}>
      <Prose>
        <p>
          A lead paragraph carrying the <em>plasma highlight</em> and a{' '}
          <strong>bold run</strong>, plus an <a href="#none">inline link</a> and some{' '}
          <code>inline_code()</code>.
        </p>
        <h2 id="a-second-level-heading">A second level heading</h2>
        <p>Body copy under an h2, capped to a readable measure.</p>
        <h3 id="a-third-level-heading">A third level heading</h3>
        <ul>
          <li>Square markers, never round</li>
          <li>Hairline rules, never shadows</li>
        </ul>
        <ol>
          <li>Zero-padded mono counters</li>
          <li>In amber, to echo the meta ladder</li>
        </ol>
        <blockquote>
          <p>A pull quote, set in the display face and never italicised.</p>
        </blockquote>
        <table>
          <thead>
            <tr>
              <th>Term</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Kp</td>
              <td>0.42</td>
            </tr>
            <tr>
              <td>Ki</td>
              <td>0.06</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <p>Content after a rule.</p>
      </Prose>
    </div>
  ),
};
