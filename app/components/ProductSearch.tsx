"use client";

import { useMemo, useState } from "react";
import Card from "./Card";
import type { Product } from "../services/productService";

const NPR_RATE = 150;

export default function ProductSearch({ products }: { products: Product[] }) {
  const [title, setTitle] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [priceOrder, setPriceOrder] = useState("");

  const filteredProducts = useMemo(() => {
    const normalizedTitle = title.trim().toLocaleLowerCase();
    const minimum = minPrice === "" ? null : Number(minPrice);
    const maximum = maxPrice === "" ? null : Number(maxPrice);

    return products
      .filter((product) => {
        const productPrice = product.price * NPR_RATE;
        return (
          product.title.toLocaleLowerCase().includes(normalizedTitle) &&
          (minimum === null || productPrice >= minimum) &&
          (maximum === null || productPrice <= maximum)
        );
      })
      .sort((first, second) => {
        if (priceOrder === "asc") return first.price - second.price;
        if (priceOrder === "desc") return second.price - first.price;
        return 0;
      });
  }, [maxPrice, minPrice, priceOrder, products, title]);

  return (
    <>
      <section
        aria-label="Search and filter products"
        className="mt-6 flex justify-between rounded-2xl bg-white p-4 "
      >
        <label className="sm:col-span-2 lg:col-span-1">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">
            Search by title
          </span>
          <span className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 focus-within:border-blue-500">
            <input
              type="search"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Find a product..."
              className="w-full py-2.5 text-sm outline-none"
            />
          </span>
        </label>

        <label>
          <span className="mb-1.5 block text-sm font-medium text-slate-700">
            Sort by price
          </span>
          <select
            value={priceOrder}
            onChange={(e) => setPriceOrder(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="">Default order</option>
            <option value="asc">Price: low to high</option>
            <option value="desc">Price: high to low</option>
          </select>
        </label>
      </section>

      {filteredProducts.length > 0 ? (
        <>
          <div className="mt-4 grid grid-cols-1 place-items-center gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} {...product} />
            ))}
          </div>
        </>
      ) : (
        <div className="mt-6 flex min-h-64 items-center justify-center rounded-2xl bg-white text-slate-600">
          No products match your search or price range.
        </div>
      )}
    </>
  );
}
