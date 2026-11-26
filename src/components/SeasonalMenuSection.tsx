import { Check, Info, Plus } from 'lucide-react';
import { useState } from 'react';
import {
  BAKERY_IMAGES,
  CATEGORY_SHOWCASE,
  MENU_ITEMS,
  MenuCategory,
  MenuItem,
} from '../data/bakeryData';
import { ResilientImage } from './ResilientImage';

export type FilterTab = 'all' | MenuCategory;
export type DietaryFilter = 'all' | 'vegan' | 'nut-free';

interface SeasonalMenuSectionProps {
  activeCategory: FilterTab;
  onCategoryChange: (category: FilterTab) => void;
  selectedCateringIds: string[];
  onToggleCateringItem: (itemId: string) => void;
  onInspectItem: (item: MenuItem) => void;
}

const CATEGORY_TABS: { id: FilterTab; label: string }[] = [
  { id: 'all', label: 'All Offerings' },
  { id: 'pastries', label: 'Pastries' },
  { id: 'sourdough', label: 'Sourdough Loaves' },
  { id: 'espresso', label: 'Espresso Drinks' },
];

const DIETARY_FILTERS: { id: DietaryFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'vegan', label: 'Vegan-Friendly' },
  { id: 'nut-free', label: 'Nut-Free' },
];

