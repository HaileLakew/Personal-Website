import { isMobile } from 'react-device-detect'

let cached

// Cheap hardware guess shared by the particles and the post-processing. Browser only, cached.
export function getGpuProfile() {
    if (cached) return cached

    const cores = navigator.hardwareConcurrency || 4
    const memory = navigator.deviceMemory || 4
    let tier = cores >= 8 && memory >= 8 ? 3 : cores >= 4 ? 2 : 1
    let software = false
    let intel = false

    try {
        const gl = document.createElement('canvas').getContext('webgl2')
        const info = gl?.getExtension('WEBGL_debug_renderer_info')
        const renderer = info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : ''
        software = /swiftshader|llvmpipe|software|microsoft basic/i.test(renderer)
        intel = /intel/i.test(renderer)
        if (intel) tier = Math.min(tier, 1)
        gl?.getExtension('WEBGL_lose_context')?.loseContext()
    } catch (e) {}

    cached = { tier, software, intel, lowEnd: isMobile || software || intel || tier === 1 }
    return cached
}
