// src/app/layout.tsx

import "@/css/satoshi.css";
import "@/css/style.css";
import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
<<<<<<< HEAD
import type { PropsWithChildren } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { Providers } from "./providers";
=======
import { Providers } from "./providers";
import { SessionProvider } from "next-auth/react";
>>>>>>> origin/main
import { auth } from "../../auth";

export const metadata: Metadata = {
  title: {
    template: "%s | NextAdmin",
    default: "NextAdmin",
  },
  description: "Next.js dashboard kit.",
};

<<<<<<< HEAD
export default async function RootLayout({ children }: PropsWithChildren) {
  
  const session = await auth()

  return (
    <SessionProvider session={session}>
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <NextTopLoader showSpinner={false} />

          <div className="flex min-h-screen">
            <Sidebar />

            <div className="w-full bg-gray-2 dark:bg-gradient-to-t from-[#2C2C2C] to-[#181A20]">
              <Header />

              <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
=======
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
>>>>>>> origin/main
    </SessionProvider>
  );
}
