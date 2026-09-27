import React, { useState } from 'react';
import { Calculator, Sparkles, ShoppingCart, CheckCircle2, ArrowRight } from 'lucide-react';
import { products } from '../data/products';

export function SoilCalculator({ onAddToCart }) {
  const [cropType, setCropType] = useState('corn');
  const [fieldAcres, setFieldAcres] = useState(25);
  const [currentN, setCurrentN] = useState(15);
  const [currentP, setCurrentP] = useState(20);
  const [currentK, setCurrentK] = useState(110);

  // Targets per crop
  const cropTargets = {
    corn: { name: 'Corn & Field Grains', targetN: 45, targetP: 35, targetK: 160, recProduct: 'nsa-fert-man50', bagsPerAcre: 6 },
    berries: { name: 'Berries & Orchards', targetN: 30, targetP: 40, targetK: 180, recProduct: 'nsa-fert-man50', bagsPerAcre: 5 },
    tomatoes: { name: 'Greenhouse Tomatoes', targetN: 40, targetP: 50, targetK: 200, recProduct: 'nsa-fert-man50', bagsPerAcre: 7 },
    greens: { name: 'Leafy Greens & Veg', targetN: 50, targetP: 30, targetK: 140, recProduct: 'nsa-fert-man50', bagsPerAcre: 5 },
    turf: { name: 'Pasture & Forage Turf', targetN: 35, targetP: 25, targetK: 130, recProduct: 'nsa-fert-man50', bagsPerAcre: 4 }
  };

  const selectedCrop = cropTargets[cropType];
  const recProduct = products.find((p) => p.id === selectedCrop.recProduct) || products[3];

  const deficitN = Math.max(0, selectedCrop.targetN - currentN);
  const deficitP = Math.max(0, selectedCrop.targetP - currentP);
  const deficitK = Math.max(0, selectedCrop.targetK - currentK);

  const totalBags = Math.round(fieldAcres * selectedCrop.bagsPerAcre);
  const pallets = Math.ceil(totalBags / 40);
  const unitPrice = totalBags >= 40 ? 17.00 : 22.00;
  const totalPrice = totalBags * unitPrice;
  const retailPrice = totalBags * 22.00;
  const savings = Math.max(0, retailPrice - totalPrice);

  const handleAddPrescription = () => {
    onAddToCart(recProduct, totalBags);
  };

  return (
    <div style={{ paddingTop: '110px', paddingBottom: '4rem', background: 'var(--background)', minHeight: '100vh' }}>
      {/* Header Banner */}
      <div style={{ background: 'var(--primary)', color: '#ffffff', padding: '3.5rem 0 2.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.1)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', color: 'var(--secondary-fixed)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem' }}>
            <Sparkles size={14} /> Certified Agronomy Soil Tool
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#ffffff', marginBottom: '0.75rem' }}>
            Agronomic Soil &amp; NPK Prescription Calculator
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--primary-fixed-dim)', maxWidth: '640px', lineHeight: 1.6 }}>
            Input your acreage and recent soil assay readings to calculate precise organic fertilizer volume, pallet logistics, and tiered commercial volume discounts.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '-1.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* Inputs Card */}
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius-xl)', padding: '2rem', boxShadow: 'var(--shadow-card)', border: '1px solid var(--outline-variant)' }}>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calculator size={20} color="var(--secondary)" />
              1. Field &amp; Soil Assay Input
            </h2>

            {/* Target Crop Select */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Select Crop Family
              </label>
              <select
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--outline-variant)', background: 'var(--surface-container-low)', fontSize: '0.92rem', fontWeight: 600, color: 'var(--on-surface)', outline: 'none' }}
              >
                {Object.entries(cropTargets).map(([key, data]) => (
                  <option key={key} value={key}>{data.name}</option>
                ))}
              </select>
            </div>

            {/* Field Size Acreage */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
                  Field Size
                </label>
                <span style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--primary)' }}>
                  {fieldAcres} Acres ({Math.round(fieldAcres * 0.404686)} ha)
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="500"
                value={fieldAcres}
                onChange={(e) => setFieldAcres(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--secondary)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                {[10, 25, 50, 100, 250].map((val) => (
                  <button
                    key={val}
                    onClick={() => setFieldAcres(val)}
                    style={{ flex: 1, padding: '4px', fontSize: '0.75rem', fontWeight: 700, borderRadius: 'var(--radius-sm)', background: fieldAcres === val ? 'var(--primary)' : 'var(--surface-container)', color: fieldAcres === val ? '#fff' : 'var(--on-surface)' }}
                  >
                    {val}ac
                  </button>
                ))}
              </div>
            </div>

            {/* Soil Test Current Levels */}
            <div style={{ borderTop: '1px solid var(--surface-container)', paddingTop: '1.25rem' }}>
              <h3 style={{ fontSize: '0.95rem', color: 'var(--primary)', marginBottom: '0.75rem' }}>
                Soil Test Levels (ppm)
              </h3>

              {/* Nitrogen */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                  <span>Nitrate-Nitrogen (NO3-N)</span>
                  <strong style={{ color: 'var(--primary)' }}>{currentN} ppm</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={currentN}
                  onChange={(e) => setCurrentN(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
              </div>

              {/* Phosphorus */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                  <span>Phosphorus (Bray-1 P)</span>
                  <strong style={{ color: 'var(--secondary)' }}>{currentP} ppm</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="70"
                  value={currentP}
                  onChange={(e) => setCurrentP(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--secondary)', cursor: 'pointer' }}
                />
              </div>

              {/* Potassium */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                  <span>Exchangeable Potassium (K)</span>
                  <strong style={{ color: 'var(--primary)' }}>{currentK} ppm</strong>
                </div>
                <input
                  type="range"
                  min="50"
                  max="300"
                  value={currentK}
                  onChange={(e) => setCurrentK(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>

          {/* Results & Prescription Card */}
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius-xl)', padding: '2rem', boxShadow: 'var(--shadow-hover)', border: '2px solid var(--secondary)', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', background: 'var(--secondary-container)', color: 'var(--on-secondary-container)', padding: '3px 10px', borderRadius: '4px' }}>
                Agronomic Prescription
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--outline)', fontWeight: 600 }}>
                AOAC Verified Formula
              </span>
            </div>

            {/* Deficit Gauges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ background: 'var(--surface-container-low)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--outline)', textTransform: 'uppercase', fontWeight: 700 }}>N Deficit</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>{deficitN} ppm</div>
              </div>
              <div style={{ background: 'var(--surface-container-low)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--outline)', textTransform: 'uppercase', fontWeight: 700 }}>P Deficit</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--secondary)' }}>{deficitP} ppm</div>
              </div>
              <div style={{ background: 'var(--surface-container-low)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--outline)', textTransform: 'uppercase', fontWeight: 700 }}>K Deficit</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>{deficitK} ppm</div>
              </div>
            </div>

            {/* Recommended Product Box */}
            <div style={{ background: 'var(--surface-container-low)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid var(--outline-variant)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Prescribed Agronomic Match:
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <img 
                  src={recProduct.image} 
                  alt={recProduct.name}
                  style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
                  onError={(e) => { e.target.src = recProduct.image.replace('/assets', ''); }}
                />
                <div>
                  <h4 style={{ fontSize: '1rem', color: 'var(--primary)', lineHeight: 1.25 }}>
                    {recProduct.name}
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)', marginTop: '0.2rem' }}>
                    100% Organic composted poultry manure with active biological humus.
                  </div>
                </div>
              </div>
            </div>

            {/* Logistics Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--on-surface-variant)' }}>Required Order Volume:</span>
                <strong style={{ color: 'var(--primary)' }}>{totalBags} Bags (50 kg each)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--on-surface-variant)' }}>Freight Packaging:</span>
                <strong style={{ color: 'var(--secondary)' }}>{pallets} Wrapped Pallets (40 bags/pallet)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--on-surface-variant)' }}>Total Weight:</span>
                <strong style={{ color: 'var(--primary)' }}>{((totalBags * 50) / 1000).toFixed(1)} Metric Tons</strong>
              </div>
              {savings > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--secondary)', fontWeight: 700 }}>
                  <span>Commercial Volume Savings:</span>
                  <span>-${savings.toFixed(2)}</span>
                </div>
              )}
            </div>

            {/* Total Pricing & Action */}
            <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--surface-container)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--outline)', textTransform: 'uppercase', fontWeight: 600 }}>Total Estimated Cost:</span>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-headline)' }}>
                    ${totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                </div>
                {totalBags >= 100 && (
                  <span style={{ fontSize: '0.78rem', color: 'var(--secondary)', fontWeight: 700, background: 'var(--secondary-container)', padding: '3px 8px', borderRadius: '4px' }}>
                    Free Freight Qualified
                  </span>
                )}
              </div>

              <button
                className="btn-primary"
                onClick={handleAddPrescription}
                style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', justifyContent: 'center' }}
              >
                <ShoppingCart size={18} /> Add Complete Prescription to Order ({totalBags} bags)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
