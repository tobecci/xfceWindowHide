import { getActiveWindowId, getLayout, maximizeSingleWindowById } from "../windowLayout.js";
import { commandFullPaths } from "../../constants.js";
import { runCommand } from "../../utils/cmd.js";

function maximizeAllWindows() {
	let activeWindowId = getActiveWindowId();
	let windowList = getLayout(true);

	function maximizeAllInList() {
		for (let key in windowList) {
			let id = windowList[key].windowId;
			maximizeSingleWindowById(id);
		}
	}

	// while (count < 2) { maximizeAllInList(); count++ }
	maximizeAllInList();

	//give focus to initially active window
	runCommand(`${commandFullPaths.wmctrl} -i -a ${activeWindowId}`, true)
	// playNotificationSound({ numberOfTimes: 1, soundType: 'success' });
}

maximizeAllWindows();