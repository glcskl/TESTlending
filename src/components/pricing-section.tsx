"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CircleCheckBig, Sparkles } from "lucide-react";
import { REVEAL, RevealWords } from "./motion";

const PLANS = [
  { name: "Базовый", desc: "Для небольших ЧОП", monthly: 209, cap: "до 10 сотрудников" },
  { name: "Стандарт", desc: "Для растущих компаний", monthly: 469, cap: "до 30 сотрудников", highlight: true },
  { name: "Бизнес", desc: "Для крупных ЧОП", monthly: 789, cap: "до 100 сотрудников" },
  { name: "Премиум", desc: "Для холдингов и сетей", monthly: 1239, cap: "100+ сотрудников" },
];

export function PricingSection() {
  const [yearly, setYearly] = useState(false);
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
          {PLANS.map((p, i) => {
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