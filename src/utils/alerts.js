import { commandFullPaths, timeInMilliSeconds as notificationExpireTime } from "../constants.js";
import { runCommand } from "./cmd.js";

export async function sendNotification(message, timeInMilliSeconds = false) {
	if (timeInMilliSeconds) {
		runCommand(`${commandFullPaths.notifySend} '${message}' -t ${notificationExpireTime}`, true)
	} else {
		runCommand(`${commandFullPaths.notifySend} '${message}' -t ${notificationExpireTime}`, true)
		return;
	}
}


/**
 * @typedef { Object } soundType
 * @property success
 * @property error
 * @property alert
 */

export async function playNotificationSound({ numberOfTimes = 1, /** @type { soundType } ***/ soundType = 'alert' }) {
	const soundMap = {
		'success': `${commandFullPaths.paplay}  /usr/share/sounds/freedesktop/stereo/complete.oga`,
		'error': `${commandFullPaths.paplay}  /usr/share/sounds/freedesktop/stereo/audio-test-signal.oga`,
		'alert': `${commandFullPaths.paplay} /usr/share/sounds/freedesktop/stereo/message.oga`
	}



	let command = "/usr/bin/pactl set-sink-mute @DEFAULT_SINK@ 0; /usr/bin/pactl set-sink-volume @DEFAULT_SINK@ 100%;";
	for (let i = 0; i < numberOfTimes; i++) {
		command = `${command} ${soundMap[soundType]};`
	}
	runCommand(command, true)
}