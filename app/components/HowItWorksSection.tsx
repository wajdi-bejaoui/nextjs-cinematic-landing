"use client"
import { useState, useEffect, useRef, CSSProperties } from "react";
import GlassButton from "./GlassButton";

const steps = [
    {
        num: "01",
        title: "Fit Check",
        side: "right",
        body: "We review what exists and tell you the truth. If we're not a good fit, we'll tell you. We don't take unclear visions or empty projects.",
        bold: "This protects both sides.",
    },
    {
        num: "02",
        title: "Choose Engagement",
        side: "left",
        body: "If you know exactly what you want built, we define the scope, lock timeline and price, and deliver to a clear outcome — even if we underestimate. If you need ongoing execution, we assemble a fractional team that can build, fix, and scale without hiring, HR, or long-term commitments.",
    },
    {
        num: "03",
        title: "Build with Visibility",
        side: "right",
        body: "Work runs in a steady rhythm. Every week, you see what was done, what's next, and what's blocked. Bi-weekly calls keep progress aligned. You always know who's working, on what, and why — no black boxes, no blind trust.",
    },
    {
        num: "04",
        title: "Guarantees & Accountability",
        side: "left",
        body: "If we underestimate, we finish the work. If a team member isn't the right fit, we replace them. You own the code from day one, and you can exit anytime with everything in hand. Accountability isn't promised — it's built into the system.",
    },
    {
        num: "05",
        title: "Scale or Exit Cleanly",
        side: "right",
        body: "Continue, scale the team, or stop — no pressure, no dependency, no cleanup phase. If the foundations are solid, scaling becomes optional, not forced.",
    },
];

// ─── Canvas beam particle system ────────────────────────────────────────────
function BeamParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !canvas.parentElement) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const dpr = window.devicePixelRatio || 1;
        const W = 700;
        const H = canvas.parentElement.offsetHeight;

        canvas.width = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width = W + "px";
        canvas.style.height = H + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const cx = W / 2;
        const COUNT = 2200;

        const dots = Array.from({ length: COUNT }).map(() => {
            // const yFrac = Math.random();
            const yFrac = Math.random() * 0.90; // particles only occupy top 90% of canvas

            const spread = 8 + yFrac * yFrac * 72;
            const x = cx + (Math.random() - 0.5) * 2 * spread;
            const y = yFrac * H;
            const distFromCore = Math.abs(x - cx);
            const coreFactor = Math.max(0, 1 - distFromCore / (spread + 1));
            return {
                x, y,
                r: 0.1 + Math.random() * 0.4,
                alpha: 0.25 + coreFactor * 0.65 + Math.random() * 0.1,
                r_ch: Math.floor(160 + coreFactor * 95),
                g_ch: Math.floor(190 + coreFactor * 65),
            };
        });

        for (const d of dots) {
            ctx.globalAlpha = d.alpha;
            ctx.fillStyle = `rgb(${d.r_ch}, ${d.g_ch}, 255)`;
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
            ctx.fill();
            if (d.r > 0.35) {
                ctx.globalAlpha = d.alpha * 0.3;
                const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 4);
                grad.addColorStop(0, `rgba(${d.r_ch}, ${d.g_ch}, 255, 1)`);
                grad.addColorStop(1, "rgba(100,160,255,0)");
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(d.x, d.y, d.r * 4, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        ctx.globalAlpha = 1;
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                pointerEvents: "none",
                zIndex: 2,
            }}
        />
    );
}

