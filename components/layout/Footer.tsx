"use client";

import { motion } from "framer-motion";
import { Sun, Github, Twitter, Mail, Heart } from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export function Footer() {
    const currentYear = new Date().getFullYear();

    const links = [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Contact", href: "#" },
    ];

    const socialLinks = [
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Github, href: "#", label: "GitHub" },
        { icon: Mail, href: "#", label: "Email" },
    ];

    return (
        <footer className="relative py-16 border-t border-white/[0.06] overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#ff5722] rounded-full blur-[150px] opacity-[0.04] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Logo & Copyright */}
                    <motion.div
                        className="flex flex-col items-center md:items-start gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: easeOutExpo }}
                    >
                        <motion.a
                            href="#"
                            className="flex items-center gap-2 group"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                            <Sun className="w-5 h-5 text-[#ff5722] fill-[#ff5722] group-hover:rotate-180 transition-transform duration-700" />
                            <span className="text-lg font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                                SolarSaver
                            </span>
                        </motion.a>
                        <p className="text-sm text-white/30 flex items-center gap-1.5">
                            © {currentYear} SolarSaver. Smart Energy
                            <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <Heart className="w-3.5 h-3.5 text-[#ff5722] fill-[#ff5722]" />
                            </motion.span>
                            for smart homes.
                        </p>
                    </motion.div>

                    {/* Navigation Links */}
                    <motion.div
                        className="flex items-center gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
                    >
                        {links.map((link) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                className="text-sm text-white/40 hover:text-white/80 transition-colors relative group"
                                whileHover={{ y: -2 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                {link.label}
                                <motion.span
                                    className="absolute -bottom-0.5 left-0 h-[1px] bg-[#ff5722] rounded-full"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.3, ease: easeOutExpo }}
                                />
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
                    >
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                aria-label={social.label}
                                className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:border-[#ff5722]/30 hover:bg-[#ff5722]/10 transition-all duration-300"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <social.icon className="w-4 h-4" />
                            </motion.a>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom divider with gradient */}
                <motion.div
                    className="mt-10 pt-6 border-t border-white/[0.04] text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <p className="text-xs text-white/20">
                        Empowering Australian homes to maximize their solar investment
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}
