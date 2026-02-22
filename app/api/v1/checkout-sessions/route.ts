export async function POST(request: Request) {

    return new Response(null, {
        status: 501,
        headers: { 'Content-Type': 'application/json' }
    });
}