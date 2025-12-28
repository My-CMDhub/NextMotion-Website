"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

// Premium easing curves
const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const easeOutBack = [0.34, 1.56, 0.64, 1] as const;

// Cinematic timing configuration (in seconds) - Desktop only
const TIMING = {
    text1Start: 0.1,
    card1Start: 0.3,
    card1Duration: 0.8,
    arrow1Start: 1.8,
    text2Start: 2.0,
    card2Start: 2.2,
    card2Duration: 1.1,
    arrow2Start: 3.7,
    text3Start: 3.9,
    card3Start: 4.1,
    card3Duration: 1.4,
    subtitleStart: 6.0,
};

// Construction effect variants - Desktop only
const constructionVariants: Variants = {
    hidden: {
        clipPath: "inset(100% 0% 0% 0%)",
        opacity: 0,
    },
    visible: {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
    }
};

const cardContentVariants: Variants = {
    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.5, ease: easeOutExpo }
    }
};

// Scan line glow - Desktop only
const ScanLine = ({ delay, duration }: { delay: number; duration: number }) => (
    <motion.div
        className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#ff5722] to-transparent z-20 pointer-events-none"
        style={{
            boxShadow: "0 0 20px 8px rgba(255, 87, 34, 0.6), 0 0 40px 16px rgba(255, 87, 34, 0.3)",
        }}
        initial={{ top: "100%", opacity: 0 }}
        animate={{ top: "0%", opacity: [0, 1, 1, 0] }}
        transition={{
            duration: duration * 0.9,
            delay: delay,
            ease: easeOutExpo,
            times: [0, 0.1, 0.8, 1]
        }}
    />
);

