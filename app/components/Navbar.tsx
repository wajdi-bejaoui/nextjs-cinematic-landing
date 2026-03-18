import React from "react";
import GlassContainerReusableV2 from "./GlassContainerReusableV2";

const navItems = ["Home", "Labs", "Case Studies", "How It Works", "FAQ"];

const Navbar = () => {
    return (
        <div className="fixed top-0 left-0 right-0 mt-8 flex justify-center z-[1000]">
            <GlassContainerReusableV2 width="80%" height={70}>
                <div className="flex justify-center items-center  w-full h-full px-10 box-border">

                    {/* Left — Logo */}
                    <span className="text-2xl font-bold text-white shrink-0 ">
                        LOGO
                    </span>

                    {/* Center — Nav links (flex-1 + justify-center pushes it to fill remaining space) */}
                    <nav className="flex flex-1 flex-row items-center justify-center gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-white text-lg no-underline opacity-80 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>

                    {/* Right — CTA */}

                    <button className=" shrink-0 px-5 py-2.5 bg-white text-black font-bold text-sm rounded-md cursor-pointer border-none hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all duration-150">
                        GET IN TOUCH
                    </button>

                </div>
            </GlassContainerReusableV2>
        </div>
    );
};

export default Navbar;