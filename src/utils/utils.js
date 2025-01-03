import { useScroll, useTransform } from "framer-motion"

export function useMatrixTransform ({ keyframes, positionMatrix}) {
    const { scrollYProgress } = useScroll()

    const positionsX = new Array(keyframes.length).fill('NA');
    const positionsY = new Array(keyframes.length).fill('NA');
    const positionsZ = new Array(keyframes.length).fill('NA');

    positionMatrix.forEach((position, index) => {
        positionsX[index] = position[0];
        positionsY[index] = position[1];
        positionsZ[index] = position[2];
    })

    return {
        x: useTransform(scrollYProgress,
            keyframes,
            positionsX),
        y: useTransform(scrollYProgress,
            keyframes,
            positionsY),
        z: useTransform(scrollYProgress,
            keyframes,
            positionsZ)
    }
}