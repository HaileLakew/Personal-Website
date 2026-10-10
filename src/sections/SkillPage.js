import { useState } from 'react'
import { useTransform, useScroll, motion } from "framer-motion";
import { Card, GaugeGroup, Icon, TicketStack, mono, display, body, r } from '@/components/vault'
import { Lane } from '@/components/vault/Lane'

const SKILLS = [
  ['JavaScript / Node', 4.5], ['React', 3.5], ['Webpack / Bundling', 3], ['CI / CD', 4.5],
  ['Bash / Python', 3.5], ['Tailwind / Framer / CSS', 3], ['Three.js / WebGL / R3F', 3],
].map(([name, level], i) => ({ name, level, letter: 'ABCDEFG'[i] }))

const ABILITIES = [
  ['Bash & Python', 'Auto', 'Automation', 'steel', 'Scripts that take repetitive work off my teams.'],
  ['Frontend', 'React', 'JavaScript · React', 'brass', 'Web apps and sites in React, including this one.'],
  ['Node scripting', 'Node', 'Node · Webpack', 'sage', 'Custom build scripts with fine-tuned optimizations.'],
  ['CI / CD', 'Actions', 'GitHub Actions', 'steel', 'Custom actions that ship projects automatically.'],
  ['Chrome plugins', 'Plugin', 'Productivity', 'brass', 'A plugin that highlights and saves key info on a page.'],
  ['Three.js', 'WebGL', 'WebGL · R3F', 'sage', 'Interactive 3D sites with Three-Fiber and shaders.'],
  ['Blender 3D', '3D', 'Modeling', 'steel', 'Models and animations, including the character here.'],
].map(([title, short, tag, tone, text], i) => ({ title, short, tag, tone, text, num: '#0' + (i + 1) }))

const label = (l, r) => (
  <div className="flex justify-between" style={{ ...mono(11), color: '#8A8A8A' }}><span>{l}</span><span>{r}</span></div>
)

function AbilityCard({ a }) {
  return (
    <Card tone={a.tone} label={a.num} meta={a.short} title={a.title} titleSize={20} footer={a.tag} style={{ minHeight: '30vh' }}>
      <div style={{ ...body(14, { lineHeight: 1.4 }), color: '#151515', marginTop: r(12) }}>{a.text}</div>
    </Card>
  )
}

// Block heights (150vh / 100vh / 100vh) and opacity keyframes are unchanged from the original.
export default function SkillPage() {
  const { scrollYProgress } = useScroll()
  const [filled, setFilled] = useState(false)

  const html01Opacity = useTransform(scrollYProgress, [.42, .48, .52, .54], [0, 1, 1, 0])
  const html02Opacity = useTransform(scrollYProgress, [.56, .57, .65, .75], [0, 1, 1, 0])
  const html03Opacity = useTransform(scrollYProgress, [.78, .82, .87, .9], [0, 1, 1, 0])

  return (
    <section className="relative z-[2] w-screen overflow-visible">
      {/* 02 · Profile — torn ticket split across the lane */}
      <motion.div className="h-[150vh] w-screen" style={{ opacity: html01Opacity }}>
        <div className="sticky top-0 h-screen flex flex-col py-[8vh] gap-4">
          <Lane left={label('02 · Profile', '')} right={<div className="hidden md:block">{label('', 'Résumé · PDF')}</div>} />
          <Lane className="flex-1 min-h-0 grid-rows-[auto_1fr] md:grid-rows-1"
            left={
              <div className="h-full flex flex-col justify-start items-start">
              <div className="w-[78%] md:w-full">
              <TicketStack items={[
                { tone: 'brass', label: 'Name', meta: '#01', title: 'Haile Lakew', titleSize: 48, footer: '', footerRight: '' },
                { tone: 'sage', label: '#02 Senior software engineer', meta: 'Role' },
                { tone: 'var(--vault-terracotta)', label: '#03 B.S. Computer Science', meta: 'Degree' },
              ]} />
              </div>
              </div>
            }
            right={
              <div className="h-full flex flex-col justify-end items-end">
              <div className="w-[78%] md:w-full">
              <TicketStack href="/docs/HailemeskelLakew-Resume.pdf" items={[
                { tone: 'steel', label: 'Role', meta: 'Admit one', title: 'Sr. Eng', titleSize: 48, arrow: true, footer: '', footerRight: '' },
                { tone: 'brass', label: '#04 Résumé · PDF', meta: '↗' },
                { tone: 'sage', label: '#05 Let\u2019s connect', meta: '↓' },
              ]} />
              </div>
              </div>
            }
          />
        </div>
      </motion.div>

      {/* 03 · Skills */}
      <motion.div id="skills" className="h-screen w-screen" style={{ opacity: html02Opacity }}>
        <div className="sticky top-0 h-screen flex flex-col justify-center">
          <Lane
            left={
              <div className="h-full flex flex-col" style={{ borderTop: '1.5px solid #3A3A3A' }}>
                {SKILLS.map(s => (
                  <div key={s.letter} className="flex-1 grid grid-cols-[1.375rem_minmax(0,1fr)_auto] gap-3 items-center py-3" style={{ borderBottom: '1.5px solid #3A3A3A' }}>
                    <span style={{ ...mono(10), color: '#8A8A8A' }}>{s.letter}</span>
                    <span style={{ ...mono(12), color: '#EDE6DA' }}>{s.name}</span>
                    <span style={{ ...display(22, '125%', { lineHeight: .85 }), color: '#EDE6DA' }}>{s.level}</span>
                  </div>
                ))}
              </div>
            }
            right={
              <motion.div onViewportEnter={() => setFilled(true)} viewport={{ once: true, amount: .3 }} className="h-full">
                <Card tone="steel" label="03 · Skills" meta="Out of 5" footer="Self-rated" footerRight="7 tracked">
                  <div className="flex-1 flex justify-center items-end mt-4">
                    <GaugeGroup items={SKILLS.map(s => ({ letter: s.letter, value: filled ? s.level / 5 : 0 }))} height="16vh" color="var(--vault-ink)" />
                  </div>
                </Card>
              </motion.div>
            }
          />
        </div>
      </motion.div>

      {/* 04 · Abilities */}
      <motion.div id="abilities" className="h-screen w-screen" style={{ opacity: html03Opacity }}>
        <div className="sticky top-0 h-screen flex flex-col justify-center gap-6">
          <Lane left={label('04 · Abilities', '')} right={<div className="hidden md:block">{label('', '7 areas')}</div>} />
          <Lane
            left={
              <div className="grid grid-cols-2 gap-3">
                {ABILITIES.slice(0, 4).map(a => <AbilityCard key={a.num} a={a} />)}
              </div>
            }
            right={
              <div className="grid grid-cols-2 gap-3">
                {ABILITIES.slice(4).map(a => <AbilityCard key={a.num} a={a} />)}
                <a href="#connect" className="pointer-events-auto flex flex-col justify-between gap-6" style={{ background: '#151515', border: '1px solid #262626', borderRadius: r(22), padding: r(16) + ' ' + r(18), color: '#EDE6DA' }}>
                  <span style={{ ...mono(10), color: '#8A8A8A' }}>Next</span>
                  <div className="flex justify-between items-end">
                    <span style={display(18)}>Work<br />together</span>
                    <Icon name="arrow-top-right-thick" set="mdi" size={46} color="var(--vault-brass)" />
                  </div>
                </a>
              </div>
            }
          />
        </div>
      </motion.div>
    </section>
  );
}
