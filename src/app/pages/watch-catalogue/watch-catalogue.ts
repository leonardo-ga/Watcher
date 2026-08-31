import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { WatchDataService } from '../../data/watch-data.service';
import { Movement, Watch, WatchType } from '../../data/watches';

export type SortOption =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'brand-asc'
  | 'size-asc';

export interface ActiveFilter {
  id: string;
  category: 'search' | 'brand' | 'type' | 'movement' | 'size' | 'price';
  label: string;
  value: string;
  rawValue?: string;
}

export interface FilterOption<T = string> {
  label: string;
  value: T;
  count: number;
}

export interface PricePreset {
  label: string;
  min: number;
  max: number;
}

@Component({
  selector: 'app-watch-catalogue',
  imports: [FormsModule, RouterLink],
  templateUrl: './watch-catalogue.html',
  styleUrl: './watch-catalogue.css',
})
export class WatchCatalogue {
  private readonly watchData = inject(WatchDataService);

  protected get watches(): readonly Watch[] {
    return this.watchData.watches();
  }

  // Filter signals
  protected readonly searchQuery = signal('');
  protected readonly selectedBrands = signal<string[]>([]);
  protected readonly selectedTypes = signal<string[]>([]);
  protected readonly selectedMovements = signal<string[]>([]);
  protected readonly selectedSizes = signal<string[]>([]);

  // Price range signals
  protected readonly minPriceLimit = 0;
  protected readonly maxPriceLimit = 10000;
  protected readonly priceStep = 100;
  protected readonly minPrice = signal<number>(0);
  protected readonly maxPrice = signal<number>(10000);

  // Sorting signal
  protected readonly sortBy = signal<SortOption>('featured');

  // Size option definitions
  protected readonly sizeOptions = [
    { label: '< 39 mm', value: 'small' },
    { label: '39 — 40.5 mm', value: 'medium' },
    { label: '> 40.5 mm', value: 'large' },
  ];

  // Price preset definitions
  protected readonly pricePresets: PricePreset[] = [
    { label: 'Any price', min: 0, max: 10000 },
    { label: 'Under €1k', min: 0, max: 1000 },
    { label: '€1k — €5k', min: 1000, max: 5000 },
    { label: '€5k — €8k', min: 5000, max: 8000 },
    { label: 'Over €8k', min: 8000, max: 10000 },
  ];

  // Dynamic filter options with counts
  protected readonly brandOptions = computed<FilterOption[]>(() => {
    const brands = Array.from(new Set(this.watches.map((w) => w.brand))).sort();
    return brands.map((b) => ({
      label: b,
      value: b,
      count: this.watches.filter((w) => w.brand === b).length,
    }));
  });

  protected readonly typeOptions = computed<FilterOption[]>(() => {
    const types: WatchType[] = ['Chronograph', 'Diver', 'Dress', 'Field', 'GMT', 'Integrated sports'];
    return types.map((t) => ({
      label: t,
      value: t,
      count: this.watches.filter((w) => w.type === t).length,
    }));
  });

  protected readonly movementOptions = computed<FilterOption[]>(() => {
    const movements: Movement[] = ['Automatic', 'Manual', 'Quartz'];
    return movements.map((m) => ({
      label: m,
      value: m,
      count: this.watches.filter((w) => w.movement === m).length,
    }));
  });

  protected readonly sizeFilterOptions = computed<FilterOption[]>(() => {
    return this.sizeOptions.map((opt) => ({
      label: opt.label,
      value: opt.value,
      count: this.watches.filter((w) => this.matchesSizeBracket(w.caseSize, opt.value)).length,
    }));
  });

