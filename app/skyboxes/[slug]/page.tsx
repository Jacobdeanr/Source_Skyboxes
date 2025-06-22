import { use } from 'react';
import { getMeta, getPreviewCount, listSlugs } from '../../lib/skybox';
import SkyboxClient from './skybox-client';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return listSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const meta     = getMeta(slug);

  const title = meta.description?.trim()
    ? `${meta.description} | ${slug}`
    : `Skybox ${slug}`;

  const description =
//    meta.description?.trim() ??
    `Free download of ${slug}: Source Engine ready set and original 32-bit EXR.`;

  const previewImage = `/skyboxes/${slug}/images/previews/1.webp`; // relative to metadataBase

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: previewImage, width: 1920, height: 1080 }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [previewImage],
    },
  };
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