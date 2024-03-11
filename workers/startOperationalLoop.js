import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { sendNotification } from '../src/utils/alerts.js'
const currentDirectory = dirname(fileURLToPath(import.meta.url))

import { isMainThread, Worker } from 'worker_threads'

const workerPaths = {
	ensureDesktopAppearance: resolve(currentDirectory, 'ensurePanelAppearance.js'),
	// localizer: path.resolve(currentDirectory, 'localizer.js'),
	lockPhobia: resolve(currentDirectory, 'checkLockKeyState.js'),
	mediaPlayingKeepAlive: resolve(currentDirectory, 'mediaPlayingKeepAlive.js')
}

function startOperationalLoop() {
	try {
		if (isMainThread) {
			new Worker(workerPaths.ensureDesktopAppearance, { resourceLimits: { maxOldGenerationSizeMb: 5 }})
			new Worker(workerPaths.lockPhobia,  { resourceLimits: { maxOldGenerationSizeMb: 5 }})
			new Worker(workerPaths.mediaPlayingKeepAlive,  { resourceLimits: { maxOldGenerationSizeMb: 5 }})
		} else {
			return;
		}
	} catch (error) {
		console.log(error)
		sendNotification('error in start Operational Loop')
	}
}

startOperationalLoop()