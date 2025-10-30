"use client"

import React, { useMemo, useState, useEffect } from "react";

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
  const [isChecking, setIsChecking] = useState(false);
  const [reportAvailability, setReportAvailability] = useState<{
    carfax: boolean | null;
    autocheck: boolean | null;
  }>({ carfax: null, autocheck: null });
  const [vehicleInfo, setVehicleInfo] = useState<any>(null);
  const [isLoadingVehicleInfo, setIsLoadingVehicleInfo] = useState(false);
  const [recentReports, setRecentReports] = useState<any[]>([]);
  const [isLoadingReports, setIsLoadingReports] = useState(false);

  // Fetch recent reports from API
  useEffect(() => {
    const fetchRecentReports = async () => {
      setIsLoadingReports(true);
      try {
        const response = await fetch('/api/recent-reports');
        const data = await response.json();
        
        if (data.success) {
          setRecentReports(data.data);
        } else {
          console.error('Failed to fetch recent reports:', data.error);
          // Fallback to empty array if API fails
          setRecentReports([]);
        }
      } catch (error) {
        console.error('Error fetching recent reports:', error);
        // Fallback to empty array if API fails
        setRecentReports([]);
      } finally {
        setIsLoadingReports(false);
      }
    };

    fetchRecentReports();
  }, []);

  const vinValid = useMemo(() => {
    const v = vin.trim().toUpperCase();
    // VIN: 17 chars, exclude I,O,Q
    return /^[A-HJ-NPR-Z0-9]{17}$/.test(v);
  }, [vin]);

  // Fetch vehicle information when VIN is valid
  const fetchVehicleInfo = async (vincode: string) => {
    if (!vinValid) {
      console.error('Invalid VIN');
      return;
    }
    
    setIsLoadingVehicleInfo(true);
    setVehicleInfo(null);

    try {
      const response = await fetch(`/api/vehicle/info?vincode=${vincode}`);
      const data = await response.json();
      
      console.log('Vehicle Info response status:', response.status);
      console.log('Vehicle Info response:', data);
      
      if (response.ok) {
        setVehicleInfo(data);
      } else {
        console.error('Vehicle info fetch failed:', data);
      }
    } catch (error) {
      console.error('Error fetching vehicle info:', error);
    } finally {
      setIsLoadingVehicleInfo(false);
    }
  };

  // Check report availability when VIN is valid
  const checkReportAvailability = async (vincode: string) => {
    if (!vinValid) {
      console.error('Invalid VIN');
      return;
    }
    
    setIsChecking(true);
    setReportAvailability({ carfax: null, autocheck: null });

    try {
      // Check both Carfax and AutoCheck availability in parallel using internal API routes
      const [carfaxResponse, autocheckResponse] = await Promise.all([
        fetch(`/api/carfax/check?vincode=${vincode}`),
        fetch(`/api/autocheck/check?vincode=${vincode}`)
      ]);

      console.log('Carfax response status:', carfaxResponse.status);
      console.log('AutoCheck response status:', autocheckResponse.status);

      const carfaxData = await carfaxResponse.json();
      const autocheckData = await autocheckResponse.json();

      // Log the responses for debugging
      console.log('Carfax response:', carfaxData);
      console.log('AutoCheck response:', autocheckData);
      
      // Log the exact response structure
      console.log('Carfax response keys:', Object.keys(carfaxData || {}));
      console.log('AutoCheck response keys:', Object.keys(autocheckData || {}));

      // Check for different possible response formats
      // Handle API responses more intelligently based on the actual messages
      const carfaxAvailable = 
        // Standard success cases
        (carfaxResponse.ok && (
          carfaxData.checked === true || 
          carfaxData.available === true || 
          carfaxData.message === "Report found" ||
          carfaxData.success === true ||
          carfaxData.status === "available" ||
          carfaxData.report_available === true
        )) ||
        // Handle "processing" as available (will be ready for purchase)
        (carfaxData.message && carfaxData.message.includes("processing"));
      
      const autocheckAvailable = 
        // Standard success cases
        (autocheckResponse.ok && (
          autocheckData.checked === true || 
          autocheckData.available === true || 
          autocheckData.message === "Report found" ||
          autocheckData.success === true ||
          autocheckData.status === "available" ||
          autocheckData.report_available === true
        )) ||
        // Handle "insufficient funds" as available (report exists but needs payment on our end)
        (autocheckData.message && autocheckData.message.includes("средств"));

      console.log('Carfax available:', carfaxAvailable);
      console.log('AutoCheck available:', autocheckAvailable);
      console.log('Carfax response.ok:', carfaxResponse.ok);
      console.log('AutoCheck response.ok:', autocheckResponse.ok);

      setReportAvailability({
        carfax: carfaxAvailable,
        autocheck: autocheckAvailable
      });
    } catch (error) {
      console.error('Error checking report availability:', error);
      // Set both to false on error
      setReportAvailability({ carfax: false, autocheck: false });
    } finally {
      setIsChecking(false);
    }
  };

  // Debounced VIN checking
  useEffect(() => {
    if (vinValid) {
      const timer = setTimeout(() => {
        const vinCode = vin.toUpperCase();
        checkReportAvailability(vinCode);
        fetchVehicleInfo(vinCode);
      }, 500); // Wait 500ms after user stops typing

      return () => clearTimeout(timer);
    } else {
      setReportAvailability({ carfax: null, autocheck: null });
      setVehicleInfo(null);
    }
  }, [vin, vinValid]);

  // Auto-deselect unavailable options
  useEffect(() => {
    if (reportType === 'carfax' && reportAvailability.carfax === false) {
      setReportType('');
    }
    if (reportType === 'autocheck' && reportAvailability.autocheck === false) {
      setReportType('');
    }
    if (reportType === 'both' && (reportAvailability.carfax === false || reportAvailability.autocheck === false)) {
      setReportType('');
    }
  }, [reportAvailability, reportType]);

  const handleCheck = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!vinValid) return;
    
    const selectedReportAvailable = reportAvailability[reportType as keyof typeof reportAvailability];
    
    if (selectedReportAvailable === false) {
      alert(`${reportType === 'carfax' ? 'Carfax' : 'AutoCheck'} report is not available for this VIN. Please try the other report type.`);
      return;
    }

    if (selectedReportAvailable === null) {
      alert('Please wait while we check report availability...');
      return;
    }

    // Proceed to Stripe checkout
    await handlePayment(reportType);
  };

  const handlePayment = async (selectedReportType: string) => {
    try {
      setIsChecking(true);
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vincode: vin,
          reportType: selectedReportType,
          vehicleInfo: vehicleInfo?.data || null,
        }),
      });

      const { sessionId, url, error } = await response.json();

      if (error) {
        alert(`Payment error: ${error}`);
        return;
      }

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to initiate payment. Please try again.');
    } finally {
      setIsChecking(false);
    }
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
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
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
      a: "Instant email delivery. Most reports are ready in seconds after payment and sent directly to your email address.",
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
    {
      id: "format",
      q: "How will I receive my report?",
      a: "Your vehicle history reports will be sent directly to your email address as PDF files. Check your inbox (and spam folder) within 5 minutes of payment. The report links remain active for 60 days.",
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
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#003366] leading-tight mb-6">
              Get Your Vehicle Report
              <span className="block text-[#0099FF]">Instantly</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
              Professional Carfax and AutoCheck reports delivered in seconds
            </p>

            {/* VIN Form */}
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleCheck} className="space-y-6" id="checkout">
                {/* VIN Input */}
                <div>
                  <input
                    id="vin"
                    value={vin}
                    onChange={(e) => setVin(e.target.value.toUpperCase())}
                    placeholder="Enter 17-character VIN"
                    className={`w-full h-14 rounded-xl border px-4 text-lg font-mono tracking-wide focus:outline-none focus:ring-2 ${
                      vin.length > 0 && !vinValid 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                        : 'border-slate-300 focus:border-[#0099FF] focus:ring-[#0099FF]/20'
                    }`}
                    maxLength={17}
                  />
                </div>

                {/* VIN Validation Feedback */}
                {vin.length > 0 && !vinValid && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-start gap-3 text-left">
                      <div className="w-5 h-5 text-red-500 mt-0.5">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <h4 className="text-sm font-semibold text-red-800 mb-1 text-left">Invalid VIN Number</h4>
                        <p className="text-sm text-red-700 text-left">
                          Please enter a valid 17-character VIN. VINs cannot contain the letters I, O, or Q.
                        </p>
                        <p className="text-xs text-red-600 mt-2 text-left">
                          Current length: {vin.length}/17 characters
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Vehicle Information Display */}
                {vinValid && (vehicleInfo || isLoadingVehicleInfo) && (
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200 p-5">
                    <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#003366] rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      Vehicle Information
                    </h3>
                    
                    {isLoadingVehicleInfo ? (
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Loading vehicle information...
                      </div>
                    ) : vehicleInfo && vehicleInfo.data ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                          {vehicleInfo.data.brand && (
                            <div className="bg-white rounded-lg p-3 border border-slate-100">
                              <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Brand</div>
                              <div className="font-semibold text-slate-900">{vehicleInfo.data.brand}</div>
                            </div>
                          )}
                          {vehicleInfo.data.model && (
                            <div className="bg-white rounded-lg p-3 border border-slate-100">
                              <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Model</div>
                              <div className="font-semibold text-slate-900">{vehicleInfo.data.model}</div>
                            </div>
                          )}
                          {vehicleInfo.data.year && (
                            <div className="bg-white rounded-lg p-3 border border-slate-100">
                              <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Year</div>
                              <div className="font-semibold text-slate-900">{vehicleInfo.data.year}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : vehicleInfo && vehicleInfo.error ? (
                      <div className="text-sm text-red-600">
                        {vehicleInfo.message || 'Unable to fetch vehicle information'}
                      </div>
                    ) : null}
                  </div>
                )}

                {/* Report Type Selection */}
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Choose Your Report Type</h3>
                    <p className="text-slate-600">Select the vehicle history report that best fits your needs</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Carfax Option */}
                    <label className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all hover:shadow-md ${
                      reportType === 'carfax' 
                        ? 'border-[#0099FF] bg-[#0099FF]/5 shadow-md' 
                        : reportAvailability.carfax === false
                        ? 'border-red-200 bg-red-50 cursor-not-allowed opacity-60'
                        : 'border-slate-200 hover:border-[#0099FF]/30 bg-white'
                    }`}>
                      <input
                        type="radio"
                        name="reportType"
                        value="carfax"
                        checked={reportType === 'carfax'}
                        onChange={(e) => setReportType(e.target.value)}
                        disabled={reportAvailability.carfax === false}
                        className="sr-only"
                      />
                      
                      <div className="text-center">
                        {/* Service Icon */}
                        <div className="flex items-center justify-center mb-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                            reportType === 'carfax' ? 'bg-[#0099FF] text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            C
                          </div>
                        </div>
                        
                        <h4 className="text-lg font-bold text-slate-900 mb-2">Carfax</h4>
                        <p className="text-sm text-slate-600 mb-4">Most comprehensive report with detailed service records</p>
                        
                        {/* Availability Status */}
                        {vinValid && (
                          <div className="mb-4">
                            {isChecking ? (
                              <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Checking...
                              </div>
                            ) : reportAvailability.carfax === true ? (
                              <div className="flex items-center justify-center gap-2 text-sm text-green-600 bg-green-50 rounded-lg py-2 px-3">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Available
                              </div>
                            ) : reportAvailability.carfax === false ? (
                              <div className="flex items-center justify-center gap-2 text-sm text-red-600 bg-red-50 rounded-lg py-2 px-3">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                Not Available
                              </div>
                            ) : null}
                          </div>
                        )}
                        
                        <div className="space-y-1 text-center">
                          <div className="text-xl font-bold text-[#0099FF]">$9.99</div>
                          <div className="text-xs text-slate-400 line-through">$44.99</div>
                        </div>
                        
                        {reportType === 'carfax' && reportAvailability.carfax !== false && (
                          <div className="absolute top-4 right-4">
                            <div className="w-6 h-6 rounded-full bg-[#0099FF] flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    </label>

                    {/* AutoCheck Option */}
                    <label className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all hover:shadow-md ${
                      reportType === 'autocheck' 
                        ? 'border-[#0099FF] bg-[#0099FF]/5 shadow-md' 
                        : reportAvailability.autocheck === false
                        ? 'border-red-200 bg-red-50 cursor-not-allowed opacity-60'
                        : 'border-slate-200 hover:border-[#0099FF]/30 bg-white'
                    }`}>
                      <input
                        type="radio"
                        name="reportType"
                        value="autocheck"
                        checked={reportType === 'autocheck'}
                        onChange={(e) => setReportType(e.target.value)}
                        disabled={reportAvailability.autocheck === false}
                        className="sr-only"
                      />
                      
                      <div className="text-center">
                        {/* Service Icon */}
                        <div className="flex items-center justify-center mb-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                            reportType === 'autocheck' ? 'bg-[#0099FF] text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            A
                          </div>
                        </div>
                        
                        <h4 className="text-lg font-semibold text-slate-900 mb-2">AutoCheck</h4>
                        <p className="text-sm text-slate-600 mb-4">Great value option with auction data and scoring</p>
                        
                        {/* Availability Status */}
                        {vinValid && (
                          <div className="mb-4">
                            {isChecking ? (
                              <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Checking...
                              </div>
                            ) : reportAvailability.autocheck === true ? (
                              <div className="flex items-center justify-center gap-2 text-sm text-green-600 bg-green-50 rounded-lg py-2 px-3">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Available
                              </div>
                            ) : reportAvailability.autocheck === false ? (
                              <div className="flex items-center justify-center gap-2 text-sm text-red-600 bg-red-50 rounded-lg py-2 px-3">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                Not Available
                              </div>
                            ) : null}
                          </div>
                        )}
                        
                        <div className="space-y-1 text-center">
                          <div className="text-xl font-bold text-[#0099FF]">$9.99</div>
                          <div className="text-sm text-slate-400 line-through">$29.99</div>
                        </div>
                        
                        {reportType === 'autocheck' && reportAvailability.autocheck !== false && (
                          <div className="absolute top-4 right-4">
                            <div className="w-6 h-6 rounded-full bg-[#0099FF] flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    </label>

                    {/* Both Reports Bundle Option */}
                    <label className={`group relative cursor-pointer rounded-xl border-2 p-6 transition-colors duration-200 hover:shadow-md ${
                      reportType === 'both' 
                        ? 'border-[#003366] bg-blue-50 shadow-md' 
                        : (reportAvailability.carfax === false || reportAvailability.autocheck === false)
                        ? 'border-red-200 bg-red-50 cursor-not-allowed opacity-60'
                        : 'border-slate-200 hover:border-[#003366] bg-white'
                    }`}>
                      <input
                        type="radio"
                        name="reportType"
                        value="both"
                        checked={reportType === 'both'}
                        onChange={(e) => setReportType(e.target.value)}
                        disabled={reportAvailability.carfax === false || reportAvailability.autocheck === false}
                        className="sr-only"
                      />
                      
                      {/* Best Value Badge */}
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <div className="bg-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                          BEST VALUE
                        </div>
                      </div>
                      
                      <div className="text-center">
                        {/* Service Icon */}
                        <div className="flex items-center justify-center mb-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg ${
                            reportType === 'both' ? 'bg-[#003366] text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            C+A
                          </div>
                        </div>
                        
                        <h4 className="text-lg font-semibold text-slate-900 mb-2">Both Reports</h4>
                        <p className="text-slate-600 mb-4 text-sm">Complete coverage from both industry leaders</p>
                        
                        {/* Availability Status */}
                        {vinValid && (
                          <div className="mb-4">
                            {isChecking ? (
                              <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Checking...
                              </div>
                            ) : (reportAvailability.carfax === true && reportAvailability.autocheck === true) ? (
                              <div className="flex items-center justify-center gap-2 text-sm text-green-600 bg-green-50 rounded-lg py-2 px-3">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Both Available
                              </div>
                            ) : (reportAvailability.carfax === false || reportAvailability.autocheck === false) ? (
                              <div className="flex items-center justify-center gap-2 text-sm text-red-600 bg-red-50 rounded-lg py-2 px-3">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                {reportAvailability.carfax === false && reportAvailability.autocheck === false 
                                  ? 'Neither Available' 
                                  : reportAvailability.carfax === false 
                                  ? 'Carfax Not Available'
                                  : 'AutoCheck Not Available'
                                }
                              </div>
                            ) : null}
                          </div>
                        )}
                        
                        <div className="space-y-1 text-center">
                          <div className="text-xl font-bold text-[#003366]">$17.99</div>
                          <div className="text-sm text-slate-400 line-through">$19.98</div>
                        </div>
                        
                        {reportType === 'both' && (reportAvailability.carfax === true && reportAvailability.autocheck === true) && (
                          <div className="absolute top-4 right-4">
                            <div className="w-6 h-6 rounded-full bg-[#003366] flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!vinValid || isChecking || (reportType !== 'both' && reportAvailability[reportType as keyof typeof reportAvailability] === false) || (reportType === 'both' && reportAvailability.carfax === false && reportAvailability.autocheck === false)}
                  className={`w-full h-14 rounded-xl font-semibold text-white transition transform ${
                    !vinValid 
                      ? 'bg-slate-400 cursor-not-allowed' 
                      : isChecking
                      ? 'bg-slate-400 cursor-not-allowed'
                      : (reportType !== 'both' && reportAvailability[reportType as keyof typeof reportAvailability] === false) || (reportType === 'both' && reportAvailability.carfax === false && reportAvailability.autocheck === false)
                      ? 'bg-red-400 cursor-not-allowed'
                      : 'bg-[#0099FF] hover:bg-[#0088DD] hover:scale-105 active:scale-95'
                  }`}
                >
                  {!vinValid 
                    ? 'Enter Valid VIN' 
                    : isChecking 
                    ? 'Processing...'
                    : (reportType !== 'both' && reportAvailability[reportType as keyof typeof reportAvailability] === false)
                    ? `${reportType === 'carfax' ? 'Carfax' : 'AutoCheck'} Not Available`
                    : (reportType === 'both' && reportAvailability.carfax === false && reportAvailability.autocheck === false)
                    ? 'No Reports Available'
                    : reportType === 'both'
                    ? 'Buy Both Reports - $17.99'
                    : `Buy ${reportType === 'carfax' ? 'Carfax' : 'AutoCheck'} Report - $9.99`
                  }
                </button>

                <p className="text-sm text-slate-500 text-center">
                  ✓ Email delivery • ✓ Secure payment • ✓ No charge if report unavailable
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Reports section */}
      <section className="py-12 bg-[#F2F4F8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#003366] mb-2">Recent Vehicle Reports</h2>
            <p className="text-lg text-slate-600">Join thousands of satisfied customers who trust VIN AUDIT</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 bg-[#003366] text-white">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Latest Vehicle History Reports
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">VIN</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Vehicle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Report Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {isLoadingReports ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center">
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#0099FF]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading recent reports...
                        </div>
                      </td>
                    </tr>
                  ) : recentReports.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                        No recent reports available
                      </td>
                    </tr>
                  ) : (
                    recentReports.map((report, index) => (
                      <tr key={index} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-mono text-slate-900 bg-slate-100 px-2 py-1 rounded">
                            {report.vin.slice(0, 8)}***{report.vin.slice(-3)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-[#0099FF] rounded-full flex items-center justify-center mr-3">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-slate-900">{report.brand} {report.model}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            report.reportType.toLowerCase() === 'carfax' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {report.reportType.charAt(0).toUpperCase() + report.reportType.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          {new Date(report.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 bg-slate-50 text-center">
              <p className="text-sm text-slate-600">
                <span className="inline-flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Over 50,000+ reports delivered successfully
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges section */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <TrustBadge icon={CheckIcon} title="Trusted by thousands" sub="Verified customer reviews" />
            <TrustBadge icon={ShieldIcon} title="Secure Payments" sub="SSL & PCI-DSS" />
            <TrustBadge icon={ZapIcon} title="Email Delivery" sub="Sent to your inbox" />
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