import type { ProductSku } from "@/types/product";
import { swatchBackground } from "@/lib/products";

interface Props {
  sku: ProductSku;
  selected: boolean;
  onSelect: () => void;
}

export default function ColorSwatch({ sku, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative h-[38px] w-[38px] shrink-0 rounded-full ${
        selected ? "shadow-[0_0_0_1px_#ff6723]" : "shadow-[0_0_0_1px_#999999]"
      }`}
    >
      <span
        className="absolute inset-[5px] rounded-full"
        style={{ background: swatchBackground(sku.colors) }}
      />
    </button>
  );
}
