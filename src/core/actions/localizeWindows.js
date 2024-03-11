import { getLayout } from "../windowLayout.js"
import { workDesktop, hiddenDesktop, commandFullPaths } from "../../constants.js"
import { execFile } from "child_process"
import { sendNotification } from "../../utils/alerts.js"
import { logError } from "../errorHandler.js"

const windowTitlePatternDesktopMap = {
	'🟨': hiddenDesktop,
	'⬜️': hiddenDesktop,
	'🟩': workDesktop
}

const windowClassPatternDesktopMap = {
	'insomnium': workDesktop,
	'code': workDesktop,
	'bitwarden': hiddenDesktop,
	'trilium notes': hiddenDesktop,
	'rhythmbox': hiddenDesktop
}

export async function localizeWindows() {
	try {
		const layout = getLayout(true)
		const defaultCommand = 'echo start'
		let numberOfWindowsLocalized = 0;

		let commandToRun = `${defaultCommand}`;

		for (const index in layout) {
			const iterationWindowId = layout[index]['windowId'];
			const iterationWindowTitle = layout[index]['windowName'];
			const iterationWindowClass = layout[index]['windowClass'];
			const iterationWindowDesktop = layout[index]['desktop'];

			for (const titleIndex in windowTitlePatternDesktopMap) {
				const isInWrongDesktop = windowTitlePatternDesktopMap[titleIndex] !== iterationWindowDesktop;
				const match = iterationWindowTitle.match(RegExp(`${titleIndex}`, 'gi'))


				if (match && isInWrongDesktop) {
					commandToRun = `${commandToRun} && ${commandFullPaths.wmctrl} -i -r '${iterationWindowId}' -t ${windowTitlePatternDesktopMap[titleIndex]}`;
					numberOfWindowsLocalized++;
				}
			}

			for (const classIndex in windowClassPatternDesktopMap) {
				const match = iterationWindowClass.match(RegExp(`${classIndex}`, 'gi'))
				const isInWrongDesktop = windowClassPatternDesktopMap[classIndex] !== iterationWindowDesktop;
				if (match && isInWrongDesktop) {
					commandToRun = `${commandToRun} && ${commandFullPaths.wmctrl} -i -r '${iterationWindowId}' -t ${windowClassPatternDesktopMap[classIndex]}`;
					numberOfWindowsLocalized++;
				}
			}
		}

		//added all the window movement commands

		if (commandToRun === defaultCommand) {
			sendNotification(`nothing was done`)
			return;
		} else {
			sendNotification(`${numberOfWindowsLocalized} windows were localized`);
			//run command
			execFile(commandToRun, { shell: '/bin/sh', stdio: 'ignore' })
		}
	} catch (error) {
		sendNotification('an error occured in localize windows');
		logError(error)
	}

}

localizeWindows()