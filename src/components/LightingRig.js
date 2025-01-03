import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

export default function LightingRig() {
    
    const ambientLight = useRef();
    const directionalLight = useRef();


    useFrame(({clock}, delta) => {
        directionalLight.current.position.x = 5 + Math.sin( clock.getElapsedTime()) * 5;
    })

    return (
        <>
            <ambientLight ref={ambientLight} intensity={6}/>
            <directionalLight ref={directionalLight} position={[1, 1.3, 2.3]} color={'Goldenrod'} intensity={2}/>
            <directionalLight position={[1, .5, 2]} intensity={.1}/>
        </>
    )
}