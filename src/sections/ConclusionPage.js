import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function ConclusionPage() {
    // const { scrollYProgress } = useScroll()

    // useMotionValueEvent(scrollYProgress, "change", (current) => {
    //     if(current===1 && typeof window !== "undefined") {
    //         window.open('/docs/Resume.pdf', "_blank");
    //     }
    // })
    return (
        <section className="h-screen text-white flex justify-center items-center overflow-hidden text-3xl">
            <a href="/docs/Resume.pdf" target="_blank">
                <motion.div>
                    Lets<b className='pl-1 text-amber-400'>Connect.</b>
                </motion.div>
           </a>
        </section>
    )
}