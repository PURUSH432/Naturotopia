import React from 'react';
import { ArrowRight, Calculator, CheckCircle2, Award, ShieldCheck, Sparkles } from 'lucide-react';

export function Hero({ onExploreCatalogue, onOpenCalculator }) {
  return (
    <section className="hero-section">
      <div className="hero-bg-overlay"></div>
      <div className="hero-glow-orb"></div>

      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Headlines & Metrics */}
          <div>
            <div className="hero-badge-strip">
              <Sparkles size={14} />
              <span>Commercial Agronomy &amp; Precision Livestock Nutrition</span>
            </div>

            <h1 className="hero-title">
              High-Vitality Poultry Feeds, Organic Fertilizers &amp; Agro Solutions
            </h1>

            <p className="hero-lead">
              Scientifically formulated feeds, 100% natural poultry manure organic fertilizers, and genuine wholesale medicines designed for sustainable farming and superior livestock productivity.
            </p>

            <div className="hero-cta-group">
              <button 
                className="btn-primary" 
                onClick={onExploreCatalogue}
                style={{ padding: '0.85rem 1.6rem', fontSize: '1rem', background: 'var(--secondary)', color: '#ffffff' }}
              >
                <span>Explore Commercial Catalogue</span>
                <ArrowRight size={18} />
              </button>

              <button 
                className="btn-outline" 
                onClick={onOpenCalculator}
                style={{ padding: '0.85rem 1.4rem', fontSize: '1rem', background: 'rgba(255,255,255,0.1)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)' }}
              >
                <Calculator size={18} color="var(--secondary-fixed)" />
                <span>Calculate Soil NPK Needs</span>
              </button>
            </div>

            {/* Micro Metrics Strip */}
            <div className="hero-metrics-row">
              <div>
                <div className="metric-number">4.8M+</div>
                <div className="metric-label">Acres Fertilized &amp; Fortified</div>
              </div>
              <div>
                <div className="metric-number">99.4%</div>
                <div className="metric-label">Batch Purity Tested in Lab</div>
              </div>
              <div>
                <div className="metric-number">24h</div>
                <div className="metric-label">Dispatch from Regional Hubs</div>
              </div>
            </div>
          </div>

          {/* Right Column: Executive Leadership & Trust Card */}
          <div>
            <div className="leadership-card">
              <div className="leadership-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontWeight: 700, fontSize: '1.05rem' }}>
                  <Award size={20} color="var(--secondary)" />
                  <span>Executive Leadership</span>
                </div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', background: 'var(--secondary-container)', color: 'var(--on-secondary-container)', padding: '3px 8px', borderRadius: '4px' }}>
                  NSA Certified
                </span>
              </div>

              <p style={{ fontSize: '0.84rem', color: 'var(--on-surface-variant)', lineHeight: 1.5 }}>
                Committed to sustainable agriculture, superior livestock nutrition, and trusted organic farm yield optimization.
              </p>

              <div className="leadership-grid">
                {/* G.N. Founder */}
                <div className="leader-box">
                  <div className="leader-photo-wrapper">
                    <img 
                      src="/assets/GN.jpeg" 
                      alt="G.N. - Founder" 
                      className="leader-photo"
                      onError={(e) => { e.target.src = '/GN.jpeg'; }}
                    />
                  </div>
                  <div className="leader-name">G.N.</div>
                  <div className="leader-role">Founder</div>
                </div>

                {/* Mari Co-Founder */}
                <div className="leader-box">
                  <div className="leader-photo-wrapper">
                    <img 
                      src="/assets/Mari.jpeg" 
                      alt="Mari - Co-Founder" 
                      className="leader-photo"
                      onError={(e) => { e.target.src = '/Mari.jpeg'; }}
                    />
                  </div>
                  <div className="leader-name">Mari</div>
                  <div className="leader-role">Co-Founder</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--surface-container)', fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--secondary)', fontWeight: 600 }}>
                  <CheckCircle2 size={15} /> 100% Genuine Agro Products
                </span>
                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>Guaranteed Purity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
