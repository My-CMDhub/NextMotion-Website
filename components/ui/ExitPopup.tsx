"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, ArrowRight, Zap } from "lucide-react";

export function ExitPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [hasSeenPopup, setHasSeenPopup] = useState(false);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error" | "duplicate">("idle");

    // Configuration
    const TIME_DELAY = 12000; // 12 seconds
    const SHOW_ONCE_KEY = "solarsaver_popup_seen";

    useEffect(() => {
        // Check if already seen/subscribed
        const seen = localStorage.getItem(SHOW_ONCE_KEY);
        if (seen) {
            setHasSeenPopup(true);
            return;
        }

        // Timer Trigger
        const timer = setTimeout(() => {
            if (!hasSeenPopup) openPopup();
        }, TIME_DELAY);

        // Exit Intent Trigger
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasSeenPopup) {
                openPopup();
            }
        };

        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            clearTimeout(timer);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [hasSeenPopup]);

    const openPopup = () => {
        const seen = localStorage.getItem(SHOW_ONCE_KEY);
        if (!seen) {
            setIsVisible(true);
            setHasSeenPopup(true);
            localStorage.setItem(SHOW_ONCE_KEY, "true");
        }
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("submitting");

        // Simulate network request
        setTimeout(() => {
            setStatus("success");
            // Auto close after success
            setTimeout(() => {
                setIsVisible(false);
            }, 3000);
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Popup Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md p-1"
                    >
                        <div className="relative overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/10 shadow-[0_0_50px_rgba(255,87,34,0.15)]">
                            {/* Decorative Gradients */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff5722]/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/5 blur-[60px] rounded-full translate-y-1/2 -translate-x-1/2" />

                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors z-10"
                            >
                                <X size={20} />
                            </button>

                            <div className="relative p-8 text-center">
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="w-16 h-16 mx-auto bg-gradient-to-br from-[#ff5722]/20 to-[#ff8a50]/5 rounded-2xl flex items-center justify-center mb-6 border border-[#ff5722]/20"
                                >
                                    <Zap className="w-8 h-8 text-[#ff5722]" />
                                </motion.div>

                                <h3 className="text-2xl font-bold text-white mb-2">Wait! Don&apos;t Overpay.</h3>
                                <p className="text-white/60 mb-8 leading-relaxed">
                                    Join 2,000+ Australians saving $2k/year on energy. Get our free solar savings guide instantly.
                                </p>

                                {status === "success" ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-[#2e7d32]/20 border border-[#2e7d32]/50 text-[#4caf50] py-4 rounded-xl"
                                    >
                                        <p className="font-medium">Guide sent to your inbox!</p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="relative">
                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#ff5722]/50 focus:ring-1 focus:ring-[#ff5722]/50 transition-all font-light"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={status === "submitting"}
                                            className="w-full bg-[#ff5722] hover:bg-[#f4511e] text-white font-medium py-3.5 rounded-xl transition-all shadow-[0_4px_20px_rgba(255,87,34,0.25)] hover:shadow-[0_4px_25px_rgba(255,87,34,0.4)] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {status === "submitting" ? (
                                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    Get Free Insights
                                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </button>

                                        {status === "duplicate" && (
                                            <p className="text-[#ffb74d] text-sm mt-2">You&apos;re already on the list!</p>
                                        )}
                                        {status === "error" && (
                                            <p className="text-red-400 text-sm mt-2">Something went wrong. Please try again.</p>
                                        )}
                                    </form>
                                )}

                                <p className="mt-6 text-xs text-white/20">
                                    No spam. Unsubscribe anytime.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
