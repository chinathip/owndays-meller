"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProductEntry } from "@/types/product";
import { formatYen, imageUrl, skuColorLabel } from "@/lib/products";

interface Props {
  entry: ProductEntry;
  onClose: () => void;
}

const MODAL_ANIMATION_MS = 250;

const CTA_BASE =
  "flex h-[48px] w-[328px] items-center justify-center rounded-full font-favorit text-[13px] font-bold leading-[17px] tracking-[0.525px] text-white lg:h-[54px] lg:w-[373px] lg:text-[16px] lg:leading-[20px] lg:tracking-[0.632px]";

export default function ProductModal({ entry, onClose }: Props) {
  const [skuIndex, setSkuIndex] = useState(0);
  const [closing, setClosing] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closingRef = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const sku = entry.skus[skuIndex];
  const { product, frame_types, selling_setting, localization } = entry;
  const stock = selling_setting.in_stock;
  const storeUrl = `https://www.owndays.com/jp/ja/products/${product.code}?sku=${sku.id}`;

  const requestClose = useCallback(() => {
    if (closingRef.current) {
      return;
    }
    closingRef.current = true;
    setClosing(true);
    closeTimer.current = setTimeout(onClose, MODAL_ANIMATION_MS);
  }, [onClose]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        requestClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      previous?.focus();
    };
  }, [requestClose]);

  return (
    <div
      data-state={closing ? "closed" : "open"}
      className="fixed inset-0 z-50"
    >
      <div
        onClick={requestClose}
        className="modal-overlay absolute inset-0 bg-black/40 backdrop-blur-[5px]"
      />

      <div className="modal-panel absolute bottom-[14px] left-[17px] right-[16px] top-[17px] overflow-y-auto rounded-[10px] bg-black lg:bottom-0 lg:left-auto lg:right-0 lg:top-0 lg:w-[616px] lg:rounded-l-[30px] lg:rounded-r-none">
        <div className="relative h-[335px] rounded-t-[10px] bg-[#f0f0f0] lg:h-[499px] lg:rounded-tl-[20px] lg:rounded-tr-none">
          <h2 className="absolute left-[13px] top-[22px] font-display text-[28px] font-black leading-[28px] tracking-[1.26px] text-brand lg:left-[27px] lg:top-0 lg:text-[35.83px] lg:leading-[81px]">
            {product.model_name}
          </h2>

          <ul
            key={sku.id}
            className="absolute left-0 top-[53px] flex h-[179px] w-full overflow-x-auto pl-[52.1px] pr-[42.1px] [scrollbar-width:none] lg:top-[51px] lg:h-[298px] lg:pl-[97.6px] lg:pr-[97.6px] [&::-webkit-scrollbar]:hidden"
          >
            {sku.images.map((image, i) => (
              <li
                key={image.id}
                className="relative h-[179px] w-[252.8px] shrink-0 -mx-[10px] last:mx-0 lg:h-[298px] lg:w-[420.87px]"
              >
                <Image
                  src={imageUrl(image.path)}
                  alt={`${product.model_name} ${sku.code} ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 421px, 253px"
                  className="object-contain mix-blend-multiply"
                />
              </li>
            ))}
          </ul>

          <div className="absolute inset-x-0 top-[224px] mx-auto flex w-[330px] flex-wrap items-center justify-center gap-x-[5px] lg:top-[355px] lg:w-[494px] lg:gap-x-[7px]">
            {entry.skus.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSkuIndex(i)}
                className={`flex h-[26px] items-center justify-center rounded-full border border-black px-[10px] font-favorit text-[8px] font-medium uppercase leading-[14px] tracking-[0.4385px] lg:text-[11px] ${
                  i === skuIndex ? "bg-black text-white" : "text-black"
                }`}
              >
                {skuColorLabel(s)}
              </button>
            ))}
          </div>
        </div>

        <div className="ml-[13px] mt-[47px] w-[328px] pb-[47px] text-white lg:ml-[61px] lg:mt-[79px] lg:w-[494px] lg:pb-[79px]">
          <dl className="flex flex-col gap-[14px] lg:ml-[2px] font-favorit text-[14px] font-medium leading-[19.87px] tracking-[0.63px]">
            <div className="flex h-[20px]">
              <dt className="w-[95.75px]">P/No.</dt>
              <dd>
                {product.code} {sku.code}
              </dd>
            </div>
            <div className="flex h-[20px]">
              <dt className="w-[95.75px]">TYPE</dt>
              <dd className="uppercase">{frame_types[0]?.code}</dd>
            </div>
            <div className="flex h-[20px]">
              <dt className="w-[95.75px]">PRICE</dt>
              <dd>
                {formatYen(selling_setting.price)}
                <span className="text-[13.55px]"> </span>
                <span className="text-[11px]">税込</span>
              </dd>
            </div>
          </dl>

          <p className="mt-[23px] font-noto text-[13px] font-medium leading-[32px] lg:text-[14px] lg:leading-[30px]">
            {localization.description}
          </p>

          <div className="mt-[30px] flex flex-col items-center gap-[5px] lg:gap-[10px]">
            {stock === 0 ? (
              <button
                type="button"
                disabled
                className={`${CTA_BASE} cursor-not-allowed bg-[#d9d9d9]`}
              >
                OUT OF STOCK
              </button>
            ) : (
              <a
                href={storeUrl}
                className={`${CTA_BASE} border-2 border-transparent bg-brand hover:border-black hover:bg-white hover:text-black`}
              >
                ONLINE STORE
              </a>
            )}
            <p className="w-full text-center font-noto text-[10px] font-medium leading-[30px] lg:text-[12px]">
              OWNDAYSオンラインストアに移動します
            </p>
          </div>
        </div>
      </div>

      <button
        ref={closeRef}
        type="button"
        onClick={requestClose}
        className="absolute right-[31px] top-[32px] h-[42px] w-[42px] lg:right-[15px] lg:top-[15px]"
      >
        <Image src="/icons/gridicons_cross.svg" alt="" width={42} height={42} />
      </button>
    </div>
  );
}
