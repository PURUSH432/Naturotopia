import React, { useState } from "react";
import {
  X,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Truck,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import confetti from "canvas-confetti";
import { apiRequest } from "../api";

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) {
  const [checkoutStep, setCheckoutStep] = useState("cart"); // 'cart' | 'checkout' | 'success'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [checkoutError, setCheckoutError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "cod",
  });
  const [paymentData, setPaymentData] = useState({
    upiId: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  if (!isOpen) return null;

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const totalBags = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Commercial discount if order is large
  const discountRate = totalBags >= 40 ? 0.12 : totalBags >= 20 ? 0.08 : 0;
  const discountAmount = subtotal * discountRate;

  // Free freight threshold: 100 bags (5 tons)
  const freightFree = totalBags >= 100;
  const freightCost = freightFree || cartItems.length === 0 ? 0 : 75.0;
  const finalTotal = Math.max(0, subtotal - discountAmount + freightCost);

  const handleCompleteOrder = async (e) => {
    e.preventDefault();
    setCheckoutError("");
    const digits = paymentData.cardNumber.replace(/\D/g, "");
    if (formData.paymentMethod === "upi" && !paymentData.upiId.trim()) {
      setCheckoutError("Enter your UPI ID to continue.");
      return;
    }
    if (
      formData.paymentMethod === "card" &&
      (digits.length < 12 || !paymentData.expiry || paymentData.cvv.length < 3)
    ) {
      setCheckoutError("Enter valid debit or credit card details to continue.");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await apiRequest("/orders", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          paymentDetails:
            formData.paymentMethod === "upi"
              ? { upiId: paymentData.upiId.trim() }
              : formData.paymentMethod === "card"
                ? { cardLast4: digits.slice(-4) }
                : {},
        }),
      });
      setOrderNumber(result.order.order_number);
      setCheckoutStep("success");
      onClearCart();
      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      } catch {
        // Ignore animation failures.
      }
    } catch (error) {
      setCheckoutError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    setCheckoutError("");
    setCheckoutStep("payment");
  };

  const paymentMethodInfo = {
    upi: {
      title: "UPI",
      message:
        "Your UPI payment reference will be recorded with this order. Complete the payment in your UPI app when prompted.",
    },
    card: {
      title: "Debit / Credit Card",
      message:
        "Card details are used only to process this request. The database stores only the last four digits, never the full card number or CVV.",
    },
    cod: {
      title: "Cash on Delivery",
      message:
        "Payment is collected when the order is delivered or collected at the depot.",
    },
  }[formData.paymentMethod];

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      style={{ zIndex: 60, padding: 0 }}
    >
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid var(--surface-container)",
            background: "var(--surface-container-low)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <ShoppingBag size={22} color="var(--primary)" />
            <h3 style={{ fontSize: "1.2rem", color: "var(--primary)" }}>
              Commercial Cart ({cartItems.length})
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--outline)",
              boxShadow: "var(--shadow-subtle)",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Freight Progress Bar */}
        <div
          style={{
            background: "var(--primary-container)",
            color: "#ffffff",
            padding: "0.75rem 1.5rem",
            fontSize: "0.8rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.35rem",
              color: "var(--secondary-fixed)",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontWeight: 600,
              }}
            >
              <Truck size={14} /> Freight Allocation Status:
            </span>
            <strong>{totalBags} / 100 bags (5 Tons)</strong>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.2)",
              height: "6px",
              borderRadius: "3px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                background: "var(--secondary-fixed)",
                height: "100%",
                width: `${Math.min(100, (totalBags / 100) * 100)}%`,
                transition: "width 0.3s ease",
              }}
            />
          </div>
          <div
            style={{
              fontSize: "0.72rem",
              color: "var(--primary-fixed-dim)",
              marginTop: "4px",
            }}
          >
            {freightFree
              ? "🎉 Free commercial freight activated!"
              : `Add ${100 - totalBags} more bags to qualify for Free Freight`}
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem 1.5rem" }}>
          {checkoutStep === "cart" && (
            <>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
                  <ShoppingBag
                    size={48}
                    color="var(--outline-variant)"
                    style={{ margin: "0 auto 1rem auto" }}
                  />
                  <h4 style={{ fontSize: "1.1rem", color: "var(--primary)" }}>
                    Your Cart is Empty
                  </h4>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--outline)",
                      marginTop: "0.25rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Explore our high-conversion feeds, 100% natural organic
                    manure, and veterinary supplies.
                  </p>
                  <button className="btn-primary" onClick={onClose}>
                    Explore Products
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      style={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center",
                        padding: "0.85rem",
                        background: "var(--surface-container-low)",
                        borderRadius: "var(--radius-lg)",
                        border: "1px solid var(--outline-variant)",
                      }}
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        style={{
                          width: "64px",
                          height: "64px",
                          objectFit: "cover",
                          borderRadius: "var(--radius-md)",
                          background: "#fff",
                        }}
                        onError={(e) => {
                          e.target.src = item.product.image.replace(
                            "/assets",
                            "",
                          );
                        }}
                      />

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: 700,
                            color: "var(--primary)",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.product.shortName || item.product.name}
                        </div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--outline)",
                          }}
                        >
                          ${item.product.price.toFixed(2)} / {item.product.unit}
                        </div>

                        {/* Stepper & Subtotal */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "0.5rem",
                          }}
                        >
                          <div
                            className="quantity-stepper"
                            style={{
                              transform: "scale(0.85)",
                              transformOrigin: "left",
                            }}
                          >
                            <button
                              className="stepper-btn"
                              onClick={() =>
                                onUpdateQuantity(
                                  item.product.id,
                                  Math.max(1, item.quantity - 1),
                                )
                              }
                            >
                              -
                            </button>
                            <span className="stepper-value">
                              {item.quantity}
                            </span>
                            <button
                              className="stepper-btn"
                              onClick={() =>
                                onUpdateQuantity(
                                  item.product.id,
                                  item.quantity + 1,
                                )
                              }
                            >
                              +
                            </button>
                          </div>

                          <span
                            style={{
                              fontSize: "0.95rem",
                              fontWeight: 800,
                              color: "var(--primary)",
                            }}
                          >
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        style={{
                          color: "var(--outline)",
                          padding: "6px",
                          background: "none",
                        }}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {checkoutStep === "checkout" && (
            <form
              onSubmit={handleProceedToPayment}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  color: "var(--primary)",
                }}
              >
                Dispatch &amp; Commercial Billing Details
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "var(--primary)",
                    marginBottom: "3px",
                  }}
                >
                  Grower / Business Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Purushothaman"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "0.65rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--outline-variant)",
                    background: "var(--surface-container-low)",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "var(--primary)",
                    marginBottom: "3px",
                  }}
                >
                  Phone for Freight Coordination *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "0.65rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--outline-variant)",
                    background: "var(--surface-container-low)",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "var(--primary)",
                    marginBottom: "3px",
                  }}
                >
                  Delivery Terminal / Farm Destination *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Farm address, silo receiving bay, or regional depot will-call..."
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "0.65rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--outline-variant)",
                    background: "var(--surface-container-low)",
                    outline: "none",
                    resize: "none",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "var(--primary)",
                    marginBottom: "3px",
                  }}
                >
                  Commercial Terms
                </label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentMethod: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "0.65rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--outline-variant)",
                    background: "var(--surface-container-low)",
                    outline: "none",
                  }}
                >
                  <option value="upi">UPI</option>
                  <option value="card">Debit / Credit Card</option>
                  <option value="cod">Cash on Delivery</option>
                </select>
              </div>

              {checkoutError && (
                <div
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "var(--radius-md)",
                    background: "#fef2f2",
                    border: "1px solid #fca5a5",
                    color: "var(--error)",
                    fontSize: "0.82rem",
                  }}
                >
                  {checkoutError}
                </div>
              )}

              <div
                style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}
              >
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setCheckoutStep("cart")}
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  Back to Cart
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting}
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          )}

          {checkoutStep === "payment" && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.65rem",
                }}
              >
                <CreditCard size={22} color="var(--secondary)" />
                <div>
                  <h3 style={{ color: "var(--primary)", fontSize: "1.15rem" }}>
                    Payment &amp; Order Review
                  </h3>
                  <p
                    style={{
                      color: "var(--on-surface-variant)",
                      fontSize: "0.8rem",
                    }}
                  >
                    Review your commercial payment method before placing the
                    order.
                  </p>
                </div>
              </div>

              <div
                style={{
                  padding: "1rem",
                  borderRadius: "var(--radius-lg)",
                  background: "var(--surface-container-low)",
                  border: "1px solid var(--outline-variant)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <span
                    style={{
                      color: "var(--on-surface-variant)",
                      fontSize: "0.82rem",
                    }}
                  >
                    Payment method
                  </span>
                  <strong
                    style={{
                      color: "var(--primary)",
                      fontSize: "0.85rem",
                      textAlign: "right",
                    }}
                  >
                    {paymentMethodInfo.title}
                  </strong>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1rem",
                    paddingTop: "0.75rem",
                    borderTop: "1px solid var(--outline-variant)",
                  }}
                >
                  <span
                    style={{
                      color: "var(--on-surface-variant)",
                      fontSize: "0.82rem",
                    }}
                  >
                    Order total
                  </span>
                  <strong
                    style={{ color: "var(--primary)", fontSize: "1.1rem" }}
                  >
                    ${finalTotal.toFixed(2)}
                  </strong>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "0.6rem",
                  alignItems: "flex-start",
                  padding: "0.85rem",
                  borderRadius: "var(--radius-md)",
                  background: "var(--secondary-container)",
                  color: "var(--on-secondary-container)",
                  fontSize: "0.82rem",
                  lineHeight: 1.5,
                }}
              >
                <ShieldCheck
                  size={18}
                  style={{ flexShrink: 0, marginTop: 2 }}
                />
                <span>{paymentMethodInfo.message}</span>
              </div>

              {formData.paymentMethod === "upi" && (
                <label
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.35rem",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "var(--primary)",
                  }}
                >
                  UPI ID *
                  <input
                    type="text"
                    required
                    placeholder="name@bank"
                    value={paymentData.upiId}
                    onChange={(e) =>
                      setPaymentData({ ...paymentData, upiId: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "0.65rem",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--outline-variant)",
                      background: "var(--surface-container-low)",
                    }}
                  />
                </label>
              )}

              {formData.paymentMethod === "card" && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr",
                    gap: "0.6rem",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.35rem",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      color: "var(--primary)",
                    }}
                  >
                    Card number *
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder="1234 5678 9012 3456"
                      value={paymentData.cardNumber}
                      onChange={(e) =>
                        setPaymentData({
                          ...paymentData,
                          cardNumber: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "0.65rem",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--outline-variant)",
                        background: "var(--surface-container-low)",
                      }}
                    />
                  </label>
                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.35rem",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      color: "var(--primary)",
                    }}
                  >
                    Expiry *
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      placeholder="MM/YY"
                      value={paymentData.expiry}
                      onChange={(e) =>
                        setPaymentData({
                          ...paymentData,
                          expiry: e.target.value,
                        })
                      }
                      style={{
                        width: "100%",
                        padding: "0.65rem",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--outline-variant)",
                        background: "var(--surface-container-low)",
                      }}
                    />
                  </label>
                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.35rem",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      color: "var(--primary)",
                    }}
                  >
                    CVV *
                    <input
                      type="password"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder="123"
                      value={paymentData.cvv}
                      onChange={(e) =>
                        setPaymentData({ ...paymentData, cvv: e.target.value })
                      }
                      style={{
                        width: "100%",
                        padding: "0.65rem",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--outline-variant)",
                        background: "var(--surface-container-low)",
                      }}
                    />
                  </label>
                </div>
              )}

              {checkoutError && (
                <div
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "var(--radius-md)",
                    background: "#fef2f2",
                    border: "1px solid #fca5a5",
                    color: "var(--error)",
                    fontSize: "0.82rem",
                  }}
                >
                  {checkoutError}
                </div>
              )}

              <div
                style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}
              >
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setCheckoutStep("checkout")}
                  style={{ flex: 1, justifyContent: "center" }}
                  disabled={isSubmitting}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleCompleteOrder}
                  style={{ flex: 1, justifyContent: "center" }}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Processing..."
                    : "Confirm Payment & Place Order"}
                </button>
              </div>
            </div>
          )}

          {checkoutStep === "success" && (
            <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "var(--secondary-container)",
                  color: "var(--on-secondary-container)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.25rem auto",
                }}
              >
                <CheckCircle2 size={36} />
              </div>
              <h3
                style={{
                  fontSize: "1.4rem",
                  color: "var(--primary)",
                  marginBottom: "0.5rem",
                }}
              >
                Commercial Order Booked!
              </h3>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "var(--on-surface-variant)",
                  lineHeight: 1.5,
                  marginBottom: "1.5rem",
                }}
              >
                Order <strong>{orderNumber}</strong> has been logged with our
                Central Terminal. A dispatch coordinator will contact{" "}
                <strong>{formData.phone || "you"}</strong> with bills of lading
                (BOL).
              </p>
              <button
                className="btn-primary"
                onClick={() => {
                  onClose();
                  setCheckoutStep("cart");
                  setOrderNumber("");
                }}
                style={{ width: "100%", justifyContent: "center" }}
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Footer Summary & CTA (visible during cart view) */}
        {checkoutStep === "cart" && cartItems.length > 0 && (
          <div
            style={{
              padding: "1.25rem 1.5rem",
              borderTop: "1px solid var(--surface-container)",
              background: "var(--surface-container-low)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
                fontSize: "0.85rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "var(--on-surface-variant)",
                }}
              >
                <span>Subtotal ({totalBags} units):</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "var(--secondary)",
                    fontWeight: 700,
                  }}
                >
                  <span>
                    Volume Tier Discount ({(discountRate * 100).toFixed(0)}%):
                  </span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "var(--on-surface-variant)",
                }}
              >
                <span>Freight Logistics:</span>
                <span>
                  {freightFree ? (
                    <strong style={{ color: "var(--secondary)" }}>FREE</strong>
                  ) : (
                    `$${freightCost.toFixed(2)}`
                  )}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1.15rem",
                  fontWeight: 800,
                  color: "var(--primary)",
                  paddingTop: "0.5rem",
                  borderTop: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <span>Total:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="btn-primary"
              style={{
                width: "100%",
                padding: "0.85rem",
                fontSize: "1rem",
                justifyContent: "center",
              }}
              onClick={() => setCheckoutStep("checkout")}
            >
              <span>Proceed to Dispatch Request</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
