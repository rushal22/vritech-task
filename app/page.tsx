import Image from "next/image";
import Card from "./components/Card";
import { getProducts } from "./services/productService";
import Link from "next/link";
import { mockProducts } from "./lib/dummyData";

export default async function Home() {
  const fetchedData = await getProducts("asc", 10);
  const data = fetchedData.length > 0 ? fetchedData : mockProducts;

  return (
    <div className="lg:my-15 lg:mx-20 md:my-10 md:mx-15 my-5 mx-10 ">
      <div className="relative mb-10 h-36 w-full overflow-hidden rounded-2xl sm:h-48 md:h-60 lg:h-75">
        <Image
          src={
            "https://static.vecteezy.com/system/resources/thumbnails/041/417/220/small/fashion-sale-horizontal-banner-with-discount-offer-advertisement-with-colorful-sketches-of-various-clothing-items-illustration-vector.jpg"
          }
          className="object-cover object-center"
          alt="product-banner"
          fill
          priority
        />
      </div>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center py-10">
          {data.map((prod) => (
            <Card
              key={prod.id}
              title={prod.title}
              price={prod.price}
              description={prod.description}
              image={prod.image}
              id={prod.id}
              category={prod.category}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center bg-white h-100 rounded-2xl">
          No Product Avaible.
        </div>
      )}
      {data?.length >= 10 && (
        <div className="pb-10 text-center text-[18px]">
          <Link
            href={"/products"}
            className="text-white bg-gray-400 p-3 rounded-md"
          >
            View All Products
          </Link>
        </div>
      )}
    </div>
  );
}
