"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../lib/store";

const NPR_RATE = 150;

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const total = items.reduce(
    (sum, item) => sum + item.price * NPR_RATE * item.quantity,
    0,
  );

  return (
    <main className="mx-auto min-h-[70vh] max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-slate-900">Your cart</h1>
      {items.length === 0 ? (
        <section className="rounded-2xl bg-white px-6 py-16 text-center">
          <p className="text-lg text-slate-600">Your cart is empty.</p>
          <Link
            href="/products"
            className="mt-6 inline-flex rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Browse products
          </Link>
        </section>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <section className="space-y-4" aria-label="Cart items">
            {items.map((item) => (
              <article
                key={item.id}
                className="flex flex-col gap-5 rounded-2xl bg-white p-5 sm:flex-row sm:items-center"
              >
                <Link
                  href={`/products/${item.id}`}
                  className="relative h-28 w-full shrink-0 sm:w-28"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="112px"
                    className="object-contain"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <p className="text-sm capitalize text-slate-500">
                    {item.category}
                  </p>
                  <Link
                    href={`/products/${item.id}`}
                    className="mt-1 block font-semibold text-slate-900 hover:text-blue-700"
                  >
                    {item.title}
                  </Link>
                  <p className="mt-2 text-sm text-slate-600">
                    NPR {(item.price * NPR_RATE).toFixed(2)} each
                  </p>
                </div>
                <div className="flex items-center justify-between gap-5 sm:justify-end">
                  <div
                    className="flex items-center rounded-lg border border-slate-200"
                    aria-label={`Quantity for ${item.title}`}
                  >
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      disabled={item.quantity <= 1}
                      aria-label={`Decrease quantity of ${item.title}`}
                      className="px-3 py-2 text-lg disabled:cursor-not-allowed disabled:text-slate-300"
                    >
                      −
                    </button>
                    <span className="min-w-8 text-center" aria-live="polite">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      aria-label={`Increase quantity of ${item.title}`}
                      className="px-3 py-2 text-lg"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.title} from cart`}
                    className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                  >
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </section>
          <aside className="h-fit rounded-2xl bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Order summary
            </h2>
            <div className="mt-5 flex justify-between border-t border-slate-100 pt-5 text-lg font-bold">
              <span>Total</span>
              <span>NPR {total.toFixed(2)}</span>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Shipping and taxes are calculated at checkout.
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}
