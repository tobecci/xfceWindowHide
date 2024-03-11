import { getActiveWindowId } from "../windowLayout.js";
import { runCommand } from "../../utils/cmd.js";

function renameActiveWindow() {
	const activeWindowId = getActiveWindowId();

	// --entry-text "initial window name"
	const result = runCommand(`zenity --entry --title "New Window Title" --text "Enter name:" 2>/dev/null | cat`)

	//if no string is provided, exit gracefully
	if (result.length === 0) { return }

	const commandToRenameWindow = `xprop -id ${activeWindowId} -f _NET_WM_NAME 8u -set _NET_WM_NAME '${result}'`
	runCommand(commandToRenameWindow, true)

}

renameActiveWindow()