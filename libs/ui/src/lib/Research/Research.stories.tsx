import type { Meta, StoryObj } from '@storybook/react-vite';
import { PublicationItem, AwardItem } from './Research';

const meta: Meta<typeof PublicationItem> = {
  title: 'Sections/Research',
  component: PublicationItem,
};
export default meta;

type Story = StoryObj<typeof PublicationItem>;

export const Publications: Story = {
  render: () => (
    <div>
      <PublicationItem
        featured
        title="Smartphone-integrated, reagent-free paper sensor for hematocrit measurement"
        journal="Analytical Methods 15(29), 2023"
        citedBy="cited by 11"
        note="device + image-processing server"
      />
      <PublicationItem
        title="Lab-on-chip electrochemical biosensor for rheumatoid arthritis"
        journal="MEMS & Microfluidics in Healthcare, 2023"
        citedBy="cited by 6"
      />
    </div>
  ),
};

export const Awards: Story = {
  render: () => (
    <div>
      <AwardItem
        title="2nd — Siemens MakeItReal Hackathon"
        meta="Full-stack security system + integrated hardware · 2019"
      />
      <AwardItem
        title="1st — Product Design, INAE Youth Conclave"
        meta="Novel bandage to control bleeding from severe wounds · 2019"
      />
    </div>
  ),
};
