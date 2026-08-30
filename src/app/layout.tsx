import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.workdo.ru"),
  title: {
    default: "WorkDo — управление охранным предприятием (ЧОП)",
    template: "%s | WorkDo",
  },
  description:
    "WorkDo — платформа для охранных предприятий: учёт сотрудников и смен, контроль постов и патрулей, расчёт зарплаты, инциденты и финансовая отчётность в одной системе.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "WorkDo",
    title: "WorkDo — управление охранным предприятием (ЧОП)",
    description:
      "Учёт сотрудников и смен, контроль постов, расчёт зарплаты, инциденты и отчётность — в одной платформе.",
  },
  robots: { index: true, follow: true },
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