"use client";

import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Check, Loader2, AlertCircle } from "lucide-react";

// Dynamically import Hyperspeed to avoid SSR issues with Three.js
const Hyperspeed = dynamic(() => import("@/components/Hyperspeed"), {
    ssr: false,
});

// Static configuration to prevent re-renders
const HYPERSPEED_OPTIONS = {
    onSpeedUp: () => { },
    onSlowDown: () => { },
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 4,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 30,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.03, 400 * 0.2],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.8, 0.8],
    carFloorSeparation: [0, 5],
    colors: {
        roadColor: 0x080808,
        islandColor: 0x0a0a0a,
        background: 0x000000,
        shoulderLines: 0xffffff,
        brokenLines: 0xffffff,
        leftCars: [0xff5722, 0xff8a50, 0xffab40],  // bright orange to yellow-orange
        rightCars: [0xffffff, 0xffe0b2, 0xffcc80], // white to light orange
        sticks: 0xff7043 // coral orange
    }
};

interface WaitlistProps {
    id?: string;
}

export function Waitlist({ id }: WaitlistProps) {
    const [formData, setFormData] = useState({
        email: "",
        suburb: "",
        systemSize: "",
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [isFormFocused, setIsFormFocused] = useState(false);

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            setStatus("error");
            setErrorMessage("Please enter a valid email address");
            return;
        }

        setStatus("submitting");
        setErrorMessage("");

        // Simulate network delay
        setTimeout(() => {
            setStatus("success");
            setFormData({ email: "", suburb: "", systemSize: "" });
        }, 1500);
    };

    return (
        <section id={id} className="min-h-[90vh] flex items-center justify-center py-32 relative overflow-hidden isolate">
            {/* Hyperspeed Background Effect */}
            <motion.div
                className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.35 }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            >
                <Hyperspeed effectOptions={HYPERSPEED_OPTIONS} />
            </motion.div>

            {/* Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70 pointer-events-none" />

            {/* Glowing Orb - animated */}
            <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#ff5722] rounded-full blur-[200px]"
                animate={{ opacity: [0.12, 0.18, 0.12] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="max-w-2xl mx-auto px-4 w-full relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative overflow-hidden group"
                    style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                >
                    <motion.div
                        className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-white/[0.01]"
                        animate={{
                            background: isFormFocused
                                ? 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.08) 100%)'
                                : 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.01) 100%)'
                        }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        style={{
                            backdropFilter: isFormFocused ? "blur(60px) saturate(180%)" : "blur(0px) saturate(180%)",
                            WebkitBackdropFilter: isFormFocused ? "blur(60px) saturate(180%)" : "blur(0px) saturate(180%)",
                            transition: 'backdrop-filter 0.5s ease-in-out, -webkit-backdrop-filter 0.5s ease-in-out',
                            willChange: 'backdrop-filter',
                            transform: 'translateZ(0)' // Force GPU layer
                        }}
                    />

                    {/* Inner Glass Layer */}
                    <motion.div
                        className="absolute inset-[1px] rounded-[2.4rem] bg-gradient-to-br from-white/[0.05] to-transparent"
                        animate={{
                            opacity: isFormFocused ? 1 : 0.7
                        }}
                        transition={{ duration: 0.5 }}
                        style={{
                            backdropFilter: "blur(0px)",
                            WebkitBackdropFilter: "blur(0px)",
                        }}
                    />

                    {/* Premium Border Effect */}
                    <div className="absolute inset-0 rounded-[2.5rem] border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_20px_60px_rgba(0,0,0,0.4)]" />

                    {/* Content */}
                    <div className="relative z-10 p-8 md:p-14">
                        <motion.div
                            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff5722]/10 border border-[#ff5722]/20 text-sm text-[#ff5722] mb-6"
                        >
                            <motion.span
                                className="w-1.5 h-1.5 rounded-full bg-[#ff5722]"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            Limited Early Access
                        </motion.div>
                        <motion.h2
                            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-b from-white via-white to-white/80 bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(255,255,255,0.2)]"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                        >
                            Stop Wasting Your Solar.
                        </motion.h2>
                        <motion.p
                            className="text-white/60 text-base md:text-lg mb-10 max-w-lg mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                        >
                            Join the waitlist for early access to SolarSaver and unlock your hidden savings.
                        </motion.p>

                        <form onSubmit={handleSubmit}
                            className="space-y-5 text-left max-w-md mx-auto"
                            onFocus={() => setIsFormFocused(true)}
                            onBlur={(e) => {
                                // Only set to false if focus is leaving the form entirely
                                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                                    setIsFormFocused(false);
                                }
                            }}
                        >
                            <AnimatePresence mode="wait">
                                {status === "success" ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-center py-8 bg-white/5 rounded-2xl border border-white/10"
                                    >
                                        <div className="flex justify-center mb-4">
                                            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                                                <Check className="w-6 h-6 text-green-500" />
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#ff5722] mb-2">You&apos;re on the list!</h3>
                                        <p className="text-white/80">We&apos;ll be in touch soon.</p>
                                        <button
                                            type="button"
                                            onClick={() => setStatus("idle")}
                                            className="mt-6 text-sm text-white/40 hover:text-white transition-colors"
                                        >
                                            Add another email
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div className="space-y-5">
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-semibold text-white/90 mb-2.5 drop-shadow-sm">
                                                    Email Address
                                                </label>
                                                <div className="relative">
                                                    {/* iOS-style Input Glass Effect */}
                                                    <div className="absolute inset-0 rounded-2xl bg-white/5 border border-white/10"
                                                        style={{
                                                            backdropFilter: "blur(10px) saturate(180%)",
                                                            WebkitBackdropFilter: "blur(10px) saturate(180%)",
                                                        }}
                                                    />
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        required
                                                        className="relative w-full h-14 px-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 focus:border-[#ff5722]/60 focus:ring-2 focus:ring-[#ff5722]/30 focus:bg-white/[0.08] outline-none transition-all duration-300 text-white placeholder:text-white/40 font-medium shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]"
                                                        placeholder="you@example.com"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        style={{ willChange: 'background-color' }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="suburb" className="block text-sm font-semibold text-white/90 mb-2.5 drop-shadow-sm">
                                                        Suburb <span className="text-white/50 font-normal">(Optional)</span>
                                                    </label>
                                                    <div className="relative">
                                                        <div className="absolute inset-0 rounded-2xl bg-white/5 border border-white/10"
                                                            style={{
                                                                backdropFilter: "blur(10px) saturate(180%)",
                                                                WebkitBackdropFilter: "blur(10px) saturate(180%)",
                                                            }}
                                                        />
                                                        <input
                                                            type="text"
                                                            id="suburb"
                                                            className="relative w-full h-14 px-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 focus:border-[#ff5722]/60 focus:ring-2 focus:ring-[#ff5722]/30 focus:bg-white/[0.08] outline-none transition-all duration-300 text-white placeholder:text-white/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]"
                                                            placeholder="e.g. Bondi"
                                                            value={formData.suburb}
                                                            onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                                                            style={{ willChange: 'background-color' }}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="systemSize" className="block text-sm font-semibold text-white/90 mb-2.5 drop-shadow-sm">
                                                        System Size <span className="text-white/50 font-normal">(Optional)</span>
                                                    </label>
                                                    <div className="relative">
                                                        <div className="absolute inset-0 rounded-2xl bg-white/5 border border-white/10"
                                                            style={{
                                                                backdropFilter: "blur(10px) saturate(180%)",
                                                                WebkitBackdropFilter: "blur(10px) saturate(180%)",
                                                            }}
                                                        />
                                                        <input
                                                            type="text"
                                                            id="systemSize"
                                                            className="relative w-full h-14 px-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 focus:border-[#ff5722]/60 focus:ring-2 focus:ring-[#ff5722]/30 focus:bg-white/[0.08] outline-none transition-all duration-300 text-white placeholder:text-white/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]"
                                                            placeholder="e.g. 6.6kW"
                                                            value={formData.systemSize}
                                                            onChange={(e) => setFormData({ ...formData, systemSize: e.target.value })}
                                                            style={{ willChange: 'background-color' }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {status === "error" && (
                                                <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                                                    <AlertCircle className="w-4 h-4" />
                                                    <p className="text-sm font-medium">{errorMessage}</p>
                                                </div>
                                            )}

                                            <Button
                                                size="lg"
                                                disabled={status === "submitting"}
                                                className="w-full mt-8 text-lg h-16 shadow-[0_0_50px_rgba(255,87,34,0.6),0_10px_30px_rgba(255,87,34,0.4)] hover:shadow-[0_0_60px_rgba(255,87,34,0.8),0_15px_40px_rgba(255,87,34,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                                style={{ willChange: 'box-shadow, transform' }}
                                            >
                                                {status === "submitting" ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        Joining...
                                                    </>
                                                ) : (
                                                    "Join Early Access"
                                                )}
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
