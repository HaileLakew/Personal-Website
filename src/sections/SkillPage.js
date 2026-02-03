import RotatingList from "@/components/RotatingList";
import { useTransform, useScroll, motion } from "framer-motion";

export default function SkillPage() {
    const { scrollYProgress } = useScroll()

    const html01Opacity = useTransform(scrollYProgress, [.42, .48, .52, .54], [0, 1, 1, 0])
    const html02Opacity = useTransform(scrollYProgress, [.66, .7, .73, .75], [0, 1, 1, 0])
    const html03Opacity = useTransform(scrollYProgress, [.8, .82, .87, .9], [0, 1, 1, 0])

    return (
      <section className="w-screen text-white overflow-visible">
        <motion.div className="h-[150vh] w-screen" style={{ opacity: html01Opacity }}>
            <div className="sticky top-20 md:top-28 m-5">
                <div className="py-2 text-center text-sm sm:text-3xl"> HAILE LAKEW </div>
                <motion.div
                initial={{ opacity: 0}} 
                whileInView={{ opacity: 1, transition: {delay: 1, duration: 1}}} 
                className="text-2xl font-bold text-center sm:text-3xl ">Senior Software Engineer</motion.div>
                <motion.div 
                initial={{ opacity: 0}} 
                whileInView={{ opacity: 1, transition: {delay: 1, duration: 1}}} 
                className="text-sm text-center sm:text-3xl">Bachelor of Computer Science</motion.div>
            </div>
        </motion.div>

        <motion.div className="h-screen m-auto overflow-visible sm:ml-[25vw]">
          <motion.div 
            className={` text-white w-[50vw] sticky top-20 md:top-40`} 
            style={{ opacity: html02Opacity }}
            >
            <div className="flex w-screen sm:flex-col md:w-[50vw] text-sm md:text-xl">
                <div className="w-full p-5 font-light">
                    <div className="py-2 ">SKILLS</div>
                    <div className="sm:p-5" >
                        {[
                            {name: 'Javascript / Node', level: 4.5},
                            {name: 'React', level: 3.5},
                            {name: 'Weback / Bundling', level: 3},
                            {name: 'CI / CD', level: 4.5},
                            {name: 'Bash / Python', level: 3.5},
                            {name: 'Tailwind / Framer / CSS Frameworks', level: 3},
                            {name: 'Three JS / WebGL / Three-Fiber', level: 3}
                        ].map((skill, index)=>{
                        return(
                            <motion.div key={index} className="py-1">
                                {skill.name}
                                <motion.div className={`bg-gradient-to-r from-amber-50 to-yellow-500 rounded-md p-1 absolute my-1 ${index%2===0 ? 'z-[11]' : 'z-[1]'}`}
                                    animate={{ 
                                        width: ['0%', `${10*skill.level}%`],
                                        opacity: [0, .8, .8, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        ease: "easeInOut",
                                        times: [0, 0.2, 0.5, 0.8, 1],
                                        repeat: Infinity,
                                        repeatDelay: 1,
                                    }}
                                    />
                                <motion.div className={`bg-gradient-to-r from-yellow-800 via-amber-200 to-yellow-500 rounded-md p-1 relative my-1 ${index%2===0 ? 'z-10' : 'z-0'}`}
                                    initial={{ width: 0 }} 
                                    whileInView={{  width: `${18*skill.level}%`}}
                                    transition={{ delay: 2, duration: 2 }}
                                    />
                            </motion.div>
                        )
                        })}
                    </div>
                </div>
            </div>
            </motion.div>
        </motion.div>

        <motion.div className="h-screen md:relative md:left-[27%] w-screen md:w-[50vw] text-sm md:text-xl" style={{ opacity: html03Opacity }}>
          <motion.div className={` text-white w-[50vw] sticky top-20 md:top-40`} >
            <div className="p-5">ABILITIES</div>

            <RotatingList 
                list = {[
                        {   
                            title: `Bash & Python Scripting`,
                            message: `I have been able to automate repetitive tasks and instructions to improve productivity of teams I've worked with.`
                        },
                        {
                            title: `Frontend Development`, 
                            message: `Through the use of Javascript and React, I have developed several web applications and websites,
                                        including this one.`
                        },
                        {
                            title: `Node Scripting`,
                            message: `Using Node with the power of Webpack, I have been able to create custom build scripts with fine tuned optimizations`
                        },
                        {
                            title: "CI / CD", 
                            message: `Using custom Github Actions, I have been able to automate the deployment of several projects, including this one.`},
                        {
                            title: "Chrome Plugin Development", 
                            message: `In an effort to improve productivity, I have developed a chrome plugin to highlight and save important information on web pages.`
                        },
                        {
                            title: "Three JS Development", 
                            message: `Familiar with Three JS, Three-Fiber, and WebGL Shaders, I have designed a couple of interesting sites.`
                        },
                        {
                            title: "Blender 3D Modeling",
                            message: `I have created several 3D models and animations, such some of the assets used for this website.`
                        }
                    ]}
              />
            </motion.div>
        </motion.div>
      </section>
    );
}