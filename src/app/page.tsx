"use client"

import React, { useMemo, useState } from "react";

// VIN AUDIT — High-Conversion Landing Page
// Tech: React + TailwindCSS (no external deps). Designed mobile-first.
// Notes:
// - Colors: #003366 (navy), #0099FF (accent), #FFFFFF (bg), #F2F4F8 (gray)
// - Typography: Inter/Roboto (use system font stack fallback)
// - Icons: inline SVG for reliability in a single file
// - SEO: basic JSON-LD & meta tags container
// - Accessibility: labels, aria-, focus states, sufficient contrast

export default function VinAuditLanding() {
  const [vin, setVin] = useState("");
  const [reportType, setReportType] = useState("carfax");
  const [showSample, setShowSample] = useState(false);
  const [faqOpen, setFaqOpen] = useState<string | null>(null);

  const vinValid = useMemo(() => {
    const v = vin.trim().toUpperCase();
    // VIN: 17 chars, exclude I,O,Q
    return /^[A-HJ-NPR-Z0-9]{17}$/.test(v);
  }, [vin]);

  const handleCheck = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!vinValid) return;
    // In production, route to checkout or results. Here we just mock.
    alert(`Checking ${vin.toUpperCase()} with ${reportType === 'carfax' ? 'Carfax' : 'AutoCheck'}...`);
  };

  const Feature = ({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) => (
    <div className="flex items-start gap-3">
      <div className="shrink-0">{icon}</div>
      <div>
        <div className="font-semibold text-slate-800">{title}</div>
        <div className="text-slate-600 text-sm">{sub}</div>
      </div>
    </div>
  );

  const Step = ({ n, title, sub }: { n: number; title: string; sub: string }) => (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-[#003366] text-white flex items-center justify-center font-bold shadow">{n}</div>
      <div>
        <div className="font-semibold text-slate-900">{title}</div>
        <div className="text-slate-600 text-sm">{sub}</div>
      </div>
    </div>
  );

  const CheckIcon = (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#003366]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );

  const LockIcon = (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#003366]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );

  const ZapIcon = (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#003366]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  );

  const ShieldIcon = (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#003366]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );

  const CarIcon = (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#003366]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 13l2-5a3 3 0 012.8-2h8.4a3 3 0 012.8 2l2 5" />
      <path d="M5 16h14" />
      <circle cx="7.5" cy="18.5" r="1.5" />
      <circle cx="16.5" cy="18.5" r="1.5" />
    </svg>
  );

  const DocIcon = (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#003366]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  );

  const ChatIcon = (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a4 4 0 01-4 4H8l-5 3V6a4 4 0 014-4h10a4 4 0 014 4z" />
    </svg>
  );

  const nav = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#compare", label: "Compare Reports" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  const faqs = [
    {
      id: "same",
      q: "Is this the same as the official Carfax/AutoCheck?",
      a: "Yes. We source reports directly from the official providers. You'll receive the same authoritative data — odometer readings, title checks, accidents, recalls, and more.",
    },
    {
      id: "speed",
      q: "How long does it take?",
      a: "Instant delivery. Most reports are ready in seconds after payment, available for download and sent to your email.",
    },
    {
      id: "coverage",
      q: "Do you support USA and Canada?",
      a: "Yes. VIN AUDIT supports vehicle history lookups for the United States and Canada, subject to data availability for the specific VIN.",
    },
    {
      id: "security",
      q: "Are payments secure?",
      a: "Absolutely. We use industry-standard encryption and PCI-compliant processors to protect your information.",
    },
    {
      id: "refunds",
      q: "What if my VIN is invalid or no data is found?",
      a: "Our system validates VINs before checkout. If a VIN is not found, you will not be charged. If there's an issue, contact support and we'll help right away.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      {/* SEO & JSON-LD */}
      <SEO />

      {/* Header */}
      <header id="home" className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="#home" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#003366] text-white flex items-center justify-center font-bold">V</div>
              <span className="text-lg font-bold tracking-tight text-[#003366]">VIN AUDIT</span>
            </a>
            <nav className="hidden md:flex items-center gap-6">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className="text-slate-700 hover:text-[#003366] transition">{n.label}</a>
              ))}
              <a href="#checkout" className="inline-flex items-center gap-2 rounded-xl bg-[#0099FF] px-4 py-2 font-semibold text-white shadow hover:shadow-md transition">
                Buy Report
              </a>
            </nav>
            <button className="md:hidden inline-flex items-center justify-center p-2 rounded-lg border border-slate-200" onClick={() => document.getElementById("mobile-menu")?.classList.toggle("hidden")} aria-label="Open Menu">
              <span className="sr-only">Open Menu</span>
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
            </button>
          </div>
        </div>
        <div id="mobile-menu" className="md:hidden hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-3 space-y-2">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="block py-2">{n.label}</a>
            ))}
            <a href="#checkout" className="inline-flex items-center gap-2 rounded-lg bg-[#0099FF] px-4 py-2 font-semibold text-white shadow">Buy Report</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#F2F4F8] to-white" />
          <div className="absolute inset-x-0 top-0 h-72 bg-[url('https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-[#003366]">Get Your Carfax or AutoCheck Report Instantly</h1>
              <p className="mt-3 text-slate-700 text-lg">Check any VIN number and get full vehicle history in seconds.</p>

              {/* VIN form */}
              <form onSubmit={handleCheck} className="mt-6" id="checkout">
                <label htmlFor="vin" className="block text-sm font-medium text-slate-700">Enter 17‑character VIN</label>
                <div className="mt-2 flex flex-col sm:flex-row gap-3">
                  <input
                    id="vin"
                    value={vin}
                    onChange={(e) => setVin(e.target.value.toUpperCase())}
                    placeholder="e.g. 1HGCM82633A004352"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 shadow-sm focus:outline-none focus:ring-4 focus:ring-[#0099FF]/20"
                    inputMode="text"
                  />
                  <div className="flex items-center gap-2 sm:w-auto">
                    <select
                      className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm"
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                      aria-label="Choose report type"
                    >
                      <option value="carfax">Carfax</option>
                      <option value="autocheck">AutoCheck</option>
                    </select>
                    <button
                      type="submit"
                      className={`inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-white shadow transition ${vinValid ? 'bg-[#0099FF] hover:shadow-md' : 'bg-slate-400 cursor-not-allowed'}`}
                      disabled={!vinValid}
                    >
                      Check Vehicle Now
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-500">We validate VINs before checkout. No charge if a report isn't available.</p>
              </form>

              {/* Trust inline */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Feature icon={CheckIcon} title="Trusted by thousands" sub="Car buyers & dealers" />
                <Feature icon={LockIcon} title="Secure payments" sub="PCI-compliant" />
                <Feature icon={ZapIcon} title="Instant delivery" sub="Ready in seconds" />
                <Feature icon={ShieldIcon} title="Official sources" sub="Carfax & AutoCheck" />
              </div>

            </div>
            <div className="relative">
              <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur shadow-xl p-6">
                <div className="flex items-center gap-3">
                  {CarIcon}
                  <div>
                    <div className="font-semibold text-slate-900">VIN Decoder Preview</div>
                    <div className="text-sm text-slate-600">Basic make/model/year from VIN (demo)</div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <Spec label="Make" value={vinValid ? mockDecode(vin).make : "—"} />
                  <Spec label="Model" value={vinValid ? mockDecode(vin).model : "—"} />
                  <Spec label="Year" value={vinValid ? mockDecode(vin).year : "—"} />
                  <Spec label="Assembly" value={vinValid ? mockDecode(vin).country : "—"} />
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <button onClick={() => setShowSample(true)} className="rounded-xl border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50">View Sample Report</button>
                  <a href="#compare" className="text-sm text-[#003366] underline underline-offset-4">Compare Carfax vs AutoCheck</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="compare" className="py-14 bg-[#F2F4F8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#003366]">Carfax vs AutoCheck</h2>
            <p className="mt-2 text-slate-600">Choose the report that fits your needs. Both pull from official data sources.</p>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <ComparisonCard
              name="Carfax"
              price="$39.99"
              bullets={["Deep accident history", "Service & maintenance records", "Title & odometer checks", "Open recalls"]}
            />
            <ComparisonCard
              name="AutoCheck"
              price="$29.99"
              bullets={["Auction & score insights", "Multiple owner timeline", "Title & odometer checks", "Theft & salvage data"]}
            />
          </div>

          {/* Pricing bundles */}
          <div className="mt-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div>
                  <div className="font-semibold text-slate-900">Bundle & Save</div>
                  <div className="text-sm text-slate-600">For dealers and frequent buyers.</div>
                </div>
                <div className="md:col-span-2 grid sm:grid-cols-3 gap-3">
                  <Bundle label="2 Reports" price="$69.00" note="Mix & match"/>
                  <Bundle label="5 Reports" price="$159.00" note="Best value"/>
                  <Bundle label="10 Reports" price="$299.00" note="For dealers"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges section */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <TrustBadge icon={CheckIcon} title="Trusted by thousands" sub="Verified customer reviews" />
            <TrustBadge icon={ShieldIcon} title="Secure Payments" sub="SSL & PCI-DSS" />
            <TrustBadge icon={ZapIcon} title="Instant Delivery" sub="Download immediately" />
            <TrustBadge icon={DocIcon} title="Official Sources" sub="Carfax & AutoCheck" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 bg-[#F2F4F8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#003366] text-center">How It Works</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-8">
            <Step n={1} title="Enter VIN" sub="Paste or type the 17‑character VIN." />
            <Step n={2} title="Choose Report" sub="Pick Carfax or AutoCheck—or bundle." />
            <Step n={3} title="Download Instantly" sub="Get the PDF report within seconds." />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#003366] text-center">What Customers Say</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <Testimonial name="Alicia R." role="First‑time buyer" text="Quick and easy. I got the Carfax in seconds and avoided a car with an accident record."/>
            <Testimonial name="Mike D." role="Used car dealer" text="The bundle pricing saves us money every week. Instant AutoCheck reports are clutch."/>
            <Testimonial name="Samir P." role="Private seller" text="The report built trust with my buyer and helped me close the deal fast."/>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14 bg-[#F2F4F8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#003366] text-center">FAQ</h2>
          <div className="mt-8 grid lg:grid-cols-2 gap-6">
            {faqs.map((f) => (
              <div key={f.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                <button
                  className="w-full text-left flex items-center justify-between gap-4"
                  onClick={() => setFaqOpen(faqOpen === f.id ? null : f.id)}
                >
                  <span className="font-semibold text-slate-900">{f.q}</span>
                  <svg className={`w-5 h-5 transition-transform ${faqOpen === f.id ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                {faqOpen === f.id && (
                  <p className="mt-3 text-slate-600 text-sm">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Footer */}
      <footer id="contact" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#003366] text-white flex items-center justify-center font-bold">V</div>
                <span className="text-lg font-bold tracking-tight text-[#003366]">VIN AUDIT</span>
              </div>
              <p className="mt-3 text-sm text-slate-600">Authoritative vehicle history reports for the USA & Canada. Official Carfax and AutoCheck sources.</p>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Company</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a href="#about" className="hover:text-[#003366]">About</a></li>
                <li><a href="#compare" className="hover:text-[#003366]">Compare Reports</a></li>
                <li><a href="#faq" className="hover:text-[#003366]">FAQ</a></li>
                <li><a href="#contact" className="hover:text-[#003366]">Contact</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Support</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#003366]">Help Center</a></li>
                <li><a href="#" className="hover:text-[#003366]">Refund Policy</a></li>
                <li><a href="#" className="hover:text-[#003366]">Terms & Privacy</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Get in touch</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>Email: <a href="mailto:support@vinaudit.example" className="underline">support@vinaudit.example</a></li>
                <li>Social: <a href="#" className="underline">Twitter</a> · <a href="#" className="underline">Facebook</a></li>
              </ul>
              <p className="mt-4 text-xs text-slate-500">Disclaimer: VIN AUDIT is an independent reseller of official vehicle history reports. Carfax and AutoCheck are trademarks of their respective owners.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating chat / WhatsApp button */}
      <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-4 py-3 shadow-lg hover:shadow-xl">
        {ChatIcon}
        <span className="text-sm font-semibold">Chat</span>
      </a>

      {/* Sample Report Modal */}
      {showSample && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3">
              <div className="font-semibold">Sample Report Preview</div>
              <button onClick={() => setShowSample(false)} className="p-2 rounded-lg hover:bg-slate-100" aria-label="Close">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="p-5">
              {/* PDF-style frame */}
              <div className="aspect-[3/4] w-full overflow-hidden rounded-lg border border-slate-200 bg-[#F9FAFB]">
                <div className="p-6 text-sm text-slate-700">
                  <div className="text-center font-bold text-slate-900">{reportType === 'carfax' ? 'Carfax' : 'AutoCheck'} Vehicle History Report (Sample)</div>
                  <div className="mt-2 text-center text-xs text-slate-500">For illustration only</div>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <Spec label="VIN" value={vinValid ? vin.toUpperCase() : '1HGCM82633A004352'} />
                    <Spec label="Year/Make/Model" value="2019 Honda Accord" />
                    <Spec label="Title" value="Clean" />
                    <Spec label="Odometer" value="54,231 mi" />
                    <Spec label="Accidents" value="No accidents reported" />
                    <Spec label="Owners" value="2" />
                  </div>
                  <div className="mt-6 text-xs text-slate-600">
                    This sample summarizes typical sections: accident & damage history, title checks (salvage, rebuilt, lemon, flood), mileage records, service & maintenance, open recalls, and ownership timeline.
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-end gap-3">
                <button onClick={() => setShowSample(false)} className="rounded-xl border border-slate-300 px-4 py-2 text-sm">Close</button>
                <button onClick={handleCheck} disabled={!vinValid} className={`rounded-xl px-4 py-2 text-sm font-semibold text-white ${vinValid ? 'bg-[#0099FF]' : 'bg-slate-400 cursor-not-allowed'}`}>Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SEO() {
  return (
    <>
      {/* In a real app, put these in <head>. Included inline for the preview. */}
      <div className="sr-only" aria-hidden>
        <meta name="description" content="Buy instant Carfax or AutoCheck vehicle history reports for USA & Canada. Enter a VIN and get official data in seconds." />
        <meta name="keywords" content="Carfax, AutoCheck, VIN, vehicle history report, USA, Canada" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'VIN AUDIT',
          url: 'https://vinaudit.example',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://vinaudit.example/?vin={vin}',
            'query-input': 'required name=vin'
          }
        })}} />
      </div>
    </>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="font-medium text-slate-900">{value}</div>
    </div>
  );
}

function ComparisonCard({ name, price, bullets }: { name: string; price: string; bullets: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold text-[#003366]">{name}</div>
        <div className="text-lg font-semibold text-[#0099FF]">{price}</div>
      </div>
      <ul className="mt-4 space-y-2 text-sm">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0099FF]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <a href="#checkout" className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#0099FF] px-4 py-2 font-semibold text-white shadow hover:shadow-md">Choose {name}</a>
      <div className="mt-3 text-xs text-slate-500">Includes PDF download and email copy.</div>
    </div>
  );
}

function Bundle({ label, price, note }: { label: string; price: string; note?: string }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="font-semibold text-slate-900">{label}</div>
      <div className="text-[#0099FF] font-bold">{price}</div>
      {note && <div className="text-xs text-slate-500">{note}</div>}
      <a href="#checkout" className="mt-3 inline-flex items-center justify-center rounded-lg bg-[#003366] px-3 py-2 text-sm font-semibold text-white">Buy Bundle</a>
    </div>
  );
}

function TrustBadge({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 flex items-start gap-3">
      <div className="shrink-0">{icon}</div>
      <div>
        <div className="font-semibold text-slate-900">{title}</div>
        <div className="text-sm text-slate-600">{sub}</div>
      </div>
    </div>
  );
}

function Testimonial({ name, role, text }: { name: string; role: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-slate-700">"{text}"</div>
      <div className="mt-4 text-sm font-semibold text-slate-900">{name}</div>
      <div className="text-xs text-slate-500">{role}</div>
    </div>
  );
}

// Simple mock VIN decoder: returns consistent pseudo-data from VIN
function mockDecode(vin: string) {
  const makes = ["Honda", "Toyota", "Ford", "Chevrolet", "Nissan", "BMW", "Mercedes", "Hyundai"];
  const models = ["Accord", "Camry", "F-150", "Silverado", "Altima", "3 Series", "C-Class", "Elantra"];
  const countries = ["USA", "Canada", "Japan", "Mexico", "Germany", "South Korea"];
  const seed = vin.trim().toUpperCase().split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const pick = (arr: string[]) => arr[seed % arr.length];
  return {
    make: pick(makes),
    model: pick(models),
    year: String(2005 + (seed % 20)),
    country: pick(countries),
  };
}