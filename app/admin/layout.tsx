import type { ReactNode } from "react";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata = { title: "Admin — uxnaufal" };

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
      <AdminNav />
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-24 pb-20">
        {children}
      </div>
    </div>
  );
}
