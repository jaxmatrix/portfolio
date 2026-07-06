import type { ReactNode } from 'react';

/* =========================================================
   Portfolio content — transcribed verbatim from index.html.
   Edit copy here; section components map over these arrays.
   ========================================================= */

export interface NavLinkData {
  label: string;
  href: string;
}

export const navLinks: NavLinkData[] = [
  { label: 'Builds', href: '#builds' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Path', href: '#path' },
  { label: 'Stack', href: '#stack' },
  { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' },
];

export const resumeCta: NavLinkData = { label: 'Résumé ↗', href: '#' };

export const hero = {
  status: 'Founding Engineer @ SlidelyAI · open to hard hardware + software problems',
  heading: (
    <>
      I build the whole stack — from the <em>machine</em> to the <em>model</em>.
    </>
  ),
  sub: 'Jai Shukla. I started at the bench fabricating biosensors, then kept building down and up the stack — firmware, precision machines, full-stack software, AI systems.',
  meta: (
    <>
      <b>Origin:</b> Biosensor scientist, 4 yrs &nbsp;→&nbsp; <b>Now:</b> AI &amp; software
      engineer
      <br />
      <b>Range:</b> Rust firmware · motion control · React/TS · AWS · agentic AI
      <br />
      <b>Based in</b> Bengaluru, India · <b>willing to relocate</b>
    </>
  ),
};

export const thesis = {
  lead: (
    <>
      Most engineers pick a layer and stay there. <em>I go wherever the problem is.</em>
    </>
  ),
  body: "If the tool I needed didn't exist, I built it — a potentiostat and its firmware, a 5-axis deposition machine, the control software that drives it, the AI that orchestrates it. The domains changed from electrochemistry to AI products; the instinct never did. Below is the same person solving problems at every level of the stack.",
};

export interface PillarData {
  n: string;
  title: string;
  body: ReactNode;
}

export const pillars: PillarData[] = [
  {
    n: 'LAYER 00 — METAL',
    title: 'Machine & Firmware',
    body: 'Designed and built precision machines end-to-end. Rust firmware on RP2040 / ESP32 (embassy-rs), motion control, closed-loop vision, custom instruments.',
  },
  {
    n: 'LAYER 01 — SOFTWARE',
    title: 'Full-stack & Systems',
    body: 'React / TypeScript / Rust across desktop, web, and cloud. Real-time collaboration (Yjs/CRDT), microservices, AWS infra, cross-platform apps.',
  },
  {
    n: 'LAYER 02 — INTELLIGENCE',
    title: 'AI & Orchestration',
    body: 'Agentic workflows, RAG, computer-vision pipelines, context engineering — from independent video agents to secure multi-machine orchestration.',
  },
];

export interface BuildData {
  tag: string;
  year: string;
  title: string;
  role: string;
  paragraphs: ReactNode[];
  chips: string[];
  mediaLabel: string;
  mediaHint: string;
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
    mediaLabel: '5-axis deposition machine — live run',
    mediaHint: 'CLIP 01 · motion + toolpath + deposition',
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
    mediaLabel: 'Potentiostat firmware — a CV / EIS sweep running',
    mediaHint: 'CLIP 02 · RP2040 · embassy-rs · live measurement',
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
    mediaLabel: 'Rust control app + SVG→toolpath generation',
    mediaHint: 'CLIP 03 · egui · state machine · path planning',
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
    mediaLabel: 'Biosensor fabrication + how the potentiostat works',
    mediaHint: 'CLIP 04 · NPTEL explainer · lab I set up',
  },
  {
    tag: 'AI systems',
    year: 'Project · 2026–present',
    title: 'Architectural Intelligence over Autodesk Revit',
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
    mediaLabel: 'Real-time collaborative AI over Revit',
    mediaHint: 'CLIP 05 · Yjs/CRDT · multi-agent · custom query lang',
  },
  {
    tag: 'Product · founding engineer',
    year: 'SlidelyAI (YC) · 2025–present',
    title: 'Shipping an AI product across desktop, web & cloud',
    role: 'Windows add-in · web app · AI orchestration · infra',
    paragraphs: [
      <>
        Own the Windows software, the web app, the AI orchestration layer and the cloud infra.
        Unlocked web-app integration <b className="hard">inside PowerPoint</b> and ported legacy
        Windows add-ins to macOS with full parity.
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
    mediaLabel: 'AI slides, native inside PowerPoint',
    mediaHint: 'CLIP 06 · graphics tracing · cross-platform',
  },
];

export interface GalleryData {
  src?: string;
  tall?: boolean;
  caption: string;
}

export const gallery: GalleryData[] = [
  { tall: true, caption: '5-axis deposition machine — the full rig I designed and built' },
  { caption: 'Deposition head — tuned to land material on a 100µm spot' },
  { caption: 'Custom potentiostat board (RP2040) running embassy-rs firmware' },
  { tall: true, caption: 'RF/DC sputtering chamber — rebuilt from a full teardown' },
  { caption: 'Multiplexed sensor array, DLP-patterned at 50µm' },
  { caption: 'Rust (egui) control software driving the machine' },
  { tall: true, caption: 'The measurement station I set up at the Nanobiosensor Lab' },
  { caption: 'SVG toolpath → generated process, on screen' },
];

export interface TimelineData {
  when: string;
  role: string;
  org: ReactNode;
  desc: string;
}

export const timeline: TimelineData[] = [
  {
    when: 'FEB 2025 — PRESENT',
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

export const capabilities: CapabilityData[] = [
  { title: 'Languages', items: ['Rust', 'TypeScript', 'Python', 'C', 'C# / VB (.NET)'] },
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
    title: 'AI & Agents',
    items: [
      'Agentic workflows',
      'RAG',
      'LangGraph',
      'Qdrant',
      'Context engineering',
      'Computer vision',
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
  sub: "I'm most useful where hardware meets software and nobody's sure it can be done. Based in Bengaluru and happy to relocate.",
  footLeft: 'JAI SHUKLA · BUILDER · HARDWARE ↔ SOFTWARE',
  footRight: 'MACHINE → FIRMWARE → SOFTWARE → MODEL',
};
