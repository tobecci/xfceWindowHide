// import { getActiveDesktop } from "../windowLayout.js";
// import { hiddenDesktop, defaultDesktop, workDesktop, commandFullPaths } from "../../constants.js";
// import { runCommand } from "../../utils/cmd.js";
// import { logError } from "../errorHandler.js";

// function switchDesktop() {
// 	try {
// 		let activeDesktop = getActiveDesktop();
// 		if (activeDesktop === hiddenDesktop) {
// 			//do nothing
// 			// playNotificationSound({ numberOfTimes: 1, soundType: 'error' });
// 			return
// 		} else {
// 			// switch the desktop
// 			let desktopToMoveTo = {
// 				[defaultDesktop]: [workDesktop],
// 				[workDesktop]: [defaultDesktop]
// 			}

// 			// playNotificationSound({ numberOfTimes: 1, soundType: 'alert' })
// 			runCommand(`${commandFullPaths.wmctrl} -s ${desktopToMoveTo[activeDesktop]}`, true)
// 			return
// 		}
// 	} catch (error) {
// 		logError(error)
// 	}
// }

// switchDesktop()