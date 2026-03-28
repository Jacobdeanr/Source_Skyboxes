'use client';

import { ReactNode, useState } from 'react';

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

export function ParamSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  
  return (
    <section>
      <h4
        className="
          mb-2
          text-sm font-bold uppercase tracking-wider
        "
      >
        {title}
      </h4>

      <dl
        className="
          grid grid grid-cols-[9.5rem_1fr]
          gap-y-2 gap-x-4
          text-sm
          font-sans
        "
      >
        {children}
      </dl>
    </section>
    
  );
}

export function CopyableValue({
  value,
}: {
  value: string | number;
}) {
  const [copied, setCopied] = useState(false);
  const text = String(value);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex max-w-full cursor-pointer select-none items-center gap-2 text-left text-[color:var(--foreground-soft)] transition-colors hover:text-white focus:outline-none focus-visible:text-white"
      aria-label={copied ? `Copied ${text}` : `Copy value ${text}`}
      title={copied ? 'Copied' : 'Copy'}
    >
      <span className="font-mono text-[13px] whitespace-nowrap">{text}</span>
      <span className="flex h-6 w-6 shrink-0 items-center justify-center text-[color:var(--foreground-muted)] opacity-0 transition-[opacity,color] duration-150 hover:text-white group-hover:opacity-100 group-focus-within:opacity-100 focus-within:opacity-100">
        <CopyGlyph copied={copied} />
      </span>
    </button>
  );
}

export function ParamRow({
  label,
  children,
}: {
  label: string;
  children?: ReactNode;
}) {
  return (
    <>
      <dt className="text-[color:var(--foreground-muted)]">{label}</dt>
      <dd className="group">
        {children ?? (
          <span className="italic text-[color:var(--foreground-muted)]">N/A</span>
        )}
      </dd>
    </>
  );
}
