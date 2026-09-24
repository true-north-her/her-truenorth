import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Compass } from "lucide-react";

import compassPoster from "@/assets/truenorth-compass-poster.jpg.asset.json";
import compassVideo from "@/assets/truenorth-compass.mp4.asset.json";
import compassVideoWebm from "@/assets/truenorth-compass.webm.asset.json";
import seasideRose from "@/assets/truenorth-seaside-rose.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { SmoothScroll } from "@/components/smooth-scroll";
import { BrandMark, CompassDivider, EditorialLabel } from "@/components/truenorth/brand";
import { trueNorthLinks } from "@/lib/truenorth-links";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "TrueNorth — A Calmer Way to Live" },
      {
        name: "description",
        content:
          "A community where young women connect, reflect honestly, and build what they actually need — together.",
      },
      { property: "og:title", content: "TrueNorth — A Calmer Way to Live" },
      {
        property: "og:description",
        content: "A calmer community for honest reflection, real conversation, and mutual support.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const experiences = [
  { number: "01", title: "Girl Circles", lines: ["Five to ten girls.", "One honest topic.", "One unhurried hour."], className: "experience-primary" },
  { number: "02", title: "Weekly Questions", lines: ["A thoughtful question.", "No perfect answer required."], className: "experience-weekly" },
  { number: "03", title: "Skill Swaps", lines: ["Girls teaching girls.", "From resumes and interviews to Canva and code."], className: "experience-skills" },
  { number: "04", title: "The Girl I Needed", lines: ["The things we wish someone had told us,", "passed from one girl to another."], className: "experience-needed" },
];

const loopStages = [
  ["01", "Community", "Girls gather in small, honest spaces."],
  ["02", "Insight", "Shared needs become clearer through conversation."],
  ["03", "Build", "Useful ideas are shaped together, not assumed."],
  ["04", "Test", "Small experiments meet real life before they grow."],
  ["05", "Listen", "What we learn returns to the community."],
];

