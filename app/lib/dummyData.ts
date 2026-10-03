import { Product } from "../services/productService";

export const mockProducts: Product[] = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 3000,
    image: "/headphone.jpg",
    description: "High-quality wireless headphones with noise cancellation.",
    category: "Electronics",
  },
  {
    id: 2,
    title: "Mechanical Keyboard",
    price: 2000,
    image: "/keyboard.webp",
    description: "RGB backlit mechanical keyboard with customizable keys.",
    category: "Electronics",
  },
  {
    id: 3,
    title: "Gaming Mouse",
    price: 1600,
    image: "/mouse.jpg",
    description: "High-performance gaming mouse with programmable buttons.",
    category: "Electronics",
  },
  {
    id: 4,
    title: "Shoes",
    price: 3500,
    image: "/shoes.jpg",
    description: "Comfortable and stylish shoes for everyday wear.",
    category: "men clothing",
  },
  {
    id: 5,
    title: "T-Shirt",
    price: 1200,
    image: "/tshirt.jpg",
    description: "Soft cotton t-shirt available in various colors.",
    category: "women clothing",
  },
  {
    id: 6,
    title: "Smartwatch",
    price: 5000,
    image: "/smartwatch.jpg",
    description: "Feature-rich smartwatch with fitness tracking capabilities.",
    category: "Electronics",
  },
];
