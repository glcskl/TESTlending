"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export function SiteHeader({ dark = false }: { dark?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? dark
            ? "bg-neutral-950/70 backdrop-blur-lg border-b border-white/10"
            : "bg-white/70 backdrop-blur-lg border-b border-neutral-100"
          : "bg-transparent"
      } ${dark ? "text-white" : ""}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
        <Link href="/" className={`text-lg font-bold tracking-tight ${dark ? "text-white" : "text-neutral-950"} hover:opacity-70 transition-opacity`}>
          WorkDo
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/register"
            className="bg-neutral-950 text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-neutral-800 transition-colors"
          >
            Начать бесплатно
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

export function SiteFooter() {
  return (
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
              <a href="tel:+37529184884" className="text-sm text-neutral-500 hover:text-neutral-950 transition-colors">+375 (29) 718-48-84</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}