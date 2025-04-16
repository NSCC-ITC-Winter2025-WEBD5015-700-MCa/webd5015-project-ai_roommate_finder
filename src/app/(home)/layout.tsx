// src/app/(home)/layout.tsx

import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";


import { PropsWithChildren } from "react";

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="w-full flex flex-col flex-1">
        <Header />
        <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
