import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Compass, Heart, MessageCircle, Sparkles } from "lucide-react";

import communityImage from "@/assets/truenorth-community.jpg";
import { Button } from "@/components/ui/button";

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

const interestFormUrl = "https://forms.google.com";

const activities = [
  ["01", "Girl Circles", "Five to ten girls, one honest topic, one unhurried hour."],
  ["02", "Weekly questions", "A thoughtful prompt to answer in your own time, without performing."],
  ["03", "Skill Swaps", "Girls teaching girls — from resumes and interviews to Canva and code."],
  ["04", "The Girl I Needed", "The things we wish someone had told us, passed from one girl to another."],
];

function Index() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <header className="absolute inset-x-0 top-0 z-20 border-b border-foreground/10">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="TrueNorth home">
            <span className="grid size-9 place-items-center rounded-full border border-foreground/20">
              <Compass className="size-5 text-primary" aria-hidden="true" />
            </span>
            <span className="font-display text-xl font-semibold">TrueNorth</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm md:flex" aria-label="Main navigation">
            <a className="transition-colors hover:text-primary" href="#inside">Inside the community</a>
            <a className="transition-colors hover:text-primary" href="#how">How it grows</a>
          </nav>
          <Button asChild size="default">
            <a href={interestFormUrl} target="_blank" rel="noreferrer">Join the circle <ArrowRight className="size-4" /></a>
          </Button>
        </div>
      </header>

      <section id="top" className="relative min-h-[92svh] border-b border-foreground/10 pt-20">
        <div className="absolute inset-y-0 right-0 hidden w-[45%] bg-sage md:block" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[calc(92svh-5rem)] max-w-7xl items-center gap-8 px-5 py-10 md:grid-cols-[1.05fr_.95fr] md:gap-10 md:px-10 md:py-14">
          <div className="relative z-10 max-w-2xl">
            <p className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              <Sparkles className="size-3.5" /> Built with girls, not for them
            </p>
            <h1 className="font-display text-6xl leading-[.94] font-medium sm:text-7xl lg:text-8xl">
              A calmer way<br />to <em className="text-primary">live.</em>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">
              A community where young women can speak openly, reflect honestly, and build the things they actually need — together.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <a href={interestFormUrl} target="_blank" rel="noreferrer">Join the Founding Circle <ArrowRight className="size-4" /></a>
              </Button>
              <a href="#inside" className="inline-flex min-h-12 items-center gap-2 px-2 text-sm font-semibold text-foreground hover:text-primary">
                See what we’re building <ArrowDown className="size-4" />
              </a>
            </div>
            <p className="mt-5 hidden max-w-md text-sm leading-6 text-muted-foreground sm:block">
              We’re starting small: 20–30 genuinely interested girls who want to help shape what comes next.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-xl md:ml-8">
            <div className="rotate-[-1.5deg] border border-foreground/15 bg-card p-3 shadow-editorial">
              <img src={communityImage} width={1600} height={1104} alt="Four young women sharing a relaxed conversation on a university lawn" className="h-52 w-full object-cover sm:h-auto sm:aspect-[4/3]" />
              <div className="flex items-center justify-between px-2 pb-1 pt-3 text-xs text-muted-foreground">
                <span>Real conversations, small circles.</span><span>01 / 04</span>
              </div>
            </div>
            <div className="absolute -bottom-7 -left-4 max-w-56 rotate-2 bg-clay p-5 text-sm leading-6 text-clay-foreground shadow-editorial md:-left-12">
              <Heart className="mb-3 size-4" />
              No follower counts. No pressure to have it figured out.
            </div>
          </div>
        </div>
      </section>

      <div className="ticker border-b border-foreground/10 bg-paper py-4" aria-hidden="true">
        <div className="ticker-track font-display text-lg italic text-primary">
          listen first <span>✦</span> reflect honestly <span>✦</span> build together <span>✦</span> grow calmly <span>✦</span> listen first <span>✦</span> reflect honestly <span>✦</span> build together <span>✦</span> grow calmly <span>✦</span>
        </div>
      </div>

      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[.7fr_1.3fr]">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-sage-foreground">The shift</p>
          <div>
            <h2 className="max-w-4xl font-display text-4xl leading-tight sm:text-6xl">Less performing your life.<br /><em className="text-primary">More understanding it.</em></h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">The internet gives us endless places to be seen. TrueNorth is a quieter place to be known — by other girls, and by yourself.</p>
            <div className="mt-14 grid gap-px bg-border sm:grid-cols-2">
              <div className="bg-background p-7 sm:p-9"><p className="mb-5 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">The usual noise</p><p className="font-display text-2xl leading-snug">“Am I doing enough? Does everyone else have this figured out?”</p></div>
              <div className="bg-sage p-7 sm:p-9"><p className="mb-5 text-xs font-bold uppercase tracking-[0.14em] text-sage-foreground">With TrueNorth</p><p className="font-display text-2xl leading-snug">“What do I actually need — and who can I figure it out with?”</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="inside" className="bg-ink px-5 py-24 text-ink-foreground md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-sage-light">Inside the community</p>
          <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-3xl font-display text-5xl leading-tight sm:text-6xl">A few things we hold close.</h2>
            <p className="max-w-sm leading-7 text-ink-muted">Not content pillars for a feed. Starting points for better conversations and useful things we can make together.</p>
          </div>
          <div className="mt-16 grid gap-px border-y border-ink-border bg-ink-border md:grid-cols-3">
            {[
              ["01", "Reflection & wellness", "Sleep, stress, confidence, body image, dating and everything between — through lived experience, never prescriptions."],
              ["02", "Girls talking to girls", "Small, informal conversations about college, friendships, independence, career anxiety and the things we rarely say out loud."],
              ["03", "Mentorship, made human", "Real women sharing real experience — not from a stage, but through direct, generous conversations."],
            ].map(([number, title, copy]) => (
              <article key={number} className="min-h-80 bg-ink p-7 md:p-9">
                <span className="font-display text-lg text-sage-light">{number}</span>
                <h3 className="mt-20 font-display text-3xl">{title}</h3>
                <p className="mt-4 leading-7 text-ink-muted">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 md:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">What happens here</p><h2 className="mt-5 font-display text-5xl leading-tight sm:text-6xl">Small ideas.<br />Real participation.</h2></div>
            <p className="max-w-lg text-lg leading-8 text-muted-foreground md:justify-self-end">We’re not launching everything at once. We’re beginning with simple rituals that make room for honesty, usefulness and a little joy.</p>
          </div>
          <div className="mt-16 divide-y divide-border border-y border-border">
            {activities.map(([number, title, copy]) => (
              <article key={number} className="group grid gap-4 py-7 md:grid-cols-[80px_1fr_1.2fr] md:items-center">
                <span className="font-display text-primary">{number}</span>
                <h3 className="font-display text-3xl transition-transform group-hover:translate-x-1">{title}</h3>
                <p className="leading-7 text-muted-foreground">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="border-y border-foreground/10 bg-paper px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">How TrueNorth grows</p>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-5xl leading-tight sm:text-6xl">We don’t build first<br />and listen later.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">The community comes first. Every useful tool begins with a real, repeated need — not a trend, assumption, or sales target.</p>
          <div className="mt-16 grid gap-5 text-left md:grid-cols-3">
            {[
              [MessageCircle, "Community", "Girls gather in small, honest spaces and talk about what’s actually going on."],
              [Sparkles, "Insight", "We listen for shared problems through conversation, reflection and anonymous questions."],
              [Compass, "Product", "Only validated needs become tools — shaped and tested with the people they’re for."],
            ].map(([Icon, title, copy], index) => {
              const ItemIcon = Icon as typeof Compass;
              return <article key={title as string} className="border-t-2 border-primary bg-background p-7"><div className="flex items-center justify-between"><ItemIcon className="size-6 text-primary" /><span className="text-xs text-muted-foreground">0{index + 1}</span></div><h3 className="mt-12 font-display text-3xl">{title as string}</h3><p className="mt-4 leading-7 text-muted-foreground">{copy as string}</p></article>;
            })}
          </div>
        </div>
      </section>

      <section id="founding" className="relative overflow-hidden bg-clay px-5 py-24 text-clay-foreground md:px-10 md:py-32">
        <div className="absolute -right-20 -top-20 size-72 rounded-full border border-clay-foreground/15" aria-hidden="true" />
        <div className="absolute -right-4 top-12 size-44 rounded-full border border-clay-foreground/15" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.25fr_.75fr] md:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em]">The first 20–30</p><h2 className="mt-5 max-w-3xl font-display text-5xl leading-tight sm:text-7xl">Come help shape the circle.</h2><p className="mt-7 max-w-2xl text-lg leading-8 opacity-80">The Founding Circle won’t just join TrueNorth. You’ll suggest conversations, test ideas, share honest feedback and help decide what this community becomes.</p></div>
          <div className="md:text-right"><Button asChild size="lg" className="bg-ink text-ink-foreground hover:bg-ink/90"><a href={interestFormUrl} target="_blank" rel="noreferrer">I’m interested <ArrowRight className="size-4" /></a></Button><p className="mt-4 text-sm opacity-70">No polished answers required.</p></div>
        </div>
      </section>

      <footer className="bg-ink px-5 py-10 text-ink-foreground md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div><div className="flex items-center gap-3"><Compass className="size-6 text-sage-light" /><span className="font-display text-2xl">TrueNorth</span></div><p className="mt-3 text-sm text-ink-muted">A calmer way to live, together.</p></div>
          <div className="flex flex-wrap gap-6 text-sm text-ink-muted"><a href="#inside" className="hover:text-ink-foreground">Community</a><a href="#how" className="hover:text-ink-foreground">How it works</a><a href={interestFormUrl} target="_blank" rel="noreferrer" className="hover:text-ink-foreground">Join the circle</a></div>
        </div>
      </footer>
    </main>
  );
}
