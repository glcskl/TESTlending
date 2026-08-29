import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WorkDo — ERP-Платформа управления бизнесом полного цикла для охранных, строительных и яхт-клубов",
  description:
    "WorkDo — ERP-платформа управления бизнесом полного цикла: управление персоналом, объектами, финансами и отчётностью в одной платформе.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="antialiased">{children}</body>
    </html>
  );
}