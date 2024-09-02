#!/usr/bin/env /home/tobecci/.nvm/versions/node/v18.20.4/bin/node

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
	notifyOnDesktopChange: resolve(currentDirectory, 'notifyOnDesktopChange.js'),
}

function startOperationalLoop() {
	console.log('started operational loop')
	try {
		if (isMainThread) {
			new Worker(workerPaths.ensureDesktopAppearance)
			new Worker(workerPaths.lockPhobia)
			new Worker(workerPaths.mediaPlayingKeepAlive)
			new Worker(workerPaths.pacmanRunningKeepAlive)
			new Worker(workerPaths.ensureManualPresentationActive)
			new Worker(workerPaths.notifyOnDesktopChange)
		} else {
			return;
		}
	} catch (error) {
		console.log(error)
		sendNotification('error in start Operational Loop')
	}
}

startOperationalLoop()