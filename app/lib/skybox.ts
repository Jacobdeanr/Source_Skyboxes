import fs from 'fs';
import path from 'path';
import { SkyboxMeta, SkyboxIndex } from '../types/skybox';

const root = process.cwd();
const DATA_DIR   = path.join(root, 'public', 'data');
const SKYBOX_DIR = (slug: string) =>
  path.join(root, 'public', 'skyboxes', slug, 'images', 'previews');

let indexCache: SkyboxIndex | null = null;

  /**
   * Get the entire skybox index as a single object.
   *
   * The index is cached after the first call to this function.
   *
   * @returns The skybox index.
   */
export function getIndex(): SkyboxIndex {
  if (!indexCache) {
    const raw = fs.readFileSync(path.join(DATA_DIR, 'index.json'), 'utf8');
    indexCache = JSON.parse(raw) as SkyboxIndex;
  }
  return indexCache;
}

/**
 * Get a list of all skybox slugs.
 *
 * @returns An array of skybox slugs.
 */
export function listSlugs(): string[] {
  return Object.keys(getIndex());
}

/**
 * Get the metadata for a specific skybox.
 *
 * @param slug - The slug of the skybox.
 * @returns The metadata for the skybox.
 * @throws {Error} If no metadata is found for the given slug.
 */
export function getMeta(slug: string): SkyboxMeta {
  const meta = getIndex()[slug];
  if (!meta) {
    throw new Error(`No metadata for slug “${slug}” in index.json`);
  }
  return meta;
}

/**
 * Get the number of preview images for a specific skybox.
 *
 * @param slug - The slug of the skybox.
 * @returns The number of preview images.
 */
export function getPreviewCount(slug: string): number {
  try {
    const files = fs.readdirSync(SKYBOX_DIR(slug));
    const previews = files.filter((f) => /^\d+\.webp$/i.test(f));
    return previews.length || 1;
  } catch (err) {
    console.warn(`⚠️ Missing previews for “${slug}”:`, err);
    return 1;
  }
}