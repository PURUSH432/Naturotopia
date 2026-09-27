import React from 'react';
import { ArrowRight, Leaf, Shield, HeartPulse, Apple } from 'lucide-react';

export function CategoryMosaic({ onSelectCategory }) {
  const categories = [
    {
      id: 'poultry-feed',
      title: 'NSA Poultry Feed Series (Pre-Starter, Starter, Finisher)',
      desc: 'Balanced nutrition formulas supporting rapid early growth, bone structure development, and optimal feed conversion.',
      badge: 'High Nutrition',
      image: '/assets/Img1.png',
      icon: Shield,
      badgeClass: 'tag-badge primary'
    },
    {
      id: 'organic-fertilizer',
      title: 'Organic Poultry Manure Fertilizer (100% Natural)',
      desc: 'Rich in biological nutrients, increases beneficial soil microorganisms, enhances soil health, and maximizes crop yield.',
      badge: '100% Natural Organic',
      image: '/assets/img4.png',
      icon: Leaf,
      badgeClass: 'tag-badge secondary'
    },
    {
      id: 'poultry-medicine',
      title: 'Poultry Medicine & Veterinary Health (Wholesale)',
      desc: 'Comprehensive vaccines, antibiotics, probiotics, electrolytes, liver tonics, and vitamins from certified brands.',
      badge: 'Wholesale Supply',
      image: '/assets/img6.png',
      icon: HeartPulse,
      badgeClass: 'tag-badge tertiary'
    },
    {
      id: 'fresh-produce',
      title: '100% Natural Fresh Mangoes (Farm Fresh Harvest)',
      desc: 'Naturally nutritious, chemical-free delicious new variety mangoes cultivated using safe and sustainable agronomy.',
      badge: 'Farm Fresh Harvest',
      image: '/assets/img7.png',
      icon: Apple,
      badgeClass: 'tag-badge secondary'
    }
  ];

  return (
    <section style={{ padding: '4rem 0', background: '#ffffff' }}>
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Engineered Categories
              </span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--primary)', marginTop: '0.25rem' }}>
                Specialized Agro &amp; Livestock Architecture
              </h2>
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--on-surface-variant)', maxWidth: '480px', lineHeight: 1.5 }}>
              Formulated to match precise vegetative phases, from root inception to high-density poultry flock productivity.
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem'
        }}>
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className="category-card"
              onClick={() => onSelectCategory(cat.id)}
            >
              <div className="category-img-box">
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="category-img" 
                  onError={(e) => { e.target.src = cat.image.replace('/assets', ''); }}
                />
                <span className="category-badge-chip">
                  {cat.badge}
                </span>
              </div>
              <div className="category-body">
                <div>
                  <h3 className="category-title">{cat.title}</h3>
                  <p className="category-desc">{cat.desc}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--surface-container)', color: 'var(--secondary)', fontWeight: 700, fontSize: '0.85rem' }}>
                  <span>Explore Line</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
