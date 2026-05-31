"use client";

import AdminEditor from "@/components/admin/AdminEditor";
import AdminPinGate from "@/components/admin/AdminPinGate";
import { fetchContentFromGitHub } from "@/lib/github-save";
import type { PortfolioContent } from "@/lib/types";
import { useEffect, useState } from "react";

interface AdminClientProps {
  initialData: PortfolioContent;
}

export default function AdminClient({ initialData }: AdminClientProps) {
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (!authed) return;

    fetch("/data/resume.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (json?.profile?.name) setData(json);
      })
      .catch(() => {
        fetchContentFromGitHub()
          .then(setData)
          .catch(() => {});
      });
  }, [authed]);

  if (!authed) {
    return <AdminPinGate onVerified={() => setAuthed(true)} />;
  }

  return <AdminEditor initialData={data} />;
}
