"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllCategories } from "../services/productService";
import { useCartStore } from "../lib/store";

const Navbar = () => {
  const pathname = usePathname();
  const cartCount = useCartStore((state) =>
    state.items.reduce((count, item) => count + item.quantity, 0),
  );
  const [profileOpen, setProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authUser, setAuthUser] = useState<any>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [categoriesError, setCategoriesError] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("authUser");
    if (user) {
        setAuthUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Unable to load product categories:", error);
        setCategoriesError(true);
      });
  }, []);

  const handleLogout =() => {
    localStorage.removeItem("authUser"); 
    window.location.href = "/"; 
  }
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-20 lg:py-5">
        <Link href="/" className="shrink-0 text-[20px] font-semibold italic">
          Sho<span className="text-blue-500">pify</span>
        </Link>
        <nav className="hidden items-center gap-10 text-sm md:flex">
          <Link
            href={"/products"}
            className={` ${pathname === "/products" ? " active" : ""}`}
          >
            All Products
          </Link>
          <div className="relative">
            <button
              type="button"
              onClick={() => setCategoriesOpen((open) => !open)}
              className="flex items-center gap-1"
            >
              Categories
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </button>
            {categoriesOpen && (
              <div className="absolute left-0 top-full z-50 mt-2 min-w-48 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                {categoriesError ? (
                  <p className="px-4 py-2.5 text-sm text-red-600">
                    Unable to load categories.
                  </p>
                ) : categories.length > 0 ? (
                  categories.map((category) => (
                    <Link
                      key={category}
                      href={`/products?category=${encodeURIComponent(category)}`}
                      onClick={() => setCategoriesOpen(false)}
                      className="block px-4 py-2.5 text-sm capitalize text-slate-700 hover:bg-slate-50"
                    >
                      {category}
                    </Link>
                  ))
                ) : (
                  <p className="px-4 py-2.5 text-sm text-slate-500">
                    Loading categories...
                  </p>
                )}
              </div>
            )}
          </div>

          <Link
            href={"/about"}
            className={` ${pathname === "/about" ? " active" : ""}`}
          >
            About
          </Link>

          <Link
            href={"/contact"}
            className={` ${pathname === "/contact" ? " active" : ""}`}
          >
            Contact
          </Link>
        </nav>
        <div className="flex shrink-0 items-center gap-3 sm:gap-6">
          <Link
            href="/cart"
            className="relative text-gray-700 transition-colors hover:text-indigo-600 hidden md:block"
            aria-label={`Cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
          >
            <Image src="/cart.png" alt="Cart" width={30} height={30} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-xs font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          {authUser ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((open) => !open)}
                className="relative block h-10 w-10 overflow-hidden rounded-full cursor-pointer"
              >
                <Image
                  src="/user-icon.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                  <Link
                    href="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    Profile
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleLogout()}
                    className="block w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="text-gray-700 transition-colors hover:text-indigo-600"
            >
              Login
            </Link>
          )}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md hover:bg-slate-100 md:hidden"
          >
            <span className="h-0.5 w-5 bg-slate-700" />
            <span className="h-0.5 w-5 bg-slate-700" />
            <span className="h-0.5 w-5 bg-slate-700" />
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <nav className="flex flex-col gap-4 border-t border-slate-100 px-4 py-3 text-sm  sm:px-6 md:hidden">
          <Link
            href={"/products"}
            className={` ${pathname === "/products" ? " active" : ""}`}
          >
            All Products
          </Link>
          <div>
            <button
              type="button"
              aria-expanded={categoriesOpen}
              onClick={() => setCategoriesOpen((open) => !open)}
              className="flex items-center gap-1"
            >
              Categories
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </button>
            {categoriesOpen && (
              <div className="mt-2 flex flex-col border-l border-slate-200 pl-3">
                {categoriesError ? (
                  <p className="py-2 text-sm text-red-600">
                    Unable to load categories.
                  </p>
                ) : categories.length > 0 ? (
                  categories.map((category) => (
                    <Link
                      key={category}
                      href={`/products?category=${encodeURIComponent(category)}`}
                      onClick={() => {
                        setCategoriesOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                      className="py-2 text-sm capitalize text-slate-700 hover:text-indigo-600"
                    >
                      {category}
                    </Link>
                  ))
                ) : (
                  <p className="py-2 text-sm text-slate-500">
                    Loading categories...
                  </p>
                )}
              </div>
            )}
          </div>

          <Link
            href={"/about"}
            className={` ${pathname === "/about" ? " active" : ""}`}
          >
            About
          </Link>

          <Link
            href={"/contact"}
            className={` ${pathname === "/contact" ? " active" : ""}`}
          >
            Contact
          </Link>
          <Link
            href="/cart"
            className="relative text-gray-700 transition-colors hover:text-indigo-600 md:hidden block"
            aria-label={`Cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
          >
            <Image src="/cart.png" alt="Cart" width={30} height={30} />
            {cartCount > 0 && (
              <span className="absolute left-5 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-xs font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
