"use client";

import Link from "next/link";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/80 bg-white/95 shadow-[0_1px_3px_rgba(15,23,42,0.04)] backdrop-blur-lg"
          : "border-b border-transparent bg-white/80 backdrop-blur-md"
      }`}
    >
      <nav className="container-main flex h-16 items-center justify-between md:h-[4.5rem]">
        <Link
          href="/"
          className="font-serif text-[1.0625rem] font-semibold tracking-tight text-text transition-colors hover:text-accent-dark"
        >
          Sindhuri Alugolu
        </Link>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-text transition-colors hover:bg-bg-subtle md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        <ul
          className={`fixed inset-x-0 top-16 flex max-h-[calc(100dvh-4rem)] flex-col gap-1 overflow-y-auto border-b border-border bg-white px-4 py-4 md:static md:max-h-none md:flex-row md:items-center md:gap-1 md:overflow-visible md:border-0 md:bg-transparent md:p-0 ${
            open ? "flex" : "hidden md:flex"
          }`}
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted transition-colors hover:bg-bg-subtle hover:text-text md:py-2"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="md:ml-2">
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
