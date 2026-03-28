import { Suspense } from 'react';

import HomeClient from '../home-client';
import { getIndex, listSlugs } from '../lib/skybox';

export default function BrowsePage() {
  const slugs = listSlugs();
  const meta = getIndex();

  return (
    <Suspense fallback={null}>
      <HomeClient slugs={slugs} meta={meta} />
    </Suspense>
  );
}
