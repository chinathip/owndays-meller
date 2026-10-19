import Image from "next/image";
import { NAV_ITEMS, SUB_ITEMS } from "@/lib/navigation";

export default function Footer() {
  return (
    <footer className="bg-black text-brand">
      <div className="border-t-2 border-brand pb-[30px] lg:hidden">
        <nav>
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="flex h-[58px] w-[calc(100%-1px)] items-center justify-between border-b-2 border-brand pl-[30px] font-favorit text-[14px] font-bold uppercase leading-5 tracking-[0.70332px]"
                >
                  {item.label}
                  <span className="relative mr-[19px] h-[28px] w-[28px]">
                    <Image
                      src="/icons/arrow-right.svg"
                      alt=""
                      width={8}
                      height={14}
                      className="absolute left-[10.67px] top-[7.17px]"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex h-[102px] w-[calc(100%-1px)] items-center justify-center border-b-2 border-brand">
          <div className="flex w-[329px] items-center justify-between">
            <a href="#" className="flex items-center gap-[3.83px]">
              <Image src="/icons/cart.svg" alt="" width={24} height={24} />
              <span className="relative top-[1px] font-favorit text-[16px] font-medium uppercase leading-[13px] tracking-[0.454px]">
                ONLINE STORE
              </span>
            </a>
            <a href="#" className="flex items-center gap-[6.4px]">
              <span className="font-favorit text-[11.27px] font-medium uppercase leading-4 tracking-[0.5635px]">
                OWNDAYS.COM
              </span>
              <Image
                src="/icons/external-link.svg"
                alt=""
                width={14}
                height={13}
              />
            </a>
          </div>
        </div>

        <ul className="ml-[30px] mt-[30px] flex flex-col items-start gap-[4px]">
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

        <a
          href="#"
          className="ml-[26px] mt-[30px] flex h-[24px] w-[24px] items-center justify-center"
        >
          <Image src="/icons/instagram.svg" alt="" width={16} height={16} />
        </a>

        <div className="mt-[30px] border-t-2 border-brand" />

        <p className="ml-[32px] mt-[28px] w-[325px] text-right font-favorit text-[10px] uppercase leading-5 tracking-[0.7px]">
          COPYRIGHT (C) OWNDAYS co., ltd. ALL RIGHTS RESERVED.
        </p>
      </div>

      <div className="relative mx-auto hidden h-[400px] w-full max-w-[1440px] lg:block">
        <nav className="absolute left-[4.86%] top-[69px]">
          <ul className="flex flex-col gap-[20px]">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="block h-[21px] font-favorit text-[18px] font-bold uppercase leading-5 tracking-[0.70332px]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#"
          className="absolute left-[4.86%] top-[227px] flex h-[24px] w-[24px] items-center justify-center"
        >
          <Image src="/icons/instagram.svg" alt="" width={16} height={16} />
        </a>

        <a
          href="#"
          className="absolute left-[75.07%] top-[122px] flex items-start gap-[8.7px]"
        >
          <Image src="/icons/cart.svg" alt="" width={37} height={37} />
          <span className="mt-[10px] font-favorit text-[21px] font-medium uppercase leading-5 tracking-[0.7px]">
            ONLINE STORE
          </span>
        </a>
        <a
          href="#"
          className="absolute left-[77.57%] top-[179px] flex items-start"
        >
          <span className="w-[114.4px] text-center font-favorit text-[14px] font-medium uppercase leading-5 tracking-[0.7px]">
            OWNDAYS.COM
          </span>
          <Image
            src="/icons/external-link.svg"
            alt=""
            width={17}
            height={15}
            className="ml-[7.6px] mt-[2px]"
          />
        </a>

        <div className="absolute left-[64.67%] top-0 h-[320px] border-l-2 border-brand" />
        <div className="absolute left-0 top-[320px] w-[99.79%] border-t-2 border-brand" />

        <ul className="absolute left-[4.83%] top-[350px] flex gap-[40px]">
          {SUB_ITEMS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`font-favorit text-[13px] ${item.weight} uppercase leading-5 tracking-[0.7px]`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="absolute right-[4.44%] top-[350px] w-[383px] whitespace-nowrap text-right font-favorit text-[12px] uppercase leading-5 tracking-[0.7px]">
          COPYRIGHT (C) OWNDAYS co., ltd. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
