"use client";

import {stripePromise} from "@/paymentConstants";

export default function PaymentButton() {
    const handlePayment = async () => {
        const stripe = await stripePromise;
        if (!stripe) {
            console.error("Stripe initialization failed");
            return;
        }

        const response = await fetch('/api/v1/checkout-sessions', { method: 'POST' });
        const session = await response.json();

        window.location.assign(session.url);
    };

    return <>
        <button
            onClick={handlePayment}
            className="px-6 py-3 rounded-lg font-semibold shadow-md transition-colors duration-200
            bg-blue-600 text-white hover:bg-blue-700
            dark:bg-blue-500 dark:text-black dark:hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800"
        >
            Pay me
        </button>
    </>;
}

