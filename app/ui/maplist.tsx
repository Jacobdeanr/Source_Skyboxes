type MapLink = { name: string; url: string };
import { withBase } from '@/app/lib/basepath';

function getSourceLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'External reference';
  }
}

export default function MapList({ maps = [] }: { maps?: MapLink[] }) {
  return (
    <section>
      <div className="mb-4 space-y-2">
        <h4 className="flex items-center text-sm font-bold uppercase tracking-wider">
          Community Maps
          <span className="ml-2 text-xs font-medium normal-case tracking-normal text-[color:var(--foreground-muted)]">
            {maps.length} {maps.length === 1 ? 'map' : 'maps'}
          </span>
        </h4>
        <p className="max-w-2xl text-sm leading-7 text-[color:var(--foreground-soft)]">
          Seen in these community-made maps and released environments.
        </p>
      </div>

      {maps.length === 0 ? (
        <p className="italic text-[color:var(--foreground-muted)]">No maps featuring this skybox yet.</p>
      ) : (
        <ul className="space-y-3">
          {maps.map((m) => (
            <li key={m.url}>
              <a
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-20 items-center justify-between border border-[color:var(--border-soft)] px-4 py-4 transition-colors hover:border-[color:var(--border-strong)] hover:bg-white/[0.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--foreground-bright)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
              >
                <div className="pr-4">
                  <p className="text-sm font-medium text-[color:var(--foreground)]">{m.name}</p>
                  <p className="mt-1 text-sm text-[color:var(--foreground-muted)]">
                    {getSourceLabel(m.url)}
                  </p>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[color:var(--border-soft)] text-[color:var(--foreground-muted)] transition-colors group-hover:border-[color:var(--border-strong)] group-hover:text-white">
                  <img src={withBase('/icons/maximize.svg')} alt="" className="h-4 w-4 invert" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
