import { useFrame, useThree } from "@react-three/fiber"
import { MathUtils } from "three"
import { useScroll } from "framer-motion"
import { useControls } from 'leva'

import { useMatrixTransform } from "@/utils/utils"

export default function CameraRig() {
    const { scrollYProgress } = useScroll()
    const {camera, pointer} = useThree();

    const { x: cameraPositionX, y: cameraPositionY, z: cameraPositionZ } = useMatrixTransform({
        keyframes: [0, .05, .16, .3, .35, .46, .52, .54 , .64, .65, .75],
        positionMatrix: [
            [.2, 1.2, .56],
            [.14, .99, .77],
            [0, 1.47, .6],
            [0, 1.2, .86],
            [0, 1.28, .86],
            [-.25, 1.3, 1.65],
            [-.2, 1.4, 1.65],
            [0, .8, 1.65],
            [0, .1, 1.65],
            [0, 1, 1.65],
            [.05, 2.57, 1.59]
        ]
    })

    const { x: cameraLookAtPositionX, y: cameraLookAtPositionY, z: cameraLookAtPositionZ} = useMatrixTransform({
        keyframes: [0, .05, .16, .3],
        positionMatrix: [
            [-2.2, 2, -10],
            [-2.2, 3.88, -10],
            [-.4, 2.27, -3.5],
            [.1, .89, -3.6]
            // [2, 1, -6],
            // [-6, -.3, -3]
        ]
    })
    
    // const { camPositionX, camPositionY, camPositionZ, camLookX, camLookY, camLookZ } = useControls({ 
    //     camPositionX: { value: 0, min: -10, max: 10, step: .01},
    //     camPositionY: { value: 0, min: -10, max: 10, step: .01},
    //     camPositionZ: { value: 0, min: -10, max: 10, step: .01},

    //     camLookX: { value: 0, min: -10, max: 10, step: .01},
    //     camLookY: { value: 0, min: -10, max: 10, step: .01},
    //     camLookZ: { value: 0, min: -10, max: 10, step: .01},
    //  })
    
    useFrame((state, delta) => {
        camera.position.set( 
            MathUtils.damp(camera.position.x, cameraPositionX.current, 1, delta), 
            MathUtils.damp(camera.position.y, cameraPositionY.current, 1, delta), 
            MathUtils.damp(camera.position.z, cameraPositionZ.current, 1, delta))

        camera.lookAt( 
            cameraLookAtPositionX.current,  
            cameraLookAtPositionY.current, 
            cameraLookAtPositionZ.current)


        // console.log(scrollYProgress.current)
    })

    return <></>
}