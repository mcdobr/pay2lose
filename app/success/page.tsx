import Stripe from "stripe";

type SuccessPageProps = {
  searchParams? : { [key: string]: string | string[] | undefined },
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
    const params = await searchParams;
    const sessionId = params.session_id;

    if (!sessionId || typeof sessionId !== 'string') {
        return (
            <main>
                <p>An error occurred</p>
            </main>
        );
    }

    try {
        const stripe = Stripe(process.env.STRIPE_SECRET_KEY!);

        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['payment_intent'],
        });


        return (
            <main>
                <h1>Payment Successful!</h1>
                <p>Thank you for your purchase.</p>
            </main>
        );
    } catch (err : unknown) {
        console.error(err);
        return (
            <main>
                <p>An error occurred on the session.</p>
            </main>
        );
    }
}