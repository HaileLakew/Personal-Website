import { motion } from 'framer-motion'

export default function AboutPage() {

    return (
        <section className={"h-[70vh] w-screen"}>
            <div className={'m-5 sticky top-20 '}>
                <div className='h-full z-20 overflow-hidden'>
                    <motion.div className=' text-white text-center text-4xl md:text-9xl p-10 z-20'
                                    initial={{ opacity: 0, y: '100%'}} 
                                    whileInView={{ opacity: 1, y: '0%', transition: {delay: .25, duration: 1}}}>
                                                MANIFESTO
                    </motion.div>
                </div>
                <div className='text-white text-justify m-8 sm:m-44 text-xl md:text-3xl h-full overflow-hidden'>         
                    <motion.div
                         initial={{ opacity: 0}} 
                         whileInView={{ opacity: 1, transition: {delay: .5, duration: 1}}}
                        >

                            <b>Software Engineering</b> is where creativity and <b className='text-amber-500'>logic</b> meet.
                            Where one can <b className='text-amber-500'>create</b> something beautiful and <b className='text-amber-500'>functional</b> at the same time.
                            <b className='text-amber-500'> Problem-solving</b> is not just about finding a <b className='text-amber-500'>solution</b>. And
                            <b className='text-amber-500'> Innovation</b> is not just about creating something new. The <b className='text-amber-500'>process</b> is just as important as the end product, and 
                            <b className='text-amber-500'> learning</b> is a never-ending journey.
                            <br/><br/>
                            <motion.div 
                                initial={{ opacity: 0}} 
                                whileInView={{ opacity: 1, transition: {delay: 1, duration: 1}}} 
                                className='text-center'>
                                What if coding was more than just a job? What if it was <b className='text-amber-500'>passion</b>?
                            </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}