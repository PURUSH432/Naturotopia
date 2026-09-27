import React, { useState } from "react";
import {
  ShieldCheck,
  ArrowRight,
  Eye,
  EyeOff,
  Building2,
  Sprout,
  BadgeCheck,
  Mail,
  Lock,
  LogIn,
  AlertCircle,
} from "lucide-react";
import { apiRequest } from "../api";

export function SignIn({ onNavigate, onAuthenticated }) {
  const [accountType, setAccountType] = useState("enterprise");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [rememberAccount, setRememberAccount] = useState(false);
  const [formData, setFormData] = useState({ accountId: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!formData.accountId || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }
    setIsLoading(true);
    apiRequest("/auth/signin", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((session) => {
        onAuthenticated(session);
        onNavigate("home");
      })
      .catch((requestError) => setError(requestError.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      style={{
        flex: 1,
        background: "var(--background)",
        paddingBottom: "5rem",
      }}
    >
      {/* Breadcrumb ribbon */}
      <div
        style={{
          background: "var(--surface-container-low)",
          padding: "0.6rem 0",
          borderBottom: "1px solid var(--outline-variant)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.5rem",
          }}
        >
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.78rem",
              color: "var(--on-surface-variant)",
            }}
          >
            <button
              onClick={() => onNavigate("home")}
              style={{
                color: "var(--on-surface-variant)",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                fontWeight: 500,
              }}
            >
              🏠 Home
            </button>
            <span style={{ color: "var(--outline-variant)" }}>/</span>
            <span style={{ color: "var(--on-surface-variant)" }}>
              Customer Portal
            </span>
            <span style={{ color: "var(--outline-variant)" }}>/</span>
            <span style={{ color: "var(--primary)", fontWeight: 700 }}>
              Sign In
            </span>
          </nav>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--secondary)",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--secondary)",
                animation: "pulse 2s infinite",
                display: "inline-block",
              }}
            />
            SSL 256-Bit Encrypted Portal
          </span>
        </div>
      </div>

      <div
        className="container"
        style={{ paddingTop: "2.5rem", paddingBottom: "2rem" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: "2rem",
            alignItems: "stretch",
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          {/* ── Left: Sign-In Form ── */}
          <div
            style={{
              background: "var(--surface)",
              borderRadius: "var(--radius-xl)",
              boxShadow: "var(--shadow-modal)",
              padding: "clamp(1.5rem, 4vw, 2.5rem)",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            {/* Overline + Title */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  color: "var(--secondary)",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "0.4rem",
                }}
              >
                <ShieldCheck size={16} />
                Enterprise Verification Gateway
              </div>
              <h1
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2rem)",
                  color: "var(--primary)",
                  fontFamily: "var(--font-headline)",
                  marginBottom: "0.4rem",
                }}
              >
                Commercial Grower &amp; Customer Sign In
              </h1>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "var(--on-surface-variant)",
                  lineHeight: 1.6,
                }}
              >
                Access your farm enterprise account, wholesale pricing
                schedules, batch assay records, and past purchase dispatches.
              </p>
            </div>

            {/* Account type tabs */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                background: "var(--surface-container-low)",
                borderRadius: "var(--radius-md)",
                padding: "5px",
                gap: "4px",
              }}
            >
              {[
                {
                  key: "enterprise",
                  icon: <Building2 size={16} />,
                  label: "Commercial Farm / Enterprise",
                },
                {
                  key: "retail",
                  icon: <Sprout size={16} />,
                  label: "Retail / Individual Grower",
                },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setAccountType(tab.key)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.4rem",
                    padding: "0.6rem 1rem",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    background:
                      accountType === tab.key
                        ? "var(--surface)"
                        : "transparent",
                    color:
                      accountType === tab.key
                        ? "var(--primary)"
                        : "var(--on-surface-variant)",
                    boxShadow:
                      accountType === tab.key ? "var(--shadow-subtle)" : "none",
                    transition: "all var(--transition-fast)",
                    cursor: "pointer",
                  }}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Error banner */}
            {error && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "#fef2f2",
                  border: "1px solid #fca5a5",
                  borderRadius: "var(--radius-md)",
                  padding: "0.75rem 1rem",
                  color: "var(--error)",
                  fontSize: "0.85rem",
                }}
              >
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {/* Account ID */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <label
                    htmlFor="signInAccountId"
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "var(--on-surface)",
                    }}
                  >
                    {accountType === "enterprise"
                      ? "Work / Farm Email or Enterprise ID"
                      : "Email Address"}
                  </label>
                  <span
                    style={{ fontSize: "0.72rem", color: "var(--outline)" }}
                  >
                    e.g. grower@greenfarms.com
                  </span>
                </div>
                <div style={{ position: "relative" }}>
                  <Mail
                    size={18}
                    style={{
                      position: "absolute",
                      left: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--outline)",
                      pointerEvents: "none",
                    }}
                  />
                  <input
                    id="signInAccountId"
                    type="text"
                    required
                    placeholder={
                      accountType === "enterprise"
                        ? "grower@greenfarms.com or NSA-84920"
                        : "your@email.com"
                    }
                    value={formData.accountId}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, accountId: e.target.value }))
                    }
                    style={{
                      width: "100%",
                      paddingLeft: 42,
                      paddingRight: 14,
                      paddingTop: "0.65rem",
                      paddingBottom: "0.65rem",
                      background: "var(--surface-container-low)",
                      border: "none",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.88rem",
                      color: "var(--on-surface)",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "box-shadow var(--transition-fast)",
                    }}
                    onFocus={(e) =>
                      (e.target.style.boxShadow = "0 0 0 2px var(--secondary)")
                    }
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                  />
                </div>
              </div>

              {/* Password */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <label
                    htmlFor="signInPassword"
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "var(--on-surface)",
                    }}
                  >
                    Account Security Key / Password
                  </label>
                  <button
                    type="button"
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--secondary)",
                      textDecoration: "underline",
                      fontWeight: 600,
                    }}
                  >
                    Forgot password?
                  </button>
                </div>
                <div style={{ position: "relative" }}>
                  <Lock
                    size={18}
                    style={{
                      position: "absolute",
                      left: 14,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--outline)",
                      pointerEvents: "none",
                    }}
                  />
                  <input
                    id="signInPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your secure password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, password: e.target.value }))
                    }
                    style={{
                      width: "100%",
                      paddingLeft: 42,
                      paddingRight: 46,
                      paddingTop: "0.65rem",
                      paddingBottom: "0.65rem",
                      background: "var(--surface-container-low)",
                      border: "none",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.88rem",
                      color: "var(--on-surface)",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "box-shadow var(--transition-fast)",
                    }}
                    onFocus={(e) =>
                      (e.target.style.boxShadow = "0 0 0 2px var(--secondary)")
                    }
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--outline)",
                      display: "flex",
                      alignItems: "center",
                    }}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Checkboxes */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.75rem 2rem",
                }}
              >
                {[
                  {
                    id: "keepSignedIn",
                    checked: keepSignedIn,
                    setter: setKeepSignedIn,
                    label: "Keep me signed in on this workstation",
                  },
                  {
                    id: "rememberAccount",
                    checked: rememberAccount,
                    setter: setRememberAccount,
                    label: "Remember Farm Account ID",
                  },
                ].map((cb) => (
                  <label
                    key={cb.id}
                    htmlFor={cb.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      cursor: "pointer",
                      fontSize: "0.82rem",
                      color: "var(--on-surface)",
                    }}
                  >
                    <input
                      id={cb.id}
                      type="checkbox"
                      checked={cb.checked}
                      onChange={(e) => cb.setter(e.target.checked)}
                      style={{
                        width: 16,
                        height: 16,
                        accentColor: "var(--secondary)",
                        cursor: "pointer",
                      }}
                    />
                    {cb.label}
                  </label>
                ))}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  width: "100%",
                  padding: "0.9rem",
                  background: isLoading
                    ? "var(--primary-light)"
                    : "var(--primary)",
                  color: "var(--on-primary)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  cursor: isLoading ? "not-allowed" : "pointer",
                  boxShadow: "var(--shadow-card)",
                  transition: "all var(--transition-normal)",
                }}
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner"
                      style={{
                        width: 18,
                        height: 18,
                        border: "2.5px solid rgba(255,255,255,0.3)",
                        borderTopColor: "#fff",
                        borderRadius: "50%",
                        animation: "spin 0.7s linear infinite",
                        display: "inline-block",
                      }}
                    />
                    Verifying credentials…
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    Sign In to Grower Portal
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* SSO Divider */}
            <div style={{ position: "relative", margin: "0.5rem 0" }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: 1,
                    background: "var(--outline-variant)",
                  }}
                />
              </div>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    background: "var(--surface)",
                    padding: "0 1rem",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--outline)",
                  }}
                >
                  Or federate agricultural credentials
                </span>
              </div>
            </div>

            {/* SSO Buttons */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem",
              }}
            >
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "0.65rem 1rem",
                  background: "var(--surface-container-low)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "var(--on-surface)",
                  cursor: "pointer",
                  transition: "background var(--transition-fast)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    "var(--surface-container)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    "var(--surface-container-low)")
                }
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    fill="#EA4335"
                  />
                </svg>
                Google Enterprise
              </button>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "0.65rem 1rem",
                  background: "var(--surface-container-low)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "var(--on-surface)",
                  cursor: "pointer",
                  transition: "background var(--transition-fast)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    "var(--surface-container)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    "var(--surface-container-low)")
                }
              >
                <Sprout size={16} color="var(--secondary)" />
                Farm Bureau / AgData ID
              </button>
            </div>

            {/* Switch to Register */}
            <div
              style={{
                marginTop: "0.5rem",
                padding: "1rem",
                background: "var(--surface-container-low)",
                borderRadius: "var(--radius-md)",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.75rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.84rem",
                  color: "var(--on-surface-variant)",
                }}
              >
                Don't have a commercial Naturotopia account yet?
              </p>
              <button
                onClick={() => onNavigate("signup")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.55rem 1.2rem",
                  background: "var(--secondary-container)",
                  color: "var(--on-secondary-container)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all var(--transition-fast)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--secondary)";
                  e.currentTarget.style.color = "var(--on-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "var(--secondary-container)";
                  e.currentTarget.style.color = "var(--on-secondary-container)";
                }}
              >
                Register as Wholesale Grower
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* ── Right: Trust & Benefits Panel ── */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {/* Trust badge */}
            <div
              style={{
                background: "var(--primary-container)",
                borderRadius: "var(--radius-xl)",
                padding: "2rem",
                color: "var(--on-primary)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "var(--radius-md)",
                    background: "rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <BadgeCheck size={26} />
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: "1.05rem",
                      fontFamily: "var(--font-headline)",
                    }}
                  >
                    Certified Grower Portal
                  </div>
                  <div style={{ fontSize: "0.78rem", opacity: 0.85 }}>
                    Trusted by 4,800+ Commercial Farms
                  </div>
                </div>
              </div>
              <p
                style={{ fontSize: "0.88rem", lineHeight: 1.65, opacity: 0.9 }}
              >
                Your account gives you direct access to lab-verified NSA product
                batch records, exclusive enterprise pricing, and dedicated CCA
                advisory support.
              </p>
            </div>

            {/* Benefit cards */}
            {[
              {
                icon: "🌱",
                title: "Wholesale Pricing",
                desc: "Exclusive tiered pricing for bulk and recurring agro-input orders above 1 MT.",
              },
              {
                icon: "📋",
                title: "Batch Assay Records",
                desc: "Full AOAC microbiological test certificates for every production run.",
              },
              {
                icon: "🚛",
                title: "24h Regional Dispatch",
                desc: "Priority climate-controlled freight from Central Valley Hub.",
              },
              {
                icon: "🧑‍🌾",
                title: "CCA Advisory Line",
                desc: "One-on-one soil prescription and flock nutrition consultations.",
              },
            ].map((b) => (
              <div
                key={b.title}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                  background: "var(--surface)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1rem 1.2rem",
                  boxShadow: "var(--shadow-subtle)",
                }}
              >
                <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>
                  {b.icon}
                </span>
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: "var(--primary)",
                      marginBottom: "0.2rem",
                      fontSize: "0.92rem",
                    }}
                  >
                    {b.title}
                  </div>
                  <div
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--on-surface-variant)",
                      lineHeight: 1.55,
                    }}
                  >
                    {b.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
