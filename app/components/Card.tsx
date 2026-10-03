import Image from "next/image";
import Link from "next/link";
import type { Product } from "../services/productService";

const Card = ({ id, title, price, description, category, image }: Product) => {


  return (
    <div className="group relative flex w-full flex-col overflow-hidden rounded-[28px] bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600">
          {category}
        </span>
      </div>

      <Link
        href={`/products/${id}`}
        className="relative mb-4 block overflow-hidden rounded-[22px]"
      >
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          className="relative z-10 mx-auto h-52 w-full cursor-pointer object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </Link>

      <div className="flex flex-1 flex-col">
        <h2 className="mb-2 line-clamp-2 text-[16px] font-bold">
          <Link href={`/products/${id}`} title={title}>
            {title}
          </Link>
        </h2>
        {description && (
          <p
            className=" line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400"
          >
            {description.length > 65
              ? `${description.slice(0, 65)}...`
              : description}
          </p>
        )}

        <div className="mt-auto  border-slate-100 pt-5">
          <div className="flex  justify-between gap-3 items-center">
            <span className="text-lg font-semibold ">NPR {price * 150}</span>

            <Link
              href={`/products/${id}`}
              className=" p-2 text-sm text-blue-500 hover:text-blue-700 "
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
