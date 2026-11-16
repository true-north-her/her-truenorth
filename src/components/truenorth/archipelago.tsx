import { useState } from "react";
import { ArrowDown, ArrowRight, Anchor, BookOpen, CalendarDays, Compass, Flower2, Lightbulb, Map, Newspaper, Pencil, Palette, Sparkles, Users } from "lucide-react";

import archipelagoArtwork from "@/assets/truenorth-archipelago-map.jpg";
import creativeArtwork from "@/assets/truenorth-island-creative.jpg";
import museArtwork from "@/assets/truenorth-island-muse.jpg";
import harborArtwork from "@/assets/truenorth-island-harbor.jpg";
import arrivalArtwork from "@/assets/truenorth-archipelago-arrival.jpg";
import seasideRose from "@/assets/truenorth-seaside-rose.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type IslandIcon = typeof Flower2;

type Island = {
  id: string;
  number: string;
  name: string;
  identity: string;
  tagline: string;
  description: string;
  activities: { label: string; icon: IslandIcon }[];
  lead: string;
  markerIcon: IslandIcon;
  mapPosition: string;
  artPosition: string;
  art: string;
  theme: "creative" | "muse" | "harbor";
};

export const archipelagoIslands: Island[] = [
  {
    id: "blushwave",
    number: "01",
    name: "Blushwave Isle",
    identity: "Creative Island",
    tagline: "Where imagination takes shape.",
    description: "Our home for creativity and design — from visual storytelling to creative campaigns, everything that brings ideas to life visually.",
    activities: [
      { label: "Graphic Design and Visual Identity", icon: Palette },
      { label: "Creative Campaigns", icon: Sparkles },
      { label: "Illustration and Digital Art", icon: Pencil },
      { label: "Creative Collaborations", icon: Flower2 },
    ],
    lead: "Abhijna Laxmi",
    markerIcon: Flower2,
    mapPosition: "creative",
    artPosition: "creative",
    art: creativeArtwork,
    theme: "creative",
  },
  {
    id: "roselight",
    number: "02",
    name: "Roselight Bay",
    identity: "Muse Island",
    tagline: "Where ideas find their words.",
    description: "Our space for writing, editing and publishing — where stories are crafted, refined and shared with the world.",
    activities: [
      { label: "Creative Writing and Storytelling", icon: BookOpen },
      { label: "Articles and Editorial Content", icon: Newspaper },
      { label: "Substack and Publishing", icon: Pencil },
      { label: "Reading and Writing Initiatives", icon: BookOpen },
    ],
    lead: "Niharika Niranjan",
    markerIcon: BookOpen,
    mapPosition: "muse",
    artPosition: "muse",
    art: museArtwork,
    theme: "muse",
  },
  {
    id: "north-star",
    number: "03",
    name: "North Star Kingdom",
    identity: "Harbor Circle",
    tagline: "Where people and possibilities meet.",
    description: "Our hub for community, experience and strategy — from member engagement to planning what's next for TrueNorth.",
    activities: [
      { label: "Community Engagement and Onboarding", icon: Users },
      { label: "Events and Member Experiences", icon: CalendarDays },
      { label: "Strategic Planning", icon: Lightbulb },
      { label: "Product and Initiative Coordination", icon: Compass },
    ],
    lead: "Komal Harshita",
    markerIcon: Anchor,
    mapPosition: "harbor",
    artPosition: "harbor",
    art: harborArtwork,
    theme: "harbor",
  },
];

function IslandMarker({ island, selected, onSelect }: { island: Island; selected: boolean; onSelect: (id: string) => void }) {
  const Icon = island.markerIcon;

  return (
    <a
      className={cn("archipelago-marker", `archipelago-marker-${island.mapPosition}`, selected && "is-selected")}
      href={`#island-${island.id}`}
      onMouseEnter={() => onSelect(island.id)}
      onFocus={() => onSelect(island.id)}
      onClick={() => onSelect(island.id)}
      aria-label={`Explore ${island.name}, ${island.identity}`}
      aria-controls={`island-${island.id}`}
    >
      <span className="archipelago-marker-icon"><Icon aria-hidden="true" strokeWidth={1.5} /></span>
      <span className="archipelago-marker-copy">
        <span className="archipelago-marker-name">{island.name}</span>
        <span className="archipelago-marker-identity">{island.identity}</span>
      </span>
      <span className="archipelago-marker-tip" aria-hidden="true">Explore this island</span>
    </a>
  );
}

