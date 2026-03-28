'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import SkyboxCard from './ui/skyboxcard';
import type { SkyboxMeta } from './types/skybox';

interface ArchiveClientProps {
  slugs: string[];
  meta: Record<string, SkyboxMeta>;
}

function sortArchiveSlugs(slugs: string[], meta: Record<string, SkyboxMeta>): string[] {
  return [...slugs].sort((slugA, slugB) => {
    const dateA = Date.parse(meta[slugA]?.publishDate || '');
    const dateB = Date.parse(meta[slugB]?.publishDate || '');

    if (!Number.isNaN(dateA) && !Number.isNaN(dateB) && dateB !== dateA) {
      return dateB - dateA;
    }

    return slugA.localeCompare(slugB);
  });
}

export default function ArchiveClient({ slugs, meta }: ArchiveClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(searchParams.get('query') || '');
  }, [searchParams]);

  const urlState = useMemo(() => {
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    return params.toString();
  }, [query]);

  useEffect(() => {
    const current = searchParams.toString();
    if (current === urlState) {
      return;
    }

    router.replace(urlState ? `${pathname}?${urlState}` : pathname, { scroll: false });
  }, [pathname, router, searchParams, urlState]);

  const visibleSlugs = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? slugs.filter((slug) => {
          const entry = meta[slug];
          const haystack = [
            slug,
            entry?.description || '',
            entry?.timeOfDay || '',
            entry?.weatherCondition || '',
            ...(entry?.categories || []),
          ].join(' ').toLowerCase();

          return haystack.includes(q);
        })
      : slugs;

    return sortArchiveSlugs(filtered, meta);
  }, [meta, query, slugs]);

  return (
    <main className="app-shell">
      <div className="mx-auto max-w-[1680px] px-5 py-5 sm:px-6 lg:px-10">
        <section className="border-b border-[color:var(--border-soft)] pb-6">
          <Link
            href="/browse"
            className="inline-flex min-h-11 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--foreground-muted)] transition-colors hover:text-white focus:outline-none focus-visible:text-white"
          >
            <span aria-hidden="true">&larr;</span>
            Back to library
          </Link>
          <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-2">
            <h1 className="font-display text-3xl font-semibold tracking-[-0.04em] text-[color:var(--foreground-bright)] sm:text-4xl">
              Legacy Archive
            </h1>
            <p className="text-sm text-[color:var(--foreground-muted)]">
              {slugs.length} skies
            </p>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[color:var(--foreground-soft)] sm:text-[15px]">
            The original collection of skies, preserved for community history and older projects. These earlier releases are provided as-is, capturing the library&apos;s evolution over time.
          </p>
        </section>

        <section className="pt-6">
          <label className="block max-w-[760px]">
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--foreground-muted)]">
              Search the archive
            </span>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <svg className="h-4 w-4 text-[color:var(--foreground-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find a legacy sky..."
                className="block h-12 w-full border border-white/10 bg-[color:var(--background)] py-3 pl-11 pr-11 text-sm text-white placeholder:text-[#8c877f] outline-none transition-colors focus:border-white/35 focus-visible:ring-2 focus-visible:ring-[color:var(--foreground-bright)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute inset-y-0 right-0 flex min-w-11 items-center justify-center px-3 text-[color:var(--foreground-muted)] transition-colors hover:text-white focus:outline-none focus-visible:text-white"
                  aria-label="Clear archive search"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </label>
        </section>

        <section className="pt-8">
          {visibleSlugs.length === 0 ? (
            <div className="border-t border-[color:var(--border-soft)] py-16 text-center">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--foreground-muted)]">No results</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-white">
                Nothing surfaced from that archive search.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[color:var(--foreground-muted)]">
                Try a broader term to dig back through the older collection.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {visibleSlugs.map((slug) => (
                <SkyboxCard key={slug} slug={slug} meta={meta[slug] || {}} stateQuery={urlState} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
