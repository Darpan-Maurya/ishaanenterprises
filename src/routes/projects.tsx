import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import projectsHero from "@/assets/projects-hero.jpg";
import { PageHero, CtaBand } from "@/components/site/Layout";
import { projects, services, serviceBySlug } from "@/lib/site";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — ISHAAN Enterprises" },
      { name: "description", content: "A gallery of insulation, cladding, fire line, HVAC, scaffolding, fabrication and MEP projects by ISHAAN Enterprises." },
      { property: "og:title", content: "Our Projects — ISHAAN Enterprises" },
      { property: "og:description", content: "See the industrial site work we've delivered." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Projects,
});

function Projects() {
  const [filter, setFilter] = useState("all");
  const list = filter === "all" ? projects : projects.filter((p) => p.service === filter);
  return (
    <>
      <PageHero eyebrow="Projects" title="Work that speaks on site." intro="A selection of jobs across plants, warehouses and commercial buildings." image={projectsHero} />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-wrap gap-2">
          {[{ slug: "all", title: "All" }, ...services].map((s) => (
            <button key={s.slug} onClick={() => setFilter(s.slug)}
              className={`border px-4 py-2 text-sm font-medium transition ${filter === s.slug ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary"}`}>
              {s.title}
            </button>
          ))}
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => {
            const s = serviceBySlug(p.service)!;
            return (
              <figure key={p.title} className="group relative overflow-hidden">
                <img src={s.image} alt={p.title} loading="lazy" className="aspect-square w-full object-cover transition duration-700 group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-deep to-transparent p-6 text-primary-foreground">
                  <p className="eyebrow">{s.title}</p>
                  <p className="mt-1 font-display text-lg font-bold">{p.title}</p>
                  <p className="text-sm opacity-75">{p.place}</p>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
