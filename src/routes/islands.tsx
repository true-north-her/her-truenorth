import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowUpRight, Instagram, Linkedin, Mail, Youtube } from "lucide-react";

import { ArchipelagoClosing, ArchipelagoHero, ArchipelagoMap, IslandDetailSection, archipelagoIslands } from "@/components/truenorth/archipelago";
import { BrandMark, CompassDivider, EditorialLabel } from "@/components/truenorth/brand";
import { TrueNorthNavbar } from "@/components/truenorth/navbar";
import { SmoothScroll } from "@/components/smooth-scroll";
import { trueNorthLinks, trueNorthSocialLinks } from "@/lib/truenorth-links";

const SITE_URL = "https://her-truenorth.lovable.app/islands";

const socialIcons = {
  LinkedIn: Linkedin,
  Substack: Mail,
  YouTube: Youtube,
  Instagram,
} as const;

export const Route = createFileRoute("/islands")({
  staticData: { sitemap: true },
  component: IslandsPage,
  head: () => ({
    meta: [
      { title: "The Islands — The TrueNorth Archipelago" },
      {
        name: "description",
        content: "Explore the TrueNorth Archipelago: Blushwave Isle for creativity, Roselight Bay for stories, and North Star Kingdom for community and strategy.",
      },
      { property: "og:title", content: "The Islands — The TrueNorth Archipelago" },
      { property: "og:description", content: "Three islands, one shared horizon. Explore TrueNorth's creative, literary, and community worlds." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
});

function IslandsPage() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-archipelago-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.dataset["visible"] = "true");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).dataset["visible"] = "true";
        observer.unobserve(entry.target);
      }),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="islands-page truenorth-page overflow-hidden bg-background text-foreground">
      <SmoothScroll />
      <TrueNorthNavbar />
      <ArchipelagoHero />
      <ArchipelagoMap />
      <section className="island-details px-5 py-12 md:px-10 md:py-20" aria-label="Explore the islands in detail">
        <div className="island-details-heading mx-auto max-w-7xl">
          <EditorialLabel number="01">A closer look</EditorialLabel>
          <p className="mt-6 max-w-3xl font-display text-3xl leading-snug sm:text-4xl">Each island has its own work.<br /><em className="text-primary">All of them belong to TrueNorth.</em></p>
        </div>
        <div className="island-details-list mt-10 space-y-5 md:mt-14">
          {archipelagoIslands.map((island) => <IslandDetailSection key={island.id} island={island} />)}
        </div>
      </section>
      <ArchipelagoClosing />
      <footer className="islands-footer bg-primary px-5 py-10 text-primary-foreground md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <a href="/" aria-label="TrueNorth home"><BrandMark variant="monochrome" className="w-40" imageClassName="max-h-16" /></a>
            <p className="mt-3 text-sm text-primary-foreground/75">A calmer way to live, together.</p>
            <div className="mt-5 max-w-xs text-primary-foreground/70"><CompassDivider /></div>
          </div>
          <div className="flex flex-col gap-5 sm:items-end">
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-foreground/75" aria-label="Footer navigation">
              <a href="/#inside" className="hover:text-primary-foreground">Community</a>
              <a href="/#how" className="hover:text-primary-foreground">How it works</a>
              <a href="/#newsletter" className="hover:text-primary-foreground">Stay close</a>
              <a href={trueNorthLinks.substack} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-primary-foreground">Substack <ArrowUpRight aria-hidden="true" className="size-3" /></a>
            </nav>
            <nav className="footer-socials" aria-label="TrueNorth social links">
              {trueNorthSocialLinks.map((social) => {
                const Icon = socialIcons[social.label];
                return (
                  <a key={social.label} href={social.href} target={social.placeholder ? undefined : "_blank"} rel={social.placeholder ? undefined : "noreferrer"} aria-label={social.placeholder ? `${social.label} — link coming soon` : `TrueNorth on ${social.label}`} aria-disabled={social.placeholder || undefined} onClick={social.placeholder ? (event) => event.preventDefault() : undefined}>
                    <Icon aria-hidden="true" />
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </footer>
    </main>
  );
}