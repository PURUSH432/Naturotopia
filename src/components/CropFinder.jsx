import React, { useState } from 'react';
import { cropPrescriptions } from '../data/products';
import { products } from '../data/products';
import { Sprout, CheckCircle2, ArrowRight, ShoppingCart, Sparkles } from 'lucide-react';

export function CropFinder({ onAddToCart, onOpenProductDetail }) {
  const [selectedCropId, setSelectedCropId] = useState(cropPrescriptions[0].id);

  const activeCrop = cropPrescriptions.find((c) => c.id === selectedCropId) || cropPrescriptions[0];
  const recommendedProduct = products.find((p) => p.id === activeCrop.recommendedProductId) || products[3];

  return (
    <section style={{ padding: '4rem 0', background: 'var(--surface-container-low)' }}>
      <div className="container">
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid var(--outline-variant)'
        }}>
          {/* Header */}
          <div style={{ maxWidth: '680px', marginBottom: '2rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--secondary)', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
              <Sparkles size={16} />
              <span>Interactive Crop Prescription Engine</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', color: 'var(--primary)' }}>
              Fertilizer Finder by Target Crop
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--on-surface-variant)', marginTop: '0.5rem', lineHeight: 1.5 }}>
              Select your crop family to inspect typical nutrient depletion curves, recommended formulation regimens, and verified application windows.
            </p>
          </div>

          {/* Crop Selector Tabs (Native Pill style with scroll) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.75rem',
            marginBottom: '1.75rem',
            scrollbarWidth: 'none'
          }}>
            {cropPrescriptions.map((crop) => {
              const isSelected = crop.id === selectedCropId;
              return (
                <button
                  key={crop.id}
                  onClick={() => setSelectedCropId(crop.id)}
                  style={{
                    padding: '0.65rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    whiteSpace: 'nowrap',
                    transition: 'all var(--transition-normal)',
                    background: isSelected ? 'var(--primary)' : 'var(--surface-container)',
                    color: isSelected ? '#ffffff' : 'var(--on-surface)',
                    boxShadow: isSelected ? 'var(--shadow-card)' : 'none'
                  }}
                >
                  {crop.title}
                </button>
              );
            })}
          </div>

          {/* Prescription Content Box */}
          <div style={{
            background: 'var(--surface-container-low)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            border: '1px solid var(--outline-variant)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              alignItems: 'center'
            }}>
              {/* Left: Agronomic Parameters */}
              <div>
                <div style={{ display: 'inline-block', padding: '0.25rem 0.65rem', background: 'var(--secondary-container)', color: 'var(--on-secondary-container)', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                  {activeCrop.stage}
                </div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                  {activeCrop.headline}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--on-surface-variant)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {activeCrop.description}
                </p>

                {/* Key Metrics Chips */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.75rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)' }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--outline)', textTransform: 'uppercase', fontWeight: 700 }}>Dosage Rate</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--primary)' }}>{activeCrop.dosage}</div>
                  </div>
                  <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)' }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--outline)', textTransform: 'uppercase', fontWeight: 700 }}>Target pH</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--secondary)' }}>{activeCrop.targetPh}</div>
                  </div>
                  <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)' }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--outline)', textTransform: 'uppercase', fontWeight: 700 }}>Growth Cycle</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--primary)' }}>{activeCrop.growthCycle}</div>
                  </div>
                </div>

                {/* Benefits List */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--on-surface)' }}>
                  {activeCrop.benefits.map((b, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle2 size={16} color="var(--secondary)" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Recommended Product Card Preview */}
              <div style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-hover)',
                border: '1.5px solid var(--secondary)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', textTransform: 'uppercase', background: 'var(--secondary-container)', padding: '2px 8px', borderRadius: '4px' }}>
                    Recommended Match
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--outline)' }}>
                    SKU: {recommendedProduct.sku}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <img 
                    src={recommendedProduct.image} 
                    alt={recommendedProduct.name}
                    style={{ width: '84px', height: '84px', objectFit: 'cover', borderRadius: 'var(--radius-md)', background: 'var(--surface-container-low)' }}
                    onError={(e) => { e.target.src = recommendedProduct.image.replace('/assets', ''); }}
                  />
                  <div>
                    <h4 
                      style={{ fontSize: '1rem', color: 'var(--primary)', cursor: 'pointer', lineHeight: 1.3 }}
                      onClick={() => onOpenProductDetail(recommendedProduct)}
                    >
                      {recommendedProduct.name}
                    </h4>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.25rem' }}>
                      ${recommendedProduct.price.toFixed(2)} <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--outline)' }}>/ {recommendedProduct.unit}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button
                    className="btn-primary"
                    style={{ flex: 1, padding: '0.65rem 1rem', fontSize: '0.88rem', justifyContent: 'center' }}
                    onClick={() => onAddToCart(recommendedProduct, 1)}
                  >
                    <ShoppingCart size={16} /> Add to Order
                  </button>
                  <button
                    className="btn-outline"
                    style={{ padding: '0.65rem 1rem', fontSize: '0.88rem' }}
                    onClick={() => onOpenProductDetail(recommendedProduct)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
