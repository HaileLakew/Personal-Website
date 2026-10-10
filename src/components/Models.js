'use client'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { MathUtils } from "three"
import * as THREE from 'three'
import Haile from './Haile'
import { Suspense, useRef, useState, useEffect, useMemo, lazy } from 'react'
import { useScroll, useMotionValueEvent, useTransform } from "framer-motion"
import { isMobile } from 'react-device-detect'
import { getGpuProfile } from './gpuProfile'

// Lazy load the Particles component
const Particles = lazy(() => import('./Particles/Particles').then(module => ({ default: module.Particles })))

const HAILE_URL = '/assets/RenderUnwrappedDraco.glb'

// Decoder is self-hosted (public/draco) to avoid a cross-origin round trip before the model can parse
const extendLoader = (loader) => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')
    loader.setDRACOLoader(dracoLoader)
}

// Start fetching the model as soon as this module loads, not when the Canvas first renders
useLoader.preload(GLTFLoader, HAILE_URL, extendLoader)

const PARTICLE_TIERS = {
    1: { size: 40, simEvery: 1 },
    2: { size: 40, simEvery: 1 },
    3: { size: 40, simEvery: 1 },
}

export default function Models () {
    const { scrollYProgress } = useScroll()

    const haileRotation = useTransform(scrollYProgress,
        [.45, .55, .7], 
        [-Math.PI * 2, -Math.PI * 2, -Math.PI])

    const haileRotationDelta = useTransform(scrollYProgress,
        [0, .1], 
        [2, 2])

    const HaileModel = useLoader(GLTFLoader, HAILE_URL, extendLoader)

    // Built once: these were previously rebuilt on every render (including each scroll-toggle)
    const { HaileGeometry, customSphereGeometry, customBoxGeometry } = useMemo(() => {
        const meshes = HaileModel.scene.children[0].children[0].children
        const toGeometry = (mesh) => {
            const g = new THREE.BufferGeometry()
            g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(mesh.geometry.attributes.position.array), 3))
            g.scale(.11, .098, .05)
            return g
        }
        const A = toGeometry(meshes[0])
        const B = toGeometry(meshes[1])

        const haile = new Float32Array(A.attributes.position.array.length + B.attributes.position.array.length)
        haile.set(A.attributes.position.array)
        haile.set(B.attributes.position.array, A.attributes.position.array.length)

        const sphere = new THREE.SphereGeometry(2, 128*2, 128*2)
        const plane = new THREE.PlaneGeometry(3, 5, 128*2, 128*2).rotateX(Math.PI/2)
        plane.scale(5, 5, 5)
        plane.translate(0, 0, -8)

        const result = {
            HaileGeometry: haile,
            customSphereGeometry: new Float32Array(sphere.attributes.position.array),
            customBoxGeometry: new Float32Array(plane.attributes.position.array),
        }
        ;[A, B, sphere, plane].forEach(g => g.dispose())
        return result
    }, [HaileModel])

    const ParticlesRef = useRef()

    const [GeometryA, setGetGeometryA] = useState(HaileGeometry);
    const [GeometryB, setGetGeometryB] = useState(customSphereGeometry);

    const [toggleBox, setToggleBox] = useState(false)
    const [toggleSphere, setToggleSphere] = useState(true)

    // Quality tier: 0 = off, 1-3 all 40² (~1.6k) now that the count is capped; the tiers only gate the fallback to off.
    // Starts from a hardware guess and only ever steps down at runtime.
    const [tier, setTier] = useState(0)
    const fpsTracker = useRef({ frames: 0, time: 0, settled: false })

    useEffect(() => {
        if (isMobile || !window.WebGL2RenderingContext) return

        const { tier: initial, software } = getGpuProfile()
        if (software) return

        // Wait until the page is idle so the shader compile doesn't block first paint
        const start = () => setTier(initial)
        const id = window.requestIdleCallback ? window.requestIdleCallback(start, { timeout: 3000 }) : setTimeout(start, 1500)
        return () => window.cancelIdleCallback ? window.cancelIdleCallback(id) : clearTimeout(id)
    }, [])

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        if(current < .5 && !toggleSphere) {
            setGetGeometryB(customSphereGeometry)
            setToggleSphere(true)
            setToggleBox(false)
        } else if(current > .5 &&!toggleBox){
            setGetGeometryB(customBoxGeometry)
            setToggleBox(true)
            setToggleSphere(false)
        }
    })

    useFrame((state, delta) => {
        if (ParticlesRef.current) {
            ParticlesRef.current.rotation.y = MathUtils.damp(ParticlesRef.current.rotation.y, haileRotation.current, haileRotationDelta.current, delta);

            if( scrollYProgress.current < .5) {
                ParticlesRef.current.position.x = MathUtils.damp(ParticlesRef.current.position.x, 0 , 10, delta);
            } else {
                ParticlesRef.current.position.x = MathUtils.damp(ParticlesRef.current.position.x, Math.sin(state.clock.elapsedTime) , 1, delta);
            }
        }

        // Step down a tier when the measured framerate is poor, re-measuring after each change
        const t = fpsTracker.current
        if (tier > 0 && !t.settled) {
            t.frames += 1
            // Skip the first 30 frames: shader compile + FBO allocation
            if (t.frames > 30) t.time += Math.min(delta, .25)
            if (t.frames === 90) {
                const averageFps = 60 / t.time
                t.frames = 0
                t.time = 0
                if (averageFps < 40) setTier(tier - 1)
                else t.settled = true
            }
        }
    })

    return (
        <Suspense fallback={null}>
            <Haile scene={HaileModel.scene} animations={HaileModel.animations}/>
            
            <group ref={ParticlesRef}>
                {tier > 0 &&
                    <Suspense fallback={null}>
                        <Particles
                            key={tier}
                            size={PARTICLE_TIERS[tier].size}
                            simEvery={PARTICLE_TIERS[tier].simEvery}
                            position= {[0, .05, 0]}
                            geometries={[
                                GeometryA,
                                GeometryB
                            ]} />
                    </Suspense>
                }
            </group>
        </Suspense>
    )
}