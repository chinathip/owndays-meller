import type {
  ProductColor,
  ProductEntry,
  ProductSku,
  ProductsResponse,
} from "@/types/product";

const API_URL =
  process.env.PRODUCTS_API_URL ||
  "https://api-one-alpha-60.vercel.app/meller/products.json";
const IMAGE_BASE =
  process.env.NEXT_PUBLIC_IMAGE_BASE_URL ||
  "https://storage.owndays.com/storage/";

export async function fetchProducts(): Promise<ProductEntry[]> {
  const res = await fetch(API_URL, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`Products API failed: ${res.status}`);
  }
  const json = (await res.json()) as ProductsResponse;

  return json.data.map((entry) => {
    const sortedSkus = [...entry.skus].sort((a, b) => a.order - b.order);

    const skus = sortedSkus.map((sku) => {
      const sortedImages = [...sku.images].sort((a, b) => a.order - b.order);
      return { ...sku, images: sortedImages };
    });

    return { ...entry, skus };
  });
}

export const imageUrl = (path: string) => {
  return `${IMAGE_BASE}${path}`;
};

export const formatYen = (price: number) => {
  return `¥${price.toLocaleString("en-US")}`;
};

export const skuColorLabel = (sku: ProductSku) => {
  const colorNames = sku.colors.map((color) => {
    const english = color.localizations.find(
      (localization) => localization.language_code === "en",
    );
    return english?.name ?? color.name;
  });

  return colorNames.join(" ");
};

export function swatchBackground(colors: ProductColor[]): string | undefined {
  const hexes = colors
    .map((c) => c.hex_code)
    .filter((hex): hex is string => !!hex);
  if (colors.length > 1 && hexes.length === colors.length) {
    const step = 100 / hexes.length;
    const stops = hexes
      .map((hex, i) => `${hex} ${i * step}% ${(i + 1) * step}%`)
      .join(", ");
    return `linear-gradient(135deg, ${stops})`;
  }
  const [color] = colors;
  if (color?.hex_code) {
    return color.hex_code;
  }
  if (color?.path) {
    return `url(${imageUrl(color.path)}) center/cover, #000000`;
  }
  return undefined;
}

const IMAGE_BACKGROUND_OVERRIDES: Record<string, string> = {
  "ML2007D-6S": "#f0f0f0",
  "ML2008D-6S": "#f0f0f0",
};

export const imageBackground = (entry: ProductEntry) => {
  return IMAGE_BACKGROUND_OVERRIDES[entry.product.code] ?? "#f7f7f7";
};
