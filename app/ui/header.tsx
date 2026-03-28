'use client';

import Link from 'next/link';
import type { Dispatch, SetStateAction } from 'react';

import type { QuickFilter } from '../lib/catalog';
import IconLink from './iconlink';
import { profileLinks } from './profile-links';
import SortSelect from './sort-select';
import { SortOption } from './sort-types';

interface HeaderProps {
  sort: SortOption;
  setSort: Dispatch<SetStateAction<SortOption>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  quickFilter: QuickFilter;
  setQuickFilter: Dispatch<SetStateAction<QuickFilter>>;
}

const quickFilters: { id: QuickFilter; label: string }[] = [
  { id: 'all', label: 'All skies' },
  { id: 'clear', label: 'Clear light' },
  { id: 'cloudy', label: 'Cloud cover' },
  { id: 'storm', label: 'Storm mood' },
  { id: 'dawn', label: 'Early light' },
  { id: 'sunset', label: 'Sunset glow' },
  { id: 'night', label: 'Night skies' },
  { id: 'dramatic', label: 'Dramatic' },
  { id: 'favorites', label: 'Community favorites' },
];

export default function Header({
  sort,
  setSort,
  query,
  setQuery,
  quickFilter,
  setQuickFilter,
}: HeaderProps) {
  return (
    <header className="border-b border-[color:var(--border-soft)]">
      <div className="mx-auto max-w-[1680px] px-5 py-5 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-5 border-b border-[color:var(--border-soft)] pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--foreground-muted)] transition-colors hover:text-white focus:outline-none focus-visible:text-white focus-visible:ring-2 focus-visible:ring-[color:var(--foreground-bright)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
            >
              <span aria-hidden="true">&larr;</span>
              Back to home
            </Link>
            <h1 className="mt-3 font-display text-2xl font-semibold tracking-[-0.04em] text-[color:var(--foreground-bright)] sm:text-3xl">
              Skybox Library
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--foreground-soft)] sm:text-[15px]">
              Browse a calm, curated set of skies chosen for readable lighting, dependable downloads, and moods worth lingering on.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-2" aria-label="Profile links">
            {profileLinks.map((link) => (
              <IconLink key={link.label} {...link} />
            ))}
          </nav>
        </div>

        <div className="grid gap-5 pt-5 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-end">
          <label className="block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--foreground-muted)]">
              Find a sky
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
                placeholder="Search by mood, weather, or time of day"
                className="block h-12 w-full border border-white/15 bg-[color:var(--background)] py-3 pl-11 pr-11 text-sm text-white placeholder:text-[#8c877f] outline-none transition-colors focus:border-white/40 focus-visible:ring-2 focus-visible:ring-[color:var(--foreground-bright)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute inset-y-0 right-0 flex min-w-11 items-center justify-center px-3 text-[color:var(--foreground-muted)] transition-colors hover:text-white focus:outline-none focus-visible:text-white"
                  aria-label="Clear search"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </label>

          <div>
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--foreground-muted)]">
              Browse by
            </span>
            <SortSelect value={sort} onChange={setSort} ariaLabel="Browse skies by grouping" />
          </div>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-3 pt-4" role="group" aria-label="Quick filters">
          {quickFilters.map((filter) => {
            const active = quickFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setQuickFilter(filter.id)}
                aria-pressed={active}
                className={`inline-flex min-h-11 items-center text-sm transition-colors focus:outline-none focus-visible:text-white focus-visible:ring-2 focus-visible:ring-[color:var(--foreground-bright)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)] ${
                  active
                    ? 'text-white underline underline-offset-4'
                    : 'text-[color:var(--foreground-soft)] hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
