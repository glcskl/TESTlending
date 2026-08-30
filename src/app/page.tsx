"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, CircleCheckBig, Sparkles, Shield, Users, BarChart3, MapPin, Database, Layers, Clock, ShieldAlert, ShieldCheck, FileSpreadsheet, FileText, KeyRound } from "lucide-react";
import { MagneticLink, Counter, REVEAL, RevealWords, RevealLine, HeroBg } from "../components/motion";

function PricingSection() {
  const [yearly, setYearly] = useState(false);
  const plans = [
    { name: "Базовый", desc: "Для небольших ЧОП", monthly: 209, cap: "до 10 сотрудников" },
    { name: "Стандарт", desc: "Для растущих компаний", monthly: 469, cap: "до 30 сотрудников", highlight: true },
    { name: "Бизнес", desc: "Для крупных ЧОП", monthly: 789, cap: "до 100 сотрудников" },
    { name: "Премиум", desc: "Для холдингов и сетей", monthly: 1239, cap: "100+ сотрудников" },
  ];
  return (
    <section id="тарифы" className="py-32 md:py-48 bg-neutral-950 text-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center mb-24">
          <span className="text-sm font-medium uppercase tracking-widest text-neutral-500">Тарифы</span>
          <h2 className="overflow-hidden text-5xl md:text-7xl font-bold tracking-tight text-white mt-6">
            <span className="flex flex-wrap justify-center"><RevealWords text="Прозрачные цены." fill="bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent" /></span>
          </h2>
          <p className="text-neutral-400 mt-6 text-lg max-w-xl mx-auto">Весь функционал доступен на любом тарифе. Разница только в количестве сотрудников.</p>
        </div>
        <div className="flex justify-center mb-10">
          <div className="relative bg-neutral-800 p-1 rounded-full flex">
            <button onClick={() => setYearly(false)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${!yearly ? "bg-white text-neutral-950 shadow-sm" : "text-neutral-400 hover:text-white"}`}>Месяц</button>
            <button onClick={() => setYearly(true)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${yearly ? "bg-white text-neutral-950 shadow-sm" : "text-neutral-400 hover:text-white"}`}>Год<span className={`text-xs ${yearly ? "text-green-600" : "text-green-500"}`}>-20%</span></button>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            {plans.map((p, i) => {
              const price = yearly ? Math.round(p.monthly * 0.8) : p.monthly;
              return (
                <motion.div key={p.name} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ delay: i * 0.1, duration: 0.6, ease: REVEAL }} whileHover={{ y: -8, scale: 1.02, boxShadow: "0 24px 48px -16px rgba(0,0,0,0.55)", transition: { duration: 0.3, ease: "easeOut" } }}
                  className={`relative rounded-2xl border p-6 flex flex-col ${p.highlight ? "border-2 border-white shadow-lg bg-white text-neutral-950" : "border-neutral-700 bg-neutral-800/50"}`}>
                  {p.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-neutral-950 text-white px-4 py-0.5 rounded-full text-xs font-medium inline-flex items-center gap-1 whitespace-nowrap border border-neutral-700"><Sparkles className="w-3 h-3" />Популярный</span>
                    </div>
                  )}
                  <div className={p.highlight ? "pt-2" : ""}>
                    <h3 className={`text-lg font-semibold mb-1 ${p.highlight ? "" : "text-white"}`}>{p.name}</h3>
                    <p className={`text-sm mb-4 ${p.highlight ? "text-neutral-500" : "text-neutral-400"}`}>{p.desc}</p>
                    <div className="mb-4">
                      <span className={`text-3xl font-bold ${p.highlight ? "" : "text-white"}`}>{price.toLocaleString("ru-RU")}</span>
                      <span className={`${p.highlight ? "text-neutral-500" : "text-neutral-400"}`}> BYN/мес</span>
                    </div>
                    <div className="space-y-2 mb-6 text-sm">
                      <div className="flex items-center gap-2"><CircleCheckBig className={`w-4 h-4 flex-shrink-0 ${p.highlight ? "text-green-600" : "text-green-500"}`} /><span className={`${p.highlight ? "text-neutral-700" : "text-neutral-300"}`}>{p.cap}</span></div>
                      <div className="flex items-center gap-2"><CircleCheckBig className={`w-4 h-4 flex-shrink-0 ${p.highlight ? "text-green-600" : "text-green-500"}`} /><span className={`${p.highlight ? "text-neutral-700" : "text-neutral-300"}`}>Весь функционал</span></div>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <a href="/register" className={`block text-center w-full py-2.5 rounded-xl text-sm font-medium transition-colors ${p.highlight ? "bg-neutral-950 text-white hover:bg-neutral-800" : "border border-neutral-600 text-neutral-200 hover:bg-neutral-700 hover:text-white"}`}>Выбрать</a>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="text-center">
            <a className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors" href="/verticals/security/pricing">Подробнее о тарифах<ArrowRight className="w-4 h-4" /></a>
          </div>
      </div>
    </section>
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
          <div className="flex items-center gap-4">
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
              <RevealLine className="bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent" text="более 150-ти" />
              <br />
              <RevealLine className="bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent" text="вызовов и проблем" delay={0.12} />
              {" "}
              <RevealLine className="bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent" text="вашего бизнеса" delay={0.12} />
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { value: 80, prefix: "", suffix: "%", label: "быстрее расчёт зарплаты", desc: "автоматически из табеля: ночные, праздничные, сверхурочные", href: "/features/sotrudniki-i-kadry" },
              { value: 99.9, prefix: "", suffix: "%", label: "доступность платформы", desc: "контроль смен и объектов 24/7", href: "/trust" },
              { value: 196, prefix: "", suffix: "", label: "параметров учёта для ЧОП", desc: "от кадровых карточек до смет и бюджета", href: "/advantages/model-dannyh" },
              { value: 40, prefix: "", suffix: "+", label: "экранов управления ЧОП", desc: "от дашборда до аудит-лога", href: "/features" },
            ].map((stat, i) => (
              <motion.a
                key={i}
                href={stat.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="text-center group cursor-pointer"
              >
                <Counter from={0} to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                <p className="text-sm font-medium text-neutral-950 mt-2 group-hover:text-neutral-600 transition-colors">{stat.label}</p>
                {stat.desc && <p className="text-xs text-neutral-400 mt-1">{stat.desc}</p>}
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Core Capabilities with data ─── */}
      <section className="py-32 md:py-44">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="text-center mb-20">
            <span className="text-sm font-medium uppercase tracking-widest text-neutral-400">Возможности платформы</span>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight mt-6 max-w-[900px] mx-auto leading-[1.05]">
              <RevealLine className="bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent" text="Всё для управления" />
              <br />
              <RevealLine className="bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent" text="бизнесом в одном окне" delay={0.15} />
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Users,
                slug: "sotrudniki-i-kadry",
                title: "Сотрудники и кадры",
                desc: "Кадровые карточки, графики «сутки/трое» и 2/2, лицензии, табель и автоматический расчёт зарплаты.",
                metric: "5 должностей · 4 типа смен",
              },
              {
                icon: MapPin,
                slug: "obekty-i-posty",
                title: "Объекты и посты охраны",
                desc: "6 типов постов, патрульные маршруты с контрольными точками и учёт оборудования.",
                metric: "6 типов постов",
              },
              {
                icon: Clock,
                slug: "smeny-i-grafik",
                title: "Смены и график",
                desc: "Планирование смен «сотрудник × пост × время», автогенерация и календарь на месяц.",
                metric: "4 типа смен",
              },
              {
                icon: ShieldAlert,
                slug: "incidenty",
                title: "Инциденты и расследования",
                desc: "Регистрация происшествий, планы действий, корневые причины и меры профилактики.",
                metric: "9 категорий инцидентов",
              },
              {
                icon: BarChart3,
                slug: "finansy-i-budget",
                title: "Финансы, бюджет и сметы",
                desc: "Доходы и расходы по месяцам, бюджет по статьям с планом и фактом, сметы на услуги.",
                metric: "План vs факт по статьям",
              },
              {
                icon: Shield,
                slug: "bezopasnost-dannyh",
                title: "Безопасность данных",
                desc: "Изоляция на уровне отдельной схемы БД для каждой компании. RBAC и полный аудит.",
                metric: "Отдельная схема в БД",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={i}
                  href={`/features/${item.slug}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6 }}
                  className="group p-6 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 hover:shadow-lg transition-shadow flex flex-col cursor-pointer"
                >
                  <Icon className="w-8 h-8 text-neutral-950 mb-4" />
                  <h3 className="text-sm font-semibold mb-2 group-hover:text-neutral-600 transition-colors">{item.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed mb-3">{item.desc}</p>
                  <span className="text-xs font-medium text-neutral-950 mt-auto inline-flex items-center gap-1.5">
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

      {/* ─── Platform advantages ─── */}
      <section className="py-24 md:py-32 bg-neutral-950 text-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="text-center mb-20">
            <span className="text-sm font-medium uppercase tracking-widest text-neutral-500">Преимущества платформы</span>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight mt-6 max-w-[900px] mx-auto leading-[0.9]">
              <RevealLine className="bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent" text="Почему выбирают" />
              <br />
              <RevealLine className="bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent" text="WorkDo" delay={0.12} />
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Layers, slug: "odin-akkaunt", title: "Одна платформа — несколько вертикалей", desc: "Один аккаунт — вертикали «ЧОП», «Бьюти» и «Яхты». Доступ к вертикалям включается флагами." },
              { icon: ShieldCheck, slug: "roli-i-prava", title: "Роли и права доступа", desc: "RBAC с ролями владельца, администратора, менеджера и сотрудника. Права на уровне таблиц." },
              { icon: Clock, slug: "avtoraschet-zp", title: "Автоматический расчёт зарплаты", desc: "Зарплата считается из табеля: оклад/час, ночные, праздничные, сверхурочные, премии, авансы, удержания и НДФЛ." },
              { icon: FileSpreadsheet, slug: "import-export", title: "Импорт и экспорт данных", desc: "Массовый импорт сотрудников из CSV/XLSX — 31 колонка с автодетектом. Импорт и экспорт бригад." },
              { icon: Users, slug: "ekspertnaya-komanda", title: "Отраслевая экспертиза", desc: "5 инженеров с enterprise-опытом и консультанты из салонов и охранных предприятий. Понимают специфику изнутри." },
              { icon: Database, slug: "model-dannyh", title: "Модель данных под задачи ЧОП", desc: "16 разделов управления, справочники постов, бригад и лицензий. 54 миграции схемы за время разработки." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={i}
                  href={`/advantages/${item.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  whileHover={{ y: -6 }}
                  className="group p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.14] transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-5 group-hover:bg-white/[0.1] transition-colors">
                    <Icon className="w-5 h-5 text-neutral-300" />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-4">{item.desc}</p>
                  <span className="text-xs font-medium text-neutral-400 inline-flex items-center gap-1.5">
                    Подробнее
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.a>
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
              { icon: Database, slug: "rezervnoe-kopirovanie", title: "Резервное копирование", desc: "Автоматическое резервирование всех данных каждые 6 часов. Восстановление в один клик без потерь.", metric: "Резервная копия каждые 6 часов" },
              { icon: Layers, slug: "izolyaciya-dannyh", title: "Изоляция данных", desc: "У каждой компании — собственная схема в PostgreSQL. Смешивание данных клиентов исключено.", metric: "Отдельная схема в БД" },
              { icon: FileText, slug: "zhurnal-audita", title: "Аудит каждого действия", desc: "Журнал «кто», «когда» и «что изменил» с diff «было → стало» и IP. Доступ ограничен по ролям.", metric: "Diff «было → стало»" },
              { icon: KeyRound, slug: "kod-na-pochtu", title: "Подтверждение кодом на почту", desc: "Смена пароля, восстановление и удаление аккаунта — через 6-значный код. 3 попытки, TTL 10 минут.", metric: "Код на почту, TTL 10 мин" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={i}
                  href={`/trust/${item.slug}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  whileHover={{ y: -6 }}
                  className="group p-6 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 hover:shadow-lg transition-shadow flex flex-col cursor-pointer"
                >
                  <Icon className="w-8 h-8 text-neutral-950 mb-4" />
                  <h3 className="text-sm font-semibold mb-2 group-hover:text-neutral-600 transition-colors">{item.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed mb-3">{item.desc}</p>
                  <span className="text-xs font-medium text-neutral-950 mt-auto inline-flex items-center gap-1.5">
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

      {/* ─── Pricing ─── */}
      <PricingSection />

      {/* ─── CTA ─── */}
      <section className="py-32 md:py-44 relative overflow-hidden bg-neutral-950 text-white">
        <motion.div className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle at center, rgba(59,130,246,0.06) 0%, transparent 70%)" }}
          animate={{ rotate: [0, 360] }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-[80px] font-bold tracking-tighter leading-[0.9] mb-5">
            <RevealWords text="Готовы попробовать?" fill="bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent" />
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
      <footer className="py-24 md:py-32 border-t border-neutral-200 bg-neutral-50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-5 gap-12 md:gap-8">
            <div className="md:col-span-1">
              <motion.a href="https://workdo.ru" className="text-2xl font-bold tracking-tight mb-6 block text-neutral-950" whileHover={{ scale: 1.02 }}>
                WorkDo
              </motion.a>
              <p className="text-sm text-neutral-500 leading-relaxed mb-6">Платформа для управления бизнесом. Салоны красоты, охранные предприятия и яхт-клубы.</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-neutral-400">Система работает</span>
              </div>
            </div>
            {[
              { title: "Продукт", links: [{ label: "Возможности", url: "https://workdo.ru/features" }, { label: "Тарифы", url: "https://workdo.ru/pricing" }, { label: "Кейсы", url: "https://workdo.ru/cases" }, { label: "Блог", url: "https://workdo.ru/blog" }] },
              { title: "Компания", links: [{ label: "О нас", url: "https://workdo.ru/about" }, { label: "Карьера", url: "https://workdo.ru/careers" }, { label: "Контакты", url: "https://workdo.ru/contacts" }, { label: "Пресса", url: "https://workdo.ru/press" }] },
              { title: "Поддержка", links: [{ label: "Документация", url: "https://workdo.ru/docs" }, { label: "FAQ", url: "https://workdo.ru/faq" }, { label: "Статус", url: "https://workdo.ru/status" }, { label: "Связаться", url: "https://workdo.ru/contacts" }] },
              { title: "Документы", links: [{ label: "Политика конфиденциальности", url: "https://workdo.ru/privacy" }, { label: "Пользовательское соглашение", url: "https://workdo.ru/terms" }, { label: "Публичная оферта", url: "https://workdo.ru/offer" }] },
            ].map((col, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <h5 className="font-semibold text-sm text-neutral-950 mb-6 uppercase tracking-wider">{col.title}</h5>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <motion.a href={link.url} className="text-sm text-neutral-500 hover:text-neutral-950 transition-colors relative group inline-block" whileHover={{ x: 4 }}>
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-neutral-950 group-hover:w-full transition-all duration-300" />
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <div className="mt-20 pt-8 border-t border-neutral-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-neutral-500">© 2026 WorkDo. Все права защищены.</p>
              <div className="flex items-center gap-6">
                <a href="mailto:info@workdo.ru" className="text-sm text-neutral-500 hover:text-neutral-950 transition-colors">info@workdo.ru</a>
                <span className="text-neutral-300">|</span>
                <a href="tel:+78001234567" className="text-sm text-neutral-500 hover:text-neutral-950 transition-colors">+7 (800) 123-45-67</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
