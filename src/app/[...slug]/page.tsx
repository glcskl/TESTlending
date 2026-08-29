"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, CircleCheckBig, Home, Mail } from "lucide-react";
import { findSection, findCard, type SectionId } from "../../lib/site-data";
import { SiteHeader, SiteFooter } from "../../components/Site";
import { MagneticLink, REVEAL, RevealWords, RevealLine, HeroBg } from "../../components/motion";

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 origin-left z-[100]" style={{ scaleX }} />;
}

function SectionPill({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-xs text-neutral-400">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      {label}
    </div>
  );
}

function NotFoundBody() {
  const { scrollY } = useScroll();
  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-neutral-950 selection:text-white overflow-x-hidden">
      <ProgressBar />
      <SiteHeader dark />
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroBg scrollY={scrollY} />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center relative z-10">
          <SectionPill label="Ошибка 404" />
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mt-8">
            <span className="flex flex-wrap justify-center"><RevealWords text="Страница не найдена" fill="bg-gradient-to-b from-white via-white to-neutral-500 bg-clip-text text-transparent" /></span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="mt-6 text-neutral-400 max-w-md mx-auto leading-relaxed">
            Запрошенный раздел не существует или был перемещён. Вернитесь на главную страницу.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }} className="mt-9">
            <MagneticLink href="/" className="inline-flex items-center gap-2 bg-white text-neutral-950 px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-100 transition-colors">
              <Home className="w-4 h-4" />
              На главную
            </MagneticLink>
          </motion.div>
        </div>
      </section>
      <div className="bg-white">
        <SiteFooter />
      </div>
    </div>
  );
}

function CtaBlock({ sectionId, overviewTitle }: { sectionId?: string; overviewTitle?: string }) {
  const { scrollY } = useScroll();
  return (
    <section className="py-32 md:py-44 relative overflow-hidden bg-neutral-950 text-white">
      <HeroBg scrollY={scrollY} />
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: REVEAL }}
          className="text-5xl md:text-[80px] font-bold tracking-tighter leading-[0.9] mb-5">
          <RevealWords text="Готовы попробовать?" fill="text-white" />
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.5 }}
          className="text-base text-neutral-400 max-w-xl mx-auto mb-8 leading-relaxed">
          Персональная демонстрация под ваш профиль. Ответим на вопросы, покажем код, настроим тестовый доступ. Бесплатно.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticLink href="/register"
            className="inline-flex items-center gap-2 bg-white text-neutral-950 px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-100 transition-colors">
            Попробовать бесплатно
            <ArrowRight className="w-3.5 h-3.5" />
          </MagneticLink>
          {sectionId && (
            <Link href={`/${sectionId}`} className="inline-flex items-center gap-2 border border-neutral-700 text-neutral-300 px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-800 hover:text-white transition-colors">
              {overviewTitle}
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function OverviewPage({ id }: { id: SectionId }) {
  const section = findSection(id)!;
  return (
    <div className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-950 selection:text-white overflow-x-hidden">
      <ProgressBar />
      <SiteHeader />
      <section className="relative pt-40 md:pt-56 pb-20 md:pb-28 bg-neutral-950 text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center relative z-10">
          <SectionPill label={section.label} />
          <h1 className="overflow-hidden text-4xl md:text-[80px] font-bold tracking-tighter leading-[0.9] mt-8 max-w-[1100px] mx-auto">
            <span className="flex flex-wrap justify-center"><RevealWords text="Всё для управления" fill="bg-gradient-to-b from-white via-white to-neutral-500 bg-clip-text text-transparent" /></span>
            <br />
            <span className="flex flex-wrap justify-center"><RevealWords text="бизнесом в одном окне" fill="bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent" delay={0.25} /></span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="mt-8 text-neutral-400 text-lg max-w-xl mx-auto leading-relaxed">
            {section.sub}
          </motion.p>
        </div>
      </section>
      <section className="pb-28 bg-neutral-50">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 -mt-16 relative z-10">
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
                  transition={{ delay: i * 0.05, duration: 0.5, ease: REVEAL }}
                  whileHover={{ y: -8 }}
                  className="group p-6 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 hover:shadow-xl transition-shadow flex flex-col cursor-pointer"
                >
                  <Icon className="w-8 h-8 text-neutral-950 mb-4" />
                  <h2 className="text-sm font-semibold mb-2 group-hover:text-neutral-600 transition-colors">{item.title}</h2>
                  <p className="text-xs text-neutral-500 leading-relaxed mb-4">{item.desc}</p>
                  <span className="text-xs font-medium text-neutral-950 mt-auto inline-flex items-center gap-2">
                    {item.metric}
                    <span className="inline-flex items-center gap-1 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Подробнее
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>
      <CtaBlock sectionId={undefined} />
      <SiteFooter />
    </div>
  );
}

function RelatedCard({ title, metric, href, Icon }: { title: string; metric: string; href: string; Icon: any }) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group p-5 rounded-2xl bg-neutral-100 hover:bg-neutral-900 hover:text-white transition-colors duration-300"
    >
      <Icon className="w-6 h-6 text-neutral-400 group-hover:text-white mb-3 transition-colors" />
      <h4 className="text-sm font-semibold mb-1 group-hover:text-white transition-colors">{title}</h4>
      <p className="text-xs text-neutral-400 leading-relaxed">{metric}</p>
    </motion.a>
  );
}

