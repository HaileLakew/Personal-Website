import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { MathUtils, Vector3 } from "three"

import { useMatrixTransform } from "@/utils/utils"

// 0 = original framing, 1 = character's hips always centred horizontally.
// Shifts the projection frustum only — camera path and angles are untouched.
const CENTER = 1

export default function CameraRig() {
    const { camera, scene } = useThree();
    const hips = useRef(null)
    const offsetX = useRef(0)
    const v = useMemo(() => new Vector3(), [])

    const { x: cameraPositionX, y: cameraPositionY, z: cameraPositionZ } = useMatrixTransform({
        keyframes: [0, .05, .16, .3, .35, .46, .52, .54 , .64, .65, .75],
        positionMatrix: [
            [.2, 1.2, .56],
            [.14, .99, .77],
            [0, 1, .6],
            [0, 1.2, .86],
            [0, 1.28, .86],
            [-.05, .8, 1.5],
            [-.05, .8, 1.5],
            [0, .8, 2.65],
            [0, .1, 2.65],
            [0, 1, 2.65],
            [.05, 2.5, 1.59]
        ]
    })

    const { x: cameraLookAtPositionX, y: cameraLookAtPositionY, z: cameraLookAtPositionZ} = useMatrixTransform({
        keyframes: [0, .05, .16, .3, .8, .9],
        positionMatrix: [
            [-2.2, 2, -10],
            [-2.2, 3.88, -10],
            [-.4, 2.27, -3.5],
            [.1, .89, -3.6],
            [.1, .89, -3.6],
            [.1, -10, -3.6]
        ]
    })

    useFrame((state, delta) => {
        camera.position.set( 
            MathUtils.damp(camera.position.x, cameraPositionX.current, 1, delta), 
            MathUtils.damp(camera.position.y, cameraPositionY.current, 1, delta), 
            MathUtils.damp(camera.position.z, cameraPositionZ.current, 1, delta))

        camera.lookAt( 
            cameraLookAtPositionX.current,  
            cameraLookAtPositionY.current, 
            cameraLookAtPositionZ.current)

        if (!CENTER) return
        if (!hips.current) scene.traverse(o => { if (!hips.current && o.isBone && /hip|pelvis|root/i.test(o.name)) hips.current = o })
        const { width, height } = state.size
        camera.updateMatrixWorld()
        camera.clearViewOffset()
        if (hips.current) hips.current.getWorldPosition(v); else v.set(0, 1, 0)
        const target = v.project(camera).x * width / 2 * CENTER
        offsetX.current = MathUtils.damp(offsetX.current, target, 4, delta)
        if (Math.abs(offsetX.current) > .5) camera.setViewOffset(width, height, offsetX.current, 0, width, height)
    })

    return <></>
}
