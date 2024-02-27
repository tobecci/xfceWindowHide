import { getActiveDesktop, hideWindowById, getLayout } from "../windowLayout.js";
import { hiddenDesktop } from "../../constants.js";

function hideAllWindowsOnCurrentDesktop() {
	let activeDesktop = getActiveDesktop()

	if (activeDesktop === hiddenDesktop) {
		//do nothing
		// playNotificationSound({ numberOfTimes: 1, soundType: 'error' });
		return;
	} else {
		let desktopLayout = getLayout();
		let windowList = desktopLayout[activeDesktop]
		for (let key in windowList) {
			let id = windowList[key].windowId
			hideWindowById(id)
		}
		// playNotificationSound({ numberOfTimes: 1, soundType: 'success' });
	}

}

hideAllWindowsOnCurrentDesktop()