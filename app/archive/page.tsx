import { Suspense } from 'react';

import ArchiveClient from '../archive-client';
import { getIndex, listSlugs } from '../lib/skybox';

export default function ArchivePage() {
  const meta = getIndex();
  const slugs = listSlugs({ includeArchived: true }).filter((slug) => meta[slug]?.archived);

  return (
    <Suspense fallback={null}>
      <ArchiveClient slugs={slugs} meta={meta} />
    </Suspense>
  );
}
