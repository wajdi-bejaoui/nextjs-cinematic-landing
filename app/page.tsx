import Background from "@/app/components/Background";
import Navbar from "@/app/components/Navbar";


export default function Home() {
  return (
    <>

      {/* Layer 1: particles */}
      <Navbar />
      <div className="min-h-screen">
        <Background density={20} dotSize={0.5} >
          <div className="flex flex-col items-center justify-center min-h-screen gap-10">
            <div className="text-white text-2xl font-bold">AI Dev Lab</div>
          </div>
        </Background>
      </div>



    </>
  );
}