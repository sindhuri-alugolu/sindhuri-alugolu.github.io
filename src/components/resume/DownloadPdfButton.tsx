"use client";

import { Download } from "lucide-react";

export default function DownloadPdfButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print btn btn-primary"
    >
      <Download size={16} />
      Download PDF
    </button>
  );
}
