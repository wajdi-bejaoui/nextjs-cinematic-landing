"use client";
import React, { useRef, useEffect } from "react";
import "./TopLight.css";


interface BackgroundProps {
  children?: React.ReactNode;
  density?: number;
  dotSize?: number;
  color?: string;
  twinkle?: boolean;
  speed?: number;
}

const Background: React.FC<BackgroundProps> = ({
  children,
  density = 2,
  dotSize = 1,
  color = "rgba(255,255,255,0.8)",
  twinkle = true,
  speed = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let dots: any[] = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      // const width = window.innerWidth;
      // const height = window.innerHeight;
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.floor((width * height) / 1800 * density);

      dots = Array.from({ length: count }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: dotSize * (0.5 + Math.random()),
        alpha: 0.3 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (time: number) => {
      const t = time * 0.001 * speed;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = color;

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const flicker = twinkle
          ? 0.5 + 0.5 * Math.sin(d.phase + t + i * 0.01)
          : 1;

        ctx.globalAlpha = d.alpha * flicker;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [density, dotSize, color, twinkle, speed]);

  return (
    <>
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -2,
          pointerEvents: "none",
          background: "black",
        }}
      />

      {/* Glow overlay */}
      <div className="light-top" aria-hidden="true" />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>

    </>
  );
};

export default Background;