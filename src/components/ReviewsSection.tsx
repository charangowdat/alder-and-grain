import { CUSTOMER_REVIEWS } from '../data/bakeryData';

const CRAFT_STANDARDS = [
  {
    metric: '36 Hours',
    label: 'Cold Bulk & Final Fermentation',
    detail: 'Extended slow fermentation breaks down phytic acid for open crumb structure and clean depth of flavor.',
  },
  {
    metric: '100% Regional',
    label: 'Skagit Valley Heritage Wheat',
    detail: 'Milled within 72 hours of mixing so natural wheat germ oils stay intact in every boule.',
  },
  {
    metric: '4 Miles',
    label: 'Micro-Lot Coffee Roasting',
    detail: 'Roasted weekly in Georgetown and dialed in every morning before the 06:30 croissant pull.',
  },
];

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#F3F0EA] border-b border-[#E5DFD6]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium tracking-wide text-[#5C5147] mb-2">
              Neighborhood Voices &amp; Standards
            </p>
            <h2
              className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#1B1714]"
              style={{ textWrap: 'balance' }}
            >
              Built around morning rituals on Ballard Avenue
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#4A4139] leading-relaxed">
              We bake and brew for neighbors heading to the docks, architects sketching at the
              communal oak table, and weekend walkers picking up a warm loaf for dinner.
            </p>

            <dl className="mt-8 divide-y divide-[#DFD8CC] border-y border-[#DFD8CC]">
              {CRAFT_STANDARDS.map((item) => (
                <div key={item.label} className="py-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm font-semibold text-[#1B1714]">{item.label}</dt>
                    <dd className="font-mono tabular-nums text-sm font-medium text-[#2C4A3E] shrink-0">
                      {item.metric}
                    </dd>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-[#5C5147] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 gap-5">
            {CUSTOMER_REVIEWS.map((review) => (
              <figure
                key={review.id}
                className="bg-[#FAF9F7] border border-[#E5DFD6] rounded-lg p-6 sm:p-7"
              >
                <blockquote className="text-base text-[#1B1714] leading-relaxed">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-5 pt-4 border-t border-[#ECE7DE] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#5C5147]">
                  <div>
                    <span className="font-semibold text-[#1B1714] text-sm">{review.name}</span>
                    <span className="mx-2" aria-hidden="true">
                      ·
                    </span>
                    <span>
                      {review.role}, {review.neighborhood}
                    </span>
                  </div>
                  <div className="shrink-0">
                    <span>Regular order: {review.favoriteItem}</span>
                    <span className="mx-2" aria-hidden="true">
                      ·
                    </span>
                    <span>{review.date}</span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
