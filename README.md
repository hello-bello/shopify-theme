# Theme

This is the Launched LA-opinionated starting point for Shopify themes. It includes:
- Slate
- Typescript (strict mode)
- React
- Foundation CSS + JS
- Cart app

## Instructions

- `npm i`
- `npm run zip`
- Upload the zip file to Shopify and note the theme ID
- Create a private app as per https://shopify.github.io/slate/docs/connect-to-your-store
- `cp example.env .env`
- Copy the private app password and theme ID to .env
- `npm start`
- Might want to enable customer accounts from Shopify Settings -> Checkout.
- Might want to create a few products and edit the theme to add a few `home-product-card` blocks.