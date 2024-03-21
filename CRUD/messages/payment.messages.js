const PAYMENT_MESSAGES = {
  PAYMENT_INTENT_CREATED: 'Payment intent successfully created.',
  PAYMENT_INTENT_NOT_CREATED:
    'Failed to create payment intent. Please try again.',

  AMOUNT_REQUIRED: 'Please provide the payment amount.',
  CURRENCY_REQUIRED: 'Please specify the currency for the payment.',
  CURRENCY_MUST_BE_STRING: 'Currency must be a valid string.',

  PAYMENT_CREATED: 'Successfully initiated payment using PayPal method',
  PAYMENT_EXECUTE: 'Payment executed successfully using PayPal method',

  PAYMENT_NOT_EXECUTE:
    'Payment through PayPal failed. Please retry or use another method. Contact support if needed.',

  GPAY_PAYMENT_CREATED: 'Payment initiated successfully with G-Pay.',
  GPAY_PAYMENT_NOT_CREATED:
    'Payment initiation with G-Pay failed. Please try again or contact support.',

  PAYMENT_HISTORY_FOUND: 'Successfully retrieved user payment history.',
  PAYMENT_HISTORY_NOT_FOUND: 'No payment history found for the user.',

  ORDER_FOUND_SUCCESS:
    'Order found Successfully. Here are the details you requested.',
  ORDER_NOT_FOUND:
    'Sorry, we could not find that order. Please double-check the details and try again.',
  EMAIL_NOT_SENT:
    'Invoice email not sent. Verify your email in settings or contact support',
  STRIPE_PAYMENT_CREATED:
    'Payment processed via Stripe. Thank you! Any questions? Reach out anytime.',
  STRIPE_PAYMENT_NOT_CREATED:
    'Stripe payment not successful. Check details or contact us for alternatives.',

  PAYMENT_FOUND: 'Payment information successfully retrieved.',
  PAYMENT_NOT_FOUND: 'No payment records found for the specified query.',

  FREE_PLAN_PURCHASE: "Successfully purchase free plan.",
  FREE_PLAN_NOT_PURCHASE: "Free plan not purchase. Please try again."

};

module.exports = { PAYMENT_MESSAGES }