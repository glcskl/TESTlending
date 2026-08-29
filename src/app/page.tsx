"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useInView, type MotionValue } from "framer-motion";
import { ArrowRight, Shield, Ship, Building2, Home as HomeIcon, Users, BarChart3, MapPin, TrendingUp, Database, Layers, Lock, Clock, Smartphone, Target, Zap, Globe } from "lucide-react";

function MagneticLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <motion.a
      ref={ref as any}
      href={href}
      className={className}
      onMouseMove={(e) => {
        const rect = (ref.current as HTMLAnchorElement).getBoundingClientRect();
        setPos({ x: e.clientX - rect.left - rect.width / 2, y: e.clientY - rect.top - rect.height / 2 });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x * 0.12, y: pos.y * 0.12 }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.a>
  );
}

function Counter({ from, to, suffix = "", prefix = "" }: { from: number; to: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    let current = from;
    const steps = 40;
    const increment = (to - from) / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= to) { setCount(to); clearInterval(timer); }
      else { setCount(Math.round(current)); }
    }, 1800 / steps);
    return () => clearInterval(timer);
  }, [isInView, from, to]);
  return <p ref={ref} className="text-4xl md:text-5xl font-bold tracking-tighter tabular-nums">{prefix}{count.toLocaleString()}{suffix}</p>;
}

const REVEAL = [0.16, 1, 0.3, 1] as [number, number, number, number];

function WordMask({ word, delay, fill, last }: { word: string; delay: number; fill: string; last?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = requestAnimationFrame(() => setReady(true)); return () => cancelAnimationFrame(t); }, []);
  const hidden = ready && !inView;
  return (
    <motion.span
      ref={ref}
      className={`inline-block will-change-transform ${last ? "" : "mr-[0.3em]"} ${fill}`}
      initial={false}
      animate={hidden ? { y: 20, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: REVEAL, delay }}
    >
      {word}
    </motion.span>
  );
}

function RevealWords({ text, delay = 0, step = 0.06, fill = "text-neutral-950" }: { text: string; delay?: number; step?: number; fill?: string }) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <span aria-label={text}>
      {words.map((w, i) => (
        <WordMask key={i} word={w} delay={delay + i * step} fill={fill} last={i === words.length - 1} />
      ))}
    </span>
  );
}

function RevealLine({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = requestAnimationFrame(() => setReady(true)); return () => cancelAnimationFrame(t); }, []);
  const hidden = ready && !inView;
  return (
    <motion.span
      ref={ref}
      className={`inline-block will-change-transform ${className}`}
      initial={false}
      animate={hidden ? { y: 26, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.75, ease: REVEAL, delay }}
    >
      {text}
    </motion.span>
  );
}

