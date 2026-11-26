import { STORE_INFO } from '../data/bakeryData';

export function Footer() {
  return (
    <footer className="bg-[#1B1714] text-[#DFD5C7] py-12 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-10 border-b border-[#FAF9F7]/12">
          <div>
            <a href="#top" className="font-serif text-2xl font-semibold text-[#FAF9F7]">
              {STORE_INFO.name}
            </a>
            <p className="mt-2.5 text-sm text-[#B8ADA0] max-w-sm leading-relaxed">
              Neighborhood stone-milled sourdough bakery and specialty espresso bar in the heart of
              Ballard.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="font-semibold text-[#FAF9F7] mb-3">Bakery</p>
              <ul className="space-y-2 text-[#B8ADA0]">
                <li>
                  <a href="#bake-schedule" className="hover:text-[#FAF9F7] transition-colors">
                    Today&apos;s Bake
                  </a>
                </li>
                <li>
                  <a href="#menu" className="hover:text-[#FAF9F7] transition-colors">
                    Seasonal Menu
                  </a>
                </li>
                <li>
                  <a href="#catering" className="hover:text-[#FAF9F7] transition-colors">
                    Catering
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-[#FAF9F7] mb-3">Visit</p>
              <ul className="space-y-2 text-[#B8ADA0]">
                <li>{STORE_INFO.addressLine1}</li>
                <li>{STORE_INFO.addressLine2}</li>
                <li>
                  <a href="#visit" className="hover:text-[#FAF9F7] transition-colors">
                    Hours &amp; Transit
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="font-semibold text-[#FAF9F7] mb-3">Contact</p>
              <ul className="space-y-2 text-[#B8ADA0]">
                <li className="font-mono tabular-nums">{STORE_INFO.phone}</li>
                <li>
                  <a
                    href={`mailto:${STORE_INFO.email}`}
                    className="hover:text-[#FAF9F7] transition-colors"
                  >
                    {STORE_INFO.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#9E9386]">
          <p>&copy; {new Date().getFullYear()} Alder &amp; Grain Bakery LLC. All rights reserved.</p>
          <p>Tue–Fri 06:30–16:00 · Sat–Sun 07:00–17:00 · Closed Mondays</p>
        </div>
      </div>
    </footer>
  );
}
