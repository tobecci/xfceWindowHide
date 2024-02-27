import { getActiveWindowId } from "../windowLayout.js";
import { runCommand } from "../../utils/cmd.js";

function renameActiveWindow() {
	console.log('starting')
	const activeWindowId = getActiveWindowId();
	// execFileSync(`notify-send "hello id: ${activeWindowId}"`, { shell: '/bin/sh'})

	// --entry-text "initial window name"
	const result = runCommand(`zenity --entry --title "New Window Title" --text "Enter name:" 2>/dev/null | cat`)

	//if no string is provided, exit gracefully
	if (result.length === 0) { return }

	const commandToRenameWindow = `xprop -id ${activeWindowId} -f _NET_WM_NAME 8u -set _NET_WM_NAME '${result}'`
	// console.log(result)
	runCommand(commandToRenameWindow, true)

	// execFileSync(`notify-send ${result}`, { shell: '/bin/sh'})
	// execFileSync('notify-send hello', { shell: '/bin/sh'})
}

renameActiveWindow()