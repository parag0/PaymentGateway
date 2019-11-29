# Payment Gateway

NodeJs app developed for Paypal and Braintree integration. For now only tested on credit cards with currency support for ['USD','EUR','THB','HKD','SGD','AUD']

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install dependencies.

```bash
npm install
```

Use following environment variables for Paypal and Braintree authentication.

## For Linux
```
export PAYPAL_SANDBOX_CLIENT_ID=[YOUR_SANDBOX_CLIENT_ID](https://developer.paypal.com/developer/applications)
export PAYPAL_SANDBOX_CLIENT_SECRET=[YOUR_SANDBOX_CLIENT_SECRET](https://developer.paypal.com/developer/applications)
```

```
export BRAINTREE_MERCHANT_ID=[YOUR_BRAINTREE_MERCHANT_ID](https://articles.braintreepayments.com/control-panel/important-gateway-credentials#merchant-id)
export BRAINTREE_PUBLIC_KEY=[YOUR_BRAINTREE_PUBLIC_KEY](https://articles.braintreepayments.com/control-panel/important-gateway-credentials#public-key)
export BRAINTREE_PRIVATE_KEY=[YOUR_BRAINTREE_PRIVATE_KEY](https://articles.braintreepayments.com/control-panel/important-gateway-credentials#private-key)
```

## For Windows:
```
setx PAYPAL_SANDBOX_CLIENT_ID [YOUR_SANDBOX_CLIENT_ID](https://developer.paypal.com/developer/applications)
setx PAYPAL_SANDBOX_CLIENT_SECRET [YOUR_SANDBOX_CLIENT_SECRET](https://developer.paypal.com/developer/applications)
```

```
setx BRAINTREE_MERCHANT_ID [YOUR_BRAINTREE_MERCHANT_ID](https://articles.braintreepayments.com/control-panel/important-gateway-credentials#merchant-id)
setx BRAINTREE_PUBLIC_KEY [YOUR_BRAINTREE_PUBLIC_KEY](https://articles.braintreepayments.com/control-panel/important-gateway-credentials#public-key)
setx BRAINTREE_PRIVATE_KEY [YOUR_BRAINTREE_PRIVATE_KEY](https://articles.braintreepayments.com/control-panel/important-gateway-credentials#private-key)
```

For using Braintree payments, you'll also need to replace the tokenization key with [YOUR_TOKENIZATION_KEY](https://developers.braintreepayments.com/guides/authorization/tokenization-key/ios/v4#obtaining-a-tokenization-key)

## Database

Create MySQL DB schema provided in the db.sql file.

