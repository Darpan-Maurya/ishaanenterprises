import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import servicesHero from "@/assets/services-hero.jpg";
import { PageHero, CtaBand } from "@/components/site/Layout";
import { services } from "@/lib/site";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — ISHAAN Enterprises" },
      { name: "description", content: "MEP, boiler hot/cold insulation, sheet metal cladding, fire line & FRP lining, HVAC ducting, manpower, scaffolding and fabrication & welding." },
      { property: "og:title", content: "Our Services — ISHAAN Enterprises" },
      { property: "og:description", content: "Eight industrial disciplines delivered by one accountable team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title="Everything your site needs, from one contractor." intro="Pick a discipline to see what we deliver." image={servicesHero} />
      <section className="mx-auto max-w-7xl space-y-20 px-6 py-24">
        {services.map((s, i) => (
          <div key={s.slug} className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div className="frame-corners">
              <img src={s.image} alt={s.title} loading="lazy" className="aspect-[16/10] w-full object-cover" />
            </div>
            <div>
              <p className="font-display text-6xl font-bold text-sand">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="-mt-4 text-3xl font-bold text-primary">{s.title}</h2>
              <p className="mt-4 text-muted-foreground">{s.description}</p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {s.points.map((p) => <li key={p} className="flex items-center gap-3 text-sm"><span className="h-1.5 w-1.5 bg-copper" />{p}</li>)}
              </ul>
              <Link to="/services/$slug" params={{ slug: s.slug }} className="mt-8 inline-flex items-center gap-2 font-semibold text-primary underline decoration-copper decoration-2 underline-offset-8">
                Learn more <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </section>
      <CtaBand />
    </>
  );
}
