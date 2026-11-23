import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { company, services } from "@/lib/site";

const symbolImageUrl = "/images/ishaan-symbol.webp";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/leadership", label: "Leadership" },
  { to: "/services", label: "Services" },
  { to: "/clients", label: "Clients" },
  { to: "/manpower-enquiry", label: "Manpower" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="ISHAAN Enterprises home">
      <img
        src={symbolImageUrl}
        alt="ISHAAN Enterprises — IE emblem"
        className="h-12 w-12 rounded-xl object-cover shadow-sm ring-1 ring-black/10 md:h-14 md:w-14"
      />
      <span className="leading-none">
        <span className="block font-display text-xl font-bold tracking-tight text-primary md:text-2xl">
          ISHAAN
        </span>
        <span className="mt-1.5 block font-display text-[10px] font-semibold uppercase tracking-[0.28em] text-copper md:text-[11px]">
          Enterprises
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="hidden bg-brand-deep text-primary-foreground md:block">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-6 py-2 text-xs">
          <span className="flex items-center gap-2"><MapPin className="h-3 w-3 shrink-0" /> {company.address}</span>
          <span className="flex flex-wrap gap-x-6 gap-y-1">
            <a href={`tel:${company.phone}`} className="flex items-center gap-2 hover:text-copper"><Phone className="h-3 w-3" /> {company.phoneDisplay}</a>
            <a href={`mailto:${company.email}`} className="flex items-center gap-2 hover:text-copper"><Mail className="h-3 w-3" /> {company.email}</a>
          </span>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
              className="text-sm font-medium text-foreground transition-colors hover:text-primary data-[status=active]:text-primary data-[status=active]:underline data-[status=active]:decoration-copper data-[status=active]:decoration-2 data-[status=active]:underline-offset-8">
              {n.label}
            </Link>
          ))}
        </nav>
        <Link to="/contact" className="hidden bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-brand-deep lg:inline-block">
          Get a Quote
        </Link>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t bg-background px-6 py-4 lg:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block py-2 font-medium">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-deep text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-4">
            <img src={symbolImageUrl} alt="ISHAAN Enterprises IE emblem" className="h-16 w-16 rounded-xl object-cover ring-1 ring-primary-foreground/20" />
            <p className="font-display text-2xl font-bold leading-tight">ISHAAN<br />Enterprises</p>
          </div>
          <p className="mt-4 text-sm opacity-75">Industrial insulation, fabrication, MEP and workforce solutions — built safely, delivered on time.</p>
          <p className="mt-4 text-sm opacity-75">Proprietor: {company.proprietor}</p>
        </div>
        <div>
          <p className="eyebrow mb-4">Services</p>
          <ul className="space-y-2 text-sm opacity-85">
            {services.slice(0, 4).map((s) => (
              <li key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }} className="hover:text-copper">{s.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">&nbsp;</p>
          <ul className="space-y-2 text-sm opacity-85">
            {services.slice(4).map((s) => (
              <li key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }} className="hover:text-copper">{s.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Reach us</p>
          <ul className="space-y-3 text-sm opacity-85">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-copper" /> {company.address}</li>
            <li><a href={`tel:${company.phone}`} className="flex gap-2 hover:text-copper"><Phone className="h-4 w-4 text-copper" /> {company.phoneDisplay}</a></li>
            <li><a href={`mailto:${company.email}`} className="flex gap-2 break-all hover:text-copper"><Mail className="h-4 w-4 shrink-0 text-copper" /> {company.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs opacity-60">
        © {new Date().getFullYear()} ISHAAN Enterprises. All rights reserved.
      </div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, intro, image }: { eyebrow: string; title: string; intro?: string; image?: string }) {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      {image && <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />}
      <div className="blueprint absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <p className="eyebrow animate-rise">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl animate-rise text-4xl font-bold md:text-6xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl animate-rise text-lg opacity-85">{intro}</p>}
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="blueprint bg-sand">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-16 md:flex-row md:items-center">
        <div>
          <p className="eyebrow">Start a project</p>
          <h2 className="mt-2 text-3xl font-bold text-primary md:text-4xl">Have a site that needs us?</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/contact" className="bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-brand-deep">Request a quote</Link>
          <a href={`tel:${company.phone}`} className="border-2 border-primary px-6 py-3 font-semibold text-primary hover:bg-primary hover:text-primary-foreground">Call {company.phoneDisplay}</a>
        </div>
      </div>
    </section>
  );
}
