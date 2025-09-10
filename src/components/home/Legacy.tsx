import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SplitText from "gsap/dist/SplitText";
import { useEffect, useRef, useState } from "react";

export default function Legacy() {
  const [fontLoaded, setfontLoaded] = useState(false);
  const legacySectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.fonts.ready.then(() => setfontLoaded(true));
  }, []);

  useEffect(() => {
    if (!legacySectionRef.current || !fontLoaded) return;
    gsap.registerPlugin(SplitText, ScrollTrigger);

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(legacySectionRef.current);
      const legacyTitle = q(".legacy-title");
      const legacyDesc = q(".legacy-desc");
      const legacyButton = q(".legacy-button");

      const legacyTitleSplit = new SplitText(legacyTitle, {
        type: "lines, chars",
        charsClass: "legacy-char-title",
        linesClass: "legacy-line-title",
      });
      const legacyDescSplit = new SplitText(legacyDesc, {
        type: "lines, chars",
        charsClass: "legacy-char-desc",
        linesClass: "legacy-line-desc",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: legacySectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1.2,
          pin: true,
        },
      });

      tl.to(legacyTitleSplit.chars, {
        filter: "blur(0px)",
        opacity: 1,
        stagger: 0.04,
        duration: 0.5,
      })
        .to(
          legacyDescSplit.chars,
          {
            y: 0,
            duration: 0.5,
            stagger: 0.02,
            ease: "power2.inOut",
          },
          "-=1"
        )
        .to(
          legacyButton,
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
          },
          "-=0.5"
        );

      // tl.play();
    });

    return () => ctx.revert();
  }, [fontLoaded]);

  return (
    <section
      ref={legacySectionRef}
      className="flex items-center justify-center flex-col gap-4 min-h-screen p-4 md:p-8"
    >
      <h3 className=" max-w-[35pc] text-center font-medium legacy-title">
        A Legacy That Inspires Generations.
      </h3>
      <p className="max-w-[18pc] text-center legacy-desc max-md:text-sm">
        For over 70 years, Porsche has redefined what it means to drive and the
        journey continues.
      </p>
      <div className="overflow-hidden rounded-lg">
        <button className="bg-primary py-4 px-6 rounded-lg font-raleway legacy-button opacity-0 translate-y-full capitalize font-medium">
          Book a Test Drive
        </button>
      </div>
    </section>
  );
}
