import { execFileSync } from "child_process"
import { sendNotification } from '../src/utils/alerts.js'
let lockKeyIsActive = false;
let redShiftIsOn = false;
let message = ""
const notificationName = "Lock Key Phobia"
const notificationId = 7069
const notificationTimeInMilliseconds=500

const enableRedshift = '/usr/bin/redshift -O 1500 -P > /dev/null 2>&1'
const disableRedShift = '/usr/bin/redshift -x > /dev/null 2>&1'

function performGeneralOperations() {
	try {
		if (lockKeyIsActive) {
			const commandToSendNotification = `/usr/bin/notify-send "${notificationName}" "${message}" --replace-id ${notificationId} -t ${notificationTimeInMilliseconds}`
			const commandToRun = `${enableRedshift}; ${commandToSendNotification}`;
			execFileSync(commandToRun, { shell: '/bin/sh', stdio: 'ignore' })
			redShiftIsOn = true;
		}
	
		if (!lockKeyIsActive && redShiftIsOn) {
			execFileSync(disableRedShift, { shell: '/bin/sh', stdio: 'ignore' })
			redShiftIsOn = false
		}
	} catch (error) {
		console.log(error)
		sendNotification('error in performing lock key general operations')
	}
}

function isLockKeyActive() {

	try {
		performGeneralOperations()

		let command = `xset q | grep "Lock"`

		let result = execFileSync(command, { shell: '/bin/sh', encoding: "utf-8" }).trim()

		let capsLockMatch = result.match(/Caps Lock:[\s]{1,6}on/gi)
		if (capsLockMatch) {
			lockKeyIsActive = true;
			message = "🔒️🔠 caps lock is active, disable it 🔠🔒️"
			return;
		}

		let numLockMatch = result.match(/Num Lock:[\s]{1,6}on/gi);
		if (numLockMatch) {
			lockKeyIsActive = true;
			message = "🔒️🔢 num lock is active, disable it 🔢🔒️"
			return;
		}
		lockKeyIsActive = false
	} catch (error) {
		console.log(error)
		sendNotification('error occurred in check lock key')
	}
}

setInterval(isLockKeyActive, 200);

