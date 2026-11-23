import { useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { submitContact, submitManpower, contactSchema, manpowerSchema } from "@/lib/enquiries.functions";
import { services } from "@/lib/site";

const field = "w-full border border-input bg-card px-4 py-3 text-sm outline-none transition focus:border-copper focus:ring-2 focus:ring-ring/30";

function F({ label, error, children }: { label: string; error?: string | undefined; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function Done({ title, text, reference, reset }: { title: string; text: string; reference: string; reset: () => void }) {
  return (
    <div role="status" aria-live="polite" className="border bg-card p-10 text-center">
      <CheckCircle2 className="mx-auto h-12 w-12 text-copper" />
      <p className="mt-4 font-display text-2xl font-bold text-primary">{title}</p>
      <p className="mt-2 text-muted-foreground">{text}</p>
      <div className="mx-auto mt-6 max-w-xs border-y py-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Enquiry reference</p>
        <p data-testid="enquiry-reference" className="mt-1 font-display text-xl font-bold text-copper">{reference}</p>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">Keep this reference for any follow-up with our team.</p>
      <button onClick={reset} className="mt-6 text-sm font-semibold text-primary underline">Send another</button>
    </div>
  );
}

export function ContactForm() {
  const send = useServerFn(submitContact);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [reference, setReference] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setErrors({});
    setBusy(true);
    try {
      const result = await send({ data: parsed.data });
      setReference(result.reference);
      setDone(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  if (done) return <Done title="Enquiry confirmed" text="Your enquiry has been received. Our team will contact you soon." reference={reference} reset={() => { setDone(false); setReference(""); }} />;

  return (
    <form onSubmit={onSubmit} className="grid gap-5 md:grid-cols-2" noValidate>
      <F label="Your name *" error={errors["name"]}><input name="name" className={field} maxLength={100} /></F>
      <F label="Email *" error={errors["email"]}><input name="email" type="email" className={field} maxLength={255} /></F>
      <F label="Phone" error={errors["phone"]}><input name="phone" className={field} maxLength={20} /></F>
      <F label="Company" error={errors["company"]}><input name="company" className={field} maxLength={150} /></F>
      <div className="md:col-span-2">
        <F label="Service required">
          <select name="service" className={field} defaultValue="">
            <option value="">Select a service</option>
            {services.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
          </select>
        </F>
      </div>
      <div className="md:col-span-2">
        <F label="Project details *" error={errors["message"]}><textarea name="message" rows={5} className={field} maxLength={2000} /></F>
      </div>
      <button disabled={busy} className="bg-primary px-8 py-3.5 font-semibold text-primary-foreground transition hover:bg-brand-deep disabled:opacity-60 md:w-fit">
        {busy ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}

export function ManpowerForm() {
  const send = useServerFn(submitManpower);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [reference, setReference] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = manpowerSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setErrors({});
    setBusy(true);
    try {
      const result = await send({ data: parsed.data });
      setReference(result.reference);
      setDone(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  if (done) return <Done title="Requirement confirmed" text="Your manpower requirement has been received. We'll call you to confirm details." reference={reference} reset={() => { setDone(false); setReference(""); }} />;

  return (
    <form onSubmit={onSubmit} className="grid gap-5 md:grid-cols-2" noValidate>
      <F label="Company name *" error={errors["company"]}><input name="company" className={field} maxLength={150} /></F>
      <F label="Contact person *" error={errors["contact_name"]}><input name="contact_name" className={field} maxLength={100} /></F>
      <F label="Phone *" error={errors["phone"]}><input name="phone" className={field} maxLength={20} /></F>
      <F label="Email *" error={errors["email"]}><input name="email" type="email" className={field} maxLength={255} /></F>
      <div className="md:col-span-2">
        <F label="Trades needed *" error={errors["trades"]}>
          <input name="trades" placeholder="e.g. 10 welders, 5 fitters, 2 supervisors" className={field} maxLength={500} />
        </F>
      </div>
      <F label="Total workers *" error={errors["workers_needed"]}><input name="workers_needed" type="number" min={1} className={field} /></F>
      <F label="Duration" error={errors["duration"]}><input name="duration" placeholder="e.g. 3 months" className={field} maxLength={100} /></F>
      <div className="md:col-span-2">
        <F label="Site location *" error={errors["site_location"]}><input name="site_location" className={field} maxLength={200} /></F>
      </div>
      <div className="md:col-span-2">
        <F label="Additional notes" error={errors["notes"]}><textarea name="notes" rows={4} className={field} maxLength={2000} /></F>
      </div>
      <button disabled={busy} className="bg-primary px-8 py-3.5 font-semibold text-primary-foreground transition hover:bg-brand-deep disabled:opacity-60 md:w-fit">
        {busy ? "Sending…" : "Submit requirement"}
      </button>
    </form>
  );
}
