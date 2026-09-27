import React, { useState } from 'react';
import { ShoppingCart, Bookmark, ChevronDown, ChevronUp, Check, Eye } from 'lucide-react';

export function ProductCard({ 
  product, 
  onAddToCart, 
  onOpenDetail, 
  isWishlisted, 
  onToggleWishlist 
}) {
  const [quantity, setQuantity] = useState(1);
  const [showTiers, setShowTiers] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const badgeClass = product.badgeType === 'secondary' 
    ? 'tag-badge secondary' 
    : product.badgeType === 'tertiary' 
      ? 'tag-badge tertiary' 
      : 'tag-badge primary';

  return (
    <article className="product-card">
      {/* Media Box */}
      <div className="product-media" onClick={() => onOpenDetail(product)}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-img"
          onError={(e) => { e.target.src = product.image.replace('/assets', ''); }}
        />
        
        {/* Floating Badges */}
        <div className="product-badge-float">
          <span className="tag-badge primary" style={{ background: 'rgba(255,255,255,0.92)', color: 'var(--primary)', fontWeight: 800 }}>
            {product.unit}
          </span>
          {product.badge && (
            <span className={badgeClass}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Quick View overlay */}
        <div style={{
          position: 'absolute',
          bottom: '0.75rem',
          right: '0.75rem',
          background: 'rgba(1, 45, 29, 0.85)',
          color: '#ffffff',
          borderRadius: 'var(--radius-sm)',
          padding: '0.3rem 0.6rem',
          fontSize: '0.72rem',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          backdropFilter: 'blur(4px)'
        }}>
          <Eye size={13} /> Quick View
        </div>
      </div>

      {/* Info Body */}
      <div className="product-info-body">
        <div>
          <div className="product-sku-row">
            <span>SKU: {product.sku}</span>
            <span style={{ color: 'var(--secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--secondary)' }}></span>
              {product.stock} in stock
            </span>
          </div>

          <h3 
            className="product-name-link" 
            onClick={() => onOpenDetail(product)}
            style={{ marginTop: '0.4rem' }}
          >
            {product.name}
          </h3>

          <p style={{ fontSize: '0.84rem', color: 'var(--on-surface-variant)', lineHeight: 1.45, marginTop: '0.4rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {product.description}
          </p>

          {/* Micro Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '0.6rem' }}>
            {product.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} style={{ background: 'var(--surface-container-low)', color: 'var(--on-surface-variant)', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & Cart Stepper */}
        <div>
          <div className="product-pricing-box">
            <div>
              <span className="price-big">${product.price.toFixed(2)}</span>
              <span className="price-unit">/ {product.unit}</span>
            </div>
            <button
              onClick={() => onToggleWishlist(product.id)}
              style={{ color: isWishlisted ? 'var(--amber-accent)' : 'var(--outline)', background: 'none', padding: '4px' }}
              title={isWishlisted ? "Remove from saved" : "Save for later"}
            >
              <Bookmark size={18} fill={isWishlisted ? 'var(--amber-accent)' : 'none'} />
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', alignItems: 'center' }}>
            {/* Stepper */}
            <div className="quantity-stepper">
              <button 
                className="stepper-btn" 
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="stepper-value">{quantity}</span>
              <button 
                className="stepper-btn" 
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button 
              className="btn-primary"
              style={{ flex: 1, padding: '0.6rem 0.85rem', fontSize: '0.85rem', justifyContent: 'center', background: justAdded ? 'var(--secondary)' : 'var(--primary)' }}
              onClick={handleAdd}
            >
              {justAdded ? (
                <>
                  <Check size={16} /> Added!
                </>
              ) : (
                <>
                  <ShoppingCart size={16} /> Add to Cart
                </>
              )}
            </button>
          </div>

          {/* Volume Tiers Collapsible */}
          {product.volumeTiers && (
            <div style={{ marginTop: '0.65rem' }}>
              <button 
                onClick={() => setShowTiers(!showTiers)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--secondary)', padding: '4px' }}
              >
                <span>View Commercial Volume Tiers</span>
                {showTiers ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {showTiers && (
                <div style={{ background: 'var(--surface-container-low)', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-sm)', marginTop: '0.4rem', fontSize: '0.78rem' }}>
                  {product.volumeTiers.map((tier, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', borderBottom: idx < product.volumeTiers.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                      <span style={{ color: 'var(--on-surface-variant)' }}>{tier.range}</span>
                      <strong style={{ color: 'var(--primary)', fontFamily: 'monospace' }}>${tier.price.toFixed(2)}</strong>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
