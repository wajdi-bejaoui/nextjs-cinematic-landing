"use client";

import { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    MotionValue,
} from "framer-motion";

export default function CinematicScrollReveal() {
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    return (
        <section
            ref={sectionRef}
            style={{
                minHeight: "100vh",               // min- so content never clips
                background: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4rem 0",               // vertical breathing room on mobile
            }}
        >
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "clamp(320px, 60vw, 400px)",  // responsive, not fixed
                }}
            >
                <NeonScrollLine progress={scrollYProgress} />
                <ScrollTextReveal progress={scrollYProgress} />
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────── */
/* 🔵 Neon Scroll Line */
/* ─────────────────────────────────────────────── */

function NeonScrollLine({
    progress,
    color = "#60a5fa",
    glowColor = "#1e40af",
    strokeWidth = 2.5,
    glowWidth = 280,
}: {
    progress: MotionValue<number>;
    color?: string;
    glowColor?: string;
    strokeWidth?: number;
    glowWidth?: number;
}) {
    const smooth = useSpring(progress, {
        stiffness: 55,
        damping: 22,
        restDelta: 0.001,
    });

    const spotX = useTransform(smooth, [0, 1], [-glowWidth, 1000]);
    const path = "M -80 10 C 250 10, 250 75, 500 75 S 850 10, 1210 10";

    return (
        <svg
            viewBox="0 -100 1000 400"
            preserveAspectRatio="none"
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                overflow: "visible",
            }}
        >
            <defs>
                <filter id="outer" x="-50%" y="-200%" width="200%" height="500%">
                    <feGaussianBlur stdDeviation="18" />
                </filter>
                <filter id="mid" x="-30%" y="-150%" width="160%" height="400%">
                    <feGaussianBlur stdDeviation="6" />
                </filter>
                <filter id="inner" x="-20%" y="-100%" width="140%" height="300%">
                    <feGaussianBlur stdDeviation="2" />
                </filter>
                <linearGradient id="spotGrad">
                    <stop offset="0%" stopColor="black" />
                    <stop offset="20%" stopColor="white" />
                    <stop offset="80%" stopColor="white" />
                    <stop offset="100%" stopColor="black" />
                </linearGradient>
                <mask id="spotMask">
                    <rect width="100%" height="100%" fill="black" />
                    <motion.rect
                        height="100%"
                        width={glowWidth}
                        fill="url(#spotGrad)"
                        style={{ x: spotX }}
                    />
                </mask>
            </defs>

            <path d={path} stroke={glowColor} strokeWidth={strokeWidth * 16} fill="none" filter="url(#outer)" />
            <path d={path} stroke={color} strokeWidth={strokeWidth * 8} fill="none" filter="url(#mid)" />
            <path d={path} stroke={color} strokeWidth={strokeWidth} fill="none" />
            <path
                d={path}
                stroke="white"
                strokeWidth={strokeWidth * 3}
                fill="none"
                filter="url(#inner)"
                mask="url(#spotMask)"
            />
        </svg>
    );
}

/* ─────────────────────────────────────────────── */
/* ✨ Word with distance-based blur + neon glow    */
/* ─────────────────────────────────────────────── */

const BLUR_LEAD = 0.25;
const MAX_BLUR = 2.5;

function WordGlow({
    progress,
    start,
    end,
    word,
}: {
    progress: MotionValue<number>;
    start: number;
    end: number;
    word: string;
}) {
    const color = useTransform(
        progress,
        [start, end],
        ["#888899", "#ffffff"]
    );

    const blurLeadStart = Math.max(0, start - BLUR_LEAD);
    const filter = useTransform(
        progress,
        [blurLeadStart, start, end],
        [`blur(${MAX_BLUR}px)`, "blur(0.6px)", "blur(0px)"]
    );

    const textShadow = useTransform(
        progress,
        [start, end],
        [
            "0 0 0px transparent",
            [
                "0 0 4px #fff",
                "0 0 12px #fff",
                "0 0 24px #a0b4ff",
                "0 0 50px #5a7cff",
                "0 0 90px #2244cc",
                "0 0 140px #112288",
            ].join(", "),
        ]
    );

    return (
        <motion.span
            style={{
                color,
                filter,
                textShadow,
                marginRight: "0.28em",
                display: "inline-block",
            }}
        >
            {word}
        </motion.span>
    );
}

/* ─────────────────────────────────────────────── */
/* ✨ Text Reveal                                  */
/* ─────────────────────────────────────────────── */

const LINES = [
    "We understand your pain..",
    "Ideas often collapse between vision and execution.",
    "Fast MVPs break. SaaS bends under growth.",
    "Too many tools. AI stacked on fragile systems.",
    "Reality doesn't care how fast you built it only rewards what’s built to last.",
];

function ScrollTextReveal({ progress }: { progress: MotionValue<number> }) {
    const allWords = LINES.map((line) => line.split(" "));
    const totalWords = allWords.flat().length;

    let globalIndex = 0;

    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
                padding: "0 clamp(1rem, 5vw, 2rem)",   // responsive horizontal padding
            }}
        >
            <div
                style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    gap: "clamp(0.4rem, 1.5vw, 0.75rem)",  // more gap on larger screens
                    maxWidth: "min(92%, 720px)",            // generous on mobile, capped on desktop
                }}
            >
                {allWords.map((words, lineIndex) => (
                    <p
                        key={lineIndex}
                        style={{
                            fontSize: "clamp(0.95rem, 3vw, 2.2rem)",  // slightly smaller floor for mobile
                            lineHeight: 1.45,                           // a touch more line height for readability
                            fontWeight: 300,
                            margin: 0,
                        }}
                    >
                        {words.map((word) => {
                            const i = globalIndex++;
                            const start = i / totalWords;
                            const end = start + 1 / totalWords;

                            return (
                                <WordGlow
                                    key={i}
                                    progress={progress}
                                    start={start}
                                    end={end}
                                    word={word}
                                />
                            );
                        })}
                    </p>
                ))}
            </div>
        </div>
    );
}