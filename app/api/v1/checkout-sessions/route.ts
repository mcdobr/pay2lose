import Stripe from "stripe";
import {NextResponse} from "next/server";

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'ron',
                        product_data: {
                            name: 'Coffee',
                        },
                        unit_amount: 500
                    },
                    quantity: 1,
                }
            ],
            mode: 'payment',
            success_url: `${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${DOMAIN}/`,
        });
        if (!session.url) {
            return NextResponse.json({error: "Failed to create checkout session"}, {status: 500});
        }
        return NextResponse.json({
            url: session.url
        }, {status : 201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: error.message,
        },
        {
            status : 500
        });
    }
}