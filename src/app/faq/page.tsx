"use client"

import React from "react";

export default function FAQPage() {
  const nav = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  const faqs = [
    {
      q: "What is a VIN?",
      a: "A Vehicle Identification Number (VIN) is a unique 17-character code assigned to every vehicle. It contains information about the car's manufacturer, model year, engine type, and production details."
    },
    {
      q: "How quickly will I receive my vehicle history report?",
      a: "Most reports are delivered instantly after payment confirmation. In rare cases where additional data processing is required, it may take up to 24 hours to receive your complete report."
    },
    {
      q: "What's the difference between Carfax and AutoCheck reports?",
      a: "Both Carfax and AutoCheck are reputable vehicle history providers. Carfax typically has more detailed service records and is widely recognized by consumers. AutoCheck, owned by Experian, often provides more auction data and has a scoring system. We offer both to give you comprehensive coverage."
    },
    {
      q: "What information is included in a vehicle history report?",
      a: "Our reports include accident history, title information, service records, previous owners, mileage verification, lemon/flood damage records, recall information, and theft records. The exact details may vary depending on the data available for your specific vehicle."
    },
    {
      q: "Can I get a refund if I'm not satisfied with my report?",
      a: "Yes, we offer a satisfaction guarantee. If you're not satisfied with your vehicle history report, please contact our support team within 30 days of purchase. Review our complete refund policy for specific terms and conditions."
    },
    {
      q: "Are your reports official and legitimate?",
      a: "Absolutely. We are authorized resellers of official Carfax and AutoCheck reports. All reports come directly from these trusted providers and contain the same information you would receive if purchasing directly from them."
    },
    {
      q: "What if the VIN I entered doesn't return any results?",
      a: "If a VIN doesn't return results, it could mean the vehicle is too new, too old, or the VIN was entered incorrectly. Our system validates VINs before checkout, so you won't be charged for invalid VINs. Contact our support team if you need assistance."
    },
    {
      q: "Do you offer discounts for multiple reports?",
      a: "Yes, we offer volume discounts for automotive dealers, car lots, and businesses that need multiple reports. Contact our sales team to discuss pricing for bulk purchases and ongoing business relationships."
    },
    {
      q: "Is my payment information secure?",
      a: "Yes, we use industry-standard SSL encryption and work with trusted payment processors to ensure your financial information is completely secure. We never store credit card information on our servers."
    },
    {
      q: "Can I access my report again after purchase?",
      a: "Yes, you'll receive a direct link to your report via email that remains active for 60 days after purchase. We recommend saving or printing your report for future reference."
    },
    {
      q: "What if I find an error in my vehicle history report?",
      a: "If you believe there's an error in your report, please contact us immediately. We'll work with the data provider (Carfax or AutoCheck) to investigate and correct any verified inaccuracies in the vehicle's history."
    },
    {
      q: "Do you cover vehicles outside the United States?",
      a: "Our current vehicle history reports primarily cover vehicles in the United States and Canada. For vehicles originally manufactured or primarily used outside North America, data availability may be limited."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      {/* Header - Exact same as other pages */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#003366] text-white flex items-center justify-center font-bold">V</div>
              <span className="text-lg font-bold tracking-tight text-[#003366]">VIN AUDIT</span>
            </a>
            <nav className="hidden md:flex items-center gap-6">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className={`transition ${n.href === '/faq' ? 'text-[#003366] font-semibold' : 'text-slate-700 hover:text-[#003366]'}`}>{n.label}</a>
              ))}
              <a href="/#checkout" className="inline-flex items-center gap-2 rounded-xl bg-[#0099FF] px-4 py-2 font-semibold text-white shadow hover:shadow-md transition">
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
            <a href="/#checkout" className="inline-flex items-center gap-2 rounded-lg bg-[#0099FF] px-4 py-2 font-semibold text-white shadow">Buy Report</a>
          </div>
        </div>
      </header>

      {/* Hero - Same style as other pages */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
        </div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-[#003366] sm:text-5xl md:text-6xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-6 text-lg leading-7 text-slate-600 max-w-2xl mx-auto">
              Get answers to common questions about vehicle history reports, our services, 
              and how to get the most accurate information about any vehicle.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                <h2 className="text-xl font-bold text-[#003366] mb-4">
                  {faq.q}
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#003366] mb-4">Still Have Questions?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Our customer support team is ready to help you with any questions about vehicle history reports or our services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#003366] px-6 py-3 font-semibold text-white shadow hover:shadow-md transition"
            >
              Contact Support
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0099FF] px-6 py-3 font-semibold text-white shadow hover:shadow-md transition"
            >
              Get Your Report Now
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section - Same style as other pages */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#003366] mb-4">Ready to Get Your Vehicle Report?</h2>
          <p className="text-lg text-slate-600 mb-8">Start with a VIN check and get comprehensive vehicle history information in minutes.</p>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0099FF] px-6 py-3 font-semibold text-white shadow hover:shadow-md transition"
          >
            Get Started Now
          </a>
        </div>
      </section>

      {/* Footer - Exact same as other pages */}
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
                <li><a href="/about" className="hover:text-[#003366]">About</a></li>
                <li><a href="/faq" className="hover:text-[#003366]">FAQ</a></li>
                <li><a href="/contact" className="hover:text-[#003366]">Contact</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Support</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#003366]">Help Center</a></li>
                <li><a href="/refund-policy" className="hover:text-[#003366]">Refund Policy</a></li>
                <li><a href="/terms-privacy" className="hover:text-[#003366]">Terms & Privacy</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Get in touch</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>Email: <a href="mailto:support@vinaudit.co" className="underline">support@vinaudit.co</a></li>
              </ul>
              <p className="mt-4 text-xs text-slate-500">Disclaimer: VIN AUDIT is an independent reseller of official vehicle history reports. Carfax and AutoCheck are trademarks of their respective owners.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating chat / WhatsApp button */}
      <a href="https://wa.me/40750255771" target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-4 py-3 shadow-lg hover:shadow-xl">
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a4 4 0 01-4 4H8l-5 3V6a4 4 0 014-4h10a4 4 0 014 4z" />
        </svg>
        <span className="text-sm font-semibold">Chat</span>
      </a>
    </div>
  );
}