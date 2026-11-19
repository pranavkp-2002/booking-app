import Link from "next/link";
import { Container, focusRing } from "@/components/ui";

const LINKS = [
  { href: "#", label: "Help" },
  { href: "#", label: "Privacy" },
  { href: "#", label: "Terms" },
  { href: "/register", label: "List your business" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface-2 py-6 text-sm text-muted">
      <Container className="flex flex-col gap-3 min-[600px]:flex-row min-[600px]:items-center min-[600px]:justify-between">
        <span>© 2026 Slotly</span>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
          {LINKS.map((l) => (
            <Link key={l.label} href={l.href} className={`rounded hover:text-ink ${focusRing}`}>
              {l.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
