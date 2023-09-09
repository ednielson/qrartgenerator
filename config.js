import themes from "daisyui/src/theming/themes.js";

const config = {
  // REQUIRED
  appName: "QRart",
  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domainName: "qrart.ai",
  stripe: {
    plans: [
      {
        // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
        priceId:
          process.env.NODE_ENV === "development" ? "price_123" : "price_456",
        // Name, price, features are optional. I use them to display the plan & benefits on the pricing page
        name: "Starter",
        price: 19,
        features: [
          {
            name: "Unlimited access",
          },
          { name: "24/7 support" },
        ],
      },
    ],
  },
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    cdn: "https://cdn-id.cloudfront.net/",
  },
  mailgun: {
    // subdomain to use when sending emails, if you don't have a subdomain, just remove it. Highly recommended to have one (i.e. mg.yourdomain.com or mail.yourdomain.com)
    subdomain: "mail",
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `QRart <noreply@mail.qrart.ai>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `QRart <hello@mail.qrart.ai>`,
    // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "QRart <hello@mail.qrart.ai",
    // When someone replies to supportEmail sent by the app, forward it to the email below (otherwise it's lost). If you set supportEmail to empty, this will be ignored.
    forwardRepliesTo: "hello@qrart.ai",
  },
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to _document.js). Leave blank for default (light & dark mode). If you any other theme than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
    theme: "cupcake",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
    // OR you can just do this to use a custom color: main: "#f37055". HEX only.
    main: themes[`[data-theme=light]`]["primary"],
  },
  // REQUIRED — the path you want to redirect users after successfull login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in appiClient (/libs/api.js) upon 401 errors from our API & /hooks/usePrivate.js
  callbackUrl: "/dashboard",
};

export default config;
