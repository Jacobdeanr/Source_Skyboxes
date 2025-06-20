/* app/ui/profile-links.ts */
import { withBase } from '@/app/lib/basepath';

export const profileLinks = [
  {
    href: 'https://github.com/Jacobdeanr',
    label: 'GitHub',
    svg: `${withBase(`/icons/github-mark-white.svg`)}`,
  },
  {
    href: 'https://discord.gg/grqAfezMVs',
    label: 'Discord',
    svg: `${withBase(`/icons/discord-symbol-white.svg`)}`,
  },
  {
    href: 'https://steamcommunity.com/id/Jakobi_OBrien',
    label: 'Steam',
    svg: `${withBase(`/icons/steam-logo.svg`)}`,
  },
];
