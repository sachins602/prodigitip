import { api } from "@/utils/api";
import { type AppType } from "next/app";
import Layout from "@/components/layout";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import "@/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
