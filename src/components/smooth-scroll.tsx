import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    const start = async () => {
      cleanup?.();
      cleanup = undefined;
      if (!desktopQuery.matches || reducedMotionQuery.matches) {
        return;
      }

      const { default: Lenis } = await import("lenis");
      if (cancelled || !desktopQuery.matches || reducedMotionQuery.matches) return;

      const lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
      });
      let frameId = 0;

      const frame = (time: number) => {
        lenis.raf(time);
        frameId = window.requestAnimationFrame(frame);
      };

      const clickHandler = (event: MouseEvent) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        const link = target.closest<HTMLAnchorElement>('a[href^="#"]');
        if (!link || link.target || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const destination = document.querySelector<HTMLElement>(link.hash);
        if (!destination) return;
        event.preventDefault();
        window.history.pushState(null, "", link.hash);
        const offset = -parseFloat(window.getComputedStyle(destination).scrollMarginTop || "0");
        lenis.scrollTo(destination, { duration: 1.15, offset, onComplete: () => {
          if (!destination.hasAttribute("tabindex")) {
            destination.setAttribute("tabindex", "-1");
            destination.addEventListener("blur", () => destination.removeAttribute("tabindex"), { once: true });
          }
          destination.focus({ preventScroll: true });
        } });
      };
      document.addEventListener("click", clickHandler);
      frameId = window.requestAnimationFrame(frame);

      cleanup = () => {
        window.cancelAnimationFrame(frameId);
        document.removeEventListener("click", clickHandler);
        lenis.destroy();
      };
    };

    const restart = () => void start();
    void start();
    desktopQuery.addEventListener("change", restart);
    reducedMotionQuery.addEventListener("change", restart);

    return () => {
      cancelled = true;
      cleanup?.();
      desktopQuery.removeEventListener("change", restart);
      reducedMotionQuery.removeEventListener("change", restart);
    };
  }, []);

  return null;
}