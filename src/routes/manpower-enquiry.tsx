import { createFileRoute } from "@tanstack/react-router";
import manpowerHero from "@/assets/manpower-enquiry.jpg";
import { PageHero } from "@/components/site/Layout";
import { ManpowerForm } from "@/components/site/forms";
import { company } from "@/lib/site";

export const Route = createFileRoute("/manpower-enquiry")({
  head: () => ({
    meta: [
      { title: "Manpower Enquiry — ISHAAN Enterprises" },
      { name: "description", content: "Request skilled and semi-skilled manpower — welders, fitters, insulators, riggers, helpers and supervisors — for your site." },
      { property: "og:title", content: "Hire Skilled Manpower — ISHAAN Enterprises" },
      { property: "og:description", content: "Tell us your site's workforce needs and we'll get back fast." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Manpower,
});

function Manpower() {
  return (
    <>
      <PageHero eyebrow="Manpower enquiry" title="Site-ready workforce, when you need it." intro="Welders, fitters, insulators, cladders, riggers, helpers and supervisors — for shutdowns or long-term projects." image={manpowerHero} />
      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <h2 className="text-3xl font-bold text-primary">Tell us what your site needs.</h2>
          <p className="mt-4 text-muted-foreground">Share the trades, headcount and duration. We'll confirm availability and rates by phone.</p>
          <ul className="mt-8 space-y-3">
            {["Screened & experienced workers", "Safety-briefed before deployment", "Short-term or long-term contracts", "Supervisor support on request"].map((x) => (
              <li key={x} className="flex items-center gap-3"><span className="h-2 w-2 bg-copper" />{x}</li>
            ))}
          </ul>
          <div className="mt-10 border-l-4 border-copper bg-sand p-6">
            <p className="text-sm text-muted-foreground">Urgent requirement?</p>
            <a href={`tel:${company.phone}`} className="font-display text-2xl font-bold text-primary">{company.phoneDisplay}</a>
            <a href={`https://wa.me/91${company.phone}`} target="_blank" rel="noreferrer" className="mt-2 block text-sm font-semibold text-copper">Message on WhatsApp →</a>
          </div>
        </div>
        <div className="border bg-card p-8"><ManpowerForm /></div>
      </section>
    </>
  );
}
