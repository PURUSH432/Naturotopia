import React from 'react';
import { Home, Layers, Calculator, Headset, ShoppingBag } from 'lucide-react';

export function BottomNav({ activeTab, setActiveTab, cartCount, openCart }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'catalogue', label: 'Catalog', icon: Layers },
    { id: 'calculator', label: 'Soil Rx', icon: Calculator },
    { id: 'support', label: 'Advisory', icon: Headset },
  ];

  return (
    <nav className="mobile-bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <div className="nav-icon-box">
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
            </div>
            <span>{item.label}</span>
          </button>
        );
      })}

      {/* Cart button in mobile bottom nav */}
      <button
        className="mobile-nav-btn"
        onClick={openCart}
        style={{ position: 'relative' }}
      >
        <div className="nav-icon-box" style={{ background: cartCount > 0 ? 'var(--secondary-container)' : 'transparent' }}>
          <ShoppingBag size={20} color={cartCount > 0 ? 'var(--primary)' : 'var(--outline)'} strokeWidth={cartCount > 0 ? 2.5 : 1.8} />
        </div>
        <span>Cart</span>
        {cartCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '2px',
            right: '12px',
            background: 'var(--secondary)',
            color: '#fff',
            fontSize: '10px',
            fontWeight: 700,
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {cartCount}
          </span>
        )}
      </button>
    </nav>
  );
}
