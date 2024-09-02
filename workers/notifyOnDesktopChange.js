import { execFileSync } from 'child_process';
import { sendNotification } from '../src/utils/alerts.js'


let previousDesktop = false;
let currentDesktop = execFileSync('/usr/bin/xdotool get_desktop', { shell: '/bin/sh', encoding: "utf8" }).trim();

const timeIntervalInMilliseconds = 200;

async function sendCurrentDesktopNotification(desktopNumber) {
	console.log({ desktopNumber })
	//increment the desktop numbers, being zero indexed
	const reconciledDesktopIndex = parseInt(desktopNumber) + 1
	const notificationExpiryTimeInMilliseconds = 700;

	sendNotification(`current desktop: ${reconciledDesktopIndex}`, notificationExpiryTimeInMilliseconds)
}

async function watchForDesktopChange() {
	try {
		currentDesktop = execFileSync('/usr/bin/xdotool get_desktop', { shell: '/bin/sh', encoding: "utf8" }).trim();

		if (currentDesktop !== previousDesktop) {
			try {
				//set previous desktop to current desktop
				previousDesktop = currentDesktop

				//send notif
				sendCurrentDesktopNotification(currentDesktop)
			} catch (error) {
				console.log(error)
				console.log('error occured while sending desktop notif')
			}
		}
	} catch (error) {
		console.log(error)
		sendNotification('error occured in desktop change watcher')
	}
}

setInterval(watchForDesktopChange, timeIntervalInMilliseconds)