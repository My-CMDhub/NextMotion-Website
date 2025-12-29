"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    gradient?: boolean;
}

export default function TextReveal({
    text,
    className,
    delay = 0,
    gradient = false,
}: TextRevealProps) {
    const words = text.split(" ");

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.06,
                delayChildren: delay,
            },
        },
    };

    // Simplified animation that's smooth and seamless
    const childVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring" as const,
                damping: 25,
                stiffness: 200,
            },
        },
    };

    return (
        <motion.span
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            className="inline-block"
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    variants={childVariants}
                    className={cn(
                        "inline-block mr-[0.25em]",
                        gradient ? className : ""
                    )}
                    style={{
                        willChange: "transform, opacity"
                    }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.span>
    );
}

