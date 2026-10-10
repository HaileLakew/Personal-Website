'use client'
import { useState } from 'react'

// px → rem so everything scales with the root font-size (see globals.css)
export const r = n => n / 16 + 'rem'

export const TONES = {
  brass: { bg: 'var(--vault-brass)', fg: 'var(--vault-ink)', muted: 'var(--vault-ink)', rule: 'var(--vault-ink)' },
  sage: { bg: 'var(--vault-sage)', fg: 'var(--vault-ink)', muted: 'var(--vault-ink)', rule: 'var(--vault-ink)' },
  steel: { bg: 'var(--vault-steel)', fg: 'var(--vault-ink)', muted: 'var(--vault-ink)', rule: 'var(--vault-ink)' },
  ink: { bg: '#151515', fg: '#EDE6DA', muted: '#8A8A8A', rule: '#262626', border: '1px solid #262626' },
}
export const mono = (size = 10, extra) => ({ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: r(size), letterSpacing: '.5px', textTransform: 'uppercase', ...extra })
export const display = (size = 26, stretch = '112%', extra) => ({ fontFamily: 'var(--font-display)', fontWeight: 900, fontStretch: stretch, fontSize: r(size), lineHeight: .95, letterSpacing: '-.03em', textTransform: 'uppercase', ...extra })
export const body = (size = 15, extra) => ({ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: r(size), lineHeight: 1.45, ...extra })

export function Card({ tone = 'brass', label, meta, title, titleSize = 26, children, footer, footerRight, style, onClick }) {
  const t = TONES[tone] || TONES.brass
  return (
    <div onClick={onClick} style={{ background: t.bg, color: t.fg, border: t.border, borderRadius: r(22), padding: r(16) + ' ' + r(18), boxSizing: 'border-box', cursor: onClick ? 'pointer' : undefined, display: 'flex', flexDirection: 'column', height: '100%', ...style }}>
      {(label || meta) && <div style={{ display: 'flex', justifyContent: 'space-between', gap: r(8), ...mono(10), color: t.muted }}><span>{label}</span><span>{meta}</span></div>}
      {title && <div style={{ ...display(titleSize), marginTop: label || meta ? r(10) : 0 }}>{title}</div>}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</div>
      {(footer || footerRight) && <div style={{ marginTop: r(12), paddingTop: r(8), borderTop: '1.5px solid ' + t.rule, display: 'flex', justifyContent: 'space-between', gap: r(8), ...mono(10) }}><span>{footer}</span><span>{footerRight}</span></div>}
    </div>
  )
}

const BTN = {
  primary: { background: 'var(--vault-brass)', color: 'var(--vault-ink)', border: 'none' },
  ink: { background: 'var(--vault-ink)', color: 'var(--vault-bone)', border: 'none' },
  outline: { background: 'transparent', color: 'currentColor', border: '1.5px solid currentColor' },
}
export function Button({ variant = 'primary', size = 'md', fullWidth, href, children, style }) {
  const [p, setP] = useState(false)
  const base = size === 'sm'
    ? { padding: r(8) + ' ' + r(14), borderRadius: r(16), ...mono(11) }
    : { height: r(54), padding: '0 ' + r(24), borderRadius: r(27), ...display(15, '112%', { lineHeight: 1, letterSpacing: 0 }) }
  return (
    <a href={href} target={href && href.startsWith('/') ? '_blank' : undefined} rel="noreferrer"
      onPointerDown={() => setP(true)} onPointerUp={() => setP(false)} onPointerLeave={() => setP(false)}
      style={{ ...BTN[variant], ...base, display: fullWidth ? 'flex' : 'inline-flex', width: fullWidth ? '100%' : undefined, alignItems: 'center', justifyContent: 'center', gap: r(8), boxSizing: 'border-box', textDecoration: 'none', transform: p ? 'scale(.98)' : 'none', transition: 'transform .12s cubic-bezier(.2,0,0,1)', ...style }}>
      {children}
    </a>
  )
}

