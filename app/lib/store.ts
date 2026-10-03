import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Product } from "../services/productService";

export type CartItem = Product & { quantity: number };

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeItem: (id: number) => void;
}

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) return false;

  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "number" &&
    typeof item.title === "string" &&
    typeof item.price === "number" &&
    typeof item.description === "string" &&
    typeof item.category === "string" &&
    typeof item.image === "string" &&
    typeof item.quantity === "number" &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0
  );
}

function getPersistedItems(value: unknown): CartItem[] {
  if (Array.isArray(value)) {
    if (value.every(isCartItem)) return value;
    console.error("Saved cart data has an invalid format.");
    return [];
  }

  if (typeof value === "object" && value !== null && "items" in value) {
    const items = (value as { items: unknown }).items;
    if (Array.isArray(items) && items.every(isCartItem)) return items;
    console.error("Saved cart data has an invalid format.");
  }

  return [];
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const item = state.items.find(({ id }) => id === product.id);
          return {
            items: item
              ? state.items.map((x) =>
                  x.id === product.id
                    ? { ...x, quantity: x.quantity + 1 }
                    : x,
                )
              : [...state.items, { ...product, quantity: 1 }],
          };
        }),
      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((x) =>
            x.id === id ? { ...x, quantity: x.quantity + 1 } : x,
          ),
        })),
      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((x) =>
            x.id === id && x.quantity > 1
              ? { ...x, quantity: x.quantity - 1 }
              : x,
          ),
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((x) => x.id !== id),
        })),
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({ items: state.items }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        items: getPersistedItems(persistedState),
      }),
      onRehydrateStorage: () => (_state, error) => {
        if (error) console.error( error);
      },
    },
  ),
);
