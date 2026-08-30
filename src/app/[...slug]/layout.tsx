import type { Metadata } from "next";
import { findSection, findCard } from "../../lib/site-data";

type RouteParams = { slug: string[] };

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = (slug || []).join("/");
  const canonical = { alternates: { canonical: `/${path}` } };

  if (path === "register") {
    return {
      ...canonical,
      title: "Демо-доступ — попробовать бесплатно",
      description:
        "Оставьте заявку и получите демо-доступ к WorkDo: учёт сотрудников и смен, контроль постов, расчёт зарплаты и отчётность для охранного предприятия.",
    };
  }

  if (path === "about") {
    return {
      ...canonical,
      title: "О компании",
      description:
        "WorkDo — экспертная команда и платформа для охранных предприятий: ценности, клиенты и история компании.",
    };
  }

  const section = findSection(path);
  if (section) {
    const titles: Record<string, string> = {
      features: "Возможности WorkDo для ЧОП",
      advantages: "Преимущества WorkDo для охранных предприятий",
      trust: "Надёжность и безопасность данных WorkDo",
    };
    return {
      ...canonical,
      title: titles[section.id],
      description: section.sub,
    };
  }

  if (path.includes("/")) {
    const [sectionId, key] = path.split("/");
    const found = findCard(sectionId, key);
    if (found) {
      return {
        ...canonical,
        title: found.card.title,
        description: found.card.desc,
      };
    }
  }

  return { title: "Страница не найдена", robots: { index: false } };
}

export default function SlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}