// ─── Full-width horizontal particle burst at the CTA bottom ─────────────────
function HorizontalParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const draw = () => {


            const dpr = window.devicePixelRatio || 1;
            const W = window.innerWidth;
            const H = 220;

            canvas.width = W * dpr;
            canvas.height = H * dpr;
            canvas.style.width = W + "px";
            canvas.style.height = H + "px";
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const cx = W / 2;
            // const cy = H * 0.72;
            // const COUNT = 7000;
            const COUNT = 14000; // was 7000


            const dots = Array.from({ length: COUNT }).map(() => {
                const tRaw = Math.random();
                // const tBiased = Math.pow(tRaw, 0.55);
                const tBiased = Math.pow(tRaw, 0.80); // even flatter curve = more mass near cx

                const sign = Math.random() < 0.5 ? -1 : 1;
                const x = cx + sign * tBiased * (W * 0.5 + 40);

                const proximity = 1 - tBiased;
                // const vSpread = 6 + proximity * 44;
                // const y = cy + (Math.random() - 0.5) * 2 * vSpread;
                const baseCy = H * 0.65 + (Math.random() - 0.5) * H * 0.3; // drifting center
                const vSpread = 18 + proximity * 90 + Math.random() * 40;   // much wider + noisy
                const y = baseCy + (Math.random() - 0.5) * 2 * vSpread;

                // const coreFactor = Math.pow(proximity, 1.4);
                const coreFactor = Math.pow(proximity, 0.7); // <1 = more particles feel "core-like"

                // const alpha = 0.15 + coreFactor * 0.65 + Math.random() * 0.1;
                // const alpha = 0.08 + coreFactor * 0.45 + Math.random() * 0.18;
                const alpha = 0.06 + coreFactor * 0.75 + Math.random() * 0.15; // higher peak at center


                const r = 0.1 + Math.random() * 0.35;
                const r_ch = Math.floor(140 + coreFactor * 115);
                const g_ch = Math.floor(170 + coreFactor * 85);

                return { x, y, r, alpha, r_ch, g_ch, coreFactor };
            });

            // Glow pass
            for (const d of dots) {
                if (d.r > 0.32) {
                    ctx.globalAlpha = d.alpha * 0.2;
                    const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 4);
                    grad.addColorStop(0, `rgba(${d.r_ch}, ${d.g_ch}, 255, 1)`);
                    grad.addColorStop(1, "rgba(80,130,255,0)");
                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.arc(d.x, d.y, d.r * 4, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // Core dots pass
            for (const d of dots) {
                ctx.globalAlpha = d.alpha;
                ctx.fillStyle = `rgb(${d.r_ch}, ${d.g_ch}, 255)`;
                ctx.beginPath();
                ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.globalAlpha = 1;

            // ── Edge fades via destination-out masks ──────────────────────────────
            ctx.globalCompositeOperation = "destination-out";

            // Left fade
            // const fadeW = W * 0.18; // how far inward the fade reaches
            const fadeW = W * 0.28; // was 0.18

            const leftGrad = ctx.createLinearGradient(0, 0, fadeW, 0);
            leftGrad.addColorStop(0, "rgba(0,0,0,1)");
            leftGrad.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = leftGrad;
            ctx.fillRect(0, 0, fadeW, H);

            // Right fade
            const rightGrad = ctx.createLinearGradient(W - fadeW, 0, W, 0);
            rightGrad.addColorStop(0, "rgba(0,0,0,0)");
            rightGrad.addColorStop(1, "rgba(0,0,0,1)");
            ctx.fillStyle = rightGrad;
            ctx.fillRect(W - fadeW, 0, fadeW, H);

            // Top fade
            const topFadeH = H * 0.38;
            const topGrad = ctx.createLinearGradient(0, 0, 0, topFadeH);
            topGrad.addColorStop(0, "rgba(0,0,0,1)");
            topGrad.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = topGrad;
            ctx.fillRect(0, 0, W, topFadeH);

            // Bottom fade
            const botFadeH = H * 0.22;
            const botGrad = ctx.createLinearGradient(0, H - botFadeH, 0, H);
            botGrad.addColorStop(0, "rgba(0,0,0,0)");
            botGrad.addColorStop(1, "rgba(0,0,0,1)");
            ctx.fillStyle = botGrad;
            ctx.fillRect(0, H - botFadeH, W, botFadeH);

            // Reset composite mode
            ctx.globalCompositeOperation = "source-over";
        }
        draw(); // initial draw

        const onResize = () => draw();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                pointerEvents: "none",
                zIndex: 1,
            }}
        />
    );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function ClearProcess() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const headerRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    const [beamProgress, setBeamProgress] = useState(0);
    const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
    const [headerVisible, setHeaderVisible] = useState(false);
    const [ctaVisible, setCtaVisible] = useState(false);

    // ── Beam reveal: lerped RAF loop for silky-smooth motion ─────────────────
    useEffect(() => {
        let target = 0;
        let current = 0;
        let rafId: number | null = null;

        const getTarget = () => {
            const el = wrapperRef.current;
            if (!el) return 0;
            const rect = el.getBoundingClientRect();
            const winH = window.innerHeight;
            const scrolled = winH - rect.top;
            return Math.min(1, Math.max(0, scrolled / rect.height));
        };

        const onScroll = () => { target = getTarget(); };

        const tick = () => {
            current += (target - current) * 0.07;
            if (Math.abs(target - current) < 0.0001) current = target;
            setBeamProgress(current);
            rafId = requestAnimationFrame(tick);
        };

        target = getTarget();
        current = target;
        setBeamProgress(current);

        window.addEventListener("scroll", onScroll, { passive: true });
        rafId = requestAnimationFrame(tick);
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (rafId !== null) cancelAnimationFrame(rafId);
        };
    }, []);

    // ── IntersectionObserver for the header block ──────────────────────────────
    useEffect(() => {
        if (!headerRef.current) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
            { threshold: 0.25 }
        );
        obs.observe(headerRef.current);
        return () => obs.disconnect();
    }, []);

    // ── IntersectionObserver for every step card ───────────────────────────────
    useEffect(() => {
        const observers = stepRefs.current.map((ref, i) => {
            if (!ref) return null;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting)
                        setVisibleSteps(prev => new Set([...prev, i]));
                },
                { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
            );
            obs.observe(ref);
            return obs;
        });
        return () => observers.forEach(o => o?.disconnect());
    }, []);

    // ── IntersectionObserver for CTA ───────────────────────────────────────────
    useEffect(() => {
        if (!ctaRef.current) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setCtaVisible(true); },
            { threshold: 0.5 }
        );
        obs.observe(ctaRef.current);
        return () => obs.disconnect();
    }, []);

    const beamClipBottom = Math.max(0, (1 - beamProgress) * 100);

    return (
        <div ref={wrapperRef} style={styles.root}>

            {/* ── Beam: outer glow — always fully visible ── */}
            {/* <div style={styles.beamContainer}>
                <div style={styles.beamSpread} />
                <div style={styles.beamGlowOuter} />
            </div> */}

            {/* ── Beam: inner core — reveals progressively on scroll ── */}
            <div
                style={{
                    ...styles.beamContainer,
                    clipPath: `inset(0 0 ${beamClipBottom.toFixed(2)}% 0)`,
                }}
            >
                <div style={styles.beamGlowMid} />
                <div style={styles.beamGlowInner} />
                <div style={styles.beamCoreGlow} />
                <div style={styles.beamCore} />
                <BeamParticles />
                {/* <div style={styles.burstWide} />
                <div style={styles.burstMid} />
                <div style={styles.burstTight} />
                <div style={styles.burstCore} />
                <div style={styles.burstFlare} /> */}
            </div>

            {/* ── Content ── */}
            <div style={styles.content}>

                {/* Pill + Title */}
                <div
                    ref={headerRef}
                    style={{
                        opacity: headerVisible ? 1 : 0,
                        transform: headerVisible ? "translateY(0)" : "translateY(28px)",
                        transition: "opacity 0.75s ease, transform 0.75s ease",
                    }}
                >
                    <div className="flex justify-center items-center">
                        <div className="flex w-80 justify-center items-center" >
                            <GlassButton>
                                <span className="px-10 py-2.5 text-white flex justify-center items-center text-sm font-semibold">
                                    How it works
                                </span>
                            </GlassButton>
                        </div>
                    </div>

                    <div style={styles.titleBlock}>
                        <h1 style={styles.title}>
                            A Clear{" "}
                            Process
                        </h1>
                        <p style={styles.subtitle}>This is exactly how working with XYZ works.</p>
                    </div>
                </div>

                {/* Steps */}
                <div style={styles.steps}>
                    {steps.map((step, i) => {
                        const visible = visibleSteps.has(i);
                        const tx = visible ? "0px" : step.side === "right" ? "40px" : "-40px";

                        return (
                            <div
                                key={step.num}
                                ref={el => { stepRefs.current[i] = el; }}
                                style={styles.stepRow}
                            >
                                {step.side === "left" ? (
                                    <>
                                        <div
                                            style={{
                                                ...styles.stepCard,
                                                ...styles.stepLeft,
                                                opacity: visible ? 1 : 0,
                                                transform: `translateX(${tx})`,
                                                transition: `opacity 0.6s ease ${i * 0.04}s, transform 0.6s ease ${i * 0.04}s`,
                                            }}
                                        >
                                            <StepContent step={step} />
                                        </div>
                                        <div style={styles.spacer} />
                                    </>
                                ) : (
                                    <>
                                        <div style={styles.spacer} />
                                        <div
                                            style={{
                                                ...styles.stepCard,
                                                ...styles.stepRight,
                                                opacity: visible ? 1 : 0,
                                                transform: `translateX(${tx})`,
                                                transition: `opacity 0.6s ease ${i * 0.04}s, transform 0.6s ease ${i * 0.04}s`,
                                            }}
                                        >
                                            <StepContent step={step} />
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* ── CTA with full-width horizontal particle burst ── */}
                <div
                    ref={ctaRef}
                    style={{
                        ...styles.ctaWrap,
                        opacity: ctaVisible ? 1 : 0,
                        transform: ctaVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.96)",
                        transition: "opacity 0.75s ease, transform 0.75s ease",
                    }}
                >
                    {/* Full-viewport-width particle canvas — positioned relative to this wrapper */}
                    <div style={styles.ctaParticleStage}>
                        <HorizontalParticles />
                    </div>

                    <div style={styles.ctaGlowWrap}>
                        <div style={styles.ctaBeamShaft} />
                        <div style={styles.ctaHaloWide} />
                        <div style={styles.ctaHaloMid} />
                        <div style={styles.ctaHaloCore} />
                        <GlassButton>
                            <span className="px-10 py-2.5 text-white flex justify-center items-center text-sm font-semibold">
                                Get in Touch
                            </span>
                        </GlassButton>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes beamPulse {
          0%   { opacity: 0.7; }
          50%  { opacity: 1;   }
          100% { opacity: 0.7; }
        }
        @keyframes beamCorePulse {
          0%   { opacity: 0.85; }
          50%  { opacity: 1;    }
          100% { opacity: 0.85; }
        }
        @keyframes burstPulse {
          0%   { transform: translateX(-50%) scale(0.92); opacity: 0.8; }
          50%  { transform: translateX(-50%) scale(1.12); opacity: 1;   }
          100% { transform: translateX(-50%) scale(0.92); opacity: 0.8; }
        }
        @keyframes flare {
          0%   { transform: translateX(-50%) scaleX(0.8); opacity: 0.6; }
          50%  { transform: translateX(-50%) scaleX(1.3); opacity: 1;   }
          100% { transform: translateX(-50%) scaleX(0.8); opacity: 0.6; }
        }
        @keyframes ctaGlow {
          0%   { box-shadow: 0 0 24px 6px rgba(60,120,255,0.55), inset 0 0 12px rgba(80,140,255,0.2); }
          50%  { box-shadow: 0 0 44px 14px rgba(60,120,255,0.85), inset 0 0 22px rgba(80,140,255,0.35); }
          100% { box-shadow: 0 0 24px 6px rgba(60,120,255,0.55), inset 0 0 12px rgba(80,140,255,0.2); }
        }
        @keyframes ctaShaftPulse {
          0%   { opacity: 0.55; }
          50%  { opacity: 1;    }
          100% { opacity: 0.55; }
        }
      `}</style>
        </div>
    );
}

// ─── Step card content ───────────────────────────────────────────────────────
function StepContent({ step }: { step: { num: string; title: string; body: string; bold?: string; } }) {
    return (
        <>
            <h2 style={styles.stepTitle}>
                <span style={styles.stepNum}>{step.num}. </span>
                {step.title}
            </h2>
            <p style={styles.stepBody}>
                {step.body}
                {step.bold && (
                    <>
                        {" "}
                        <strong style={{ color: "#e0e8ff", fontWeight: 600 }}>{step.bold}</strong>
                    </>
                )}
            </p>
        </>
    );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles: Record<string, CSSProperties> = {
    root: {
        position: "relative",
        minHeight: "100vh",
        background: "#000",
        overflow: "hidden",
    },

    beamContainer: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "700px",
        pointerEvents: "none",
        zIndex: 1,
    },

    beamSpread: {
        position: "absolute",
        top: "5%",
        bottom: "80px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "500px",
        background:
            "linear-gradient(to bottom, transparent 0%, rgba(20,50,180,0.04) 10%, rgba(30,70,220,0.09) 35%, rgba(40,90,255,0.16) 60%, rgba(60,120,255,0.28) 85%, rgba(80,150,255,0.5) 98%, transparent 100%)",
        filter: "blur(40px)",
        animation: "beamPulse 5s ease-in-out infinite",
    },
    beamGlowOuter: {
        position: "absolute",
        top: 0,
        bottom: "100px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "200px",
        background:
            "linear-gradient(to bottom, transparent 0%, rgba(40,90,255,0.1) 8%, rgba(60,120,255,0.28) 35%, rgba(80,150,255,0.52) 65%, rgba(100,175,255,0.78) 90%, rgba(120,200,255,0.95) 98%, transparent 100%)",
        filter: "blur(20px)",
        animation: "beamPulse 3.8s ease-in-out infinite",
    },
    beamGlowMid: {
        position: "absolute",
        top: 0,
        bottom: "160px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "60px",
        background:
            "linear-gradient(to bottom, transparent 0%, rgba(40, 107, 252, 0.25) 8%, rgba(57, 135, 253, 0.6) 40%, rgba(54, 161, 255, 0.88) 75%, rgba(68, 170, 253, 1) 97%, transparent 100%)",
        filter: "blur(7px)",
        animation: "beamPulse 3s ease-in-out infinite",
    },
    beamGlowInner: {
        position: "absolute",
        top: 0,
        bottom: "160px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "18px",
        background:
            "linear-gradient(to bottom, transparent 0%, rgba(180,215,255,0.5) 6%, rgba(113, 190, 252, 0.92) 40%, rgba(92, 190, 255, 1) 80%, #ffffff 98%, transparent 100%)",
        filter: "blur(3px)",
        animation: "beamCorePulse 2.5s ease-in-out infinite",
    },
    beamCoreGlow: {
        position: "absolute",
        top: 0,
        bottom: "160px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "8px",
        background:
            "linear-gradient(to bottom, transparent 0%, transparent 17%, rgba(220,240,255,0.3) 23%, #e8f4ff 38%, #ffffff 80%, #ffffff 98%, transparent 100%)",
        filter: "blur(1.5px)",
        animation: "beamCorePulse 2.2s ease-in-out infinite",
    },
    beamCore: {
        position: "absolute",
        top: 0,
        bottom: "160px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "1.5px",
        background:
            "linear-gradient(to bottom, transparent 0%, transparent 13%, rgba(255,255,255,0.2) 19%, rgba(63, 79, 254, 0.85) 28%, #ffffffff 45%, #ffffff 95%, transparent 100%)",
        animation: "beamCorePulse 2s ease-in-out infinite",
    },

    burstWide: {
        position: "absolute",
        bottom: "-10px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "420px",
        height: "200px",
        background:
            "radial-gradient(ellipse 210px 120px at 50% 100%, rgba(50,100,255,0.35) 0%, rgba(40,80,220,0.18) 40%, rgba(20,50,180,0.08) 70%, transparent 100%)",
        filter: "blur(18px)",
        animation: "burstPulse 4s ease-in-out infinite",
    },
    burstMid: {
        position: "absolute",
        bottom: "0px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "240px",
        height: "160px",
        background:
            "radial-gradient(ellipse 120px 90px at 50% 100%, rgba(80,140,255,0.72) 0%, rgba(60,120,240,0.45) 40%, rgba(40,90,200,0.2) 70%, transparent 100%)",
        filter: "blur(10px)",
        animation: "burstPulse 3.2s ease-in-out infinite",
    },
    burstTight: {
        position: "absolute",
        bottom: "8px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "130px",
        height: "100px",
        background:
            "radial-gradient(ellipse 65px 55px at 50% 100%, rgba(150,200,255,0.95) 0%, rgba(120,175,255,0.7) 40%, rgba(80,140,255,0.35) 70%, transparent 100%)",
        filter: "blur(5px)",
        animation: "burstPulse 2.8s ease-in-out infinite",
    },
    burstCore: {
        position: "absolute",
        bottom: "18px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "60px",
        height: "55px",
        background:
            "radial-gradient(ellipse 30px 28px at 50% 100%, rgba(255,255,255,1) 0%, rgba(210,235,255,0.9) 35%, rgba(160,210,255,0.5) 65%, transparent 100%)",
        filter: "blur(2px)",
        animation: "burstPulse 2.2s ease-in-out infinite",
    },
    burstFlare: {
        position: "absolute",
        bottom: "42px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "320px",
        height: "4px",
        background:
            "linear-gradient(90deg, transparent 0%, rgba(100,160,255,0.2) 15%, rgba(160,210,255,0.65) 40%, rgba(220,240,255,0.9) 50%, rgba(160,210,255,0.65) 60%, rgba(100,160,255,0.2) 85%, transparent 100%)",
        filter: "blur(2px)",
        animation: "flare 3s ease-in-out infinite",
    },

    content: {
        position: "relative",
        zIndex: 2,
        maxWidth: "860px",
        margin: "0 auto",
        padding: "0 24px 80px",
    },

    pillWrap: {
        display: "flex",
        justifyContent: "center",
        paddingTop: "36px",
        marginBottom: "14px",
    },
    pill: {
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "5px 14px 5px 10px",
        border: "1px solid rgba(80,120,255,0.5)",
        borderRadius: "100px",
        background: "rgba(30,50,140,0.22)",
        color: "rgba(180,210,255,0.85)",
        fontSize: "13px",
        fontFamily: "'Syne', sans-serif",
        letterSpacing: "0.08em",
        backdropFilter: "blur(8px)",
    },
    pillDot: {
        display: "inline-block",
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: "rgba(100,160,255,0.9)",
        boxShadow: "0 0 6px rgba(100,160,255,0.9)",
    },
    pillArrow: { marginLeft: "2px", fontSize: "11px", opacity: 0.7 },

    titleBlock: { textAlign: "center", marginBottom: "60px" },
    title: {
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
        fontSize: "42px",
        letterSpacing: "-0.01em",
        lineHeight: 1.2,
        marginBottom: "8px",
        background: "linear-gradient(to right, #ffffff 20%, #7b8ff7)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    },
    titleHighlight: {
        position: "relative",
        color: "#7aabff",
        display: "inline-block",
    },
    underline: {
        position: "absolute",
        bottom: "-3px",
        left: 0,
        right: 0,
        height: "1.5px",
        background: "linear-gradient(90deg, transparent, #5a90ff, transparent)",
        borderRadius: "2px",
    },
    subtitle: {
        fontSize: "15px",
        color: "rgba(255, 255, 255, 1)",
        marginTop: "10px",
        letterSpacing: "0.02em",
    },

    steps: { display: "flex", flexDirection: "column", gap: "0px" },
    stepRow: {
        display: "flex",
        alignItems: "flex-start",
        minHeight: "140px",
        marginBottom: "28px",
    },
    spacer: { flex: "1 1 0", minWidth: "0" },
    stepCard: { flex: "1 1 0", minWidth: "0", padding: "2px 0" },
    stepLeft: { textAlign: "left", paddingRight: "72px" },
    stepRight: { textAlign: "left", paddingLeft: "72px" },
    stepTitle: {
        fontFamily: "'Syne', sans-serif",
        fontWeight: 600,
        fontSize: "22px",
        lineHeight: 1.25,
        marginBottom: "12px",
        letterSpacing: "-0.01em",
        background: "linear-gradient(to right, #ffffff 20%, #7b8ff7)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    },
    stepNum: { color: "rgba(180,200,240,0.85)", fontWeight: 400 },
    stepHighlight: { color: "#62a0ff" },
    stepBody: {
        fontSize: "15px",
        lineHeight: 1.75,
        color: "rgba(244, 245, 247, 0.80)",
        fontWeight: 300,
    },

    // ── CTA ──────────────────────────────────────────────────────────────────
    ctaWrap: {
        display: "flex",
        justifyContent: "center",
        paddingTop: "24px",
        marginTop: "30px",
        // needed so the absolute-positioned particle canvas can escape to viewport width
        position: "relative",
    },

    // This stage div breaks out of the 860 px content column to span the viewport
    ctaParticleStage: {
        position: "absolute",
        // pull left far enough to reach the real left edge of the viewport
        left: "50%",
        transform: "translateX(-50vw)",
        width: "100vw",
        // tall enough to show the full 220 px band, anchored to the bottom of ctaWrap
        bottom: 0,
        height: "220px",
        pointerEvents: "none",
        zIndex: 0,
    },

    ctaGlowWrap: {
        position: "relative",
        zIndex: 2,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "80px",
    },

    ctaBeamShaft: {
        position: "absolute",
        bottom: "50%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "80px",
        height: "220px",
        background:
            "linear-gradient(to bottom, transparent 0%, rgba(80,130,255,0.08) 20%, rgba(120,170,255,0.25) 50%, rgba(180,215,255,0.55) 80%, rgba(220,240,255,0.85) 100%)",
        filter: "blur(10px)",
        pointerEvents: "none",
        animation: "ctaShaftPulse 3s ease-in-out infinite",
    },
    ctaHaloWide: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "500px",
        height: "200px",
        background:
            "radial-gradient(ellipse 250px 100px at 50% 50%, rgba(40,90,255,0.28) 0%, rgba(30,70,220,0.14) 45%, rgba(15,40,180,0.05) 75%, transparent 100%)",
        filter: "blur(20px)",
        pointerEvents: "none",
        animation: "ctaShaftPulse 4s ease-in-out infinite",
    },
    ctaHaloMid: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "320px",
        height: "130px",
        background:
            "radial-gradient(ellipse 160px 65px at 50% 50%, rgba(80,140,255,0.62) 0%, rgba(60,120,240,0.38) 45%, rgba(40,90,200,0.12) 75%, transparent 100%)",
        filter: "blur(10px)",
        pointerEvents: "none",
        animation: "ctaShaftPulse 3.2s ease-in-out infinite",
    },
    ctaHaloCore: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "180px",
        height: "80px",
        background:
            "radial-gradient(ellipse 90px 40px at 50% 50%, rgba(200,230,255,0.95) 0%, rgba(160,210,255,0.65) 40%, rgba(100,170,255,0.25) 70%, transparent 100%)",
        filter: "blur(5px)",
        pointerEvents: "none",
        animation: "ctaShaftPulse 2.5s ease-in-out infinite",
    },
};