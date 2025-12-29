"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Sun, Zap, Battery } from "lucide-react";

export default function GuidePage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#ff5722]/30">
            <Navbar />

            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                {/* Ambient Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff5722]/10 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-[#ff5722]/10 border border-[#ff5722]/20 text-[#ff5722] text-xs font-semibold uppercase tracking-wider mb-6">
                            Exclusive Guide
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                            The Solar Savings <br />
                            <span className="bg-gradient-to-r from-[#ff5722] to-[#ff8a50] bg-clip-text text-transparent">
                                Blueprint
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10">
                            Thanks for subscribing. Here is your free guide to maximizing your solar investment.
                            Implement these 3 strategies today to stop losing money to the grid.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="relative px-6 pb-32">
                <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
                    {[
                        {
                            icon: Sun,
                            title: "Shift Your Load",
                            desc: "Most feed-in tariffs are terrible (3-5c/kWh). Use your high-energy appliances (washing machine, dishwasher) between 10am and 2pm when your solar production is peaking.",
                            action: "Potential Saving: $400/yr"
                        },
                        {
                            icon: Zap,
                            title: "Smart Hot Water",
                            desc: "Your electric hot water system is a giant battery. Install a timer to heat it primarily during solar hours instead of off-peak grid power. It's essentially free energy storage.",
                            action: "Potential Saving: $350/yr"
                        },
                        {
                            icon: Battery,
                            title: "Battery Arbitrage",
                            desc: "If you have a battery, don't just store solar. Configure it to charge from the grid during super-off-peak windows depending on your retailer plan.",
                            action: "Potential Saving: $600/yr"

                        }
                    ].map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/[0.07] transition-colors group"
                        >
                            <div className="w-12 h-12 bg-[#ff5722]/20 rounded-2xl flex items-center justify-center mb-6 text-[#ff5722] group-hover:scale-110 transition-transform">
                                <card.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                            <p className="text-white/60 mb-8 leading-relaxed">
                                {card.desc}
                            </p>
                            <div className="mt-auto pt-6 border-t border-white/10">
                                <span className="text-[#ff5722] font-semibold text-sm">
                                    {card.action}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="max-w-2xl mx-auto mt-20 text-center p-8 rounded-3xl bg-gradient-to-br from-[#ff5722]/20 to-transparent border border-[#ff5722]/30"
                >
                    <h3 className="text-2xl font-bold mb-4">Want the full PDF report?</h3>
                    <p className="text-white/60 mb-8">
                        Our comprehensive technical guide includes retailer comparisons and detailed ROI calculations.
                    </p>
                    <Button
                        size="lg"
                        disabled
                        className="bg-white text-black hover:bg-white/90"
                    >
                        Download PDF (Coming Soon)
                    </Button>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
