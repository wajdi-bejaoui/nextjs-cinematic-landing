"use client"
import React, { useState } from "react";
import GlassContainer from "./GlassContainer";
import GlassButton from "./GlassButton";

const navItems = ["Home", "Labs", "Case Studies", "How It Works", "FAQ"];

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="fixed top-0 left-0 right-0 mt-8 flex flex-col items-center z-[1000] px-4">
            {/* Main Navbar — full width on mobile, 80% on desktop */}
            <div className="w-full md:w-4/5">
                <GlassContainer width="100%" height={70}>
                    <div className="flex justify-between items-center w-full h-full px-6 box-border">

                        {/* Left — Logo */}
                        <span className="text-2xl font-bold text-white shrink-0">
                            LOGO
                        </span>

                        {/* Center — Nav links (hidden on mobile) */}
                        <nav className="hidden md:flex flex-1 flex-row items-center justify-center gap-6 lg:gap-8">
                            {navItems.map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="text-white text-base lg:text-lg no-underline opacity-80 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                                >
                                    {item}
                                </a>
                            ))}
                        </nav>

                        {/* Right — CTA (hidden on mobile) + Hamburger */}
                        <div className="flex items-center gap-4">
                            <div className="hidden md:block bg-blue-500/50 rounded-lg">
                                <GlassButton>
                                    <span className="px-5 py-2.5 text-white flex justify-center items-center">
                                        GET IN TOUCH
                                    </span>
                                </GlassButton>
                            </div>

                            <button
                                className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 cursor-pointer"
                                onClick={() => setMenuOpen((prev) => !prev)}
                                aria-label="Toggle menu"
                            >
                                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                            </button>
                        </div>
                    </div>
                </GlassContainer>
            </div >

            {/* Mobile Dropdown Menu */}
            < div
                className={`md:hidden w-full mt-2 overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
            >
                <GlassContainer width="100%" height="auto">
                    <nav className="flex flex-col items-center gap-4 py-6 w-full">
                        {navItems.map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={() => setMenuOpen(false)}
                                className="text-white text-lg no-underline opacity-80 hover:opacity-100 transition-opacity duration-200"
                            >
                                {item}
                            </a>
                        ))}
                        <div className="mt-2 bg-blue-500/50 rounded-lg">
                            <GlassButton>
                                <span className="px-5 py-2.5 text-white flex justify-center items-center">
                                    GET IN TOUCH
                                </span>
                            </GlassButton>
                        </div>
                    </nav>
                </GlassContainer >
            </div >
        </div >
    );
};

export default Navbar;