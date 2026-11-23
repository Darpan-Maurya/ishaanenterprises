import { createFileRoute } from "@tanstack/react-router";
import aboutHero from "@/assets/about-hero.jpg";
import aboutStory from "@/assets/about-story.jpg";
import { PageHero, CtaBand } from "@/components/site/Layout";
import { company, stats, parentCompany } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ISHAAN Enterprises — Industrial Contractors in Thane" },
      { name: "description", content: "Meet proprietor Ishaan Maurya and our parent company Mahendra Insulation Services, trusted in industrial insulation since the 1980s." },
      { property: "og:title", content: "About ISHAAN Enterprises" },
      { property: "og:description", content: "Our proprietor, our family legacy since the 1980s, our mission and safety commitment." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="A hands-on contractor built from the site up." intro={`Backed by ${parentCompany.name} — a family insulation business since the ${parentCompany.since} — ISHAAN Enterprises now serves plants across Maharashtra and beyond.`} image={aboutHero} />
      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-2">
        <div className="frame-corners">
          <img src={aboutStory} alt="Craftsmen installing boiler insulation" loading="lazy" className="aspect-[4/5] w-full object-cover" />
        </div>
        <div>
          <p className="eyebrow">Our story</p>
          <h2 className="mt-3 text-4xl font-bold text-primary">Practical engineering, delivered by people who do the work.</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>ISHAAN Enterprises was founded by {company.proprietor} to carry forward the family's decades of engineering experience into a full multi-discipline industrial contractor — one that understands the job on the ground, communicates clearly, and finishes what it starts.</p>
            <p>Today we handle MEP, hot and cold insulation, sheet metal cladding, fire line fabrication and FRP lining, HVAC ducting, scaffolding, structural fabrication and welding — and we supply skilled manpower for shutdowns and long-term projects.</p>
          </div>
        </div>
      </section>

      <section className="bg-sand py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-3">
          {[
            { t: "Mission", d: "To deliver safe, reliable and well-finished industrial site work that keeps our clients' plants running." },
            { t: "Vision", d: "To be the first-call contractor for insulation, fabrication and workforce across western India." },
            { t: "Values", d: "Safety, honesty, workmanship and respect for every worker and every client." },
          ].map((v, i) => (
            <div key={v.t} className="bg-card p-8">
              <p className="font-display text-sm font-bold text-copper">0{i + 1}</p>
              <h3 className="mt-3 text-2xl font-bold text-primary">{v.t}</h3>
              <p className="mt-3 text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="eyebrow">Safety & quality</p>
        <h2 className="mt-3 max-w-2xl text-4xl font-bold text-primary">Every job starts with a safety brief.</h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {["Toolbox talks and PPE on every shift", "Permit-to-work and height-work compliance", "Qualified welders and trained scaffolders", "Material and workmanship checks before handover"].map((x) => (
            <li key={x} className="flex items-center gap-4 border p-5"><span className="h-2 w-2 bg-copper" /> {x}</li>
          ))}
        </ul>
        <div className="mt-16 grid grid-cols-2 gap-px bg-border md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-background p-6">
              <p className="font-display text-4xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
