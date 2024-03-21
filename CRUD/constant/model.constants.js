const PAYMENT_METHOD = {
    STRIPE_PAYMENT: 'stripe',
    PAYPAL_PAYMENT: 'paypal',
    GPAY_PAYMENT: 'g-pay',
}

const PLAN_LIMIT = {
    PER_MONTH: 'per month',
    PER_YEAR: 'per year',
}

const PLAN_NAME = {
    FREE: 'free',
    BASIC: 'basic',
    PRO: 'pro',
    BUSINESS: 'business',
}

const CURRENCY = {
    INR: 'INR',
    USD: 'USD',
}

const PAYMENT_STATUS = {
    COMPLETED: 'completed',
}

module.exports = { PAYMENT_METHOD, PLAN_LIMIT, PLAN_NAME, CURRENCY, PAYMENT_STATUS }