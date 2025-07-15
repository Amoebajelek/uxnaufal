import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portofolios | Redesign Official Website of Aitiserve.co.id",
  description: "Redesign Official Website of Aitiserve.co.id",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
