import type { ProductEntry } from "@/types/product";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
}: {
  products: ProductEntry[];
}) {
  return (
    <section
      id="products"
      className="bg-brand px-[16.5px] pb-[100px] pt-[80px] lg:px-[70px] lg:pb-[150px] lg:pt-[128px]"
    >
      <div className="mx-auto flex max-w-[357px] flex-col gap-[17px] lg:grid lg:max-w-[1300px] lg:grid-cols-3">
        {products.map((entry) => (
          <ProductCard key={entry.product.id} entry={entry} />
        ))}
      </div>
    </section>
  );
}
