'use client'

import Canvas from "@/components/Canvas";
import AboutPage from "@/sections/AboutPage";
import LandingPage from "@/sections/LandingPage";
import { Loader } from "@react-three/drei";

import SkillPage from "@/sections/SkillPage";
import Overlay from "@/components/Overlay";
import ConclusionPage from "@/sections/ConclusionPage";

// Section heights are unchanged from the original so CameraRig / Haile scroll keyframes land on the same beats.
export default function Home() {
  return (
    <main className="overflow-clip bg-[#0E0E0E]">
      <Overlay/>
      <Canvas/>
      <Loader />
      <LandingPage/>
      <div className="h-[45vh]"/>
      <AboutPage/>
      <SkillPage/>
      <ConclusionPage/>
    </main>
  );
}
