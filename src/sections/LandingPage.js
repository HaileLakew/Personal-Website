import { useProgress } from '@react-three/drei';
import { motion } from 'framer-motion'

export default function LandingPage() {   
    const { progress } = useProgress()

    return(
        <motion.section 
            className='h-screen w-screen flex justify-start pt-64 sm:pt-0 sm:justify-center items-center flex-col overflow-hidden'>
            {progress === 100 &&
            <>
                <motion.svg 
                    className={"h-[10%] lg:h-[25%] relative bottom-[20%] sm:bottom-0 z-20"}
                    style={{  filter: "drop-shadow( 1px 1px 1px rgba(1, 1, 1, .7))"}}
                    initial={{ strokeDasharray: 800, strokeDashoffset: 800}} 
                    transition={{ delay: 2, duration: 10}} 
                    animate={{ strokeDashoffset: 0}} 
                    width="90%" viewBox="-100 0 886 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path initial={{fill: '#0b0b0b'}} transition={{ delay: 6.5, duration: 2}} animate={{fill: "#ffffff"}} d="M314.361 87.532V50.98H361.501H363.001V49.48V45.512V44.012H361.501H314.361V8.868H367.261H368.761V7.368V3.39999V1.89999H367.261H308.509H307.009V3.39999V93V94.5H308.509H369.053H370.553V93V89.032V87.532H369.053H314.361Z" stroke="white" strokeWidth="3"/>
                    <motion.path initial={{fill: '#0b0b0b'}} transition={{ delay: 6.5, duration: 2}} animate={{fill: "#ffffff"}} d="M232.509 93V94.5H234.009H290.841H292.341V93V89.032V87.532H290.841H239.861V3.39999V1.89999H238.361H234.009H232.509V3.39999V93Z" stroke="white" strokeWidth="3"/>
                    <motion.path initial={{fill: '#0b0b0b'}} transition={{ delay: 6.5, duration: 2}} animate={{fill: "#ffffff"}} d="M195.384 93V94.5H196.884H201.236H202.736V93V3.39999V1.89999H201.236H196.884H195.384V3.39999V93Z" stroke="white" strokeWidth="3"/>
                    <motion.path initial={{fill: '#0b0b0b'}} transition={{ delay: 6.5, duration: 2}} animate={{fill: "#ffffff"}} d="M90.9097 92.3699L89.9238 94.5H92.271H97.007H97.9686L98.3701 93.6262L110.023 68.26H161.687L173.34 93.6262L173.741 94.5H174.703H179.439H181.786L180.8 92.3699L139.328 2.76993L138.926 1.89999H137.967H133.743H132.784L132.382 2.76993L90.9097 92.3699ZM158.604 61.548H113.106L135.855 12.0271L158.604 61.548Z" stroke="white" strokeWidth="3"/>
                    <motion.path initial={{fill: '#0b0b0b'}} transition={{ delay: 6.5, duration: 2}} animate={{fill: "#ffffff"}} d="M70.584 1.89999H69.084V3.39999V44.012H9.23597V3.39999V1.89999H7.73597H3.38397H1.88397V3.39999V93V94.5H3.38397H7.73597H9.23597V93V50.98H69.084V93V94.5H70.584H74.936H76.436V93V3.39999V1.89999H74.936H70.584Z" stroke="white" strokeWidth="3"/>
                </motion.svg>
                <motion.svg 
                    className={`h-[10%] mt-5 lg:h-[25%] bottom-[20%] sm:bottom-0 relative z-20`}
                    style={{  filter: "drop-shadow( 1px 1px 1px rgba(1, 1, 1, .7))"}}
                    initial={{ strokeDasharray: 800, strokeDashoffset: 800}} 
                    transition={{ delay: 2, duration: 10}} 
                    animate={{ strokeDashoffset: 0}} 
                    width="90%" viewBox="100 0 886 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path initial={{fill: '#0b0b0b'}} transition={{ delay: 6, duration: 1}} animate={{fill: "#ffffff"}} d="M781.801 93.4847L782.148 94.5H783.221H787.701H788.767L789.118 93.4929L816.761 14.0329L844.525 93.4948L844.876 94.5H845.941H850.293H851.366L851.713 93.4847L882.305 3.88467L882.982 1.89999H880.885H876.533H875.46L875.113 2.9156L848.026 82.3011L820.349 2.90624L819.999 1.89999H818.933H814.709H813.645L813.293 2.90438L785.564 82.1154L758.657 2.91748L758.312 1.89999H757.237H752.629H750.532L751.209 3.88467L781.801 93.4847Z" stroke="white" strokeWidth="3"/>
                    <motion.path initial={{fill: '#0b0b0b'}} transition={{ delay: 6.5, duration: 2}} animate={{fill: "#ffffff"}} d="M685.111 87.532V50.98H732.251H733.751V49.48V45.512V44.012H732.251H685.111V8.868H738.011H739.511V7.368V3.39999V1.89999H738.011H679.259H677.759V3.39999V93V94.5H679.259H739.803H741.303V93V89.032V87.532H739.803H685.111Z" stroke="white" strokeWidth="3"/>
                    <motion.path initial={{fill: '#0b0b0b'}} transition={{ delay: 6.5, duration: 2}} animate={{fill: "#ffffff"}} d="M595.861 59.9732V3.39999V1.89999H594.361H590.009H588.509V3.39999V93V94.5H590.009H594.361H595.861V93V69.9101L615.642 49.5538L654.674 93.9899L655.122 94.5H655.801H661.177H664.483L662.306 92.012L620.672 44.4483L659.438 4.44385L661.903 1.89999H658.361H652.985H652.351L651.91 2.35409L595.861 59.9732Z" stroke="white" strokeWidth="3"/>
                    <motion.path initial={{fill: '#0b0b0b'}} transition={{ delay: 6.5, duration: 2}} animate={{fill: "#ffffff"}} d="M484.035 92.3699L483.049 94.5H485.396H490.132H491.094L491.495 93.6262L503.148 68.26H554.812L566.465 93.6262L566.866 94.5H567.828H572.564H574.911L573.925 92.3699L532.453 2.76993L532.051 1.89999H531.092H526.868H525.909L525.507 2.76993L484.035 92.3699ZM551.729 61.548H506.231L528.98 12.0271L551.729 61.548Z" stroke="white" strokeWidth="3"/>
                    <motion.path initial={{fill: '#0b0b0b'}} transition={{ delay: 6.5, duration: 2}} animate={{fill: "#ffffff"}} d="M424.884 93V94.5H426.384H483.216H484.716V93V89.032V87.532H483.216H432.236V3.39999V1.89999H430.736H426.384H424.884V3.39999V93Z" stroke="white" strokeWidth="3"/>
                </motion.svg>
            </>}
        </motion.section>

    )
}