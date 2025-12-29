"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import TextReveal from "@/components/ui/text-reveal";
import { ArrowRight, Upload, Sparkles } from "lucide-react";
import { useRef } from "react";
import Orb from "@/components/Orb";

// Premium easing curves
const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Smoother parallax with spring physics
    const y1Raw = useTransform(scrollY, [0, 600], [0, 150]);
    const y1 = useSpring(y1Raw, springConfig);

    const opacityRaw = useTransform(scrollY, [0, 400], [1, 0]);
    const opacity = useSpring(opacityRaw, springConfig);

    const scaleRaw = useTransform(scrollY, [0, 400], [1, 0.95]);
    const scale = useSpring(scaleRaw, springConfig);

    // Split text for sequential reveal
    const headingLine1 = "Turn your solar bill into";
    const headingLine2 = "Instant Savings.";

    // Stagger animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: easeOutExpo,
            },
        },
    };

    return (
        <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-10">
            {/* Ambient light effects */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#ff5722] rounded-full blur-[200px] opacity-[0.08]"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.08, 0.12, 0.08]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#ff3d00] rounded-full blur-[180px] opacity-[0.06]"
                    animate={{
                        scale: [1.1, 1, 1.1],
                        opacity: [0.06, 0.1, 0.06]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* WebGL Orb Background - z-10 to be above ambient but receive mouse events */}
            <motion.div
                className="absolute inset-0 z-10 overflow-hidden flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: easeOutExpo }}
            >
                <div className="w-[1200px] h-[1200px]">
                    <Orb
                        hue={0}
                        hoverIntensity={0.15}
                        rotateOnHover={false}
                        forceHoverState={false}
                    />
                </div>
            </motion.div>

            {/* Solar Grid Pattern with animated opacity */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 2, delay: 0.5 }}
                style={{
                    maskImage: "radial-gradient(circle at center, black 0%, transparent 70%)",
                    WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 70%)"
                }}
            >
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="heroGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#heroGrid)" />
                </svg>
            </motion.div>

            {/* Content - pointer-events-none on container, but auto on interactive elements */}
            <motion.div
                className="relative z-20 text-center px-4 max-w-6xl mx-auto flex flex-col items-center gap-6 pointer-events-none"
                style={{ y: y1, opacity, scale }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Badge - Enhanced glassmorphism */}
                <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.08] backdrop-blur-2xl border border-white/15 text-sm font-semibold text-white mb-4 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]"
                    style={{
                        backdropFilter: "blur(24px) saturate(180%)",
                        WebkitBackdropFilter: "blur(24px) saturate(180%)",
                    }}
                >
                    <motion.div className="relative">
                        <motion.span
                            className="w-2.5 h-2.5 rounded-full bg-[#ff5722] block"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            style={{ boxShadow: "0 0 12px #ff5722, 0 0 24px rgba(255, 87, 34, 0.5)" }}
                        />
                        <motion.span
                            className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-[#ff5722]"
                            animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        />
                    </motion.div>
                    <Sparkles className="w-4 h-4 text-[#ff5722]" />
                    <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                        AI-Powered Solar Optimization
                    </span>
                </motion.div>

                {/* Main Heading - Enhanced reveal */}
                <motion.h1
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]"
                    variants={itemVariants}
                >
                    {/* First line */}
                    <div className="block">
                        <TextReveal
                            text={headingLine1}
                            className="bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent drop-shadow-[0_2px_30px_rgba(255,255,255,0.1)]"
                            gradient={true}
                            delay={0.3}
                        />
                    </div>

                    {/* Second line */}
                    <div className="relative inline-block mt-2">
                        <TextReveal
                            text={headingLine2}
                            className="bg-gradient-to-r from-[#ff5722] via-[#ff3d00] to-[#ff8a50] bg-clip-text text-transparent drop-shadow-[0_2px_30px_rgba(255,87,34,0.3)]"
                            gradient={true}
                            delay={0.7}
                        />
                        {/* Animated underline with glow */}
                        <motion.div
                            className="absolute -bottom-3 left-0 right-0 h-[3px] rounded-full overflow-hidden"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1, delay: 1.4, ease: easeOutExpo }}
                        >
                            <motion.div
                                className="h-full bg-gradient-to-r from-transparent via-[#ff5722] to-transparent"
                                animate={{
                                    boxShadow: [
                                        "0 0 10px #ff5722, 0 0 20px rgba(255, 87, 34, 0.5)",
                                        "0 0 20px #ff5722, 0 0 40px rgba(255, 87, 34, 0.7)",
                                        "0 0 10px #ff5722, 0 0 20px rgba(255, 87, 34, 0.5)"
                                    ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.div>
                    </div>
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-lg sm:text-xl md:text-2xl text-white/55 max-w-3xl leading-relaxed mt-4"
                >
                    Upload your electricity bill. Get personalized money-saving insights.
                    <span className="text-white/80 font-medium"> Stop losing free solar energy to the grid.</span>
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 mt-6 pointer-events-auto"
                >
                    <motion.a
                        href="#join-waitlist"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                        <Button size="lg" className="group text-lg px-10 h-14">
                            Join Waitlist
                            <motion.span
                                className="ml-2"
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <ArrowRight className="w-5 h-5" />
                            </motion.span>
                        </Button>
                    </motion.a>

                    <motion.a
                        href="#how-it-works"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                        <Button variant="secondary" size="lg" className="text-lg px-10 h-14">
                            <Upload className="w-5 h-5 mr-2" />
                            See How It Works
                        </Button>
                    </motion.a>
                </motion.div>

                {/* Stats Preview - Enhanced with stagger */}
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-3 gap-6 md:gap-10 mt-10 max-w-3xl w-full"
                >
                    {[
                        { value: "70%", label: "Solar Wasted", delay: 0 },
                        { value: "$400", label: "Avg. Annule Loss", delay: 0.1 },
                        { value: "AI", label: "Precision Analysis", delay: 0.2 },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-center group cursor-default"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.2 + stat.delay, ease: easeOutExpo }}
                            whileHover={{ y: -4 }}
                        >
                            <motion.div
                                className="text-3xl md:text-5xl font-bold text-[#ff5722] mb-1"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                style={{ textShadow: "0 0 30px rgba(255, 87, 34, 0.4)" }}
                            >
                                {stat.value}
                            </motion.div>
                            <div className="text-xs md:text-sm text-white/40 font-medium tracking-wide uppercase">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll Indicator - Enhanced */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 1, ease: easeOutExpo }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            >
                <motion.span
                    className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/25"
                    animate={{ opacity: [0.25, 0.5, 0.25] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Scroll to Explore
                </motion.span>
                <motion.div
                    className="relative w-5 h-8 rounded-full border border-white/20 flex justify-center"
                    style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)" }}
                >
                    <motion.div
                        className="w-1 h-2 bg-[#ff5722] rounded-full mt-1.5"
                        animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        style={{ boxShadow: "0 0 6px #ff5722" }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}
