// import { getActiveDesktop, getActiveWindowId } from "../windowLayout.js";
// import { hiddenDesktop, defaultDesktop, workDesktop, commandFullPaths } from "../../constants.js";
// import { runCommand } from "../../utils/cmd.js";
// import { sendNotification } from "../../utils/alerts.js";


// function changeActiveWindowDesktop() {
// 	let activeWindowId = getActiveWindowId();
// 	let activeDesktop = getActiveDesktop()
// 	if (activeDesktop === hiddenDesktop) {
// 		//do nothing
// 		sendNotification('that action is prohibited on the hidden workspace')
// 		return;
// 	} else {
// 		let desktopToMoveTo = {
// 			[defaultDesktop]: workDesktop,
// 			[workDesktop]: defaultDesktop
// 		}

// 		let destination = desktopToMoveTo[activeDesktop]
// 		let moveWindow = `${commandFullPaths.wmctrl} -i -r '${activeWindowId}' -t ${destination}`;
// 		runCommand(moveWindow)
// 		//after moving the window to other desktop, set it as last item
// 		// resolveWindowPosition(activeWindowId, destination)
// 	}
// }

// changeActiveWindowDesktop()