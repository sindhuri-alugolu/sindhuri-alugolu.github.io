"use client";

import { Download } from "lucide-react";

interface DownloadPdfButtonProps {
  filename?: string;
  label?: string;
}

export default function DownloadPdfButton({
  filename = "Sindhuri-Alugolu-Resume",
  label = "Download PDF",
}: DownloadPdfButtonProps) {
  const handlePrint = () => {
    const previousTitle = document.title;
    document.title = filename;
    window.print();
    document.title = previousTitle;
  };

  return (
    <button type="button" onClick={handlePrint} className="no-print btn btn-primary">
      <Download size={16} />
      {label}
    </button>
  );
}