  // Active filters list
  protected readonly activeFilters = computed<ActiveFilter[]>(() => {
    const list: ActiveFilter[] = [];

    const q = this.searchQuery().trim();
    if (q) {
      list.push({ id: 'search', category: 'search', label: 'Search', value: `"${q}"` });
    }

    for (const b of this.selectedBrands()) {
      list.push({ id: `brand-${b}`, category: 'brand', label: 'Brand', value: b, rawValue: b });
    }

    for (const t of this.selectedTypes()) {
      list.push({ id: `type-${t}`, category: 'type', label: 'Style', value: t, rawValue: t });
    }

    for (const m of this.selectedMovements()) {
      list.push({ id: `movement-${m}`, category: 'movement', label: 'Movement', value: m, rawValue: m });
    }

    for (const s of this.selectedSizes()) {
      const opt = this.sizeOptions.find((o) => o.value === s);
      const label = opt ? opt.label : s;
      list.push({ id: `size-${s}`, category: 'size', label: 'Size', value: label, rawValue: s });
    }

    if (this.minPrice() > this.minPriceLimit || this.maxPrice() < this.maxPriceLimit) {
      list.push({
        id: 'price',
        category: 'price',
        label: 'Price',
        value: `${this.formatPrice(this.minPrice())} — ${this.formatPrice(this.maxPrice())}`,
      });
    }

    return list;
  });

  // Filtered and sorted watches
  protected readonly filteredWatches = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const brands = this.selectedBrands();
    const types = this.selectedTypes();
    const movements = this.selectedMovements();
    const sizes = this.selectedSizes();
    const minP = this.minPrice();
    const maxP = this.maxPrice();
    const sort = this.sortBy();

    const filtered = this.watches.filter((watch) => {
      const matchesSearch =
        !query ||
        watch.name.toLowerCase().includes(query) ||
        watch.brand.toLowerCase().includes(query) ||
        watch.type.toLowerCase().includes(query) ||
        watch.movement.toLowerCase().includes(query) ||
        watch.caseSize.toLowerCase().includes(query) ||
        watch.description.toLowerCase().includes(query);

      const matchesBrand = brands.length === 0 || brands.includes(watch.brand);
      const matchesType = types.length === 0 || types.includes(watch.type);
      const matchesMovement = movements.length === 0 || movements.includes(watch.movement);
      const matchesSize =
        sizes.length === 0 || sizes.some((s) => this.matchesSizeBracket(watch.caseSize, s));
      const matchesPrice = watch.price >= minP && watch.price <= maxP;

      return matchesSearch && matchesBrand && matchesType && matchesMovement && matchesSize && matchesPrice;
    });

