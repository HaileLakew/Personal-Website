import { DefaultLoadingManager } from 'three'
import { setLoading } from './loadingStore'

// Import this before anything that starts loading assets (Models) so no event is missed.
DefaultLoadingManager.onProgress = (url, loaded, total) => setLoading({ progress: total ? Math.min(99, (loaded / total) * 100) : 0 })
DefaultLoadingManager.onLoad = () => setLoading({ progress: 100, done: true })
