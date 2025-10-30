"use client"

import React from "react";

export default function TermsPrivacyPage() {
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
              Terms & 
              <span className="block text-[#0099FF]">Privacy</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
              Our commitment to protecting your privacy and ensuring transparent service terms.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Last Updated */}
        <section className="mb-12">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-6 text-center">
            <p className="text-slate-600">
              <strong>Last Updated:</strong> October 30, 2025
            </p>
          </div>
        </section>

        {/* Terms of Service */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#003366] mb-8">Terms of Service</h2>
          
          <div className="space-y-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                By accessing and using VIN AUDIT services, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
              <p className="text-slate-700 leading-relaxed">
                These terms may be updated from time to time. Your continued use of the service constitutes acceptance of any changes.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">2. Service Description</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                VIN AUDIT provides vehicle history report services sourced from third-party data providers including Carfax and AutoCheck. 
                We act as an independent reseller and do not create or verify the data contained in these reports.
              </p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#0099FF] rounded-full mt-2 flex-shrink-0"></div>
                  Reports are provided "as-is" from official data sources
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#0099FF] rounded-full mt-2 flex-shrink-0"></div>
                  We do not guarantee completeness or accuracy of third-party data
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#0099FF] rounded-full mt-2 flex-shrink-0"></div>
                  Service availability may vary based on data provider availability
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">3. User Responsibilities</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                By using our service, you agree to:
              </p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#0099FF] rounded-full mt-2 flex-shrink-0"></div>
                  Provide accurate VIN numbers for report generation
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#0099FF] rounded-full mt-2 flex-shrink-0"></div>
                  Use reports for legitimate purposes only
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#0099FF] rounded-full mt-2 flex-shrink-0"></div>
                  Not redistribute or resell obtained reports
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#0099FF] rounded-full mt-2 flex-shrink-0"></div>
                  Comply with all applicable laws and regulations
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">4. Payment and Billing</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Payment is required before report delivery. We accept major credit cards, debit cards, and PayPal. 
                All transactions are processed through secure, encrypted payment systems.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Prices are subject to change without notice. Refunds are processed according to our 
                <a href="/refund-policy" className="text-[#0099FF] underline hover:text-[#003366]"> Refund Policy</a>.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">5. Limitation of Liability</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                VIN AUDIT shall not be liable for any direct, indirect, incidental, special, or consequential damages 
                resulting from the use or inability to use our service or any information contained in the reports.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Our maximum liability is limited to the amount paid for the specific report in question.
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Policy */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#003366] mb-8">Privacy Policy</h2>
          
          <div className="space-y-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Information We Collect</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                We collect information necessary to provide our services and improve user experience:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Personal Information</h4>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#0099FF] rounded-full mt-2 flex-shrink-0"></div>
                      Email address
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#0099FF] rounded-full mt-2 flex-shrink-0"></div>
                      Payment information
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#0099FF] rounded-full mt-2 flex-shrink-0"></div>
                      Billing address
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Service Data</h4>
                  <ul className="space-y-2 text-slate-700 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#0099FF] rounded-full mt-2 flex-shrink-0"></div>
                      VIN numbers searched
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#0099FF] rounded-full mt-2 flex-shrink-0"></div>
                      Transaction history
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#0099FF] rounded-full mt-2 flex-shrink-0"></div>
                      Website usage data
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">How We Use Your Information</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Your information is used exclusively for providing our services:
              </p>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Service Delivery</h4>
                    <p className="text-sm text-slate-600">Processing payments, generating reports, and sending delivery notifications</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Customer Support</h4>
                    <p className="text-sm text-slate-600">Responding to inquiries, resolving issues, and providing assistance</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Service Improvement</h4>
                    <p className="text-sm text-slate-600">Analyzing usage patterns to enhance user experience and service quality</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Data Protection & Security</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Encryption
                  </h4>
                  <p className="text-sm text-slate-600">
                    All data transmission is encrypted using SSL/TLS protocols. Payment information is processed through PCI-compliant systems.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Access Control
                  </h4>
                  <p className="text-sm text-slate-600">
                    Strict access controls ensure only authorized personnel can access personal data on a need-to-know basis.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Data Sharing & Third Parties</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except:
              </p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#0099FF] rounded-full mt-2 flex-shrink-0"></div>
                  Service providers necessary for report generation (Carfax, AutoCheck)
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#0099FF] rounded-full mt-2 flex-shrink-0"></div>
                  Payment processors for transaction handling
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#0099FF] rounded-full mt-2 flex-shrink-0"></div>
                  Legal requirements or law enforcement requests
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#0099FF] rounded-full mt-2 flex-shrink-0"></div>
                  Business transfers (with notice and continued protection)
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Your Rights & Choices</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#0099FF] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Access your personal data
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#0099FF] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Correct inaccurate information
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#0099FF] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Request data deletion
                  </li>
                </ul>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#0099FF] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Opt-out of communications
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#0099FF] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Request data portability
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#0099FF] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    File privacy complaints
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-12">
          <div className="rounded-2xl bg-[#003366] p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Questions About Our Terms or Privacy?</h2>
            <p className="text-slate-200 mb-6 max-w-2xl mx-auto">
              If you have any questions about these terms or our privacy practices, please don't hesitate to contact us.
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