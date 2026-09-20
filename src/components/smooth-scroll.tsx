import { useEffect, useRef } from "react";

const chapterIds = ["inside", "how", "founding"] as const;

export function SmoothScroll() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    const setActiveChapter = (id?: string) => {
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
        const isCurrent = Boolean(id) && link.hash === `#${id}`;
        link.toggleAttribute("data-current", isCurrent);
        if (isCurrent) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };

    const start = async () => {
      cleanup?.();
      cleanup = undefined;
      setActiveChapter();
      if (!desktopQuery.matches || reducedMotionQuery.matches) {
        if (progressRef.current) progressRef.current.style.transform = "scaleX(0)";
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

      const updateProgress = () => {
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${lenis.progress})`;
        }
      };

      const frame = (time: number) => {
        lenis.raf(time);
        updateProgress();
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
        lenis.scrollTo(destination, { duration: 1.15 });
      };

      const chapterObserver = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (visible?.target.id) setActiveChapter(visible.target.id);
        },
        { rootMargin: "-28% 0px -52%", threshold: [0, 0.2, 0.5] },
      );

      chapterIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section) chapterObserver.observe(section);
      });
      document.addEventListener("click", clickHandler);
      frameId = window.requestAnimationFrame(frame);

      cleanup = () => {
        window.cancelAnimationFrame(frameId);
        document.removeEventListener("click", clickHandler);
        chapterObserver.disconnect();
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

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={progressRef} />
    </div>
  );
}