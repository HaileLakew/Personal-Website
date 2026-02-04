import { motion } from 'framer-motion'
export default function ConclusionPage() {

    return (
        <section className="h-screen text-white flex justify-center items-center overflow-hidden text-5xl pointer-events-auto">
            <motion.div  className=' text-white text-center p-10 z-20' whileHover={{scale: 1.2}}>
                <a href="/docs/Resume.pdf" target="_blank">
                    Lets<b className='pl-1 text-amber-400'>Connect.</b>
                </a>
            </motion.div>
        </section>
    )
}