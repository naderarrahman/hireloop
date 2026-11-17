import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const headersList = await headers();

    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const origin = headersList.get('origin') || 'http://localhost:3000';
    const userEmail = session.user.email;

    const stripeSession = await stripe.checkout.sessions.create({
      line_items: [{ price: 'price_1UcTEPCqcmBsebfauPzvPrsZ', quantity: 1 }],
      mode: 'payment',
      customer_email: userEmail,
      metadata:{
        userId: session?.user.id,
      },
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment/cancelled?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error }, { status: 500 });
  }
}