import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { sendNotification } from '../src/utils/alerts.js'
const currentDirectory = dirname(fileURLToPath(import.meta.url))

import { isMainThread, Worker } from 'worker_threads'

const workerPaths = {
	ensureDesktopAppearance: resolve(currentDirectory, 'ensurePanelAppearance.js'),
	// localizer: path.resolve(currentDirectory, 'localizer.js'),
	lockPhobia: resolve(currentDirectory, 'checkLockKeyState.js'),
	mediaPlayingKeepAlive: resolve(currentDirectory, 'mediaPlayingKeepAlive.js'),
	pacmanRunningKeepAlive: resolve(currentDirectory, 'pacmanRunningKeepAlive.js'),
	ensureManualPresentationActive: resolve(currentDirectory, 'ensureManualPresentationActive.js'),
}

function startOperationalLoop() {
	try {
		if (isMainThread) {
			new Worker(workerPaths.ensureDesktopAppearance)
			new Worker(workerPaths.lockPhobia)
			// new Worker(workerPaths.mediaPlayingKeepAlive)
			// new Worker(workerPaths.pacmanRunningKeepAlive)
			// new Worker(workerPaths.ensureManualPresentationActive)
		} else {
			return;
		}
	} catch (error) {
		console.log(error)
		sendNotification('error in start Operational Loop')
	}
}

startOperationalLoop()