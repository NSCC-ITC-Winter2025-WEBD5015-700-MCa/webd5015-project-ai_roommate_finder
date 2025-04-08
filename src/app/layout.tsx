// src/app/layout.tsx

import "@/css/satoshi.css";
import "@/css/style.css";
import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Providers } from "./providers";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../auth";

export const metadata: Metadata = {
  title: {
    template: "%s | NextAdmin",
    default: "NextAdmin",
  },
  description: "Next.js dashboard kit.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body>
          <Providers>
            <NextTopLoader showSpinner={false} />
            {children}
          </Providers>
        </body>
      </html>
    </SessionProvider>
  );
}
