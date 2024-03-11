import { getActiveWindowId, getActiveDesktop } from "../windowLayout.js";
import { commandFullPaths, hiddenDesktop, workDesktop } from "../../constants.js";
import { runCommand } from "../../utils/cmd.js";
import { sendNotification } from "../../utils/alerts.js";

function hideActiveWindow() {
	// if on hidden desktop, unhide instead
	if (getActiveDesktop() === hiddenDesktop) {
		runCommand(`${commandFullPaths.wmctrl} -i -r '${getActiveWindowId()}' -t '${workDesktop}'`, true);
		sendNotification(`☀️ active window RESTORED ☀️`)

		// playNotificationSound({ numberOfTimes: 1, soundType: 'success' });
	} else {
		//else, hide
		runCommand(`${commandFullPaths.wmctrl} -i -r '${getActiveWindowId()}' -t '${hiddenDesktop}'`, true);
		sendNotification(`🌥️ active window HIDDEN 🌥️`)
	}
}

hideActiveWindow()