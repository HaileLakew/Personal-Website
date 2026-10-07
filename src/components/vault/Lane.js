'use client'
import { motion } from 'framer-motion'

// Two columns around a clear centre lane so the 3D character (fixed canvas) is never covered.
// Below md the columns stack.
export function Lane({ left, right, className = '', style }) {
  return (
    <div className={'mx-auto w-full max-w-[110rem] grid grid-cols-1 gap-y-8 md:grid-cols-[minmax(0,1fr)_clamp(18rem,28vw,40rem)_minmax(0,1fr)] px-5 md:px-[4vw] ' + className} style={style}>
      <div className="md:pr-5 min-w-0">{left}</div>
      <div className="hidden md:block" />
      <div className="md:pl-5 min-w-0">{right}</div>
    </div>
  )
}

export function Reveal({ children, className, style, delay = 0 }) {
  return (
    <motion.div className={className} style={style}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: .15 }}
      transition={{ duration: .6, ease: [.2, 0, 0, 1], delay }}>
      {children}
    </motion.div>
  )
}
