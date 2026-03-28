'use client';

import { SortOption } from './sort-types';

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  ariaLabel?: string;
}

export default function SortSelect({ value, onChange, ariaLabel = 'Browse grouping' }: SortSelectProps) {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        aria-label={ariaLabel}
        className="
          w-full h-12 pl-4 pr-10 appearance-none
          border text-sm font-medium
          border-white/10 bg-[color:var(--background)]
          text-[color:var(--foreground)]
          focus:outline-none focus:border-white/60 focus-visible:ring-2 focus-visible:ring-[color:var(--foreground-bright)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]
          transition-colors duration-200 hover:border-[color:var(--border-strong)]
          cursor-pointer
        "
      >
        <option value="time-of-day">Group by time of day</option>
        <option value="weather-conditions">Group by weather</option>
        <option value="most-downloaded">Sort by most popular</option>
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          className="w-4 h-4 text-[color:var(--foreground-muted)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
