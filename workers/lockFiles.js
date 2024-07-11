import { execFileSync } from "child_process"

export const lockFileAbsolutePaths = {
	mediaPlaying: "/home/tobecci/.cache/tobecci/keepalive/media_playing.lck",
	pacmanRunning: "/home/tobecci/.cache/tobecci/keepalive/pacman_running.lck",
	manualPresentationActive: "/home/tobecci/.cache/tobecci/keepalive/presentation.lck",
}

const keyMap = {
	'media': lockFileAbsolutePaths.mediaPlaying,
	'pacman': lockFileAbsolutePaths.pacmanRunning
}

export function createLockFile(key) {
	const file = keyMap[key]
	execFileSync(`touch ${file}`, { shell: '/bin/sh', stdio: 'ignore' })
}

export function removeLockFile(key) {
	const file = keyMap[key]

	try {
		execFileSync(`ls ${file}`, { shell: '/bin/sh', stdio: 'ignore' })
		execFileSync(`rm ${file}`, { shell: '/bin/sh', stdio: 'ignore' })
	} catch (error) {
		return false
	}
}

export function noKeepAliveReasonExists(){
	let result = execFileSync(`ls /home/tobecci/.cache/tobecci/keepalive`, { shell: '/bin/sh', encoding: "utf-8" }).trim()
	if(result === '') return true
	return false;
	
}