import { MessageCircle, Mail, MapPin } from "lucide-react";
import { Logo } from "./logo";
import { site } from "@/lib/content";

const columns = [
  {
    title: "Platform",
    links: ["AI Learning", "Doctor Consultation", "Exercise Programs", "Live Classes", "Pricing"],
  },
  {
    title: "Company",
    links: ["About Us", "Our Story", "Careers", "Blog", "Contact"],
  },
  {
    title: "For",
    links: ["Students", "Patients", "Doctors", "Elderly Care", "Fitness"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms", "Refund Policy", "Medical Disclaimer", "Cookie Policy"],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-10 border-t border-border bg-muted/40">
      <div className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              India&apos;s AI-powered physiotherapy platform for learning, recovery
              and expert online consultation.
            </p>

            <a
              href={site.whatsappLink}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white shadow-soft transition-transform hover:scale-[1.03]"
            >
              <MessageCircle className="h-4 w-4" /> {site.whatsapp}
            </a>

            <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 hover:text-foreground"
              >
                <Mail className="h-4 w-4" /> {site.email}
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Gujarat, India · Serving all of India
              </p>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Founded by {site.founder}.
          </p>
          <p className="text-xs">
            Not a substitute for emergency medical care. For emergencies, contact
            your local hospital.
          </p>
        </div>
      </div>
    </footer>
  );
}
