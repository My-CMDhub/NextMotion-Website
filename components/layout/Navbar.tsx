"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sun, Menu, X } from "lucide-react";
import { useState } from "react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    const navLinks = [
        { href: "#problem", label: "Problem" },
        { href: "#solution", label: "Solution" },
        { href: "#how-it-works", label: "How it Works" },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: easeOutExpo }}
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pt-4 md:pt-6 px-4 pointer-events-none"
            >
                <motion.div
                    className="pointer-events-auto rounded-full px-4 md:px-6 py-2.5 md:py-3 flex items-center gap-4 md:gap-8"
                    animate={{
                        backgroundColor: scrolled ? "rgba(0, 0, 0, 0.85)" : "rgba(0, 0, 0, 0.6)",
                        borderColor: scrolled ? "rgba(255, 87, 34, 0.3)" : "rgba(255, 87, 34, 0.15)",
                        boxShadow: scrolled
                            ? "0 0 40px rgba(255, 87, 34, 0.25), 0 10px 30px rgba(0, 0, 0, 0.4)"
                            : "0 0 20px rgba(255, 87, 34, 0.15), 0 8px 20px rgba(0, 0, 0, 0.2)",
                    }}
                    transition={{ duration: 0.4, ease: easeOutExpo }}
                    style={{
                        backdropFilter: "blur(20px) saturate(180%)",
                        WebkitBackdropFilter: "blur(20px) saturate(180%)",
                        border: "1px solid",
                    }}
                >
                    {/* Logo */}
                    <motion.a
                        href="#"
                        className="flex items-center gap-2 font-bold text-base md:text-lg tracking-tight group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                        <motion.div
                            className="relative"
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.6, ease: easeOutExpo }}
                        >
                            <Sun className="w-5 h-5 text-[#ff5722] fill-[#ff5722]" />
                            <motion.div
                                className="absolute inset-0 bg-[#ff5722] rounded-full blur-md opacity-0 group-hover:opacity-60"
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>
                        <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                            SolarSaver
                        </span>
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/60">
                        {navLinks.map((link) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                className="relative py-1 group"
                                whileHover={{ color: "rgba(255, 255, 255, 1)" }}
                                transition={{ duration: 0.2 }}
                            >
                                {link.label}
                                <motion.span
                                    className="absolute -bottom-0.5 left-0 h-[2px] bg-gradient-to-r from-[#ff5722] to-[#ff8a50] rounded-full"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.3, ease: easeOutExpo }}
                                />
                            </motion.a>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <motion.a
                        href="#join-waitlist"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                        <Button size="sm" variant="primary" className="shadow-[0_0_20px_rgba(255,87,34,0.4)] text-xs md:text-sm px-3 md:px-4">
                            Get Started
                        </Button>
                    </motion.a>

                    {/* Mobile Menu Toggle */}
                    <motion.button
                        className="md:hidden p-2 text-white/70 hover:text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        whileTap={{ scale: 0.9 }}
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </motion.button>
                </motion.div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <motion.div
                className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl md:hidden pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: mobileMenuOpen ? 1 : 0, pointerEvents: mobileMenuOpen ? "auto" : "none" }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    className="flex flex-col items-center justify-center h-full gap-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: mobileMenuOpen ? 1 : 0, y: mobileMenuOpen ? 0 : 20 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    {navLinks.map((link, index) => (
                        <motion.a
                            key={link.href}
                            href={link.href}
                            className="text-2xl font-semibold text-white/80 hover:text-white transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: mobileMenuOpen ? 1 : 0,
                                y: mobileMenuOpen ? 0 : 20
                            }}
                            transition={{ duration: 0.4, delay: 0.15 + index * 0.1 }}
                        >
                            {link.label}
                        </motion.a>
                    ))}
                    <motion.a
                        href="#join-waitlist"
                        onClick={() => setMobileMenuOpen(false)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: mobileMenuOpen ? 1 : 0,
                            y: mobileMenuOpen ? 0 : 20
                        }}
                        transition={{ duration: 0.4, delay: 0.45 }}
                    >
                        <Button size="lg" className="mt-4">
                            Get Started
                        </Button>
                    </motion.a>
                </motion.div>
            </motion.div>
        </>
    );
}
