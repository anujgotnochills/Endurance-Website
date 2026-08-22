import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useSubmitLead } from "@/lib/hooks";
import { SOCIAL_URLS } from "@/lib/social";

const CONTACT_INFO = [
  {
    label: "Studio",
    value: "A-74, 2nd Floor, Sector-65, Noida 201301",
    href: "https://www.google.com/maps/search/?api=1&query=Endurance+Image,+A-74,+2nd+Floor,+Sector+65,+Noida+201301",
  },
  {
    label: "Email",
    value: "enduranceimage16@gmail.com",
    href: "mailto:enduranceimage16@gmail.com",
  },
  {
    label: "Phone",
    value: "+91 9582156943",
    href: "tel:+919582156943",
  },
];

const SOCIAL_LINKS = [
  { name: "WhatsApp", href: SOCIAL_URLS.whatsapp },
  { name: "Instagram", href: SOCIAL_URLS.instagram },
  { name: "LinkedIn", href: SOCIAL_URLS.linkedin },
  { name: "YouTube", href: SOCIAL_URLS.youtube },
];

function CheckIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" className="mx-auto mb-5">
      <circle cx="28" cy="28" r="28" fill="hsl(270 100% 60% / 0.15)" />
      <circle cx="28" cy="28" r="20" stroke="hsl(270 100% 60%)" strokeWidth="2" fill="none" />
      <path
        d="M18 28l7 7 13-13"
        stroke="hsl(270 100% 60%)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  business: string;
  requirements: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  requirements?: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  phone: "",
  email: "",
  business: "",
  requirements: "",
};

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  if (!form.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^\+?[0-9\s\-]{7,15}$/.test(form.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }
  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!form.requirements.trim()) errors.requirements = "Please describe your requirements.";
  return errors;
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const { submit, loading, success, error: submitError, reset } = useSubmitLead();

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    if (touched[name as keyof FormState]) {
      setErrors(validate(updated));
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(form));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allTouched = Object.fromEntries(Object.keys(form).map((k) => [k, true]));
    setTouched(allTouched as typeof touched);
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    await submit({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      business: form.business.trim(),
      requirements: form.requirements.trim(),
    });
  }

  function handleReset() {
    setForm(INITIAL_FORM);
    setErrors({});
    setTouched({});
    reset();
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 md:py-28 overflow-hidden bg-transparent"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, hsl(270 100% 60% / 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[95%] md:max-w-[90%] xl:max-w-7xl mx-auto px-4 md:px-6">
        {/* Section badge */}
        <motion.div
          className="flex justify-center mb-10 md:mb-14"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          <span className="px-6 py-2.5 rounded-full bg-primary text-white text-base font-bold border border-primary/60 shadow-md backdrop-blur-sm">
            Get In Touch
          </span>
        </motion.div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">
          {/* ── LEFT COLUMN ── */}
          <motion.div
            className="flex flex-col"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.1 }}
          >
            <h2 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white leading-tight mb-3">
              Let's discuss{" "}
              <span className="text-primary">something</span>{" "}
              <span className="text-white/60">cool</span>{" "}
              together
            </h2>
            <p className="text-white/50 text-base md:text-lg font-medium mb-10 max-w-md">
              Tell us about your project — we'll get back to you within 24 hours.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-5 mb-10">
              {CONTACT_INFO.map((info) => (
                <div key={info.label} className="flex flex-col gap-0.5">
                  <span className="text-[#666] uppercase text-xs font-semibold tracking-widest">
                    {info.label}
                  </span>
                  <a
                    href={info.href}
                    target={info.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-white text-base md:text-lg font-semibold hover:text-primary transition-colors duration-200"
                  >
                    {info.value}
                  </a>
                </div>
              ))}
            </div>

            {/* Social pills */}
            <div className="flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-4 py-1.5 text-xs font-medium text-white transition-all duration-300 hover:border-primary hover:text-primary"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN — Form Card ── */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.2 }}
          >
            <div
              className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 sm:p-8 shadow-[0_8px_60px_rgba(0,0,0,0.4)]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
              }}
            >
              {/* Inner glow border */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(270 100% 60% / 0.12) 0%, transparent 60%)",
                }}
              />

              {success ? (
                /* ── Success State ── */
                <motion.div
                  className="relative z-10 flex flex-col items-center justify-center py-12 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <CheckIcon />
                  <h3 className="text-2xl font-black text-white mb-2">Message Sent!</h3>
                  <p className="text-white/50 text-sm mb-8 max-w-xs">
                    Thanks for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-full border border-primary/60 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                /* ── Form ── */
                <form onSubmit={handleSubmit} noValidate className="relative z-10 flex flex-col gap-5">
                  <p className="text-white/40 text-sm font-medium -mb-1">
                    Fill in your details below
                  </p>

                  {/* Name */}
                  <FormField
                    id="cf-name"
                    label="Your Name *"
                    name="name"
                    type="text"
                    placeholder="Rahul Sharma"
                    value={form.name}
                    error={touched.name ? errors.name : undefined}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {/* Phone + Email side by side on md+ */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      id="cf-phone"
                      label="Phone Number *"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      error={touched.phone ? errors.phone : undefined}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormField
                      id="cf-email"
                      label="Email Address *"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      error={touched.email ? errors.email : undefined}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>

                  {/* Business */}
                  <FormField
                    id="cf-business"
                    label="Business / Brand"
                    name="business"
                    type="text"
                    placeholder="Your company or brand name"
                    value={form.business}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {/* Requirements */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cf-requirements" className="text-white/60 text-xs font-semibold uppercase tracking-widest">
                      Requirements *
                    </label>
                    <textarea
                      id="cf-requirements"
                      name="requirements"
                      rows={4}
                      placeholder="Tell us about your project, goals, timeline..."
                      value={form.requirements}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full rounded-xl border px-4 py-3 text-sm text-white placeholder:text-white/25 bg-white/[0.04] backdrop-blur-sm resize-none outline-none transition-all duration-200 font-medium leading-relaxed
                        ${touched.requirements && errors.requirements
                          ? "border-red-500/60 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                          : "border-white/10 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                        }`}
                    />
                    {touched.requirements && errors.requirements && (
                      <p className="text-red-400 text-xs font-medium">{errors.requirements}</p>
                    )}
                  </div>

                  {/* Submit error */}
                  {submitError && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300 text-sm font-medium">
                      {submitError}
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={loading}
                    id="cf-submit"
                    className="relative mt-1 flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-3.5 text-white font-bold text-base overflow-hidden
                      transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_32px_hsl(270_100%_60%/0.4)] active:scale-[0.98]
                      disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {/* Shimmer */}
                    <span
                      className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 1.5s infinite",
                      }}
                    />
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  );
}

/* ── Reusable input field ── */
interface FormFieldProps {
  id: string;
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

function FormField({ id, label, name, type, placeholder, value, error, onChange, onBlur }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-white/60 text-xs font-semibold uppercase tracking-widest">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete="off"
        className={`w-full rounded-xl border px-4 py-3 text-sm text-white placeholder:text-white/25 bg-white/[0.04] backdrop-blur-sm outline-none transition-all duration-200 font-medium
          ${error
            ? "border-red-500/60 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
            : "border-white/10 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
          }`}
      />
      {error && <p className="text-red-400 text-xs font-medium">{error}</p>}
    </div>
  );
}
