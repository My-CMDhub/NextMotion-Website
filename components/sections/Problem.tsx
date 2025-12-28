"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export function Problem() {
    return (
        <>
            <div className="block lg:hidden">
                <ProblemMobile />
            </div>
            <div className="hidden lg:block">
                <ProblemDesktop />
            </div>
        </>
    );
}

function ProblemMobile() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Card 1 (Sell) animations
    const scale1 = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
    const opacity1 = useTransform(scrollYProgress, [0, 0.5], [1, 0.4]);

    // Card 2 (Buy) animations
    const y2 = useTransform(scrollYProgress, [0.2, 0.8], ["100%", "0%"]);
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

    // VS Badge animations
    const scaleVs = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
    const rotateVs = useTransform(scrollYProgress, [0.4, 0.6], [-180, 0]);

    return (
        <section ref={containerRef} className="h-[250vh] relative bg-[#0a0a0a]">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />

                {/* Top Heading */}
                <motion.div
                    style={{ opacity: opacity1 }}
                    className="relative z-30 text-center px-4 mb-8 translate-y-8"
                >
                    <h3 className="text-5xl md:text-7xl font-bold text-white mb-12">Your Solar Is Being Undervalued</h3>
                </motion.div>

                <div className="relative w-full max-w-md h-[500px] flex items-center justify-center">

                    {/* Card 1: You Sell Solar For */}
                    <motion.div
                        style={{ scale: scale1, opacity: opacity1 }}
                        className="absolute inset-0 z-10"
                    >
                        <div className="w-full h-full p-8 rounded-[2.5rem] bg-[#121212] border border-white/10 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden">
                            {/* Inner Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

                            <div className="relative z-10">
                                <h3 className="text-white/50 text-sm uppercase tracking-widest font-semibold mb-6">You Sell Solar For</h3>
                                <div className="relative inline-block mb-6">
                                    <span className="text-8xl font-bold text-white/20 tracking-tighter">4¢</span>
                                    <div className="absolute -top-4 -right-8 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rotate-12">
                                        Low
                                    </div>
                                </div>
                                <p className="text-white/40 text-lg max-w-xs mx-auto leading-relaxed">
                                    Almost Nothing.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2: You Buy It Back For */}
                    <motion.div
                        style={{ y: y2, opacity: opacity2 }}
                        className="absolute inset-0 z-20"
                    >
                        <div className="w-full h-full p-8 rounded-[2.5rem] bg-[#1a1a1a] border border-[#ff5722]/30 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
                            {/* Orange Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#ff5722]/10 to-transparent pointer-events-none" />
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff5722] rounded-full blur-[120px] opacity-20 pointer-events-none" />

                            <div className="relative z-10">
                                <h3 className="text-white/60 text-sm uppercase tracking-widest font-semibold mb-6">You Buy It Back For</h3>
                                <div className="relative inline-block mb-6">
                                    <span className="text-8xl font-bold bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent tracking-tighter">45¢</span>
                                    <div className="absolute -top-4 -right-12 px-4 py-1.5 rounded-full bg-[#ff5722] text-white text-xs font-bold rotate-12 shadow-lg">
                                        High!
                                    </div>
                                </div>
                                <p className="text-white/60 text-lg max-w-xs mx-auto leading-relaxed">
                                    Which is <span className="text-[#ff5722] font-bold">10x more</span>.
                                </p>
                            </div>
                        </div>

                        {/* VS Badge */}
                        <motion.div
                            style={{ scale: scaleVs, rotate: rotateVs }}
                            className="absolute z-30 left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-[#ff5722] to-[#d84315] flex items-center justify-center shadow-[0_0_30px_rgba(255,87,34,0.4)] border-4 border-[#0a0a0a]"
                        >
                            <span className="text-white font-bold text-2xl">VS</span>
                        </motion.div>
                    </motion.div>

                </div>

                {/* Bottom Text */}
                <motion.div
                    style={{ opacity: opacity2 }}
                    className="absolute bottom-12 text-center px-4"
                >
                    <h3 className="text-2xl font-bold text-white mb-2">The math is broken.</h3>
                    <p className="text-white/40">You&apos;re essentially paying a <span className="text-[#ff5722]">900 - 1000% markup</span> on your own energy.</p>
                </motion.div>
            </div>
        </section>
    );
}

