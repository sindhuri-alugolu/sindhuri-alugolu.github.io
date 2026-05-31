import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-main flex flex-col items-center justify-between gap-4 py-8 text-center sm:flex-row sm:text-left">
        <p className="text-sm text-text-muted">
          &copy; {new Date().getFullYear()} Sindhuri Alugolu. All rights reserved.
        </p>
        <div className="flex items-center gap-5 text-sm">
          <Link href="/resume" className="font-medium text-text-muted transition-colors hover:text-accent">
            Resume
          </Link>
          <a
            href="mailto:sindhudimple.08@gmail.com"
            className="font-medium text-text-muted transition-colors hover:text-accent"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
