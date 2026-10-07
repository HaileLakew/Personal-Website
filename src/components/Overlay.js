import { useTransform, useScroll, motion } from "framer-motion";

import scrollCall from "../../public/assets/scrollCall.json";
import Lottie from "lottie-react";

// Vault: flat black only — noise texture and vignette removed. Scroll cue kept.
export default function Overlay () {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, .2, .8, 1], [0, 1, 1, 0])

  return (
    <div className="fixed h-screen w-screen pointer-events-none z-50 overflow-hidden">
      <motion.div style={{ opacity }}>
        <Lottie className="fixed bottom-0 left-[62%] sm:left-[85%] w-[60vw] sm:w-[20vw] opacity-50" animationData={scrollCall} />
      </motion.div>
    </div>
  )
}
