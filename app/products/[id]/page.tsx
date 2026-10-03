import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "../../components/AddToCartButton";
import { getProduct } from "../../services/productService";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product.id) {
    notFound();
  }

  return (
    <div className="grid gap-10 px-6 py-12 md:grid-cols-5 md:px-10">
      <div className="rounded-2xl bg-white p-8 col-span-2">
        <Image
          src={product.image}
          alt={product.title}
          width={600}
          height={600}
          priority
          className="h-80 w-full object-contain"
        />
      </div>

      <section className="flex flex-col justify-center col-span-3 bg-white p-8 rounded-2xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-600">
          {product.category}
        </p>
        <h1 className="text-3xl font-bold text-slate-900">{product.title}</h1>
        <p className="mt-6 text-2xl font-semibold text-slate-900">
          NPR {(product.price * 150).toFixed(2)}
        </p>
        <AddToCartButton product={product} />
        <p className="mt-6 leading-7 opacity-50">{product.description}</p>
      </section>
    </div>
  );
}
