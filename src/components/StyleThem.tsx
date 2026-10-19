"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductEntry } from "@/types/product";
import ProductModal from "./ProductModal";

const VISIBILITY = {
  mobile: "lg:hidden",
  desktop: "hidden lg:block",
} as const;

interface StylePhoto {
  src: string;
  model: string;
  only?: "mobile" | "desktop";
}

const STYLE_PHOTOS: StylePhoto[] = [
  { src: "/images/style/00-jamil.jpg", model: "JAMIL", only: "desktop" },
  { src: "/images/style/01-cumbi.jpg", model: "CUMBI", only: "mobile" },
  { src: "/images/style/02-tana.jpg", model: "TANA" },
  { src: "/images/style/03-nayah.jpg", model: "NAYAH" },
  { src: "/images/style/04-cumbi.jpg", model: "CUMBI" },
  { src: "/images/style/05-nayah.jpg", model: "NAYAH" },
  { src: "/images/style/06-cumbi.jpg", model: "CUMBI", only: "mobile" },
  { src: "/images/style/13-kessie.jpg", model: "KESSIE", only: "desktop" },
  { src: "/images/style/07-nayah.jpg", model: "NAYAH" },
  { src: "/images/style/08-cumbi.jpg", model: "CUMBI" },
  { src: "/images/style/09-nayah.jpg", model: "NAYAH", only: "mobile" },
  { src: "/images/style/14-adisa.jpg", model: "ADISA", only: "desktop" },
  { src: "/images/style/10-tana.jpg", model: "TANA", only: "mobile" },
  { src: "/images/style/15-chauen.jpg", model: "CHAUEN", only: "desktop" },
  { src: "/images/style/11-nayah.jpg", model: "NAYAH", only: "mobile" },
  { src: "/images/style/16-adisa.jpg", model: "ADISA", only: "desktop" },
  { src: "/images/style/12-tana.jpg", model: "TANA", only: "mobile" },
  { src: "/images/style/17-tana.jpg", model: "TANA", only: "desktop" },
];

const TITLE_LINE =
  "relative block text-center font-display text-[160px] font-bold leading-[160px] text-brand";

interface Props {
  products: ProductEntry[];
}

export default function StyleThem({ products }: Props) {
  const [selectedProduct, setSelectedProduct] = useState<ProductEntry | null>(
    null,
  );

  return (
    <section className="bg-brand">
      <h2 className="relative z-10 px-4 lg:px-[70px]">
        <Image
          src="/images/style/how-to-style-them.png"
          alt="How to style them"
          width={593}
          height={290}
          className="block h-auto w-[296.42px] lg:hidden"
        />
        <span className="hidden lg:block">
          <span className={`${TITLE_LINE} h-[160px] w-[433px]`}>
            <span className="absolute left-[6.92px] top-[27px] h-[112px] w-[422px] bg-black" />
            <span className="relative">HOW TO</span>
          </span>
          <span className={`${TITLE_LINE} -mt-[20px] h-[160px] w-[674px]`}>
            <span className="absolute left-[1.92px] top-[27px] h-[112px] w-[665px] bg-black" />
            <span className="relative">STYLE THEM</span>
          </span>
        </span>
      </h2>

      <ul className="-mt-[44px] flex scroll-smooth overflow-x-auto [scrollbar-width:none] lg:-mt-[78px] lg:border-t-2 lg:border-black [&::-webkit-scrollbar]:hidden">
        {STYLE_PHOTOS.map((photo, i) => (
          <li
            key={photo.src}
            className={`relative h-[494px] w-[327.05px] shrink-0 lg:h-[613px] lg:w-[405.1px] ${photo.only ? VISIBILITY[photo.only] : ""}`}
          >
            <div className="relative h-[492.39px] lg:h-[611px]">
              <Image
                src={photo.src}
                alt={`${photo.model} styling photo ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 406px, 328px"
                className="object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                const entry = products.find(
                  (product) => product.product.model_name === photo.model,
                );
                if (entry) {
                  setSelectedProduct(entry);
                }
              }}
              className="absolute bottom-0 right-0 rounded-full h-[56.41px] w-[56.41px] bg-brand lg:h-[70px] lg:w-[70px]"
            >
              <Image
                src="/icons/plus.svg"
                alt=""
                width={47}
                height={47}
                className="absolute left-[8.86px] top-[9.67px] h-[37.88px] w-[37.88px] lg:left-[11px] lg:top-[12px] lg:h-[47px] lg:w-[47px]"
              />
            </button>
          </li>
        ))}
      </ul>

      {selectedProduct && (
        <ProductModal
          entry={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
