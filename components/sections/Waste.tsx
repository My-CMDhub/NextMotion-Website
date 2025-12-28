"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingDown, DollarSign, Zap, AlertTriangle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Waste() {
    const containerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<SVGPathElement>(null);
    const areaRef = useRef<SVGPathElement>(null);
    const [wastedValue, setWastedValue] = useState(0);
    const [exportPercent, setExportPercent] = useState(0);
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        if (!chartRef.current || !areaRef.current || !containerRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                end: "top 20%",
                toggleActions: "play none none reverse",
                onEnter: () => setIsAnimated(true),
                onLeaveBack: () => setIsAnimated(false),
            },
        });

        tl.fromTo(
            areaRef.current,
            { opacity: 0, scaleY: 0, transformOrigin: "bottom" },
            { opacity: 1, scaleY: 1, duration: 1.5, ease: "power3.out" }
        )
            .fromTo(
                chartRef.current,
                { strokeDashoffset: 2000 },
                { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" },
                "-=1"
            )
            .to(
                {},
                {
                    duration: 1.5,
                    onUpdate: function () {
                        const progress = this.progress();
                        setExportPercent(Math.floor(progress * 72));
                        setWastedValue(Math.floor(progress * 438));
                    },
                },
                "-=1"
            );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section ref={containerRef} className="min-h-screen flex flex-col items-center justify-center py-32 relative bg-[#0a0a0a] overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ff5722] rounded-full opacity-10 blur-[200px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        viewport={{ once: true, amount: 0.6 }}
                        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent"
                    >
                        The Hidden Energy Loss
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        viewport={{ once: true, amount: 0.6 }}
                        className="text-xl text-white/50 max-w-3xl mx-auto"
                    >
                        Most solar homes export over <span className="text-[#ff5722] font-bold">70% of their solar energy</span> to the grid.
                        <br />
                        <span className="text-white/70">Here&apos;s what you&apos;re actually losing...</span>
                    </motion.p>
                </div>

                {/* Dashboard Container - Premium Glassmorphism */}
                <div className="relative w-full rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent backdrop-blur-2xl border border-white/10 p-8 md:p-12 overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_20px_60px_rgba(0,0,0,0.4)]">

                    {/* Inner Glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

                    {/* Grid Background */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                        <svg width="100%" height="100%">
                            <defs>
                                <pattern id="dashboardGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ff5722" strokeWidth="0.5" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#dashboardGrid)" />
                        </svg>
                    </div>

                    {/* Top Stats Cards */}
                    <div className="grid md:grid-cols-4 gap-6 mb-8 relative z-10">
                        {/* Wasted Solar Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-red-500/[0.08] to-transparent backdrop-blur-xl rounded-2xl p-6 border border-red-500/20 hover:border-red-500/40 transition-colors duration-500 group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors duration-500">
                                    <TrendingDown className="w-5 h-5 text-red-400" />
                                </div>
                                <AlertTriangle className="w-5 h-5 text-red-400/50" />
                            </div>
                            <div className="text-4xl font-bold text-red-400 mb-1 tracking-tight">{exportPercent}%</div>
                            <div className="text-sm text-white/40 font-medium">Energy Exported</div>
                        </motion.div>

                        {/* Money Lost Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-[#ff5722]/[0.08] to-transparent backdrop-blur-xl rounded-2xl p-6 border border-[#ff5722]/20 hover:border-[#ff5722]/40 transition-colors duration-500 group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-10 h-10 rounded-xl bg-[#ff5722]/10 flex items-center justify-center group-hover:bg-[#ff5722]/20 transition-colors duration-500">
                                    <DollarSign className="w-5 h-5 text-[#ff5722]" />
                                </div>
                            </div>
                            <div className="text-4xl font-bold text-[#ff5722] mb-1 tracking-tight">${wastedValue}</div>
                            <div className="text-sm text-white/40 font-medium">Lost This Year</div>
                        </motion.div>

                        {/* Potential Savings Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-green-500/[0.08] to-transparent backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 hover:border-green-500/40 transition-colors duration-500 group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors duration-500">
                                    <Zap className="w-5 h-5 text-green-400" />
                                </div>
                            </div>
                            <div className="text-4xl font-bold text-green-400 mb-1 tracking-tight">$320</div>
                            <div className="text-sm text-white/40 font-medium">Can Be Saved</div>
                        </motion.div>

                        {/* Peak Waste Time Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors duration-500"
                        >
                            <div className="text-sm text-white/40 mb-3 font-medium uppercase tracking-wider">Peak Waste</div>
                            <div className="text-3xl font-bold text-white mb-1 tracking-tight">10AM-2PM</div>
                            <div className="text-sm text-white/40 font-medium">Optimal Shift Window</div>
                        </motion.div>
                    </div>

                    {/* Main Chart Area */}
                    <div className="relative w-full h-[400px] rounded-2xl bg-black/40 backdrop-blur-md border border-white/5 p-6 overflow-hidden shadow-inner">
                        <svg className="w-full h-full relative z-10" viewBox="0 0 1000 350" preserveAspectRatio="none">
                            <defs>
                                {/* Orange Gradient for Wasted Area */}
                                <linearGradient id="wasteGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#ff5722" stopOpacity="0.6" />
                                    <stop offset="50%" stopColor="#d84315" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#bf360c" stopOpacity="0.0" />
                                </linearGradient>
                            </defs>

                            {/* Time Labels */}
                            <text x="50" y="340" fill="#444" fontSize="12" fontWeight="600" letterSpacing="1">6 AM</text>
                            <text x="480" y="340" fill="#444" fontSize="12" fontWeight="600" letterSpacing="1">12 PM</text>
                            <text x="920" y="340" fill="#444" fontSize="12" fontWeight="600" letterSpacing="1">6 PM</text>

                            {/* Wasted Solar Area */}
                            <path
                                ref={areaRef}
                                d="M 50 300 
                   Q 150 300 200 220 
                   T 350 120 
                   Q 450 50 550 70
                   T 750 160
                   Q 850 240 950 300
                   L 950 300 L 50 300 Z"
                                fill="url(#wasteGradient)"
                            />

                            {/* Solar Generation Line */}
                            <path
                                ref={chartRef}
                                d="M 50 300 
                   Q 150 300 200 220 
                   T 350 120 
                   Q 450 50 550 70
                   T 750 160
                   Q 850 240 950 300"
                                fill="none"
                                stroke="#ff5722"
                                strokeWidth="3"
                                strokeDasharray="2000"
                                strokeDashoffset="2000"
                                className="drop-shadow-[0_0_10px_rgba(255,87,34,0.5)]"
                            />

                            {/* Annotation Points with Sci-Fi Style */}

                            {/* Point 1: Morning Start (8AM) */}
                            {isAnimated && (
                                <motion.g
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.8, duration: 0.5 }}
                                >
                                    {/* White Dot */}
                                    <circle cx="200" cy="220" r="4" fill="#fff" className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                                    {/* Pulsing Ring */}
                                    <motion.circle
                                        cx="200"
                                        cy="220"
                                        r="8"
                                        fill="none"
                                        stroke="#4ade80"
                                        strokeWidth="1.5"
                                        opacity="0.6"
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.2, 0.6] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                    {/* Connecting Line */}
                                    <line x1="200" y1="220" x2="200" y2="180" stroke="#4ade80" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
                                    {/* Label Box */}
                                    <rect x="120" y="140" width="160" height="32" rx="16" fill="rgba(74, 222, 128, 0.1)" stroke="#4ade80" strokeWidth="1" strokeOpacity="0.3" />
                                    <text x="200" y="161" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="600" letterSpacing="0.5">GENERATION START</text>
                                </motion.g>
                            )}

                            {/* Point 2: Peak Generation (12PM) */}
                            {isAnimated && (
                                <motion.g
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 2.2, duration: 0.5 }}
                                >
                                    {/* White Dot */}
                                    <circle cx="550" cy="70" r="5" fill="#fff" className="drop-shadow-[0_0_10px_rgba(255,255,255,1)]" />
                                    {/* Pulsing Ring */}
                                    <motion.circle
                                        cx="550"
                                        cy="70"
                                        r="12"
                                        fill="none"
                                        stroke="#ff5722"
                                        strokeWidth="2"
                                        opacity="0.7"
                                        animate={{ scale: [1, 1.6, 1], opacity: [0.7, 0.2, 0.7] }}
                                        transition={{ duration: 2.5, repeat: Infinity }}
                                    />
                                    {/* Connecting Line */}
                                    <line x1="550" y1="70" x2="550" y2="20" stroke="#ff5722" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5" />
                                    {/* Label Box - Larger for Peak */}
                                    <rect x="440" y="-30" width="220" height="42" rx="21" fill="rgba(255, 87, 34, 0.15)" stroke="#ff5722" strokeWidth="1" strokeOpacity="0.4" />
                                    <text x="550" y="-12" textAnchor="middle" fill="#ff5722" fontSize="12" fontWeight="700" letterSpacing="0.5">⚡ PEAK WASTE ZONE</text>
                                    <text x="550" y="4" textAnchor="middle" fill="#ff9e80" fontSize="10" fontWeight="500">Max Export to Grid</text>
                                </motion.g>
                            )}

                            {/* Point 3: High Export (10AM) */}
                            {isAnimated && (
                                <motion.g
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 2.0, duration: 0.5 }}
                                >
                                    {/* White Dot */}
                                    <circle cx="350" cy="120" r="4" fill="#fff" className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                                    {/* Pulsing Ring */}
                                    <motion.circle
                                        cx="350"
                                        cy="120"
                                        r="9"
                                        fill="none"
                                        stroke="#fbbf24"
                                        strokeWidth="1.5"
                                        opacity="0.6"
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.2, 0.6] }}
                                        transition={{ duration: 2.2, repeat: Infinity }}
                                    />
                                    {/* Connecting Line */}
                                    <line x1="350" y1="120" x2="350" y2="210" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
                                    {/* Label Box */}
                                    <rect x="260" y="215" width="180" height="32" rx="16" fill="rgba(251, 191, 36, 0.1)" stroke="#fbbf24" strokeWidth="1" strokeOpacity="0.3" />
                                    <text x="350" y="236" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="600" letterSpacing="0.5">HIGH EXPORT PERIOD</text>
                                </motion.g>
                            )}

                            {/* Point 4: Declining (3PM) */}
                            {isAnimated && (
                                <motion.g
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 2.4, duration: 0.5 }}
                                >
                                    {/* White Dot */}
                                    <circle cx="750" cy="160" r="4" fill="#fff" className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                                    {/* Pulsing Ring */}
                                    <motion.circle
                                        cx="750"
                                        cy="160"
                                        r="8"
                                        fill="none"
                                        stroke="#60a5fa"
                                        strokeWidth="1.5"
                                        opacity="0.6"
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.2, 0.6] }}
                                        transition={{ duration: 2.3, repeat: Infinity }}
                                    />
                                    {/* Connecting Line */}
                                    <line x1="750" y1="160" x2="820" y2="190" stroke="#60a5fa" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
                                    {/* Label Box */}
                                    <rect x="735" y="195" width="170" height="32" rx="16" fill="rgba(96, 165, 250, 0.1)" stroke="#60a5fa" strokeWidth="1" strokeOpacity="0.3" />
                                    <text x="820" y="216" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="600" letterSpacing="0.5">EVENING DECLINE</text>
                                </motion.g>
                            )}
                        </svg>
                    </div>

                    {/* Bottom Insight Cards */}
                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 2.5 }}
                            viewport={{ once: true }}
                            className="bg-white/[0.03] backdrop-blur-xl rounded-2xl p-6 border border-white/5 hover:bg-white/[0.05] transition-colors duration-300"
                        >
                            <div className="text-xs text-white/40 mb-2 uppercase tracking-wider font-semibold">Daily Pattern</div>
                            <div className="text-lg text-white/80 font-medium leading-relaxed">Peak generation happens — <span className="text-[#ff5722] font-bold">when the grid pays the least</span> and peak usage happens <span className="text-[#ff5722] font-bold">when it costs the most.</span></div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 2.7 }}
                            viewport={{ once: true }}
                            className="bg-white/[0.03] backdrop-blur-xl rounded-2xl p-6 border border-white/5 hover:bg-white/[0.05] transition-colors duration-300"
                        >
                            <div className="text-xs text-white/40 mb-2 uppercase tracking-wider font-semibold">The Real Cost</div>
                            <div className="text-lg text-white/80 font-medium leading-relaxed">Selling at 5¢ and buying at 45¢ = <span className="text-[#ff5722] font-bold">money left on the table.</span></div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 2.9 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-[#ff5722]/[0.1] to-transparent backdrop-blur-xl rounded-2xl p-6 border border-[#ff5722]/20 hover:border-[#ff5722]/40 transition-colors duration-300"
                        >
                            <div className="text-xs text-[#ff5722] mb-2 uppercase tracking-wider font-bold">The Solution</div>
                            <div className="text-lg text-white font-medium leading-relaxed">Shift your high-consumption appliances into solar hours → <span className="text-[#ff5722] font-bold">Save $320+/year automatically.</span></div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
