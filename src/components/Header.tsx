"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { NAV_ITEMS, SUB_ITEMS } from "@/lib/navigation";

const MENU_ANIMATION_MS = 250;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const closeMenu = () => {
    if (menuClosing) {
      return;
    }
    setMenuClosing(true);
    closeTimer.current = setTimeout(() => {
      setMenuOpen(false);
      setMenuClosing(false);
    }, MENU_ANIMATION_MS);
  };

  return (
    <header id="top" className="fixed inset-x-0 top-0 z-40 bg-brand">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-[23px] lg:px-[70px] lg:py-[25px]">
        <a href="#top">
          <Image
            src="/logo/Collab-Logo-mobile.svg"
            alt=""
            width={240}
            height={16}
            priority
            className="lg:hidden"
          />
          <Image
            src="/logo/Collab-Logo.svg"
            alt=""
            width={351}
            height={52}
            priority
            className="hidden lg:block"
          />
        </a>

        <nav className="hidden gap-[50px] lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`font-favorit text-[15px] ${item.desktopWeight} uppercase leading-5 tracking-[0.7px] text-white`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="flex h-6 w-5 items-center justify-center lg:hidden"
        >
          <Image src="/icons/menu.svg" alt="" width={20} height={15} />
        </button>
      </div>

      {menuOpen && (
        <div
          data-state={menuClosing ? "closed" : "open"}
          className="menu-root fixed inset-0 z-50 text-white lg:hidden"
        >
          <div
            onClick={closeMenu}
            className="absolute inset-0 bg-black/40 backdrop-blur-[5px]"
          />
          <div className="absolute bottom-[17px] left-[17px] right-[16px] top-[17px] rounded-[10px] bg-black" />
          <button
            type="button"
            onClick={closeMenu}
            className="absolute right-[31px] top-[32px] h-[42px] w-[42px]"
          >
            <Image
              src="/icons/gridicons_cross.svg"
              alt=""
              width={42}
              height={42}
            />
          </button>
          <div className="absolute left-[57px] top-[97px] flex flex-col items-start gap-[60px]">
            <nav className="flex flex-col items-start gap-[25px]">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="font-favorit text-[18px] font-bold uppercase leading-5 h-[21px] tracking-[0.7px]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <ul className="flex flex-col items-start gap-[15px]">
              {SUB_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`font-favorit text-[11px] ${item.weight} uppercase leading-5 tracking-[0.7px]`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
