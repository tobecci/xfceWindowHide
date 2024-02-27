#!/home/tobecci/.nvm/versions/node/v18.16.1/bin/node
import { execFileSync } from 'child_process';
import { defaultDesktop, workDesktop, hiddenDesktop } from '../src/constants.js';
import { sleep } from '../src/utils/utils.js';
import { sendNotification } from '../src/utils/alerts.js';
import { logError } from '../src/core/errorHandler.js';


function getPanelColorChangeCommand({ red, green, blue, hue }) {
	return `/usr/bin/xfconf-query -c xfce4-panel -p /panels/panel-1/background-rgba -t double -s ${red} -t double -s ${green} -t double -s ${blue} -t double -s ${hue}; /usr/bin/xfconf-query -c xfce4-panel -p /panels/panel-2/background-rgba -t double -s ${red} -t double -s ${green} -t double -s ${blue} -t double -s ${hue};`
}

function getPanelChangeCommands() {
	const defaultPanelColors = { red: 0.298420, green: 0.034444, blue: 0.516667, hue: 1.000000 };
	const workPanelColors = { red: 0.116667, green: 0.116667, blue: 0.116667, hue: 1.000000 }
	const hiddenPanelColors = { red: 0.937255, green: 0.243137, blue: 0.333333, hue: 1.000000 };

	const normalRowAndLenghtCommmand = `/usr/bin/xfconf-query  -c xfce4-panel -p /plugins/plugin-2/group-windows -s false`
	const hiddenRowAndLenghtCommmand = `/usr/bin/xfconf-query  -c xfce4-panel -p /plugins/plugin-2/group-windows -s true`

	return {
		[defaultDesktop]: `${normalRowAndLenghtCommmand} ${getPanelColorChangeCommand(defaultPanelColors)}`,

		[workDesktop]: `${normalRowAndLenghtCommmand} ${getPanelColorChangeCommand(workPanelColors)}`,

		[hiddenDesktop]: `${hiddenRowAndLenghtCommmand} ${getPanelColorChangeCommand(hiddenPanelColors)}`,
	}
}


async function ensureCorrectDesktopPanelAppearance() {

	try {
		let previousDesktop = false;
		let currentDesktop;
		const panelCommands = getPanelChangeCommands()

		//infinite loop to monitor current desktop
		// eslint-disable-next-line no-constant-condition
		while (true) {

			currentDesktop = execFileSync('/usr/bin/xdotool get_desktop', { shell: '/bin/sh', encoding: "utf8" }).trim();

			//if first iteration, set color according to currentDesktop variable
			if (previousDesktop === false) {
				//set background
				execFileSync(`sh -c "${panelCommands[currentDesktop]}" > /dev/null 2>&1;`, { shell: '/bin/sh', stdio: 'ignore' })
				previousDesktop = currentDesktop;
			}

			if (currentDesktop !== previousDesktop) {
				execFileSync(`sh -c "${panelCommands[currentDesktop]}" > /dev/null 2>&1;`, { shell: '/bin/sh', stdio: 'ignore' })
				previousDesktop = currentDesktop
			}

			//sleep
			await sleep(100)
		}
	} catch (error) {

		sendNotification('an error occured in localize windows');
		logError(error)
	}
}

ensureCorrectDesktopPanelAppearance()
