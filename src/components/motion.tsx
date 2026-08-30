"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useTransform, type MotionValue } from "framer-motion";

export const REVEAL = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function MagneticLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
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

export function Counter({ from, to, suffix = "", prefix = "" }: { from: number; to: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true });
  const decimals = Number.isInteger(to) ? 0 : 1;
  useEffect(() => {
    if (!isInView) return;
    let current = from;
    const steps = 12;
    const increment = (to - from) / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= to) { setCount(to); clearInterval(timer); }
      else { setCount(Number(current.toFixed(decimals))); }
    }, 500 / steps);
    return () => clearInterval(timer);
  }, [isInView, from, to, decimals]);
  return <p ref={ref} className="text-4xl md:text-5xl font-bold tracking-tighter tabular-nums">{prefix}{count.toLocaleString("ru-RU")}{suffix}</p>;
}

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

export function RevealWords({ text, delay = 0, step = 0.06, fill = "text-neutral-950" }: { text: string; delay?: number; step?: number; fill?: string }) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <span aria-label={text}>
      {words.map((w, i) => (
        <WordMask key={i} word={w} delay={delay + i * step} fill={fill} last={i === words.length - 1} />
      ))}
    </span>
  );
}

export function RevealLine({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
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

export function HeroBg({ scrollY }: { scrollY: MotionValue<number> }) {
  const y = useTransform(scrollY, [0, 800], [0, -200]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.4]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.1]);
  return (
    <motion.div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ y, opacity, scale }}>
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <motion.div className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle at center, rgba(59,130,246,0.09) 0%, transparent 70%)" }} animate={{ rotate: [0, 360] }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} />
      <motion.div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle at center, rgba(16,185,129,0.08) 0%, transparent 70%)" }} animate={{ rotate: [360, 0] }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }} />
    </motion.div>
  );
}