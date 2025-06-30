import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FAF3EB]">
      <section className="h-[100svh] w-full overflow-hidden">
        <div className="relative flex h-full items-center justify-center">
          <div className="absolute -top-30 -right-50 z-10">
            <Image
              src="/images/plants-png.webp"
              alt="Plants decoration"
              width={300}
              height={200}
              className="h-auto w-auto"
            />
          </div>

          <div className="absolute bottom-0 left-1/2 w-[90vw] -translate-x-1/2 md:w-[75vw]">
            <img src="/logo2.svg" alt="Logo green" className="h-auto w-full" />
          </div>
        </div>
      </section>
    </footer>
  );
}
