import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableOfContents, type TocItem } from './TableOfContents';

const ITEMS: TocItem[] = [
  { id: 'reading-speed', text: 'Reading speed without an encoder', depth: 2 },
  { id: 'the-window', text: 'Finding the sampling window', depth: 3 },
  { id: 'the-loop', text: 'The loop itself', depth: 2 },
  { id: 'gains', text: 'Choosing the gains', depth: 3 },
  { id: 'windup', text: 'Integrator wind-up', depth: 3 },
  { id: 'results', text: 'What it actually bought', depth: 2 },
];

const meta: Meta<typeof TableOfContents> = {
  title: 'Blog/TableOfContents',
  component: TableOfContents,
  args: { items: ITEMS },
};
export default meta;

type Story = StoryObj<typeof TableOfContents>;

/* The scroll-spy reads real element positions, so a story without scrollable
   headings would look broken rather than merely idle. This decorator renders
   the article the TOC is describing. */
function Article() {
  return (
    <div style={{ maxWidth: 520 }}>
      {ITEMS.map((item) => (
        <section key={item.id}>
          {item.depth === 2 ? (
            <h2 id={item.id} style={{ scrollMarginTop: 92 }}>
              {item.text}
            </h2>
          ) : (
            <h3 id={item.id} style={{ scrollMarginTop: 92 }}>
              {item.text}
            </h3>
          )}
          <p style={{ color: 'var(--ink-2)' }}>
            Scroll the pane to watch the active entry track the headings.
          </p>
          <div style={{ height: 260 }} />
        </section>
      ))}
    </div>
  );
}

export const Sticky: Story = {
  render: (args) => (
    <div style={{ height: '100vh', overflow: 'auto', padding: 28 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 48 }}>
        <Article />
        <div style={{ position: 'sticky', top: 0, alignSelf: 'start', border: '1px solid var(--line-soft)' }}>
          <TableOfContents {...args} offset={0} />
        </div>
      </div>
    </div>
  ),
};

/** The narrow-width variant, shown above the article instead of beside it. */
export const Inline: Story = {
  render: (args) => (
    <div style={{ maxWidth: 620, padding: 28 }}>
      <TableOfContents {...args} variant="inline" />
    </div>
  ),
};

/** A post with no h2/h3 renders nothing rather than an empty box. */
export const NoHeadings: Story = { args: { items: [] } };
