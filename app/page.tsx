import Image from 'next/image';
import Link from 'next/link';

import { withBase } from './lib/basepath';
import { getIndex, listSlugs } from './lib/skybox';
import { profileLinks } from './ui/profile-links';

export default function Page() {
  const slugs = listSlugs({ includeArchived: true });
  const meta = getIndex();
  const liveSlugs = slugs.filter((slug) => !meta[slug]?.archived);
  const featuredSlug =
    liveSlugs.find((slug) => slug === 'sky_sunset010_hdr')
    || liveSlugs.find((slug) => slug === 'sky_sunset009_hdr')
    || liveSlugs.find((slug) => slug === 'sky_cloudy017_hdr')
    || liveSlugs[0];
  const timeOfDayCount = new Set(
    liveSlugs
      .map((slug) => meta[slug]?.timeOfDay)
      .filter((value): value is string => Boolean(value)),
  ).size;
  const exrCount = liveSlugs.filter((slug) => Boolean(meta[slug]?.downloads?.exr)).length;

  return (
    <main className="app-shell home-shell">
      <section className="mx-auto flex min-h-[100svh] max-w-[1360px] flex-col px-5 py-5 sm:px-6 lg:px-10 lg:py-6">
        <header className="border-b border-white/6 pb-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--foreground-muted)]">
              Curated Source Skyboxes
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-[color:var(--foreground-bright)] sm:text-4xl">
              Jacob Robbins&apos; Skybox Library
            </h1>
          </div>
        </header>

        <div className="grid flex-1 content-center gap-12 py-12 sm:py-14 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16 lg:py-16 xl:gap-20">
          <div className="max-w-[880px]">
            <p className="text-xs uppercase tracking-[0.2em] text-[#bcae9f]">
              Production-ready skies for Source Engine and beyond
            </p>
            <h2 className="mt-4 max-w-[900px] font-display text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-[color:var(--foreground-bright)] sm:text-6xl lg:text-[5.5rem]">
              A quieter way to discover skies with mood, light, and room to explore.
            </h2>
            <p className="mt-6 max-w-[720px] text-base leading-8 text-[#b8afa5] sm:text-lg">
              Browse a curated collection of dawn haze, storm light, clear noon, and late-evening color, with dependable Source-ready downloads and EXR files when you need to take a sky further.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href="/browse"
                className="inline-flex items-center gap-3 bg-white px-5 py-3 text-sm font-medium !text-black transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:!text-black hover:bg-[#ece8e2] hover:scale-[0.985] active:scale-[0.975] [&_svg]:text-black"
              >
                Explore the skies
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6l6 6-6 6" />
                </svg>
              </Link>
              <p className="text-sm text-[#a99f95]">
                Browse all {liveSlugs.length} available skyboxes
              </p>
            </div>

            {featuredSlug && (
              <div className="mt-14 border-t border-white/6 pt-8">
                <div className="landing-image relative aspect-[16/7] overflow-hidden border border-[color:var(--border-soft)] bg-[color:var(--background-elevated)]">
                  <Image
                    src={withBase(`/skyboxes/${featuredSlug}/images/thumbnail.webp`)}
                    alt={`${featuredSlug} preview`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 880px"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/18" />
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm">
                  <p className="text-[#b2a79c]">
                    A glimpse from the collection
                  </p>
                  <p className="uppercase tracking-[0.18em] text-[color:var(--foreground-muted)]">
                    {featuredSlug.replaceAll('_', ' ')}
                  </p>
                </div>
              </div>
            )}

            <nav className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/6 pt-5 text-sm text-[color:var(--foreground-muted)]">
              {profileLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <aside className="border-t border-white/6 pt-6 lg:mt-16 lg:border-l lg:border-t-0 lg:border-l-white/6 lg:pl-8 lg:pt-0 xl:mt-20">
            <div className="space-y-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--foreground-muted)]">Library</p>
                <p className="mt-1.5 font-mono text-[2rem] leading-none text-white">{liveSlugs.length}</p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--foreground-rail)]">Skyboxes available now</p>
              </div>
              <div className="border-t border-white/6 pt-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--foreground-muted)]">Coverage</p>
                <p className="mt-1.5 font-mono text-[2rem] leading-none text-white">{timeOfDayCount}</p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--foreground-rail)]">Time-of-day groups</p>
              </div>
              <div className="border-t border-white/6 pt-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--foreground-muted)]">Formats</p>
                <p className="mt-1.5 font-mono text-[2rem] leading-none text-white">{exrCount}</p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--foreground-rail)]">Assets with EXR downloads</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
