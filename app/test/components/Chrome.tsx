import Image from "next/image";
import Link from "next/link";

const LINKS = [
  { href: "/test", label: "Home" },
  { href: "/test/inventory", label: "Inventory" },
  { href: "/test/vdp", label: "VDP" },
];

export const PHONE = "(305) 720-2533";
export const PHONE_HREF = "tel:+13057202533";
export const ADDRESS = "3455 NW 30TH AVE · MIAMI, FL";

export function Nav({ active }: { active?: string }) {
  return (
    <nav className="navBar">
      <Link href="/test" style={{ display: "flex", alignItems: "center" }}>
        <Image src="/logo.png" alt="Mikalyzed Auto Boutique" width={150} height={30} style={{ height: 30, width: "auto" }} priority />
      </Link>
      <div className="navLinks">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className={active === l.href ? "on" : undefined}>
            {l.label}
          </Link>
        ))}
      </div>
      <a className="navCall" href={PHONE_HREF}>
        {PHONE}
      </a>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="voltFooter">
      <Image src="/logo.png" alt="Mikalyzed Auto Boutique" width={100} height={20} style={{ height: 20, width: "auto", opacity: 0.9 }} />
      <div className="fMeta">
        {ADDRESS} &nbsp;·&nbsp; {PHONE} &nbsp;·&nbsp; MIKALYZEDAUTOBOUTIQUE.COM
      </div>
    </footer>
  );
}
