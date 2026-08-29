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
    <footer className="py-20 md:py-24 border-t border-neutral-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-1">
            <motion.a href="/" className="text-lg font-bold tracking-tight mb-4 block text-neutral-950" whileHover={{ scale: 1.02 }}>
              WorkDo
            </motion.a>
            <p className="text-sm text-neutral-500 leading-relaxed mb-4">ERP-Платформа управления бизнесом полного цикла.</p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-neutral-500">Система работает</span>
            </div>
          </div>
          {[
            { title: "Продукт", links: [{ label: "Возможности", url: "/" }, { label: "Тарифы", url: "/#pricing" }, { label: "API", url: "/docs" }, { label: "О компании", url: "/about" }] },
            { title: "Разработчикам", links: [{ label: "Документация API", url: "/docs" }, { label: "Webhooks", url: "/docs/webhooks" }, { label: "SDK", url: "/docs/sdk" }, { label: "Changelog", url: "/changelog" }] },
            { title: "Компания", links: [{ label: "О нас", url: "/about" }, { label: "Контакты", url: "/contacts" }, { label: "Политика", url: "/privacy" }, { label: "Оферта", url: "/terms" }] },
          ].map((col, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.4 }}>
              <h5 className="font-semibold text-xs text-neutral-500 mb-4 uppercase tracking-widest">{col.title}</h5>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <motion.a href={link.url} className="text-sm text-neutral-500 hover:text-neutral-950 transition-colors" whileHover={{ x: 3 }}>
                      {link.label}
                    </motion.a>
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
              <a href="mailto:info@workdo.ru" className="text-sm text-neutral-500 hover:text-neutral-950 transition-colors">
                info@workdo.ru
              </a>
              <span className="text-neutral-300 text-sm">|</span>
              <a href="tel:+78001234567" className="text-sm text-neutral-500 hover:text-neutral-950 transition-colors">
                +7 (800) 123-45-67
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}