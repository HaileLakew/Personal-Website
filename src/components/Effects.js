import { ToneMapping, EffectComposer, Bloom, Glitch } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Line, Sparkles } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import { useLoading } from './loadingStore'
import { getGpuProfile } from './gpuProfile'
import { MathUtils } from "three"
import { useScroll, useTransform } from "framer-motion"


// Post-processing is the most expensive always-on cost after the particles. Fast GPUs get it as soon as
// the scene is loaded; slow ones wait a few seconds past load and get a lighter pipeline (no adaptive
// luminance pass, no glitch pass) so first interaction isn't competing with shader compiles.
function usePostProcessing() {
    const { done } = useLoading()
    const [mode, setMode] = useState('off')

    useEffect(() => {
        if (!done) return
        const { lowEnd, software } = getGpuProfile()
        if (software) return
        const delay = lowEnd ? 4000 : 0
        const id = setTimeout(() => setMode(lowEnd ? 'light' : 'full'), delay)
        return () => clearTimeout(id)
    }, [done])

    return mode
}

export default function Effects() {
    const mode = usePostProcessing()

    return (
        <>
            {mode !== 'off' && (
                <EffectComposer disableNormalPass>
                    <ToneMapping
                        mode={ToneMapping.ACES_FILMIC} // tone mapping mode
                        blendFunction={BlendFunction.SET} // blend mode
                        adaptive={mode === 'full'} // luminance-map pass is skipped on slow GPUs
                        resolution={256} // texture resolution of the luminance map
                        middleGrey={.25} // middle grey factor
                        maxLuminance={16.0} // maximum luminance
                        averageLuminance={1.0} // average luminance
                        adaptationRate={1.0} // luminance adaptation rate
                    />

                    {mode === 'full' && (
                        <Glitch
                            delay={[0, 10]}
                            duration={[0.1, 0.2]}
                            strength={[0.1, 10]} />
                    )}
                </EffectComposer>
            )}

            <Sparkles count={50} position={[0, 1, 0]} size={.5} scale={3} color={'OrangeRed'} noise={50}/>

            <LaserShowEffect />
        </>
    )
}


function LaserShowEffect () {
    const { scrollYProgress } = useScroll()

    const laserGroup = useRef()
    const laser01 = useRef()
    const laser02 = useRef()
    const laser03 = useRef()
    const laser04 = useRef()
    const laser05 = useRef()

    const haileRotation = useTransform(scrollYProgress,
        [.45, .55, .7], 
        [-Math.PI * 2, -Math.PI * 2, -Math.PI])

    const laserVisisble = useTransform(scrollYProgress,
        [0, .53, .68, .97],
        [0, 1, 1, 0])

    useFrame((state, delta) => {
        if (laserVisisble.current === 1) {
            laserGroup.current.visible = true
        } else {
            laserGroup.current.visible = false
        }

        laserGroup.current.rotation.y = MathUtils.damp(laserGroup.current.rotation.y, haileRotation.current, 1, delta);

        if(laser01.current.position.z > -2) {
            laser01.current.position.z -= .05
            laser02.current.position.z -= .05
            laser03.current.position.z -= .05
            laser04.current.position.z -= .05
            laser05.current.position.z -= .05
        } else {
            laser01.current.position.set(Math.random() * 4 - 2, Math.random() * 3 - 2,  Math.random() * 4 - 2)
            laser02.current.position.set(Math.random() * 4 - 2, Math.random() * 4 - 2,  Math.random() * 4 - 2)
            laser03.current.position.set(Math.random() * 4 - 2, Math.random() * 4 - 2,  Math.random() * 4 - 2)
            laser04.current.position.set(Math.random() * 4 - 2, Math.random() * 4 - 2,  Math.random() * 4 - 2)
            laser05.current.position.set(Math.random() * 4 - 2, Math.random() * 4 - 2,  Math.random() * 4 - 2)
        }
    })
    
    return (
        <group ref={laserGroup} rotation={[0, 0, 0]}> 
            <Line ref={laser01} points={[[0, 1.5, -.25], [0, 1.5, .25]]} color="orange"  lineWidth={1}  />
            <Line ref={laser02}  points={[[0, 1.6, -.25], [0, 1.6, .25]]}  color="orange" lineWidth={1}  />
            <Line ref={laser03}  points={[[0, 1.7, -.25], [0, 1.7, .25]]}  color="orange" lineWidth={1}  />
            <Line ref={laser04}  points={[[0, 1.8, -.25], [0, 1.8, .25]]}  color="orange" lineWidth={1}  />
            <Line ref={laser05}  points={[[0, 1.9, -.25], [0, 1.9, .25]]}  color="orange" lineWidth={1}  />
        </group>
    )
} 