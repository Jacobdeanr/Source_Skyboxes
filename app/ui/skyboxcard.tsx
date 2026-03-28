'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

import { withBase } from '@/app/lib/basepath';

import { getHumanTitle } from '../lib/catalog';
import type { SkyboxMeta } from '../types/skybox';
export default function SkyboxCard({ slug, meta, stateQuery }: { slug: string; meta: SkyboxMeta; stateQuery: string }) {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const imgBase = withBase(`/skyboxes/${slug}/images`);
  const displayTitle = getHumanTitle(slug, meta);
  const technicalName = slug.replaceAll('_', ' ');
  const publishYear = meta.publishDate ? new Date(meta.publishDate).getUTCFullYear() : undefined;
  const from = `${pathname}${stateQuery ? `?${stateQuery}` : ''}#${slug}`;

  return (
    <Link
        href={`/skyboxes/${slug}?from=${encodeURIComponent(from)}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        id={slug}
        className="group relative block w-full text-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d12]"
        aria-label={`View ${displayTitle} skybox`}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden border border-[color:var(--border-soft)]">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
            style={{
              backgroundImage: `url(${imgBase}/thumbnail.webp)`,
              transform: isHovered ? 'scale(1.02)' : 'scale(1)',
            }}
          >
            <Image
              src={`${imgBase}/thumbnail.webp`}
              alt=""
              fill
              className="opacity-0"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
              unoptimized
              aria-hidden="true"
            />
          </div>

          <div className="absolute inset-0 bg-black/30" />

          <div
            className={`absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/50 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-white/72 transition-all duration-200 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            ID: {technicalName}
          </div>
        </div>

        <div className="space-y-3 px-0 py-4">
          <div className="space-y-2 pt-1">
            <h2 className="font-display text-xl font-semibold tracking-[-0.03em] text-[color:var(--foreground-bright)]">
              {displayTitle}
            </h2>
            {meta.archived && publishYear && !Number.isNaN(publishYear) && (
              <p className="text-sm text-[color:var(--foreground-muted)]">
                {publishYear}
              </p>
            )}
          </div>
        </div>
    </Link>
  );
}