export function SeasonalMenuSection({
  activeCategory,
  onCategoryChange,
  selectedCateringIds,
  onToggleCateringItem,
  onInspectItem,
}: SeasonalMenuSectionProps) {
  const [dietaryFilter, setDietaryFilter] = useState<DietaryFilter>('all');

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesDietary =
      dietaryFilter === 'all' ||
      (dietaryFilter === 'vegan' && item.veganFriendly) ||
      (dietaryFilter === 'nut-free' && item.nutFree);
    return matchesCategory && matchesDietary;
  });

  const spotlight = CATEGORY_SHOWCASE[activeCategory];

  return (
    <section id="menu" className="py-16 sm:py-24 border-b border-[#E5DFD6] bg-[#FAF9F7]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E5DFD6]">
          <div className="max-w-xl">
            <p className="text-xs font-medium tracking-wide text-[#5C5147] mb-2">
              Seasonal Menu · Autumn / Early Winter
            </p>
            <h2
              className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#1B1714]"
              style={{ textWrap: 'balance' }}
            >
              Baked in small batches throughout the morning
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div
              role="tablist"
              aria-label="Menu categories"
              className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#EFECE6] border border-[#E2DBD0] rounded-lg"
            >
              {CATEGORY_TABS.map((tab) => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => onCategoryChange(tab.id)}
                    className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#2C4A3E] ${
                      isActive
                        ? 'bg-[#2C4A3E] text-[#FAF9F7] shadow-xs'
                        : 'text-[#4A4139] hover:text-[#1B1714] hover:bg-[#FAF9F7]/60'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div
              role="group"
              aria-label="Dietary filter"
              className="inline-flex items-center gap-1 p-1 bg-[#EFECE6] border border-[#E2DBD0] rounded-lg self-start sm:self-auto"
            >
              {DIETARY_FILTERS.map((df) => {
                const isActive = dietaryFilter === df.id;
                return (
                  <button
                    key={df.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setDietaryFilter(df.id)}
                    className={`px-3 py-2 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#2C4A3E] ${
                      isActive
                        ? 'bg-[#FAF9F7] text-[#1B1714] shadow-xs'
                        : 'text-[#5C5147] hover:text-[#1B1714]'
                    }`}
                  >
                    {df.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Visual Showcase Header: 3 distinct category frames when viewing All, or single category spotlight */}
        {activeCategory === 'all' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {(
              [
                {
                  category: 'pastries' as MenuCategory,
                  title: 'Pastries & Viennoiserie',
                  meta: 'First pull 06:30 · 4 items',
                  image: BAKERY_IMAGES.pastries,
                  alt: CATEGORY_SHOWCASE.pastries.alt,
                  icon: 'bakery' as const,
                },
                {
                  category: 'sourdough' as MenuCategory,
                  title: 'Sourdough Loaves',
                  meta: 'Hearth pull 07:30 · 4 items',
                  image: BAKERY_IMAGES.sourdough,
                  alt: CATEGORY_SHOWCASE.sourdough.alt,
                  icon: 'bakery' as const,
                },
                {
                  category: 'espresso' as MenuCategory,
                  title: 'Espresso & Coffee Bar',
                  meta: 'Served all day · 4 items',
                  image: BAKERY_IMAGES.espresso,
                  alt: CATEGORY_SHOWCASE.espresso.alt,
                  icon: 'coffee' as const,
                },
              ] as const
            ).map((pillar) => (
              <button
                key={pillar.category}
                type="button"
                onClick={() => onCategoryChange(pillar.category)}
                className="group text-left bg-[#F3F0EA] border border-[#E5DFD6] rounded-lg overflow-hidden hover:border-[#2C4A3E]/50 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#2C4A3E]"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#E8E2D7]">
                  <ResilientImage
                    src={pillar.image}
                    alt={pillar.alt}
                    fallbackLabel={pillar.title}
                    fallbackIcon={pillar.icon}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex items-baseline justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#1B1714] group-hover:text-[#2C4A3E] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#5C5147] mt-1">{pillar.meta}</p>
                  </div>
                  <span className="text-xs font-medium text-[#2C4A3E] whitespace-nowrap shrink-0">
                    Filter →
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch bg-[#F3F0EA] border border-[#E5DFD6] rounded-lg overflow-hidden">
            <div className="lg:col-span-5 aspect-[4/3] lg:aspect-auto bg-[#E8E2D7]">
              <ResilientImage
                src={spotlight.image}
                alt={spotlight.alt}
                fallbackLabel={spotlight.title}
                fallbackIcon={activeCategory === 'espresso' ? 'coffee' : 'bakery'}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
              <p className="text-xs font-medium text-[#5C5147]">
                {CATEGORY_TABS.find((t) => t.id === activeCategory)?.label} · {filteredItems.length}{' '}
                {filteredItems.length === 1 ? 'selection' : 'selections'}
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1B1714] mt-2">
                {spotlight.title}
              </h3>
              <p className="text-sm sm:text-base text-[#4A4139] mt-3 leading-relaxed max-w-xl">
                {spotlight.subtitle}
              </p>
              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => onCategoryChange('all')}
                  className="text-xs font-medium text-[#2C4A3E] underline underline-offset-4 hover:text-[#1B1714] focus-visible:outline-2 focus-visible:outline-[#2C4A3E]"
                >
                  View all seasonal categories
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="mt-10 p-10 text-center bg-[#F3F0EA] border border-[#E5DFD6] rounded-lg">
            <p className="font-serif text-xl text-[#1B1714]">
              No menu items match both filters in this category.
            </p>
            <p className="text-sm text-[#5C5147] mt-2">
              Try resetting the dietary filter or switching to All Offerings.
            </p>
            <button
              type="button"
              onClick={() => {
                onCategoryChange('all');
                setDietaryFilter('all');
              }}
              className="mt-5 px-4 py-2 text-sm font-medium text-[#FAF9F7] bg-[#2C4A3E] rounded-md hover:bg-[#223B31] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isSelected = selectedCateringIds.includes(item.id);
              return (
                <article
                  key={item.id}
                  className="flex flex-col justify-between bg-[#FAF9F7] border border-[#E5DFD6] rounded-lg p-6 hover:border-[#CBBFA8] transition-colors duration-150"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#5C5147]">
                      <span>{item.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">
                        {item.batchTime === 'All Day' ? 'All Day' : `Oven ${item.batchTime}`}
                      </span>
                      {item.veganFriendly && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>Vegan</span>
                        </>
                      )}
                    </div>

                    <div className="mt-2.5 flex items-baseline justify-between gap-4">
                      <h3 className="font-serif text-lg font-medium text-[#1B1714] leading-snug">
                        {item.name}
                      </h3>
                      <span className="font-mono tabular-nums text-base font-medium text-[#1B1714] shrink-0">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <p className="mt-2.5 text-sm text-[#4A4139] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#ECE7DE] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onInspectItem(item)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#4A4139] hover:text-[#1B1714] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#2C4A3E]"
                    >
                      <Info className="w-3.5 h-3.5" aria-hidden="true" />
                      Bake &amp; Allergen Notes
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleCateringItem(item.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#2C4A3E] ${
                        isSelected
                          ? 'bg-[#2C4A3E] text-[#FAF9F7]'
                          : 'bg-[#EFECE6] text-[#1B1714] hover:bg-[#E4DFD4]'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          Added to Inquiry
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                          Add to Catering
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
