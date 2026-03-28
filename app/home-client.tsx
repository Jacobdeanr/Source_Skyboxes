'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { QuickFilter } from './lib/catalog';
import Header from './ui/header';
import SkyboxGrid from './ui/skyboxgrid';
import { SortOption } from './ui/sort-types';
import type { SkyboxMeta } from './types/skybox';

interface HomeClientProps {
  slugs: string[];
  meta: Record<string, SkyboxMeta>;
}

export default function HomeClient({ slugs, meta }: HomeClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialSort = (searchParams.get('sort') as SortOption) || 'time-of-day';
  const initialQuery = searchParams.get('query') || '';
  const initialQuickFilter = (searchParams.get('filter') as QuickFilter) || 'all';
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [query, setQuery] = useState(initialQuery);
  const [quickFilter, setQuickFilter] = useState<QuickFilter>(initialQuickFilter);

  useEffect(() => {
    setSort((searchParams.get('sort') as SortOption) || 'time-of-day');
    setQuery(searchParams.get('query') || '');
    setQuickFilter((searchParams.get('filter') as QuickFilter) || 'all');
  }, [searchParams]);

  const urlState = useMemo(() => {
    const params = new URLSearchParams();
    if (sort !== 'time-of-day') params.set('sort', sort);
    if (query) params.set('query', query);
    if (quickFilter !== 'all') params.set('filter', quickFilter);
    return params.toString();
  }, [sort, query, quickFilter]);

  useEffect(() => {
    const current = searchParams.toString();
    if (current === urlState) {
      return;
    }

    router.replace(urlState ? `${pathname}?${urlState}` : pathname, { scroll: false });
  }, [pathname, router, searchParams, urlState]);

  return (
    <main className="app-shell">
      <Header
        sort={sort}
        setSort={setSort}
        query={query}
        setQuery={setQuery}
        quickFilter={quickFilter}
        setQuickFilter={setQuickFilter}
      />
      <SkyboxGrid
        slugs={slugs}
        meta={meta}
        sort={sort}
        query={query}
        quickFilter={quickFilter}
        stateQuery={urlState}
      />
      <section className="mx-auto max-w-[1680px] px-5 pb-16 sm:px-6 lg:px-10">
        <div className="border-t border-[color:var(--border-soft)] pt-5 text-sm text-[color:var(--foreground-muted)]">
          <p>
            Looking for older files?{' '}
            <Link href="/archive" className="text-[color:var(--foreground-soft)] transition-colors hover:text-white">
              Browse the Legacy Archive &rarr;
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
