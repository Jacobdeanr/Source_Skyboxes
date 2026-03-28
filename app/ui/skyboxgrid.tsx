import { ReactElement, useMemo } from 'react';

import { QuickFilter, getVisibleSlugs, groupAndSortSkyboxes, sortSkyboxesByPopularity } from '../lib/catalog';
import type { SkyboxMeta } from '../types/skybox';
import SkyboxCard from './skyboxcard';
import { SortOption } from './sort-types';

const descriptions: Record<string, string> = {
  Morning: 'Soft early-day skies with gentle contrast, open color, and a little more room to breathe.',
  Afternoon: 'Clear working light for grounded scenes, readable horizons, and easy daytime coverage.',
  Evening: 'Late-day skies with warmer edges, longer shadows, and more cinematic atmosphere.',
  Night: 'Moonlit and low-light skies for quieter silhouettes, darker scenes, and dramatic contrast.',
  Clear: 'Open, readable skies that keep the light crisp and the horizon easy to place.',
  Cloudy: 'Layered cloud cover for softer light, steadier mood, and more grounded daytime scenes.',
  Hazy: 'Muted skies with lighter depth cues, atmospheric falloff, and a softer edge to the day.',
  Overcast: 'Diffuse, brooding cloud sets for restrained lighting and heavier weather moods.',
  Other: 'Distinct outliers, specialty skies, and experiments that sit just outside the main families.',
  Archived: 'Older entries kept available for reference and download when the collection shifts forward.',
};

interface SkyboxGridProps {
  slugs: string[];
  meta: Record<string, SkyboxMeta>;
  sort?: SortOption;
  query: string;
  quickFilter: QuickFilter;
  stateQuery: string;
}

export default function SkyboxGrid({
  slugs,
  meta,
  sort = 'time-of-day',
  query,
  quickFilter,
  stateQuery,
}: SkyboxGridProps): ReactElement {
  const visible = useMemo(() => {
    return getVisibleSlugs(slugs, meta, query, quickFilter);
  }, [meta, query, quickFilter, slugs]);

  const flatSkyboxes = useMemo(() => {
    return sort === 'most-downloaded' ? sortSkyboxesByPopularity(visible, meta) : visible;
  }, [meta, sort, visible]);

  const groupedSkyboxes = useMemo(() => {
    if (sort === 'most-downloaded' || quickFilter === 'favorites') {
      return [];
    }

    return groupAndSortSkyboxes(
      visible,
      meta,
      sort === 'time-of-day' ? 'timeOfDay' : 'weatherCondition',
    );
  }, [meta, sort, visible]);

  const flatMode = sort === 'most-downloaded' || quickFilter === 'favorites';
  const flatHeader = sort === 'most-downloaded'
    ? {
        title: 'Most popular',
        description: 'A quick run of the skies showing up most often in community map references.',
      }
    : {
        title: 'Community favorites',
        description: 'A tighter pass across the skies showing up most often in community use.',
      };

  return (
    <div className="pb-20 pt-8">
      <div className="mx-auto max-w-[1680px] px-5 sm:px-6 lg:px-10">
        {flatMode ? (
          flatSkyboxes.length === 0 ? (
            <section className="border-t border-[color:var(--border-soft)] px-0 py-16 text-center">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--foreground-muted)]">No results</p>
              <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-white">
                Nothing surfaced from that combination.
              </h3>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[color:var(--foreground-muted)]">
                Try a broader mood, a different time of day, or a lighter filter to open the collection back up.
              </p>
            </section>
          ) : (
            <section className="space-y-7">
              <div className="border-b border-[color:var(--border-soft)] pb-5">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                    <h3 className="font-display text-3xl font-semibold tracking-[-0.04em] text-[color:var(--foreground-bright)] sm:text-[2rem]">
                      {flatHeader.title}
                    </h3>
                    <p className="text-sm text-[color:var(--foreground-muted)]">
                      {flatSkyboxes.length} {flatSkyboxes.length === 1 ? 'sky' : 'skies'}
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--foreground-soft)]">
                    {flatHeader.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {flatSkyboxes.map((slug) => (
                  <SkyboxCard key={slug} slug={slug} meta={meta[slug] || {}} stateQuery={stateQuery} />
                ))}
              </div>
            </section>
          )
        ) : groupedSkyboxes.length === 0 ? (
          <section className="border-t border-[color:var(--border-soft)] px-0 py-16 text-center">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--foreground-muted)]">No results</p>
            <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-white">
              Nothing surfaced from that combination.
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[color:var(--foreground-muted)]">
              Try a broader mood, a different time of day, or a lighter filter to open the collection back up.
            </p>
          </section>
        ) : (
          <div className="space-y-14">
            {groupedSkyboxes.map(({ title, slugs: groupedSlugs }) => (
              <section key={title} className="space-y-7">
                <div className="border-b border-[color:var(--border-soft)] pb-5">
                  <div className="max-w-2xl">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                      <h3 className="font-display text-3xl font-semibold tracking-[-0.04em] text-[color:var(--foreground-bright)] sm:text-[2rem]">
                        {title} Skies
                      </h3>
                      <p className="text-sm text-[color:var(--foreground-muted)]">
                        {groupedSlugs.length} {groupedSlugs.length === 1 ? 'sky' : 'skies'}
                      </p>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-[color:var(--foreground-soft)]">
                      {descriptions[title] || `A curated run of ${title.toLowerCase()} skies for your next environment pass.`}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {groupedSlugs.map((slug) => (
                    <SkyboxCard key={slug} slug={slug} meta={meta[slug] || {}} stateQuery={stateQuery} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
