import { getActiveDesktop } from "../windowLayout.js";
import { commandFullPaths, hiddenDesktop, workDesktop } from "../../constants.js";
import { runCommand } from "../../utils/cmd.js";
import { sendNotification } from "../../utils/alerts.js";
import { getPanelChangeCommands } from "../../../workers/ensurePanelAppearance.js";

function changePanelAppearance(currentDesktop) {

	const destinationMap = {
		[workDesktop]: hiddenDesktop,
		[hiddenDesktop]: workDesktop
	}
	const panelChangeCommands = getPanelChangeCommands();
	console.log({ panelChangeCommands })
	runCommand(panelChangeCommands[destinationMap[currentDesktop]], true);
	return;
}

function toggleHiddenDesktop() {
	//if on the hidden desktop, go to the last workspace
	const currentDesktop = getActiveDesktop();

	changePanelAppearance(currentDesktop);

	if (currentDesktop === hiddenDesktop) {
		// sendNotification('exiting hidden workspace.....', 500)
		runCommand(`${commandFullPaths.wmctrl} -s ${workDesktop}`, true)
	} else {
		// sendNotification(' 🥷 🥷    entering HIDDEN desktop    🥷 🥷', 2000)
		runCommand(`${commandFullPaths.wmctrl} -s ${hiddenDesktop}`, true)
	}
	process.exit()
}

toggleHiddenDesktop()