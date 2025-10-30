"use client"

import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [error, setError] = useState<string>('');

  const sessionId = searchParams.get('session_id');
  const vincode = searchParams.get('vin');
  const reportType = searchParams.get('type');

  useEffect(() => {
    if (sessionId) {
      fetchSession();
    }
  }, [sessionId]);

  const fetchSession = async () => {
    try {
      const response = await fetch(`/api/checkout-session?session_id=${sessionId}`);
      const sessionData = await response.json();
      
      if (response.ok && sessionData.payment_status === 'paid') {
        setSession(sessionData);
        // Send report email after payment is confirmed
        await sendReportEmail(sessionData);
      } else {
        setError('Payment not confirmed or session not found');
      }
    } catch (err) {
      setError('Failed to verify payment');
    } finally {
      setLoading(false);
    }
  };

  const sendReportEmail = async (sessionData: any) => {
    setEmailSending(true);
    try {
      if (!vincode || !reportType) return;

      // First, get the report links
      const reportLinks = await fetchReportLinks();
      
      // Parse vehicle info from metadata
      let vehicleInfo = null;
      if (sessionData.metadata?.vehicleInfo) {
        try {
          vehicleInfo = JSON.parse(sessionData.metadata.vehicleInfo);
        } catch (e) {
          console.log('Could not parse vehicle info');
        }
      }

      // Send email with report links
      const emailResponse = await fetch('/api/send-report-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerEmail: sessionData.customer_details?.email,
          vincode: sessionData.metadata.vincode,
          reportType: sessionData.metadata.reportType,
          vehicleInfo: vehicleInfo,
          reportLinks: reportLinks,
          paymentIntent: sessionData.payment_intent,
          amountPaid: sessionData.amount_total
        }),
      });

      const emailResult = await emailResponse.json();
      setEmailSent(emailResult.emailSent || false);
      
    } catch (err) {
      console.error('Failed to send report email:', err);
      setError('Payment successful, but failed to send email. Please contact support.');
    } finally {
      setEmailSending(false);
    }
  };

  const fetchReportLinks = async () => {
    try {
      if (!vincode || !reportType) return {};

      const promises = [];

      if (reportType === 'carfax' || reportType === 'both') {
        promises.push(
          fetch(`/api/carfax/check?vincode=${vincode}`)
            .then(res => res.json())
            .then(data => ({ type: 'carfax', data }))
        );
      }

      if (reportType === 'autocheck' || reportType === 'both') {
        promises.push(
          fetch(`/api/autocheck/check?vincode=${vincode}`)
            .then(res => res.json())
            .then(data => ({ type: 'autocheck', data }))
        );
      }

      const results = await Promise.all(promises);
      const links: any = {};

      results.forEach(result => {
        if (result.data.checked && result.data.preset_link) {
          links[result.type] = result.data.preset_link;
        }
      });

      return links;
    } catch (err) {
      console.error('Failed to fetch report links:', err);
      return {};
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#003366] mx-auto"></div>
          <p className="mt-4 text-slate-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment Error</h1>
          <p className="text-slate-600 mb-6">{error}</p>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0099FF] px-6 py-3 font-semibold text-white shadow hover:shadow-md transition"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#003366] text-white flex items-center justify-center font-bold">V</div>
              <span className="text-lg font-bold tracking-tight text-[#003366]">VIN AUDIT</span>
            </a>
          </div>
        </div>
      </header>

      {/* Success Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#003366] mb-4">Payment Successful!</h1>
          <p className="text-lg text-slate-600">
            Thank you for your purchase. Your vehicle history reports are being sent to your email address.
          </p>
        </div>

        {/* Vehicle Information */}
        {session?.metadata && (
          <div className="bg-slate-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Order Details</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-slate-700">VIN:</span>
                <span className="ml-2 text-slate-900">{session.metadata.vincode}</span>
              </div>
              <div>
                <span className="font-medium text-slate-700">Report Type:</span>
                <span className="ml-2 text-slate-900 capitalize">{session.metadata.reportType}</span>
              </div>
              <div>
                <span className="font-medium text-slate-700">Amount Paid:</span>
                <span className="ml-2 text-slate-900">${(session.amount_total / 100).toFixed(2)}</span>
              </div>
              <div>
                <span className="font-medium text-slate-700">Payment ID:</span>
                <span className="ml-2 text-slate-900 font-mono text-xs">{session.payment_intent}</span>
              </div>
            </div>
          </div>
        )}

        {/* Email Delivery Status */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#003366] mb-6">Your Vehicle History Reports</h2>
          
          {emailSending ? (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-[#0099FF]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-lg font-semibold text-blue-900">Sending your reports...</span>
              </div>
              <p className="text-blue-700">
                We're preparing and sending your vehicle history reports to your email address. 
                This usually takes just a few moments.
              </p>
            </div>
          ) : emailSent ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 7.89a1 1 0 001.42 0L21 7M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-semibold text-green-900">Reports Sent Successfully! 📧</h3>
              </div>
              <div className="space-y-3 text-green-800">
                <p>
                  <strong>Great news!</strong> Your vehicle history reports have been sent to your email address:
                </p>
                <div className="bg-white rounded-lg p-3 border border-green-200">
                  <span className="font-mono text-sm">{session?.customer_details?.email}</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  {(reportType === 'carfax' || reportType === 'both') && (
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">C</span>
                        </div>
                        <span className="font-semibold">Carfax Report</span>
                      </div>
                      <p className="text-sm text-green-700">Comprehensive vehicle history and accident records</p>
                    </div>
                  )}
                  {(reportType === 'autocheck' || reportType === 'both') && (
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-[#0099FF] rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">A</span>
                        </div>
                        <span className="font-semibold">AutoCheck Report</span>
                      </div>
                      <p className="text-sm text-green-700">Detailed history with market value insights</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h3 className="text-lg font-semibold text-yellow-900">Email Delivery in Progress</h3>
              </div>
              <p className="text-yellow-800 mb-4">
                We're processing your report delivery. If you don't receive your reports within 5 minutes, 
                please check your spam folder or contact our support team.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 rounded-lg bg-yellow-600 px-4 py-2 font-semibold text-white shadow hover:shadow-md transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh Status
              </button>
            </div>
          )}
        </div>

        {/* Important Information */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">📧 Email Delivery Information</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Your reports have been sent to the email address provided during checkout</li>
            <li>• Report links in the email will remain active for <strong>60 days</strong> from purchase</li>
            <li>• Check your spam/junk folder if you don't see the email within 5 minutes</li>
            <li>• Save or bookmark the report links from the email for future access</li>
            <li>• Reports are optimized for viewing on desktop computers and tablets</li>
            <li>• If you need to change your email address or have delivery issues, contact support immediately</li>
          </ul>
        </div>

        {/* Support Contact */}
        <div className="mt-8 text-center">
          <p className="text-slate-600 mb-4">Need help? Contact our support team</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}