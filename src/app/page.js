'use client'

import Canvas from "@/components/Canvas";
import AboutPage from "@/sections/AboutPage";
import LandingPage from "@/sections/LandingPage";
import { Loader } from "@react-three/drei";

import { useScroll, useTransform, motion} from "framer-motion"
import SkillPage from "@/sections/SkillPage";
import Overlay from "@/components/Overlay";
import ConclusionPage from "@/sections/ConclusionPage";
import { useState } from "react";

export default function Home() {
  const { scrollYProgress } = useScroll()
  const [click, setClick] = useState(false)

  return (
    <motion.main 
      className={` overflow-clip bg-black`}>
      <Overlay/>
      <div>Hello</div>
      <Canvas click={click}/>
      <Loader />


      <LandingPage/>
      <div className="h-[45vh]"/>
      <AboutPage/>
      <SkillPage/>
      
      <ConclusionPage/>

    </motion.main>
  );
}