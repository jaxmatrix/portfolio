'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './VoiceoverDemo.module.css';

/** A labelled markdown snippet offered as a starting point. */
export interface VoiceoverSample {
  label: string;
  markdown: string;
}

export interface VoiceoverDemoProps {
  /** Preset snippets shown as buttons above the editor. The first one loads on mount. */
  samples: VoiceoverSample[];
  /**
   * Directory holding the `wasm-pack --target web` output, served from `public/`.
   * Both the JS glue and the `.wasm` beside it are fetched from here.
   */
  wasmBase?: string;
  /**
   * Conversion of `samples[0]`, pre-computed at authoring time.
   *
   * Shown before the engine finishes loading and kept if it never does, so the
   * prerendered HTML carries a real before/after instead of an empty pane.
   */
  fallbackOutput: string;
  className?: string;
}

/** The two exports this component calls on the generated wasm-bindgen module. */
interface VoiceoverModule {
  default: (init?: { module_or_path: string }) => Promise<unknown>;
  convert_markdown_to_voiceover: (markdown: string) => string;
}

type EngineState = 'loading' | 'ready' | 'unavailable';

/* Long enough that a held key does not queue a conversion per character, short
   enough that the output still feels like it is tracking the typing. */
const DEBOUNCE_MS = 120;

/**
 * Live markdown → speech-text converter, running the real `mjx-md-voiceover`
 * engine compiled to WebAssembly.
 *
 * What ships here is the *parser*, not a voice — it converts markdown into the
 * string you would hand to a TTS engine, and stops there. Playback is pending a
 * hosted voice service; the browser's built-in `speechSynthesis` was tried and
 * dropped, because it is silently unavailable on a good share of Linux setups
 * and the voices elsewhere are poor enough to argue against the thing the demo
 * is trying to demonstrate.
 */
export function VoiceoverDemo({
  samples,
  wasmBase = '/wasm/md-voiceover/',
  fallbackOutput,
  className,
}: VoiceoverDemoProps) {
  const [markdown, setMarkdown] = useState(samples[0]?.markdown ?? '');
  const [output, setOutput] = useState(fallbackOutput);
  const [engine, setEngine] = useState<EngineState>('loading');
  const convert = useRef<((markdown: string) => string) | null>(null);

  /* Loaded once, on mount. The glue module is fetched by URL rather than
     imported statically so that nothing about the wasm reaches the server
     bundle or the prerender. */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const mod: VoiceoverModule = await import(
          /* webpackIgnore: true */ /* turbopackIgnore: true */
          `${wasmBase}mjx_md_voiceover_wasm.js`
        );
        await mod.default({ module_or_path: `${wasmBase}mjx_md_voiceover_wasm_bg.wasm` });
        if (cancelled) return;

        convert.current = mod.convert_markdown_to_voiceover;
        setEngine('ready');
      } catch {
        if (!cancelled) setEngine('unavailable');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [wasmBase]);

  /* Re-converts on input and on the engine arriving, so the pane catches up
     with whatever was typed while the wasm was still downloading. */
  useEffect(() => {
    if (engine !== 'ready' || !convert.current) return;

    const timer = setTimeout(() => {
      try {
        setOutput(convert.current?.(markdown) ?? '');
      } catch {
        setOutput('');
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [markdown, engine]);

  return (
    <div className={[styles.demo, className].filter(Boolean).join(' ')}>
      <div className={styles.samples}>
        {samples.map((sample) => (
          <button
            key={sample.label}
            type="button"
            className={styles.sample}
            aria-pressed={markdown === sample.markdown}
            onClick={() => setMarkdown(sample.markdown)}
          >
            {sample.label}
          </button>
        ))}
      </div>

      <div className={styles.panes}>
        <div className={styles.pane}>
          <label className={styles.paneTitle} htmlFor="voiceover-input">
            Markdown in
          </label>
          <textarea
            id="voiceover-input"
            className={styles.input}
            value={markdown}
            spellCheck={false}
            onChange={(event) => setMarkdown(event.target.value)}
          />
        </div>

        <div className={styles.pane}>
          <p className={styles.paneTitle}>
            Speech out
            {engine === 'loading' && <span className={styles.badge}>loading engine…</span>}
            {engine === 'unavailable' && <span className={styles.badge}>engine offline</span>}
          </p>
          <output className={styles.output} aria-live="polite">
            {output}
          </output>
          <p className={styles.soon}>
            <span className={styles.soonMark}>▶</span> Read aloud — coming soon
          </p>
        </div>
      </div>

      <p className={styles.note}>
        {engine === 'unavailable'
          ? 'The WebAssembly engine could not load, so this is showing a pre-computed conversion.'
          : 'The conversion is the Rust engine compiled to WebAssembly, running in this tab — nothing is sent anywhere.'}
      </p>
    </div>
  );
}

export default VoiceoverDemo;
