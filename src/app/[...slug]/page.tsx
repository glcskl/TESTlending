"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CircleCheckBig, Mail, Phone, Shield, Lightbulb, Users, Eye, Compass, Code2, GraduationCap, Split, Dna, TrendingUp, ShieldCheck, Sparkles } from "lucide-react";
import { findSection, findCard, type SectionId } from "../../lib/site-data";
import { SiteHeader, SiteFooter } from "../../components/Site";
import { MagneticLink, REVEAL } from "../../components/motion";

const TINTS = [
  { bg: "bg-blue-100", text: "text-blue-600" },
  { bg: "bg-green-100", text: "text-green-600" },
  { bg: "bg-amber-100", text: "text-amber-600" },
  { bg: "bg-pink-100", text: "text-pink-600" },
];
const tint = (i: number) => TINTS[i % TINTS.length];

function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-sm font-semibold uppercase tracking-widest text-neutral-400 block">{children}</span>;
}

function SectionIntro({ label, title, sub }: { label: string; title: string; sub?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: REVEAL }} className="text-center max-w-3xl mx-auto mb-14">
      <Label>{label}</Label>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-5">{title}</h1>
      {sub && <p className="text-neutral-600 leading-relaxed">{sub}</p>}
    </motion.div>
  );
}

function CtaBlock({ sectionId, overviewTitle, title, sub, secondary }: { sectionId?: string; overviewTitle?: string; title?: string; sub?: string; secondary?: { label: string; href: string } }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: REVEAL }}
      className="relative bg-neutral-900 rounded-3xl p-8 md:p-16 overflow-hidden text-center">
      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold leading-relaxed max-w-3xl mx-auto mb-4 bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
          {title ?? "Готовы попробовать?"}
        </h3>
        <p className="text-neutral-300 max-w-xl mx-auto mb-8">
          {sub ?? "Персональная демонстрация под ваш профиль. Ответим на вопросы и настроим тестовый доступ. Бесплатно."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticLink href="/register" className="inline-flex items-center gap-2 bg-white text-neutral-950 px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-100 transition-colors">
            Попробовать бесплатно
            <ArrowRight className="w-3.5 h-3.5" />
          </MagneticLink>
          {secondary ? (
            <a href={secondary.href} className="inline-flex items-center gap-2 border border-neutral-700 text-neutral-300 px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-800 hover:text-white transition-colors">
              {secondary.label}
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          ) : (
            sectionId && (
              <Link href={`/${sectionId}`} className="inline-flex items-center gap-2 border border-neutral-700 text-neutral-300 px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-800 hover:text-white transition-colors">
                {overviewTitle}
              </Link>
            )
          )}
        </div>
      </div>
    </motion.div>
  );
}

function NotFoundBody() {
  return (
    <div className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-950 selection:text-white">
      <SiteHeader />
      <main className="max-w-3xl mx-auto px-6 py-32 md:py-40 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: REVEAL }}>
          <Label>Ошибка 404</Label>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-5">Страница не найдена</h1>
          <p className="text-neutral-600 max-w-md mx-auto mb-10">Запрошенный раздел не существует или был перемещён. Вернитесь на главную страницу.</p>
          <MagneticLink href="/" className="inline-flex items-center gap-2 bg-neutral-950 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors">
            На главную
            <ArrowRight className="w-3.5 h-3.5" />
          </MagneticLink>
        </motion.div>
      </main>
      <SiteFooter />
    </div>
  );
}

