import Background from "./Background";
import GlassButton from "./GlassButton";


export default function HeroSection() {
    return (
        <div className="min-h-screen">
            <Background density={20} dotSize={0.5} >
                <div className="flex flex-col items-center justify-center min-h-screen gap-6">
                    <GlassButton>
                        <span className="px-10 py-2.5 text-white flex justify-center items-center text-sm font-semibold">
                            AI Dev Lab
                        </span>
                    </GlassButton>
                    {/* Heading */}
                    <div className="flex flex-col gap-1 text-center">
                        <h1
                            className="font-bold leading-tight"
                            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#ffffff" }}
                        >
                            Every idea starts in the light
                        </h1>
                        <h1
                            className="font-bold leading-tight"
                            style={{
                                fontSize: "clamp(2.5rem, 6vw, 5rem)",
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
                    <div className="flex flex-col gap-1 text-center max-w-3xl">
                        <p className="text-white text-base font-normal">
                            XYZ is an AI Dev Lab helping founders turn ideas into real, scalable products,&nbsp; with clarity, not chaos.
                        </p>
                        <p className="text-white text-base font-normal">
                            Build. Fix. Scale. Gain traction, guided by systems, AI, and elite operators.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-row gap-3">
                        <button
                            className="px-8 py-2.5 bg-white text-blue-900 font-semibold text-sm rounded-lg cursor-pointer border-none hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all duration-150"
                        >
                            Get In Touch
                        </button>
                        <GlassButton>
                            <span className="px-10 py-2.5 text-white flex justify-center items-center text-sm font-semibold">
                                Learn More
                            </span>
                        </GlassButton>
                    </div>

                </div>
            </Background>
        </div>
    );
}