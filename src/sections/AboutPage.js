import { mono, display, body } from '@/components/vault'
import { Lane, Reveal } from '@/components/vault/Lane'

const MANIFESTO = [
  ['Creativity meets logic', 'Software engineering is where both live at once.'],
  ['Beautiful + functional', 'Make it work, and make it worth looking at.'],
  ['More than a solution', 'Problem-solving is about the path, not just the answer.'],
  ['More than new', 'Innovation is more than making something that didn\u2019t exist.'],
  ['Process = product', 'How you get there matters as much as what you ship.'],
  ['Never done learning', 'Learning is a journey that doesn\u2019t end.'],
].map(([title, text], i) => ({ n: '0' + (i + 1), title, text }))

function Rows({ items }) {
  return (
    <div style={{ borderTop: '1.5px solid #3A3A3A' }}>
      {items.map(m => (
        <div key={m.n} className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3 py-[2.4vh]" style={{ borderBottom: '1.5px solid #3A3A3A' }}>
          <span style={{ ...mono(11), color: '#8A8A8A' }}>{m.n}</span>
          <div className="flex flex-col gap-2">
            <span style={{ ...display(24), color: '#EDE6DA' }}>{m.title}</span>
            <span style={{ ...body(14), color: '#BDB5A8' }}>{m.text}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

// Height kept at the original 70vh (min) so scroll beats are unchanged.
export default function AboutPage() {
  return (
    <section id="manifesto" className="min-h-[70vh] w-screen border-t border-[#262626] py-[8vh] flex flex-col justify-center gap-[6vh]">
      <Lane left={
        <div className="flex flex-col gap-4">
          <div style={{ ...mono(11), color: '#8A8A8A' }}>01 · Manifesto</div>
          <div style={{ ...display(40, '125%', { lineHeight: .9 }), color: '#EDE6DA' }}>Why I build</div>
        </div>
      } />
      <Lane
        left={<Reveal><Rows items={MANIFESTO.slice(0, 3)} /></Reveal>}
        right={<Reveal><Rows items={MANIFESTO.slice(3)} /></Reveal>}
      />
      <Lane
        left={
          <Reveal className="flex flex-col gap-2.5 justify-end h-full">
            <div style={{ ...body(16), color: '#BDB5A8' }}>What if coding was more than a job?</div>
            <div style={{ ...display(44, '125%', { lineHeight: .9 }), color: '#EDE6DA' }}>What if it was...</div>
          </Reveal>
        }
        right={
          <Reveal className="flex items-end h-full">
            <div style={{ ...display(56, '125%', { lineHeight: .85, letterSpacing: '-.04em' }), color: '#E3A15F' }}>Passion?</div>
          </Reveal>
        }
      />
    </section>
  )
}