// Grid overlay - Desktop only
const GridOverlay = ({ delay, duration }: { delay: number; duration: number }) => (
    <motion.div
        className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-3xl"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: duration * 0.8, delay: delay + duration * 0.2, ease: easeOutExpo }}
    >
        <div
            className="absolute inset-0"
            style={{
                backgroundImage: `
                    linear-gradient(rgba(255,87,34,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,87,34,0.1) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
            }}
        />
    </motion.div>
);

export function Solution() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section ref={containerRef} className="min-h-screen flex flex-col items-center justify-center py-32 relative overflow-hidden">
            {/* Ambient glow effects */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#ff5722] rounded-full blur-[200px] opacity-[0.06]"
                    animate={{ opacity: [0.06, 0.1, 0.06] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ff5722]/[0.03] to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
                {/* MOBILE VERSION: Simple flow-based */}
                <div className="block md:hidden">
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-sm text-white/60 mb-8"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722]" />
                            Simple 3-Step Process
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent"
                        >
                            From Bill to Insights to Savings
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed"
                        >
                            Upload your PDF. Our AI extracts every detail to unlock your solar potential.
                        </motion.p>
                    </div>

                    <div className="grid gap-8">
                        {[
                            {
                                title: "Upload Bill",
                                desc: "Drop your electricity bill PDF. We handle the rest.",
                                num: "01",
                                icon: (
                                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                                        <rect x="15" y="20" width="50" height="50" rx="4" fill="url(#uploadGrad)" opacity="0.2" />
                                        <rect x="15" y="20" width="50" height="50" rx="4" stroke="#ff5722" strokeWidth="2" />
                                        <path d="M40 30 L40 55 M30 40 L40 30 L50 40" stroke="#ff5722" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                        <defs>
                                            <linearGradient id="uploadGrad" x1="15" y1="20" x2="65" y2="70">
                                                <stop offset="0%" stopColor="#ff5722" />
                                                <stop offset="100%" stopColor="#d84315" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                )
                            },
                            {
                                title: "AI Analysis",
                                desc: "Extract usage, tariffs, and waste patterns instantly.",
                                num: "02",
                                featured: true,
                                icon: (
                                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                                        <circle cx="40" cy="40" r="25" stroke="url(#aiGrad)" strokeWidth="2.5" fill="none" />
                                        <circle cx="40" cy="40" r="18" stroke="url(#aiGrad)" strokeWidth="1.5" fill="none" opacity="0.5" />
                                        <path d="M40 28 L41 35 L48 36 L41 37 L40 44 L39 37 L32 36 L39 35 Z" fill="#ff5722" />
                                        <defs>
                                            <linearGradient id="aiGrad" x1="15" y1="15" x2="65" y2="65">
                                                <stop offset="0%" stopColor="#ff5722" />
                                                <stop offset="50%" stopColor="#ff3d00" />
                                                <stop offset="100%" stopColor="#d84315" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                )
                            },
                            {
                                title: "Save Money",
                                desc: "Get personalised appliance schedules and solar-hour recommendations.",
                                num: "03",
                                icon: (
                                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                                        <path d="M45 15 L25 45 L35 45 L30 65 L55 35 L45 35 Z" fill="url(#lightningGrad)" />
                                        <path d="M45 15 L25 45 L35 45 L30 65 L55 35 L45 35 Z" stroke="#ff5722" strokeWidth="1.5" fill="none" />
                                        <defs>
                                            <linearGradient id="lightningGrad" x1="30" y1="15" x2="50" y2="65">
                                                <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
                                                <stop offset="100%" stopColor="#ff5722" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                )
                            }
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: 0.2 + (i * 0.1) }}
                                className={`relative p-10 rounded-3xl backdrop-blur-xl overflow-hidden ${card.featured
                                        ? 'bg-gradient-to-br from-[#ff5722]/20 to-[#d84315]/10 border border-[#ff5722]/30'
                                        : 'bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10'
                                    }`}
                            >
                                <div className="relative mb-8 flex justify-center">{card.icon}</div>
                                <h3 className="text-2xl font-bold mb-3 text-white text-center">{card.title}</h3>
                                <p className={`text-center leading-relaxed ${card.featured ? 'text-white/70' : 'text-white/50'}`}>{card.desc}</p>
                                <div className={`absolute top-6 right-6 text-6xl font-bold ${card.featured ? 'text-white/10' : 'text-white/5'}`}>{card.num}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* DESKTOP VERSION: Cinematic construction animation */}
                <div className="hidden md:block">
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.8, ease: easeOutExpo }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-sm text-white/60 mb-8"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722]" />
                            Simple 3-Step Process
                        </motion.div>

                        <div className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
                            <motion.span
                                className="inline-block bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent"
                                initial={{ opacity: 0, y: 40 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                                transition={{ duration: 0.8, delay: TIMING.text1Start, ease: easeOutExpo }}
                            >
                                From Bill
                            </motion.span>

                            <motion.span
                                className="inline-block mx-2 md:mx-4 text-[#ff5722]"
                                initial={{ opacity: 0, scale: 0.3 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 }}
                                transition={{ duration: 0.5, delay: TIMING.arrow1Start, ease: easeOutBack }}
                            >
                                →
                            </motion.span>

                            <motion.span
                                className="inline-block bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent"
                                initial={{ opacity: 0, y: 40 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                                transition={{ duration: 0.8, delay: TIMING.text2Start, ease: easeOutExpo }}
                            >
                                to Insights
                            </motion.span>

                            <motion.span
                                className="inline-block mx-2 md:mx-4 text-[#ff5722]"
                                initial={{ opacity: 0, scale: 0.3 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 }}
                                transition={{ duration: 0.5, delay: TIMING.arrow2Start, ease: easeOutBack }}
                            >
                                →
                            </motion.span>

                            <motion.span
                                className="inline-block bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent"
                                initial={{ opacity: 0, y: 40 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                                transition={{ duration: 0.8, delay: TIMING.text3Start, ease: easeOutExpo }}
                            >
                                to Savings
                            </motion.span>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.8, delay: TIMING.subtitleStart, ease: easeOutExpo }}
                            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
                        >
                            Upload your PDF. Our AI extracts every detail to unlock your solar potential.
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 - Desktop with construction */}
                        <motion.div
                            className="group relative"
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={constructionVariants}
                            transition={{
                                duration: TIMING.card1Duration,
                                delay: TIMING.card1Start,
                                ease: easeOutExpo,
                            }}
                        >
                            {isInView && <ScanLine delay={TIMING.card1Start} duration={TIMING.card1Duration} />}
                            {isInView && <GridOverlay delay={TIMING.card1Start} duration={TIMING.card1Duration} />}

                            <motion.div
                                className="absolute inset-0 bg-[#ff5722] rounded-3xl -z-10"
                                style={{ filter: "blur(60px)" }}
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: [0, 0.5, 0.2, 0] } : { opacity: 0 }}
                                transition={{
                                    duration: TIMING.card1Duration,
                                    delay: TIMING.card1Start,
                                    times: [0, 0.2, 0.6, 1]
                                }}
                            />

                            <motion.div
                                className="relative p-10 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-[#ff5722]/30 hover:shadow-[0_0_40px_rgba(255,87,34,0.2)]"
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                variants={{
                                    hidden: {},
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.15,
                                            delayChildren: TIMING.card1Start + TIMING.card1Duration * 0.5,
                                        }
                                    }
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#ff5722]/0 via-[#ff5722]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <motion.div className="relative mb-8 flex justify-center" variants={cardContentVariants}>
                                    <div className="relative">
                                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="group-hover:scale-110 transition-transform duration-500">
                                            <rect x="15" y="20" width="50" height="50" rx="4" fill="url(#uploadGrad1)" opacity="0.2" />
                                            <rect x="15" y="20" width="50" height="50" rx="4" stroke="#ff5722" strokeWidth="2" />
                                            <path d="M40 30 L40 55 M30 40 L40 30 L50 40" stroke="#ff5722" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-colors duration-300" />
                                            <defs>
                                                <linearGradient id="uploadGrad1" x1="15" y1="20" x2="65" y2="70">
                                                    <stop offset="0%" stopColor="#ff5722" />
                                                    <stop offset="100%" stopColor="#d84315" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                        <div className="absolute inset-0 bg-[#ff5722] blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
                                    </div>
                                </motion.div>

                                <motion.h3 className="text-2xl font-bold mb-3 text-white" variants={cardContentVariants}>
                                    Upload Bill
                                </motion.h3>

                                <motion.p className="text-white/50 leading-relaxed" variants={cardContentVariants}>
                                    Drop your electricity bill PDF. We handle the rest.
                                </motion.p>

                                <div className="absolute top-6 right-6 text-6xl font-bold text-white/5">01</div>
                            </motion.div>
                        </motion.div>

                        {/* Card 2 - Desktop featured with construction */}
                        <motion.div
                            className="group relative"
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={constructionVariants}
                            transition={{
                                duration: TIMING.card2Duration,
                                delay: TIMING.card2Start,
                                ease: easeOutExpo,
                            }}
                        >
                            {isInView && <ScanLine delay={TIMING.card2Start} duration={TIMING.card2Duration} />}
                            {isInView && <GridOverlay delay={TIMING.card2Start} duration={TIMING.card2Duration} />}

                            <motion.div
                                className="absolute inset-0 bg-[#ff5722] rounded-3xl -z-10"
                                style={{ filter: "blur(70px)" }}
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: [0, 0.7, 0.25, 0.1] } : { opacity: 0 }}
                                transition={{
                                    duration: TIMING.card2Duration,
                                    delay: TIMING.card2Start,
                                    times: [0, 0.2, 0.5, 1]
                                }}
                            />

                            <motion.div
                                className="relative p-10 rounded-3xl bg-gradient-to-br from-[#ff5722]/20 to-[#d84315]/10 border border-[#ff5722]/30 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-[#ff5722]/60 hover:shadow-[0_0_60px_rgba(255,87,34,0.4),0_0_100px_rgba(255,87,34,0.2)]"
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                variants={{
                                    hidden: {},
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.18,
                                            delayChildren: TIMING.card2Start + TIMING.card2Duration * 0.5,
                                        }
                                    }
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#ff5722]/15 via-[#ff5722]/5 to-transparent" />

                                <motion.div className="relative mb-8 flex justify-center" variants={cardContentVariants}>
                                    <div className="relative">
                                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="group-hover:scale-110 transition-transform duration-500">
                                            <circle cx="40" cy="40" r="25" stroke="url(#aiGrad1)" strokeWidth="2.5" fill="none" />
                                            <circle cx="40" cy="40" r="18" stroke="url(#aiGrad1)" strokeWidth="1.5" fill="none" opacity="0.5" />
                                            <circle cx="40" cy="40" r="11" stroke="url(#aiGrad1)" strokeWidth="1" fill="none" opacity="0.3" />
                                            <motion.g
                                                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                            >
                                                <path d="M40 28 L41 35 L48 36 L41 37 L40 44 L39 37 L32 36 L39 35 Z" fill="#ff5722" />
                                            </motion.g>
                                            <defs>
                                                <linearGradient id="aiGrad1" x1="15" y1="15" x2="65" y2="65">
                                                    <stop offset="0%" stopColor="#ff5722" />
                                                    <stop offset="50%" stopColor="#ff3d00" />
                                                    <stop offset="100%" stopColor="#d84315" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                        <div className="absolute inset-0 bg-[#ff5722] blur-3xl opacity-60 -z-10" />
                                    </div>
                                </motion.div>

                                <motion.h3 className="text-2xl font-bold mb-3 text-white" variants={cardContentVariants}>
                                    AI Analysis
                                </motion.h3>

                                <motion.p className="text-white/70 leading-relaxed" variants={cardContentVariants}>
                                    Extract usage, tariffs, and waste patterns instantly.
                                </motion.p>

                                <div className="absolute top-6 right-6 text-6xl font-bold text-white/10">02</div>
                            </motion.div>
                        </motion.div>

                        {/* Card 3 - Desktop with construction */}
                        <motion.div
                            className="group relative"
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={constructionVariants}
                            transition={{
                                duration: TIMING.card3Duration,
                                delay: TIMING.card3Start,
                                ease: easeOutExpo,
                            }}
                        >
                            {isInView && <ScanLine delay={TIMING.card3Start} duration={TIMING.card3Duration} />}
                            {isInView && <GridOverlay delay={TIMING.card3Start} duration={TIMING.card3Duration} />}

                            <motion.div
                                className="absolute inset-0 bg-[#ff5722] rounded-3xl -z-10"
                                style={{ filter: "blur(60px)" }}
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: [0, 0.5, 0.2, 0] } : { opacity: 0 }}
                                transition={{
                                    duration: TIMING.card3Duration,
                                    delay: TIMING.card3Start,
                                    times: [0, 0.2, 0.6, 1]
                                }}
                            />

                            <motion.div
                                className="relative p-10 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-[#ff5722]/30 hover:shadow-[0_0_40px_rgba(255,87,34,0.2)]"
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                variants={{
                                    hidden: {},
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.15,
                                            delayChildren: TIMING.card3Start + TIMING.card3Duration * 0.5,
                                        }
                                    }
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#ff5722]/0 via-[#ff5722]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <motion.div className="relative mb-8 flex justify-center" variants={cardContentVariants}>
                                    <div className="relative">
                                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="group-hover:scale-110 transition-transform duration-500">
                                            <path
                                                d="M45 15 L25 45 L35 45 L30 65 L55 35 L45 35 Z"
                                                fill="url(#lightningGrad1)"
                                                className="drop-shadow-[0_0_10px_rgba(255,87,34,0.8)]"
                                            />
                                            <path
                                                d="M45 15 L25 45 L35 45 L30 65 L55 35 L45 35 Z"
                                                stroke="#ff5722"
                                                strokeWidth="1.5"
                                                fill="none"
                                            />
                                            <defs>
                                                <linearGradient id="lightningGrad1" x1="30" y1="15" x2="50" y2="65">
                                                    <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
                                                    <stop offset="100%" stopColor="#ff5722" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                        <div className="absolute inset-0 bg-[#ff5722] blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
                                    </div>
                                </motion.div>

                                <motion.h3 className="text-2xl font-bold mb-3 text-white" variants={cardContentVariants}>
                                    Save Money
                                </motion.h3>

                                <motion.p className="text-white/50 leading-relaxed" variants={cardContentVariants}>
                                    Get personalised appliance schedules and solar-hour recommendations.
                                </motion.p>

                                <div className="absolute top-6 right-6 text-6xl font-bold text-white/5">03</div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
