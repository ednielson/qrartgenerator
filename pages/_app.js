// pages/_app.js
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/Layout";
import Script from "next/script";
import "@/styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={session}>
      {getLayout(
        <>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
          <noscript>
            <img
              src="https://queue.simpleanalyticscdn.com/noscript.gif"
              alt=""
              referrerPolicy="no-referrer-when-downgrade"
            />
          </noscript>
        </>
      )}
    </SessionProvider>
  );
}