export function ArchipelagoMap() {
  const [selectedIsland, setSelectedIsland] = useState(archipelagoIslands[2].id);

  return (
    <section id="archipelago-map" className="archipelago-map-section px-5 py-20 md:px-10 md:py-28" aria-labelledby="archipelago-map-title">
      <div className="mx-auto max-w-7xl">
        <header className="archipelago-reveal archipelago-map-heading" data-archipelago-reveal>
          <p className="archipelago-eyebrow"><Map aria-hidden="true" /> A little world of our own</p>
          <h2 id="archipelago-map-title" className="mt-5 font-display text-4xl leading-tight sm:text-6xl">Three islands.<br /><em>One shared horizon.</em></h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">Choose an island to find the corner of TrueNorth that feels most like you.</p>
        </header>

        <div className="archipelago-map-frame archipelago-reveal mt-12" data-archipelago-reveal>
          <img
            className="archipelago-map-art"
            src={archipelagoArtwork}
            alt="An illustrated coastal archipelago with a lighthouse harbor, flower gardens, and a seaside library, connected by sailing routes."
            width={1536}
            height={1024}
            loading="lazy"
          />
          <div className="archipelago-map-wash" aria-hidden="true" />
          {archipelagoIslands.map((island) => (
            <IslandMarker key={island.id} island={island} selected={selectedIsland === island.id} onSelect={setSelectedIsland} />
          ))}
          <div className="archipelago-map-compass" aria-hidden="true"><Compass strokeWidth={1} /><span>N</span></div>
          <p className="archipelago-map-caption"><Anchor aria-hidden="true" /> A community in three parts, and a thousand ways to belong.</p>
        </div>
        <nav className="archipelago-map-index" aria-label="Explore the three islands">
          {archipelagoIslands.map((island) => (
            <a key={island.id} href={`#island-${island.id}`} onMouseEnter={() => setSelectedIsland(island.id)} onFocus={() => setSelectedIsland(island.id)}>
              <span>{island.number}</span>{island.name}<ArrowRight aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}

export function IslandDetailSection({ island }: { island: Island }) {
  return (
    <article id={`island-${island.id}`} className={cn("island-detail-section px-5 py-10 md:px-10 md:py-12", `island-detail-${island.theme}`)} aria-labelledby={`island-title-${island.id}`} data-archipelago-reveal>
      <div className="island-detail-inner mx-auto max-w-7xl">
        <div className="island-detail-story">
          <p className="island-number">ISLAND {island.number}</p>
          <span className="island-identity">{island.identity}</span>
          <h2 id={`island-title-${island.id}`} className="island-title font-display">{island.name}</h2>
          <p className="island-tagline font-display"><em>{island.tagline}</em></p>
          <p className="island-description">{island.description}</p>
        </div>

        <div className="island-detail-activities">
          <p className="island-activities-label">Key activities</p>
          <ul>
            {island.activities.map(({ label, icon: Icon }) => (
              <li key={label}><Icon aria-hidden="true" strokeWidth={1.6} /><span>{label}</span></li>
            ))}
          </ul>
          <div className="island-lead"><span className="island-lead-icon"><Users aria-hidden="true" /></span><span className="island-lead-caption">Island lead</span><strong>{island.lead}</strong></div>
        </div>

        <figure className={cn("island-detail-art", `island-art-${island.artPosition}`)}>
          <img src={island.art} alt={`${island.name}: ${island.identity} island in the TrueNorth illustrated archipelago.`} width={1104} height={720} loading="lazy" />
          <figcaption><Compass aria-hidden="true" /> {island.identity}</figcaption>
        </figure>
      </div>
    </article>
  );
}

export function ArchipelagoHero() {
  return (
    <section id="islands-top" className="archipelago-hero px-5 py-8 md:px-10 md:py-12" aria-labelledby="islands-title">
      <div className="archipelago-hero-inner mx-auto max-w-7xl">
        <div className="archipelago-hero-copy archipelago-reveal" data-archipelago-reveal>
          <p className="archipelago-eyebrow"><Compass aria-hidden="true" /> The TrueNorth Archipelago</p>
          <h1 id="islands-title" className="archipelago-hero-title font-display">Welcome to the <em>TrueNorth Archipelago!</em></h1>
          <div className="archipelago-hero-description">
            <p>Welcome to the TrueNorth archipelago!</p>
            <p>We&apos;ve divided the different kinds of work happening within TrueNorth into three islands.</p>
            <p>Each island has a distinct focus, its own activities and a team lead who will help coordinate its work.</p>
            <p>Blushwave Isle is our Creative Island. Roselight Bay is our Muse Island. And North Star Kingdom is our Harbor Circle.</p>
            <p>Together, they cover creativity and design, writing and publishing, and community and strategy.</p>
          </div>
          <Button asChild size="lg" className="archipelago-explore-button mt-7">
            <a href="#archipelago-map">Explore the islands <ArrowDown aria-hidden="true" /></a>
          </Button>
        </div>
        <figure className="archipelago-hero-image archipelago-reveal" data-archipelago-reveal>
          <img src={arrivalArtwork} alt="A pastel sunset over a calm beach, with three islands on the horizon and a rose beside the shore." width={1600} height={960} fetchPriority="high" />
          <figcaption className="font-script">A softer way to find your way.</figcaption>
        </figure>
        <span className="archipelago-hero-stamp" aria-hidden="true"><Compass strokeWidth={0.8} /><span>Three islands<br />Shared horizons</span></span>
      </div>
    </section>
  );
}

export function ArchipelagoClosing() {
  return (
    <section className="archipelago-closing px-5 py-20 md:px-10 md:py-24" aria-labelledby="archipelago-closing-title">
      <img className="archipelago-closing-art" src={arrivalArtwork} alt="" aria-hidden="true" width={1600} height={960} loading="lazy" />
      <div className="archipelago-closing-content mx-auto grid max-w-7xl gap-8 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center">
        <Compass className="archipelago-closing-compass" aria-hidden="true" strokeWidth={0.8} />
        <div>
          <p className="archipelago-eyebrow">One archipelago, one community</p>
          <h2 id="archipelago-closing-title" className="mt-4 font-display text-4xl leading-tight sm:text-5xl"><em>Different islands. Shared horizons.</em></h2>
          <p className="mt-5 max-w-3xl leading-7">Together, Blushwave Isle, Roselight Bay and North Star Kingdom bring together creativity and design, writing and publishing, and community and strategy. Different paths, shared purpose, and a community that grows together.</p>
          <p className="mt-4 font-display text-xl text-primary">Different islands. Shared horizons. One TrueNorth.</p>
        </div>
        <Button asChild size="lg" className="archipelago-explore-button">
          <a href="/#newsletter">Be part of the Archipelago <ArrowRight aria-hidden="true" /></a>
        </Button>
      </div>
    </section>
  );
}

export { IslandMarker };