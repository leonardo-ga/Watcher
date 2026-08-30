import { TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { WatchCatalogue } from "./watch-catalogue";

describe("WatchCatalogue", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchCatalogue],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it("should create the catalogue component", () => {
    const fixture = TestBed.createComponent(WatchCatalogue);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it("should initialize with all watches and full price range", () => {
    const fixture = TestBed.createComponent(WatchCatalogue);
    const component = fixture.componentInstance as any;
    expect(component.filteredWatches().length).toBe(9);
    expect(component.minPrice()).toBe(0);
    expect(component.maxPrice()).toBe(10000);
  });

  it("should filter watches by search query", () => {
    const fixture = TestBed.createComponent(WatchCatalogue);
    const component = fixture.componentInstance as any;
    component.searchQuery.set("moonwatch");
    expect(component.filteredWatches().length).toBe(1);
    expect(component.filteredWatches()[0].name).toBe("Speedmaster Moonwatch");
  });

  it("should support multi-select for brands (OR logic within category)", () => {
    const fixture = TestBed.createComponent(WatchCatalogue);
    const component = fixture.componentInstance as any;

    component.toggleBrand("Omega");
    expect(component.filteredWatches().length).toBe(1);

    component.toggleBrand("Tudor");
    expect(component.filteredWatches().length).toBe(2);
    expect(component.filteredWatches().map((w: any) => w.brand)).toEqual(
      expect.arrayContaining(["Omega", "Tudor"])
    );

    // Toggle off Tudor
    component.toggleBrand("Tudor");
    expect(component.filteredWatches().length).toBe(1);

    // Reset with 'All'
    component.toggleBrand("All");
    expect(component.filteredWatches().length).toBe(9);
  });

  it("should support multi-select for styles / types", () => {
    const fixture = TestBed.createComponent(WatchCatalogue);
    const component = fixture.componentInstance as any;

    component.toggleType("Diver");
    expect(component.filteredWatches().length).toBe(2);

    component.toggleType("Chronograph");
    expect(component.filteredWatches().length).toBe(3); // 2 divers + 1 chrono
  });

  it("should support multi-select for movements", () => {
    const fixture = TestBed.createComponent(WatchCatalogue);
    const component = fixture.componentInstance as any;

    component.toggleMovement("Manual");
    expect(component.filteredWatches().length).toBe(2);

    component.toggleMovement("Automatic");
    expect(component.filteredWatches().length).toBe(9); // 2 manual + 7 automatic
  });

  it("should support multi-select for case size brackets", () => {
    const fixture = TestBed.createComponent(WatchCatalogue);
    const component = fixture.componentInstance as any;

    component.toggleSize("small");
    expect(component.filteredWatches().length).toBe(2); // Santos 35.1mm, Khaki 38mm

    component.toggleSize("large");
    expect(component.filteredWatches().length).toBe(4); // + Omega 42mm, Zulu Time 42mm
  });

  it("should filter by custom price range", () => {
    const fixture = TestBed.createComponent(WatchCatalogue);
    const component = fixture.componentInstance as any;

    component.updateMinPrice(1000);
    component.updateMaxPrice(5000);
    const results = component.filteredWatches();

    expect(results.length).toBe(3); // Tudor BB58 (4490), Zulu Time (3150), Seiko Prospex (1300)
    for (const w of results) {
      expect(w.price).toBeGreaterThanOrEqual(1000);
      expect(w.price).toBeLessThanOrEqual(5000);
    }
  });

  it("should prevent lower end from exceeding higher end and vice versa", () => {
    const fixture = TestBed.createComponent(WatchCatalogue);
    const component = fixture.componentInstance as any;

    // Set max price to 5000
    component.updateMaxPrice(5000);
    expect(component.maxPrice()).toBe(5000);

    // Attempt to drag min price to 7000 (higher than max)
    component.updateMinPrice(7000);
    expect(component.minPrice()).toBe(5000); // Clamped to maxPrice

    // Simulate native onMinInput with over-limit value
    const mockMinInput = { target: { value: "8000" } } as any;
    component.onMinInput(mockMinInput);
    expect(component.minPrice()).toBe(5000);
    expect(mockMinInput.target.value).toBe("5000");

    // Attempt to drag max price below min price (e.g. 3000 when min is 5000)
    component.updateMaxPrice(3000);
    expect(component.maxPrice()).toBe(5000); // Clamped to minPrice

    const mockMaxInput = { target: { value: "2000" } } as any;
    component.onMaxInput(mockMaxInput);
    expect(component.maxPrice()).toBe(5000);
    expect(mockMaxInput.target.value).toBe("5000");
  });

  it("should set and activate price presets", () => {
    const fixture = TestBed.createComponent(WatchCatalogue);
    const component = fixture.componentInstance as any;

    component.setPricePreset(0, 1000);
    expect(component.isPricePresetActive(0, 1000)).toBe(true);
    expect(component.filteredWatches().length).toBe(2); // Khaki (745), PRX (775)
  });

  it("should sort watches by price ascending and descending", () => {
    const fixture = TestBed.createComponent(WatchCatalogue);
    const component = fixture.componentInstance as any;

    component.sortBy.set("price-asc");
    const asc = component.filteredWatches();
    expect(asc[0].price).toBe(745);

    component.sortBy.set("price-desc");
    const desc = component.filteredWatches();
    expect(desc[0].price).toBe(8600);
  });

  it("should allow granular removal of active filters", () => {
    const fixture = TestBed.createComponent(WatchCatalogue);
    const component = fixture.componentInstance as any;

    component.toggleBrand("Omega");
    component.toggleBrand("Tudor");
    expect(component.activeFilters().length).toBe(2);

    const omegaFilter = component.activeFilters().find((f: any) => f.value === "Omega");
    component.removeActiveFilter(omegaFilter);

    expect(component.selectedBrands()).toEqual(["Tudor"]);
    expect(component.filteredWatches().length).toBe(1);
  });

  it("should clear all filters correctly", () => {
    const fixture = TestBed.createComponent(WatchCatalogue);
    const component = fixture.componentInstance as any;

    component.searchQuery.set("seiko");
    component.toggleBrand("Seiko");
    component.toggleType("Diver");
    component.updateMinPrice(2000);
    component.clearFilters();

    expect(component.searchQuery()).toBe("");
    expect(component.selectedBrands().length).toBe(0);
    expect(component.selectedTypes().length).toBe(0);
    expect(component.minPrice()).toBe(0);
    expect(component.maxPrice()).toBe(10000);
    expect(component.filteredWatches().length).toBe(9);
  });
});

