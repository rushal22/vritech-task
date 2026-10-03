"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { useCartStore } from "../lib/store";

export default function StoreProvider({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);

  return children;
}
