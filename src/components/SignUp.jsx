import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  ArrowRight,
  Eye,
  EyeOff,
  User,
  Building2,
  Mail,
  Phone,
  Lock,
  LockKeyhole,
  MapPin,
  Tractor,
  Package,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { apiRequest } from "../api";

const OPERATION_TYPES = [
  "Poultry Farm",
  "Crop Farm",
  "Mixed Agro",
  "Greenhouse",
  "Nursery",
  "Distributor / Reseller",
  "Other",
];
const PRIMARY_CROPS = [
  "Maize / Corn",
  "Rice",
  "Wheat",
  "Soybeans",
  "Vegetables",
  "Fruits / Orchards",
  "Cotton",
  "Poultry Feed Grains",
  "Other",
];
const STATES = [
  "Andhra Pradesh",
  "Karnataka",
  "Kerala",
  "Maharashtra",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
  "Other",
];

function strengthScore(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Ag-Grade Strong"];
const STRENGTH_COLORS = ["", "#ba1a1a", "#d97706", "#006c48", "#012d1d"];

export function SignUp({ onNavigate, onAuthenticated }) {
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    farmName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    operationType: "",
    primaryCrop: "",
    farmAcres: "",
    deliveryAddress: "",
    state: "",
    agreeTerms: false,
    agreeData: false,
  });

  const pwStrength = strengthScore(form.password);
  const pwMatch =
    form.password &&
    form.confirmPassword &&
    form.password === form.confirmPassword;

  const set = (key) => (e) => {
    const val =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }
    if (!form.agreeTerms) {
      setError("Please accept the Terms & Conditions to proceed.");
      return;
    }
    setIsLoading(true);
    apiRequest("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ ...form, accountType: "enterprise" }),
    })
      .then((session) => {
        onAuthenticated(session);
        setSubmitted(true);
      })
      .catch((requestError) => setError(requestError.message))
      .finally(() => setIsLoading(false));
  };

  if (submitted) {
    return (
      <div
        style={{
          flex: 1,
          background: "var(--background)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 1rem",
        }}
      >
        <div
          style={{
            background: "var(--surface)",
            borderRadius: "var(--radius-xl)",
            boxShadow: "var(--shadow-modal)",
            padding: "3rem 2.5rem",
            maxWidth: 520,
            width: "100%",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "var(--secondary-container)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
            }}
          >
            <CheckCircle2 size={36} color="var(--secondary)" />
          </div>
          <h2
            style={{
              fontSize: "1.6rem",
              color: "var(--primary)",
              fontFamily: "var(--font-headline)",
              marginBottom: "0.75rem",
            }}
          >
            Registration Submitted!
          </h2>
          <p
            style={{
              fontSize: "0.92rem",
              color: "var(--on-surface-variant)",
              lineHeight: 1.6,
              marginBottom: "2rem",
            }}
          >
            Welcome to Naturotopia, <strong>{form.fullName || "Grower"}</strong>
            ! Your wholesale account application has been received. Our CCA team
            will verify your enterprise details and activate your account within{" "}
            <strong>1–2 business days</strong>.
          </p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            <button
              onClick={() => onNavigate("signin")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.85rem",
                background: "var(--primary)",
                color: "var(--on-primary)",
                borderRadius: "var(--radius-md)",
                fontWeight: 700,
                fontSize: "0.95rem",
                cursor: "pointer",
              }}
            >
              Go to Sign In <ArrowRight size={16} />
            </button>
            <button
              onClick={() => onNavigate("home")}
              style={{
                padding: "0.75rem",
                background: "var(--surface-container-low)",
                color: "var(--on-surface)",
                borderRadius: "var(--radius-md)",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              Browse the Catalogue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        flex: 1,
        background: "var(--background)",
        paddingBottom: "5rem",
      }}
    >
      {/* Breadcrumb */}
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
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              🏠 Home
            </button>
            <span style={{ color: "var(--outline-variant)" }}>/</span>
            <span>Customer Portal</span>
            <span style={{ color: "var(--outline-variant)" }}>/</span>
            <span style={{ color: "var(--primary)", fontWeight: 700 }}>
              Create Wholesale Account
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
            Secure 256-bit Agronomic Gateway • FY2025/26 Season
          </span>
        </div>
      </div>

      <div
        className="container"
        style={{ paddingTop: "2.5rem", paddingBottom: "2rem" }}
      >
        {/* Header */}
        <div style={{ maxWidth: 1100, margin: "0 auto 2rem" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              maxWidth: 720,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.35rem 0.8rem",
                background: "var(--secondary-container)",
                color: "var(--on-secondary-container)",
                borderRadius: "var(--radius-md)",
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                width: "fit-content",
              }}
            >
              <ShieldCheck size={14} /> B2B Commercial Registration
            </div>
            <h1
              style={{
                fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                color: "var(--primary)",
                fontFamily: "var(--font-headline)",
                lineHeight: 1.15,
              }}
            >
              Register for Naturotopia Grower &amp; Wholesale Account
            </h1>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--on-surface-variant)",
                lineHeight: 1.65,
              }}
            >
              Gain direct commercial access to laboratory-assayed poultry feeds,
              100% natural organic manure fertilizers, state-certified batch
              analyses, and custom agronomic blending.
            </p>
          </div>

          {/* Metrics strip */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
              marginTop: "1.25rem",
              padding: "1rem 1.5rem",
              background: "var(--surface-container)",
              borderRadius: "var(--radius-lg)",
              width: "fit-content",
            }}
          >
            {[
              {
                icon: <Package size={20} />,
                value: "4,800+",
                label: "Active Farms Enrolled",
              },
              {
                icon: <Tractor size={20} />,
                value: "3 Depot",
                label: "Dispatch Terminals",
              },
            ].map((m, i) => (
              <React.Fragment key={m.label}>
                {i > 0 && (
                  <div
                    style={{
                      width: 1,
                      height: 36,
                      background: "var(--outline-variant)",
                    }}
                  />
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "var(--radius-md)",
                      background: "var(--primary)",
                      color: "var(--on-primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {m.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-headline)",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        color: "var(--primary)",
                      }}
                    >
                      {m.value}
                    </div>
                    <div
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--on-surface-variant)",
                      }}
                    >
                      {m.label}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: "2rem",
            maxWidth: 1100,
            margin: "0 auto",
            alignItems: "start",
          }}
        >
          {/* ── Left: Form ── */}
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {/* Error */}
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
                <AlertCircle size={16} /> {error}
              </div>
            )}

            {/* Section 1: Account & Business Profile */}
            <FormSection
              number={1}
              title="Account & Business Profile"
              badge="Primary Contact"
            >
              <Grid2>
                <Field label="Full Name" required icon={<User size={18} />}>
                  <input
                    id="su-fullname"
                    type="text"
                    required
                    placeholder="e.g., Marcus Vance, CCA"
                    value={form.fullName}
                    onChange={set("fullName")}
                    style={inputStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </Field>
                <Field
                  label="Farm or Company Enterprise"
                  required
                  icon={<Building2 size={18} />}
                >
                  <input
                    id="su-farm"
                    type="text"
                    required
                    placeholder="e.g., Valley Crest Agro Farms LLC"
                    value={form.farmName}
                    onChange={set("farmName")}
                    style={inputStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </Field>
                <Field
                  label="Commercial Email Address"
                  required
                  icon={<Mail size={18} />}
                >
                  <input
                    id="su-email"
                    type="email"
                    required
                    placeholder="purchasing@valleycrestagro.com"
                    value={form.email}
                    onChange={set("email")}
                    style={inputStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </Field>
                <Field
                  label="Field / Dispatch Contact Phone"
                  required
                  icon={<Phone size={18} />}
                >
                  <input
                    id="su-phone"
                    type="tel"
                    required
                    placeholder="(555) 019-2834"
                    value={form.phone}
                    onChange={set("phone")}
                    style={inputStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </Field>
              </Grid2>

              {/* Password pair */}
              <Grid2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",
                  }}
                >
                  <label htmlFor="su-password" style={labelStyle}>
                    Create Portal Password <Req />
                  </label>
                  <div style={{ position: "relative" }}>
                    <Lock size={18} style={iconStyle} />
                    <input
                      id="su-password"
                      type={showPw ? "text" : "password"}
                      required
                      placeholder="Minimum 8 characters"
                      value={form.password}
                      onChange={set("password")}
                      style={{ ...inputStyle, paddingRight: 46 }}
                      onFocus={focusStyle}
                      onBlur={blurStyle}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      style={eyeBtn}
                    >
                      {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                  {/* Strength meter */}
                  {form.password && (
                    <div style={{ marginTop: 6 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "0.7rem",
                          color: "var(--outline)",
                          marginBottom: 4,
                        }}
                      >
                        <span>Password Security</span>
                        <span
                          style={{
                            color: STRENGTH_COLORS[pwStrength],
                            fontWeight: 700,
                          }}
                        >
                          {STRENGTH_LABELS[pwStrength]}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(4, 1fr)",
                          gap: 4,
                          height: 5,
                        }}
                      >
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            style={{
                              borderRadius: 99,
                              background:
                                i <= pwStrength
                                  ? STRENGTH_COLORS[pwStrength]
                                  : "var(--surface-container-high)",
                              transition: "background 0.3s",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",
                  }}
                >
                  <label htmlFor="su-confirm" style={labelStyle}>
                    Confirm Password <Req />
                  </label>
                  <div style={{ position: "relative" }}>
                    <LockKeyhole size={18} style={iconStyle} />
                    <input
                      id="su-confirm"
                      type={showConfirm ? "text" : "password"}
                      required
                      placeholder="Re-type password"
                      value={form.confirmPassword}
                      onChange={set("confirmPassword")}
                      style={{ ...inputStyle, paddingRight: 46 }}
                      onFocus={focusStyle}
                      onBlur={blurStyle}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      style={eyeBtn}
                    >
                      {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                  {form.confirmPassword && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        fontSize: "0.72rem",
                        color: pwMatch ? "var(--secondary)" : "var(--error)",
                        marginTop: 4,
                      }}
                    >
                      {pwMatch ? (
                        <CheckCircle2 size={13} />
                      ) : (
                        <AlertCircle size={13} />
                      )}
                      {pwMatch ? "Passwords match" : "Passwords do not match"}
                    </div>
                  )}
                  <p
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--on-surface-variant)",
                    }}
                  >
                    Must include 1 number and 1 special symbol
                  </p>
                </div>
              </Grid2>
            </FormSection>

            {/* Section 2: Farm Operations */}
            <FormSection
              number={2}
              title="Farm &amp; Operation Details"
              badge="Agronomic Profile"
            >
              <Grid2>
                <Field
                  label="Operation Type"
                  required
                  icon={<Tractor size={18} />}
                  isSelect
                >
                  <select
                    id="su-optype"
                    required
                    value={form.operationType}
                    onChange={set("operationType")}
                    style={inputStyle}
                  >
                    <option value="">Select operation type…</option>
                    {OPERATION_TYPES.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Primary Crop / Production" icon={null}>
                  <select
                    value={form.primaryCrop}
                    onChange={set("primaryCrop")}
                    style={inputStyle}
                  >
                    <option value="">Select primary crop…</option>
                    {PRIMARY_CROPS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field
                  label="Total Farm Area (Acres / Ha)"
                  icon={<MapPin size={18} />}
                >
                  <input
                    type="number"
                    min={0}
                    placeholder="e.g., 250"
                    value={form.farmAcres}
                    onChange={set("farmAcres")}
                    style={inputStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </Field>
                <Field
                  label="State / Region"
                  icon={<MapPin size={18} />}
                  isSelect
                >
                  <select
                    value={form.state}
                    onChange={set("state")}
                    style={inputStyle}
                  >
                    <option value="">Select state…</option>
                    {STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
              </Grid2>
              <Field
                label="Primary Delivery / Dispatch Address"
                icon={<MapPin size={18} />}
              >
                <textarea
                  rows={2}
                  placeholder="Farm / depot address for delivery…"
                  value={form.deliveryAddress}
                  onChange={set("deliveryAddress")}
                  style={{
                    ...inputStyle,
                    height: "auto",
                    paddingTop: "0.65rem",
                    paddingBottom: "0.65rem",
                    resize: "vertical",
                  }}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </Field>
            </FormSection>

            {/* Section 3: Agreements */}
            <FormSection
              number={3}
              title="Legal Agreements &amp; Consent"
              badge="Compliance"
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {[
                  {
                    id: "agreeTerms",
                    key: "agreeTerms",
                    label: (
                      <span>
                        I agree to Naturotopia's{" "}
                        <strong>Terms &amp; Conditions</strong> and{" "}
                        <strong>Wholesale Purchase Agreement</strong>
                      </span>
                    ),
                    required: true,
                  },
                  {
                    id: "agreeData",
                    key: "agreeData",
                    label: (
                      <span>
                        I consent to storage and use of my farm data for
                        logistics, crop analysis, and account services per{" "}
                        <strong>Privacy Policy</strong>
                      </span>
                    ),
                    required: false,
                  },
                ].map((cb) => (
                  <label
                    key={cb.id}
                    htmlFor={cb.id}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      color: "var(--on-surface)",
                    }}
                  >
                    <input
                      id={cb.id}
                      type="checkbox"
                      checked={form[cb.key]}
                      onChange={set(cb.key)}
                      style={{
                        width: 17,
                        height: 17,
                        accentColor: "var(--secondary)",
                        cursor: "pointer",
                        marginTop: 2,
                        flexShrink: 0,
                      }}
                    />
                    {cb.label}
                    {cb.required && <Req />}
                  </label>
                ))}
              </div>
            </FormSection>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.6rem",
                width: "100%",
                padding: "1rem",
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
                    style={{
                      width: 20,
                      height: 20,
                      border: "2.5px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                      animation: "spin 0.7s linear infinite",
                      display: "inline-block",
                    }}
                  />
                  Submitting Application…
                </>
              ) : (
                <>
                  <ShieldCheck size={19} />
                  Create Naturotopia Grower Account
                  <ArrowRight size={19} />
                </>
              )}
            </button>

            <p
              style={{
                textAlign: "center",
                fontSize: "0.82rem",
                color: "var(--on-surface-variant)",
              }}
            >
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => onNavigate("signin")}
                style={{
                  color: "var(--secondary)",
                  fontWeight: 700,
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Sign In →
              </button>
            </p>
          </form>

          {/* ── Right: Value Proposition ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              position: "sticky",
              top: "5rem",
            }}
          >
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
                  fontFamily: "var(--font-headline)",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  marginBottom: "0.5rem",
                }}
              >
                Why Register with Naturotopia?
              </div>
              <p
                style={{ fontSize: "0.88rem", lineHeight: 1.65, opacity: 0.9 }}
              >
                As a registered grower, you get certified agro inputs, priority
                dispatch, and a personal CCA consultant — all in one dashboard.
              </p>
            </div>
            {[
              {
                icon: "🏷️",
                title: "Exclusive Wholesale Rates",
                desc: "Tiered bulk pricing unavailable to retail customers. Savings from first pallet.",
              },
              {
                icon: "📦",
                title: "Lab-Certified Every Batch",
                desc: "AOAC & FSSAI assay reports linked to every SKU at checkout.",
              },
              {
                icon: "🌿",
                title: "100% Organic & Natural",
                desc: "NSA poultry manure and natural fertilizers — zero synthetics, OMRI listed.",
              },
              {
                icon: "📞",
                title: "Dedicated Agronomy Desk",
                desc: "Book CCA consultations, soil test prescriptions, and flock nutrition plans.",
              },
            ].map((b) => (
              <div
                key={b.title}
                style={{
                  display: "flex",
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
                      fontSize: "0.92rem",
                      marginBottom: "0.2rem",
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

            {/* Security assurance */}
            <div
              style={{
                background: "var(--surface-container-low)",
                borderRadius: "var(--radius-lg)",
                padding: "1rem 1.2rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "var(--radius-md)",
                  background: "var(--secondary-container)",
                  color: "var(--on-secondary-container)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <ShieldCheck size={20} />
              </div>
              <div
                style={{
                  fontSize: "0.78rem",
                  color: "var(--on-surface-variant)",
                  lineHeight: 1.5,
                }}
              >
                <strong style={{ color: "var(--on-surface)" }}>
                  256-bit SSL Encrypted
                </strong>{" "}
                — Your data is fully secured and never shared with third
                parties.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Helpers ── */
const labelStyle = {
  fontSize: "0.8rem",
  fontWeight: 700,
  color: "var(--on-surface)",
};
const inputStyle = {
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
  fontFamily: "var(--font-body)",
  transition: "box-shadow var(--transition-fast)",
};
const iconStyle = {
  position: "absolute",
  left: 14,
  top: "50%",
  transform: "translateY(-50%)",
  color: "var(--outline)",
  pointerEvents: "none",
};
const eyeBtn = {
  position: "absolute",
  right: 12,
  top: "50%",
  transform: "translateY(-50%)",
  color: "var(--outline)",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
};
const focusStyle = (e) => {
  e.target.style.boxShadow = "0 0 0 2px var(--secondary)";
};
const blurStyle = (e) => {
  e.target.style.boxShadow = "none";
};

function Req() {
  return <span style={{ color: "var(--error)", marginLeft: 2 }}>*</span>;
}

function FormSection({ number, title, badge, children }) {
  return (
    <div
      style={{
        background: "var(--surface)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-card)",
        padding: "1.5rem 1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "var(--primary)",
              color: "var(--on-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.8rem",
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {number}
          </span>
          <h2
            style={{
              fontSize: "1.1rem",
              color: "var(--primary)",
              fontFamily: "var(--font-headline)",
              fontWeight: 700,
            }}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>
        {badge && (
          <span
            style={{
              fontSize: "0.68rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              color: "var(--secondary)",
              background: "var(--surface-container-low)",
              padding: "0.25rem 0.6rem",
              borderRadius: "var(--radius-sm)",
            }}
          >
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function Grid2({ children }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
        gap: "1rem",
      }}
    >
      {children}
    </div>
  );
}

function Field({ label, required, icon, children, isSelect }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      {label && (
        <label style={labelStyle}>
          {label} {required && <Req />}
        </label>
      )}
      {icon ? (
        <div style={{ position: "relative" }}>
          <span style={iconStyle}>{icon}</span>
          {children}
        </div>
      ) : (
        <div style={{ position: "relative" }}>{children}</div>
      )}
    </div>
  );
}

export default SignUp;
