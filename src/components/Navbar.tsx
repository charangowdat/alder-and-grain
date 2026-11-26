import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  selectedCateringCount: number;
}

const NAV_LINKS = [
  { href: '#bake-schedule', label: "Today's Bake" },
  { href: '#menu', label: 'Seasonal Menu' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#visit', label: 'Hours & Visit' },
];

export function Navbar({ selectedCateringCount }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F7]/95 backdrop-blur-sm border-b border-[#E5DFD6]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        <a
          href="#top"
          className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#1B1714] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2C4A3E]"
        >
          Alder &amp; Grain
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#544A41]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#1B1714] underline-offset-4 hover:underline transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2C4A3E]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#catering"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-[#FAF9F7] bg-[#2C4A3E] rounded-md hover:bg-[#223B31] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C4A3E]"
          >
            {selectedCateringCount > 0
              ? `Catering Inquiry (${selectedCateringCount})`
              : 'Catering Inquiry'}
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-[#1B1714] hover:bg-[#EFECE6] transition-colors focus-visible:outline-2 focus-visible:outline-[#2C4A3E]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#E5DFD6] bg-[#FAF9F7] px-5 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-base font-medium text-[#1B1714] hover:text-[#2C4A3E]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#catering"
            onClick={() => setMobileOpen(false)}
            className="mt-2 block w-full text-center px-4 py-2.5 text-sm font-medium text-[#FAF9F7] bg-[#2C4A3E] rounded-md"
          >
            {selectedCateringCount > 0
              ? `Catering Inquiry (${selectedCateringCount})`
              : 'Catering Inquiry'}
          </a>
        </div>
      )}
    </header>
  );
}
