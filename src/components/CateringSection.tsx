import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import { FormEvent, useMemo, useState } from 'react';
import { CATERING_PACKAGES, MENU_ITEMS } from '../data/bakeryData';

interface CateringSectionProps {
  selectedCateringIds: string[];
  onToggleCateringItem: (itemId: string) => void;
  onClearSelectedItems: () => void;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  guestCount: string;
  packageId: string;
  pickupOrDelivery: 'pickup' | 'delivery';
  notes: string;
}

interface SubmittedReceipt {
  referenceId: string;
  name: string;
  email: string;
  eventDate: string;
  guestCount: number;
  packageName: string;
  pickupOrDelivery: 'pickup' | 'delivery';
  selectedItemNames: string[];
}

type FormErrors = Partial<Record<keyof FormState, string>>;

function getTomorrowIsoDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  return d.toISOString().split('T')[0];
}

export function CateringSection({
  selectedCateringIds,
  onToggleCateringItem,
  onClearSelectedItems,
}: CateringSectionProps) {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    eventDate: getTomorrowIsoDate(),
    guestCount: '24',
    packageId: CATERING_PACKAGES[0].id,
    pickupOrDelivery: 'pickup',
    notes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [receipt, setReceipt] = useState<SubmittedReceipt | null>(null);

  const selectedItems = useMemo(
    () => MENU_ITEMS.filter((item) => selectedCateringIds.includes(item.id)),
    [selectedCateringIds]
  );

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name or company contact.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    const digitsOnly = form.phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      nextErrors.phone = 'Please enter a 10-digit phone number for order confirmation.';
    }
    if (!form.eventDate) {
      nextErrors.eventDate = 'Please select an event date.';
    } else {
      const chosen = new Date(`${form.eventDate}T12:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (chosen < today) {
        nextErrors.eventDate = 'Event date cannot be in the past.';
      }
    }
    const guests = Number(form.guestCount);
    if (!Number.isFinite(guests) || guests < 8 || guests > 250) {
      nextErrors.guestCount = 'Catering orders serve between 8 and 250 guests.';
    }
    return nextErrors;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const pkg =
      CATERING_PACKAGES.find((p) => p.id === form.packageId)?.name ?? 'Custom Bakery Catering';
    const refNumber = `AG-${Math.floor(1000 + Math.random() * 9000)}`;

    setReceipt({
      referenceId: refNumber,
      name: form.name.trim(),
      email: form.email.trim(),
      eventDate: form.eventDate,
      guestCount: Number(form.guestCount),
      packageName: pkg,
      pickupOrDelivery: form.pickupOrDelivery,
      selectedItemNames: selectedItems.map((i) => i.name),
    });
    setErrors({});
  };

  const handleReset = () => {
    setReceipt(null);
    setForm({
      name: '',
      email: '',
      phone: '',
      eventDate: getTomorrowIsoDate(),
      guestCount: '24',
      packageId: CATERING_PACKAGES[0].id,
      pickupOrDelivery: 'pickup',
      notes: '',
    });
    onClearSelectedItems();
  };

  return (
    <section id="catering" className="py-16 sm:py-24 bg-[#F3F0EA]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium tracking-wide text-[#5C5147] mb-2">
              Neighborhood Catering &amp; Group Crates
            </p>
            <h2
              className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#1B1714]"
              style={{ textWrap: 'balance' }}
            >
              Morning pastries, loaves &amp; coffee totes for your gathering
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#4A4139] leading-relaxed">
              We bake wholesale crates for studio meetings, weekend brunches, and neighborhood
              celebrations with 48 hours notice. Delivery is available within 5 miles of Ballard.
            </p>

            <div className="mt-8 space-y-4">
              {CATERING_PACKAGES.map((pkg) => {
                const isActive = form.packageId === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({ ...prev, packageId: pkg.id }));
                      if (receipt) setReceipt(null);
                    }}
                    className={`w-full text-left p-5 rounded-lg border transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#2C4A3E] ${
                      isActive
                        ? 'bg-[#FAF9F7] border-[#2C4A3E]'
                        : 'bg-[#FAF9F7]/70 border-[#E5DFD6] hover:border-[#CBBFA8]'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-serif text-lg font-medium text-[#1B1714]">
                        {pkg.name}
                      </span>
                      <span className="font-mono tabular-nums text-sm font-medium text-[#2C4A3E] shrink-0">
                        {pkg.priceNote}
                      </span>
                    </div>
                    <p className="text-xs text-[#5C5147] mt-1">{pkg.servingRange}</p>
                    <p className="text-sm text-[#4A4139] mt-2 leading-relaxed">{pkg.summary}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#FAF9F7] border border-[#E5DFD6] rounded-lg p-6 sm:p-8 lg:p-10">
            {receipt ? (
              <div className="py-4" role="status" aria-live="polite">
                <div className="flex items-center gap-3 text-[#2C4A3E]">
                  <CheckCircle2 className="w-6 h-6 shrink-0" aria-hidden="true" />
                  <span className="font-mono tabular-nums text-sm font-medium">
                    Inquiry {receipt.referenceId} Received
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1B1714] mt-3">
                  Thank you, {receipt.name}. We&apos;ll confirm oven availability within 1 business day.
                </h3>

                <p className="mt-3 text-sm text-[#4A4139] leading-relaxed">
                  A copy of your request has been queued for our bakery lead and will be sent to{' '}
                  <span className="font-medium text-[#1B1714]">{receipt.email}</span>.
                </p>

                <dl className="mt-6 divide-y divide-[#E5DFD6] border-y border-[#E5DFD6] text-sm">
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-[#5C5147]">Package</dt>
                    <dd className="font-medium text-[#1B1714] text-right">{receipt.packageName}</dd>
                  </div>
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-[#5C5147]">Event Date</dt>
                    <dd className="font-mono tabular-nums text-[#1B1714]">{receipt.eventDate}</dd>
                  </div>
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-[#5C5147]">Estimated Guests</dt>
                    <dd className="font-mono tabular-nums text-[#1B1714]">
                      {receipt.guestCount} guests
                    </dd>
                  </div>
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-[#5C5147]">Fulfillment</dt>
                    <dd className="text-[#1B1714] capitalize">{receipt.pickupOrDelivery}</dd>
                  </div>
                  {receipt.selectedItemNames.length > 0 && (
                    <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
                      <dt className="text-[#5C5147] shrink-0">Requested Items</dt>
                      <dd className="text-[#1B1714] sm:text-right">
                        {receipt.selectedItemNames.join(', ')}
                      </dd>
                    </div>
                  )}
                </dl>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2 text-sm font-medium text-[#FAF9F7] bg-[#2C4A3E] rounded-md hover:bg-[#223B31] transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="pb-5 border-b border-[#E5DFD6]">
                  <h3 className="font-serif text-2xl font-medium text-[#1B1714]">
                    Request a Catering Proposal
                  </h3>
                  <p className="text-sm text-[#5C5147] mt-1">
                    Tell us about your event date and headcount. No deposit required until we
                    confirm your bake window.
                  </p>
                </div>

                {selectedItems.length > 0 && (
                  <div className="mt-5 p-4 bg-[#F3F0EA] border border-[#E2DBD0] rounded-md">
                    <div className="flex items-center justify-between gap-2 text-xs font-medium text-[#1B1714]">
                      <span>Selected from Seasonal Menu ({selectedItems.length})</span>
                      <button
                        type="button"
                        onClick={onClearSelectedItems}
                        className="text-[#5C5147] hover:text-[#1B1714] underline underline-offset-2"
                      >
                        Clear all
                      </button>
                    </div>
                    <ul className="mt-2.5 flex flex-wrap gap-2">
                      {selectedItems.map((item) => (
                        <li
                          key={item.id}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-[#FAF9F7] border border-[#D8D0C4] rounded text-[#1B1714]"
                        >
                          <span>{item.name}</span>
                          <button
                            type="button"
                            onClick={() => onToggleCateringItem(item.id)}
                            aria-label={`Remove ${item.name} from catering inquiry`}
                            className="text-[#5C5147] hover:text-[#1B1714]"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="catering-name"
                      className="block text-xs font-semibold text-[#1B1714] mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      id="catering-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, name: e.target.value }));
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="Clara Sorensen"
                      className={`w-full px-3.5 py-2.5 text-sm bg-[#FAF9F7] border rounded-md text-[#1B1714] placeholder:text-[#8E8377] focus:outline-none focus:ring-2 focus:ring-[#2C4A3E] ${
                        errors.name ? 'border-[#9B2C2C]' : 'border-[#D8D0C4]'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#9B2C2C]">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="catering-email"
                      className="block text-xs font-semibold text-[#1B1714] mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      id="catering-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, email: e.target.value }));
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="clara@studio-ballard.com"
                      className={`w-full px-3.5 py-2.5 text-sm bg-[#FAF9F7] border rounded-md text-[#1B1714] placeholder:text-[#8E8377] focus:outline-none focus:ring-2 focus:ring-[#2C4A3E] ${
                        errors.email ? 'border-[#9B2C2C]' : 'border-[#D8D0C4]'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#9B2C2C]">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="catering-phone"
                      className="block text-xs font-semibold text-[#1B1714] mb-1.5"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="catering-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, phone: e.target.value }));
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      placeholder="(206) 555-0192"
                      className={`w-full px-3.5 py-2.5 text-sm bg-[#FAF9F7] border rounded-md text-[#1B1714] placeholder:text-[#8E8377] focus:outline-none focus:ring-2 focus:ring-[#2C4A3E] ${
                        errors.phone ? 'border-[#9B2C2C]' : 'border-[#D8D0C4]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#9B2C2C]">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="catering-package"
                      className="block text-xs font-semibold text-[#1B1714] mb-1.5"
                    >
                      Catering Package
                    </label>
                    <select
                      id="catering-package"
                      value={form.packageId}
                      onChange={(e) => setForm((prev) => ({ ...prev, packageId: e.target.value }))}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F7] border border-[#D8D0C4] rounded-md text-[#1B1714] focus:outline-none focus:ring-2 focus:ring-[#2C4A3E]"
                    >
                      {CATERING_PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} ({pkg.priceNote})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="catering-date"
                      className="block text-xs font-semibold text-[#1B1714] mb-1.5"
                    >
                      Event Date *
                    </label>
                    <input
                      id="catering-date"
                      type="date"
                      value={form.eventDate}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, eventDate: e.target.value }));
                        if (errors.eventDate) {
                          setErrors((prev) => ({ ...prev, eventDate: undefined }));
                        }
                      }}
                      className={`w-full px-3.5 py-2.5 text-sm font-mono tabular-nums bg-[#FAF9F7] border rounded-md text-[#1B1714] focus:outline-none focus:ring-2 focus:ring-[#2C4A3E] ${
                        errors.eventDate ? 'border-[#9B2C2C]' : 'border-[#D8D0C4]'
                      }`}
                    />
                    {errors.eventDate && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#9B2C2C]">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        {errors.eventDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="catering-guests"
                      className="block text-xs font-semibold text-[#1B1714] mb-1.5"
                    >
                      Estimated Guest Count *
                    </label>
                    <input
                      id="catering-guests"
                      type="number"
                      min={8}
                      max={250}
                      value={form.guestCount}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, guestCount: e.target.value }));
                        if (errors.guestCount) {
                          setErrors((prev) => ({ ...prev, guestCount: undefined }));
                        }
                      }}
                      className={`w-full px-3.5 py-2.5 text-sm font-mono tabular-nums bg-[#FAF9F7] border rounded-md text-[#1B1714] focus:outline-none focus:ring-2 focus:ring-[#2C4A3E] ${
                        errors.guestCount ? 'border-[#9B2C2C]' : 'border-[#D8D0C4]'
                      }`}
                    />
                    {errors.guestCount && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#9B2C2C]">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        {errors.guestCount}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-5">
                  <span className="block text-xs font-semibold text-[#1B1714] mb-2">
                    Fulfillment Preference
                  </span>
                  <div className="inline-flex items-center gap-1 p-1 bg-[#EFECE6] border border-[#E2DBD0] rounded-lg">
                    {(
                      [
                        { id: 'pickup', label: 'Bakery Pickup (Ballard Ave)' },
                        { id: 'delivery', label: 'Local Delivery (Seattle)' },
                      ] as const
                    ).map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({ ...prev, pickupOrDelivery: opt.id }))
                        }
                        className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                          form.pickupOrDelivery === opt.id
                            ? 'bg-[#FAF9F7] text-[#1B1714] shadow-xs'
                            : 'text-[#5C5147] hover:text-[#1B1714]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="catering-notes"
                    className="block text-xs font-semibold text-[#1B1714] mb-1.5"
                  >
                    Dietary Requirements, Timing &amp; Menu Notes
                  </label>
                  <textarea
                    id="catering-notes"
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
                    placeholder="Let us know your preferred arrival time, nut-free or vegan counts, or oat milk preferences..."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F7] border border-[#D8D0C4] rounded-md text-[#1B1714] placeholder:text-[#8E8377] focus:outline-none focus:ring-2 focus:ring-[#2C4A3E]"
                  />
                </div>

                <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-[#5C5147]">
                    Same-week inquiries? Call the counter directly at (206) 555-0148.
                  </p>
                  <button
                    type="submit"
                    className="px-6 py-3 text-sm font-semibold text-[#FAF9F7] bg-[#2C4A3E] rounded-md hover:bg-[#223B31] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C4A3E]"
                  >
                    Send Catering Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
