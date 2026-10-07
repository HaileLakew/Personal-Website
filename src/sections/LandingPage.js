import { useProgress } from '@react-three/drei';
import { motion } from 'framer-motion'
import { Wordmark, mono, display, r } from '@/components/vault'
import { Lane } from '@/components/vault/Lane'

const navStyle = { ...mono(11), color: '#BDB5A8' }

export default function LandingPage() {
  const { progress } = useProgress()

  return (
    <section className="relative h-screen w-screen flex flex-col overflow-hidden">
      <header className="relative z-20 border-b border-[#262626]">
        <div className="mx-auto max-w-[110rem] grid grid-cols-[1fr_auto_1fr] md:grid-cols-[minmax(0,1fr)_clamp(18rem,28vw,40rem)_minmax(0,1fr)] items-center px-5 md:px-[4vw] py-[1.375rem]">
          <nav className="flex gap-5">
            <a href="#manifesto" style={navStyle} className="hidden sm:inline">01 Manifesto</a>
            <a href="#skills" style={navStyle}>03 Skills</a>
          </nav>
          <div className="flex justify-center"><Wordmark text="HL" size={22} color="#EDE6DA" /></div>
          <nav className="flex gap-5 justify-end">
            <a href="#abilities" style={navStyle} className="hidden sm:inline">04 Abilities</a>
            <a href="#connect" style={navStyle}>05 Connect</a>
          </nav>
        </div>
      </header>

      {progress === 100 && (
        <motion.div className="relative z-20 flex-1 flex flex-col justify-end pb-[6vh]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1, ease: [.2, 0, 0, 1] }}>
          <Lane
            left={
              <div className="flex flex-col gap-4">
                <div style={{ ...mono(12), color: '#E3A15F', paddingBottom: r(10), borderBottom: '1.5px solid #3A3A3A' }}>Senior software engineer</div>
                <div style={display(80, '125%', { lineHeight: .85, letterSpacing: '-.04em', color: '#EDE6DA' })} className="!text-[3.5rem] md:!text-[6.5rem]">Haile</div>
                <div style={{ borderTop: '2px dashed #3A3A3A' }} />
              </div>
            }
            right={
              <div className="flex flex-col gap-4 md:text-right">
                <div style={{ ...mono(12), color: '#E3A15F', paddingBottom: r(10), borderBottom: '1.5px solid #3A3A3A' }}>B.S. Computer Science</div>
                <div className="flex md:justify-end items-end gap-2.5">
                  <div style={display(80, '125%', { lineHeight: .85, letterSpacing: '-.04em', color: '#EDE6DA' })} className="!text-[3.5rem] md:!text-[6.5rem]">Lakew</div>
                  <span style={{ width: r(18), height: r(18), borderRadius: r(9), background: '#B4533F', flex: 'none', marginBottom: r(8) }} />
                </div>
                <div style={{ borderTop: '2px dashed #3A3A3A' }} />
              </div>
            }
          />
        </motion.div>
      )}
    </section>
  )
}