function HeroBg({ scrollY }: { scrollY: MotionValue<number> }) {
  const y = useTransform(scrollY, [0, 800], [0, -200]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.4]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.1]);
  return (
    <motion.div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ y, opacity, scale }}>
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <motion.div className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle at center, rgba(59,130,246,0.06) 0%, transparent 70%)" }} animate={{ rotate: [0, 360] }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} />
      <motion.div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle at center, rgba(16,185,129,0.05) 0%, transparent 70%)" }} animate={{ rotate: [360, 0] }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }} />
    </motion.div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10%" },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  };

  return (
    <div className="min-h-screen bg-white text-neutral-950 overflow-x-hidden selection:bg-neutral-950 selection:text-white">
      <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-neutral-200 origin-left z-[100]" style={{ scaleX }} />
      {/* ─── Header ─── */}
      <motion.header initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/70 backdrop-blur-lg border-b border-neutral-100" : "bg-transparent"}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight text-neutral-950 hover:opacity-70 transition-opacity">WorkDo</Link>
          <div className="hidden md:flex items-center gap-1 p-0.5 bg-neutral-100/50 backdrop-blur-xl rounded-full border border-neutral-100">
            <Link href="/" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-neutral-950 bg-white shadow-sm">
              <HomeIcon className="w-3 h-3" />Главная
            </Link>
            {[{ id: "security", label: "Охрана", icon: Shield }, { id: "construction", label: "Строительство", icon: Building2 }, { id: "yacht", label: "Водная", icon: Ship }].map((v) => {
              const Icon = v.icon;
              return (
                <Link key={v.id} href={`/verticals/${v.id}`} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-neutral-500 hover:text-neutral-950 hover:bg-white/50 transition-all">
                  <Icon className="w-3 h-3" />{v.label}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-4">
            <Link href="/signin" className="text-xs text-neutral-500 hover:text-neutral-950 transition-colors hidden sm:block">Войти</Link>
            <MagneticLink href="/register" className="bg-neutral-950 text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-neutral-800 transition-colors">Начать бесплатно</MagneticLink>
          </div>
        </div>
      </motion.header>

      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex items-center justify-center pt-14 overflow-hidden">
        <HeroBg scrollY={scrollY} />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 text-xs text-neutral-500 mb-12">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            ERP-Платформа управления бизнесом полного цикла
          </motion.div>
          <h1 className="text-5xl md:text-[90px] lg:text-[120px] font-bold tracking-tighter leading-[0.85] max-w-[1000px] mx-auto">
            <RevealLine className="bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-400 bg-clip-text text-transparent" text="Управляйте бизнесом" delay={0.35} />
            <br />
            <RevealLine className="bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent" text="из одного окна" delay={0.55} />
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base md:text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Управляйте персоналом, контролируйте объекты, ведите финансовый учёт и анализируйте бизнес в единой платформе. Одно окно для всех задач.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="mt-8">
            <MagneticLink href="/register" className="group inline-flex items-center gap-2 bg-neutral-950 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors">
              Попробовать бесплатно
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </MagneticLink>
          </motion.div>
        </div>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-4 h-7 border-2 border-neutral-300 rounded-full flex justify-center">
            <motion.div className="w-1 h-2 bg-neutral-300 rounded-full mt-2" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          </div>
        </motion.div>
      </section>

      {/* ─── Key Metrics ─── */}
      <section className="py-24 md:py-32 bg-neutral-50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-sm font-medium uppercase tracking-widest bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">Платформа в цифрах</span>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight mt-6 max-w-[900px] mx-auto leading-[0.9]">
              <RevealLine className="bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent" text="Решение" />
              {" "}
              <RevealLine className="bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-400 bg-clip-text text-transparent" text="более 150-ти" />
              <br />
              <RevealLine className="text-neutral-950" text="вызовов и проблем" delay={0.12} />
              {" "}
              <RevealLine className="bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent" text="вашего бизнеса" delay={0.12} />
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { value: 150, prefix: "", suffix: "+", label: "решений в одной платформе", desc: "" },
              { value: 10000, prefix: "до ", suffix: "", label: "объектов и сотрудников", desc: "" },
              { value: 5000, prefix: "до ", suffix: "", label: "объектов", desc: "" },
              { value: 99.9, prefix: "", suffix: "%", label: "Uptime инфраструктуры", desc: "SLA для корпоративных клиентов" },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }} className="text-center">
                <Counter from={0} to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                <p className="text-sm font-medium text-neutral-950 mt-2">{stat.label}</p>
                {stat.desc && <p className="text-xs text-neutral-400 mt-1">{stat.desc}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Core Capabilities with data ─── */}
      <section className="py-32 md:py-44">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="text-center mb-20">
            <span className="text-sm font-medium uppercase tracking-widest text-neutral-400">Возможности платформы</span>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight mt-6 max-w-[900px] mx-auto leading-[0.9]">
              <RevealLine className="bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-400 bg-clip-text text-transparent" text="Всё для управления" />
              <br />
              <RevealLine className="bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent" text="бизнесом в одном окне" delay={0.12} />
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Users,
                title: "Управление персоналом",
                desc: "Кадровый учёт, расчёт зарплаты, планирование смен. Сотрудники отмечаются через мобильное приложение.",
                metric: "−40 ч/мес на расчёте ЗП",
              },
              {
                icon: MapPin,
                title: "GPS-контроль",
                desc: "Трекинг сотрудников и транспорта. NFC/QR-отметки с фото, уведомления о нарушениях.",
                metric: "Точность до 5 метров",
              },
              {
                icon: BarChart3,
                title: "Финансовый учёт",
                desc: "Договоры, акты, счета. План-факт анализ, расчёт налогов и закрывающих документов.",
                metric: "Интеграция с 1С и банками",
              },
              {
                icon: TrendingUp,
                title: "Бизнес-аналитика",
                desc: "Метрики бизнеса в реальном времени: загрузка, выручка, рентабельность.",
                metric: "Обновление каждые 5 секунд",
              },
              {
                icon: Lock,
                title: "Безопасность",
                desc: "Изоляция данных на уровне БД. Ролевая модель, полный аудит действий.",
                metric: "Соответствие 152-ФЗ",
              },
              {
                icon: Database,
                title: "API и интеграции",
                desc: "REST API с авторизацией, webhooks, OpenAPI-документация и готовые SDK.",
                metric: "50+ API endpoints",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 rounded-2xl bg-white border border-neutral-200"
                >
                  <Icon className="w-8 h-8 text-neutral-950 mb-4" />
                  <h3 className="text-sm font-semibold mb-2">{item.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed mb-3">{item.desc}</p>
                  <span className="text-xs font-medium text-neutral-950">{item.metric}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Platform advantages ─── */}
      <section className="py-24 md:py-32 bg-neutral-950 text-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="text-center mb-20">
            <span className="text-sm font-medium uppercase tracking-widest text-neutral-500">Преимущества платформы</span>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight mt-6 max-w-[900px] mx-auto leading-[0.9]">
              <RevealLine className="bg-gradient-to-b from-white via-white to-neutral-500 bg-clip-text text-transparent" text="Почему выбирают" />
              <br />
              <RevealLine className="bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent" text="WorkDo" delay={0.12} />
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Layers, title: "Управление филиалами", desc: "Ведите несколько компаний и филиалов в одном аккаунте. Данные каждого бизнеса изолированы, отчётность консолидируется автоматически." },
              { icon: Smartphone, title: "Мобильное приложение", desc: "Сотрудники отмечают начало и конец смены, получают уведомления, подают заявки через приложение. Работает на iOS и Android." },
              { icon: Clock, title: "Сокращение времени на учёт", desc: "Автоматизация рутинных задач сокращает время на кадровый учёт до 70%, а на финансовую отчётность — до 60%." },
              { icon: Target, title: "7 лет развития", desc: "Платформа развивается с 2019 года. Более 150 релизов, 12000+ объектов под управлением, 5000+ сотрудников в системе." },
              { icon: Shield, title: "Безопасность данных", desc: "Шифрование данных в покое и при передаче. Резервное копирование каждые 6 часов. Соответствие 152-ФЗ о персональных данных." },
              { icon: Zap, title: "Интеграция с 1С и банками", desc: "Готовая интеграция с 1С:Бухгалтерия, банк-клиентом, системами оплаты. Обмен данными без ручного ввода." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-neutral-300" />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Industries ─── */}
      <section className="py-32 md:py-44">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="mb-16">
            <span className="text-sm font-medium uppercase tracking-widest text-neutral-400">Три мануфактуры</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mt-6"><RevealLine className="bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent" text="Готовые решения" />{" "}<RevealLine className="text-neutral-950" text="для вашего бизнеса" /></h2>
            <p className="text-neutral-500 mt-4 max-w-2xl leading-relaxed">WorkDo адаптируется под специфику вашей отрасли. Не настраивайте с нуля — используйте готовые сценарии.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                label: "Охранная мануфактура",
                features: [
                  "Планирование смен", "GPS-мониторинг", "NFC/QR-отметки",
                  "Автотабель и расчёт ЗП", "Отчётность заказчикам", "Мобильное приложение",
                ],
              },
              {
                icon: Building2,
                label: "Строительная мануфактура",
                features: [
                  "Проекты и этапы", "Сметы и бюджеты", "Контроль бригад",
                  "Учёт материалов", "Финансы по объектам", "Закрывающие документы",
                ],
              },
              {
                icon: Ship,
                label: "Водная мануфактура",
                features: [
                  "Бронирование причалов", "Экипаж и смены", "Абонементы",
                  "Услуги и оборудование", "Финансовый учёт", "Платёжные интеграции",
                ],
              },
            ].map((ind, i) => {
              const Icon = ind.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4 }}
                  className="group relative p-8 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-neutral-300 hover:shadow-sm transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-neutral-950 mb-5" />
                  <h3 className="text-lg font-semibold mb-4">{ind.label}</h3>
                  <ul className="space-y-2">
                    {ind.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-neutral-600">
                        <span className="w-1 h-1 rounded-full bg-neutral-300 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Trust Section ─── */}
      <section className="py-24 md:py-32 bg-neutral-50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-sm font-medium uppercase tracking-widest text-neutral-400">Ваши данные под защитой</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mt-6"><RevealLine className="bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent" text="Надёжность," />{" "}<RevealLine className="text-neutral-950" text="которой можно доверять" /></h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Database, title: "Резервное копирование", desc: "Автоматическое резервирование всех данных каждые 6 часов. Восстановление в один клик без потерь.", metric: "Резервная копия каждые 6 часов" },
              { icon: Layers, title: "Изоляция данных", desc: "Данные каждой компании хранятся отдельно. Никакого риска смешивания или случайной утечки.", metric: "Enterprise-grade изоляция" },
              { icon: Globe, title: "Готовые интеграции", desc: "1С, банк-клиент, платёжные системы. Все популярные сервисы работают из коробки.", metric: "50+ готовых интеграций" },
              { icon: Lock, title: "Соответствие 152-ФЗ", desc: "Обработка данных по закону. Шифрование, аудит действий, защита персональных данных сотрудников.", metric: "3 года хранения аудита" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="p-6 rounded-2xl bg-white border border-neutral-200"
                >
                  <Icon className="w-8 h-8 text-neutral-950 mb-4" />
                  <h3 className="text-sm font-semibold mb-2">{item.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed mb-3">{item.desc}</p>
                  <span className="text-xs font-medium text-neutral-950">{item.metric}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section id="pricing" className="py-32 md:py-44">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="mb-16">
            <span className="text-sm font-medium uppercase tracking-widest text-neutral-400">Тарифы</span>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight mt-6"><RevealLine className="bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent" text="Прозрачные цены" /></h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Базовый", price: "4 990 ₽/мес", desc: "Для небольших команд до 30 сотрудников", features: ["До 30 сотрудников", "До 5 объектов", "Управление персоналом", "Базовая отчётность", "Email-поддержка"], cta: "Начать бесплатно", highlight: false },
              { name: "Профессиональный", price: "9 990 ₽/мес", desc: "Для растущего бизнеса от 30 сотрудников", features: ["До 100 сотрудников", "Неограниченно объектов", "Полный финансовый учёт", "GPS-контроль и аналитика", "Приоритетная поддержка", "API-доступ"], cta: "Попробовать", highlight: true },
              { name: "Корпоративный", price: "Индивидуально", desc: "Для крупных компаний и сетей", features: ["Неограниченно сотрудников", "Неограниченно объектов", "Выделенный менеджер", "SLA 99.9%", "Кастомные интеграции", "Обучение персонала"], cta: "Связаться", highlight: false },
            ].map((plan, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -4 }}
                className={`rounded-3xl p-8 md:p-10 flex flex-col ${plan.highlight ? "bg-neutral-950 text-white" : "bg-neutral-50 text-neutral-950 border border-neutral-200"}`}>
                <div className="flex-1">
                  <p className={`text-sm font-medium mb-1 ${plan.highlight ? "text-neutral-400" : "text-neutral-500"}`}>{plan.name}</p>
                  <p className="text-3xl md:text-4xl font-bold tracking-tight mb-1">{plan.price}</p>
                  <p className={`text-sm ${plan.highlight ? "text-neutral-500" : "text-neutral-400"} mb-8`}>{plan.desc}</p>
                  <ul className="space-y-2.5 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className={`flex items-center gap-2 text-sm ${plan.highlight ? "text-neutral-400" : "text-neutral-600"}`}>
                        <span className={`w-1 h-1 rounded-full ${plan.highlight ? "bg-neutral-500" : "bg-neutral-400"}`} />{f}
                      </li>
                    ))}
                  </ul>
                </div>
                <MagneticLink href="/register"
                  className={`block w-full py-3 rounded-full text-center text-sm font-medium transition-colors ${plan.highlight ? "bg-white text-neutral-950 hover:bg-neutral-100" : "bg-neutral-950 text-white hover:bg-neutral-800"}`}>
                  {plan.cta}
                </MagneticLink>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-32 md:py-44 relative overflow-hidden bg-neutral-950 text-white">
        <motion.div className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle at center, rgba(59,130,246,0.06) 0%, transparent 70%)" }}
          animate={{ rotate: [0, 360] }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-[80px] font-bold tracking-tighter leading-[0.9] mb-5">
            <RevealWords text="Готовы попробовать?" fill="text-white" />
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.5 }}
            className="text-base text-neutral-400 max-w-xl mx-auto mb-8 leading-relaxed">
            Персональная демонстрация под ваш профиль. Ответим на вопросы, покажем код, настроим тестовый доступ. Бесплатно.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5 }}>
            <MagneticLink href="/register"
              className="inline-flex items-center gap-2 bg-white text-neutral-950 px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-100 transition-colors">
              Попробовать бесплатно
              <ArrowRight className="w-3.5 h-3.5" />
            </MagneticLink>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-20 md:py-24 border-t border-neutral-200">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-5 gap-12 md:gap-8">
            <div className="md:col-span-1">
              <motion.a href="/" className="text-lg font-bold tracking-tight mb-4 block text-neutral-950" whileHover={{ scale: 1.02 }}>WorkDo</motion.a>
              <p className="text-sm text-neutral-500 leading-relaxed mb-4">ERP-Платформа управления бизнесом полного цикла для охранных, строительных и водных мануфактур.</p>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-neutral-500">Система работает</span>
              </div>
            </div>
            {[
              { title: "Продукт", links: [{ label: "Возможности", url: "/" }, { label: "Тарифы", url: "/#pricing" }, { label: "API", url: "/docs" }, { label: "О компании", url: "/about" }] },
              { title: "Индустрии", links: [{ label: "Охрана", url: "/verticals/security" }, { label: "Строительство", url: "/verticals/construction" }, { label: "Водная", url: "/verticals/yacht" }] },
              { title: "Разработчикам", links: [{ label: "Документация API", url: "/docs" }, { label: "Webhooks", url: "/docs/webhooks" }, { label: "SDK", url: "/docs/sdk" }, { label: "Changelog", url: "/changelog" }] },
              { title: "Компания", links: [{ label: "О нас", url: "/about" }, { label: "Контакты", url: "/contacts" }, { label: "Политика", url: "/privacy" }, { label: "Оферта", url: "/terms" }] },
            ].map((col, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.4 }}>
                <h5 className="font-semibold text-xs text-neutral-500 mb-4 uppercase tracking-widest">{col.title}</h5>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <motion.a href={link.url} className="text-sm text-neutral-500 hover:text-neutral-950 transition-colors" whileHover={{ x: 3 }}>{link.label}</motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <div className="mt-14 pt-6 border-t border-neutral-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-neutral-500">© 2026 WorkDo. Все права защищены.</p>
              <div className="flex items-center gap-4">
                <a href="mailto:info@workdo.ru" className="text-sm text-neutral-500 hover:text-neutral-950 transition-colors">info@workdo.ru</a>
                <span className="text-neutral-300 text-sm">|</span>
                <a href="tel:+78001234567" className="text-sm text-neutral-500 hover:text-neutral-950 transition-colors">+7 (800) 123-45-67</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
