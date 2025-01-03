import { useTransform, useScroll, motion } from "framer-motion";

import scrollCall from "../../public/assets/scrollCall.json";
import Lottie from "lottie-react";

export default function Overlay () {
  const { scrollYProgress } = useScroll()

  const html01Opacity = useTransform(scrollYProgress, [0, .2, .8, 1], [0, 1, 1, 0])

    return (
      <div 
        className="fixed h-screen w-screen pointer-events-none z-50 justify-center items-center flex overflow-hidden" 
        style={{ boxShadow: "0px 0px 100px 100px rgba(0,0,0,.65) inset"}}> 
          <div
            className="bg-black fixed"
            style={{ 
              width: '95vw',
              height: '95vh',
              boxShadow: "0px 0px 100px 100px rgba(0,0,0,.65) inset",
              backgroundImage: 'url(/assets/noise.png)',
              backgroundSize: 'auto',
              backgroundRepeat: 'repeat',
              opacity: .03
            }}/>
            <motion.div className="overflow-hidden" style={{ opacity: html01Opacity }}>
                <Lottie className="fixed bottom-[0%] left-[62%] sm:left-[85%] w-[60vw] sm:w-[20vw] opacity-50" animationData={scrollCall} />
            </motion.div>
        </div>
    )
}