function ProblemDesktop() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="min-h-screen flex items-center justify-center py-32 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]" />

            <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
                {/* Top Heading */}
                <motion.div
                    style={{ opacity }}
                    className="text-center mb-12"
                >
                    <h3 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent mb-3">Your Solar Is Being Undervalued</h3>
                </motion.div>

                <motion.div
                    style={{ opacity }}
                    className="relative min-h-[600px] flex items-center justify-center"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="relative w-full max-w-4xl h-[600px] flex items-center justify-center perspective-1000">
                        {/* Sell Side Card - Behind */}
                        <motion.div
                            className="absolute w-[500px] z-10"
                            initial={{ x: -40, y: 0, rotateY: -15, rotateZ: -5, scale: 0.9 }}
                            animate={
                                isHovered
                                    ? { x: -280, y: 0, rotateY: 0, rotateZ: 0, scale: 1, zIndex: 20 }
                                    : { x: -40, y: 0, rotateY: -15, rotateZ: -5, scale: 0.9, zIndex: 10 }
                            }
                            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <div className="relative p-10 rounded-3xl bg-[#121212] border border-white/10 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl h-[450px] flex items-center justify-center group">
                                {/* Subtle Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10 text-center space-y-6">
                                    <div className="text-white/40 text-lg uppercase tracking-widest font-medium mb-4">
                                        You Sell Solar For
                                    </div>

                                    <div className="relative inline-block">
                                        <div className="text-9xl font-bold text-white/30 relative">
                                            4¢
                                            {/* Low Badge */}
                                            <div className="absolute -top-6 -right-12 px-4 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-medium rotate-12">
                                                Low
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-white/50 text-lg leading-relaxed max-w-sm mx-auto">
                                        Almost Nothing.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Buy Side Card - Front */}
                        <motion.div
                            className="absolute w-[500px] z-20"
                            initial={{ x: 40, y: 0, rotateY: 15, rotateZ: 5, scale: 1 }}
                            animate={
                                isHovered
                                    ? { x: 280, y: 0, rotateY: 0, rotateZ: 0, scale: 1 }
                                    : { x: 40, y: 0, rotateY: 15, rotateZ: 5, scale: 1 }
                            }
                            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <div className="relative p-10 rounded-3xl bg-[#1a1a1a] border border-[#ff5722]/30 overflow-hidden shadow-[0_20px_60px_rgba(255,87,34,0.3)] backdrop-blur-xl h-[450px] flex items-center justify-center group">
                                {/* Animated Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#ff5722]/20 to-transparent animate-pulse" />

                                {/* Glowing Orb */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff5722] rounded-full blur-[100px] opacity-30" />

                                <div className="relative z-10 text-center space-y-6">
                                    <div className="text-white/60 text-lg uppercase tracking-widest font-medium mb-4">
                                        You Buy It Back For
                                    </div>

                                    <div className="relative inline-block">
                                        <div className="text-9xl font-bold bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent relative">
                                            45¢
                                            {/* High Badge */}
                                            <div className="absolute -top-6 -right-16 px-5 py-2 rounded-full bg-[#ff5722] border border-[#ff5722] text-white text-sm font-bold rotate-12 shadow-[0_0_20px_rgba(255,87,34,0.6)]">
                                                High!
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-white/70 text-lg leading-relaxed max-w-sm mx-auto">
                                        Which is <span className="text-[#ff5722] font-bold">10x more</span>.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* VS Badge - Appears on Hover */}
                        <motion.div
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
                            initial={{ scale: 0, rotate: -180, opacity: 0 }}
                            animate={
                                isHovered
                                    ? { scale: 1, rotate: 0, opacity: 1 }
                                    : { scale: 0, rotate: -180, opacity: 0 }
                            }
                            transition={{ duration: 0.4, delay: 0.1, ease: "backOut" }}
                        >
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ff5722] to-[#d84315] flex items-center justify-center text-white font-bold text-3xl shadow-[0_0_40px_rgba(255,87,34,0.6)] border-4 border-[#0a0a0a]">
                                VS
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Bottom Message - No animation, always visible */}
                <div className="text-center mt-28">
                    <h3 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent mb-4">
                        The math is broken.
                    </h3>
                    <p className="text-xl text-white/50 max-w-2xl mx-auto">
                        You&apos;re essentially paying a <span className="text-[#ff5722] font-bold">900 - 1000% markup</span> on your own energy.
                    </p>
                </div>
            </div>
        </section>
    );
}
