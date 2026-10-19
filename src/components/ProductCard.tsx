"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductEntry } from "@/types/product";
import { formatYen, imageBackground, imageUrl } from "@/lib/products";
import ColorSwatch from "./ColorSwatch";
import ProductModal from "./ProductModal";

const MAX_SWATCHES = 4;

interface Props {
  entry: ProductEntry;
}

export default function ProductCard({ entry }: Props) {
  const [skuIndex, setSkuIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sku = entry.skus[skuIndex];
  const image = sku.images[0];

  return (
    <article className="relative border-2 border-black bg-white pb-[30px] pl-[12.85px] pr-[13.78px] pt-[12.75px] lg:border-0 lg:pb-[37.8px] lg:pl-[17.55px] lg:pr-[18.65px] lg:pt-[14.75px]">
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="absolute inset-0 z-10"
      />
      <div
        className="relative h-[248.25px] lg:h-[293.45px]"
        style={{ backgroundColor: imageBackground(entry) }}
      >
        {image && (
          <Image
            src={imageUrl(image.path)}
            alt={`${entry.product.model_name} ${sku.code}`}
            fill
            sizes="(min-width: 1024px) 422px, 357px"
            className="object-contain mix-blend-multiply"
          />
        )}
      </div>

      <div className="mt-[17px] flex h-[71px] items-center justify-between gap-[21px] lg:mt-[22.3px] lg:h-[83.7px]">
        <div className="min-w-0">
          <h2 className="font-display text-[50px] lg:text-[52.72px] h-[68px] font-black leading-[67.51px] tracking-[1.05px] text-black">
            {entry.product.model_name}
          </h2>
          <p className="font-favorit mt-[0.53px] h-[22px] text-[16px] leading-[21.94px] tracking-[0.7px] text-black">
            {entry.product.code} {sku.code}
          </p>
        </div>

        <div className="relative z-20 flex shrink-0 flex-col items-end gap-[15px]">
          <div className="flex gap-[3px]">
            {entry.skus.slice(0, MAX_SWATCHES).map((s, i) => (
              <ColorSwatch
                key={s.id}
                sku={s}
                selected={i === skuIndex}
                onSelect={() => setSkuIndex(i)}
              />
            ))}
          </div>
          <p className="font-gt text-[23.47px] font-medium leading-[27.14px] tracking-[0.86px] text-black">
            {formatYen(entry.selling_setting.price)}
            <span className="font-favorit text-[15.81px]">+tax</span>
          </p>
        </div>
      </div>

      {isModalOpen && (
        <ProductModal entry={entry} onClose={() => setIsModalOpen(false)} />
      )}
    </article>
  );
}
