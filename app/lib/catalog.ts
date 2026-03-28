import type { SkyboxIndex, SkyboxMeta } from '../types/skybox';
import type { SortOption } from '../ui/sort-types';

export type QuickFilter =
  | 'all'
  | 'clear'
  | 'cloudy'
  | 'storm'
  | 'dawn'
  | 'sunset'
  | 'night'
  | 'dramatic'
  | 'favorites';

const COMMUNITY_FAVORITES_LIMIT = 12;

const TIME_OF_DAY_ORDER = ['Morning', 'Afternoon', 'Evening', 'Night', 'Other', 'Archived'];
const WEATHER_CONDITIONS_ORDER = ['Clear', 'Cloudy', 'Hazy', 'Overcast', 'Other', 'Archived'];

const SPECIAL_TITLES: Record<string, string> = {
  sky_devroom_hdr: 'Dev Room',
  sky_ethereal01_hdr: 'Ethereal Light',
  sky_fracture01_hdr: 'Fractured Sky',
  sky_lab_hdr: 'Studio Lab',
  sky_serene_glow_hdr: 'Serene Glow',
  sky_wildfire01_hdr: 'Wildfire Haze',
};

export function getSequenceLabel(slug: string): string {
  const match = slug.match(/(\d+)(?:_hdr)?$/);
  if (!match) {
    return '';
  }

  return String(parseInt(match[1], 10)).padStart(2, '0');
}

