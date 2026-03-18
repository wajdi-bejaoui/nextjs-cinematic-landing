import Navbar from "@/app/components/Navbar";
import HeroSection from "./components/HeroSection";


export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
    </>
  );
}



// export default function Home() {
//   return (
//     <>
//       <div style={{ width: "100%" }}>
//         <Navbar />
//       </div>

//       <div className="min-h-screen">
//         <Background density={20} dotSize={0.5}>
//           <div className="flex flex-col items-center justify-center min-h-screen gap-8">

//             {/* Badge */}
//             <div
//               className="px-5 py-1.5 rounded-full text-sm text-white font-medium"
//               style={{
//                 border: "1px solid rgba(120, 140, 255, 0.5)",
//                 background: "rgba(80, 100, 220, 0.15)",
//                 backdropFilter: "blur(8px)",
//                 boxShadow: "0 0 12px rgba(100, 120, 255, 0.2)",
//               }}
//             >
//               AI Dev Lab
//             </div>

//             {/* Heading */}
//             <div className="flex flex-col gap-1 text-center">
//               <h1
//                 className="font-bold leading-tight"
//                 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#ffffff" }}
//               >
//                 Every idea starts in the light
//               </h1>
//               <h1
//                 className="font-bold leading-tight"
//                 style={{
//                   fontSize: "clamp(2.5rem, 6vw, 5rem)",
//                   background: "linear-gradient(90deg, #6b8cff 0%, #a78bfa 50%, #818cf8 100%)",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   backgroundClip: "text",
//                 }}
//               >
//                 We build it right.
//               </h1>
//             </div>

//             {/* Subtitle */}
//             <div className="flex flex-col gap-1 text-center max-w-2xl">
//               <p className="text-white/70 text-base font-normal">
//                 XYZ is an AI Dev Lab helping founders turn ideas into real, scalable products,&nbsp; with clarity, not chaos.
//               </p>
//               <p className="text-white/70 text-base font-normal">
//                 Build. Fix. Scale. Gain traction, guided by systems, AI, and elite operators.
//               </p>
//             </div>

//             {/* CTA Buttons */}
//             <div className="flex flex-row gap-3">
//               <button
//                 className="px-6 py-2.5 bg-white text-black font-semibold text-sm rounded-lg cursor-pointer border-none hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all duration-150"
//               >
//                 Get In Touch
//               </button>
//               <GlassButton>
//                 <span className="px-8 py-2.5 text-white flex justify-center items-center text-sm font-semibold">
//                   Learn More
//                 </span>
//               </GlassButton>
//             </div>

//             {/* Bottom glow icon (placeholder — swap with your actual image/component) */}
//             <div className="relative mt-4 flex justify-center items-end" style={{ height: "180px" }}>
//               {/* Glow orb behind icon */}
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: "40px",
//                   width: "120px",
//                   height: "60px",
//                   background: "radial-gradient(ellipse, rgba(100,140,255,0.5) 0%, transparent 70%)",
//                   filter: "blur(16px)",
//                 }}
//               />
//               {/* Glass icon box */}
//               <div
//                 style={{
//                   width: "80px",
//                   height: "80px",
//                   borderRadius: "20px",
//                   background: "linear-gradient(135deg, rgba(120,160,255,0.35) 0%, rgba(60,90,200,0.2) 100%)",
//                   border: "1px solid rgba(150,180,255,0.5)",
//                   backdropFilter: "blur(12px)",
//                   boxShadow: "0 0 30px rgba(100,140,255,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   position: "relative",
//                   zIndex: 1,
//                 }}
//               >
//                 {/* Replace with your actual icon/logo */}
//                 <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
//                   <path d="M8 28L18 8l10 20H8z" fill="white" opacity="0.9" />
//                 </svg>
//               </div>
//             </div>

//           </div>
//         </Background>
//       </div>
//     </>
//   );
// }