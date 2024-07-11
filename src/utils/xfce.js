import { execFileSync } from "child_process"
import { sendNotification } from "./alerts.js"

const checkPresentationModeStatus = `/usr/bin/xfconf-query -c xfce4-power-manager -p /xfce4-power-manager/presentation-mode`
const enablePresentationCommand = `/usr/bin/xfconf-query -c xfce4-power-manager -p /xfce4-power-manager/presentation-mode -s true`
const disablePresentationCommand = `/usr/bin/xfconf-query -c xfce4-power-manager -p /xfce4-power-manager/presentation-mode -s false`


export function enablePresentationMode(reason = '') {
	if (getPresentationModeStatus() === false) {
		if (reason == '') {
			execFileSync(enablePresentationCommand, { shell: '/bin/sh', stdio: 'ignore' })

		} else {
			execFileSync(enablePresentationCommand, { shell: '/bin/sh', stdio: 'ignore' })
			sendNotification(`✅ presentation mode turned on (reason: ${reason}) ✅`);
		}
	}
}

export function disablePresentationMode(reason = '') {
	if (getPresentationModeStatus() === true) {
		execFileSync(disablePresentationCommand, { shell: '/bin/sh', stdio: 'ignore' })
		sendNotification(`❌ presentation mode turned off (reason: ${reason}) ❌`);
	}
}

function getPresentationModeStatus() {
	let result = execFileSync(checkPresentationModeStatus, { shell: '/bin/sh', encoding: "utf-8" }).trim()
	if (result == 'true') {
		return true;
	} else {
		return false;
	}
}


