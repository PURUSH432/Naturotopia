import React, { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { Hero } from "./components/Hero";
import { CategoryMosaic } from "./components/CategoryMosaic";
import { CropFinder } from "./components/CropFinder";
import { ProductCard } from "./components/ProductCard";
import { ProductCatalogue } from "./components/ProductCatalogue";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { SoilCalculator } from "./components/SoilCalculator";
import { AgronomistSupport } from "./components/AgronomistSupport";
import { CartDrawer } from "./components/CartDrawer";
import { BulkQuoteModal } from "./components/BulkQuoteModal";
import { Footer } from "./components/Footer";
import { Toast } from "./components/Toast";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { products } from "./data/products";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Award,
} from "lucide-react";
import { apiRequest, getToken, saveSession } from "./api";

export function App() {
  const [activeTab, setActiveTab] = useState("home"); // 'home' | 'catalogue' | 'calculator' | 'support'
  const [catalogProducts, setCatalogProducts] = useState(products);
  const [cartItems, setCartItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("naturotopia_user"));
    } catch {
      return null;
    }
  });
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Cart operations
  const showToast = (message) => {
    setToast({ message });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    apiRequest("/products")
      .then(setCatalogProducts)
      .catch(() => showToast("Using local product catalogue"));
    if (getToken())
      apiRequest("/cart")
        .then(setCartItems)
        .catch(() => localStorage.removeItem("naturotopia_token"));
  }, []);

  const handleAddToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { product, quantity }];
    });
    if (getToken()) {
      const existingQuantity =
        cartItems.find((item) => item.product.id === product.id)?.quantity || 0;
      apiRequest(`/cart/items/${product.id}`, {
        method: "PUT",
        body: JSON.stringify({ quantity: existingQuantity + quantity }),
      }).catch(() => showToast("Could not save cart item"));
    }
    showToast(
      `Added ${quantity}x ${product.shortName || product.name} to order`,
    );
  };

  const handleUpdateQuantity = (productId, newQty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item,
      ),
    );
    if (getToken())
      apiRequest(`/cart/items/${productId}`, {
        method: "PUT",
        body: JSON.stringify({ quantity: newQty }),
      }).catch(() => showToast("Could not update cart"));
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== productId),
    );
    showToast("Item removed from cart");
    if (getToken())
      apiRequest(`/cart/items/${productId}`, { method: "DELETE" }).catch(() =>
        showToast("Could not update cart"),
      );
  };

  const handleClearCart = () => {
    setCartItems([]);
    if (getToken())
      apiRequest("/cart", { method: "DELETE" }).catch(() =>
        showToast("Could not clear cart"),
      );
  };

  const handleAuthenticated = (session) => {
    saveSession(session);
    setCurrentUser(session.user);
    apiRequest("/cart")
      .then(setCartItems)
      .catch(() => {});
  };

  const handleSignOut = () => {
    localStorage.removeItem("naturotopia_token");
    localStorage.removeItem("naturotopia_user");
    setCurrentUser(null);
    setCartItems([]);
    setActiveTab("home");
  };

  const handleToggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast("Removed from saved list");
        return prev.filter((id) => id !== productId);
      } else {
        showToast("Saved to your field wishlist");
        return [...prev, productId];
      }
    });
  };

  // Navigations
  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setActiveTab("catalogue");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <div
      className="app-shell"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        cartCount={cartCount}
        cartTotal={cartTotal}
        openCart={() => setIsCartOpen(true)}
        openQuoteModal={() => setIsQuoteModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          if (q && activeTab !== "catalogue") {
            setActiveTab("catalogue");
          }
        }}
        wishlistCount={wishlist.length}
        currentUser={currentUser}
        onSignOut={handleSignOut}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {activeTab === "home" && (
          <>
            {/* Hero */}
            <Hero
              onExploreCatalogue={() => {
                setActiveTab("catalogue");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onOpenCalculator={() => {
                setActiveTab("calculator");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />

            {/* Specialized Categories */}
            <CategoryMosaic onSelectCategory={handleSelectCategory} />

            {/* Featured Formulations Section */}
            <section
              style={{ padding: "3.5rem 0", background: "var(--background)" }}
            >
              <div className="container">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    flexWrap: "wrap",
                    gap: "1rem",
                    marginBottom: "2rem",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 800,
                        color: "var(--secondary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Certified Formulations
                    </span>
                    <h2
                      style={{
                        fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
                        color: "var(--primary)",
                        marginTop: "0.25rem",
                      }}
                    >
                      Featured Agro &amp; Poultry Solutions
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab("catalogue");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontWeight: 700,
                      color: "var(--secondary)",
                      fontSize: "0.92rem",
                    }}
                  >
                    <span>
                      View All Formulations ({catalogProducts.length})
                    </span>
                    <ArrowRight size={18} />
                  </button>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "1.5rem",
                  }}
                >
                  {catalogProducts.slice(0, 4).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      onOpenDetail={(p) => setSelectedProductDetail(p)}
                      isWishlisted={wishlist.includes(product.id)}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Interactive Crop Prescription Engine */}
            <CropFinder
              onAddToCart={handleAddToCart}
              onOpenProductDetail={(p) => setSelectedProductDetail(p)}
            />

            {/* Trust & Commercial Assurance Banner */}
            <section
              style={{
                padding: "4rem 0",
                background: "#ffffff",
                borderTop: "1px solid var(--outline-variant)",
              }}
            >
              <div className="container">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: "2rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        background: "var(--secondary-container)",
                        color: "var(--on-secondary-container)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        shrink: 0,
                      }}
                    >
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h4
                        style={{
                          fontSize: "1.05rem",
                          color: "var(--primary)",
                          marginBottom: "0.35rem",
                        }}
                      >
                        100% Certified Assurance
                      </h4>
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--on-surface-variant)",
                          lineHeight: 1.5,
                        }}
                      >
                        Every production run undergoes strict AOAC
                        microbiological assay testing for pathogen-free
                        security.
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        background: "var(--surface-container-high)",
                        color: "var(--primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        shrink: 0,
                      }}
                    >
                      <HeartHandshake size={24} />
                    </div>
                    <div>
                      <h4
                        style={{
                          fontSize: "1.05rem",
                          color: "var(--primary)",
                          marginBottom: "0.35rem",
                        }}
                      >
                        Dedicated CCA Advisory
                      </h4>
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--on-surface-variant)",
                          lineHeight: 1.5,
                        }}
                      >
                        Certified Crop Advisers assist with custom flock dietary
                        conversions and soil test prescriptions.
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        background: "var(--tertiary-fixed)",
                        color: "var(--tertiary-container)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        shrink: 0,
                      }}
                    >
                      <Award size={24} />
                    </div>
                    <div>
                      <h4
                        style={{
                          fontSize: "1.05rem",
                          color: "var(--primary)",
                          marginBottom: "0.35rem",
                        }}
                      >
                        Rapid 24h Regional Dispatch
                      </h4>
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--on-surface-variant)",
                          lineHeight: 1.5,
                        }}
                      >
                        Climate-controlled storage hubs ready for immediate
                        pallet freight and full-truckload delivery.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === "catalogue" && (
          <ProductCatalogue
            onAddToCart={handleAddToCart}
            onOpenDetail={(p) => setSelectedProductDetail(p)}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          />
        )}

        {activeTab === "calculator" && (
          <SoilCalculator onAddToCart={handleAddToCart} />
        )}

        {activeTab === "support" && <AgronomistSupport />}

        {activeTab === "signin" && (
          <SignIn
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onAuthenticated={handleAuthenticated}
          />
        )}

        {activeTab === "signup" && (
          <SignUp
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onAuthenticated={handleAuthenticated}
          />
        )}
      </main>

      {/* Global Modals & Drawers */}
      <ProductDetailModal
        product={selectedProductDetail}
        onClose={() => setSelectedProductDetail(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <BulkQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* Mobile Bottom Navigation (React Native / App-like) */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        cartCount={cartCount}
        openCart={() => setIsCartOpen(true)}
      />

      {/* Toast Feedback */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}

export default App;
