import Image from "next/image";
import TestimonialsAvatars from "./TestimonialsAvatars";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
        <div className="flex items-center">
          <Image src="/laurel.png" alt="Icon" width={30} height={30} />
          <h2 className="text-xl text-accent font-semibold ml-2"> The #1 AI QR-code generator</h2> 
        </div>
        <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
          Turn QR-codes into art
        </h1>

        <p className="text-lg opacity-80 leading-relaxed">
          Generate beautiful QR codes in seconds with our AI QR Art generator.
          Pick a style & download your unique QR-code.
        </p>
        <a href="/create-qr" className="btn btn-primary btn-wide">Generate QR</a>


        <TestimonialsAvatars priority={true} />
      </div>
      <div className="lg:w-full">
        <Image
          src="/hero.webp"
          alt="Product Demo"
          className="max-w-lg©"
          priority={true}
          width={500}
          height={500}
        />
      </div>
    </section>
  );
};

export default Hero;