export function Wordmark({ text, size = 26, color = 'currentColor', dot = true }) {
  const d = Math.max(6, Math.round(size * .28))
  return (
    <span style={{ display: 'inline-flex', alignItems: 'flex-start', gap: r(Math.round(size * .12)), color }}>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontStretch: '125%', fontSize: r(size), lineHeight: .85, letterSpacing: '-.03em', textTransform: 'uppercase' }}>{text}</span>
      {dot && <span style={{ width: r(d), height: r(d), borderRadius: r(d / 2), background: 'var(--vault-terracotta)', flex: 'none' }} />}
    </span>
  )
}

const CDN = { feather: n => 'https://unpkg.com/feather-icons@4.29.2/dist/icons/' + n + '.svg', mdi: n => 'https://unpkg.com/@mdi/svg@7.4.47/svg/' + n + '.svg' }
export function Icon({ name, set = 'feather', size = 20, color = 'currentColor' }) {
  const m = 'url(' + CDN[set](name) + ') center/contain no-repeat'
  return <span aria-hidden="true" style={{ display: 'inline-block', flex: 'none', width: r(size), height: r(size), background: color, WebkitMask: m, mask: m }} />
}

export function GaugeGroup({ items = [], height = 64, color = 'currentColor', fill = 'var(--vault-terracotta)' }) {
  return (
    <div style={{ display: 'flex', gap: r(6), padding: r(6), border: '1.5px solid ' + color, color, width: '100%', boxSizing: 'border-box' }}>
      {items.map((it, i) => (
        <div key={it.letter || i} style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: r(4) }}>
          <div style={{ width: '100%', height: typeof height === 'number' ? r(height) : height, border: '1.5px solid ' + color, boxSizing: 'border-box', display: 'flex', alignItems: 'flex-end' }}>
            <div style={{ width: '100%', height: Math.max(0, Math.min(1, it.value)) * 100 + '%', background: fill, transition: 'height .5s cubic-bezier(.2,0,0,1)' }} />
          </div>
          <span style={mono(9, { letterSpacing: 0 })}>{it.letter}</span>
        </div>
      ))}
    </div>
  )
}

// Ticket stack: first item in full, the rest peek 16px below (bottom corners rounded only).
export function TicketStack({ items = [], href }) {
  const [top, ...rest] = items
  if (!top) return null
  const t = TONES[top.tone] || TONES.brass
  const head = (
    <div style={{ position: 'relative', zIndex: items.length + 1, background: t.bg, color: t.fg, borderRadius: r(22), padding: r(18) + ' ' + r(20), boxShadow: '0 14px 24px -12px rgba(0,0,0,.7)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, ...mono(10) }}><span>{top.label}</span><span>{top.meta}</span></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: r(12), marginTop: r(14), marginBottom: r(18) }}>
        <div style={display(top.titleSize || 40, '125%', { lineHeight: .88 })}>{top.title}</div>
        {top.arrow && <Icon name="arrow-top-right-thick" set="mdi" size={top.arrowSize || 56} color="var(--vault-ink)" />}
      </div>
      <div style={{ paddingTop: r(8), borderTop: '1.5px solid ' + t.rule, display: 'flex', justifyContent: 'space-between', gap: 8, ...mono(10) }}><span>{top.footer}</span><span>{top.footerRight}</span></div>
    </div>
  )
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {href ? <a href={href} target="_blank" rel="noreferrer" className="pointer-events-auto" style={{ color: 'inherit', display: 'block', position: 'relative', zIndex: items.length + 1 }}>{head}</a> : head}
      {rest.map((it, i) => (
        <div key={i} style={{ position: 'relative', zIndex: items.length - i, marginTop: r(-22), paddingTop: r(34), paddingBottom: r(12), paddingLeft: r(20), paddingRight: r(20), background: (TONES[it.tone] || {}).bg || it.tone, color: '#151515', borderRadius: '0 0 ' + r(22) + ' ' + r(22), display: 'flex', justifyContent: 'space-between', gap: 8, ...mono(11) }}>
          <span>{it.label}</span><span>{it.meta}</span>
        </div>
      ))}
    </div>
  )
}