import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero, CtaBand } from "@/components/site/Layout";
import { ContactForm } from "@/components/site/forms";
import { services, serviceBySlug } from "@/lib/site";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const s = serviceBySlug(params.slug);
    if (!s) throw notFound();
    return { slug: s.slug };
  },
  head: ({ loaderData }) => {
    const s = loaderData ? serviceBySlug(loaderData.slug) : undefined;
    if (!s) return { meta: [{ title: "Service not found — ISHAAN Enterprises" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${s.title} — ISHAAN Enterprises` },
        { name: "description", content: s.short },
        { property: "og:title", content: `${s.title} — ISHAAN Enterprises` },
        { property: "og:description", content: s.short },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { slug } = Route.useLoaderData();
  const s = serviceBySlug(slug)!;
  return (
    <>
      <PageHero eyebrow="Service" title={s.title} intro={s.short} image={s.image} />
      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="frame-corners">
            <img src={s.image} alt={s.title} className="aspect-[16/10] w-full object-cover" />
          </div>
          <p className="mt-12 text-lg text-muted-foreground">{s.description}</p>
          <h2 className="mt-10 text-2xl font-bold text-primary">What's included</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {s.points.map((p) => <li key={p} className="border-l-4 border-copper bg-sand p-4 font-medium">{p}</li>)}
          </ul>
          <h2 className="mt-14 text-2xl font-bold text-primary">Request a quote for {s.title}</h2>
          <div className="mt-6"><ContactForm /></div>
        </div>
        <aside className="h-fit border bg-card p-6 lg:sticky lg:top-32">
          <p className="eyebrow">All services</p>
          <ul className="mt-4 divide-y">
            {services.map((x) => (
              <li key={x.slug}>
                <Link to="/services/$slug" params={{ slug: x.slug }} className={`block py-3 text-sm font-medium hover:text-primary ${x.slug === s.slug ? "text-primary" : "text-muted-foreground"}`}>
                  {x.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </section>
      <CtaBand />
    </>
  );
}
