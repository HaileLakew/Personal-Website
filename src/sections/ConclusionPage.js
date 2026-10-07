import { Wordmark, Button, Icon, mono, display } from '@/components/vault'
import { Lane, Reveal } from '@/components/vault/Lane'

// TODO: fill in your LinkedIn URL and email.
const LINKS = [
  { label: 'GitHub', value: '@HaileLakew', href: 'https://github.com/HaileLakew' },
  { label: 'LinkedIn', value: 'Haile Lakew', href: 'https://www.linkedin.com/' },
  { label: 'Email', value: 'Say hello', href: 'mailto:hello@hailelakew.com' },
]

export default function ConclusionPage() {
  return (
    <section id="connect" className="relative h-screen w-screen flex flex-col justify-end border-t border-[#262626] pointer-events-auto overflow-hidden">
      <video
        src="/assets/Connect.mp4"
        autoPlay muted loop playsInline
        className="absolute inset-0 h-full w-full object-cover z-0"
      />
      <div className="absolute inset-x-0 bottom-0 h-[55%] z-0 bg-gradient-to-t from-[#0E0E0E] to-transparent" />

      <Lane className="relative z-10 items-end pb-14"
        left={
          <Reveal className="flex flex-col gap-6">
            <div style={{ ...mono(11), color: '#BDB5A8' }}>05 · Connect</div>
            <div className="flex flex-col gap-1">
              <div style={{ ...display(54, '125%', { lineHeight: .85, letterSpacing: '-.04em' }), color: '#EDE6DA' }}>Let&apos;s</div>
              <Wordmark text="Connect" size={54} color="var(--vault-brass)" />
            </div>
            <Button variant="primary" fullWidth href="/docs/HailemeskelLakew-Resume.pdf">Open résumé ↗</Button>
          </Reveal>
        }
        right={
          <Reveal style={{ background: '#151515', border: '1px solid #262626', borderRadius: 22, padding: '4px 20px' }}>
            {LINKS.map((l, i) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="grid grid-cols-[5rem_minmax(0,1fr)_auto] gap-3 items-center py-[1.125rem]" style={{ borderBottom: i < LINKS.length - 1 ? '1.5px solid #3A3A3A' : 'none', color: '#EDE6DA' }}>
                <span style={{ ...mono(10), color: '#8A8A8A' }}>{l.label}</span>
                <span style={display(20)}>{l.value}</span>
                <Icon name="arrow-up-right" size={20} color="var(--vault-brass)" />
              </a>
            ))}
          </Reveal>
        }
      />
      <footer className="relative z-10 border-t border-[#262626] bg-[#0E0E0E]">
        <div className="mx-auto max-w-[110rem] flex justify-between px-5 md:px-[4vw] py-[1.375rem]" style={{ ...mono(10), color: '#8A8A8A' }}>
          <span>Haile Lakew · Senior software engineer</span><span>© 2026</span>
        </div>
      </footer>
    </section>
  )
}