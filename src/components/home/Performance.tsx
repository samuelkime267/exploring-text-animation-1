import { useEffect, useRef } from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import { performance } from "@/data/performance.data";
import useWindowSize from "@/hooks/useWindowSize";

export default function Performance() {
  const performanceSectionRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();

  useEffect(() => {
    if (!performanceSectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(performanceSectionRef.current);
      const performanceIntroText = q(".performance-intro-text");

      const performanceIntroContainer = q(".performance-intro-container");
      const builtForContainer = q(".built-for-container");

      const tl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: performanceIntroContainer,
          start: "top top",
          end: `+=280% bottom`,
          // markers: true,
          scrub: 1,
          pin: true,
          pinSpacing: false,
        },
      });

      tl.to(performanceIntroText, {
        fontSize: width > 767 ? "1.5rem" : "1rem",
        color: "black",
        duration: 1,
      }).addPause(2);

      builtForContainer.forEach((el) => {
        const children = [...el.children];

        const elHeight = el.clientHeight;
        const screenHeight = window.innerHeight;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: `top ${screenHeight - elHeight}px`,
            end: `top top`,
            toggleActions: "play none none reverse",
          },
          defaults: {
            duration: 0.3,
          },
        });

        children.forEach((child) => {
          const isImg = child.classList.contains("built-for-img-container");
          const isText = child.classList.contains("build-for-text-container");

          if (isImg) {
            const img = gsap.utils.selector(child)("img");
            tl.to(img, {
              translateX: 0,
            });
          }
          if (isText) {
            const overlayText = gsap.utils.selector(child)(".overlay-text");
            tl.to(overlayText, {
              width: "100%",
            });
          }
        });
      });
    });

    return () => ctx.revert();
  }, [width]);

  function handleMouseEnter(e: React.MouseEvent<HTMLElement>) {
    const parent = (e.currentTarget as HTMLElement).closest(
      ".performance-container"
    );
    if (!parent) return;

    const backgroundOverlay = parent.querySelector(
      ".background-overlay"
    ) as HTMLElement;
    if (!backgroundOverlay) return;

    const rect = parent.getBoundingClientRect();
    const mouseY = e.clientY;

    // Entry direction
    const enteredFromTop = mouseY < rect.top + rect.height / 2;

    gsap.fromTo(
      backgroundOverlay,
      {
        translateY: enteredFromTop ? "-100%" : "100%",
      },
      {
        translateY: "0%",
        duration: 0.3,
      }
    );
  }

  function handleMouseLeave(e: React.MouseEvent<HTMLElement>) {
    const parent = (e.currentTarget as HTMLElement).closest(
      ".performance-container"
    );
    if (!parent) return;

    const backgroundOverlay = parent.querySelector(
      ".background-overlay"
    ) as HTMLElement;
    if (!backgroundOverlay) return;

    const rect = parent.getBoundingClientRect();
    const mouseY = e.clientY;

    // Leave direction
    const leavingFromTop = mouseY < rect.top + rect.height / 2;

    gsap.to(backgroundOverlay, {
      translateY: leavingFromTop ? "-100%" : "100%",
      duration: 0.3,
    });
  }

  return (
    <section ref={performanceSectionRef} className="space-y-12 relative">
      <div className="px-8 h-screen flex items-center justify-center flex-col overflow-hidden performance-intro-container">
        <p className="text-center capitalize text-white text-[1000000000rem] performance-intro-text text-nowrap">
          For decades, Porsche has <br /> engineered the ultimate driving
          experience <br />
          built on
        </p>
      </div>

      <div className="mt-[100vh] md:mt-[120vh] performance-content-container relative z-[10] bg-white">
        {performance.map((row, i) => {
          return (
            <div
              key={i}
              className="relative overflow-hidden performance-container"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative z-[2]">
                {i === 0 && <div className="h-0.5 w-full bg-black" />}
                <div
                  className="flex items-center justify-start gap-2 md:gap-8 px-4 md:px-8 py-4 built-for-container"
                  key={i}
                >
                  {row.map(({ alt, img, text }, i) => {
                    if (text) {
                      return (
                        <div
                          className="relative build-for-text-container"
                          key={i}
                        >
                          <p className="text-4xl md:text-7xl lg:text-9xl font-semibold uppercase text-neutral-300">
                            {text}
                          </p>
                          <p className="text-4xl md:text-7xl lg:text-9xl font-semibold uppercase text-nowrap overflow-hidden absolute top-0 left-0 w-0 overlay-text">
                            {text}
                          </p>
                        </div>
                      );
                    }
                    if (alt && img) {
                      return (
                        <div
                          className="h-[4.5rem] lg:h-32 w-full overflow-hidden built-for-img-container rounded-full"
                          key={i}
                        >
                          <img
                            src={img}
                            alt={alt}
                            className="w-full h-full object-cover rounded-full -translate-x-full"
                          />
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="h-0.5 w-full bg-black" />
              </div>
              <div className="absolute top-0 left-0 w-full h-full  bg-primary translate-y-full background-overlay" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
