import React, { useState } from 'react';
import { X, Star, ShieldCheck, CheckCircle2, ShoppingCart, Truck, FileCheck, Share2, Sparkles } from 'lucide-react';

export function ProductDetailModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'protocols' | 'reviews'
  const [selectedTier, setSelectedTier] = useState(0);

  const images = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [product.image, '/assets/Img1.png', '/assets/img4.png'];

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  const currentPrice = product.volumeTiers && product.volumeTiers[selectedTier]
    ? product.volumeTiers[selectedTier].price
    : product.price;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content-panel" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '960px', padding: 0 }}
      >
        {/* Header Close Strip */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1.5rem',
          borderBottom: '1px solid var(--surface-container)',
          background: 'var(--surface-container-low)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--on-surface-variant)' }}>
            <span style={{ fontWeight: 700, color: 'var(--primary)' }}>SKU: {product.sku}</span>
            <span>•</span>
            <span style={{ color: 'var(--secondary)', fontWeight: 600 }}>EPA Reg #8921-IA-01</span>
          </div>

          <button 
            onClick={onClose}
            style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--outline)', boxShadow: 'var(--shadow-subtle)' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Main Body */}
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
            {/* Left: Product Images & Quality Proof */}
            <div>
              <div style={{
                position: 'relative',
                background: 'var(--surface-container-low)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                border: '1px solid var(--outline-variant)'
              }}>
                <img 
                  src={selectedImage} 
                  alt={product.name} 
                  style={{ width: '100%', height: '320px', objectFit: 'contain' }}
                  onError={(e) => { e.target.src = selectedImage.replace('/assets', ''); }}
                />

                <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <span className="tag-badge primary">{product.unit}</span>
                  {product.badge && <span className="tag-badge secondary">{product.badge}</span>}
                </div>
              </div>

              {/* Gallery Switcher */}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      border: selectedImage === img ? '2px solid var(--primary)' : '1px solid var(--outline-variant)',
                      padding: '2px',
                      background: '#ffffff'
                    }}
                  >
                    <img src={img} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>

              {/* Assurance Callout */}
              <div style={{
                background: 'var(--surface-container)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                marginTop: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <ShieldCheck size={28} color="var(--secondary)" />
                <div style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)', lineHeight: 1.4 }}>
                  <strong style={{ color: 'var(--primary)', display: 'block' }}>Laboratory Assayed Batch</strong>
                  Guaranteed purity standard under AOAC official testing methods.
                </div>
              </div>
            </div>

            {/* Right: Technical Specs & Purchasing Controls */}
            <div>
              {/* Rating & Reviews */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', color: 'var(--amber-accent)' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>{product.rating}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--outline)' }}>({product.reviewsCount} verified grower reviews)</span>
              </div>

              <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', lineHeight: 1.25 }}>
                {product.name}
              </h2>

              <p style={{ fontSize: '0.9rem', color: 'var(--on-surface-variant)', lineHeight: 1.6, marginTop: '0.75rem' }}>
                {product.description}
              </p>

              {/* NPK Ratio Display Block */}
              {product.npk && (
                <div style={{
                  background: 'var(--surface-container-low)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  margin: '1.25rem 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  border: '1px solid var(--outline-variant)'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-headline)' }}>
                      {product.npk.n}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--outline)', textTransform: 'uppercase', fontWeight: 700 }}>
                      Nitrogen (N)
                    </div>
                  </div>
                  <div style={{ fontSize: '1.2rem', color: 'var(--outline-variant)', fontWeight: 'bold' }}>•</div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--secondary)', fontFamily: 'var(--font-headline)' }}>
                      {product.npk.p}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--secondary)', textTransform: 'uppercase', fontWeight: 700 }}>
                      Phosphate (P₂O₅)
                    </div>
                  </div>
                  <div style={{ fontSize: '1.2rem', color: 'var(--outline-variant)', fontWeight: 'bold' }}>•</div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-headline)' }}>
                      {product.npk.k}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--outline)', textTransform: 'uppercase', fontWeight: 700 }}>
                      Potash (K₂O)
                    </div>
                  </div>
                </div>
              )}

              {/* Volume Discount Selector */}
              {product.volumeTiers && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Select Volume Tier
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '0.5rem' }}>
                    {product.volumeTiers.map((tier, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedTier(idx)}
                        style={{
                          padding: '0.5rem',
                          borderRadius: 'var(--radius-sm)',
                          border: selectedTier === idx ? '2px solid var(--secondary)' : '1px solid var(--outline-variant)',
                          background: selectedTier === idx ? 'var(--secondary-container)' : 'var(--surface-container-low)',
                          cursor: 'pointer',
                          textAlign: 'center'
                        }}
                      >
                        <div style={{ fontSize: '0.72rem', color: 'var(--on-surface-variant)', fontWeight: 600 }}>{tier.range}</div>
                        <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--primary)' }}>${tier.price.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing & Stepper */}
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-headline)' }}>
                    ${(currentPrice * quantity).toFixed(2)}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--outline)', marginLeft: '0.4rem' }}>
                    (${currentPrice.toFixed(2)} / unit)
                  </span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: 700, background: 'var(--secondary-container)', padding: '2px 8px', borderRadius: '4px' }}>
                  Ready to Dispatch (24h)
                </span>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div className="quantity-stepper">
                  <button className="stepper-btn" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
                  <span className="stepper-value">{quantity}</span>
                  <button className="stepper-btn" onClick={() => setQuantity((q) => q + 1)}>+</button>
                </div>

                <button 
                  className="btn-primary"
                  style={{ flex: 1, padding: '0.8rem 1.25rem', fontSize: '0.95rem', justifyContent: 'center' }}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={18} /> Add to Commercial Order
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.85rem', fontSize: '0.78rem', color: 'var(--outline)' }}>
                <Truck size={14} color="var(--secondary)" />
                <span>Direct dispatch from regional distribution hubs with guaranteed temperature stability.</span>
              </div>
            </div>
          </div>

          {/* Technical Specifications Accordion Tabs */}
          <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--surface-container)', paddingTop: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--outline-variant)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
              <button 
                onClick={() => setActiveTab('specs')}
                style={{ fontSize: '0.9rem', fontWeight: 700, color: activeTab === 'specs' ? 'var(--primary)' : 'var(--outline)', borderBottom: activeTab === 'specs' ? '2px solid var(--primary)' : 'none', paddingBottom: '4px' }}
              >
                Guaranteed Analysis
              </button>
              <button 
                onClick={() => setActiveTab('protocols')}
                style={{ fontSize: '0.9rem', fontWeight: 700, color: activeTab === 'protocols' ? 'var(--primary)' : 'var(--outline)', borderBottom: activeTab === 'protocols' ? '2px solid var(--primary)' : 'none', paddingBottom: '4px' }}
              >
                Application Protocols
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                style={{ fontSize: '0.9rem', fontWeight: 700, color: activeTab === 'reviews' ? 'var(--primary)' : 'var(--outline)', borderBottom: activeTab === 'reviews' ? '2px solid var(--primary)' : 'none', paddingBottom: '4px' }}
              >
                Grower Field Reviews ({product.reviewsCount})
              </button>
            </div>

            {activeTab === 'specs' && (
              <div style={{ background: 'var(--surface-container-low)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', fontSize: '0.85rem' }}>
                  {Object.entries(product.specs || {}).map(([key, val]) => (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                      <span style={{ color: 'var(--on-surface-variant)', fontWeight: 500 }}>{key}:</span>
                      <strong style={{ color: 'var(--primary)' }}>{val}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'protocols' && (
              <div style={{ fontSize: '0.88rem', color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>
                <p><strong>Primary Method:</strong> {product.applicationMethod}</p>
                <p style={{ marginTop: '0.5rem' }}>
                  Apply according to target crop requirements or certified agronomist soil prescription. For high-volume drip irrigation, pre-mix at 1:10 ratio with clean agitation.
                </p>
                <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--secondary-container)', borderRadius: 'var(--radius-sm)', color: 'var(--on-secondary-container)', fontSize: '0.82rem' }}>
                  <strong>Agronomist Safety Note:</strong> Keep in a dry, ventilated warehouse out of direct sunlight.
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--outline)', marginBottom: '0.25rem' }}>
                    <strong style={{ color: 'var(--primary)' }}>Oak Ridge Poultry &amp; Farms (50,000 Broilers)</strong>
                    <span>Verified Commercial Buyer</span>
                  </div>
                  <p style={{ fontSize: '0.86rem', color: 'var(--on-surface-variant)' }}>
                    "Switching to the NSA Feed Series and Organic Manure increased our flock survival to over 98% and improved finishing FCR markedly. Highly dependable consistency."
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
