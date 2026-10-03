

const BASE_URL = "https://fakestoreapi.com";


export async function fetcher<T>(
  endpoint: string,
  option?: RequestInit,
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const res = await fetch(url, {
      ...option,
      headers: {
        "Content-Type": "application/json",
        ...option?.headers,
      },
    });
    if (!res?.ok) {
      throw new Error(`API Error ${res.status}: ${res.statusText}`);
    }
    return (await res.json()) as T;
  } catch (error) {
    throw error;
  }
}
