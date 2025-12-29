"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HowItWorks() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        if (!containerRef.current) return;

        const cards = cardsRef.current;

        cards.forEach((card, index) => {
            gsap.fromTo(
                card,
                {
                    opacity: 0,
                    x: -50,
                    rotateY: -15,
                },
                {
                    opacity: 1,
                    x: 0,
                    rotateY: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        end: "top 40%",
                        toggleActions: "play none none reverse",
                    },
                    delay: index * 0.15,
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    const steps = [
        {
            title: "Intelligent Bill Extraction",
            description: "Our AI reads every tariff, charge, timestamp, and usage detail — even from complex bills.",
            icon: (
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="group-hover:scale-110 transition-transform duration-500">
                    {/* Document Shape */}
                    <rect x="15" y="10" width="30" height="40" rx="3" fill="url(#ocrGrad)" opacity="0.2" />
                    <rect x="15" y="10" width="30" height="40" rx="3" stroke="#ff5722" strokeWidth="2" />

                    {/* Scan Lines */}
                    <motion.line
                        x1="20" y1="20" x2="40" y2="20"
                        stroke="#ff5722"
                        strokeWidth="1.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                    />
                    <motion.line
                        x1="20" y1="26" x2="40" y2="26"
                        stroke="#ff5722"
                        strokeWidth="1.5"
                        opacity="0.6"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 0.2, repeat: Infinity, repeatDelay: 1 }}
                    />
                    <motion.line
                        x1="20" y1="32" x2="35" y2="32"
                        stroke="#ff5722"
                        strokeWidth="1.5"
                        opacity="0.4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 0.4, repeat: Infinity, repeatDelay: 1 }}
                    />

                    {/* Scanner Beam */}
                    <motion.rect
                        x="14" y="18" width="32" height="2"
                        fill="rgba(255,87,34,0.3)"
                        initial={{ y: 18 }}
                        animate={{ y: [18, 45, 18] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />

                    <defs>
                        <linearGradient id="ocrGrad" x1="15" y1="10" x2="45" y2="50">
                            <stop offset="0%" stopColor="#ff5722" />
                            <stop offset="100%" stopColor="#d84315" />
                        </linearGradient>
                    </defs>
                </svg>
            ),
        },
        {
            title: "Deep Energy Understanding",
            description: "It recognises your plan type, peak/off-peak windows, solar export behaviour, and wasted potential.",
            icon: (
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="group-hover:scale-110 transition-transform duration-500">
                    {/* Brain/Neural Network */}
                    <circle cx="30" cy="30" r="18" stroke="url(#brainGrad)" strokeWidth="2" fill="none" />

                    {/* Neural Nodes */}
                    {[0, 1, 2, 3, 4, 5].map((i) => {
                        const angle = (i * 60 * Math.PI) / 180;
                        const x = 30 + Math.cos(angle) * 18;
                        const y = 30 + Math.sin(angle) * 18;
                        return (
                            <motion.circle
                                key={i}
                                cx={x}
                                cy={y}
                                r="3"
                                fill="#ff5722"
                                initial={{ scale: 0 }}
                                animate={{ scale: [0, 1.2, 1] }}
                                transition={{
                                    duration: 0.5,
                                    delay: i * 0.1,
                                    repeat: Infinity,
                                    repeatDelay: 2,
                                }}
                            />
                        );
                    })}

                    {/* Center Pulse */}
                    <motion.circle
                        cx="30"
                        cy="30"
                        r="5"
                        fill="#ff5722"
                        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Connection Lines */}
                    <motion.path
                        d="M 30 12 L 30 25"
                        stroke="#ff5722"
                        strokeWidth="1"
                        opacity="0.4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatDelay: 2 }}
                    />

                    <defs>
                        <linearGradient id="brainGrad" x1="12" y1="12" x2="48" y2="48">
                            <stop offset="0%" stopColor="#ff5722" />
                            <stop offset="100%" stopColor="#d84315" />
                        </linearGradient>
                    </defs>
                </svg>
            ),
        },
        {
            title: "Privacy by Design",
            description: "All processing happens in-memory. All processing happens in-memory. Your files are auto-deleted after analysis.",
            icon: (
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="group-hover:scale-110 transition-transform duration-500">
                    {/* Shield */}
                    <path
                        d="M 30 10 L 45 18 L 45 32 Q 45 42 30 50 Q 15 42 15 32 L 15 18 Z"
                        fill="url(#shieldGrad)"
                        opacity="0.2"
                    />
                    <path
                        d="M 30 10 L 45 18 L 45 32 Q 45 42 30 50 Q 15 42 15 32 L 15 18 Z"
                        stroke="#ff5722"
                        strokeWidth="2"
                        fill="none"
                    />

                    {/* Checkmark */}
                    <motion.path
                        d="M 22 30 L 28 36 L 38 24"
                        stroke="#ff5722"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.3, repeat: Infinity, repeatDelay: 2 }}
                    />

                    {/* Glow Pulse */}
                    <motion.path
                        d="M 30 10 L 45 18 L 45 32 Q 45 42 30 50 Q 15 42 15 32 L 15 18 Z"
                        stroke="#ff5722"
                        strokeWidth="4"
                        fill="none"
                        opacity="0"
                        animate={{ opacity: [0, 0.3, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />

                    <defs>
                        <linearGradient id="shieldGrad" x1="15" y1="10" x2="45" y2="50">
                            <stop offset="0%" stopColor="#ff5722" />
                            <stop offset="100%" stopColor="#d84315" />
                        </linearGradient>
                    </defs>
                </svg>
            ),
        },
    ];

    return (
        <section ref={containerRef} className="min-h-screen flex items-center justify-center py-32 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] relative overflow-hidden">
            {/* Ambient glow effects */}
            <motion.div
                className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[#ff5722] rounded-full opacity-[0.04] blur-[180px]"
                animate={{ opacity: [0.04, 0.08, 0.04] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#ff3d00] rounded-full opacity-[0.03] blur-[150px]"
                animate={{ opacity: [0.03, 0.06, 0.03] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="max-w-5xl mx-auto px-4 w-full relative z-10">
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-sm text-white/60 mb-6"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722]" />
                        The Technology
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(255,255,255,0.1)]"
                    >
                        Under the Hood
                    </motion.h2>
                    <motion.div
                        className="h-[3px] w-24 rounded-full overflow-hidden"
                        initial={{ width: 0 }}
                        whileInView={{ width: 96 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                    >
                        <div className="h-full w-full bg-gradient-to-r from-[#ff5722] to-transparent" />
                    </motion.div>
                </div>

                <div className="space-y-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            ref={addToRefs}
                            className="group relative"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 overflow-hidden transition-all duration-500 hover:border-[#ff5722]/30 hover:shadow-[0_8px_40px_rgba(255,87,34,0.15)]">
                                {/* Hover Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#ff5722]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10">
                                    {/* Icon Container */}
                                    <div className="relative flex-shrink-0">
                                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#ff5722]/20 to-[#d84315]/10 backdrop-blur-xl border border-[#ff5722]/20 flex items-center justify-center">
                                            {step.icon}
                                        </div>
                                        {/* Glow Effect */}
                                        <div className="absolute inset-0 bg-[#ff5722] rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-[#ff5722] transition-colors duration-300">
                                            {step.title}
                                        </h3>
                                        <p className="text-white/60 text-lg leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Step Number */}
                                    <div className="absolute top-4 right-4 md:top-8 md:right-8 text-7xl font-bold text-white/[0.03] group-hover:text-[#ff5722]/10 transition-colors duration-500">
                                        0{index + 1}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
