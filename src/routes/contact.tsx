import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import contactHero from "@/assets/contact-hero.jpg";
import { PageHero } from "@/components/site/Layout";
import { ContactForm } from "@/components/site/forms";
import { company } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact ISHAAN Enterprises — Patlipada, Thane West" },
      { name: "description", content: "Call +91 81690 52262 or email ishaanenterprises05@gmail.com. Office at Patlipada, Thane West 400607." },
      { property: "og:title", content: "Contact ISHAAN Enterprises" },
      { property: "og:description", content: "Request a quote or talk to our team in Thane." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const items = [
    { icon: Phone, label: "Call", value: company.phoneDisplay, href: `tel:${company.phone}` },
    { icon: MessageCircle, label: "WhatsApp", value: company.phoneDisplay, href: `https://wa.me/91${company.phone}` },
    { icon: Mail, label: "Email", value: company.email, href: `mailto:${company.email}` },
    { icon: MapPin, label: "Office", value: company.address },
  ];
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk about your site." intro="Send us your requirement and we'll respond with a plan and quote." image={contactHero} />
      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-[1fr_1.5fr]">
        <div className="space-y-4">
          {items.map(({ icon: Icon, label, value, href }) => {
            const inner = (
              <div className="flex gap-4 border bg-card p-5 transition hover:border-copper">
                <Icon className="h-6 w-6 shrink-0 text-copper" />
                <div><p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p><p className="break-all font-semibold text-primary">{value}</p></div>
              </div>
            );
            return href ? <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block">{inner}</a> : <div key={label}>{inner}</div>;
          })}
          <iframe title="Map" className="mt-4 h-64 w-full border" loading="lazy"
            src="https://www.google.com/maps?q=Patlipada,+Thane+West,+400607&output=embed" />
        </div>
        <div className="border bg-card p-8">
          <h2 className="text-2xl font-bold text-primary">Send an enquiry</h2>
          <div className="mt-6"><ContactForm /></div>
        </div>
      </section>
    </>
  );
}
