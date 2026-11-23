import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ShieldCheck, Clock, Users, Wrench } from "lucide-react";
import hero from "@/assets/hero.jpg";
import craftsmanship from "@/assets/home-craftsmanship.jpg";
import { services, stats, clients, clientsNote } from "@/lib/site";
import { CtaBand } from "@/components/site/Layout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ISHAAN Enterprises — Insulation, Fabrication, MEP & Manpower | Thane" },
      { name: "description", content: "Thane-based industrial contractor for MEP, boiler hot/cold insulation, sheet metal cladding, fire lines, HVAC ducting, scaffolding, welding and manpower." },
      { property: "og:title", content: "ISHAAN Enterprises — Industrial Contractors, Thane" },
      { property: "og:description", content: "Insulation, cladding, fabrication, HVAC, MEP, scaffolding and skilled manpower for industry." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="blueprint relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 md:py-24 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="eyebrow animate-rise">A family legacy since the 1980s</p>
            <h1 className="mt-5 animate-rise text-5xl font-bold leading-[1.02] text-primary md:text-7xl">
              Engineering.<br />Insulation.<br /><span className="text-copper">Fabrication.</span>
            </h1>
            <p className="mt-6 max-w-lg animate-rise text-lg text-muted-foreground">
              ISHAAN Enterprises delivers industrial site work end-to-end — from boiler insulation and cladding to fire lines, HVAC and skilled workforce.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/services" className="inline-flex items-center gap-2 bg-primary px-7 py-3.5 font-semibold text-primary-foreground hover:bg-brand-deep">
                Our services <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link to="/manpower-enquiry" className="border-2 border-primary px-7 py-3.5 font-semibold text-primary hover:bg-primary hover:text-primary-foreground">
                Hire manpower
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="frame-corners">
              <img src={hero} alt="Insulated pipelines at an industrial plant" width={1600} height={1104} className="aspect-[4/3] w-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-6 hidden w-44 border-4 border-background md:block">
              <img src={craftsmanship} alt="Precision welding on stainless steel" loading="lazy" className="aspect-square w-full object-cover" />
            </div>
          </div>
        </div>
        <div className="overflow-hidden border-y bg-primary py-4 text-primary-foreground">
          <div className="flex w-max animate-ticker gap-12 whitespace-nowrap font-display text-lg">
            {[...services, ...services].map((s, i) => (
              <span key={i} className="flex items-center gap-12">{s.title}<span className="text-copper">✦</span></span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-background p-8">
              <p className="font-display text-5xl font-bold text-primary">{s.value}</p>
              <p className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sand py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">What we do</p>
              <h2 className="mt-3 max-w-xl text-4xl font-bold text-primary md:text-5xl">Eight disciplines. One accountable team.</h2>
            </div>
            <Link to="/services" className="font-semibold text-primary underline decoration-copper decoration-2 underline-offset-8">All services</Link>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group bg-card transition hover:-translate-y-1 hover:shadow-xl">
                <div className="overflow-hidden">
                  <img src={s.image} alt={s.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <p className="font-display text-sm font-bold text-copper">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-lg font-bold text-primary">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Why ISHAAN</p>
          <h2 className="mt-3 text-4xl font-bold text-primary md:text-5xl">Built on safety, precision, showing up on time and quality as promised.</h2>
          <p className="mt-6 text-muted-foreground">We work inside running plants, shutdowns and live construction sites — where quality and discipline matter most.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            { icon: ShieldCheck, t: "Safety first", d: "Trained crews, PPE and permit-to-work discipline on every site." },
            { icon: Clock, t: "On schedule", d: "Planned manpower and material so shutdowns finish on time." },
            { icon: Users, t: "Own workforce", d: "Skilled welders, insulators and riggers on our own rolls." },
            { icon: Wrench, t: "Quality finish", d: "Neat cladding, tight joints and tested systems at handover." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="border-l-4 border-copper bg-card p-6">
              <Icon className="h-7 w-7 text-primary" />
              <p className="mt-4 font-display text-lg font-bold text-primary">{t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="eyebrow text-center">Trusted by industry</p>
        <div className="mt-8 grid grid-cols-2 gap-px bg-border md:grid-cols-4">
          {clients.map((c) => (
            <div key={c} className="grid min-h-28 place-items-center bg-background p-4 text-center font-display text-base font-semibold leading-snug text-muted-foreground">{c}</div>
          ))}
        </div>
        <p className="signature mt-10 text-center text-3xl text-copper md:text-4xl">{clientsNote}</p>
      </section>

      <CtaBand />
    </>
  );
}
