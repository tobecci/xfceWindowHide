import { getLayout } from "../windowLayout.js"
import { defaultDesktop, workDesktop, hiddenDesktop, commandFullPaths } from "../../constants.js"
import { execFile } from "child_process"
import { sendNotification } from "../../utils/alerts.js"
import { logError } from "../errorHandler.js"

const windowTitlePatternDesktopMap = {
	'mtn': hiddenDesktop,
	'🟨': hiddenDesktop,
	'⬜️': defaultDesktop,
	'🟩': defaultDesktop
}

const windowClassPatternDesktopMap = {
	'insomnium': workDesktop,
	'bitwarden': hiddenDesktop,
	'trilium notes': hiddenDesktop,
	'code': workDesktop
}

export async function localizeWindows() {
	try {
		const layout = getLayout(true)
		const defaultCommand = 'echo start'


		let commandToRun = `${defaultCommand}`;

		for (const index in layout) {
			const iterationWindowId = layout[index]['windowId'];
			const iterationWindowTitle = layout[index]['windowName'];
			const iterationWindowClass = layout[index]['windowClass'];
			const iterationWindowDesktop = layout[index]['desktop'];

			for (const titleIndex in windowTitlePatternDesktopMap) {
				const isInWrongDesktop = windowTitlePatternDesktopMap[titleIndex] !== iterationWindowDesktop;
				const match = iterationWindowTitle.match(RegExp(`${titleIndex}`, 'gi'))

				// console.log({ isInWrongDesktop, data: windowTitlePatternDesktopMap[titleIndex] })

				if (match && isInWrongDesktop) {
					// console.log({ titleIndex, match, iterationWindowTitle })
					commandToRun = `${commandToRun} && ${commandFullPaths.wmctrl} -i -r '${iterationWindowId}' -t ${windowTitlePatternDesktopMap[titleIndex]}`;
				}
			}

			for (const classIndex in windowClassPatternDesktopMap) {
				const match = iterationWindowClass.match(RegExp(`${classIndex}`, 'gi'))
				const isInWrongDesktop = windowClassPatternDesktopMap[classIndex] !== iterationWindowDesktop;
				if (match && isInWrongDesktop) {
					commandToRun = `${commandToRun} && ${commandFullPaths.wmctrl} -i -r '${iterationWindowId}' -t ${windowClassPatternDesktopMap[classIndex]}`;
				}
			}
		}

		//added all the window movement commands

		if (commandToRun === defaultCommand) {
			return;
		} else {
			//run command
			execFile(commandToRun, { shell: '/bin/sh', stdio: 'ignore' })

		}
	} catch (error) {
		sendNotification('an error occured in localize windows');
		logError(error)
	}

}

localizeWindows()