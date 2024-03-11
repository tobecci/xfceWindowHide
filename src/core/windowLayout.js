import { workDesktop, hiddenDesktop, commandFullPaths } from "../constants.js"
import { runCommand } from "../utils/cmd.js"
import { getConfigData, updateConfigData } from "../utils/io.js"
import { sendNotification } from "../utils/alerts.js"
import { logError } from "./errorHandler.js"

function decideIndex(obj) {
	let isNotEmpty = JSON.stringify(obj) !== '{}'
	if (Boolean(obj) && isNotEmpty) {
		let lastIndex = Object.keys(obj)[Object.keys(obj).length - 1]
		let nextIndex = parseInt(lastIndex) + 1
		return nextIndex.toString()
	} else {
		return '0';
	}
}

export function getLayout(collapsed = false) {
	const windowsToIgnore = ['xfce4-panel', 'Desktop', 'xfce4-notifyd']
	const desktopTable = { [workDesktop]: {}, [hiddenDesktop]: {}, }
	const desktopTableArray = []
	const hostname = runCommand('/usr/bin/hostname');

	let data = runCommand(`${commandFullPaths.wmctrl} -l -G | sort -n -k4`)
	let lines = data.split("\n")

	if (lines[lines.length - 1] === '') lines.pop();

	for (let key in lines) {
		try {
			const currentLine = lines[key]
			const regex = RegExp(`(?<=${hostname}\\s+).*`)
			const windowNameSearchResult = currentLine.match(regex);
			let windowName = false;
			let windowClass = false;

			let windowInfoArray = currentLine.split(' ');

			windowName = windowNameSearchResult ? windowNameSearchResult[0] : false;

			if (windowsToIgnore.includes(windowName) || !windowName) {
				continue
			}

			let windowId = windowInfoArray[0]
			let desktopNumber = windowInfoArray[2]

			const windowClassCommandOutput = runCommand(`/usr/bin/xprop -id ${windowId} WM_CLASS`)

			if (windowClassCommandOutput) {
				const windowClassSearchResult = windowClassCommandOutput.match(/(?<=WM_CLASS\(STRING\)\s+=\s+).*/i)
				windowClass = windowClassSearchResult ? windowClassSearchResult[0] : false;
			} else {
				windowClass = 'error occured here (no xprop output)'
			}

			const windowData = { "windowId": windowId, "windowName": windowName, "windowClass": windowClass };

			if (!collapsed) {
				let index = decideIndex(desktopTable[desktopNumber])
				desktopTable[desktopNumber][index] = windowData
			} else {
				windowData.desktop = desktopNumber;
				desktopTableArray.push(windowData);
			}
		} catch (error) {
			sendNotification('error in get layout function')
			logError(error)
			continue;
		}
	}


	if (collapsed) {
		// updateConfigField('layoutCollapsed', desktopTableArray)
		return desktopTableArray;
	} else {
		// updateConfigField('layout', desktopTable)
		return desktopTable;
	}
}


export function getActiveWindowId() {
	try {
		let command = "/usr/bin/xdotool getwindowfocus"
		let result = runCommand(command)
		let windowId = parseInt(result)
		windowId = `0x0${windowId.toString(16)}`
		return windowId
	} catch (error) {
		sendNotification('error getting active windowId')
	}
}

export function listAllDesktops() {
	let command = `${commandFullPaths.wmctrl} -d`
	let result = runCommand(command)
	let lines = result.split('\n')
	lines.pop();
	let desktops = lines.map((line) => {
		return line.slice(0, 1)
	})
	return desktops
}

export function getActiveDesktop() {
	let command = `${commandFullPaths.wmctrl} -d | grep '*'`
	let result = runCommand(command)
	result = result.slice(0, 1)
	return result;
}

/**
 * this would typically happen before a switch
 * @param desktopNumber
 */
export function updateCurrentAsLastDesktop(activeDesktop) {
	let config = getConfigData()
	config['lastDesktop'] = activeDesktop
	updateConfigData(config)
}

export function getHideWindowByIdCommand(windowId) {
	const command = `${commandFullPaths.wmctrl} -i -r '${windowId}' -t ${hiddenDesktop}`;
	return command;
}

export function getUnhideWindowByIdCommand(windowId) {
	const command = `${commandFullPaths.wmctrl} -i -r '${windowId}' -t ${workDesktop}`
	return command;
}

export function getMaximizeSingleWindowByIdCommand(id) {
	// const commandToFocusWindow = `${commandFullPaths.wmctrl} -i -a ${id}`
	// utils.functions.runCommand(commandToFocusWindow, true)
	const commandToUnMaximize = `${commandFullPaths.wmctrl} -i -r ${id} -b remove,maximized_vert,maximized_horz`
	// utils.functions.runCommand(commandToUnMaximize)
	const commandToMaximize = `${commandFullPaths.wmctrl} -i -r ${id} -b add,maximized_vert,maximized_horz`
	// utils.functions.runCommand(commandToMaximize)

	return `${commandToUnMaximize} && ${commandToMaximize}`;
}

export function resolveWindowPosition(windowId, desktopId) {
	let destinationDesktopLayout = getLayout()[desktopId]
	let index = Object.keys(destinationDesktopLayout)[Object.keys(destinationDesktopLayout).length - 1]
	let idOflastWindowInDestination = destinationDesktopLayout[index].windowId

	let commandToResolveWindowPosition = `${commandFullPaths.wmctrl} -i -r ${windowId} -b remove,above && ${commandFullPaths.wmctrl} -i -r ${idOflastWindowInDestination} -b add,above`
	runCommand(commandToResolveWindowPosition)
}