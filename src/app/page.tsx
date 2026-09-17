import Link from 'next/link';
import { getAllPosts } from '../lib/blog';

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      {/* ====================================================================
          Hero Section: Entrepreneur Command Center
          ==================================================================== */}
      <section className="hero-section" id="top">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-left-column">
              <div className="hero-tag">
                <span>JAI SHUKLA — FOUNDER-OPERATOR</span>
              </div>
              
              <h1 className="hero-title">
                I TAKE BUSINESS BETS<br />TO <em>SHIPPED</em> OUTCOMES.
              </h1>
              
              <p className="hero-mission">
                Biosensor scientist turned founder. I&apos;ve shipped enterprise AI inside PowerPoint, built precision machines to 10µm, and taken a 5-platform agent product to stores in 5 weeks. If the blocker is below the app, I go build it.
              </p>

              {/* 3 operator proof metrics */}
              <div className="hero-metrics-row">
                <div className="metric-block">
                  <div className="metric-number green">5 WEEKS</div>
                  <div className="metric-desc">first commit to Play Store beta · 1,100+ commits led by me</div>
                </div>
                <div className="metric-block">
                  <div className="metric-number plasma">5 PAPERS</div>
                  <div className="metric-desc">peer-reviewed · 29 citations · h-index 3</div>
                </div>
                <div className="metric-block">
                  <div className="metric-number">uFabrication</div>
                  <div className="metric-desc">precision I closed the loop on · mechanics to vision</div>
                </div>
              </div>

              {/* Character Command HUD Bar */}
              <div className="character-bar">
                <div className="character-avatar-wrap">
                  <img 
                    src="/mjx_avatar.png" 
                    alt="Jai Shukla" 
                    className="character-avatar-img"
                  />
                  <span className="character-badge-text">JAI SHUKLA</span>
                </div>
                <div className="character-meta">
                  <div className="meta-line">
                    <span className="meta-key">NOW:</span>
                    <span className="meta-val">Operating Allr</span>
                  </div>
                  <div className="meta-line">
                      <span className="meta-key">DEPT:</span>
                      <span className="meta-val" style={{ color: 'var(--pixel-amber)' }}>Own the outcome — from ops down to metal</span>
                    </div>
                </div>
              </div>

              {/* Primary Calls to Action */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href="#quests" className="pixel-btn primary">SEE HOW I OPERATE ▼</a>
                <a href="https://calendly.com/jaishukla7768/30min" target="_blank" rel="noreferrer" className="pixel-btn">BOOK 30-MIN CHAT ↗</a>
                <a href="https://github.com/jaxmatrix" target="_blank" rel="noreferrer" className="pixel-btn">GITHUB ↗</a>
              </div>
            </div>

            {/* Hero Visual Column */}
            <div className="hero-right-column">
              <div className="crt-monitor">
                <div className="crt-monitor-top">
                  <span>CRT-01 // OPERATOR STATION</span>
                  <span>16-BIT RETRO HUD</span>
                </div>
                <img 
                  src="/hero_pixel_lab.png" 
                  alt="Operator command lab pixel art" 
                  className="crt-image"
                />
                <div className="crt-monitor-bottom">
                  <span>RAISE · SHIP · PRECISION</span>
                  <span>FOUNDER-OPERATOR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          Open Projects — Live Code Tiles
          ==================================================================== */}
      <section className="page-section" id="projects">
        <div className="wrap">
          <div className="section-title-banner">
            <div className="section-tag-badge">OPEN SOURCE</div>
            <h2 className="section-heading">PROJECTS</h2>
            <div className="section-subtext">LIVE REPOS · ACTIVE COMMITS · RUST + AGENTS</div>
          </div>

          <div className="builds-grid-cards">
            {/* Project 1: MacroHard / mjx-ooxml-rs */}
            <div className="system-build-card">
              <div className="system-build-body">
                <div className="build-meta-year">RUST · 2026 — PRESENT</div>
                <h3 className="build-meta-title">MacroHard — mjx-ooxml-rs</h3>
                <div className="build-meta-role">OOXML parser & renderer from scratch</div>
                <p className="build-meta-summary">
                  Building an OOXML parser and renderer from the ground up using open standards
                  so AI agents don&apos;t have to dump OOXML to create office documents. Designed
                  from day one so humans and AI can collaborate on the same office files.
                </p>
                <div className="build-card-links">
                  <a href="https://github.com/jaxmatrix/mjx-ooxml-rs" target="_blank" rel="noreferrer" className="build-inline-btn">GITHUB ↗</a>
                </div>
              </div>
            </div>

            {/* Project 2: mjx-md-voiceover */}
            <div className="system-build-card">
              <div className="system-build-body">
                <div className="build-meta-year">RUST · 2026</div>
                <h3 className="build-meta-title">mjx-md-voiceover</h3>
                <div className="build-meta-role">Markdown → speech-friendly text</div>
                <p className="build-meta-summary">
                  A Rust engine that rewrites markdown into speech-friendly text before it
                  reaches a TTS voice — &ldquo;Heading: Objective&rdquo; instead of
                  &ldquo;hash hash hash Objective&rdquo;. 43% less synthesis compute.
                  Compiled to WASM and runs in the browser.
                </p>
                <div className="build-card-links">
                  <a href="https://github.com/jaxmatrix/mjx-md-voiceover" target="_blank" rel="noreferrer" className="build-inline-btn">GITHUB ↗</a>
                </div>
              </div>
            </div>

            {/* Project 3: mjx-acp-agent */}
            <div className="system-build-card">
              <div className="system-build-body">
                <div className="build-meta-year">RUST · 2026</div>
                <h3 className="build-meta-title">mjx-acp-agent</h3>
                <div className="build-meta-role">ACP transport for background coding agents</div>
                <p className="build-meta-summary">
                  A Zed-inspired project that creates an ACP client-server transport over HTTP
                  to control coding agents running in the background. Gives you the ability to
                  orchestrate and drive multiple agent sessions from one surface.
                </p>
                <div className="build-card-links">
                  <a href="https://github.com/jaxmatrix/mjx-acp-agent" target="_blank" rel="noreferrer" className="build-inline-btn">GITHUB ↗</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          Story Chapters: The Entrepreneurial Odyssey (Act I - IV)
          ==================================================================== */}
      <section className="page-section" id="quests">
        <div className="wrap">
          <div className="section-title-banner">
            <div className="section-tag-badge">THE RECORD</div>
            <h2 className="section-heading">HOW I OPERATE</h2>
            <div className="section-subtext">BUSINESS BET → WHAT I OWNED → SHIPPED OUTCOME</div>
          </div>

          <div className="chapters-container">
            {/* Stage 04 */}
            <article className="chapter-row active-raid">
              <div className="chapter-top-meta">
                <span className="chapter-stage-label">01 // CURRENT BET — OPERATING ALLR (2026 — PRESENT)</span>
                <span className="chapter-year-badge">MY SCOPE: CLIENT · RUNTIME · GTM</span>
              </div>
              <h3 className="chapter-title">I decided to own distribution end-to-end</h3>
              <div className="chapter-role">Founder operating Allr</div>
              
              <p className="chapter-main-narrative">
                I took the bet that agents need more than help building a product in a silo — they need a harness that builds the business around it. I led the 5-week push from first commit to Play Store beta and I run the build cadence that keeps it shipping.
              </p>

              <div className="story-callouts-grid">
                <div className="story-callout">
                  <div className="story-callout-header green">WHAT I OWNED:</div>
                  <div className="story-callout-text">
                    The 5-platform client, the release push, and the agent runtime — <strong>1,100+ commits in 5 weeks to a live store beta</strong>, built as a harness for shipping product plus the business around it.
                  </div>
                </div>
              </div>
            </article>

            {/* Stage 03 */}
            <article className="chapter-row">
              <div className="chapter-top-meta">
                <span className="chapter-stage-label">02 // VENTURE OPERATOR (2024 — 2026)</span>
                <span className="chapter-year-badge">SLIDELYAI (YC) · VASINYA YUNAAN</span>
              </div>
              <h3 className="chapter-title">I learned to ship inside constraints</h3>
              <div className="chapter-role">Founding Engineer (SlidelyAI) · Founder (Vasinya Yunaan)</div>
              
              <p className="chapter-main-narrative">
                Two business moves: I unblocked enterprise revenue by shipping AI inside PowerPoint, and I turned 10,000 patents into a market story. Then I left to own destiny full-time.
              </p>

              <div className="story-callouts-grid">
                <div className="story-callout">
                  <div className="story-callout-header amber">MOVE 1 — UNBLOCK REVENUE:</div>
                  <div className="story-callout-text">
                    Shipped native AI generation <strong>inside Microsoft PowerPoint</strong> — Windows engine, web app, and cloud infra I owned.
                  </div>
                </div>

                <div className="story-callout">
                  <div className="story-callout-header green">MOVE 2 — TURN DATA INTO A STORY:</div>
                  <div className="story-callout-text">
                    Built patent intelligence over <strong>10,000+ patents</strong>, pitched investors, and validated the market.
                  </div>
                </div>
              </div>
            </article>

            {/* Stage 02 */}
            <article className="chapter-row">
              <div className="chapter-top-meta">
                <span className="chapter-stage-label">03 // MACHINE OWNER (2023 — 2024)</span>
                <span className="chapter-year-badge">UTOPIC TECH</span>
              </div>
              <h3 className="chapter-title">I owned precision, not just code</h3>
              <div className="chapter-role">Scientist — Machine Design &amp; Motion Control</div>
              
              <p className="chapter-main-narrative">
                The business needed a machine that lands material on target. I designed and built it — then killed the vibration that was missing, and wrote the control software that runs it. Closed the loop to 10µm.
              </p>

              <div className="story-callouts-grid">
                <div className="story-callout">
                  <div className="story-callout-header amber">WHAT I OWNED:</div>
                  <div className="story-callout-text">
                    Full machine, motion stack, and Rust operator station — <strong>10µm closed-loop precision</strong> from mechanics to vision.
                  </div>
                </div>
              </div>
            </article>

            {/* Stage 01 */}
            <article className="chapter-row">
              <div className="chapter-top-meta">
                <span className="chapter-stage-label">04 // LAB ORIGIN (2016 — 2023)</span>
                <span className="chapter-year-badge">IIT KHARAGPUR · GSoC</span>
              </div>
              <h3 className="chapter-title">Where the instinct formed</h3>
              <div className="chapter-role">Biosensor researcher · instrument maker</div>
              
              <p className="chapter-main-narrative">
                When the instrument I needed didn&apos;t exist, I built it — potentiostat, firmware, fabrication process. That habit never left. 5 papers, 29 citations, h-index 3.
              </p>

              <div className="story-callouts-grid">
                <div className="story-callout">
                  <div className="story-callout-header cyan">WHAT I OWNED:</div>
                  <div className="story-callout-text">
                    Custom instruments, embedded firmware, and lab processes from scratch — including a <strong>vacuum system rebuilt from teardown</strong>.
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ====================================================================
          Production Builds & Systems (The Armory)
          ==================================================================== */}
      <section className="page-section" id="builds">
        <div className="wrap">
          <div className="section-title-banner">
            <div className="section-tag-badge">PROOF</div>
            <h2 className="section-heading">SELECTED OUTCOMES</h2>
            <div className="section-subtext">FIVE TIMES I TOOK IT FROM BET TO SHIPPED</div>
          </div>

          <div className="builds-grid-cards">
            {/* Build 1: Allr — my scope */}
            <div className="system-build-card">
              <div className="system-build-thumb">
                <span className="thumb-tag-badge">2026 — PRESENT</span>
                <img src="/builds/allr.webp" alt="Allr — my scope" className="system-build-img" />
              </div>
              <div className="system-build-body">
                <h3 className="build-meta-title">Allr — harness for product + business</h3>
                <p className="build-meta-summary">
                  <strong>Bet:</strong> agents need more than help building a product in a silo — they need a harness that builds the business around it.<br />
                  <strong>Move:</strong> I led the client, runtime, and release push.<br />
                  <strong>Outcome:</strong> Play Store beta in 5 weeks, 1,100+ commits.
                </p>
                <div className="build-card-links">
                  <a href="https://allr.work" target="_blank" rel="noreferrer" className="build-inline-btn">ALLR.WORK ↗</a>
                </div>
              </div>
            </div>

            {/* Build 2: SlidelyAI */}
            <div className="system-build-card">
              <div className="system-build-thumb">
                <span className="thumb-tag-badge">2025–26 · SLIDELYAI (YC)</span>
                <img src="/builds/slidely.webp" alt="SlidelyAI — AI inside PowerPoint" className="system-build-img" />
              </div>
              <div className="system-build-body">
                <h3 className="build-meta-title">AI inside PowerPoint</h3>
                <p className="build-meta-summary">
                  <strong>Bet:</strong> unblock enterprise revenue inside Office.<br />
                  <strong>Move:</strong> I owned the Windows engine, web app, and infra.<br />
                  <strong>Outcome:</strong> editable AI slides shipped in-product.
                </p>
              </div>
            </div>

            {/* Build 3: 5-Axis Machine */}
            <div className="system-build-card">
              <div className="system-build-thumb">
                <span className="thumb-tag-badge">2023–24 · UTOPIC TECH</span>
                <img src="/builds/deposition-machine.webp" alt="5-axis machine I built" className="system-build-img" />
              </div>
              <div className="system-build-body">
                <h3 className="build-meta-title">Precision machine that lands on target</h3>
                <p className="build-meta-summary">
                  <strong>Bet:</strong> deliver deposition that actually lands.<br />
                  <strong>Move:</strong> I built the machine and its Rust control software.<br />
                  <strong>Outcome:</strong> 10µm closed-loop precision.
                </p>
              </div>
            </div>

            {/* Build 4: Potentiostat */}
            <div className="system-build-card">
              <div className="system-build-thumb">
                <span className="thumb-tag-badge">2021–23 · IIT KHARAGPUR</span>
                <img src="/builds/potentiostat.webp" alt="Instrument I built" className="system-build-img" />
              </div>
              <div className="system-build-body">
                <h3 className="build-meta-title">Instrument that didn&apos;t exist</h3>
                <p className="build-meta-summary">
                  <strong>Bet:</strong> run experiments with no instrument budget.<br />
                  <strong>Move:</strong> I built the hardware and firmware myself.<br />
                  <strong>Outcome:</strong> working lab instrument + published papers.
                </p>
              </div>
            </div>

            {/* Build 5: Dexkitty */}
            <div className="system-build-card">
              <div className="system-build-thumb">
                <span className="thumb-tag-badge">2026 · INVENTION</span>
                <img src="/builds/dexkitty.webp" alt="Dexkitty — agents over CAD" className="system-build-img" />
              </div>
              <div className="system-build-body">
                <h3 className="build-meta-title">Agents that read CAD geometry</h3>
                <p className="build-meta-summary">
                  <strong>Bet:</strong> let agents co-edit Revit without blowing context.<br />
                  <strong>Move:</strong> I designed the query layer and sync engine.<br />
                  <strong>Outcome:</strong> human-AI co-editing that holds up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          Blog Essays & Technical Transmissions Preview
          ==================================================================== */}
      {posts.length > 0 && (
        <section className="page-section" id="blog-preview">
          <div className="wrap">
            <div className="section-title-banner">
              <div className="section-tag-badge">TRANSMISSIONS</div>
              <h2 className="section-heading">ENGINEERING ESSAYS &amp; DEEP DIVES</h2>
              <div className="section-subtext">RUST ARCHITECTURE, PARSERS &amp; AGENT PROTOCOLS</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
              {posts.map((post) => (
                <article key={post.slug} className="chapter-row" style={{ padding: '22px' }}>
                  <div className="chapter-top-meta">
                    <span className="chapter-stage-label" style={{ color: 'var(--pixel-amber)' }}>
                      LOG_ENTRY // {post.dateDisplay.toUpperCase()}
                    </span>
                    <span className="chapter-year-badge">{post.readingMinutes} MIN READ</span>
                  </div>
                  <h3 className="chapter-title" style={{ fontSize: '15px' }}>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="chapter-main-narrative" style={{ fontSize: '13.5px', marginBottom: '16px' }}>
                    {post.summary}
                  </p>
                  <div className="loot-row" style={{ justifyContent: 'space-between' }}>
                    <div className="loot-tags">
                      {post.tags.map((t) => (
                        <span key={t} className="chip-tag rare">{t}</span>
                      ))}
                    </div>
                    <Link href={`/blog/${post.slug}`} className="pixel-btn" style={{ fontSize: '11px', padding: '6px 12px' }}>
                      READ LOG ➔
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ====================================================================
          Hardware Artifacts & Lab Bench Relics
          ==================================================================== */}
      <section className="page-section" id="vault">
        <div className="wrap">
          <div className="section-title-banner">
            <div className="section-tag-badge">HANDS-ON</div>
            <h2 className="section-heading">BUILT WITH MY HANDS</h2>
            <div className="section-subtext">FIVE PHOTOS THAT PROVE OWNERSHIP</div>
          </div>

          <div className="vault-masonry">
            <div className="vault-item-frame">
              <div className="vault-media-box">
                <img src="/gallery/deposition-rig.webp" alt="Machine I built" />
              </div>
              <div className="vault-caption-text">The 5-axis machine I designed and built — I owned the precision.</div>
            </div>

            <div className="vault-item-frame">
              <div className="vault-media-box">
                <img src="/gallery/sputtering-chamber.webp" alt="Vacuum system I rebuilt" />
              </div>
              <div className="vault-caption-text">Dead vacuum system I tore down and rebuilt to working.</div>
            </div>

            <div className="vault-item-frame">
              <div className="vault-media-box">
                <img src="/gallery/clothes-peg-connector.webp" alt="Resourceful fix" />
              </div>
              <div className="vault-caption-text">No adapter in the building — I made one from a clothes peg.</div>
            </div>

            <div className="vault-item-frame">
              <div className="vault-media-box">
                <img src="/gallery/multiplexed-sensor.webp" alt="Sensors I fabricated" />
              </div>
              <div className="vault-caption-text">Sensors I fabricated at 50µm without a cleanroom.</div>
            </div>

            <div className="vault-item-frame">
              <div className="vault-media-box">
                <img src="/gallery/home-lab.webp" alt="Where it started" />
              </div>
              <div className="vault-caption-text">Hostel workshop where the instinct formed.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Research strip — one line, link out */}
      <section className="page-section" id="research">
        <div className="wrap">
          <div className="section-title-banner">
            <div className="section-tag-badge">CREDENTIALS</div>
            <h2 className="section-heading">RESEARCH &amp; RECOGNITION</h2>
            <div className="section-subtext">5 PAPERS · 29 CITATIONS · H-INDEX 3 · IIT KHARAGPUR · 1ST INAE · 2ND SIEMENS</div>
          </div>

          <p className="chapter-main-narrative" style={{ textAlign: 'center', maxWidth: '70ch', margin: '0 auto 20px' }}>
            Peer-reviewed biosensor research plus national design honors. Full list lives on Scholar.
          </p>

          <div style={{ textAlign: 'center' }}>
            <a 
              href="https://scholar.google.com/citations?user=m6E0pHUAAAAJ&hl=en" 
              target="_blank" 
              rel="noreferrer" 
              className="pixel-btn primary"
            >
              GOOGLE SCHOLAR ↗
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================
          Character Abilities & Tech Matrix
          ==================================================================== */}
      <section className="page-section" id="skilltree">
        <div className="wrap">
          <div className="section-title-banner">
            <div className="section-tag-badge">CAPABILITIES</div>
            <h2 className="section-heading">OPERATOR CAPABILITIES</h2>
            <div className="section-subtext">WHAT I BRING TO A BET</div>
          </div>

          <div className="skilltree-quad" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <div className="skill-branch-panel">
              <div className="branch-name-row">
                <span>[RAISE &amp; CLOSE]</span>
              </div>
              <div className="branch-node-item"><span>Turn technical work into a market story</span></div>
            </div>

            <div className="skill-branch-panel">
              <div className="branch-name-row">
                <span>[SHIP TO STORE]</span>
              </div>
              <div className="branch-node-item"><span>Led 5-week push to Play Store beta</span></div>
              <div className="branch-node-item"><span>Run build cadence across 5 platforms</span></div>
            </div>

            <div className="skill-branch-panel">
              <div className="branch-name-row">
                <span>[OWN PRECISION]</span>
              </div>
              <div className="branch-node-item"><span>Built machines, firmware, instruments</span></div>
              <div className="branch-node-item"><span>Close the loop — mechanics to vision</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          Founder Command Terminal Dossier
          ==================================================================== */}
      <section className="page-section" id="dossier">
        <div className="wrap">
          <div className="section-title-banner">
            <div className="section-tag-badge">CONTACT</div>
            <h2 className="section-heading">WORK WITH ME</h2>
            <div className="section-subtext">FOR UNCLEAR OUTCOMES WITH DEEP BLOCKERS</div>
          </div>

          <div className="terminal-hud-console">
            <div className="terminal-top-bar">
              <div className="term-lamp red"></div>
              <div className="term-lamp yellow"></div>
              <div className="term-lamp green"></div>
              <span className="term-title-text">JAI // OPERATOR</span>
            </div>

            <div className="terminal-body">
              <p>
                I&apos;m most useful when the outcome is unclear and the blocker runs deep. I&apos;ll own it from ops to metal. Currently operating Allr.
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '18px' }}>
                <a href="mailto:jaishukla7768@gmail.com" className="pixel-btn primary">EMAIL ME ↗</a>
                <a href="https://calendly.com/jaishukla7768/30min" target="_blank" rel="noreferrer" className="pixel-btn">BOOK 30-MIN CHAT ↗</a>
                <a href="https://github.com/jaxmatrix" target="_blank" rel="noreferrer" className="pixel-btn">GITHUB ↗</a>
                <a href="https://www.linkedin.com/in/jaxmatrix" target="_blank" rel="noreferrer" className="pixel-btn">LINKEDIN ↗</a>
                <a href="https://scholar.google.com/citations?user=m6E0pHUAAAAJ&hl=en" target="_blank" rel="noreferrer" className="pixel-btn">SCHOLAR ↗</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
