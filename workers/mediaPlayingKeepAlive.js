import { execFileSync } from "child_process"
import { sendNotification } from "../src/utils/alerts.js"

let isPresentationModeOn = false;
const checkPresentationModeStatus = `/usr/bin/xfconf-query -c xfce4-power-manager -p /xfce4-power-manager/presentation-mode`
const enablePresentationCommand = `/usr/bin/xfconf-query -c xfce4-power-manager -p /xfce4-power-manager/presentation-mode -s true`
const disablePresentationCommand = `/usr/bin/xfconf-query -c xfce4-power-manager -p /xfce4-power-manager/presentation-mode -s false`


function enablePresentationMode(){
	execFileSync(enablePresentationCommand, { shell: '/bin/sh', stdio: 'ignore' })
      sendNotification('✅ media playing, presentation mode turned on ✅');
	isPresentationModeOn = true;
}

function disablePresentationMode(){
	execFileSync(disablePresentationCommand, { shell: '/bin/sh', stdio: 'ignore' })
      sendNotification('❌ media stopped playing, presentation mode turned off ❌');
	isPresentationModeOn = false;
}

function updatePresentationModeStatus() {
	let result = execFileSync(checkPresentationModeStatus, { shell: '/bin/sh', encoding: "utf-8" }).trim()
	if (result == 'true') {
		isPresentationModeOn = true;
		return;
	} else {
		isPresentationModeOn = false
		return
	}
}

function checkIfMediaPlaying() {
	updatePresentationModeStatus();
	try {
		let command = `/usr/bin/pactl list sink-inputs`

		let result = execFileSync(command, { shell: '/bin/sh', encoding: "utf-8" }).trim()

		if (result) {
			if(!isPresentationModeOn){
                   enablePresentationMode()
			}
		} else {
			if(isPresentationModeOn){
				disablePresentationMode()
			}
		}

	} catch (error) {
		console.log(error)
		sendNotification('error occurred in media playingChecker')
	}
}

setInterval(checkIfMediaPlaying, 5000);

