"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import DownloadPdfButton from "./DownloadPdfButton";

interface ResumeToolbarProps {
  variant: "full" | "one-page";
  downloadName?: string;
}

export default function ResumeToolbar({ variant, downloadName }: ResumeToolbarProps) {
  return (
    <div className="no-print sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex w-[min(1000px,calc(100%-2rem))] flex-wrap items-center justify-between gap-3 py-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-dark"
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {variant === "full" ? (
            <Link
              href="/resume/one-page"
              className="btn btn-secondary px-4 py-2.5 text-xs sm:text-sm"
            >
              One-Page CV
            </Link>
          ) : (
            <Link
              href="/resume"
              className="btn btn-secondary px-4 py-2.5 text-xs sm:text-sm"
            >
              Full CV
            </Link>
          )}
          <DownloadPdfButton filename={downloadName} />
        </div>
      </div>
    </div>
  );
}
