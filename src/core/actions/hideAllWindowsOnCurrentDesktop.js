import { getActiveDesktop, getHideWindowByIdCommand, getLayout } from "../windowLayout.js";
import { hiddenDesktop } from "../../constants.js";
import { runCommand } from "../../utils/cmd.js";
import { sendNotification } from "../../utils/alerts.js";

function hideAllWindowsOnCurrentDesktop() {
	let activeDesktop = getActiveDesktop()

	
	if (activeDesktop === hiddenDesktop) {
		//do nothing
		// playNotificationSound({ numberOfTimes: 1, soundType: 'error' });
		return;
	} else {
		let cmd = 'echo hello';
		let desktopLayout = getLayout();
		let windowList = desktopLayout[activeDesktop]
		for (let key in windowList) {
			let id = windowList[key].windowId
			// hideWindowById(id)
         cmd = `${cmd} && ${getHideWindowByIdCommand(id)}`
		}

	sendNotification('✅🌥️ all windows HIDDEN 🌥️✅')
		runCommand(cmd, true)
	}

}

hideAllWindowsOnCurrentDesktop()