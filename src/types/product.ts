export interface ProductColor {
  id: number;
  code: string;
  name: string;
  hex_code: string | null;
  path: string | null;
  localizations: { language_code: string; name: string }[];
}

export interface ProductImage {
  id: number;
  path: string;
  order: number;
}

export interface ProductSku {
  id: number;
  code: string;
  order: number;
  colors: ProductColor[];
  images: ProductImage[];
}

export interface ProductEntry {
  product: { id: number; code: string; model_name: string };
  localization: { description: string | null };
  frame_types: { id: number; code: string }[];
  selling_setting: { price: number; in_stock: number };
  skus: ProductSku[];
}

export interface ProductsResponse {
  success: boolean;
  total: number;
  data: ProductEntry[];
}