function Index() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-story-reveal]");
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
      { threshold: 0.16 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <SmoothScroll />
      <header className="absolute inset-x-0 top-0 z-20 border-b border-foreground/15">
        <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 md:flex md:justify-between md:px-10">
          <a href="#top" className="hero-reveal hero-reveal-brand min-w-0" aria-label="TrueNorth home">
            <BrandMark variant="wordmark" className="w-36" imageClassName="max-h-11" />
          </a>
          <nav className="hero-reveal hero-reveal-actions hidden items-center gap-8 text-sm md:flex" aria-label="Main navigation">
            <a className="transition-colors hover:text-primary" href="#inside">Inside the community</a>
            <a className="transition-colors hover:text-primary" href="#how">How it grows</a>
          </nav>
          <div className="hero-reveal hero-reveal-actions">
            <Button asChild size="default">
              <a href={trueNorthLinks.foundingCircle} target="_blank" rel="noreferrer">Join the circle <ArrowRight className="size-4" /></a>
            </Button>
          </div>
        </div>
      </header>

      <section id="top" className="relative isolate flex min-h-[100svh] items-end overflow-hidden border-b border-foreground/10 pt-20">
        <video
          className="hero-video absolute inset-0 -z-20 size-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={compassPoster.url}
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={compassVideoWebm.url} type="video/webm" />
          <source src={compassVideo.url} type="video/mp4" />
        </video>
        <div className="hero-video-overlay absolute inset-0 -z-10" aria-hidden="true" />

        <div className="mx-auto flex w-full max-w-7xl items-end px-5 pb-14 pt-28 sm:pb-16 md:px-10 md:pb-20 lg:pb-24">
          <div className="max-w-2xl">
            <p className="hero-reveal hero-reveal-brand mb-4 font-script text-2xl text-primary sm:text-3xl">
              find your way back to yourself
            </p>
            <h1 className="hero-reveal hero-reveal-headline font-display text-5xl leading-[.96] font-medium sm:text-7xl lg:text-8xl">
              A calmer way<br />to <em className="text-primary">live.</em>
            </h1>
            <p className="hero-reveal hero-reveal-copy mt-6 max-w-xl text-base leading-7 text-foreground/80 sm:text-lg sm:leading-8">
              A smaller corner of the internet for women figuring life out — together.
            </p>
            <div className="hero-reveal hero-reveal-actions mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg">
                <a href={trueNorthLinks.foundingCircle} target="_blank" rel="noreferrer">Join the Founding Circle <ArrowRight className="size-4" /></a>
              </Button>
              <Button asChild size="lg" variant="ghost" className="px-3 text-foreground hover:bg-background/55">
                <a href={trueNorthLinks.substack} target="_blank" rel="noreferrer">Read the Substack <ArrowUpRight className="size-4" /></a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="shift" className="story-shift border-b border-foreground/10 px-5 py-32 md:px-10 md:py-48 lg:py-56">
        <div className="mx-auto max-w-6xl">
          <div className="story-reveal grid gap-12 md:grid-cols-[.34fr_1fr]" data-story-reveal>
            <EditorialLabel number="01">The shift</EditorialLabel>
            <div>
              <h2 className="max-w-4xl font-display text-5xl leading-[1.03] sm:text-7xl lg:text-8xl">
                Less performing<br />your life.
                <em className="mt-2 block text-primary">More understanding it.</em>
              </h2>
              <div className="mt-16 grid gap-8 border-t border-foreground/15 pt-8 md:grid-cols-[1fr_.5fr] md:gap-16">
                <p className="max-w-2xl font-display text-2xl leading-snug sm:text-3xl">The internet gives us endless places to be seen. TrueNorth is a quieter place to be known.</p>
                <p className="max-w-sm leading-7 text-muted-foreground">By other girls, and by yourself. A place where reflection comes before reaction, and depth matters more than frequency.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="inside" className="story-community bg-paper px-5 py-28 md:px-10 md:py-44">
        <div className="mx-auto max-w-6xl">
          <header className="story-reveal grid gap-10 md:grid-cols-[.55fr_1fr] md:items-end" data-story-reveal>
            <div>
              <EditorialLabel number="02" className="mb-8">Inside the community</EditorialLabel>
              <Compass className="size-8 text-primary/55" strokeWidth={1.2} aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-display text-5xl leading-[1.04] sm:text-7xl">What happens when<br /><em className="text-primary">we slow down?</em></h2>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">TrueNorth isn’t about adding another place to perform. It’s about creating space for honest conversations, reflection, and connection.</p>
            </div>
          </header>

          <div className="experience-layout mt-24 md:mt-36">
            {experiences.map((experience) => (
              <article key={experience.number} className={`story-reveal experience-moment group ${experience.className}`} data-story-reveal tabIndex={0}>
                <div className="experience-rule" aria-hidden="true"><span /></div>
                <div className="flex items-center gap-3 text-primary"><Compass className="size-4" strokeWidth={1.25} aria-hidden="true" /><span className="font-display text-lg">{experience.number}</span></div>
                <h3 className="mt-8 font-display text-4xl leading-none sm:text-5xl">{experience.title}</h3>
                <p className="mt-5 font-display text-xl leading-snug text-muted-foreground sm:text-2xl">{experience.lines.map((line) => <span key={line} className="block">{line}</span>)}</p>
                <span className="experience-detail mt-7 block text-xs font-bold uppercase tracking-[0.15em] text-primary">A moment to arrive as you are</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="story-transition border-y border-foreground/10 bg-background px-5 py-24 md:px-10 md:py-32">
        <div className="story-reveal mx-auto grid max-w-6xl gap-12 md:grid-cols-[.72fr_1fr] md:items-center md:gap-20" data-story-reveal>
          <figure className="editorial-image relative aspect-[4/5] overflow-hidden rounded-editorial">
            <img src={seasideRose.url} alt="A rose resting at the edge of calm ocean waves" className="size-full object-cover" loading="lazy" />
            <figcaption className="absolute inset-x-5 bottom-5 font-script text-2xl text-white">softness through change</figcaption>
          </figure>
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <CompassDivider />
            <p className="mt-10 font-display text-3xl leading-snug sm:text-4xl">We listen to what happens here.<br /><em className="text-primary">Then we decide what deserves to be built.</em></p>
            <ArrowDown className="mt-10 size-5 text-primary/60" strokeWidth={1.25} aria-hidden="true" />
          </div>
        </div>
      </div>

      <section id="how" className="bg-white px-5 py-28 text-foreground md:px-10 md:py-44">
        <div className="mx-auto max-w-6xl">
          <header className="story-reveal grid gap-10 md:grid-cols-[.55fr_1fr] md:items-end" data-story-reveal>
            <EditorialLabel number="03">How TrueNorth grows</EditorialLabel>
            <div><h2 className="font-display text-5xl leading-[1.04] sm:text-7xl">We don’t build first<br /><em className="text-coastal-foreground">and listen later.</em></h2><p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">The community comes first. Useful things emerge from needs we hear more than once — then return to the community to be shaped again.</p></div>
          </header>

          <div className="story-reveal mt-24 md:mt-36" data-story-reveal>
            <div className="loop-layout" aria-label="The TrueNorth community-led building loop">
              <div className="loop-center"><Compass className="mx-auto size-7 text-coastal-foreground" strokeWidth={1.1} aria-hidden="true" /><p className="mt-4 font-display text-2xl leading-tight">Built with you,<br /><em>not for you.</em></p></div>
              {loopStages.map(([number, title, copy], index) => (
                <article key={title} className={`loop-stage loop-stage-${index + 1}`} tabIndex={0}>
                  <span className="text-xs text-coastal-foreground">{number}</span>
                  <h3 className="mt-2 font-display text-3xl">{title}</h3>
                  <p className="loop-detail mt-3 max-w-48 text-sm leading-6 text-muted-foreground">{copy}</p>
                </article>
              ))}
              <div className="loop-orbit" aria-hidden="true" />
            </div>
            <p className="mt-14 text-center font-script text-2xl text-primary">Listen, learn, make something small, and listen again.</p>
          </div>
        </div>
      </section>

      <section id="founding" className="relative overflow-hidden bg-secondary px-5 py-28 text-foreground md:px-10 md:py-40">
        <div className="founding-compass absolute -right-24 -top-24 size-80 rounded-full border border-clay-foreground/15" aria-hidden="true"><span /><span /></div>
        <div className="story-reveal relative mx-auto max-w-6xl" data-story-reveal>
          <EditorialLabel number="04" className="mb-16">The Founding Circle</EditorialLabel>
          <div className="grid gap-14 md:grid-cols-[1.15fr_.85fr] md:items-end">
            <div><h2 className="max-w-3xl font-display text-5xl leading-[1.04] sm:text-7xl">We’re starting small<br /><em>on purpose.</em></h2><p className="mt-7 max-w-2xl text-lg leading-8 opacity-80">The first 20–30 members aren’t simply an audience. They’ll help shape the conversations, experiments, priorities, and what gets built next.</p></div>
            <div className="border-t border-foreground/20 pt-8 md:justify-self-end"><p className="mb-7 max-w-sm font-display text-2xl leading-snug">Come as you are. Bring your questions, your experience, and your honest point of view.</p><Button asChild size="lg"><a href={trueNorthLinks.foundingCircle} target="_blank" rel="noreferrer">Become part of the Founding Circle <ArrowRight className="size-4" /></a></Button><p className="mt-4 text-sm opacity-70">No polished answers required.</p></div>
          </div>
        </div>
      </section>

      <footer className="bg-primary px-5 py-10 text-primary-foreground md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div><BrandMark variant="monochrome" className="w-40" imageClassName="max-h-16" /><p className="mt-3 text-sm text-primary-foreground/75">A calmer way to live, together.</p></div>
          <div className="flex flex-wrap gap-6 text-sm text-primary-foreground/75"><a href="#inside" className="hover:text-primary-foreground">Community</a><a href="#how" className="hover:text-primary-foreground">How it works</a><a href={trueNorthLinks.foundingCircle} target="_blank" rel="noreferrer" className="hover:text-primary-foreground">Join the circle</a></div>
        </div>
      </footer>
    </main>
  );
}
