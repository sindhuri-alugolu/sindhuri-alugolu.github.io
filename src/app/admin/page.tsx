import type { Metadata } from "next";
import AdminClient from "@/components/admin/AdminClient";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio Editor",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const content = await getContent();
  return <AdminClient initialData={content} />;
}
