import { getImageProps } from "next/image";

export default function Hero() {
  const common = { alt: "", fill: true, priority: true, sizes: "100vw" };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: "/images/hero/hero.png" });
  const {
    props: { srcSet: mobileSrcSet, ...imgProps },
  } = getImageProps({ ...common, src: "/images/hero/hero-mobile.png" });

  return (
    <section
      id="hero"
      className="relative h-[677px] w-full overflow-hidden bg-black lg:h-[635px] lg:border-b-2 lg:border-black"
    >
      <picture>
        <source media="(min-width: 1024px)" srcSet={desktopSrcSet} />
        <source srcSet={mobileSrcSet} />
        <img {...imgProps} alt="" className="object-cover" />
      </picture>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[88px] w-[263px] lg:h-[114px] lg:w-[412px]">
          <span className="absolute left-[3px] top-[20px] h-[50px] w-[258px] bg-black lg:left-[5px] lg:top-[16px] lg:h-[78px] lg:w-[405px]" />
          <h1 className="relative flex h-[88px] items-center justify-center font-display text-[70px] font-bold uppercase leading-[70px] text-brand lg:top-[-2px] lg:block lg:h-auto lg:text-center lg:text-[110px] lg:leading-[110px]">
            PRODUCTS
          </h1>
        </div>
      </div>
    </section>
  );
}
