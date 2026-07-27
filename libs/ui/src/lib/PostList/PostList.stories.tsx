import type { Meta, StoryObj } from '@storybook/react-vite';
import { PostList, PostRow } from './PostList';

const meta: Meta<typeof PostList> = {
  title: 'Blog/PostList',
  component: PostList,
};
export default meta;

type Story = StoryObj<typeof PostList>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 720, padding: 28 }}>
      <PostList>
        <PostRow
          href="#none"
          title="Closing the loop on a cheap spindle"
          summary="Giving an open-loop DC motor a back-EMF tachometer and a PI controller."
          coord="LOG-002"
          dateDisplay="18 Jul 2026"
          readingLabel="5 min read"
          tags={[{ label: 'Firmware', href: '#none' }]}
        />
        <PostRow
          href="#none"
          title="Why the acceleration profile was the bottleneck"
          summary="Not the lead screw. Not the frame. The jerk limit."
          coord="LOG-001"
          dateDisplay="02 Jun 2026"
          readingLabel="8 min read"
          tags={[
            { label: 'Motion control', href: '#none' },
            { label: 'Hardware', href: '#none' },
          ]}
        />
      </PostList>
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div style={{ maxWidth: 720, padding: 28 }}>
      <PostList empty="Nothing filed under this topic yet." />
    </div>
  ),
};
