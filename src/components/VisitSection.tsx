import { Check, Copy, ExternalLink, MapPin } from 'lucide-react';
import { useState } from 'react';
import { BAKERY_IMAGES, STORE_HOURS, STORE_INFO } from '../data/bakeryData';
import { ResilientImage } from './ResilientImage';

export function VisitSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    const fullAddress = `${STORE_INFO.addressLine1}, ${STORE_INFO.addressLine2}`;
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="visit" className="py-16 sm:py-24 bg-[#FAF9F7] border-b border-[#E5DFD6]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col bg-[#F3F0EA] border border-[#E5DFD6] rounded-lg overflow-hidden">
            <div className="aspect-[4/3] bg-[#E8E2D7]">
              <ResilientImage
                src={BAKERY_IMAGES.interior}
                alt="Alder & Grain cafe interior with communal oak table, stone pastry counter, and morning sunlight through tall windows"
                fallbackLabel="5412 Ballard Ave NW Interior"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium tracking-wide text-[#5C5147]">
                  Directions &amp; Neighborhood Access
                </p>
                <h3 className="font-serif text-2xl font-medium text-[#1B1714] mt-1.5">
                  {STORE_INFO.addressLine1}, {STORE_INFO.addressLine2}
                </h3>
                <p className="mt-3 text-sm text-[#4A4139] leading-relaxed">
                  Two blocks west of Bergen Place Park. RapidRide D Line and Route 40 stop three
                  minutes north on Market Street. Covered bike racks sit beside the cedar patio,
                  with a 15-minute loaf pickup zone directly in front of the bakery.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#E2DBD0] flex flex-wrap items-center gap-3">
                <a
                  href={STORE_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#FAF9F7] bg-[#2C4A3E] rounded-md hover:bg-[#223B31] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#2C4A3E]"
                >
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  Open in Google Maps
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#1B1714] bg-[#FAF9F7] border border-[#D8D0C4] rounded-md hover:bg-[#EFECE6] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#2C4A3E]"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#2C4A3E]" aria-hidden="true" />
                      Address Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#5C5147]" aria-hidden="true" />
                      Copy Address
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between bg-[#FAF9F7] border border-[#E5DFD6] rounded-lg p-6 sm:p-8 lg:p-10">
            <div>
              <p className="text-xs font-medium tracking-wide text-[#5C5147]">
                Store Hours &amp; Counter Notes
              </p>
              <h2
                className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#1B1714] mt-2"
                style={{ textWrap: 'balance' }}
              >
                Visit the hearth &amp; espresso bar
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#4A4139] leading-relaxed">
                Walk-ins are always welcome at our communal oak table and heated cedar window bar.
                For whole-loaf holds on weekends, call the counter before 09:00.
              </p>

              <dl className="mt-8 divide-y divide-[#E5DFD6] border-y border-[#E5DFD6]">
                {STORE_HOURS.map((row) => (
                  <div key={row.days} className="py-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-base font-semibold text-[#1B1714]">{row.days}</dt>
                      <dd
                        className={`font-mono tabular-nums text-base font-medium shrink-0 ${
                          row.hours === 'Closed' ? 'text-[#7A6E62]' : 'text-[#2C4A3E]'
                        }`}
                      >
                        {row.hours}
                      </dd>
                    </div>
                    <p className="mt-1.5 text-sm text-[#5C5147]">{row.note}</p>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E5DFD6] grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs font-medium text-[#5C5147]">Bakery Counter Phone</p>
                <a
                  href="tel:+12065550148"
                  className="font-mono tabular-nums text-base font-medium text-[#1B1714] hover:text-[#2C4A3E] mt-1 inline-block"
                >
                  {STORE_INFO.phone}
                </a>
              </div>
              <div>
                <p className="text-xs font-medium text-[#5C5147]">General &amp; Press Inquiries</p>
                <a
                  href={`mailto:${STORE_INFO.email}`}
                  className="text-base font-medium text-[#1B1714] hover:text-[#2C4A3E] mt-1 inline-block"
                >
                  {STORE_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
