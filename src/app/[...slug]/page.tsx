"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CircleCheckBig, Home, Mail } from "lucide-react";
import { SECTIONS, findSection, findCard, type SectionId } from "../../lib/site-data";
import { SiteHeader, SiteFooter } from "../../components/Site";

const REVEAL = [0.16, 1, 0.3, 1] as [number, number, number, number];

function NotFoundBody() {
  return (
    <section className="pt-32 pb-32 flex items-center">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-neutral-400 mb-4">Ошибка 404</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Страница не найдена</h1>
        <p className="text-neutral-500 max-w-md mx-auto mb-8">Запрошенный раздел не существует или был перемещён. Вернитесь на главную страницу.</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-neutral-950 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors">
          <Home className="w-4 h-4" />
          На главную
        </Link>
      </div>
    </section>
  );
}

function OverviewPage({ id }: { id: SectionId }) {
  const section = findSection(id)!;
  return (
    <div className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-950 selection:text-white">
      <SiteHeader />
      <section className="pt-40 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-sm font-medium uppercase tracking-widest text-neutral-400">
            {section.label}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: REVEAL }} className="text-4xl md:text-6xl font-bold tracking-tight mt-6 max-w-[900px] mx-auto leading-[0.95]">
            {section.heading}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }} className="text-neutral-500 mt-6 text-lg max-w-xl mx-auto leading-relaxed">
            {section.sub}
          </motion.p>
        </div>
      </section>
      <section className="pb-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {section.items.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.key}
                  href={`/${section.id}/${item.key}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: REVEAL }}
                  whileHover={{ y: -6 }}
                  className="group p-6 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 hover:shadow-lg transition-shadow flex flex-col"
                >
                  <Icon className="w-8 h-8 text-neutral-950 mb-4" />
                  <h2 className="text-sm font-semibold mb-2 group-hover:text-neutral-600 transition-colors">{item.title}</h2>
                  <p className="text-xs text-neutral-500 leading-relaxed mb-3">{item.desc}</p>
                  <span className="text-xs font-medium text-neutral-950 mt-auto inline-flex items-center gap-1">
                    {item.metric}
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.a>
              );
            })}
          </div>
          <div className="text-center mt-14">
            <Link href="/register" className="inline-flex items-center gap-2 bg-neutral-950 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors">
              Попробовать бесплатно
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function DetailPage({ sectionId, slug }: { sectionId: SectionId; slug: string }) {
  const found = findCard(sectionId, slug);
  if (!found) return <NotFoundBody />;
  const { section, card } = found;
  const Icon = card.icon;
  const related = section.items.filter((c) => c.key !== card.key);
  return (
    <div className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-950 selection:text-white">
      <SiteHeader />
      <main>
        <section className="pt-36 md:pt-44 pb-20 bg-neutral-50">
          <div className="max-w-[900px] mx-auto px-6 md:px-12">
            <nav className="text-xs text-neutral-400 mb-6 inline-flex items-center gap-2">
              <Link href="/" className="hover:text-neutral-950 transition-colors">WorkDo</Link>
              <span>/</span>
              <Link href={`/${section.id}`} className="hover:text-neutral-950 transition-colors">{section.label}</Link>
              <span>/</span>
              <span className="text-neutral-700">{card.title}</span>
            </nav>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-14 h-14 rounded-2xl bg-neutral-950 flex items-center justify-center mb-6">
              <Icon className="w-6 h-6 text-white" />
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: REVEAL }} className="text-4xl md:text-6xl font-bold tracking-tight leading-[0.95]">
              {card.title}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }} className="text-lg text-neutral-600 mt-6 leading-relaxed max-w-[640px]">
              {card.intro}
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.4 }} className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-950 text-white text-sm font-medium">
              <CircleCheckBig className="w-4 h-4" />
              {card.metric}
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-[900px] mx-auto px-6 md:px-12">
            <div className="space-y-10">
              {card.content.map((block, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5 }}>
                  <h2 className="text-xl font-semibold tracking-tight mb-3">{block.h}</h2>
                  <p className="text-neutral-600 leading-relaxed">{block.p}</p>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-14 p-8 rounded-2xl bg-neutral-100">
              <h3 className="font-semibold mb-4 tracking-tight">Ключевые возможности</h3>
              <ul className="space-y-3">
                {card.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-neutral-700">
                    <CircleCheckBig className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-14 p-8 md:p-12 rounded-2xl bg-neutral-950 text-white text-center">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">Готовы попробовать?</h3>
              <p className="text-sm text-neutral-400 max-w-md mx-auto mb-8 leading-relaxed">
                Персональная демонстрация под ваш профиль. Ответим на вопросы и настроим тестовый доступ. Бесплатно.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/register" className="inline-flex items-center gap-2 bg-white text-neutral-950 px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-100 transition-colors">
                  Попробовать бесплатно
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link href={`/${section.id}`} className="inline-flex items-center gap-2 border border-neutral-700 text-neutral-200 px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors">
                  Все разделы {section.label.toLowerCase()}
                </Link>
              </div>
            </motion.div>

            {related.length > 0 && (
              <div className="mt-14">
                <h3 className="font-semibold mb-6 tracking-tight">Читайте также</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {related.map((item) => {
                    const RelIcon = item.icon;
                    return (
                      <motion.a
                        key={item.key}
                        href={`/${section.id}/${item.key}`}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        whileHover={{ y: -4 }}
                        className="group p-5 rounded-2xl bg-white border border-neutral-200 hover:shadow-md transition-shadow"
                      >
                        <RelIcon className="w-6 h-6 text-neutral-950 mb-3" />
                        <h4 className="text-sm font-semibold mb-1 group-hover:text-neutral-600 transition-colors">{item.title}</h4>
                        <p className="text-xs text-neutral-500 leading-relaxed">{item.metric}</p>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function RegisterPage() {
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "" });
  const subject = encodeURIComponent("Заявка на бесплатный доступ WorkDo");
  const body = encodeURIComponent(
    `Имя: ${form.name}\nКомпания: ${form.company}\nТелефон: ${form.phone}\nEmail: ${form.email}`
  );
  return (
    <div className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-950 selection:text-white">
      <SiteHeader />
      <section className="pt-36 md:pt-44 pb-28">
        <div className="max-w-[680px] mx-auto px-6 md:px-12">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-sm font-medium uppercase tracking-widest text-neutral-400">
            Бесплатный доступ
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: REVEAL }} className="text-4xl md:text-6xl font-bold tracking-tight mt-6 leading-[0.95]">
            Попробовать бесплатно
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.5 }} className="text-neutral-500 mt-6 leading-relaxed">
            Оставьте заявку — проведём персональную демонстрацию под ваши задачи, ответим на вопросы и настроим тестовый доступ. Это бесплатно.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: REVEAL }}
            className="mt-10 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = `mailto:info@workdo.ru?subject=${subject}&body=${body}`;
            }}
          >
            {[
              { key: "name", label: "Имя", placeholder: "Как к вам обращаться", type: "text" },
              { key: "company", label: "Компания", placeholder: "Название организации", type: "text" },
              { key: "phone", label: "Телефон", placeholder: "+375 (__) ___-__-__", type: "tel" },
              { key: "email", label: "Email", placeholder: "you@company.com", type: "email" },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-sm font-medium text-neutral-700 mb-2">{f.label}</label>
                <input
                  type={f.type}
                  required={f.key === "name" || f.key === "phone" || f.key === "email"}
                  placeholder={f.placeholder}
                  value={form[f.key as "name"]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm outline-none focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 transition-colors"
                />
              </div>
            ))}
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-neutral-950 text-white px-6 py-3.5 rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors">
              Оставить заявку
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.form>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }} className="mt-8 text-center text-sm text-neutral-500">
            Удобнее связаться напрямую? Пишите на{" "}
            <a href="mailto:info@workdo.ru" className="inline-flex items-center gap-1 text-neutral-950 font-medium hover:underline">
              <Mail className="w-3.5 h-3.5" />
              info@workdo.ru
            </a>
          </motion.div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

export default function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = use(params);
  const path = (slug || []).join("/");

  if (path === "register") return <RegisterPage />;

  const section = findSection(path);
  if (section) return <OverviewPage id={section.id} />;

  if (path.includes("/")) {
    const [sectionId, key] = path.split("/");
    const s = findSection(sectionId);
    if (s) return <DetailPage sectionId={s.id} slug={key} />;
  }

  return <NotFoundBody />;
}