import { useState } from 'react';
import { CateringSection } from './components/CateringSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { ItemDetailModal } from './components/ItemDetailModal';
import { Navbar } from './components/Navbar';
import { ReviewsSection } from './components/ReviewsSection';
import { FilterTab, SeasonalMenuSection } from './components/SeasonalMenuSection';
import { VisitSection } from './components/VisitSection';
import { MenuCategory, MenuItem } from './data/bakeryData';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<FilterTab>('all');
  const [selectedCateringIds, setSelectedCateringIds] = useState<string[]>([]);
  const [inspectedItem, setInspectedItem] = useState<MenuItem | null>(null);

  const handleSelectBatchCategory = (category: MenuCategory) => {
    setActiveCategory(category);
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleToggleCateringItem = (itemId: string) => {
    setSelectedCateringIds((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] text-[#1B1714]">
      <Navbar selectedCateringCount={selectedCateringIds.length} />

      <main className="flex-1">
        <HeroSection onSelectBatchCategory={handleSelectBatchCategory} />

        <SeasonalMenuSection
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          selectedCateringIds={selectedCateringIds}
          onToggleCateringItem={handleToggleCateringItem}
          onInspectItem={setInspectedItem}
        />

        <ReviewsSection />

        <VisitSection />

        <CateringSection
          selectedCateringIds={selectedCateringIds}
          onToggleCateringItem={handleToggleCateringItem}
          onClearSelectedItems={() => setSelectedCateringIds([])}
        />
      </main>

      <Footer />

      <ItemDetailModal
        item={inspectedItem}
        isSelectedForCatering={
          inspectedItem ? selectedCateringIds.includes(inspectedItem.id) : false
        }
        onToggleCatering={handleToggleCateringItem}
        onClose={() => setInspectedItem(null)}
      />
    </div>
  );
}
