import { ArrowRight, Clock, Flame } from 'lucide-react';
import { BAKE_SCHEDULE, BAKERY_IMAGES, BakeBatch, MenuCategory } from '../data/bakeryData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onSelectBatchCategory: (category: MenuCategory) => void;
}

function getBatchStatus(batch: BakeBatch, now: Date): { label: string; isNext: boolean } {
  const day = now.getDay(); // 0 Sun, 1 Mon
  if (day === 1) {
    return { label: 'Milling Day · Resumes Tue', isNext: false };
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const batchMinutes = batch.hour24 * 60 + batch.minute;
  const closeMinutes = day === 0 || day === 6 ? 17 * 60 : 16 * 60;

  if (currentMinutes < 6 * 60 + 30) {
    return batch.id === 'batch-0630'
      ? { label: 'Next Oven Pull', isNext: true }
      : { label: 'Scheduled Today', isNext: false };
  }

  if (currentMinutes >= closeMinutes) {
    return batch.id === 'batch-0630'
      ? { label: 'First Pull Tomorrow', isNext: true }
      : { label: 'Daily Schedule', isNext: false };
  }

  if (currentMinutes >= batchMinutes && currentMinutes < batchMinutes + 75) {
    return { label: 'Warm on Racks Now', isNext: true };
  }

  if (currentMinutes >= batchMinutes + 75) {
    return { label: 'Pulled Earlier Today', isNext: false };
  }

  return { label: `Upcoming · ${batch.time}`, isNext: false };
}

export function HeroSection({ onSelectBatchCategory }: HeroSectionProps) {
  const now = new Date();
  const isClosedNow =
    now.getDay() === 1 ||
    now.getHours() < 6 ||
    now.getHours() >= (now.getDay() === 0 || now.getDay() === 6 ? 17 : 16);

  return (
    <section
      id="top"
      className="relative w-full min-h-[640px] lg:min-h-[700px] flex items-center overflow-hidden bg-[#191512]"
    >
      <div className="absolute inset-0">
        <ResilientImage
          src={BAKERY_IMAGES.hero}
          alt="Warm crusty sourdough loaves cooling on slatted oak racks inside Alder & Grain bakery with morning sunlight and espresso steam"
          className="w-full h-full object-cover object-center"
          fallbackLabel="Alder & Grain Hearth & Espresso Bar"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#14100D]/92 via-[#14100D]/74 to-[#14100D]/52"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#14100D]/80 via-transparent to-[#14100D]/30"
        />
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 sm:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-sm font-medium tracking-wide text-[#DFD5C7] mb-4">
              5412 Ballard Ave NW, Seattle · Stone-Milled Daily
            </p>

            <h1
              className="font-serif font-medium text-[#FAF9F7] tracking-tight leading-[1.08] max-w-2xl"
              style={{
                fontSize: 'clamp(2.25rem, 4.2vw, 3.85rem)',
                textWrap: 'balance',
              }}
            >
              Slow-fermented loaves and morning espresso, baked on the hour.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[#E6DFD5] leading-relaxed max-w-xl">
              Every morning begins before dawn with freshly stone-milled Skagit Valley wheat,
              cultured butter viennoiserie, and single-origin espresso dialed to the roast.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#FAF9F7] bg-[#2C4A3E] rounded-md hover:bg-[#355A4B] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAF9F7]"
              >
                Explore Seasonal Menu
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#visit"
                className="inline-flex items-center px-5 py-3 text-sm font-medium text-[#FAF9F7] border border-[#FAF9F7]/30 rounded-md hover:bg-[#FAF9F7]/10 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAF9F7]"
              >
                Hours &amp; Directions
              </a>
            </div>
          </div>

          <div
            id="bake-schedule"
            className="lg:col-span-5 flex flex-col justify-between bg-[#1B1714]/88 backdrop-blur-md border border-[#FAF9F7]/15 rounded-lg p-6 sm:p-7 text-[#FAF9F7]"
          >
            <div>
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#FAF9F7]/15">
                <div>
                  <h2 className="font-serif text-xl font-medium text-[#FAF9F7]">
                    Today&apos;s Fresh Bake Schedule
                  </h2>
                  <p className="text-xs text-[#CEC4B7] mt-1">
                    {isClosedNow
                      ? 'Oven doors open at 06:30 Tue–Fri · 07:00 Sat–Sun'
                      : 'Select any oven pull below to filter the seasonal menu'}
                  </p>
                </div>
                <Clock className="w-5 h-5 text-[#CBB89D] shrink-0" aria-hidden="true" />
              </div>

              <ul className="divide-y divide-[#FAF9F7]/10 mt-1">
                {BAKE_SCHEDULE.map((batch) => {
                  const status = getBatchStatus(batch, now);
                  return (
                    <li key={batch.id}>
                      <button
                        type="button"
                        onClick={() => onSelectBatchCategory(batch.category)}
                        className="w-full text-left py-3.5 group flex items-start justify-between gap-4 hover:bg-[#FAF9F7]/5 -mx-2 px-2 rounded transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#FAF9F7]"
                      >
                        <div className="flex items-start gap-3.5 min-w-0">
                          <span className="font-mono tabular-nums text-sm font-medium text-[#D9C7AE] pt-0.5 shrink-0">
                            {batch.time}
                          </span>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-[#FAF9F7] group-hover:text-[#D9C7AE] transition-colors">
                              {batch.title}
                            </div>
                            <div className="text-xs text-[#C7BDB0] mt-0.5 leading-snug">
                              {batch.items}
                            </div>
                          </div>
                        </div>

                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#CBB89D] whitespace-nowrap shrink-0 pt-0.5">
                          {status.isNext && <Flame className="w-3.5 h-3.5 text-[#D9C7AE]" aria-hidden="true" />}
                          {status.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-4 pt-3.5 border-t border-[#FAF9F7]/15 flex items-center justify-between text-xs text-[#CEC4B7]">
              <span>Wholesale &amp; studio crates baked to order</span>
              <a
                href="#catering"
                className="font-medium text-[#FAF9F7] underline underline-offset-4 hover:text-[#D9C7AE] whitespace-nowrap shrink-0"
              >
                Reserve a tray
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
