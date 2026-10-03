import { fetcher } from "../lib/fetcher";

function buildProductQuery(sort?: string, limit?: number): string {
  const params = new URLSearchParams();
  if (sort) params.set("sort", sort);
  if (limit !== undefined) params.set("limit", String(limit));
  const query = params.toString();
  return query ? `?${query}` : "";
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export async function getProducts(
  sort?: string,
  limit?: number,
): Promise<Product[]> {
  try {
    const data = await fetcher<Product[]>(
      `/products${buildProductQuery(sort, limit)}`,
      {
        cache: "no-cache",
      },
    );
    return data;
  } catch (error) {
    return [];
  }
}

export async function getProduct(id: string): Promise<Product> {
  const data = fetcher<Product>(`/products/${id}`, { cache: "no-cache" });
  return data;
}

export async function getAllCategories(): Promise<string[]> {
  const data = fetcher<string[]>("/products/categories", { cache: "no-cache" });
  return data;
}
export async function getProductsByCategory(
  category: string,
  sort?: string,
  limit?: number,
): Promise<Product[]> {
  const data = fetcher<Product[]>(
    `/products/category/${encodeURIComponent(category)}${buildProductQuery(sort, limit)}`,
    { cache: "no-cache" },
  );
  return data;
}