function OverviewPage({ id }: { id: SectionId }) {
  const section = findSection(id)!;
  return (
    <div className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-950 selection:text-white">
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <SectionIntro label={section.label} title={section.heading} sub={section.sub} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {section.items.map((item, i) => {
            const Icon = item.icon;
            const t = tint(i);
            return (
              <motion.a
                key={item.key}
                href={`/${section.id}/${item.key}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: REVEAL }}
                whileHover={{ y: -6 }}
                className="group p-8 rounded-2xl border border-neutral-200 hover:border-neutral-300 hover:shadow-sm transition-all cursor-pointer flex flex-col"
              >
                <div className={`w-12 h-12 rounded-xl ${t.bg} flex items-center justify-center mb-5`}>
                  <Icon className={`w-6 h-6 ${t.text}`} />
                </div>
                <h2 className="text-lg font-semibold mb-3">{item.title}</h2>
                <p className="text-sm text-neutral-600 leading-relaxed mb-5">{item.desc}</p>
                <span className="text-sm font-medium text-neutral-950 mt-auto inline-flex items-center gap-1.5">
                  {item.metric}
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
            );
          })}
        </div>
        <div className="mt-16">
          <CtaBlock />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((b, i) => (
        <motion.div
          key={b}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ delay: i * 0.07, duration: 0.4, ease: REVEAL }}
          className="flex gap-4 p-6 rounded-2xl border border-neutral-200 items-start"
        >
          <CircleCheckBig className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
          <span className="text-sm text-neutral-700 leading-relaxed">{b}</span>
        </motion.div>
      ))}
    </div>
  );
}

function DetailPage({ sectionId, slug }: { sectionId: SectionId; slug: string }) {
  const found = findCard(sectionId, slug);
  if (!found) return <NotFoundBody />;
  const { section, card } = found;
  const Icon = card.icon;
  const t = tint(section.items.findIndex((c) => c.key === card.key));
  const related = section.items.filter((c) => c.key !== card.key);
  return (
    <div className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-950 selection:text-white">
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <nav className="text-sm text-neutral-500 mb-10 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-neutral-950 transition-colors">WorkDo</Link>
          <span>/</span>
          <Link href={`/${section.id}`} className="hover:text-neutral-950 transition-colors">{section.label}</Link>
          <span>/</span>
          <span className="text-neutral-900 font-medium">{card.title}</span>
        </nav>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className={`w-16 h-16 rounded-2xl ${t.bg} flex items-center justify-center mb-6`}>
              <Icon className={`w-8 h-8 ${t.text}`} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.02]">{card.title}</h1>
            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed mb-8">{card.intro}</p>
            <div className="inline-flex items-center gap-2 text-sm bg-neutral-950 text-white px-4 py-2 rounded-full font-medium">
              <CircleCheckBig className="w-4 h-4 text-green-400" />
              {card.metric}
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="lg:sticky lg:top-24 self-start h-fit"
          >
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8">
              <span className="text-sm font-semibold uppercase tracking-widest text-neutral-400 block mb-5">{section.label}</span>
              <div className="flex items-center gap-4 mb-6">
                <CircleCheckBig className={`w-6 h-6 ${t.text === "text-green-600" ? "text-green-600" : "text-neutral-950"}`} />
                <div>
                  <p className="text-xs text-neutral-500 mb-0.5">Ключевой показатель</p>
                  <p className="font-semibold text-neutral-950 leading-snug">{card.metric}</p>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {card.bullets.slice(0, 3).map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-neutral-700 leading-relaxed">
                    <CircleCheckBig className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <MagneticLink href="/register" className="w-full inline-flex items-center justify-center gap-2 bg-neutral-950 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors">
                Попробовать бесплатно
                <ArrowRight className="w-3.5 h-3.5" />
              </MagneticLink>
              <Link href={`/${section.id}`} className="mt-3 w-full inline-flex items-center justify-center gap-2 border border-neutral-300 text-neutral-700 px-6 py-3 rounded-xl text-sm font-medium hover:bg-neutral-100 transition-colors">
                Все разделы {section.label.toLowerCase()}
              </Link>
            </div>
          </motion.aside>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-20">
          {card.content.map((block, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4, ease: REVEAL }}
              whileHover={{ y: -4 }}
              className="p-8 rounded-2xl border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all"
            >
              <span className="w-9 h-9 rounded-full bg-neutral-950 text-white text-xs font-bold flex items-center justify-center mb-5">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="text-xl font-bold mb-3 leading-snug">{block.h}</h2>
              <p className="text-sm text-neutral-600 leading-relaxed">{block.p}</p>
            </motion.article>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: REVEAL }} className="mt-20">
          <h3 className="text-2xl font-bold mb-6">Ключевые возможности</h3>
          <Checklist items={card.bullets} />
        </motion.div>

        <div className="my-20">
          <CtaBlock sectionId={section.id} overviewTitle={`Все разделы ${section.label.toLowerCase()}`} />
        </div>

        {related.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-6">Читайте также</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, i) => {
                const RelIcon = item.icon;
                const rt = tint(i);
                return (
                  <motion.a
                    key={item.key}
                    href={`/${section.id}/${item.key}`}
                    whileHover={{ y: -4 }}
                    className="group p-5 rounded-2xl border border-neutral-200 hover:border-neutral-300 hover:shadow-sm transition-all"
                  >
                    <div className={`w-12 h-12 rounded-xl ${rt.bg} flex items-center justify-center mb-4`}>
                      <RelIcon className={`w-6 h-6 ${rt.text}`} />
                    </div>
                    <h4 className="text-sm font-semibold mb-1">{item.title}</h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">{item.metric}</p>
                  </motion.a>
                );
              })}
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

function RegisterPage() {
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "" });
  const subject = encodeURIComponent("Заявка на бесплатный доступ WorkDo");
  const body = encodeURIComponent(`Имя: ${form.name}\nКомпания: ${form.company}\nТелефон: ${form.phone}\nEmail: ${form.email}`);
  return (
    <div className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-950 selection:text-white">
      <SiteHeader />
      <main className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Label>Бесплатный доступ</Label>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-5">Попробовать бесплатно</h1>
          <p className="text-neutral-600 leading-relaxed">Оставьте заявку — проведём персональную демонстрацию под ваши задачи, ответим на вопросы и настроим тестовый доступ.</p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: REVEAL }}
            className="space-y-5 p-8 md:p-10 rounded-2xl border border-neutral-200 bg-white"
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
                  className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 text-sm outline-none focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 transition-colors"
                />
              </div>
            ))}
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-neutral-950 text-white px-6 py-3.5 rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors">
              Оставить заявку
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: REVEAL }}
            className="lg:sticky lg:top-24"
          >
            <div className="rounded-2xl bg-neutral-50 border border-neutral-200 p-8">
              <span className="text-sm font-semibold uppercase tracking-widest text-neutral-400 block mb-6">Контакты</span>
              <div className="space-y-6">
                <a href="mailto:info@workdo.ru" className="flex items-center gap-4 group">
                  <span className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </span>
                  <span>
                    <span className="block text-xs text-neutral-500 mb-1">Электронная почта</span>
                    <span className="text-sm font-semibold group-hover:underline">info@workdo.ru</span>
                  </span>
                </a>
                <a href="tel:+37529184884" className="flex items-center gap-4 group">
                  <span className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-green-600" />
                  </span>
                  <span>
                    <span className="block text-xs text-neutral-500 mb-1">Телефон</span>
                    <span className="text-sm font-semibold group-hover:underline">+375 (29) 718-48-84</span>
                  </span>
                </a>
              </div>
              <div className="mt-8 pt-6 border-t border-neutral-200">
                <p className="text-sm text-neutral-600 leading-relaxed">Ответим в течение рабочего дня. Персональная демонстрация — бесплатно, без обязательств.</p>
              </div>
            </div>
            <div className="mt-6 rounded-2xl p-6 bg-neutral-950 text-white text-center">
              <p className="text-sm text-neutral-300 leading-relaxed">
                Нужно быстрее? Переходите сразу к тарифам — весь функционал доступен на любом из них.
              </p>
              <Link href="/features" className="mt-4 inline-flex items-center gap-2 bg-white text-neutral-950 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-neutral-100 transition-colors">
                Смотреть возможности
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function ValueCard({ Icon, t, delay, title, children }: { Icon: any; t: { bg: string; text: string }; delay: number; title: string; children: React.ReactNode }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ delay, duration: 0.4, ease: REVEAL }}
      whileHover={{ y: -4 }}
      className="p-8 rounded-2xl border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all"
    >
      <div className={`w-12 h-12 rounded-xl ${t.bg} flex items-center justify-center mb-5`}>
        <Icon className={`w-6 h-6 ${t.text}`} />
      </div>
      <h3 className="text-lg font-bold mb-3">{title}</h3>
      <p className="text-sm text-neutral-600 leading-relaxed">{children}</p>
    </motion.article>
  );
}

function AboutPage() {
  const stats = [
    { value: "156+", label: "компаний" },
    { value: "12 000+", label: "записей в месяц" },
    { value: "99.9%", label: "uptime" },
    { value: "4.8", label: "оценка клиентов" },
  ];
  return (
    <div className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-950 selection:text-white">
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <nav className="text-sm text-neutral-500 mb-10 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-neutral-950 transition-colors">WorkDo</Link>
          <span>/</span>
          <span className="text-neutral-900 font-medium">О компании</span>
        </nav>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: REVEAL }}>
          <span className="inline-flex items-center gap-2 text-sm bg-neutral-950 text-white px-4 py-2 rounded-full font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Работаем с 2023 года
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.02]">О компании WorkDo</h1>
          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-3xl">
            Мы создаём инструменты для тех, кто управляет реальным бизнесом. Платформа WorkDo — это результат сотни разговоров с собственниками салонов и охранных предприятий.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: REVEAL }}
              className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200"
            >
              <p className="text-3xl md:text-4xl font-bold tracking-tight mb-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">{s.value}</p>
              <p className="text-sm text-neutral-500">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: REVEAL }}
          className="mt-20 rounded-2xl bg-neutral-50 border border-neutral-200 p-8 md:p-12"
        >
          <Label>Миссия</Label>
          <p className="text-lg md:text-xl text-neutral-800 leading-relaxed mt-4 max-w-4xl">
            Делать управление бизнесом простым и эффективным с помощью современных технологий. Каждая минута, сэкономленная на рутине, — это время для развития дела.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: REVEAL }} className="mt-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">Наши ценности</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <ValueCard Icon={Shield} t={tint(0)} delay={0} title="Надёжность">
              Мы понимаем, что наши клиенты доверяют нам критически важные процессы — от учёта рабочего времени до отчётности перед контролирующими органами. Каждая строчка кода проверена, каждая функция протестирована. Стабильность — не просто слово, а фундамент, на котором строится ваш бизнес. Мы гарантируем безопасность данных и соответствие 152-ФЗ.
            </ValueCard>
            <ValueCard Icon={Lightbulb} t={tint(1)} delay={0.06} title="Инновации">
              Мы не копируем чужие решения — мы создаём инструменты, которые реально работают. Постоянно анализируем обратную связь, следим за трендами в индустриях и внедряем функции, которые экономят ваше время и деньги. Лучше один раз сделать хорошо, чем десять раз переделывать. Каждый месяц выпускаем обновления с новыми возможностями.
            </ValueCard>
            <ValueCard Icon={Users} t={tint(2)} delay={0.12} title="Клиентоориентированность">
              Для нас каждый клиент — не абстрактный аккаунт в базе, а партнёр, с которым мы строим долгосрочные отношения. Мы помним ваши имена, понимаем ваши задачи и предлагаем решения, а не просто продаём подписку. Успех клиента — наш главный KPI. Среднее время ответа поддержки — 15 минут.
            </ValueCard>
            <ValueCard Icon={Eye} t={tint(3)} delay={0.18} title="Прозрачность">
              Чёткие цены без скрытых платежей. Понятные условия без мелкого шрифта. Отчёты, которые можно показать любому — от бухгалтера до учредителя. В бизнесе достаточно неопределённости, чтобы добавлять её туда, где можно быть честным. Никаких подводных камней и внезапных списаний.
            </ValueCard>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: REVEAL }} className="mt-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Команда</h2>
          <p className="text-neutral-600 leading-relaxed mb-10 max-w-3xl">
            Мы — не аутсорс, который пишет код в вакууме. Каждый из нас работал с малым бизнесом, понимаем специфику отраслей и знаем, как оно бывает на практике.
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            <ValueCard Icon={Compass} t={tint(0)} delay={0} title="Продукт и стратегия">
              Основатель с 10-летним опытом в управлении IT-проектами. Работал с десятками малых и средних предприятий, понимает боль собственника изнутри. Знает, как строить продукты, которые реально решают задачи бизнеса.
            </ValueCard>
            <ValueCard Icon={Code2} t={tint(1)} delay={0.06} title="Разработка">
              Команда из 5 инженеров с опытом в enterprise-проектах для банков и ритейла. Знают, как писать код, который не падает в самый неподходящий момент. Next.js, PostgreSQL, Redis — их инструменты.
            </ValueCard>
            <ValueCard Icon={GraduationCap} t={tint(2)} delay={0.12} title="Экспертиза">
              Консультанты с опытом работы в салонах красоты и охранных предприятиях. Знают специфику отраслей: от сменных графиков до требований Росгвардии. Работали в этих индустриях — понимают ваши задачи.
            </ValueCard>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: REVEAL }} className="mt-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">Почему WorkDo</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <ValueCard Icon={Split} t={tint(0)} delay={0} title="Две вертикали — одна платформа">
              Мы не делаем «универсальный» продукт, который ничего не умеет. Мы сфокусированы на двух отраслях — салоны красоты и охранные предприятия — и делаем их идеально. Это наш осознанный выбор.
            </ValueCard>
            <ValueCard Icon={Dna} t={tint(1)} delay={0.06} title="Экспертиза в ДНК">
              Основатели сами работали в этих индустриях. Мы понимаем, что такое «сутки через трое», зачем нужна 1С, как считать себестоимость поста и почему графики не сходятся в Excel. Знаем ваши проблемы, потому что сами их решали.
            </ValueCard>
            <ValueCard Icon={TrendingUp} t={tint(2)} delay={0.12} title="Растём вместе">
              Большинство наших клиентов — это рекомендации от существующих пользователей. Для нас это лучший комплимент. Мы не тратим на рекламу — инвестируем в качество продукта и ваш успех.
            </ValueCard>
            <ValueCard Icon={ShieldCheck} t={tint(3)} delay={0.18} title="Ответственность">
              Мы не исчезнем завтра. Работаем на рынке, у нас есть офис, команда и обязательства перед клиентами. Каждый год показываем реальную статистику и отчитываемся о развитии продукта.
            </ValueCard>
          </div>
        </motion.div>

        <div className="my-24">
          <CtaBlock title="Давайте познакомимся" sub="Запишитесь на демо — покажем платформу, ответим на вопросы. Без продаж, без давления. Просто покажем, как она работает." secondary={{ label: "Связаться с нами", href: "https://workdo.ru/contacts" }} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export default function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = use(params);
  const path = (slug || []).join("/");

  if (path === "register") return <RegisterPage />;
  if (path === "about") return <AboutPage />;

  const section = findSection(path);
  if (section) return <OverviewPage id={section.id} />;

  if (path.includes("/")) {
    const [sectionId, key] = path.split("/");
    const s = findSection(sectionId);
    if (s) return <DetailPage sectionId={s.id} slug={key} />;
  }

  return <NotFoundBody />;
}