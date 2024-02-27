import { getActiveWindowId, getActiveDesktop } from "../windowLayout.js";
import { commandFullPaths, hiddenDesktop } from "../../constants.js";
import { getConfigData } from "../../utils/io.js";
import { runCommand } from "../../utils/cmd.js";

function hideActiveWindow() {
	// if on hidden desktop, unhide instead
	if (getActiveDesktop() === hiddenDesktop) {
		const config = getConfigData();

		runCommand(`${commandFullPaths.wmctrl} -i -r '${getActiveWindowId()}' -t '${config['lastDesktop']}'`, true);
		// playNotificationSound({ numberOfTimes: 1, soundType: 'success' });
	} else {
		//else, hide
		// playNotificationSound({ numberOfTimes: 1, soundType: 'error' });
		runCommand(`${commandFullPaths.wmctrl} -i -r '${getActiveWindowId()}' -t '${hiddenDesktop}'`, true);
	}
}

hideActiveWindow()