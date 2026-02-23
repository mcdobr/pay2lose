const mockCreateCustomer = jest.fn();
const mockCreateSession = jest.fn();

const Stripe = jest.fn().mockImplementation(() => ({
    customers: { create: mockCreateCustomer },
    checkout: { sessions: { create: mockCreateSession } },
}));

export default Stripe;
export { mockCreateCustomer, mockCreateSession };