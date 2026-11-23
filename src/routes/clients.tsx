import { createFileRoute } from "@tanstack/react-router";
import clientsHero from "@/assets/clients-hero.jpg";
import { PageHero, CtaBand } from "@/components/site/Layout";
import { clients, clientsNote } from "@/lib/site";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Clients — ISHAAN Enterprises" },
      { name: "description", content: "Industrial clients who trust ISHAAN Enterprises for insulation, fabrication, MEP and manpower." },
      { property: "og:title", content: "Our Clients — ISHAAN Enterprises" },
      { property: "og:description", content: "The companies we work with, and what they say." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Clients,
});

function Clients() {
  return (
    <>
      <PageHero eyebrow="Clients" title="Trusted by plants and builders across the region." image={clientsHero} />
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
          {clients.map((c) => (
            <div key={c} className="grid min-h-36 place-items-center bg-background p-4 text-center font-display text-lg font-semibold leading-snug text-muted-foreground transition hover:text-primary">{c}</div>
          ))}
        </div>
        <p className="signature mt-10 text-center text-3xl text-copper md:text-4xl">{clientsNote}</p>
      </section>
      <CtaBand />
    </>
  );
}
