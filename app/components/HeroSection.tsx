import Image from "next/image";
import Background from "./Background";
import GlassButton from "./GlassButton";


export default function HeroSection() {
    return (
        <div className="min-h-screen">
            <Background density={20} dotSize={0.5}>
                <div className="flex flex-col items-center justify-between min-h-screen px-4 pt-16 pb-0 gap-6 sm:justify-end sm:gap-3 sm:pt-0">

                    {/* Top badge — hidden on desktop since it sits at top */}
                    <GlassButton>
                        <span className="px-10 py-2.5 text-white flex justify-center items-center text-sm font-semibold">
                            AI Dev Lab
                        </span>
                    </GlassButton>

                    {/* Text block */}
                    <div className="flex flex-col items-center gap-3">
                        {/* Heading */}
                        <div className="flex flex-col gap-0.5 text-center">
                            <h1
                                className="font-bold leading-tight"
                                style={{ fontSize: "clamp(1.8rem, 5vw, 3.2rem)", color: "#ffffff" }}
                            >
                                Every idea starts in the light
                            </h1>
                            <h1
                                className="font-bold leading-tight"
                                style={{
                                    fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
                                    background: "linear-gradient(to bottom, #ffffff 0%, #8A93E0 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                We build it right.
                            </h1>
                        </div>

                        {/* Subtitle */}
                        <div className="flex flex-col gap-0.5 text-center max-w-xs sm:max-w-3xl px-2">
                            <p className="text-white text-sm font-normal">
                                XYZ is an AI Dev Lab helping founders turn ideas into real, scalable products — with clarity, not chaos.
                            </p>
                            <p className="text-white text-sm font-normal">
                                Build. Fix. Scale. Gain traction, guided by systems, AI, and elite operators.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-row gap-3 flex-wrap justify-center">
                            <button className="px-8 py-2.5 bg-white text-blue-900 font-semibold text-sm rounded-lg cursor-pointer border-none hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all duration-150">
                                Get In Touch
                            </button>
                            <GlassButton>
                                <span className="px-10 py-2.5 text-white flex justify-center items-center text-sm font-semibold">
                                    Learn More
                                </span>
                            </GlassButton>
                        </div>
                    </div>

                    {/* Hero image */}
                    <Image
                        src="/hand_reaching_out.png"
                        alt="hand reaching out"
                        width={1000}
                        height={600}
                        className="w-full object-contain"
                        style={{
                            maxWidth: "min(480px, 90vw)",
                            marginTop: "-20px",
                        }}
                    />
                </div>
            </Background>
        </div>
    );
}