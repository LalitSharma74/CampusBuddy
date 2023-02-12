// import "../styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";
// 1. Import `extendTheme`
import { theme } from "../chakra/theme";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import { RecoilRoot } from "recoil";

// 2. Call `extendTheme` and pass your custom values

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  );
}
