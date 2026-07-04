import { MessageCircle, Mail, MapPin } from "lucide-react";
import { Logo } from "./logo";
import { site } from "@/lib/content";
import { getDict } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

// Destinations for each footer link, by column then row (language-independent),
// aligned with the dict's column order: Platform, Company, For, Legal.
const FOOTER_HREFS: string[][] = [
  ["/ai", "/consultation", "/consultation#services", "/live-classes", "/#pricing"],
  ["/about", "/about", "/contact", "/contact", "/contact"],
  ["/ai", "/consultation", "/consultation", "/consultation", "/live-classes"],
  ["/privacy", "/terms", "/refund-policy", "/medical-disclaimer", "/cookie-policy"],
];

export function Footer() {
  const t = getDict(getLocale()).home.footer;
  return (
    <footer className="relative mt-10 border-t border-border bg-muted/40">
      <div className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">{t.tagline}</p>

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
                <MapPin className="h-4 w-4" /> {t.location}
              </p>
            </div>
          </div>

          {t.columns.map((col, ci) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l, li) => (
                  <li key={l}>
                    <a
                      href={FOOTER_HREFS[ci]?.[li] ?? "/"}
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
            © {new Date().getFullYear()} {site.name}. {t.foundedBy} {site.founder}.
          </p>
          <p className="text-xs">{t.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
