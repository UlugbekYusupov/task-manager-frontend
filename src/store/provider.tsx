"use client"; // Required for Next.js App Router

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

export function Providers({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
