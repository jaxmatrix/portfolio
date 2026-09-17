'use client';

import { useEffect, useRef, useState } from 'react';

export interface VoiceoverSample {
  label: string;
  markdown: string;
}

export interface VoiceoverDemoProps {
  samples: VoiceoverSample[];
  wasmBase?: string;
  fallbackOutput: string;
}

interface VoiceoverModule {
  default: (init?: { module_or_path: string }) => Promise<unknown>;
  convert_markdown_to_voiceover: (markdown: string) => string;
}

type EngineState = 'loading' | 'ready' | 'unavailable';

const DEBOUNCE_MS = 100;

export function VoiceoverDemo({
  samples,
  wasmBase = '/wasm/md-voiceover/',
  fallbackOutput,
}: VoiceoverDemoProps) {
  const [markdown, setMarkdown] = useState(samples[0]?.markdown ?? '');
  const [output, setOutput] = useState(fallbackOutput);
  const [engine, setEngine] = useState<EngineState>('loading');
  const convert = useRef<((markdown: string) => string) | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const mod: VoiceoverModule = await import(
          /* webpackIgnore: true */
          `${wasmBase}mjx_md_voiceover_wasm.js`
        );
        await mod.default({ module_or_path: `${wasmBase}mjx_md_voiceover_wasm_bg.wasm` });
        if (cancelled) return;

        convert.current = mod.convert_markdown_to_voiceover;
        setEngine('ready');
      } catch (err) {
        if (!cancelled) setEngine('unavailable');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [wasmBase]);

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
    <div className="voiceover-demo-card">
      <div className="voiceover-header">
        <span className="voiceover-title">⚡ INTERACTIVE WASM DEMO // MJX-MD-VOICEOVER</span>
        <span className={`voiceover-badge ${engine}`}>
          {engine === 'ready' ? '● WASM READY (LOCAL)' : engine === 'loading' ? '○ COMPILING WASM...' : '⚠️ PREVIEW'}
        </span>
      </div>

      <div className="voiceover-samples">
        <span style={{ fontSize: '11px', color: 'var(--ink-dim)', marginRight: '6px', alignSelf: 'center', fontFamily: 'var(--font-pixel-sub)' }}>PRESETS:</span>
        {samples.map((sample) => (
          <button
            key={sample.label}
            type="button"
            className={`sample-btn ${markdown === sample.markdown ? 'active' : ''}`}
            onClick={() => setMarkdown(sample.markdown)}
          >
            {sample.label}
          </button>
        ))}
      </div>

      <div className="voiceover-panes">
        <div className="voiceover-pane">
          <label className="pane-label">INPUT: RAW MARKDOWN</label>
          <textarea
            className="pane-textarea"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            spellCheck={false}
          />
        </div>

        <div className="voiceover-pane">
          <label className="pane-label" style={{ color: 'var(--pixel-amber)' }}>OUTPUT: SPEECH FORMATTED (TTS FEED)</label>
          <div className="pane-output">
            {output}
          </div>
        </div>
      </div>
      <div style={{ marginTop: '10px', fontSize: '11.5px', color: 'var(--ink-dim)', display: 'flex', justifyContent: 'space-between' }}>
        <span>Runs 100% in-browser via Rust + wasm-bindgen (zero server round-trips)</span>
        <span>Zero-copy AST</span>
      </div>
    </div>
  );
}
