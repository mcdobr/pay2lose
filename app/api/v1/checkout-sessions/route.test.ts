/**
 * @jest-environment node
 */
import {POST} from "@/app/api/v1/checkout-sessions/route";

jest.mock('stripe', () => {
    return jest.fn().mockImplementation(() => {
        return {
            // Mock the specific methods you use (e.g., customers.create)
            customers: {
                create: jest.fn().mockResolvedValue({ id: 'cus_123', email: 'test@example.com' }),
            },
            checkout: {
                sessions: {
                    create: jest.fn().mockResolvedValue({ id: 'cs_test_123', url: 'https://stripe.com/pay' }),
                },
            },
        };
    });
});


describe('POST /api/v1/checkout-sessions', () => {
    it('returns 201', async () => {
        const request = new Request('https://example.com/api/v1/checkout-sessions', {
            method: 'POST',
            body: JSON.stringify({}),
            headers: { 'Content-Type': 'application/json' },
        });

        const response = await POST(request);

        expect(response.status).toBe(201);
        expect(response.json()).resolves.toEqual({ url: 'https://stripe.com/pay' });
    })
})