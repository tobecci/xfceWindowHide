import path from 'path'
import { fileURLToPath } from 'url'
const currentDirectory = path.dirname(fileURLToPath(import.meta.url))

import { isMainThread, Worker } from 'worker_threads'

const workerPaths = {
	ensureDesktopAppearance: path.resolve(currentDirectory, 'ensurePanelAppearance.js'),
	localizer: path.resolve(currentDirectory, 'localizer.js')
}

function startOperationalLoop() {
	if (isMainThread) {
		new Worker(workerPaths.ensureDesktopAppearance)
		new Worker(workerPaths.localizer)
	} else {
		console.log('do nothing')
		return;
	}
}

startOperationalLoop()