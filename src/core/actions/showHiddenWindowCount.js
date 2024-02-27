import { getLayout } from "../windowLayout.js";
import { hiddenDesktop } from "../../constants.js";
import { sendNotification } from "../../utils/alerts.js";

function listNumberOfHiddenWindows() {
	let layout = getLayout();
	let hiddenWindowArray = layout[hiddenDesktop]

	let objectKeys = Object.keys(hiddenWindowArray)
	let size = objectKeys.length
	sendNotification(`hidden: ${size} windows`, 500)
}

listNumberOfHiddenWindows()