function DetailPage({ sectionId, slug }: { sectionId: SectionId; slug: string }) {
  const found = findCard(sectionId, slug);
  if (!found) return <NotFoundBody />;
  const { section, card } = found;
  const Icon = card.icon;
  const related = section.items.filter((c) => c.key !== card.key);
  return (
    <div className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-950 selection:text-white overflow-x-hidden">
      <ProgressBar />
      <SiteHeader />
      <main>
        <section className="relative pt-40 md:pt-56 pb-24 md:pb-32 bg-neutral-950 text-white overflow-hidden">
          <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-10">
            <nav className="text-xs text-neutral-500 mb-8 inline-flex items-center gap-2 flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">WorkDo</Link>
              <span className="text-neutral-700">/</span>
              <Link href={`/${section.id}`} className="hover:text-white transition-colors">{section.label}</Link>
              <span className="text-neutral-700">/</span>
              <span className="text-neutral-300">{card.title}</span>
            </nav>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-16 h-16 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-8">
              <Icon className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="overflow-hidden text-4xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
              <span className="flex flex-wrap"><RevealWords text={card.title} fill="text-white" /></span>
            </h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }} className="mt-8 text-lg text-neutral-400 leading-relaxed max-w-[640px]">
              {card.intro}
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.4 }} className="mt-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.04] text-sm font-medium">
              <CircleCheckBig className="w-4 h-4 text-emerald-400" />
              {card.metric}
            </motion.div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="max-w-[1000px] mx-auto px-6 md:px-12">
            <div className="space-y-12 md:space-y-16 max-w-[680px]">
              {card.content.map((block, i) => (
                <div key={i}>
                  <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </motion.span>
                  <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                    {block.h}
                  </motion.h2>
                  <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.5 }} className="text-neutral-600 leading-relaxed">
                    {block.p}
                  </motion.p>
                </div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-20 p-8 md:p-12 rounded-3xl bg-neutral-950 text-white">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">Ключевые возможности</h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                {card.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-neutral-300 leading-relaxed">
                    <CircleCheckBig className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-16">
              <h3 className="font-semibold tracking-tight mb-6">Читайте также</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {related.map((item) => (
                  <RelatedCard key={item.key} title={item.title} metric={item.metric} href={`/${section.id}/${item.key}`} Icon={item.icon} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <CtaBlock sectionId={section.id} overviewTitle={`Все разделы ${section.label.toLowerCase()}`} />
      <SiteFooter />
    </div>
  );
}

function RegisterPage() {
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "" });
  const { scrollY } = useScroll();
  const subject = encodeURIComponent("Заявка на бесплатный доступ WorkDo");
  const body = encodeURIComponent(`Имя: ${form.name}\nКомпания: ${form.company}\nТелефон: ${form.phone}\nEmail: ${form.email}`);
  return (
    <div className="min-h-screen bg-white text-neutral-950 selection:bg-neutral-950 selection:text-white overflow-x-hidden">
      <ProgressBar />
      <SiteHeader />
      <section className="relative pt-40 md:pt-56 pb-24 bg-neutral-950 text-white overflow-hidden">
        <div className="max-w-[780px] mx-auto px-6 md:px-12 relative z-10">
          <SectionPill label="Бесплатный доступ" />
          <h1 className="overflow-hidden text-4xl md:text-7xl font-bold tracking-tighter leading-[0.9] mt-8">
            <span className="flex flex-wrap"><RevealWords text="Попробовать" fill="bg-gradient-to-b from-white via-white to-neutral-500 bg-clip-text text-transparent" /></span>{" "}
            <span className="flex flex-wrap"><RevealWords text="бесплатно" fill="bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent" delay={0.25} /></span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }} className="mt-8 text-neutral-400 text-lg max-w-xl leading-relaxed">
            Оставьте заявку — проведём персональную демонстрацию под ваши задачи, ответим на вопросы и настроим тестовый доступ. Это бесплатно.
          </motion.p>
        </div>
      </section>
      <section className="py-24 md:py-32 bg-neutral-50">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 -mt-24 relative z-10">
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: REVEAL }}
            className="space-y-5 p-8 md:p-10 rounded-3xl bg-white border border-neutral-200 shadow-sm"
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
            <MagneticLink href={`mailto:info@workdo.ru?subject=${subject}&body=${body}`}
              className="w-full inline-flex items-center justify-center gap-2 bg-neutral-950 text-white px-6 py-3.5 rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors">
              Оставить заявку
              <ArrowRight className="w-3.5 h-3.5" />
            </MagneticLink>
          </motion.form>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }} className="mt-8 text-center text-sm text-neutral-500">
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