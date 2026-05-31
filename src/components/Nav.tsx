"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const transparent = onHome && !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        transparent
          ? "border-b border-white/[0.08] bg-[#0c1929]/50 backdrop-blur-2xl"
          : "border-b border-border/60 bg-white/95 shadow-[0_4px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl"
      }`}
    >
      <nav className="container-main flex h-16 items-center justify-between md:h-[4.5rem]">
        <Link
          href="/"
          className={`font-serif text-[1.0625rem] font-semibold tracking-tight transition-colors ${
            transparent ? "text-white hover:text-blue-200" : "text-text hover:text-accent"
          }`}
        >
          Sindhuri Alugolu
        </Link>

        <button
          type="button"
          className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors md:hidden ${
            transparent ? "text-white hover:bg-white/10" : "text-text hover:bg-bg-subtle"
          }`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        <ul
          className={`fixed inset-x-0 top-16 flex max-h-[calc(100dvh-4rem)] flex-col gap-1 overflow-y-auto border-b px-4 py-4 md:static md:max-h-none md:flex-row md:items-center md:gap-1 md:overflow-visible md:border-0 md:p-0 ${
            open ? "flex" : "hidden md:flex"
          } ${
            transparent
              ? "border-white/10 bg-[#0c1929]/95 backdrop-blur-xl md:bg-transparent"
              : "border-border bg-white md:bg-transparent"
          }`}
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors md:py-2 ${
                  transparent
                    ? "text-blue-100/80 hover:bg-white/10 hover:text-white"
                    : "text-text-muted hover:bg-bg-subtle hover:text-text"
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="md:ml-3">
            <Link
              href="/resume"
              className="btn btn-primary mt-1 w-full md:mt-0 md:w-auto"
              onClick={() => setOpen(false)}
            >
              Resume
              <ArrowUpRight size={15} strokeWidth={2.25} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
