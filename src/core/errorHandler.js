import { execFileSync } from "child_process";
import { commandFullPaths } from "../constants.js";
import { getConfigData, updateConfigData } from "../utils/io.js";

export function logError(error) {
	return new Promise(function () {
		execFileSync(`${commandFullPaths.paplay} /usr/share/sounds/freedesktop/stereo/audio-test-signal.oga`, { shell: '/bin/bash' })
		execFileSync(`sh -c "${commandFullPaths.paplay} /usr/share/sounds/freedesktop/stereo/dialog-error.oga; ${commandFullPaths.paplay} /usr/share/sounds/freedesktop/stereo/dialog-error.oga;" > /dev/null 2>&1;`, { shell: '/bin/sh', stdio: 'ignore' })

		let config = getConfigData();
		const timeStamp = `${new Date().toDateString()} - ${new Date().toLocaleTimeString()}`;
		const summarizedError = {
			message: error.message,
			stack: error.stack,
			timestamp: timeStamp
		}

		if (config.error && Array.isArray(config.error)) {
			if (config.error.length >= 5) {
				config.error.shift();
			}
		}
		else {
			config.error = [];
		}

		config.error.push(summarizedError);
		updateConfigData(config)
	})
}