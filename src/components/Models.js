'use client'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

import { MathUtils } from "three"

import * as THREE from 'three'

import Haile from './Haile'

import { Suspense, useRef, useState } from 'react'
import { Particles } from './Particles/Particles'
import { useScroll, useMotionValueEvent, useTransform } from "framer-motion"

import { isMobile } from 'react-device-detect';

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
        // ...model.nodes.FBHead.geometry.attributes.position.array,
        // ...model.nodes.Plane002.geometry.attributes.position.array,
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
        ParticlesRef.current.rotation.y = MathUtils.damp(ParticlesRef.current.rotation.y, haileRotation.current, haileRotationDelta.current, delta);

        if( scrollYProgress.current < .5) {
            ParticlesRef.current.position.x = MathUtils.damp(ParticlesRef.current.position.x, 0 , 10, delta);
        } else {
            ParticlesRef.current.position.x = MathUtils.damp(ParticlesRef.current.position.x, Math.sin(state.clock.elapsedTime) , 1, delta);
        }

 
    })

    return (
        <Suspense fallback={null}>
            <Haile scene={HaileModel.scene} animations={HaileModel.animations}/>
            
            <group ref={ParticlesRef}>
                {!isMobile &&
                <Suspense fallback={null}>
                    <Particles 
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