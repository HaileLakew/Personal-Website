import { motion } from 'framer-motion'

export default function ConclusionPage() {
    return (
        <section className="relative h-screen text-white flex justify-center items-center overflow-hidden pointer-events-auto">
            {/* Background Video */}
            <video
                preload="metadata"
                autoPlay
                loop
                muted
                playsInline
                className="absolute min-w-full min-h-full w-auto h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
            >
                <source src="/assets/Connect.mp4" type="video/mp4" />
            </video>

            {/* <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10" /> */}

            <motion.div  
                className='text-white text-center p-10 top-32 z-20 text-xl relative' 
                whileHover={{scale: 1.2}}
            >
                <a href="/docs/HailemeskelLakew-Resume.pdf" target="_blank">
                    Lets<b className='pl-1 text-amber-400'>Connect.</b>
                </a>
            </motion.div>
        </section>
    )
}
