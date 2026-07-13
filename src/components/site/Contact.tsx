import { useState, type FormEvent } from "react";
import { Mail, MapPin, MessageCircle, Phone, Send, CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";

const CONTACT = {
  phone: "+254 793 249 128",
  phoneAlt: "+254 762 032 044",
  whatsapp: "254793249128",
  whatsappDisplay: "+254 793 249 128",
  email: "mabokosports6@gmail.com",
  address: "Mariakani, along Kaloleni Road, Kilifi County, Kenya",
  mapsEmbed:
    "https://www.google.com/maps?q=-3.8617517,39.4752335&z=17&output=embed",
};


export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const subject = String(data.get("subject") || "New order enquiry");
    const message = String(data.get("message") || "");

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      "",
      "Message / Order details:",
      message,
    ].join("\n");

    const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    setSent(true);
    form.reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="section-pad bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
            Contact
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Let's get you kitted out.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Send us a message, WhatsApp us, or drop by the shop — we're here to help.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Contact info + map */}
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col gap-4">
              <ContactRow icon={Phone} label="Call us" value={CONTACT.phone} href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} />
              <ContactRow icon={Phone} label="Alt. line" value={CONTACT.phoneAlt} href={`tel:${CONTACT.phoneAlt.replace(/\s/g, "")}`} />

              <ContactRow
                icon={MessageCircle}
                label="WhatsApp"
                value={CONTACT.whatsappDisplay}
                href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`}
              />
              <ContactRow icon={Mail} label="Email" value={CONTACT.email} href={`mailto:${CONTACT.email}`} />
              <ContactRow icon={MapPin} label="Visit us" value={CONTACT.address} />

              <div className="mt-2 overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-soft)]">
                {/* TODO: Replace with your business's Google Maps embed URL */}
                <iframe
                  title="Business location"
                  src={CONTACT.mapsEmbed}
                  className="h-64 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <form
              onSubmit={onSubmit}
              className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" required placeholder="Your full name" />
                <Field label="Email" name="email" type="email" required placeholder="you@example.com" />
                <Field label="Phone" name="phone" type="tel" placeholder="Optional" />
                <Field label="Subject" name="subject" placeholder="What's this about?" />
              </div>
              <div className="mt-5">
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us what you're looking for…"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-4 focus:ring-primary/15"
                />
              </div>
              <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
                {sent ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" /> Message sent
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Send message
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/50">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="mt-0.5 truncate font-medium text-foreground">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {inner}
    </a>
  ) : (
    inner
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-4 focus:ring-primary/15"
      />
    </div>
  );
}
