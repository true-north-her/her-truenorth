import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { trueNorthLinks } from "@/lib/truenorth-links";

type FoundingPillar = {
  title: string;
  items: string[];
};

const foundingPillars: FoundingPillar[] = [
  {
    title: "What you'll do",
    items: [
      "Join weekly discussions and Girl Circles",
      "Ask — and answer — questions, anonymously if you prefer",
      "Share ideas, feedback, and early experiments",
      "Help us see what works and what doesn't",
    ],
  },
  {
    title: "What we ask of you",
    items: [
      "Be genuine — you don't need the perfect answer or story",
      "Be respectful — every perspective is welcome here",
      "Protect privacy — never share someone's story without their permission",
      "You never owe the community a personal story",
    ],
  },
  {
    title: "What we promise you",
    items: [
      "To listen to the community, always",
      "To respect your privacy and ask consent before using your story",
      "To be transparent about what we're testing",
      "To keep this space low-pressure, never performative",
    ],
  },
];

const foundingFinds = [
  "Weekly Prompts",
  "Girl Circles",
  "Anonymous Question Box",
  "Community Stories",
  "Women Around Me",
  "Borrow Her Brain",
  "Early TrueNorth Experiments",
];

const APPLICATION_DEADLINE = "19 October 2026";

function Sunburst() {
  const rayCount = 23;
  const rays = Array.from({ length: rayCount }, (_, index) => {
    const angle = (-84 + (index / (rayCount - 1)) * 168) * (Math.PI / 180);
    const isLong = index % 2 === 0;
    const inner = isLong ? 38 : 42;
    const outer = isLong ? 98 : 74;
    const dotRadius = outer + 10;
    return {
      x1: 150 + Math.sin(angle) * inner,
      y1: 138 - Math.cos(angle) * inner,
      x2: 150 + Math.sin(angle) * outer,
      y2: 138 - Math.cos(angle) * outer,
      dot: index % 3 === 1,
      dx: 150 + Math.sin(angle) * dotRadius,
      dy: 138 - Math.cos(angle) * dotRadius,
      dotSize: index % 6 === 1 ? 2.4 : 1.6,
    };
  });

  return (
    <svg viewBox="0 0 300 150" className="founding-sunburst" aria-hidden="true" focusable="false">
      {rays.map((ray, index) => (
        <g key={index}>
          <line x1={ray.x1} y1={ray.y1} x2={ray.x2} y2={ray.y2} />
          {ray.dot ? <circle cx={ray.dx} cy={ray.dy} r={ray.dotSize} /> : null}
        </g>
      ))}
      <path d="M 108 138 A 42 42 0 0 1 192 138" fill="none" />
    </svg>
  );
}

function FoundingCircle() {
  return (
    <section id="founding" className="founding-section px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-5xl text-center">
        <div className="story-reveal" data-story-reveal>
          <p className="founding-eyebrow" aria-label="The Founding Circle">
            <span className="font-display text-lg" aria-hidden="true">04</span>
            <span className="founding-eyebrow-rule" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-[0.18em]">The Founding Circle</span>
          </p>
          <p className="founding-greeting">
            <span className="font-display">hey,</span> <span className="font-script">dreamer</span>
          </p>
          <h2 className="founding-declaration mx-auto max-w-2xl">
            We&rsquo;re looking for our first girls —<br />
            and we <strong>so</strong> hope one of them is you.
          </h2>
          <div className="founding-letter mx-auto mt-10 max-w-xl">
            <p>
              TrueNorth is still at its very beginning. Some things will work, some won&rsquo;t, and some
              ideas will change along the way — that&rsquo;s exactly why the Founding Circle exists. We
              don&rsquo;t have all the answers yet, and we&rsquo;d rather discover them with the people
              we&rsquo;re building for.
            </p>
            <p>
              As one of our first 20–30 members, you won&rsquo;t just watch TrueNorth grow. You&rsquo;ll
              experience it, question it, and help shape what it becomes — one honest conversation at a
              time. Come as you are, bring your perspective, and share only what you&rsquo;re comfortable
              sharing.
            </p>
          </div>
        </div>

        <div className="story-reveal founding-grid mt-16 md:mt-20" data-story-reveal>
          {foundingPillars.map((pillar) => (
            <article key={pillar.title} className="founding-column">
              <h3>{pillar.title}</h3>
              <ul>
                {pillar.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="story-reveal mt-14 md:mt-16" data-story-reveal>
          <p className="founding-finds-label">What you&rsquo;ll find here</p>
          <ul className="founding-chips mt-6">
            {foundingFinds.map((find) => (
              <li key={find}>{find}</li>
            ))}
          </ul>
        </div>

        <div className="story-reveal founding-cta mt-16 md:mt-20" data-story-reveal>
          <p className="founding-deadline">
            <span className="founding-deadline-dot" aria-hidden="true" />
            Applications close · {APPLICATION_DEADLINE}
          </p>
          <div className="mt-7 flex justify-center">
            <Button asChild size="lg">
              <a href={trueNorthLinks.foundingCircle} target="_blank" rel="noreferrer">
                Join the Founding Circle <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
          <p className="founding-note mt-5">No polished answers required — just you, as you are.</p>
        </div>

        <Sunburst />
      </div>
    </section>
  );
}

export { FoundingCircle, foundingFinds, foundingPillars };