export function getHumanTitle(slug: string, meta: SkyboxMeta): string {
  if (SPECIAL_TITLES[slug]) {
    return SPECIAL_TITLES[slug];
  }

  const sequence = getSequenceLabel(slug);
  const time = meta.timeOfDay?.trim();
  const weather = meta.weatherCondition?.trim();
  const parts = [weather, time].filter(Boolean);

  if (parts.length > 0) {
    return `${parts.join(' ')}${sequence ? ` / ${sequence}` : ''}`;
  }

  const fallback = slug
    .replace(/^sky_/, '')
    .replace(/_hdr$/, '')
    .replace(/\d+/g, '')
    .replace(/_/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return `${fallback || 'Skybox'}${sequence ? ` / ${sequence}` : ''}`;
}

export function matchesQuickFilter(slug: string, meta: SkyboxMeta, quickFilter: QuickFilter): boolean {
  if (quickFilter === 'all') {
    return true;
  }

  const haystack = [
    slug,
    meta.description || '',
    meta.timeOfDay || '',
    meta.weatherCondition || '',
    ...(meta.categories || []),
  ].join(' ').toLowerCase();

  switch (quickFilter) {
    case 'clear':
      return haystack.includes('clear');
    case 'cloudy':
      return haystack.includes('cloudy') || haystack.includes('overcast') || haystack.includes('hazy');
    case 'storm':
      return haystack.includes('storm') || haystack.includes('wildfire') || haystack.includes('overcast');
    case 'dawn':
      return haystack.includes('morning') || haystack.includes('dawn') || haystack.includes('sunrise');
    case 'sunset':
      return haystack.includes('sunset') || haystack.includes('evening');
    case 'night':
      return haystack.includes('night');
    case 'dramatic':
      return (
        haystack.includes('storm') ||
        haystack.includes('wildfire') ||
        haystack.includes('fracture') ||
        haystack.includes('ethereal') ||
        haystack.includes('overcast')
      );
    case 'favorites':
      return true;
    default:
      return true;
  }
}

function getCommunityUsageCount(meta: SkyboxMeta): number {
  return meta.steamMaps?.length || 0;
}

function getPublishTimestamp(meta: SkyboxMeta): number {
  if (!meta.publishDate) {
    return 0;
  }

  const timestamp = Date.parse(meta.publishDate);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export function sortSkyboxesByPopularity(slugs: string[], meta: SkyboxIndex): string[] {
  return [...slugs].sort((slugA, slugB) => {
    const entryA = meta[slugA] || {};
    const entryB = meta[slugB] || {};
    const usageDelta = getCommunityUsageCount(entryB) - getCommunityUsageCount(entryA);

    if (usageDelta !== 0) {
      return usageDelta;
    }

    const publishDelta = getPublishTimestamp(entryB) - getPublishTimestamp(entryA);
    if (publishDelta !== 0) {
      return publishDelta;
    }

    return slugA.localeCompare(slugB);
  });
}

export function filterByQuery(slugs: string[], meta: SkyboxIndex, query: string): string[] {
  if (!query) return slugs;

  const q = query.toLowerCase();

  return slugs.filter((slug) => {
    const entry = meta[slug];
    const haystack = [
      slug,
      entry?.description || '',
      entry?.timeOfDay || '',
      entry?.weatherCondition || '',
      ...(entry?.categories || []),
    ].join(' ').toLowerCase();

    return haystack.includes(q);
  });
}

function getSkyboxCategory(slug: string, meta: SkyboxIndex, category: 'timeOfDay' | 'weatherCondition'): string {
  if (meta[slug]?.archived) {
    return 'Archived';
  }

  return meta[slug]?.[category] || 'Other';
}

function sortSkyboxesByPitch(slugs: string[], meta: SkyboxIndex): string[] {
  return [...slugs].sort((slugA, slugB) => {
    const pitchA = meta[slugA]?.sunParameters?.pitch;
    const pitchValueA = pitchA !== undefined ? (typeof pitchA === 'string' ? parseFloat(pitchA) : pitchA) : 0;
    const pitchB = meta[slugB]?.sunParameters?.pitch;
    const pitchValueB = pitchB !== undefined ? (typeof pitchB === 'string' ? parseFloat(pitchB) : pitchB) : 0;

    return Math.abs(pitchValueB) - Math.abs(pitchValueA);
  });
}

function groupSkyboxes(slugs: string[], meta: SkyboxIndex, category: 'timeOfDay' | 'weatherCondition'): Record<string, string[]> {
  const groups: Record<string, string[]> = {};

  slugs.forEach((slug) => {
    const categoryValue = getSkyboxCategory(slug, meta, category);
    if (!groups[categoryValue]) {
      groups[categoryValue] = [];
    }
    groups[categoryValue].push(slug);
  });

  return groups;
}

export function groupAndSortSkyboxes(
  slugs: string[],
  meta: SkyboxIndex,
  category: 'timeOfDay' | 'weatherCondition',
): { title: string; slugs: string[] }[] {
  const groups = groupSkyboxes(slugs, meta, category);
  const order = category === 'timeOfDay' ? TIME_OF_DAY_ORDER : WEATHER_CONDITIONS_ORDER;

  return order
    .filter((group) => groups[group])
    .map((group) => ({
      title: group,
      slugs: sortSkyboxesByPitch(groups[group], meta),
    }));
}

export function getVisibleSlugs(
  slugs: string[],
  meta: SkyboxIndex,
  query: string,
  quickFilter: QuickFilter,
): string[] {
  const queried = filterByQuery(slugs, meta, query).filter((slug) =>
    matchesQuickFilter(slug, meta[slug] || {}, quickFilter),
  );

  if (quickFilter === 'favorites') {
    return sortSkyboxesByPopularity(queried, meta).slice(0, COMMUNITY_FAVORITES_LIMIT);
  }

  return queried;
}

export function getOrderedVisibleSlugs(
  slugs: string[],
  meta: SkyboxIndex,
  sort: SortOption,
  query: string,
  quickFilter: QuickFilter,
): string[] {
  const visible = getVisibleSlugs(slugs, meta, query, quickFilter);
  if (sort === 'most-downloaded') {
    return sortSkyboxesByPopularity(visible, meta);
  }

  const grouped = groupAndSortSkyboxes(
    visible,
    meta,
    sort === 'time-of-day' ? 'timeOfDay' : 'weatherCondition',
  );

  return grouped.flatMap((group) => group.slugs);
}
