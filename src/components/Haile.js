/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { MathUtils } from "three"

import { useMotionValueEvent, useScroll, useTransform } from "framer-motion"

import { useAnimations } from '@react-three/drei'

export default function Haile () {
    const { scrollYProgress } = useScroll()
    
    const haileRotation = useTransform(scrollYProgress,
        [0, .2, .3, .36, .45, .55, .6, .65], 
        [Math.PI/3.5, -Math.PI, Math.PI, 0, -Math.PI/5, Math.PI/5, Math.PI/2, Math.PI])
        
    const haileRotationDelta = useTransform(scrollYProgress,
        [0, .1], 
        [2, 2])

    const { pointer } = useThree()
    const [action, setAction] = useState()

    const keyFrames = useMemo(() => [], [])

    const haileRef = useRef()


    const {scene, animations} =  useLoader(GLTFLoader, '/assets/RenderUnwrappedDraco.glb', (loader) => {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
        loader.setDRACOLoader(dracoLoader)
    })

    const { mixer } = useAnimations(animations, scene)

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        if(current < .2) {
            mixer.timeScale = 1/3
            setAction(keyFrames['Idle0'])
        } else if(current < .54) {
            mixer.timeScale = .8
            setAction(keyFrames['FightIdle0'])
        } else if(current < .9) {
            mixer.timeScale = .7
            setAction(keyFrames['Run0'])
        } else {
            mixer.timeScale = .5
            setAction(keyFrames['Jump0'])
        }
    })

    useEffect(() => {
        const fn = (e) => {
            if(scrollYProgress.current < .2) {
                haileRef.current.visible = true
                setAction(keyFrames[`Idle${Math.floor(Math.random() * 2)}`])
            } else if((scrollYProgress.current < .5)) {
                haileRef.current.visible = true
                setAction(keyFrames[`FightIdle${Math.floor(Math.random() * 2)}`])
            }  else if (scrollYProgress.current < .9) {
                haileRef.current.visible = true
                setAction(keyFrames['Run0'])
            }
        }

        mixer.addEventListener('loop', fn);
        return () => {
          mixer.removeEventListener('loop', fn)
        }
      }, [mixer])

    useEffect(() => {
        keyFrames['FightIdle0'] = mixer.clipAction(animations[0], haileRef.current)
        keyFrames['FightIdle1'] = mixer.clipAction(animations[1], haileRef.current)

        keyFrames['Idle0'] = mixer.clipAction(animations[2], haileRef.current)
        keyFrames['Idle1'] = mixer.clipAction(animations[3], haileRef.current)

        keyFrames['Jump0'] = mixer.clipAction(animations[4], haileRef.current)

        keyFrames['Run0'] = mixer.clipAction(animations[5], haileRef.current)
        
        mixer.timeScale = 1/3
        setAction(keyFrames['Idle0'])
    }, [])

    useEffect(() => {
        if(!action) return

        action?.reset().fadeIn(1).play()

        return () => action?.fadeOut(1)
    }, [action])

    useFrame((state, delta) => {
        haileRef.current.rotation.y = MathUtils.damp(haileRef.current.rotation.y, pointer.x/3 + haileRotation.current, haileRotationDelta.current, delta);
      })

    return (
       <primitive ref={haileRef} object={scene} rotation={[0, 0, 0]} position= {[0, .05, 0]} scale={.1} />
    )
}