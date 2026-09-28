import { useState } from "react";
import { Compass, Sparkles } from "lucide-react";

import abhijnaImage from "@/assets/ABHIJNA-LAXMI.png.asset.json";
import komalImage from "@/assets/KOMAL-HARSHITA.png.asset.json";
import niharikaImage from "@/assets/NIHARIKA-NIRANJAN.png.asset.json";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TeamTheme = "connector" | "dreamer" | "builder";

type TeamMember = {
  id: string;
  number: string;
  name: string;
  firstName: string;
  lastName: string;
  archetype: string;
  description: string;
  keywords: string[];
  label: string;
  image: string;
  alt: string;
  theme: TeamTheme;
};

const teamMembers: TeamMember[] = [
  {
    id: "abhijna",
    number: "01",
    name: "Abhijna Laxmi",
    firstName: "Abhijna",
    lastName: "Laxmi",
    archetype: "The Connector",
    description: "Bringing people, ideas, and possibilities closer.",
    keywords: ["People", "Community", "Connection"],
    label: "Connecting women",
    image: abhijnaImage.url,
    alt: "Abhijna Laxmi — The Connector, TrueNorth",
    theme: "connector",
  },
  {
    id: "niharika",
    number: "02",
    name: "Niharika Niranjan",
    firstName: "Niharika",
    lastName: "Niranjan",
    archetype: "The Dreamer",
    description: "Imagining possibilities before they have a name.",
    keywords: ["Ideas", "Possibility", "Imagination"],
    label: "Imagining what could be",
    image: niharikaImage.url,
    alt: "Niharika Niranjan — The Dreamer, TrueNorth",
    theme: "dreamer",
  },
  {
    id: "komal",
    number: "03",
    name: "Komal Harshita",
    firstName: "Komal",
    lastName: "Harshita",
    archetype: "The Builder",
    description: "Turning ideas into things people can experience.",
    keywords: ["Build", "Create", "Impact"],
    label: "Turning ideas into reality",
    image: komalImage.url,
    alt: "Komal Harshita — The Builder, TrueNorth",
    theme: "builder",
  },
];

const DEFAULT_ACTIVE_MEMBER = "komal";

function CardMotif({ theme }: { theme: TeamTheme }) {
  return (
    <div className="team-card-motif" aria-hidden="true">
      <span className="team-orbit" />
      <span className="team-horizon" />
      <span className="team-path" />
      <span className="team-star team-star-one" />
      <span className="team-star team-star-two" />
      <span className="team-petal" />
      <span className="team-grid" />
      {theme === "dreamer" ? <Sparkles className="team-motif-icon" strokeWidth={1.1} /> : <Compass className="team-motif-icon" strokeWidth={1} />}
    </div>
  );
}

function TeamCard({ member, active, onActivate }: { member: TeamMember; active: boolean; onActivate: () => void }) {
  return (
    <article className={cn("team-card", `team-card-${member.theme}`, active && "is-active")}>
      <Button
        type="button"
        variant="ghost"
        className="team-card-button"
        onMouseEnter={onActivate}
        onFocus={onActivate}
        onClick={onActivate}
        aria-expanded={active}
        aria-label={`Show ${member.name}'s story`}
      >
        <div className="team-card-heading">
          <span className="team-annotation">{member.number} / {member.archetype}</span>
          <h3 className="team-name" aria-label={member.name}>
            <span>{active ? member.firstName : member.firstName}</span>
            <span className="team-last-name">{member.lastName}</span>
          </h3>
          <span className="team-role">{member.archetype}</span>
        </div>

        <div className="team-expanded-copy" aria-hidden={!active}>
          <p>{member.description}</p>
          <div className="team-keywords">
            {member.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
          </div>
          <span className="team-story-label">{member.label}</span>
        </div>

        <CardMotif theme={member.theme} />
        <img src={member.image} alt={member.alt} className="team-portrait" loading="lazy" />
      </Button>
    </article>
  );
}

function MeetOurTeam() {
  const [activeMember, setActiveMember] = useState(DEFAULT_ACTIVE_MEMBER);

  return (
    <section id="team" className="team-section px-5 py-28 md:px-10 md:py-44">
      <div className="mx-auto max-w-7xl">
        <header className="story-reveal team-intro" data-story-reveal>
          <div>
            <p className="team-eyebrow">Meet the women behind TrueNorth</p>
            <div className="team-intro-line" aria-hidden="true"><Compass strokeWidth={1.1} /></div>
          </div>
          <div>
            <h2 className="font-display text-5xl leading-[1.04] sm:text-7xl">Three women.<br /><em>One direction.</em></h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">Different strengths, different perspectives connected by the belief that we don&apos;t have to find our way alone.</p>
          </div>
        </header>

        <div className="story-reveal team-card-row" data-story-reveal>
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} active={activeMember === member.id} onActivate={() => setActiveMember(member.id)} />
          ))}
        </div>

        <footer className="story-reveal team-closing" data-story-reveal>
          <p className="team-closing-steps">Connect. Imagine. Build.</p>
          <p className="font-display text-2xl leading-snug sm:text-3xl">Different strengths.<br /><em>Shared direction.</em></p>
          <Compass className="mt-7 size-6" strokeWidth={1.1} aria-hidden="true" />
        </footer>
      </div>
    </section>
  );
}

export { MeetOurTeam, TeamCard, teamMembers };