/**
 * @jest-environment node
 */
jest.mock('stripe');

import {POST} from "@/app/api/v1/checkout-sessions/route";
import { mockCreateSession } from "stripe";

describe('POST /api/v1/checkout-sessions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns 201', async () => {
        mockCreateSession.mockResolvedValue({ id: 'cs_test_123', url: 'https://stripe.com/pay' })

        const request = new Request('https://example.com/api/v1/checkout-sessions', {
            method: 'POST',
            body: JSON.stringify({}),
            headers: { 'Content-Type': 'application/json' },
        });

        const response = await POST(request);

        expect(response.status).toBe(201);
        await expect(response.json()).resolves.toEqual({url: 'https://stripe.com/pay'});
    })

    it('should return 500 if Stripe throws an error', async () => {
        mockCreateSession.mockRejectedValueOnce(new Error('Simulated Stripe error'));

        const request = new Request('https://example.com/api/v1/checkout-sessions', {
            method: 'POST',
            body: JSON.stringify({}),
        });

        const response = await POST(request);

        expect(response.status).toBe(500);
        await expect(response.json()).resolves.toEqual({ error: 'Simulated Stripe error' });
    });

    it('should return 500 if session creation fails', async () => {
       mockCreateSession.mockResolvedValue({ id: 'cs_test_123' });

        const request = new Request('https://example.com/api/v1/checkout-sessions', {
            method: 'POST',
            body: JSON.stringify({}),
        });

        const response = await POST(request);

        expect(response.status).toBe(500);
        await expect(response.json()).resolves.toEqual({ error: 'Failed to create checkout session' });
    });
})