import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#0c1929] text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
      <div className="container-main flex flex-col items-center justify-between gap-6 py-10 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-serif text-base font-semibold text-white">Sindhuri Alugolu</p>
          <p className="mt-1 text-sm text-slate-400">
            Soft Skills Trainer · Visakhapatnam
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <Link
            href="/resume"
            className="inline-flex items-center gap-1 font-medium text-slate-300 transition-colors hover:text-blue-200"
          >
            Full CV
            <ArrowUpRight size={14} />
          </Link>
          <Link
            href="/resume/one-page"
            className="inline-flex items-center gap-1 font-medium text-slate-300 transition-colors hover:text-blue-200"
          >
            One-Page CV
            <ArrowUpRight size={14} />
          </Link>
          <a
            href="mailto:sindhudimple.08@gmail.com"
            className="font-medium text-slate-300 transition-colors hover:text-blue-200"
          >
            Email
          </a>
        </div>
        <p className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
