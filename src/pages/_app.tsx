// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultConfig } from "connectkit";

export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const config = createConfig(
    getDefaultConfig({
      // Required API Keys
      alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID, // or infuraId
      walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',

      // Required
      appName: "SBT BANK",

      // Optional
      appDescription: "BANK FOR ALL EASY TRANACTION",
      appUrl: "http://localhost:3000", // your app's url
      appIcon: "http://localhost:3000/logo.svg", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    }),
  );

  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY || ""}>
      {ready ? (
        <WagmiConfig config={config}>
          <ConnectKitProvider theme="retro" mode="light">
            {/* Your App */}
            <Component {...pageProps} />
          </ConnectKitProvider>
        </WagmiConfig>
      ) : null}
    </GoogleReCaptchaProvider>
  );
}
