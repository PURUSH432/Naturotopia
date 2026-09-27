import React, { useState } from 'react';
import { X, Send, Sparkles, Building, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export function BulkQuoteModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [tonnage, setTonnage] = useState('24');
  const [productClass, setProductClass] = useState('NSA Organic Poultry Manure 50kg');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content-panel"
        style={{ maxWidth: '540px', padding: '2rem' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontWeight: 700, fontSize: '1.2rem' }}>
            <Sparkles size={20} color="var(--secondary)" />
            <span>Commercial Bulk Freight Quote</span>
          </div>
          <button onClick={onClose} style={{ color: 'var(--outline)' }}>
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <CheckCircle2 size={42} color="var(--secondary)" style={{ margin: '0 auto 1rem auto' }} />
            <h4 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
              Bid Request Forwarded!
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--on-surface-variant)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Our commercial terminal manager will draft an official quote for {tonnage} tons of {productClass} and transmit it to <strong>{phone}</strong> within 2 hours.
            </p>
            <button className="btn-primary" onClick={onClose} style={{ width: '100%', justifyContent: 'center' }}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--on-surface-variant)', lineHeight: 1.5 }}>
              Dedicated freight rates for hopper railcars, bulk pneumatic pneumatic tankers, and full-trailer loads (FTL).
            </p>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '3px' }}>
                Product Requirement
              </label>
              <select
                value={productClass}
                onChange={(e) => setProductClass(e.target.value)}
                style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', background: 'var(--surface-container-low)', outline: 'none' }}
              >
                <option value="NSA Organic Poultry Manure 50kg">NSA Organic Poultry Manure (50kg Bags)</option>
                <option value="NSA Pre-Starter Feed 50kg">NSA Pre-Starter Feed 50kg</option>
                <option value="NSA Starter Feed 50kg">NSA Starter Feed 50kg</option>
                <option value="NSA Finisher Feed 50kg">NSA Finisher Feed 50kg</option>
                <option value="Wholesale Veterinary Health Pack">Wholesale Veterinary Medicines</option>
                <option value="100% Natural Fresh Mangoes">100% Natural Fresh Mangoes</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '3px' }}>
                Estimated Tonnage Volume
              </label>
              <select
                value={tonnage}
                onChange={(e) => setTonnage(e.target.value)}
                style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', background: 'var(--surface-container-low)', outline: 'none' }}
              >
                <option value="5">5 Tons (Single Flatbed LTL)</option>
                <option value="12">12 Tons (Standard Freight)</option>
                <option value="24">24 Tons (Full Hopper Truckload FTL)</option>
                <option value="50">50 Tons (Multi-Truck Dispatch)</option>
                <option value="100+">100+ Tons (Commercial Railcar / Contract)</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '3px' }}>
                  Representative Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Purushothaman"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', background: 'var(--surface-container-low)', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '3px' }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--outline-variant)', background: 'var(--surface-container-low)', outline: 'none' }}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn-primary" 
              style={{ width: '100%', padding: '0.8rem', justifyContent: 'center', marginTop: '0.5rem' }}
            >
              <Send size={16} /> Generate Instant Commercial Bid
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
