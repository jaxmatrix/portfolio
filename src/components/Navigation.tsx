'use client';

import { useState } from 'react';
import Link from 'next/link';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <>
      <header className="hud-nav">
        <div className="brand-logo">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/mjx_avatar.png" alt="MJX 8-bit Brand Logo" className="pixel-avatar-mini" />
            <div className="brand-title">MJX<span>.EXE</span></div>
          </Link>
        </div>
        <nav className="hud-links">
          <Link href="/#projects">PROJECTS</Link>
          <Link href="/#quests">RECORD</Link>
          <Link href="/#builds">OUTCOMES</Link>
          <Link href="/#vault">HANDS-ON</Link>
          <Link href="/#research">RESEARCH</Link>
          <Link href="/#skilltree">CAPABILITIES</Link>
          <Link href="/blog">BLOG</Link>
          <Link href="/#dossier">CONTACT</Link>
        </nav>
        <div className="hud-right">
          <a href="https://calendly.com/jaishukla7768/30min" className="pixel-btn primary" target="_blank" rel="noreferrer">
            BOOK CHAT ↗
          </a>
          <a href="/jai-shukla-resume.pdf" className="pixel-btn" target="_blank" rel="noreferrer">
            RÉSUMÉ ↗
          </a>
          <button 
            className={`menu-toggle ${isOpen ? 'open' : ''}`} 
            onClick={toggle} 
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
        <Link href="/#projects" onClick={close}>
          <span>PROJECTS</span><span>➔</span>
        </Link>
        <Link href="/#quests" onClick={close}>
          <span>RECORD</span><span>➔</span>
        </Link>
        <Link href="/#builds" onClick={close}>
          <span>OUTCOMES</span><span>➔</span>
        </Link>
        <Link href="/#vault" onClick={close}>
          <span>HANDS-ON</span><span>➔</span>
        </Link>
        <Link href="/#research" onClick={close}>
          <span>RESEARCH</span><span>➔</span>
        </Link>
        <Link href="/#skilltree" onClick={close}>
          <span>CAPABILITIES</span><span>➔</span>
        </Link>
        <Link href="/blog" onClick={close}>
          <span>BLOG</span><span>➔</span>
        </Link>
        <Link href="/#dossier" onClick={close}>
          <span>CONTACT</span><span>➔</span>
        </Link>
        <a href="https://calendly.com/jaishukla7768/30min" target="_blank" rel="noreferrer" onClick={close}>
          <span>BOOK 30-MIN CHAT</span><span>↗</span>
        </a>
        <a href="/jai-shukla-resume.pdf" target="_blank" rel="noreferrer" onClick={close}>
          <span>RÉSUMÉ</span><span>↗</span>
        </a>
      </div>
    </>
  );
}
