type MapLink = { name: string; url: string };
import { withBase } from '@/app/lib/basepath';

export default function MapList({ maps = [] }: { maps?: MapLink[] }) {
  return (
    <section>
      <h4 className="mb-2 text-sm font-bold uppercase tracking-wider flex items-center">
        Community Maps
        <span className="ml-2 rounded-full bg-neutral-800 px-2 py-0.5 text-xs font-medium text-blue-400">
          {maps.length}
        </span>
      </h4>

      {maps.length === 0 ? (
        <p className="italic text-neutral-500">No maps featuring this skybox yet.</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {maps.map((m) => (
            <li key={m.url}>
              <a
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-md px-3 py-2 bg-neutral-800 hover:bg-neutral-700 transition"
              >
                <span className="text-sm text-neutral-100">{m.name}</span>
                <img src={withBase('/icons/maximize.svg')} alt="" className="invert w-4 h-4" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}