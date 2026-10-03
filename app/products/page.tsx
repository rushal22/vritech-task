import { getProducts, getProductsByCategory } from "../services/productService";
import ProductSearch from "../components/ProductSearch";
import { mockProducts } from "../lib/dummyData";

interface ProductsPageProps {
  searchParams: Promise<{ category?: string | string[] }>;
}

const Page = async ({ searchParams }: ProductsPageProps) => {
  const { category: categoryParam } = await searchParams;
  const category = Array.isArray(categoryParam)
    ? categoryParam[0]
    : categoryParam;
  const fetchedData = category
    ? await getProductsByCategory(category, "asc")
    : await getProducts("asc");
  const data = category
    ? fetchedData
    : fetchedData.length > 0
      ? fetchedData
      : mockProducts;

  return (
    <div className="lg:py-15 lg:px-20 md:py-10 md:px-15 py-5 px-10 ">
      {category && (
        <h1 className="mt-5 text-2xl font-semibold capitalize">{category}</h1>
      )}
      <ProductSearch products={data} />
    </div>
  )
}

export default Page;