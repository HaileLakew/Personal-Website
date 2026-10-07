'use client'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { MathUtils } from "three"
import * as THREE from 'three'
import Haile from './Haile'
import { Suspense, useRef, useState, useEffect, lazy } from 'react'
import { useScroll, useMotionValueEvent, useTransform } from "framer-motion"
import { isMobile } from 'react-device-detect'

// Lazy load the Particles component
const Particles = lazy(() => import('./Particles/Particles').then(module => ({ default: module.Particles })))

export default function Models () {
    const { scrollYProgress } = useScroll()

    const haileRotation = useTransform(scrollYProgress,
        [.45, .55, .7], 
        [-Math.PI * 2, -Math.PI * 2, -Math.PI])

    const haileRotationDelta = useTransform(scrollYProgress,
        [0, .1], 
        [2, 2])

    const HaileModel =  useLoader(GLTFLoader, '/assets/RenderUnwrappedDraco.glb', (loader) => {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
        loader.setDRACOLoader(dracoLoader)
    })

    const CustomModelA = new THREE.BufferGeometry()
    const CustomModelAVerticles = new Float32Array([...HaileModel.scene.children[0].children[0].children[0].geometry.attributes.position.array])
    CustomModelA.setAttribute( 'position', new THREE.BufferAttribute( CustomModelAVerticles, 3 ) );
    const CustomModelB = new THREE.BufferGeometry(HaileModel.scene.children[0].children[0].children[1].geometry)
    const CustomModelBVerticles = new Float32Array([...HaileModel.scene.children[0].children[0].children[1].geometry.attributes.position.array])
    CustomModelB.setAttribute( 'position', new THREE.BufferAttribute( CustomModelBVerticles, 3 ) );
    CustomModelA.scale(.11, .098, .05)
    CustomModelB.scale(.11, .098, .05)

    const HaileGeometry = new Float32Array([
        ...CustomModelA.attributes.position.array, 
        ...CustomModelB.attributes.position.array]);

    const SphereGeometry = new THREE.SphereGeometry( 2, 128*2, 128*2 );
    const customSphereGeometry = new Float32Array([...SphereGeometry.attributes.position.array,])

    const BoxGeometry = new THREE.PlaneGeometry( 3, 5, 128*2, 128*2 ).rotateX(Math.PI/2)
    BoxGeometry.scale(5, 5, 5)   
    BoxGeometry.translate(0, 0, -8)
    const customBoxGeometry = new Float32Array([...BoxGeometry.attributes.position.array,])

    const ParticlesRef = useRef()

    const [GeometryA, setGetGeometryA] = useState(HaileGeometry);
    const [GeometryB, setGetGeometryB] = useState(customSphereGeometry);

    const [toggleBox, setToggleBox] = useState(false)
    const [toggleSphere, setToggleSphere] = useState(true)

    // State to toggle particles rendering
    const [shouldRenderParticles, setShouldRenderParticles] = useState(false)
    
    // Ref to track benchmark performance across frames without triggering re-renders
    const fpsTracker = useRef({ active: true, frames: 0, time: 0 })

    // Baseline gate: Mount particles initially if not on mobile and WebGL2 is supported
    useEffect(() => {
        const hasWebGL2 = !!window.WebGL2RenderingContext;
        if (!isMobile && hasWebGL2) {
            setShouldRenderParticles(true);
        } else {
            fpsTracker.current.active = false; // Skip benchmarking entirely
        }
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

        // Micro-benchmark execution
        if (fpsTracker.current.active && shouldRenderParticles) {
            fpsTracker.current.frames += 1;
            
            // Skip the first 30 frames to allow shaders to compile and scene to stabilize
            if (fpsTracker.current.frames > 30) {
                fpsTracker.current.time += delta;
            }
            
            // Evaluate at 90 frames (60 measured frames = ~1 second of optimal runtime)
            if (fpsTracker.current.frames === 90) {
                fpsTracker.current.active = false; // Stop tracking
                
                const averageFps = 60 / fpsTracker.current.time;
                
                // If the average framerate drops below 40 FPS, unmount the particles
                if (averageFps < 40) {
                    setShouldRenderParticles(false);
                }
            }
        }
    })

    return (
        <Suspense fallback={null}>
            <Haile scene={HaileModel.scene} animations={HaileModel.animations}/>
            
            {/* <group ref={ParticlesRef}>
                {shouldRenderParticles &&
                    <Suspense fallback={null}>
                        <Particles 
                            position= {[0, .05, 0]} 
                            geometries={[
                                GeometryA,
                                GeometryB
                            ]} />
                    </Suspense>
                }
            </group> */}
        </Suspense>
    )
}