import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Compass, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/truenorth/brand";
import { trueNorthLinks } from "@/lib/truenorth-links";

const navigation = [
  { id: "inside", label: "Inside the community" },
  { id: "how", label: "How it grows" },
  { id: "team", label: "Meet the team" },
  { id: "newsletter", label: "Connect with us" },
] as const;

const wavePath = Array.from({ length: 24 }, (_, i) => `${i === 0 ? "M0 2.5" : ""} Q${i * 60 + 15} 0 ${i * 60 + 30} 2.5 T${i * 60 + 60} 2.5`).join(" ");

function CoastalProgress({ fillRef }: { fillRef: React.RefObject<SVGSVGElement | null> }) {
  return (
    <div className="coastal-progress" aria-hidden="true">
      <svg viewBox="0 0 1440 5" preserveAspectRatio="none" className="coastal-wave-track"><path d={wavePath} /></svg>
      <svg ref={fillRef} viewBox="0 0 1440 5" preserveAspectRatio="none" className="coastal-wave-fill">
        <defs><linearGradient id="coastal-progress-ink"><stop className="wave-start" /><stop offset="100%" className="wave-end" /></linearGradient></defs>
        <path d={wavePath} stroke="url(#coastal-progress-ink)" />
      </svg>
    </div>
  );
}

export function TrueNorthNavbar() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const fillRef = useRef<SVGSVGElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const available = document.documentElement.scrollHeight - window.innerHeight;
      const progress = available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0;
      fillRef.current?.style.setProperty("clip-path", `inset(0 ${(1 - progress) * 100}% 0 0)`);
      headerRef.current?.toggleAttribute("data-scrolled", window.scrollY > 12);
      const boundary = window.innerHeight * .35;
      let active = "";
      navigation.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= boundary) active = id;
      });
      if (progress >= .999) active = "newsletter";
      headerRef.current?.querySelectorAll<HTMLAnchorElement>("[data-chapter]").forEach((link) => {
        if (link.dataset["chapter"] === active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.documentElement);
    observer.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    update();
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1100px)");
    const resize = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    desktop.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
      desktop.removeEventListener("change", resize);
    };
  }, [open]);

  const join = <Button asChild className="navbar-cta"><a href={trueNorthLinks.foundingCircle} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Join the circle <ArrowUpRight className="size-4" aria-hidden="true" /></a></Button>;
  const links = navigation.map(({ id, label }) => <Button key={id} asChild variant="ghost" className="navbar-pill"><a href={`#${id}`} data-chapter={id} onClick={() => setOpen(false)}>{label}</a></Button>);

  return (
    <header ref={headerRef} className="truenorth-navbar">
      <div className="navbar-surface">
        <Compass className="navbar-watermark" strokeWidth={.6} aria-hidden="true" />
        <div className="navbar-inner">
          <a href="#top" className="navbar-logo" aria-label="TrueNorth home" onClick={() => setOpen(false)}><BrandMark variant="symbol" imageClassName="navbar-logo-image" /></a>
          <nav className="navbar-desktop" aria-label="Main navigation">{links}</nav>
          <div className="navbar-desktop-cta">{join}</div>
          <Button ref={toggleRef} variant="ghost" size="icon" className="navbar-menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</Button>
        </div>
      </div>
      <CoastalProgress fillRef={fillRef} />
      <nav id="mobile-navigation" className="navbar-mobile" aria-label="Mobile navigation" hidden={!open}>{links}{join}</nav>
    </header>
  );
}