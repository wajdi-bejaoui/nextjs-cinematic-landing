"use client"
import { useState } from "react";

const styles = `


  .get-in-touch-btn {
    position: relative;
    padding: 10px 10px;
    font-family: 'Barlow', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #ffffff;
    border: none;
    border-radius: 14px;
    cursor: pointer;
    outline: none;
    background: linear-gradient(135deg, #4a7fd4 0%, #3a5fc8 40%, #5568d8 70%, #3a4fbb 100%);
    box-shadow:
      0 0 0 2px rgba(100, 130, 220, 0.4),
      0 0 0 4px rgba(60, 90, 200, 0.15),
      inset 0 1px 0 rgba(255,255,255,0.25),
      inset 0 -2px 4px rgba(0,0,0,0.3),
      0 8px 32px rgba(50, 80, 200, 0.5),
      0 2px 8px rgba(0,0,0,0.4);
    transition: transform 0.12s ease, box-shadow 0.12s ease, filter 0.12s ease;
    text-shadow: 0 1px 3px rgba(0,0,0,0.3);
  }

  /* Inner shine overlay */
  .get-in-touch-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 14px;
    background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.22) 0%, transparent 65%);
    pointer-events: none;
  }

  /* Outer border glow ring */
  .get-in-touch-btn::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 17px;
    background: linear-gradient(180deg, rgba(120,150,255,0.5) 0%, rgba(40,70,180,0.2) 100%);
    z-index: -1;
    pointer-events: none;
  }

  .get-in-touch-btn:hover {
    transform: translateY(-2px) scale(1.02);
    filter: brightness(1.12);
    box-shadow:
      0 0 0 2px rgba(120, 160, 240, 0.6),
      0 0 0 5px rgba(60, 90, 200, 0.2),
      inset 0 1px 0 rgba(255,255,255,0.3),
      inset 0 -2px 4px rgba(0,0,0,0.3),
      0 12px 40px rgba(50, 80, 220, 0.7),
      0 4px 12px rgba(0,0,0,0.4);
  }

  .get-in-touch-btn:active {
    transform: translateY(1px) scale(0.99);
    filter: brightness(0.95);
    box-shadow:
      0 0 0 2px rgba(100, 130, 220, 0.4),
      inset 0 2px 6px rgba(0,0,0,0.35),
      0 4px 16px rgba(50, 80, 200, 0.4);
  }

  .get-in-touch-btn span {
    position: relative;
    z-index: 1;
  }
`;

export default function GlassyButton() {

    return (
        <>
            <style>{styles}</style>
            <div className="">
                <button
                    className="get-in-touch-btn"
                >
                    <span>Get In Touch</span>
                </button>
            </div>
        </>
    );
}