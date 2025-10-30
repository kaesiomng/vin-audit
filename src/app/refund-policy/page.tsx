"use client"

import React from "react";

export default function RefundPolicyPage() {
  const nav = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/#compare", label: "Compare Reports" },
    { href: "/#faq", label: "FAQ" },
    { href: "/#contact", label: "Contact" },
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
                <a key={n.href} href={n.href} className="text-slate-700 hover:text-[#003366] transition">{n.label}</a>
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
              Refund
              <span className="block text-[#0099FF]">Policy</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
              We stand behind our service. Learn about our refund policy and satisfaction guarantee.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Policy Overview */}
        <section className="mb-12">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#003366] mb-4">Our Commitment to You</h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              At VIN AUDIT, we are committed to providing accurate and comprehensive vehicle history reports. 
              If you're not completely satisfied with your purchase, we offer a clear and fair refund policy 
              to ensure your peace of mind.
            </p>
          </div>
        </section>

        {/* Refund Conditions */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#003366] mb-8">Refund Eligibility</h2>
          
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Report Not Available</h3>
                  <p className="text-slate-600">
                    If we cannot provide a report for your VIN number due to data unavailability, 
                    you are eligible for a full refund within 30 days of purchase.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Technical Issues</h3>
                  <p className="text-slate-600">
                    If you experience technical difficulties accessing your report due to our system errors, 
                    we will provide a full refund or replacement report at no additional cost.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Duplicate Purchase</h3>
                  <p className="text-slate-600">
                    If you accidentally purchase the same report multiple times, we will refund the 
                    duplicate charges upon verification within 30 days.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Satisfaction Guarantee</h3>
                  <p className="text-slate-600">
                    If you're not satisfied with the quality or completeness of your report, 
                    contact us within 7 days for a review and potential refund.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Non-Refundable Conditions */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#003366] mb-8">Non-Refundable Situations</h2>
          
          <div className="space-y-4">
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-800 mb-2">Successfully Delivered Reports</h3>
                  <p className="text-red-700">
                    Reports that have been successfully generated, delivered, and accessed are generally 
                    non-refundable unless they fall under our satisfaction guarantee conditions.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-800 mb-2">Change of Mind</h3>
                  <p className="text-red-700">
                    Refunds are not available for change of mind after a report has been delivered, 
                    unless the report contains significant inaccuracies or missing data.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-800 mb-2">Late Requests</h3>
                  <p className="text-red-700">
                    Refund requests made after 30 days from the original purchase date cannot be processed, 
                    except in exceptional circumstances at our discretion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Request */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#003366] mb-8">How to Request a Refund</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0099FF] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Contact Support</h3>
              <p className="text-slate-600">
                Email us at support@vinaudit.co with your order details and reason for refund request.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0099FF] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Provide Information</h3>
              <p className="text-slate-600">
                Include your transaction ID, VIN number, and detailed explanation of the issue.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0099FF] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Processing</h3>
              <p className="text-slate-600">
                We'll review your request within 2-3 business days and process eligible refunds within 5-7 days.
              </p>
            </div>
          </div>
        </section>

        {/* Processing Times */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#003366] mb-8">Processing Times</h2>
          
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Review Process</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#0099FF] rounded-full"></div>
                    Initial review: 1-2 business days
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#0099FF] rounded-full"></div>
                    Decision notification: 2-3 business days
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#0099FF] rounded-full"></div>
                    Complex cases: Up to 7 business days
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Refund Processing</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#0099FF] rounded-full"></div>
                    Credit/Debit cards: 3-5 business days
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#0099FF] rounded-full"></div>
                    PayPal: 1-2 business days
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#0099FF] rounded-full"></div>
                    Bank transfers: 5-10 business days
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-12">
          <div className="rounded-2xl bg-[#003366] p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Need Help with Your Refund?</h2>
            <p className="text-slate-200 mb-6 max-w-2xl mx-auto">
              Our customer support team is here to help. Contact us if you have any questions about our refund policy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@vinaudit.co"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0099FF] px-6 py-3 font-semibold text-white shadow hover:shadow-md transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Support
              </a>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white hover:text-[#003366] transition"
              >
                Contact Form
              </a>
            </div>
          </div>
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