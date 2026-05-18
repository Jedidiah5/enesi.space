import Image from "next/image";
import type { AboutBrand } from "@/types/content";

type Props = {
  title: string;
  brands: AboutBrand[];
};

export function AboutBrands({ title, brands }: Props) {
  if (!brands.length) return null;

  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <h2 className="text-center text-sm text-ana-muted md:text-[15px]">{title}</h2>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-14">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex h-10 min-w-[4.5rem] items-center justify-center grayscale opacity-50 transition hover:opacity-80"
            >
              {brand.logoUrl ? (
                <Image src={brand.logoUrl} alt={brand.name} width={100} height={40} className="h-8 w-auto object-contain" />
              ) : (
                <span className="text-sm font-bold tracking-tight text-ana-ink">{brand.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
