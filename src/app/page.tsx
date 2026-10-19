import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import StyleThem from "@/components/StyleThem";
import { fetchProducts } from "@/lib/products";

export default async function Home() {
  const products = await fetchProducts();

  return (
    <div className="relative">
      <Header />
      <main>
        <Hero />
        <ProductGrid products={products} />
        <StyleThem products={products} />
      </main>
      <Footer />
    </div>
  );
}
