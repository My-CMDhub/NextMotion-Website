import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
}

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
        const variants = {
            primary:
                "bg-gradient-to-r from-[#ff5722] via-[#ff3d00] to-[#d84315] text-white shadow-[0_0_30px_rgba(255,87,34,0.5),0_0_60px_rgba(255,87,34,0.3)] hover:shadow-[0_0_50px_rgba(255,87,34,0.7),0_0_100px_rgba(255,87,34,0.4)] border border-[#ff5722]/30",
            secondary:
                "bg-white/[0.06] backdrop-blur-xl text-white border border-white/[0.12] hover:bg-white/[0.1] hover:border-[#ff5722]/40 shadow-[0_4px_20px_rgba(0,0,0,0.2)]",
            outline:
                "bg-transparent border border-[#ff5722]/40 text-white hover:border-[#ff5722] hover:text-[#ff5722] hover:shadow-[0_0_30px_rgba(255,87,34,0.25)]",
            ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/[0.06]",
        };

        const sizes = {
            sm: "h-9 px-4 text-sm",
            md: "h-11 px-6 text-base",
            lg: "h-14 px-8 text-lg",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{
                    scale: 1.03,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
                whileTap={{
                    scale: 0.97,
                    transition: { type: "spring", stiffness: 600, damping: 30 }
                }}
                className={cn(
                    "relative inline-flex items-center justify-center rounded-full font-semibold transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5722] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50 cursor-pointer overflow-hidden",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                <span className="relative z-10 flex items-center gap-2">{children}</span>

                {/* Animated shimmer effect for primary variant */}
                {variant === "primary" && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
                        initial={{ x: "-150%" }}
                        whileHover={{
                            x: "150%",
                            transition: { duration: 0.7, ease: easeOutExpo }
                        }}
                    />
                )}

                {/* Subtle inner highlight */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.button>
        );
    }
);
Button.displayName = "Button";

export { Button };
