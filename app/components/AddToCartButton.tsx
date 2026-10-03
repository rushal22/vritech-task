"use client";

import { useState } from "react";
import { useCartStore } from "../lib/store";
import type { Product } from "../services/productService";

export default function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  function addToCart() {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={addToCart}
      className="mt-6 w-full rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:w-fit"
      aria-live="polite"
    >
      {added ? "Added to cart" : "Add to cart"}
    </button>
  );
}