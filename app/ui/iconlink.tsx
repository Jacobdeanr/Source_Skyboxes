/* app/ui/iconlink.tsx */
import Image from 'next/image';

interface IconLinkProps {
  href: string;
  label: string;
  svg: string;
  menuMode?: boolean;
}

export default function IconLink({ href, label, svg, menuMode = false }: IconLinkProps) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      target="_blank"
      rel="noreferrer"
      // Apply different styles based on menuMode
      className={`
        ${menuMode 
          ? 'flex min-h-11 items-center gap-3 w-full px-3 py-2 text-sm text-[color:var(--foreground-soft)] hover:bg-[color:var(--background-panel)]' 
          : 'inline-flex h-12 w-12 items-center justify-center border border-[color:var(--border-soft)] bg-transparent p-2 transition-colors hover:border-[color:var(--border-strong)]'
        }
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--foreground-bright)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]
      `}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <Image 
          src={svg} 
          alt="" 
          width={20}
          height={20}
          className="object-contain w-full h-full"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            aspectRatio: '1/1'
          }}
        />
      </div>
      {/* Show label only in menu mode */}
      {menuMode && <span className="flex-grow ml-2">{label}</span>}
    </a>
  );
}
