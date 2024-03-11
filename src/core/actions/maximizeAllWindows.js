import { getActiveWindowId, getLayout, getMaximizeSingleWindowByIdCommand } from "../windowLayout.js";
import { commandFullPaths } from "../../constants.js";
import { runCommand } from "../../utils/cmd.js";
import { sendNotification } from "../../utils/alerts.js";

function maximizeAllWindows() {
	try {
		
	sendNotification('⏳️ maximizing..... ⏳️')
	
	const activeWindowId = getActiveWindowId();
	const windowList = getLayout(true);
	
	let cmd = {
		run: `echo "default command"`,
		focusInitial: `${commandFullPaths.wmctrl} -i -a ${activeWindowId}`
	}

	for (let key in windowList) {
		let id = windowList[key].windowId;
		// maximizeSingleWindowById(id);
		cmd.run = `${cmd.run} && ${getMaximizeSingleWindowByIdCommand(id)}`
	}
	cmd.run = `${cmd.run} && ${cmd.focusInitial}`



	//give focus to initially active window
	runCommand(cmd.run, true)
	sendNotification('✅ all windows maximized ✅')
	// playNotificationSound({ numberOfTimes: 1, soundType: 'success' });
	} catch (error) {
		console.log('error in maximizing window',  error)
		sendNotification('error in maximizing window')
	}
}

maximizeAllWindows();