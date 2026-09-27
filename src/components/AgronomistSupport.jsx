import React, { useState } from 'react';
import { PhoneCall, FileUp, Building2, CheckCircle2, ShieldAlert, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export function AgronomistSupport() {
  const [formData, setFormData] = useState({
    name: '',
    farm: '',
    phone: '',
    email: '',
    cropAcreage: '50 - 200 Acres',
    inquiryType: 'Soil Fertility & Organic Manure',
    notes: '',
    file: null
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // ignore
    }
  };

  return (
    <div style={{ paddingTop: '110px', paddingBottom: '4rem', background: 'var(--background)', minHeight: '100vh' }}>
      {/* Header Banner */}
      <div style={{ background: 'var(--primary)', color: '#ffffff', padding: '3.5rem 0 2.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.1)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', color: 'var(--secondary-fixed)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem' }}>
            <Sparkles size={14} /> Certified Crop Advisers (CCA) • Direct Laboratory Access
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#ffffff', marginBottom: '0.75rem' }}>
            Expert Agronomic Support &amp; Commercial Inquiries
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--primary-fixed-dim)', maxWidth: '680px', lineHeight: 1.6 }}>
            Consult with our on-staff Certified Crop Advisers for customized poultry feeding schedules, soil assay prescriptions, and commercial bulk logistics.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '-1.5rem' }}>
        {/* 3 Action Pillars */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {/* Card 1: Hotline */}
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius-xl)', padding: '2rem', boxShadow: 'var(--shadow-card)', border: '1px solid var(--outline-variant)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-container)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <PhoneCall size={24} color="var(--secondary-fixed)" />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                Agronomy Hotline
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--on-surface-variant)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                Direct access to dedicated field staff for emergency application guidance, flock feed adjustments, and tank-mix compatibility.
              </p>
              <div style={{ background: 'var(--surface-container-low)', padding: '0.85rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>1-800-555-SOIL</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--outline)' }}>7:00 AM – 6:00 PM CST, Mon – Sat</div>
              </div>
            </div>
            <a 
              href="tel:18005557645"
              className="btn-primary" 
              style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
            >
              Call Agronomist Desk
            </a>
          </div>

          {/* Card 2: Soil Analysis Upload */}
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius-xl)', padding: '2rem', boxShadow: 'var(--shadow-card)', border: '1px solid var(--outline-variant)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--secondary)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <FileUp size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                Upload Soil Analysis
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--on-surface-variant)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                Upload your laboratory soil assay report for a free personalized organic manure &amp; mineral prescription program.
              </p>
              <div style={{ background: 'var(--surface-container-low)', padding: '0.85rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--secondary)' }}>Turnaround Time:</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary)' }}>Under 6 Business Hours</div>
              </div>
            </div>
            <a 
              href="#consult-form"
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
            >
              Submit Soil Report (.PDF)
            </a>
          </div>

          {/* Card 3: Commercial & Tender Bids */}
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius-xl)', padding: '2rem', boxShadow: 'var(--shadow-card)', border: '1px solid var(--outline-variant)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--surface-container-high)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Building2 size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                Commercial Tender Bids
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--on-surface-variant)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                Commercial poultry operations &gt;20,000 birds or farm enterprises &gt;500 acres requiring railcar, bulk hoppers, or wholesale freight.
              </p>
              <div style={{ background: 'var(--surface-container-low)', padding: '0.85rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--outline)' }}>Dedicated Dispatch Desk:</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'monospace' }}>bids@naturotopia.ag</div>
              </div>
            </div>
            <a 
              href="#consult-form"
              className="btn-outline"
              style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
            >
              Request Commercial Bid
            </a>
          </div>
        </div>

        {/* Interactive Consultation Form */}
        <div 
          id="consult-form"
          style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid var(--outline-variant)',
            maxWidth: '860px',
            margin: '0 auto'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', paddingBottom: '1rem', borderBottom: '1px solid var(--surface-container)' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Direct Agronomic Dispatch
              </span>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--primary)', marginTop: '0.2rem' }}>
                Agronomy Consultation &amp; Bulk Quote Form
              </h2>
            </div>
            <span style={{ fontSize: '0.72rem', background: 'var(--surface-container)', color: 'var(--on-surface-variant)', padding: '4px 8px', borderRadius: '4px', fontFamily: 'monospace' }}>
              ENCRYPTED 256-BIT
            </span>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--secondary-container)', color: 'var(--on-secondary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                Consultation Request Received!
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--on-surface-variant)', maxWidth: '500px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
                Thank you, <strong>{formData.name || 'Grower'}</strong>. Your inquiry has been routed to our Central Agro Hub CCA advisory desk. An agronomist will review your parameters and follow up within 6 business hours.
              </p>
              <button 
                className="btn-primary" 
                onClick={() => setSubmitted(false)}
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.4rem' }}>
                    Grower / Representative Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Purushothaman"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)', background: 'var(--surface-container-low)', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.4rem' }}>
                    Farm Enterprise / Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Naturotopia Agro Farms"
                    value={formData.farm}
                    onChange={(e) => setFormData({ ...formData, farm: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)', background: 'var(--surface-container-low)', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.4rem' }}>
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g., +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)', background: 'var(--surface-container-low)', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.4rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="grower@farm.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)', background: 'var(--surface-container-low)', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.4rem' }}>
                    Operation Scale
                  </label>
                  <select
                    value={formData.cropAcreage}
                    onChange={(e) => setFormData({ ...formData, cropAcreage: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)', background: 'var(--surface-container-low)', fontSize: '0.9rem', outline: 'none' }}
                  >
                    <option value="Under 25 Acres / Small Poultry">Under 25 Acres / Small Flock</option>
                    <option value="25 - 100 Acres / 10k-50k Birds">25 - 100 Acres / 10k-50k Birds</option>
                    <option value="100 - 500 Acres / 50k-200k Birds">100 - 500 Acres / 50k-200k Birds</option>
                    <option value="500+ Acres / Commercial Enterprise">500+ Acres / Commercial Agro Co-op</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.4rem' }}>
                    Primary Inquiry Focus
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)', background: 'var(--surface-container-low)', fontSize: '0.9rem', outline: 'none' }}
                  >
                    <option value="Soil Fertility & Organic Manure">Organic Poultry Manure Fertilizer</option>
                    <option value="Poultry Feeds (Pre-Starter/Starter/Finisher)">NSA Poultry Feed Program</option>
                    <option value="Veterinary Medicines Wholesale">Wholesale Veterinary Medicines</option>
                    <option value="Fresh Mango Harvest Wholesale">100% Natural Fresh Mangoes</option>
                    <option value="Tender / Hopper Truckload Bids">Commercial Tenders & Bulk Freight</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.4rem' }}>
                  Field Notes / Nutrient Symptoms / Target Requirements
                </label>
                <textarea
                  rows={4}
                  placeholder="Detail your target livestock goals, soil deficiencies, or desired freight schedule..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)', background: 'var(--surface-container-low)', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
                />
              </div>

              {/* Upload report file mock */}
              <div style={{ border: '2px dashed var(--outline-variant)', borderRadius: 'var(--radius-md)', padding: '1.25rem', textAlign: 'center', background: 'var(--surface-container-low)', cursor: 'pointer' }}>
                <FileUp size={24} color="var(--secondary)" style={{ margin: '0 auto 0.4rem auto' }} />
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--primary)' }}>
                  Attach Lab Soil Test / Facility Specs (.PDF, .XLSX, or .JPG)
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--outline)', marginTop: '2px' }}>
                  Up to 25MB encrypted direct transmission
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', justifyContent: 'center', marginTop: '0.5rem' }}
              >
                <Send size={18} /> Submit Consultation Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
