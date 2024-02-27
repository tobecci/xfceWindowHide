import { getLayout, unhideWindowById } from "../windowLayout.js";
import { getConfigData } from "../../utils/io.js";

function unhideAllWindows() {
	let layout = getLayout();
	let hiddenWindowArray = layout['2']
	const config = getConfigData();
	const desktopToRestoreTo = config['lastDesktop']

	for (let key in hiddenWindowArray) {
		unhideWindowById(hiddenWindowArray[key].windowId, desktopToRestoreTo)
	}
}

unhideAllWindows()