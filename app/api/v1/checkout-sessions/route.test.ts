/**
 * @jest-environment node
 */
import {POST} from "@/app/api/v1/checkout-sessions/route";

describe('POST /api/v1/checkout-sessions', () => {
    it('fails while not implemented', async () => {
        const request = new Request('https://example.com/api/v1/checkout-sessions', {
            method: 'POST',
            body: JSON.stringify({}),
            headers: { 'Content-Type': 'application/json' },
        });

        const response = await POST(request);

        expect(response.status).toBe(501);
    })
})