import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="relative h-screen w-screen overflow-hidden">
      <Image
        src="/assets/landing-page/he.png"
        alt="Roommates managing shared expenses together"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
    </section>
  );
};

export default Hero;