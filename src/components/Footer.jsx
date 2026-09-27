import React, { useState } from 'react';
import { Calendar, Send, ShieldCheck, Award, Leaf, Warehouse, Check } from 'lucide-react';

export function Footer({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer style={{ background: 'var(--surface-container-low)', marginTop: '4rem', borderTop: '1px solid var(--outline-variant)' }}>
      {/* Seasonal Alert Newsletter Bar */}
      <div style={{ background: 'var(--surface-container-high)', padding: '1.75rem 0', borderBottom: '1px solid var(--outline-variant)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-container)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar size={24} color="var(--secondary-fixed)" />
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '0.2rem' }}>
                Seasonal Fertilization Schedules &amp; Agronomic Bulletins
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--on-surface-variant)' }}>
                Receive timely crop stage recommendations, application alerts, and flock nutritional insights.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <input 
              type="email"
              required
              placeholder="Enter farm enterprise email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '0.65rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', background: '#ffffff', fontSize: '0.88rem', minWidth: '260px', outline: 'none' }}
            />
            <button className="btn-primary" type="submit" style={{ padding: '0.65rem 1.25rem' }}>
              {subscribed ? <><Check size={16} /> Subscribed!</> : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container" style={{ padding: '3.5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem' }}>
          {/* Brand Info */}
          <div style={{ gridColumn: 'span 1' }}>
            <img 
              src="/assets/naturotopia-logo.svg" 
              alt="Naturotopia Logo" 
              style={{ height: '40px', width: 'auto', marginBottom: '1rem' }}
            />
            <p style={{ fontSize: '0.85rem', color: 'var(--on-surface-variant)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Leading provider of NSA poultry feed formulations, 100% natural organic poultry manure fertilizers, veterinary health solutions, and fresh agro products.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#ffffff', padding: '3px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)', border: '1px solid var(--outline-variant)' }}>
                <Leaf size={12} color="var(--secondary)" /> OMRI Listed Organic
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#ffffff', padding: '3px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)', border: '1px solid var(--outline-variant)' }}>
                <Award size={12} color="var(--secondary)" /> ISO 9001 Certified
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#ffffff', padding: '3px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)', border: '1px solid var(--outline-variant)' }}>
                <ShieldCheck size={12} color="var(--secondary)" /> CCA Backed
              </span>
            </div>
          </div>

          {/* Col 1 */}
          <div>
            <h5 style={{ fontSize: '0.95rem', color: 'var(--primary)', fontWeight: 800, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Agronomic Solutions
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--on-surface-variant)' }}>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('catalogue'); }}>NSA Pre-Starter &amp; Starter Feed</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('catalogue'); }}>NSA Finisher Feed Pellets</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('catalogue'); }}>100% Organic Poultry Manure</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('catalogue'); }}>Wholesale Veterinary Medicines</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('catalogue'); }}>Farm Fresh Orchard Mangoes</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h5 style={{ fontSize: '0.95rem', color: 'var(--primary)', fontWeight: 800, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Logistics &amp; Hubs
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--on-surface-variant)' }}>
              <li><strong>Depot 01 - Midwest Central:</strong><br/><span style={{ color: 'var(--outline)' }}>Dry Bulk &amp; Bagged Silos</span></li>
              <li><strong>Depot 02 - Pacific West Hub:</strong><br/><span style={{ color: 'var(--outline)' }}>Dedicated Poultry Nutrition Center</span></li>
              <li><strong>Depot 03 - Delta Rail Terminal:</strong><br/><span style={{ color: 'var(--outline)' }}>Barge, Hopper &amp; FTL Logistics</span></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h5 style={{ fontSize: '0.95rem', color: 'var(--primary)', fontWeight: 800, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Compliance &amp; Advisory
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--on-surface-variant)' }}>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('support'); }}>Safety Data Sheets (SDS)</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('support'); }}>AOAC Laboratory Assay Sheets</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('support'); }}>State Fertilizer Registrations</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('support'); }}>Commercial Grower Net 30 Terms</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('calculator'); }}>Interactive Soil NPK Calculator</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div style={{ background: 'var(--surface-container)', padding: '1rem 0', fontSize: '0.78rem', color: 'var(--on-surface-variant)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            © 2026 Naturotopia (NSA Products &amp; Agro Solutions). All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <span>EPA Environmental Stewardship</span>
            <span>Commercial Sales Terms</span>
            <span>Agronomic Yield Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
