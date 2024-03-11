import { getActiveDesktop } from "../windowLayout.js";
import { commandFullPaths, hiddenDesktop, workDesktop } from "../../constants.js";
import { runCommand } from "../../utils/cmd.js";

function toggleHiddenDesktop() {
	//if on the hidden desktop, go to the last workspace
	const currentDesktop = getActiveDesktop();

	if (currentDesktop === hiddenDesktop) {
		runCommand(`${commandFullPaths.wmctrl} -s ${workDesktop}`, true)
		return
	} else {
		runCommand(`${commandFullPaths.wmctrl} -s ${hiddenDesktop}`, true)
		return
	}

}

toggleHiddenDesktop()