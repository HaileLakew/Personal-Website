'use client'

import Canvas from "@/components/Canvas";
import AboutPage from "@/sections/AboutPage";
import LandingPage from "@/sections/LandingPage";
import { Loader } from "@react-three/drei";

import {motion} from "framer-motion"
import SkillPage from "@/sections/SkillPage";
import Overlay from "@/components/Overlay";
import ConclusionPage from "@/sections/ConclusionPage";

export default function Home() {
  return (
    <main className={`overflow-clip bg-black`}>
      <Overlay/>
      <Canvas/>
      <Loader />
      <LandingPage/>
      <div className="h-[45vh]"/>
      <AboutPage/>
      <SkillPage/>
      <ConclusionPage/>
      <div className="h-[25vh]"/>
    </main>
  );
}