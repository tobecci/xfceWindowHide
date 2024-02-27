import { getActiveDesktop, updateCurrentAsLastDesktop } from "../windowLayout.js";
import { getConfigData } from "../../utils/io.js";
import { commandFullPaths, hiddenDesktop } from "../../constants.js";
import { runCommand } from "../../utils/cmd.js";

function toggleHiddenDesktop() {
	//if on the hidden desktop, go to the last workspace
	const currentDesktop = getActiveDesktop();

	if (currentDesktop === hiddenDesktop) {
		const config = getConfigData()
		//swtich to last desktop
		runCommand(`${commandFullPaths.wmctrl} -s ${config['lastDesktop']}`, true)
		return
	} else {
		//go to hidden desktop
		updateCurrentAsLastDesktop(currentDesktop)
		// playNotificationSound({ numberOfTimes: 1, soundType: 'error' })
		runCommand(`${commandFullPaths.wmctrl} -s ${hiddenDesktop}`, true)
		return
	}

}

toggleHiddenDesktop()