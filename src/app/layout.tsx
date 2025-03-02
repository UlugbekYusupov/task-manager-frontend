import type { Metadata } from "next";
import "../styles/globals.css";
import { Providers } from "../store/provider";

export const metadata: Metadata = {
  title: "Task Manager App",
  description: "Task Manager App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
