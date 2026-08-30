import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Автоматизация ЧОП — сотрудники, смены, объекты и патрули",
  description:
    "Система для охранных предприятий: планирование смен, контроль постов и патрулей, журнал инцидентов, расчёт зарплаты и отчётность. Начните бесплатно.",
  alternates: { canonical: "/verticals/security" },
};

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}