    // Sorting
    return [...filtered].sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'brand-asc':
          return a.brand.localeCompare(b.brand);
        case 'size-asc':
          return this.parseCaseDiameter(a.caseSize) - this.parseCaseDiameter(b.caseSize);
        case 'featured':
        default:
          return 0;
      }
    });
  });

  // Multi-select toggle methods
  protected toggleBrand(brand: string): void {
    if (brand === 'All') {
      this.selectedBrands.set([]);
      return;
    }
    const current = this.selectedBrands();
    if (current.includes(brand)) {
      this.selectedBrands.set(current.filter((b) => b !== brand));
    } else {
      this.selectedBrands.set([...current, brand]);
    }
  }

  protected isBrandSelected(brand: string): boolean {
    if (brand === 'All') {
      return this.selectedBrands().length === 0;
    }
    return this.selectedBrands().includes(brand);
  }

  protected toggleType(type: string): void {
    if (type === 'All') {
      this.selectedTypes.set([]);
      return;
    }
    const current = this.selectedTypes();
    if (current.includes(type)) {
      this.selectedTypes.set(current.filter((t) => t !== type));
    } else {
      this.selectedTypes.set([...current, type]);
    }
  }

  protected isTypeSelected(type: string): boolean {
    if (type === 'All') {
      return this.selectedTypes().length === 0;
    }
    return this.selectedTypes().includes(type);
  }

  protected toggleMovement(movement: string): void {
    if (movement === 'All') {
      this.selectedMovements.set([]);
      return;
    }
    const current = this.selectedMovements();
    if (current.includes(movement)) {
      this.selectedMovements.set(current.filter((m) => m !== movement));
    } else {
      this.selectedMovements.set([...current, movement]);
    }
  }

  protected isMovementSelected(movement: string): boolean {
    if (movement === 'All') {
      return this.selectedMovements().length === 0;
    }
    return this.selectedMovements().includes(movement);
  }

  protected toggleSize(size: string): void {
    if (size === 'All') {
      this.selectedSizes.set([]);
      return;
    }
    const current = this.selectedSizes();
    if (current.includes(size)) {
      this.selectedSizes.set(current.filter((s) => s !== size));
    } else {
      this.selectedSizes.set([...current, size]);
    }
  }

  protected isSizeSelected(size: string): boolean {
    if (size === 'All') {
      return this.selectedSizes().length === 0;
    }
    return this.selectedSizes().includes(size);
  }

  // Price range percentage for track fill
  protected readonly minPercent = computed(() => {
    return ((this.minPrice() - this.minPriceLimit) / (this.maxPriceLimit - this.minPriceLimit)) * 100;
  });

  protected readonly maxPercent = computed(() => {
    return ((this.maxPrice() - this.minPriceLimit) / (this.maxPriceLimit - this.minPriceLimit)) * 100;
  });

  // Price range methods
  protected setPricePreset(min: number, max: number): void {
    const clampedMin = Math.min(Math.max(min, this.minPriceLimit), this.maxPriceLimit);
    const clampedMax = Math.max(Math.min(max, this.maxPriceLimit), clampedMin);
    this.minPrice.set(clampedMin);
    this.maxPrice.set(clampedMax);
  }

  protected isPricePresetActive(min: number, max: number): boolean {
    return this.minPrice() === min && this.maxPrice() === max;
  }

  protected updateMinPrice(val: number): void {
    const num = Number(val);
    if (!isNaN(num)) {
      const clamped = Math.min(Math.max(num, this.minPriceLimit), this.maxPrice());
      this.minPrice.set(clamped);
    }
  }

  protected updateMaxPrice(val: number): void {
    const num = Number(val);
    if (!isNaN(num)) {
      const clamped = Math.max(Math.min(num, this.maxPriceLimit), this.minPrice());
      this.maxPrice.set(clamped);
    }
  }

  protected onMinInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const num = Number(input.value);
    if (!isNaN(num)) {
      if (num > this.maxPrice()) {
        input.value = String(this.maxPrice());
        this.minPrice.set(this.maxPrice());
      } else {
        const clamped = Math.max(num, this.minPriceLimit);
        this.minPrice.set(clamped);
      }
    }
  }

  protected onMaxInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const num = Number(input.value);
    if (!isNaN(num)) {
      if (num < this.minPrice()) {
        input.value = String(this.minPrice());
        this.maxPrice.set(this.minPrice());
      } else {
        const clamped = Math.min(num, this.maxPriceLimit);
        this.maxPrice.set(clamped);
      }
    }
  }

  protected removeActiveFilter(filter: ActiveFilter): void {
    switch (filter.category) {
      case 'search':
        this.searchQuery.set('');
        break;
      case 'brand':
        if (filter.rawValue) this.toggleBrand(filter.rawValue);
        break;
      case 'type':
        if (filter.rawValue) this.toggleType(filter.rawValue);
        break;
      case 'movement':
        if (filter.rawValue) this.toggleMovement(filter.rawValue);
        break;
      case 'size':
        if (filter.rawValue) this.toggleSize(filter.rawValue);
        break;
      case 'price':
        this.minPrice.set(this.minPriceLimit);
        this.maxPrice.set(this.maxPriceLimit);
        break;
    }
  }

  protected clearFilters(): void {
    this.searchQuery.set('');
    this.selectedBrands.set([]);
    this.selectedTypes.set([]);
    this.selectedMovements.set([]);
    this.selectedSizes.set([]);
    this.minPrice.set(this.minPriceLimit);
    this.maxPrice.set(this.maxPriceLimit);
  }

  protected formatPrice(price: number): string {
    return new Intl.NumberFormat('en-IE', {
      currency: 'EUR',
      maximumFractionDigits: 0,
      style: 'currency',
    }).format(price);
  }

  protected parseCaseDiameter(sizeStr: string): number {
    const match = sizeStr.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }

  private matchesSizeBracket(sizeStr: string, bracket: string): boolean {
    const diameter = this.parseCaseDiameter(sizeStr);
    switch (bracket) {
      case 'small':
        return diameter < 39;
      case 'medium':
        return diameter >= 39 && diameter <= 40.5;
      case 'large':
        return diameter > 40.5;
      default:
        return true;
    }
  }
}
