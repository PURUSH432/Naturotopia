import React, { useState, useMemo } from 'react';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';
import { LayoutGrid, List, SlidersHorizontal, RotateCcw, X, Shield, Download, FileText, CheckCircle2 } from 'lucide-react';

export function ProductCatalogue({ 
  onAddToCart, 
  onOpenDetail, 
  searchQuery, 
  selectedCategory, 
  setSelectedCategory,
  wishlist,
  onToggleWishlist,
  onOpenQuoteModal 
}) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedCert, setSelectedCert] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const match = p.name.toLowerCase().includes(q) || 
                      p.description.toLowerCase().includes(q) || 
                      p.sku.toLowerCase().includes(q) ||
                      p.tags.some((t) => t.toLowerCase().includes(q));
        if (!match) return false;
      }

      // Category
      if (selectedCategory && p.category !== selectedCategory) {
        return false;
      }

      // Application method
      if (selectedMethod && !p.applicationMethod.toLowerCase().includes(selectedMethod.toLowerCase())) {
        return false;
      }

      // Certification
      if (selectedCert && !p.certifications.some((c) => c.toLowerCase().includes(selectedCert.toLowerCase()))) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // featured default
    });
  }, [searchQuery, selectedCategory, selectedMethod, selectedCert, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory('');
    setSelectedMethod('');
    setSelectedCert('');
  };

  const hasActiveFilters = Boolean(selectedCategory || selectedMethod || selectedCert || searchQuery);

  return (
    <div style={{ paddingTop: '110px', paddingBottom: '4rem', background: 'var(--background)', minHeight: '100vh' }}>
      {/* Top Breadcrumb & Depot Bar */}
      <div style={{ background: 'var(--surface-container-low)', padding: '0.75rem 0', borderBottom: '1px solid var(--outline-variant)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.82rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--on-surface-variant)' }}>
            <span>Home</span>
            <span>/</span>
            <span>Catalogue</span>
            <span>/</span>
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>NSA Formulations &amp; Organic Supplies</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)', fontWeight: 600 }}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>warehouse</span>
            <span>Central Agro Terminal &amp; Packaging Silos (In-Stock)</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2rem' }}>
        {/* Header & Controls Strip */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', background: 'var(--secondary-container)', color: 'var(--on-secondary-container)', padding: '2px 8px', borderRadius: '4px' }}>
                Commercial Ag-Grade
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--outline)', textTransform: 'uppercase', fontWeight: 600 }}>
                High Vitality Guarantee
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', color: 'var(--primary)', lineHeight: 1.1 }}>
              NSA Products &amp; Agro Catalogue
            </h1>
            <p style={{ fontSize: '0.92rem', color: 'var(--on-surface-variant)', marginTop: '0.4rem', maxWidth: '680px' }}>
              Displaying <strong style={{ color: 'var(--primary)' }}>{filteredProducts.length} Premium Formulations</strong> formulated for high poultry vitality, superior weight conversion, organic soil fertilization, and fresh natural produce.
            </p>
          </div>

          {/* View Mode & Sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#ffffff', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-subtle)', border: '1px solid var(--outline-variant)' }}>
            {/* View Mode Toggle */}
            <div style={{ display: 'flex', background: 'var(--surface-container-low)', padding: '2px', borderRadius: 'var(--radius-sm)' }}>
              <button 
                onClick={() => setViewMode('grid')}
                style={{ padding: '4px 8px', borderRadius: 'var(--radius-sm)', background: viewMode === 'grid' ? '#ffffff' : 'transparent', color: viewMode === 'grid' ? 'var(--primary)' : 'var(--outline)', boxShadow: viewMode === 'grid' ? 'var(--shadow-subtle)' : 'none' }}
                title="Grid View"
              >
                <LayoutGrid size={16} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                style={{ padding: '4px 8px', borderRadius: 'var(--radius-sm)', background: viewMode === 'list' ? '#ffffff' : 'transparent', color: viewMode === 'list' ? 'var(--primary)' : 'var(--outline)', boxShadow: viewMode === 'list' ? 'var(--shadow-subtle)' : 'none' }}
                title="Table/List View"
              >
                <List size={16} />
              </button>
            </div>

            {/* Sort Select */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem' }}>
              <span style={{ color: 'var(--outline)', fontWeight: 600 }}>Sort:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ background: 'var(--surface-container-low)', border: 'none', padding: '0.35rem 0.6rem', borderRadius: 'var(--radius-sm)', fontWeight: 600, color: 'var(--primary)', cursor: 'pointer', outline: 'none' }}
              >
                <option value="featured">Featured Formulations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>

            {/* Custom Quote Request */}
            <button 
              className="btn-primary" 
              onClick={onOpenQuoteModal}
              style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
            >
              Custom Blend
            </button>
          </div>
        </div>

        {/* Active Filters Bar */}
        {hasActiveFilters && (
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', background: 'var(--surface-container-low)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid var(--outline-variant)' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
              Active Criteria:
            </span>

            {searchQuery && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#ffffff', padding: '2px 8px', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', fontWeight: 600, boxShadow: 'var(--shadow-subtle)' }}>
                Search: "{searchQuery}"
              </span>
            )}

            {selectedCategory && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#ffffff', padding: '2px 8px', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', fontWeight: 600, boxShadow: 'var(--shadow-subtle)' }}>
                Category: {selectedCategory}
                <X size={12} style={{ cursor: 'pointer' }} onClick={() => setSelectedCategory('')} />
              </span>
            )}

            {selectedMethod && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#ffffff', padding: '2px 8px', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', fontWeight: 600, boxShadow: 'var(--shadow-subtle)' }}>
                Method: {selectedMethod}
                <X size={12} style={{ cursor: 'pointer' }} onClick={() => setSelectedMethod('')} />
              </span>
            )}

            {selectedCert && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#ffffff', padding: '2px 8px', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', fontWeight: 600, boxShadow: 'var(--shadow-subtle)' }}>
                Cert: {selectedCert}
                <X size={12} style={{ cursor: 'pointer' }} onClick={() => setSelectedCert('')} />
              </span>
            )}

            <button 
              onClick={clearAllFilters}
              style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: 700, textDecoration: 'underline', marginLeft: 'auto', cursor: 'pointer' }}
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Layout Grid: Sidebar Filters + Main Product Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem', alignItems: 'start' }} id="catalogue-layout">
          {/* Sidebar */}
          <aside style={{ background: '#ffffff', borderRadius: 'var(--radius-lg)', padding: '1.5rem', boxShadow: 'var(--shadow-card)', border: '1px solid var(--outline-variant)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.5rem', borderBottom: '1px solid var(--surface-container)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontWeight: 700, fontSize: '1rem' }}>
                <SlidersHorizontal size={18} color="var(--secondary)" />
                <span>Agronomy Filters</span>
              </div>
              <button 
                onClick={clearAllFilters} 
                style={{ fontSize: '0.75rem', color: 'var(--outline)', cursor: 'pointer' }}
                title="Reset Filters"
              >
                Reset
              </button>
            </div>

            {/* Category / Formulation Class */}
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.6rem' }}>
                Formulation Class
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.84rem' }}>
                {[
                  { id: '', label: 'All Products' },
                  { id: 'poultry-feed', label: 'Poultry Feeds (50kg)' },
                  { id: 'organic-fertilizer', label: 'Organic Poultry Manure' },
                  { id: 'poultry-medicine', label: 'Veterinary Medicines' },
                  { id: 'fresh-produce', label: 'Farm Fresh Mangoes' }
                ].map((item) => (
                  <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '3px 0' }}>
                    <input 
                      type="radio" 
                      name="catFilter"
                      checked={selectedCategory === item.id}
                      onChange={() => setSelectedCategory(item.id)}
                      style={{ accentColor: 'var(--secondary)' }}
                    />
                    <span style={{ color: selectedCategory === item.id ? 'var(--primary)' : 'var(--on-surface-variant)', fontWeight: selectedCategory === item.id ? 700 : 400 }}>
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Application Method */}
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.6rem' }}>
                Application Method
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.84rem' }}>
                {[
                  { id: '', label: 'Any Method' },
                  { id: 'Broadcast', label: 'Broadcast Granular / Field' },
                  { id: 'Soil', label: 'Soil Drench & Conditioner' },
                  { id: 'Feed', label: 'Direct Livestock Nutrition' },
                  { id: 'Drinking', label: 'Tank Mix / Water Soluble' }
                ].map((m) => (
                  <label key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '3px 0' }}>
                    <input 
                      type="radio" 
                      name="methodFilter"
                      checked={selectedMethod === m.id}
                      onChange={() => setSelectedMethod(m.id)}
                      style={{ accentColor: 'var(--secondary)' }}
                    />
                    <span style={{ color: selectedMethod === m.id ? 'var(--primary)' : 'var(--on-surface-variant)', fontWeight: selectedMethod === m.id ? 700 : 400 }}>
                      {m.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Quality & Organic Certifications */}
            <div style={{ background: 'var(--surface-container-low)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.6rem' }}>
                <Shield size={16} color="var(--secondary)" />
                <span>Certifications</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.82rem' }}>
                {[
                  { id: '', label: 'All Standards' },
                  { id: 'OMRI', label: 'OMRI Listed Organic' },
                  { id: 'ISO 9001', label: 'ISO 9001 Certified' },
                  { id: 'Natural', label: '100% Chemical-Free' }
                ].map((c) => (
                  <label key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="certFilter"
                      checked={selectedCert === c.id}
                      onChange={() => setSelectedCert(c.id)}
                      style={{ accentColor: 'var(--secondary)' }}
                    />
                    <span style={{ color: selectedCert === c.id ? 'var(--primary)' : 'var(--on-surface-variant)', fontWeight: selectedCert === c.id ? 700 : 400 }}>
                      {c.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Need Custom Ratio Card */}
            <div style={{ background: 'var(--primary)', color: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--secondary-fixed)', marginBottom: '0.35rem' }}>
                Need Custom Tonnage?
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--primary-fixed-dim)', lineHeight: 1.4, marginBottom: '0.75rem' }}>
                Submit your farm requirements for railcar, pneumatic hopper, or truckload allocations.
              </p>
              <button 
                onClick={onOpenQuoteModal}
                style={{ width: '100%', padding: '0.5rem', background: 'var(--secondary-fixed)', color: '#002113', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '0.8rem', textAlign: 'center' }}
              >
                Request Bid (.PDF)
              </button>
            </div>
          </aside>

          {/* Main Product Grid / List */}
          <main>
            {filteredProducts.length === 0 ? (
              <div style={{ background: '#ffffff', borderRadius: 'var(--radius-lg)', padding: '3rem 2rem', textAlign: 'center', border: '1px solid var(--outline-variant)' }}>
                <p style={{ fontSize: '1.1rem', color: 'var(--primary)', fontWeight: 700 }}>
                  No formulations match your filter criteria.
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--outline)', marginTop: '0.4rem', marginBottom: '1.5rem' }}>
                  Try relaxing your search terms or resetting application filters.
                </p>
                <button className="btn-primary" onClick={clearAllFilters}>
                  <RotateCcw size={16} /> Reset All Filters
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(280px, 1fr))' : '1fr',
                gap: '1.5rem'
              }}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onOpenDetail={onOpenDetail}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={onToggleWishlist}
                  />
                ))}
              </div>
            )}

            {/* Technical Certificate of Analysis Assurance Strip */}
            <div style={{
              background: 'var(--surface-container-low)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem 2rem',
              marginTop: '3rem',
              border: '1px solid var(--outline-variant)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--secondary)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--primary)' }}>
                    Guaranteed Lab Certificate of Analysis (COA)
                  </h4>
                  <p style={{ fontSize: '0.84rem', color: 'var(--on-surface-variant)' }}>
                    Every batch lot number shipped is backed by certified AOAC and ICP-OES elemental analysis.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button 
                  className="btn-outline" 
                  onClick={() => alert("Batch Assay Search: All current batches #24-TG88 verified 99.8% purity.")}
                >
                  <Download size={16} /> Batch Search
                </button>
                <button 
                  className="btn-primary"
                  onClick={onOpenQuoteModal}
                >
                  Request Bulk Lot
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #catalogue-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
