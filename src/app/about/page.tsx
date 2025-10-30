"use client"

import React from "react";

export default function AboutPage() {
  const nav = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      {/* Header - Exact same as main page */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#003366] text-white flex items-center justify-center font-bold">V</div>
              <span className="text-lg font-bold tracking-tight text-[#003366]">VIN AUDIT</span>
            </a>
            <nav className="hidden md:flex items-center gap-6">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className={`transition ${n.href === '/about' ? 'text-[#003366] font-semibold' : 'text-slate-700 hover:text-[#003366]'}`}>{n.label}</a>
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

      {/* Hero - Same style as main page */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#003366] leading-tight mb-6">
              About
              <span className="block text-[#0099FF]">VIN AUDIT</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
              Your trusted partner for comprehensive vehicle history reports and transparent automotive information.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Our Mission */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#003366] mb-6 text-center">Our Mission</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              At VIN AUDIT, we believe every car buyer deserves complete transparency about their potential purchase. 
              Our mission is to provide comprehensive, accurate, and easy-to-understand vehicle history reports that 
              empower consumers to make informed decisions.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              We partner with leading data providers like Carfax and AutoCheck to ensure you have access to the most 
              complete vehicle history information available, helping you avoid costly surprises and buy with confidence.
            </p>
          </div>
        </section>

        {/* What We Offer */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#003366] mb-12 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#003366] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Carfax Reports</h3>
              <p className="text-slate-600">
                Access to the most comprehensive vehicle history reports in the industry, featuring detailed 
                accident history, service records, and ownership information.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#003366] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">AutoCheck Reports</h3>
              <p className="text-slate-600">
                Alternative comprehensive reports with unique scoring systems and extensive database coverage, 
                providing additional insights into your vehicle's history.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#003366] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Delivery</h3>
              <p className="text-slate-600">
                Get your vehicle history report within seconds of purchase. No waiting, no delays - 
                just immediate access to the information you need.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#003366] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Secure & Private</h3>
              <p className="text-slate-600">
                Your personal information and vehicle searches are protected with bank-level encryption. 
                We never store or share your data with third parties.
              </p>
            </div>
          </div>
        </section>

        {/* Trust Section - Same styling as main page */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#003366] mb-12 text-center">Why Choose VIN AUDIT?</h2>
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-[#0099FF] mb-2">500,000+</div>
                <div className="text-slate-600 font-medium">Reports Delivered</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#0099FF] mb-2">99.9%</div>
                <div className="text-slate-600 font-medium">Customer Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#0099FF] mb-2">24/7</div>
                <div className="text-slate-600 font-medium">Support Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#003366] mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0099FF] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Enter VIN</h3>
              <p className="text-slate-600">
                Simply enter the 17-character VIN number of the vehicle you want to research.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0099FF] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Choose Report</h3>
              <p className="text-slate-600">
                Select between Carfax or AutoCheck based on availability and your preferences.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0099FF] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Get Report</h3>
              <p className="text-slate-600">
                Receive your comprehensive vehicle history report instantly via email.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center rounded-2xl bg-[#003366] p-8 text-white mb-16">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Your Vehicle Report?</h2>
          <p className="text-slate-200 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust VIN AUDIT for their vehicle history needs.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0099FF] px-6 py-3 font-semibold text-white shadow hover:shadow-md transition"
          >
            Get Started Now
          </a>
        </section>
      </div>

      {/* Footer - Exact same as main page */}
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