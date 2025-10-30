import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
});

export async function POST(request: NextRequest) {
  try {
    const { vincode, reportType, vehicleInfo } = await request.json();

    // Validate required fields
    if (!vincode || !reportType) {
      return NextResponse.json(
        { error: 'VIN code and report type are required' },
        { status: 400 }
      );
    }

    // Define pricing
    const prices = {
      carfax: 999, // $9.99 in cents
      autocheck: 999, // $9.99 in cents
      both: 1799, // $17.99 in cents (bundle discount)
    };

    const price = prices[reportType as keyof typeof prices];
    if (!price) {
      return NextResponse.json(
        { error: 'Invalid report type' },
        { status: 400 }
      );
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Vehicle History Report - ${reportType.toUpperCase()}`,
              description: `VIN: ${vincode}${vehicleInfo ? ` - ${vehicleInfo.brand} ${vehicleInfo.model} ${vehicleInfo.year}` : ''}`,
              images: ['https://your-domain.com/logo.png'], // Replace with your logo URL
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}&vin=${vincode}&type=${reportType}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/?canceled=true&vin=${vincode}`,
      metadata: {
        vincode,
        reportType,
        vehicleInfo: vehicleInfo ? JSON.stringify(vehicleInfo) : null,
      },
      customer_email: undefined, // Customer will enter email during checkout
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });

  } catch (error) {
    console.error('Stripe session creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment session' },
      { status: 500 }
    );
  }
}