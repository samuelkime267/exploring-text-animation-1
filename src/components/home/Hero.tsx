import porscheImg from "@/assets/images/porsche.jpg";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitText from "gsap/dist/SplitText";

export default function Hero() {
  const [fontLoaded, setfontLoaded] = useState(false);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tl = useRef<GSAPTimeline>(gsap.timeline({ paused: true }));

  useEffect(() => {
    document.fonts.ready.then(() => setfontLoaded(true));
  }, []);

  useEffect(() => {
    if (!heroSectionRef.current || !tl.current || !fontLoaded) return;
    gsap.registerPlugin(SplitText);

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(heroSectionRef.current);
      const heroTitle = q(".hero-title");
      const heroDesc = q(".hero-desc");
      const heroButton = q(".hero-button");
      const heroImg = q(".hero-img");

      const heroTitleSplit = new SplitText(heroTitle, {
        type: "lines, chars",
        charsClass: "char-title",
        linesClass: "line-title",
      });
      const heroDescSplit = new SplitText(heroDesc, {
        type: "lines, chars",
        charsClass: "char-title",
        linesClass: "line-title",
      });

      tl.current
        .to(heroImg, {
          scale: 1,
          duration: 2,
          ease: "power4.inOut",
        })
        .to(
          heroTitleSplit.chars,
          {
            y: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: "power2.inOut",
          },
          "-=1.4"
        )
        .to(
          heroDescSplit.chars,
          {
            y: 0,
            duration: 0.2,
            stagger: 0.01,
            ease: "power2.inOut",
          },
          "-=1"
        )
        .to(
          heroButton,
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
          },
          "-=0.5"
        );

      tl.current.play();
    });

    return () => ctx.revert();
  }, [fontLoaded]);

  return (
    <section ref={heroSectionRef} className="relative w-full h-screen">
      <div className="w-full h-screen relative z-[2] p-4 md:p-8 bg-black/50 flex flex-col items-start justify-end">
        <div className="space-y-4">
          <h1 ref={titleRef} className="text-white font-medium hero-title">
            Engineered for <br /> Timeless Performance.
          </h1>
          <div className="flex md:items-center md:justify-start max-md:flex-col gap-4">
            <p className="text-white md:max-w-[21pc] hero-desc max-md:text-sm">
              A legacy of design, precision, and speed that defines the future
              of driving
            </p>
            <div className="overflow-hidden rounded-lg">
              <button className="bg-primary py-4 px-6 rounded-lg font-raleway hero-button opacity-0 translate-y-full capitalize font-medium">
                Explore models
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-full h-full bg-black overflow-hidden">
        <img
          src={porscheImg}
          alt="Porsche"
          className="w-full h-full object-cover hero-img scale-150"
        />
      </div>
    </section>
  );
}
