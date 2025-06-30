import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FAF3EB]">
      <section className="h-[100svh] w-full overflow-hidden">
        <div className="relative flex h-full">
          {/* Info block: now in normal flow, left-aligned */}
          <div className="font-NHD mt-8 flex flex-col gap-2 self-start px-4 text-base text-lime-900 md:mt-32 md:px-8 md:text-lg">
            <nav className="flex flex-col gap-1">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <Link href="/about" className="hover:underline">
                About
              </Link>
              <Link href="/services" className="hover:underline">
                Services
              </Link>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </nav>
            <address className="mt-3 leading-tight not-italic">
              Eden Park & Garden
              <br />
              123 Garden Lane
              <br />
              City, Country
              <br />
              info@edenpark.com
              <br />
              +1 234 567 8900
            </address>
            {/* <span className="mt-2 text-xs text-lime-900/60">
              © {currentYear} Eden Park & Garden
            </span> */}
          </div>

          {/* Decorative plant image (absolute) */}
          <div className="absolute top-[-20%] right-[-10%] z-10">
            <Image
              src="/images/plants-png.webp"
              alt="Plants decoration"
              width={300}
              height={200}
              className="h-auto w-auto"
              priority
            />
          </div>

          {/* Logo (absolute, centered at bottom) */}
          <div className="absolute bottom-0 left-1/2 w-[90vw] -translate-x-1/2 md:w-[75vw]">
            <img src="/logo2.svg" alt="Logo green" className="h-auto w-full" />
          </div>
        </div>
      </section>
    </footer>
  );
}
