import * as THREE from 'three'
import { useMemo, useState, useRef, Suspense } from 'react'
import { createPortal, useFrame, useThree } from '@react-three/fiber'
import { useFBO } from '@react-three/drei'

import { useScroll, useTransform } from "framer-motion"

import './shaders/simulationMaterial'
import './shaders/dofPointsMaterial'

const positions = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0])
const uvs =  new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0])

export function Particles({  
  geometries = [],
  speed = 50, 
  fov = 50, 
  aperture = 308, 
  focus = 5.12 * 2, //color
  curl = .25, 
  size = 512, ...props }) {

  const simRef = useRef()
  const renderRef = useRef()

  const { scrollYProgress } = useScroll()
  const progress = useTransform(scrollYProgress,
    [0, .46, .5, .65], 
    [0, 1, 1, 0])

  const { mouse } = useThree();

  // Set up FBO
  const [scene] = useState(() => new THREE.Scene())
  const [camera] = useState(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1))

  const target = useFBO(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.HalfFloatType
  })

  // Normalize points
  const particles = useMemo(() => {
    const length = size * size
    const particles = new Float32Array(length * 3)
    for (let i = 0; i < length; i++) {
      let i3 = i * 3
      particles[i3 + 0] = (i % size) / size
      particles[i3 + 1] = i / size / size
    }
    return particles
  }, [size])

  // Update FBO and pointcloud every frame
  useFrame((state) => {
// Simulation Pass
    state.gl.setRenderTarget(target)
    state.gl.render(scene, camera)
    state.gl.setRenderTarget(null)

    // Update Uniforms (Optimized: direct access to current)
    const rU = renderRef.current.uniforms
    const sU = simRef.current.uniforms

    rU.positions.value = target.texture
    rU.uTime.value = state.clock.elapsedTime
    
    // Smooth lerps
    rU.uFocus.value = THREE.MathUtils.lerp(rU.uFocus.value, focus, 0.1)
    rU.uFov.value = THREE.MathUtils.lerp(rU.uFov.value, fov, 0.1)
    rU.uBlur.value = THREE.MathUtils.lerp(rU.uBlur.value, (5.6 - aperture) * 9, 0.1)

    sU.uTime.value = state.clock.elapsedTime * speed
    sU.uProgress.value = progress.get() // use .get() for framer-motion values in useFrame
    sU.uCurlFreq.value = THREE.MathUtils.lerp(sU.uCurlFreq.value, curl, 0.1)

  })

  const modelA = geometries[0]
  const modelB = geometries[1]

  return (
    <>
      {/* Simulation goes into a FBO/Off-buffer */}
      {createPortal(
        <mesh>
          <simulationMaterial ref={simRef} args={[modelA, modelB, progress]}/>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
            <bufferAttribute attach="attributes-uv" count={uvs.length / 2} array={uvs} itemSize={2} />
          </bufferGeometry>
        </mesh>,
        scene
      )}
      {/* The result of which is forwarded into a pointcloud via data-texture */}
      <points {...props}>
        <dofPointsMaterial ref={renderRef} />
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
        </bufferGeometry>
      </points>
    </>
  )
}