import type { ReactNode } from 'react';

/* =========================================================
   Portfolio content — transcribed verbatim from index.html.
   Edit copy here; section components map over these arrays.
   ========================================================= */

export interface NavLinkData {
  label: string;
  href: string;
}

/* Hashes are root-relative so they also work from /blog/*, where a bare
   `#builds` would resolve against the blog URL and go nowhere. On the homepage
   itself `/#builds` is still a same-document fragment jump, so nothing reloads. */
export const navLinks: NavLinkData[] = [
  { label: 'Builds', href: '/#builds' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Path', href: '/#path' },
  { label: 'Stack', href: '/#stack' },
  { label: 'Research', href: '/#research' },
  { label: 'Blog', href: '/blog' },
  { label: 'Scrapbook', href: '/scrapbook' },
  { label: 'Contact', href: '/#contact' },
];

/* Single source of truth — used by the nav CTA and the hero button.
   NOTE: requires apps/web/public/jai-shukla-resume.pdf to exist. */
export const resumeHref = '/jai-shukla-resume.pdf';

export const resumeCta: NavLinkData = { label: 'Résumé ↗', href: resumeHref };

export const hero = {
  status:
    'Shipped Allr, a universal AI agent app, to the stores in five weeks · open to problems that don’t stop at the app layer',
  heading: (
    <>
      I build the whole stack — from the <em>model</em> down to the <em>metal</em>.
    </>
  ),
  sub: 'Jai Shukla. AI and systems engineer — I ship agent systems and the full-stack products around them. When a problem runs deeper than the app, I keep going: browser runtimes, Rust firmware, the machines themselves.',
  meta: (
    <>
      <b>Now:</b> AI &amp; systems engineer · building Allr, a universal agent platform
      <br />
      <b>Depth:</b> agent runtimes · React/TS · Rust · AWS · WebRTC · down to bare metal
      <br />
      <b>Based in</b> Bengaluru, India · <b>willing to relocate</b>
    </>
  ),
  portrait: {
    src: '/self_2.png',
    alt: 'Jai Shukla',
    // Intrinsic size of /self_2.png — keep in sync if the asset is regenerated.
    width: 378,
    height: 495,
  },
};

export const thesis = {
  lead: (
    <>
      Most engineers pick a layer and stay there. <em>I go wherever the problem is.</em>
    </>
  ),
  body: 'Right now that’s Allr — a universal AI agent platform on a fork of Nous’s Hermes: one codebase across five platforms, Android beta live on the Play Store, iOS in review, with a production messaging gateway and a multi-tenant agent OS behind it. Before it: an AI product shipped inside PowerPoint, a query language so agents could traverse Revit geometry, the Rust software driving a 5-axis machine, and a potentiostat with its own firmware, built because the instrument I needed didn’t exist. The domains changed; the instinct didn’t — when the tool isn’t there, build it.',
};

export interface PillarData {
  n: string;
  title: string;
  body: ReactNode;
}

/* Ordered top-down: the numbers count how far down the stack each step goes. */
export const pillars: PillarData[] = [
  {
    n: 'DEPTH 00 — MODEL',
    title: 'Agents & Models',
    body: 'A hybrid JSONPath–Emmet query language so agents can traverse Revit geometry. A long-context tool that chunks data to stop context pollution. Record-then-replay browser automation instead of re-reasoning every run.',
  },
  {
    n: 'DEPTH 01 — SOFTWARE',
    title: 'Full-stack & Systems',
    body: 'React / TypeScript / Rust across desktop, web, and cloud. Real-time collaboration (Yjs/CRDT), microservices, AWS infra, cross-platform apps.',
  },
  {
    n: 'DEPTH 02 — METAL',
    title: 'Machine & Firmware',
    body: 'Designed and built precision machines end-to-end. Rust firmware on RP2040 / ESP32 (embassy-rs), motion control, closed-loop vision, custom instruments.',
  },
];

export interface BuildLinkData {
  label: string;
  href: string;
  external?: boolean;
}

export interface BuildData {
  tag: string;
  year: string;
  title: string;
  role: string;
  paragraphs: ReactNode[];
  chips: string[];
  /** Repo / demo destinations; rendered under the chip row. */
  links?: BuildLinkData[];
  /** Derived by tools/prepare-images.sh into public/builds/. */
  image: string;
  imageAlt: string;
}

export const builds: BuildData[] = [
  {
    tag: 'Precision machine',
    year: 'Utopic Tech · 2023–24',
    title: 'A 5-axis micro-deposition machine, built end to end',
    role: 'mechanical design · firmware · control software · vision',
    paragraphs: [
      'Designed and built the machine from scratch — hardware, customized Marlin firmware, and the motion stack.',
      <span className="hard" key="h">
        The hard part: <b>killing tip vibration</b> so material lands on a 100µm spot. I
        re-tuned the acceleration/deceleration profiles and paired high-count steppers with
        fine-pitch lead screws for ~50µm resolution, then closed the loop with image-based
        position correction to 10µm.
      </span>,
    ],
    chips: ['Marlin', 'Motion control', 'Stepper drives', 'OpenCV', 'Mechanical design'],
    image: '/builds/deposition-machine.webp',
    imageAlt:
      'The 5-axis deposition machine on the bench: extruded aluminium frame, stepper motors, lead screws and the deposition head',
  },
  {
    tag: 'Embedded Rust',
    year: 'IIT Kharagpur · 2021–23',
    title: 'A self-built potentiostat and its Rust firmware',
    role: 'hardware bring-up · async embedded firmware',
    paragraphs: [
      'Built firmware for a self-developed potentiostat on the RP2040 in Rust with embassy-rs, plus ESP32 firmware (esp-idf-rs) for real-time experiments.',
      <span className="hard" key="h">
        Implemented the real electrochemical methods — <b>CV, DPV, CA and EIS</b> — across a{' '}
        <b>1µA to 100mA</b> current-detection range: async control talking directly to analog
        front-ends, on a microcontroller.
      </span>,
    ],
    chips: ['Rust', 'embassy-rs', 'esp-idf-rs', 'RP2040 / ESP32', 'Analog / ADC'],
    image: '/builds/potentiostat.webp',
    imageAlt:
      'Potentiostat bring-up: a Raspberry Pi Pico W wired across two breadboards to a row of op-amps forming the analog front end',
  },
  {
    tag: 'Rust desktop + tooling',
    year: 'Utopic Tech · 2023–24',
    title: 'The software that drives the machine',
    role: 'desktop app · path generation · Tauri mobile control',
    paragraphs: [
      <>
        Wrote the machine's control software in Rust (egui), architected as a{' '}
        <b className="hard">remote state machine</b> so operators reconfigure and run new
        processes at runtime — no firmware changes.
      </>,
      <span className="hard" key="h">
        Built an <b>SVG-based process generator</b> that compiles vector designs into
        multi-axis toolpaths, and a Tauri mobile app so a phone can drive the instrument
        directly.
      </span>,
    ],
    chips: ['Rust', 'egui', 'Tauri', 'State machines', 'Path planning'],
    image: '/builds/control-software.webp',
    imageAlt:
      'The control software mid-run: jog controls down the left, QC and pipette camera feeds watching the head over a sensor board',
  },
  {
    tag: 'Fabrication & process',
    year: 'Nanobiosensor Lab, IIT KGP · 2021–25',
    title: 'Multiplexed biosensors, micropatterned at 50µm',
    role: 'biosensor scientist · process development · lab build-out',
    paragraphs: [
      <>
        Developed biosensor materials and my own fabrication process: a DLP printer to create{' '}
        <b className="hard">50µm patterns</b>, used to build multiplexed sensors functionalized
        through electrochemistry.
      </>,
      <span className="hard" key="h">
        Also rebuilt an <b>RF/DC sputtering system</b> from a full teardown and wrote its
        operating protocols, and set up the lab's measurement station from scratch. The clip
        includes an NPTEL segment where I explain how the potentiostat works.
      </span>,
    ],
    chips: [
      'DLP lithography',
      'Electrochemistry',
      'RF/DC sputtering',
      'Thin films',
      'ML (SVM/NN/RF)',
    ],
    image: '/builds/biosensors.webp',
    imageAlt:
      'A fingertip-sized chip beside a thumb for scale, carrying eighteen micropatterned electrodes fanned out from a common point in 50µm traces',
  },
  {
    tag: 'AI systems',
    year: 'Project · 2026–present',
    title: 'Dexkitty — an AI layer over Autodesk Revit',
    role: 'systems architecture · agents · CAD integration',
    paragraphs: [
      <>
        A multi-agent system with WebSockets and Yjs (CRDTs) for{' '}
        <b className="hard">synchronized human–AI editing</b> of Revit models, bridged to native
        CAD through a custom high-speed connector.
      </>,
      <span className="hard" key="h">
        Authored a hybrid <b>JSONPath–Emmet query language</b> to traverse hierarchical Revit
        geometry for agents, plus a Qdrant-backed vector knowledge base and a long-context agent
        tool that chunks data to stop context pollution.
      </span>,
    ],
    chips: ['TypeScript', 'Yjs / CRDT', 'WebSockets', 'Qdrant', 'Revit / BIM', 'Agents'],
    image: '/builds/dexkitty.webp',
    imageAlt: 'The Dexkitty landing page — “The AI layer for design intelligence”',
  },
  {
    tag: 'Product · founding engineer',
    year: 'SlidelyAI (YC) · 2025–26',
    title: 'Shipping an AI product across desktop, web & cloud',
    role: 'Windows add-in · web app · AI orchestration · infra',
    paragraphs: [
      <>
        Owned the Windows software, the web app, the AI orchestration layer and the cloud
        infra. Unlocked web-app integration <b className="hard">inside PowerPoint</b> and ported
        legacy Windows add-ins to macOS with full parity.
      </>,
      <span className="hard" key="h">
        Engineered a <b>high-fidelity graphics-tracing pipeline</b> (generative AI + computer
        vision + autonomous feedback agents) across distributed microservices; built
        OneDrive/SharePoint access via the Microsoft Graph API.
      </span>,
    ],
    chips: [
      'React / TS',
      'C# / VB.NET',
      'AWS',
      'Graph API',
      'Computer vision',
      'Microservices',
    ],
    image: '/builds/slidely.webp',
    imageAlt:
      'The Slidely AI product page — “Create & improve complex, fully editable PowerPoint presentations”, with generated decks alongside',
  },
  /* Newest build. The array is authored oldest-first and `Builds.tsx` reverses it,
     so appending here is what puts this card at the top of the section. */
  {
    tag: 'Agent runtime',
    year: 'Independent · 2026–present',
    title: 'mjx-hermes-agent — an unofficial client on Nous’s Hermes',
    role: 'fork · runtime · session streaming · browser automation',
    paragraphs: [
      <>
        A fork of Nous Research’s Hermes, rebuilt as an unofficial client that carries the same
        session across Linux, macOS and Windows — an <b className="hard">agent OS</b> that
        drives whichever machine is in front of me, not just the terminal it started in.
      </>,
      <span className="hard" key="h">
        The hard part: <b>getting a real desktop out of a container</b>. The containerized
        session streams over WebRTC so a remote machine is driveable at frame rate, and browser
        work is <b>recorded once and replayed deterministically</b> instead of re-reasoning the
        same clicks on every run.
      </span>,
    ],
    chips: ['WebRTC', 'Containers', 'Browser automation', 'Cross-platform', 'Agents'],
    links: [
      {
        label: 'github.com/jaxmatrix/mjx-hermes-agent ↗',
        href: 'https://github.com/jaxmatrix/mjx-hermes-agent',
        external: true,
      },
    ],
    image: '/builds/mjx-hermes.webp',
    imageAlt:
      'Two mjx-hermes-agent client windows side by side — session list, capabilities, artifacts and cron jobs in the sidebar',
  },
  {
    tag: 'Agent platform',
    year: 'Independent · 2026–present',
    title: 'Allr — a universal AI agent platform, shipped to the stores',
    role: 'founder · client · gateway · agent OS',
    paragraphs: [
      <>
        The Hermes fork below, grown into a product. One codebase runs Windows, macOS, Linux,
        Android and iOS; the Android beta is <b>live on the Play Store</b> and the iOS build is
        in App Store review — five weeks from first commit to store betas.
      </>,
      <span className="hard" key="h">
        The hard part: <b>shipping the complete thing, not the demo</b>. A production gateway
        carries the same agent into Telegram, Discord, Slack, WhatsApp and Signal from one
        process, and a multi-tenant agent OS provisions each user — SSO, isolated stack,
        observability — with a single script.
      </span>,
    ],
    chips: ['Tauri v2', 'Rust', 'Android / iOS', 'Multi-tenant infra', 'Agents'],
    links: [
      { label: 'allr.work ↗', href: 'https://allr.work', external: true },
      {
        label: 'github.com/jaxmatrix/mjx-hermes-agent ↗',
        href: 'https://github.com/jaxmatrix/mjx-hermes-agent',
        external: true,
      },
    ],
    image: '/builds/allr.webp',
    imageAlt:
      'The Allr client mid-task — an agent building and locally hosting a browser game, with gateway status, model picker and tool runs visible',
  },
];

export interface GalleryData {
  src?: string;
  caption: string;
}

/* Engineering work only — personal builds live on /scrapbook. Images are
   derived into public/gallery/ by tools/prepare-images.sh. */
export const gallery: GalleryData[] = [
  {
    src: '/gallery/deposition-rig.webp',
    caption:
      'The 5-axis deposition rig, first full assembly — extruded frame, lead screws, and the head that had to land material on a 100µm spot.',
  },
  {
    src: '/gallery/deposition-enclosed.webp',
    caption:
      'The same machine a revision later: enclosed, with a microscope on the head and a hygrometer inside the cabinet.',
  },
  {
    src: '/gallery/deposition-humidity.webp',
    caption:
      'Humidity control added after runs started drifting with the weather. A dehumidifier in the enclosure held it near 40%.',
  },
  {
    src: '/gallery/sputtering-chamber.webp',
    caption:
      'The RF/DC sputtering chamber — stainless bell, viewport, turbo and gas lines. It arrived dead; this is before the teardown.',
  },
  {
    src: '/gallery/sputtering-controller.webp',
    caption:
      'Turbo controller alive again and the rotary pump running, after rebuilding the vacuum system and writing its operating protocol.',
  },
  {
    src: '/gallery/sputtering-copper.webp',
    caption: 'First copper laid down once the chamber held vacuum again.',
  },
  {
    src: '/gallery/potentiostat-v4.webp',
    caption:
      'Potentiostat v4 — a Pico W talking to a row of op-amps, running the embassy-rs firmware that does CV, DPV, CA and EIS.',
  },
  {
    src: '/gallery/potentiostat-v2.webp',
    caption:
      'v2, built on hand-annotated cardboard: relay-switched electrodes, a level shifter, and an Android app plotting the sweep over Bluetooth.',
  },
  {
    src: '/gallery/potentiostat-v1.webp',
    caption: 'v1. Where the instrument started before any of it worked.',
  },
  {
    src: '/gallery/rust-display-driver.webp',
    caption:
      'Writing an ILI9225 SPI display driver in Rust for the Pico — source on the monitor, the display itself wired up on the desk.',
  },
  {
    src: '/gallery/multiplexed-sensor.webp',
    caption:
      'A multiplexed sensor on Kapton: seven screen-printed electrodes radiating from a centre well, with an SLA-printed chamber bonded over it.',
  },
  {
    src: '/gallery/screen-printed-cells.webp',
    caption:
      'Eight three-electrode cells screen-printed onto Kapton in one pass — my own fabrication process, no cleanroom involved.',
  },
  {
    src: '/gallery/microfluidics.webp',
    caption:
      'SLA-printed microfluidic cells with electrodes bonded in, for flow measurements on live cell culture.',
  },
  {
    src: '/gallery/patch-sensor-mask.webp',
    caption: 'The first mask for the wearable patch sensor, cut and aligned by hand.',
  },
  {
    src: '/gallery/clothes-peg-connector.webp',
    caption:
      'No FPC adapter anywhere in the building, so a clothes peg became the connector — jaws clamp the flex cable, wires soldered onto the contacts.',
  },
  {
    src: '/gallery/home-lab.webp',
    caption:
      'The hostel-room lab at IIT Kharagpur: one printer, a growth chart on the whiteboard, and most of a Master’s worth of side projects.',
  },
];

export interface ScrapbookData {
  src: string;
  caption: string;
}

/* Things that aren't work. Surfaced at /scrapbook, not on the homepage. */
export const scrapbook: ScrapbookData[] = [
  {
    src: '/scrapbook/hdd-serial-console.webp',
    caption:
      'A bricked Seagate ST3160318AS wired to a USB-TTL adapter — talking to the drive’s diagnostic serial port to bring it back. Labelled 1337MB, naturally.',
  },
  {
    src: '/scrapbook/relay-loop.webp',
    caption:
      'A state machine with the transitions wrong put a relay into a loop, switching fast enough to be audible. For about a minute the circuit was a drum machine.',
  },
  {
    src: '/scrapbook/paper-costume.webp',
    caption: 'An Assassin’s Creed costume, built entirely out of paper.',
  },
  {
    src: '/scrapbook/garbage-design-build.webp',
    caption: 'Building a scenic model out of discarded material for a garbage-design contest.',
  },
  {
    src: '/scrapbook/garbage-design-award.webp',
    caption: 'It came second.',
  },
  {
    src: '/scrapbook/3d-pen-keychain.webp',
    caption: 'A keychain drawn freehand with a 3D pen.',
  },
  {
    src: '/scrapbook/printed-self-portrait.webp',
    caption: 'A self portrait, 3D printed.',
  },
  {
    src: '/scrapbook/peltier-rig.webp',
    caption: 'A rig built to characterise Peltier plates, because the datasheet was not enough.',
  },
  {
    src: '/scrapbook/gsoc-kanban.webp',
    caption: 'The last day of Google Summer of Code, clearing the final column of the kanban.',
  },
];

export interface TimelineData {
  when: string;
  role: string;
  org: ReactNode;
  desc: string;
}

export const timeline: TimelineData[] = [
  {
    when: 'JUL 2026 — PRESENT',
    role: 'Independent',
    org: (
      <>
        <b>Allr</b> · a universal AI agent platform on a Hermes fork
      </>
    ),
    desc: 'Grew a fork of Nous Research’s Hermes into Allr: one codebase on Windows, macOS, Linux, Android and iOS — Android beta live on the Play Store, iOS in review — plus a production messaging gateway and a multi-tenant agent OS.',
  },
  {
    when: 'FEB 2025 — JUN 2026',
    role: 'Founding Engineer',
    org: (
      <>
        <b>SlidelyAI</b> (Y Combinator-backed) · Bengaluru
      </>
    ),
    desc: 'Windows desktop software, web application, AI orchestration layer and cloud infrastructure for an AI-native slide product.',
  },
  {
    when: 'JUN 2024 — JAN 2025',
    role: 'Founder',
    org: (
      <>
        <b>Vasinya Yunaan</b> · Pune
      </>
    ),
    desc: 'Built a platform analyzing 10,000+ patents for diagnostics market trends with RAG over OpenAI APIs; pitched investors and raised an initial $20,000.',
  },
  {
    when: 'MAR 2023 — MAY 2024',
    role: 'Scientist — Machine Design & Control',
    org: (
      <>
        <b>Utopic Tech Pvt. Ltd.</b> · Pune
      </>
    ),
    desc: 'Designed and built the 5-axis deposition machine, its Rust control software, SVG toolpath generator, and vision-based position correction to 10µm.',
  },
  {
    when: 'MAR 2021 — 2025',
    role: 'Biosensor Scientist / Research Assistant',
    org: (
      <>
        <b>Nanobiosensor &amp; BioDevices Lab, SMST, IIT Kharagpur</b>
      </>
    ),
    desc: 'Four years developing biosensor materials, fabricating and patterning multiplexed sensors, building the potentiostat firmware, rebuilding a sputtering system, and ML for analyte prediction.',
  },
  {
    when: 'JUN 2021 — AUG 2021',
    role: 'Google Summer of Code Contributor',
    org: (
      <>
        <b>Open Chemistry</b>, University of Pittsburgh
      </>
    ),
    desc: 'WebGL visualization pipelines for biomolecules and a UI for dynamic atom identification and labeling.',
  },
  {
    when: '2016 — 2021',
    role: 'B.Sc. (Hons) + M.Sc., Chemistry',
    org: (
      <>
        <b>IIT Kharagpur</b>
      </>
    ),
    desc: "Master's thesis: k-means clustering for catalyst discovery in water splitting across 200+ journals.",
  },
];

export interface CapabilityData {
  title: string;
  items: string[];
}

/* Ordered top-down, matching the pillars: model first, bare metal last. */
export const capabilities: CapabilityData[] = [
  { title: 'Languages', items: ['Rust', 'TypeScript', 'Python', 'C', 'C# / VB (.NET)'] },
  /* Tools with a repo or a version number — not categories. "Agentic workflows",
     "RAG" and "context engineering" were cut for reading as buzzwords. */
  {
    title: 'Models & Agents',
    items: ['Hermes', 'LangGraph', 'Qdrant', 'Browser automation'],
  },
  {
    title: 'Frontend & Apps',
    items: ['React', 'Next.js', 'Angular', 'egui', 'Tauri', 'WebGL'],
  },
  {
    title: 'Backend & Real-time',
    items: [
      'Node.js',
      'FastAPI',
      'Actix',
      'Hono',
      'WebSockets',
      'WebRTC',
      'Yjs',
      'Socket.io',
      'PostgreSQL',
    ],
  },
  {
    title: 'Cloud & DevOps',
    items: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Graph API'],
  },
  {
    title: 'Hardware & Firmware',
    items: [
      'embassy-rs',
      'esp-idf-rs',
      'RP2040 / ESP32',
      'Marlin / motion',
      'OpenCV',
      'Potentiostat design',
      'Sputtering / DLP',
    ],
  },
];

export interface PublicationData {
  title: string;
  featured?: boolean;
  journal: string;
  citedBy?: string;
  note?: string;
}

export const publications: PublicationData[] = [
  {
    featured: true,
    title: 'Smartphone-integrated, reagent-free paper sensor for hematocrit measurement',
    journal: 'Analytical Methods 15(29), 2023',
    citedBy: 'cited by 11',
    note: 'device + image-processing server',
  },
  {
    title: 'Lab-on-chip electrochemical biosensor for rheumatoid arthritis',
    journal: 'MEMS & Microfluidics in Healthcare, 2023',
    citedBy: 'cited by 6',
  },
  {
    title: 'Application of radiopharmaceuticals in diagnostics and therapy',
    journal: 'Next-Gen Nanobiosensor Devices, 2022',
    citedBy: 'cited by 5',
  },
  {
    title:
      'Electrochemical detection of cancer fingerprint: extracellular vesicle research from lab to market',
    journal: 'Next-Gen Nanobiosensor Devices, 2022',
    citedBy: 'cited by 3',
  },
  {
    title: 'Role of biosensors in regenerative therapeutics',
    journal: 'Regenerative Medicine: Emerging Techniques, 2023',
    citedBy: 'cited by 2',
  },
];

export interface AwardData {
  title: string;
  meta: string;
}

export const awards: AwardData[] = [
  {
    title: '2nd — Siemens MakeItReal Hackathon',
    meta: 'Full-stack security system + integrated hardware · 2019',
  },
  {
    title: '1st — Product Design, INAE Youth Conclave',
    meta: 'Novel bandage to control bleeding from severe wounds · 2019',
  },
  {
    title: '3rd — Rural Technology Hackathon',
    meta: 'Device generating electricity from stove waste heat · 2018',
  },
  {
    title: 'Participant — Clinton Global Initiative University',
    meta: 'Farm machine for stubble management · 2018',
  },
];

export const scholarUrl = 'https://scholar.google.com/citations?user=m6E0pHUAAAAJ&hl=en';

export interface ContactLinkData {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

export const contactLinks: ContactLinkData[] = [
  {
    label: 'GitHub',
    value: 'github.com/jaxmatrix ↗',
    href: 'https://github.com/jaxmatrix',
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/jaxmatrix ↗',
    href: 'https://www.linkedin.com/in/jaxmatrix/',
    external: true,
  },
  { label: 'GitLab', value: 'gitlab.com/jaxmatrix2 ↗', href: 'https://gitlab.com/jaxmatrix2', external: true },
  { label: 'Scholar', value: 'Google Scholar ↗', href: scholarUrl, external: true },
];

export const contact = {
  coord: 'WP-07 · END OF PATH',
  heading: (
    <>
      Got something hard <em>to build?</em>
    </>
  ),
  sub: "I'm most useful on problems that cross layers — where the answer isn't in the app, and nobody's sure it can be done. Based in Bengaluru and happy to relocate.",
  footLeft: 'JAI SHUKLA · AI & SYSTEMS ENGINEER',
  footRight: 'MODEL → SOFTWARE → FIRMWARE → MACHINE',
};
