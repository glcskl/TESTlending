"use client";

import Link from "next/link";
import { useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { ArrowRight, Users, MapPin, Route, Building2, ShieldAlert, CalendarClock, Wallet, Plug } from "lucide-react";
import { SiteHeader, SiteFooter } from "../../../components/Site";
import { MagneticLink, Counter, REVEAL, RevealWords, RevealLine, HeroBg } from "../../../components/motion";
import { PricingSection } from "../../../components/pricing-section";

function Marquee() {
  const text = "SaaS • Patrol • work • ";
  return (
    <div className="overflow-hidden whitespace-nowrap py-4">
      <motion.div
        className="inline-block"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
      >
        {Array.from({ length: 8 }).map((_, s) => (
          <span key={s} className="text-[120px] md:text-[180px] font-bold tracking-tighter text-neutral-100 mx-8">{text}</span>
        ))}
      </motion.div>
    </div>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 24 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-10%" } as const,
  transition: { duration: 0.6, ease: REVEAL as unknown as [number, number, number, number] },
};

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span className={`text-sm font-medium uppercase tracking-widest ${light ? "text-neutral-500" : "text-neutral-400"} block mb-6`}>{children}</span>
  );
}

function CardShell({ i, children, className = "" }: { i: number; children: React.ReactNode; className?: string }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.07, duration: 0.4, ease: REVEAL }}
      whileHover={{ y: -4 }}
      className={`p-8 rounded-2xl border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all ${className}`}
    >
      {children}
    </motion.article>
  );
}

