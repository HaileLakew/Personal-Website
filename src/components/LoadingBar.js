'use client'
import { useLoading } from './loadingStore'
import { mono } from '@/components/vault'

export default function LoadingBar() {
  const { progress, done } = useLoading()

  return (
    <div aria-hidden={done} className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-[#0E0E0E] pointer-events-none"
      style={{ opacity: done ? 0 : 1, visibility: done ? 'hidden' : 'visible', transition: 'opacity .6s ease, visibility 0s linear .6s' }}>
      <div style={{ ...mono(11), color: '#BDB5A8' }}>Loading {Math.round(progress)}%</div>
      <div className="h-[2px] w-[min(60vw,16rem)] bg-[#262626] overflow-hidden">
        <div className="h-full bg-[#E3A15F]" style={{ width: progress + '%', transition: 'width .3s ease' }} />
      </div>
    </div>
  )
}
