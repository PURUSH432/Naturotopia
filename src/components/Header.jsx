import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  Bookmark,
  PhoneCall,
  ShieldCheck,
  Truck,
  Sparkles,
  UserRound,
  LogOut,
} from "lucide-react";

export function Header({
  activeTab,
  setActiveTab,
  cartCount,
  cartTotal,
  openCart,
  openQuoteModal,
  searchQuery,
  setSearchQuery,
  wishlistCount,
  currentUser,
  onSignOut,
}) {
  const [quickCatOpen, setQuickCatOpen] = useState(false);

  const categories = [
    {
      id: "poultry-feed",
      name: "Poultry Feeds (Broiler & Layer)",
      badge: "Fortified",
    },
    {
      id: "organic-fertilizer",
      name: "Organic Poultry Manure",
      badge: "100% Natural",
    },
    {
      id: "poultry-medicine",
      name: "Wholesale Veterinary Health",
      badge: "Licensed",
    },
    { id: "fresh-produce", name: "Farm Fresh Harvest", badge: "Chemical-Free" },
  ];

  return (
    <header className="app-header">
      {/* Top Announcement Bar */}
      <div className="top-announcement-bar">
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                color: "var(--secondary-fixed)",
              }}
            >
              <Truck size={14} /> Free freight on commercial bulk orders over 5
              tons
            </span>
            <span
              style={{ opacity: 0.5, display: "none" }}
              className="d-md-inline"
            >
              |
            </span>
            <span
              style={{ display: "none", alignItems: "center", gap: "0.35rem" }}
              className="d-md-flex"
            >
              <PhoneCall size={14} /> Agronomy Advisory Desk: (800) 555-SOIL
            </span>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                color: "var(--secondary-fixed)",
                fontSize: "0.75rem",
              }}
            >
              <ShieldCheck size={14} /> Certified CCA Agronomists On Duty
            </span>
            <button
              onClick={openQuoteModal}
              style={{
                color: "var(--primary-fixed)",
                background: "none",
                border: "none",
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Request Commercial Bid
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="container">
        <div className="header-main">
          {/* Brand Logo */}
          <div
            className="brand-badge"
            onClick={() => setActiveTab("home")}
            style={{ cursor: "pointer" }}
          >
            <img
              src="/assets/naturotopia-logo.svg"
              alt="Naturotopia Logo"
              className="brand-logo-img"
              style={{ height: "44px", width: "auto" }}
            />
          </div>

          {/* Search Bar with NPK auto-suggest */}
          <div
            className="header-search-container"
            style={{ display: "none" }}
            id="desktop-search-box"
          >
            <Search className="search-icon-pos" size={18} />
            <input
              type="text"
              placeholder="Search poultry feeds, organic manure, crop formulas..."
              className="header-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#94a3b8",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="header-actions">
            <button
              className="btn-secondary"
              onClick={openQuoteModal}
              style={{ display: "none" }}
              id="desktop-quote-btn"
            >
              <Sparkles size={16} /> Bulk Quote
            </button>

            {/* Auth state */}
            {currentUser ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.65rem",
                  padding: "0.3rem 0.55rem",
                  borderRadius: "var(--radius-md)",
                  background: "var(--surface-container-low)",
                }}
              >
                <UserRound size={18} color="var(--secondary)" />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    lineHeight: 1.15,
                    maxWidth: 150,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.68rem",
                      color: "var(--outline)",
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    Signed in as
                  </span>
                  <strong
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--primary)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {currentUser.fullName}
                  </strong>
                </div>
                <button
                  type="button"
                  onClick={onSignOut}
                  title="Sign out"
                  aria-label="Sign out"
                  style={{
                    display: "flex",
                    padding: "0.35rem",
                    color: "var(--outline)",
                  }}
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setActiveTab("signin")}
                  style={{
                    display: "none",
                    padding: "0.5rem 1rem",
                    background: "none",
                    border: "none",
                    color: "var(--primary)",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    borderRadius: "var(--radius-md)",
                  }}
                  id="header-signin-btn"
                  className="auth-btn-signin"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setActiveTab("signup")}
                  style={{
                    display: "none",
                    padding: "0.5rem 1.1rem",
                    background: "var(--primary)",
                    color: "var(--on-primary)",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    borderRadius: "var(--radius-md)",
                    boxShadow: "var(--shadow-subtle)",
                  }}
                  id="header-signup-btn"
                  className="auth-btn-signup"
                >
                  Create Account
                </button>
              </>
            )}

            <button
              className="btn-outline"
              style={{ padding: "0.55rem", borderRadius: "var(--radius-lg)" }}
              title="Saved Products"
              onClick={() => setActiveTab("catalogue")}
            >
              <div style={{ position: "relative" }}>
                <Bookmark size={20} color="var(--primary)" />
                {wishlistCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-6px",
                      right: "-6px",
                      background: "var(--amber-accent)",
                      color: "#fff",
                      fontSize: "10px",
                      width: "15px",
                      height: "15px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {wishlistCount}
                  </span>
                )}
              </div>
            </button>

            {/* Cart Trigger */}
            <button
              className="btn-cart-trigger"
              onClick={openCart}
              id="header-cart-btn"
            >
              <div className="cart-icon-wrapper">
                <ShoppingCart size={22} color="var(--primary)" />
                {cartCount > 0 && (
                  <span className="cart-badge-count">{cartCount}</span>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                  lineHeight: 1.1,
                }}
              >
                <span
                  style={{
                    fontSize: "0.68rem",
                    color: "var(--outline)",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  Cart
                </span>
                <span
                  style={{
                    fontSize: "0.92rem",
                    fontWeight: 800,
                    color: "var(--primary)",
                  }}
                >
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Bar */}
        <div className="desktop-nav-bar">
          <div className="desktop-nav-links">
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setQuickCatOpen(!quickCatOpen)}
                className="nav-link-item"
                style={{ fontWeight: 700, color: "var(--primary)" }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "18px" }}
                >
                  grid_view
                </span>
                Quick Categories
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "16px" }}
                >
                  expand_more
                </span>
              </button>

              {quickCatOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    width: "280px",
                    background: "#ffffff",
                    boxShadow: "var(--shadow-modal)",
                    borderRadius: "var(--radius-lg)",
                    padding: "0.5rem",
                    zIndex: 100,
                    border: "1px solid var(--outline-variant)",
                  }}
                >
                  {categories.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => {
                        setActiveTab("catalogue");
                        setQuickCatOpen(false);
                      }}
                      style={{
                        padding: "0.65rem 0.85rem",
                        borderRadius: "var(--radius-md)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "var(--on-surface)",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "var(--surface-container-low)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      <span>{c.name}</span>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          background: "var(--secondary-container)",
                          color: "var(--on-secondary-container)",
                          padding: "2px 6px",
                          borderRadius: "4px",
                        }}
                      >
                        {c.badge}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              className={`nav-link-item ${activeTab === "home" ? "active" : ""}`}
              onClick={() => setActiveTab("home")}
            >
              Home
            </button>
            <button
              className={`nav-link-item ${activeTab === "catalogue" ? "active" : ""}`}
              onClick={() => setActiveTab("catalogue")}
            >
              Product Catalogue
            </button>
            <button
              className={`nav-link-item ${activeTab === "calculator" ? "active" : ""}`}
              onClick={() => setActiveTab("calculator")}
            >
              Soil &amp; Calculator
            </button>
            <button
              className={`nav-link-item ${activeTab === "support" ? "active" : ""}`}
              onClick={() => setActiveTab("support")}
            >
              Agronomist Support &amp; Contact
            </button>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.82rem",
              color: "var(--on-surface-variant)",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "18px", color: "var(--secondary)" }}
            >
              warehouse
            </span>
            <span>
              Regional Depot:{" "}
              <strong style={{ color: "var(--primary)" }}>
                Central Agro Hub (In-Stock)
              </strong>
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 901px) {
          #desktop-search-box {
            display: block !important;
          }
          #desktop-quote-btn {
            display: inline-flex !important;
          }
          .d-md-inline {
            display: inline !important;
          }
          .d-md-flex {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
