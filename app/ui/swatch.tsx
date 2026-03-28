'use client';

import { useState } from 'react';

function CopyGlyph({ copied }: { copied: boolean }) {
  if (copied) {
    return (
      <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M6.2 11.6 2.9 8.3l1.1-1.1 2.2 2.2 5.8-5.8 1.1 1.1z" />
      </svg>
    );
  }

  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M5 2.5A1.5 1.5 0 0 1 6.5 1h5A1.5 1.5 0 0 1 13 2.5v7A1.5 1.5 0 0 1 11.5 11h-5A1.5 1.5 0 0 1 5 9.5z" />
      <path d="M3.5 5A1.5 1.5 0 0 0 2 6.5v6A1.5 1.5 0 0 0 3.5 14h5A1.5 1.5 0 0 0 10 12.5V12H6.5A2.5 2.5 0 0 1 4 9.5V5z" />
    </svg>
  );
}

type SwatchProps = { rgb: number[] };

export function Swatch({ rgb }: SwatchProps) {
  const [copied, setCopied] = useState(false);
  const [r, g, b] = rgb;
  const color = `rgb(${r},${g},${b})`;
  const values = rgb.join(' ');

  async function copy() {
    await navigator.clipboard.writeText(values);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group relative inline-flex max-w-full cursor-pointer select-none items-center text-left text-[color:var(--foreground-soft)] transition-colors hover:text-white focus:outline-none focus-visible:text-white"
      title={copied ? 'Copied!' : color}
      aria-label={copied ? `Copied ${values}` : `Copy color value ${values}`}
    >
      <span
        className="absolute -left-4 top-1/2 h-2.5 w-2.5 shrink-0 -translate-y-1/2 rounded-full border border-white/10"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      <span className="whitespace-nowrap font-mono text-[13px]">
        {values}
      </span>
      <span className="ml-2 flex h-6 w-6 shrink-0 items-center justify-center text-[color:var(--foreground-muted)] opacity-0 transition-[opacity,color] duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:text-white">
        <CopyGlyph copied={copied} />
      </span>
    </button>
  );
}
