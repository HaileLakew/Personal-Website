'use client'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, OrbitControls, PerformanceMonitor, Preload, Stats, Html } from '@react-three/drei'

import CameraRig from './CameraRig'
import LightingRig from './LightingRig'
import Effects from './Effects'

import { Suspense, useState } from 'react'
import { useScroll, useTransform, motion} from "framer-motion"

import { isMobile } from 'react-device-detect';


import Models from './Models'

export default function CustomCanvas() {
    const [dpr, setDpr] = useState(isMobile? .7 : .8)

    const { scrollYProgress } = useScroll()
    const opacity = useTransform(scrollYProgress, 
        [0, .08, .13, .32, .37, .8, 1], 
        [1, 1, .25, 0, 1, 1, 0])

    return(
        <motion.div className="h-screen w-screen fixed  overflow-hidden pointer-events-none"      
            style={{ opacity}}        
            initial={{ opacity: 0, filter: 'blur(50px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', transition: { delay: 1, duration: 3 } }}
            viewport={{ once: true }}
            >
                <Suspense fallback={null}>
                    <Canvas
                        dpr={dpr}
                        camera={{ position: [0, 5, 15] }}
                        gl={{ antialias: false}}
                        performance={{ min: 0.1 }}
                        onCreated={({ gl }) => ((gl.shadowMap.autoUpdate = false), (gl.shadowMap.needsUpdate = true))}
                    >
                        <PerformanceMonitor 
                            flipflops={2} onFallback={() => setDpr(.8)}
                            onIncline={() => setDpr(.8)} onDecline={() => setDpr(.5)} >

                            <Preload all/>
                            <AdaptiveDpr pixelated/>
                            <AdaptiveEvents />
                            <Stats/>

                            {/* <OrbitControls/> */}

                            <Models/>

                            <Effects/>
                            <CameraRig/>
                            <LightingRig/>
                        </PerformanceMonitor>
                    </Canvas>
                </Suspense>
        </motion.div>

    )
}