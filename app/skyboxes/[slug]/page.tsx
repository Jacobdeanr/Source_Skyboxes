import { use } from 'react';
import { getMeta, getPreviewCount, listSlugs } from '../../lib/skybox';
import SkyboxClient from './skybox-client';

export async function generateStaticParams() {
  return listSlugs().map((slug) => ({ slug }));
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug }     = use(params);
  const skyboxData   = getMeta(slug);
  const previewCount = getPreviewCount(slug);

  return (
    <SkyboxClient
      slug={slug}
      skyboxData={skyboxData}
      previewCount={previewCount}
    />
  );
}