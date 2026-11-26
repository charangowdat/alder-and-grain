import { Check, Plus, X } from 'lucide-react';
import { useEffect } from 'react';
import { MenuItem } from '../data/bakeryData';

interface ItemDetailModalProps {
  item: MenuItem | null;
  isSelectedForCatering: boolean;
  onToggleCatering: (itemId: string) => void;
  onClose: () => void;
}

export function ItemDetailModal({
  item,
  isSelectedForCatering,
  onToggleCatering,
  onClose,
}: ItemDetailModalProps) {
  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14100D]/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-item-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#FAF9F7] border border-[#E5DFD6] rounded-lg p-6 sm:p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-[#5C5147]">
              {item.categoryLabel} · {item.seasonalNote}
            </p>
            <h3
              id="modal-item-title"
              className="font-serif text-2xl font-medium text-[#1B1714] mt-1"
            >
              {item.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close item details"
            className="w-9 h-9 inline-flex items-center justify-center rounded-md text-[#5C5147] hover:text-[#1B1714] hover:bg-[#EFECE6] transition-colors focus-visible:outline-2 focus-visible:outline-[#2C4A3E]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="mt-4 text-sm sm:text-base text-[#3D352E] leading-relaxed">
          {item.description}
        </p>

        <dl className="mt-6 divide-y divide-[#E5DFD6] border-y border-[#E5DFD6] text-sm">
          <div className="py-3 flex justify-between gap-4">
            <dt className="text-[#5C5147] shrink-0">Counter Price</dt>
            <dd className="font-mono tabular-nums font-medium text-[#1B1714]">
              ${item.price.toFixed(2)}
            </dd>
          </div>
          <div className="py-3 flex justify-between gap-4">
            <dt className="text-[#5C5147] shrink-0">Daily Schedule</dt>
            <dd className="font-mono tabular-nums text-[#1B1714]">
              {item.batchTime === 'All Day' ? 'Served all day' : `Fresh pull at ${item.batchTime}`}
            </dd>
          </div>
          <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
            <dt className="text-[#5C5147] shrink-0">Grain &amp; Sourcing</dt>
            <dd className="text-[#1B1714] sm:text-right">{item.provenance}</dd>
          </div>
          <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
            <dt className="text-[#5C5147] shrink-0">Allergens</dt>
            <dd className="text-[#1B1714] sm:text-right">{item.allergens}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-[#4A4139] hover:text-[#1B1714] rounded-md hover:bg-[#EFECE6] transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onToggleCatering(item.id);
              onClose();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#FAF9F7] bg-[#2C4A3E] rounded-md hover:bg-[#223B31] transition-colors"
          >
            {isSelectedForCatering ? (
              <>
                <Check className="w-4 h-4" />
                Included in Catering
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add to Catering Inquiry
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
