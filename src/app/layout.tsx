"use client";
import "../styles/globals.css";
import { Providers } from "../store/provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body>
        <Providers>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </Providers>
      </body>
    </html>
  );
}
