// import "../styles/globals.css";

import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout/Layout";
import { RecoilRoot } from "recoil";
import ThemeSettings from "../components/settings";
// 1. Import `extendTheme`
import { theme } from "../chakra/theme";

// 2. Call `extendTheme` and pass your custom values

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeSettings>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </ThemeSettings>
    </RecoilRoot>
  );
}
