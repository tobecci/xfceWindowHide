import { getLayout, getUnhideWindowByIdCommand } from "../windowLayout.js";
import { hiddenDesktop } from "../../constants.js";
import { runCommand } from "../../utils/cmd.js";
import { sendNotification } from "../../utils/alerts.js";

function unhideAllWindows() {
	let layout = getLayout();
	let hiddenWindowArray = layout[hiddenDesktop]
	let cmd = 'echo hello';

	for (let key in hiddenWindowArray) {
      cmd = `${cmd} && ${getUnhideWindowByIdCommand(hiddenWindowArray[key].windowId)}`
	}
	sendNotification('✅☀️ all hidden windows RESTORED ☀️✅')
	runCommand(cmd, true)
}

unhideAllWindows()