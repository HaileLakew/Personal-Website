'use client'

import dynamic from "next/dynamic";
import AboutPage from "@/sections/AboutPage";
import LandingPage from "@/sections/LandingPage";
import LoadingBar from "@/components/LoadingBar";

import SkillPage from "@/sections/SkillPage";
import ConclusionPage from "@/sections/ConclusionPage";

// Section heights are unchanged from the original so CameraRig / Haile scroll keyframes land on the same beats.
// Heavy client-only chunks (three/drei/postprocessing, lottie) load after the page shell paints
const Canvas = dynamic(() => import("@/components/Canvas"), { ssr: false });
const Overlay = dynamic(() => import("@/components/Overlay"), { ssr: false });

export default function Home() {
  return (
    <main className="overflow-clip bg-[#0E0E0E]">
      <Overlay/>
      <Canvas/>
      <LoadingBar />
      <LandingPage/>
      <div className="h-[45vh]"/>
      <AboutPage/>
      <SkillPage/>
      <ConclusionPage/>
    </main>
  );
}
