import { Button, SectionHeader, BuildCard } from '@portfolio/ui';

export default function Index() {
  return (
    <main style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 28px' }}>
      <SectionHeader
        coord="WP-02"
        title="Featured builds"
        note="consuming @portfolio/ui"
      />

      <BuildCard
        tag="Precision machine"
        year="Utopic Tech · 2023–24"
        title="A 5-axis micro-deposition machine, built end to end"
        role="mechanical design · firmware · control software · vision"
        paragraphs={[
          'Designed and built the machine from scratch — hardware, customized Marlin firmware, and the motion stack.',
          <span className="hard" key="hard">
            The hard part: <b>killing tip vibration</b> so material lands on a 100µm spot,
            then closing the loop with image-based position correction to 10µm.
          </span>,
        ]}
        chips={['Marlin', 'Motion control', 'Stepper drives', 'OpenCV']}
        mediaLabel="5-axis deposition machine — live run"
        mediaHint="CLIP 01 · motion + toolpath + deposition"
      />

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
        <Button variant="primary" href="#builds">
          See the builds ↓
        </Button>
        <Button href="#contact">Get in touch</Button>
      </div>
    </main>
  );
}