export default function SecurityVerticalPage() {
  const { scrollY } = useScroll();
  const solutions = [
    { Icon: Building2, title: "Охранные предприятия", desc: "Управление сотрудниками, постами, сменами и патрулями. Кадровый учёт, журнал инцидентов и финансовая отчётность." },
    { Icon: MapPin, title: "Объекты и посты", desc: "GPS-контроль постов, фотофиксация обходов, QR- и NFC-метки. Электронный журнал приёма-сдачи смен." },
    { Icon: Route, title: "Патрульные группы", desc: "Маршруты патрулей, онлайн-трекинг, автоматические отчёты. Управление мобильными нарядами в реальном времени." },
  ];
  const cases = [
    { num: "01", title: "ЧОП «Форпост-СБ»", tag: "Охранное предприятие", desc: "Автоматизация 15 объектов и 80 сотрудников", chips: ["Объекты", "Смены", "Патрули"] },
    { num: "02", title: "ЧОП «Бастион»", tag: "Охранное предприятие", desc: "Автоматизация постов, смен и патрулей", chips: ["Посты", "Смены", "Патрули"] },
    { num: "03", title: "СБ промышленного холдинга", tag: "Внутренняя безопасность", desc: "Управление 12 КПП и 200 сотрудниками охраны", chips: ["КПП", "Пропуска", "СКУД"] },
    { num: "04", title: "Группа ЧОП «Центр»", tag: "Сеть предприятий", desc: "Платформа для 5 ЧОП в 3 регионах", chips: ["Мульти-тенант", "Сеть", "Единый центр"] },
  ];
  const stats = [
    { value: 10, suffix: "+", label: "Функциональных модулей" },
    { value: 41, suffix: "%", label: "Скорость планирования смен" },
    { value: 12, suffix: "/7", label: "Поддержка 24/7" },
    { value: 7, suffix: "+", label: "Дней демо-доступа" },
  ];
  const features = [
    { Icon: Users, num: "01", title: "Управление персоналом", desc: "Кадровый учёт, графики и наряды. Полный контроль сотрудников.", href: "/features/sotrudniki-i-kadry" },
    { Icon: MapPin, num: "02", title: "Объекты и посты", desc: "GPS-трекинг, обходы и журнал смен. Всё под контролем.", href: "/features/obekty-i-posty" },
    { Icon: CalendarClock, num: "03", title: "Планирование смен", desc: "Автоматические графики с учётом ТК РФ. Без ручного труда.", href: "/features/smeny-i-grafik" },
    { Icon: Wallet, num: "04", title: "Финансы и зарплата", desc: "Расчёт зарплаты по сменам. Сметы и бюджеты.", href: "/features/finansy-i-budget" },
    { Icon: ShieldAlert, num: "05", title: "Инциденты и отчётность", desc: "Журнал происшествий и отчёты для Росгвардии.", href: "/features/incidenty" },
    { Icon: Plug, num: "06", title: "Интеграции и API", desc: "1С, СКУД, ГЛОНАСС и открытый API.", href: "/features" },
  ];
  return (
    <div className="min-h-screen bg-white text-neutral-950 overflow-x-hidden selection:bg-neutral-950 selection:text-white">
      <SiteHeader />

      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex items-center justify-center pt-14 overflow-hidden bg-white">
        <HeroBg scrollY={scrollY} />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6, ease: REVEAL }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 text-xs text-neutral-500 mb-12">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Автоматизация для охранных предприятий
          </motion.div>
          <h1 className="text-5xl md:text-[90px] lg:text-[120px] font-bold tracking-tighter leading-[0.85] max-w-[1000px] mx-auto">
            <RevealLine className="bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-400 bg-clip-text text-transparent" text="Управляй." delay={0.35} />
            <br />
            <RevealLine className="bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent" text="Просто." delay={0.55} />
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7, ease: REVEAL }}
            className="mt-6 text-base md:text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Автоматизация охранных предприятий: учёт сотрудников, планирование смен, контроль объектов и патрулей.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7, ease: REVEAL }} className="mt-8">
            <MagneticLink href="/register" className="group inline-flex items-center gap-2 bg-neutral-950 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors">
              Получить демо-доступ
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </MagneticLink>
          </motion.div>
        </div>
      </section>

      {/* ─── Marquee ─── */}
      <Marquee />

      {/* ─── Platform ─── */}
      <section className="py-24 md:py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight leading-[1.05]">
              <RevealWords text="Платформа для полного управления" fill="bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent" />
              {" "}
              <RevealWords text="охранным предприятием: от кадрового учёта до финансовой отчётности." fill="text-neutral-950" delay={0.15} />
            </h2>
            <p className="text-neutral-500 leading-relaxed mt-8 max-w-3xl mx-auto">
              Мы объединили в одной системе управление персоналом, планирование смен, контроль объектов и патрулей, учёт инцидентов, оборудования и контрактов, а также финансовый учёт с расчётом зарплаты.
            </p>
            <div className="mt-10">
              <MagneticLink href="/register" className="group inline-flex items-center gap-2 bg-neutral-950 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors">
                Начать сейчас
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </MagneticLink>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Solutions ─── */}
      <section className="py-24 md:py-32 bg-neutral-950 text-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="text-center mb-20">
            <SectionLabel light>Решения</SectionLabel>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight max-w-[900px] mx-auto leading-[0.9]">
              <RevealWords text="Три направления." fill="text-white" />
              <br />
              <RevealWords text="Одна система." fill="bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent" delay={0.12} />
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {solutions.map((s, i) => {
              const Icon = s.Icon;
              return (
                <motion.a
                  key={s.title}
                  href="/register"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: REVEAL }}
                  whileHover={{ y: -6 }}
                  className="group p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.14] transition-colors cursor-pointer flex flex-col"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-5 group-hover:bg-white/[0.1] transition-colors">
                    <Icon className="w-5 h-5 text-neutral-300" />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-6">{s.desc}</p>
                  <span className="text-xs font-medium text-neutral-400 inline-flex items-center gap-1.5 mt-auto">
                    Начать работу
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Cases ─── */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="text-center mb-20">
            <SectionLabel>Кейсы</SectionLabel>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              <RevealLine className="bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent" text="Кейсы внедрений" />
            </h2>
          </motion.div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {cases.map((c, i) => (
              <CardShell key={c.num} i={i}>
                <div className="flex items-center justify-between mb-6">
                  <span className="w-10 h-10 rounded-full bg-neutral-950 text-white text-xs font-bold flex items-center justify-center">{c.num}</span>
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400">{c.tag}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 leading-snug">{c.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed mb-6">{c.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {c.chips.map((chip) => (
                    <span key={chip} className="text-xs px-3 py-1 rounded-full bg-neutral-100 text-neutral-700">{chip}</span>
                  ))}
                </div>
              </CardShell>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-20">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="text-center"
              >
                <Counter from={0} to={s.value} suffix={s.suffix} />
                <p className="text-sm font-medium text-neutral-950 mt-2">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="py-24 md:py-32 bg-neutral-50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="text-center mb-20">
            <SectionLabel>Возможности</SectionLabel>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-[900px] mx-auto leading-[1.05]">
              <RevealLine className="bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent" text="Всё для управления." />
              <br />
              <RevealLine className="text-neutral-950" text="Ничего лишнего." delay={0.12} />
            </h2>
          </motion.div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => {
              const Icon = f.Icon;
              return (
                <CardShell key={f.num} i={i} className="group">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-neutral-950 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-neutral-400">{f.num}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-6">{f.desc}</p>
                  <Link href={f.href} className="text-sm font-medium text-neutral-950 inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Подробнее
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                  </Link>
                </CardShell>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <PricingSection />

      {/* ─── CTA ─── */}
      <section className="py-32 md:py-44 relative overflow-hidden bg-neutral-950 text-white">
        <motion.div className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle at center, rgba(59,130,246,0.06) 0%, transparent 70%)" }}
          animate={{ rotate: [0, 360] }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: REVEAL }}
            className="text-5xl md:text-[80px] font-bold tracking-tighter leading-[0.9] mb-5">
            <RevealWords text="Начните управлять охраной эффективнее." fill="text-white" />
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.5 }}
            className="text-base text-neutral-400 max-w-xl mx-auto mb-8 leading-relaxed">
            Учёт, планирование и контроль охранного предприятия в одной системе. Персональная демонстрация — бесплатно.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5 }}>
            <MagneticLink href="/register"
              className="inline-flex items-center gap-2 bg-white text-neutral-950 px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-100 transition-colors">
              Создать аккаунт бесплатно
              <ArrowRight className="w-3.5 h-3.5" />
            </MagneticLink>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <SiteFooter />
    </div>
  );
}