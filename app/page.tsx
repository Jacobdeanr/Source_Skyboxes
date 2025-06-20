import HomeClient from './home-client';
import { listSlugs, getIndex } from './lib/skybox';

export default function Page() {
  const slugs  = listSlugs();
  const meta   = getIndex();
  return <HomeClient slugs={slugs} meta={meta} />;
}