import Lenis from "lenis";
import { gsap } from "./gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initLenis() {
  const lenis = new Lenis();

  // Use GSAP's ticker instead of a separate RAF loop to avoid timing conflicts
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // GSAP time is seconds, Lenis expects ms
  });

  // Disable lag smoothing so scroll updates aren't delayed
  gsap.ticker.lagSmoothing(0);

  // Keep ScrollTrigger in sync with Lenis scroll position
  lenis.on("scroll", ScrollTrigger.update);

  return lenis;
}
