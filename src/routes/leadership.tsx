import { createFileRoute } from "@tanstack/react-router";
import leadershipHero from "@/assets/leadership-hero.jpg";
import { PageHero, CtaBand } from "@/components/site/Layout";

const proprietorImageUrl = "/images/proprietor-ishaan.jpg";
import { company, proprietorProfile as p, parentCompany } from "@/lib/site";

export const Route = createFileRoute("/leadership")({
  head: () => ({
    meta: [
      { title: "Leadership & Legacy — Ishaan Maurya & Mahendra Maurya" },
      { name: "description", content: "Meet proprietor Ishaan Maurya and founder Mahendra Maurya of Mahendra Insulation Services, the parent company of ISHAAN Enterprises since the 1980s." },
      { property: "og:title", content: "Leadership & Legacy — ISHAAN Enterprises" },
      { property: "og:description", content: "The people and the family legacy behind ISHAAN Enterprises." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Leadership,
});

function Leadership() {
  return (
    <>
      <PageHero eyebrow="Leadership & Legacy" title="Two generations. One standard of workmanship." intro={`From ${parentCompany.founder}'s ${parentCompany.name} in the ${parentCompany.since} to ${company.proprietor}'s ${company.name} today.`} image={leadershipHero} />

      {/* Proprietor profile */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="eyebrow">Leadership & Vision</p>
        <div className="mt-6 grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <div className="frame-corners">
              <img src={proprietorImageUrl} alt={p.name} loading="lazy" className="aspect-square w-full object-cover" />
            </div>
            <div className="mt-8 border-l-4 border-copper bg-sand p-6">
              <p className="font-display text-2xl font-bold text-primary">{p.name}</p>
              <p className="text-sm text-muted-foreground">{p.role}</p>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-primary">{p.tagline}</h2>
            <div className="mt-6 space-y-4 text-lg text-muted-foreground">
              {p.bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <blockquote className="mt-10 border-l-4 border-copper bg-sand p-8">
              <p className="font-display text-2xl font-semibold italic leading-snug text-primary">"{p.quote}"</p>
              <footer className="mt-6">
                <p className="font-display text-lg font-bold text-primary">{p.name}</p>
                <p className="text-sm text-muted-foreground">{p.role}</p>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Heritage / parent company */}
      <section className="blueprint relative overflow-hidden bg-sand">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-[auto_1fr]">
          <div className="border-l-4 border-copper pl-8">
            <p className="eyebrow">Est.</p>
            <p className="font-display text-8xl font-bold leading-none text-primary md:text-9xl">{parentCompany.since.replace("s", "")}<span className="text-copper">s</span></p>
          </div>
          <div>
            <p className="eyebrow">Our parent company</p>
            <h2 className="mt-3 text-4xl font-bold text-primary md:text-5xl">{parentCompany.name}</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-muted-foreground">Founded by {parentCompany.founder}</p>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{parentCompany.story}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
              <span className="border border-primary/25 bg-card px-4 py-2 text-primary">{parentCompany.name}</span>
              <span className="text-copper">→</span>
              <span className="bg-copper px-4 py-2 font-semibold text-accent-foreground">{company.name}</span>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
