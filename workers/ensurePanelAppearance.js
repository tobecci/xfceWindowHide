import { execFileSync } from 'child_process';
import { workDesktop, hiddenDesktop } from '../src/constants.js';
import { sendNotification } from '../src/utils/alerts.js'

const panelCommands = getPanelChangeCommands();

let previousDesktop = false;
let currentDesktop = execFileSync('/usr/bin/xdotool get_desktop', { shell: '/bin/sh', encoding: "utf8" }).trim();


function getPanelColorChangeCommand(desktopNumber) {
	const configOptionMap = {
		[workDesktop]: {
			bgColor: { red: '0.116667', green: '0.116667', blue: '0.116667', hue: '1.000000' },
			grouping: 'false',
			nrows: '1',
			labels: 'true'
		},
		[hiddenDesktop]: {
			bgColor: { red: '0.929412', green: '0.200000', blue: '0.231373', hue: '1.000000' },
			grouping: 'true',
			nrows: '2',
			labels: 'false'
		}
	}



	const setPanelColor = `/usr/bin/xfconf-query -c xfce4-panel -p /panels/panel-2/background-rgba -t double -s ${configOptionMap[desktopNumber].bgColor.red} -t double -s ${configOptionMap[desktopNumber].bgColor.green} -t double -s ${configOptionMap[desktopNumber].bgColor.blue} -t double -s ${configOptionMap[desktopNumber].bgColor.hue}`
	const showLabels = `/usr/bin/xfconf-query -c xfce4-panel -p /plugins/plugin-2/show-labels -s ${configOptionMap[desktopNumber].labels}`

	return `${showLabels} && ${setPanelColor}`
}

function getPanelChangeCommands() {

	return {

		[workDesktop]: `${getPanelColorChangeCommand(workDesktop)} `,

		[hiddenDesktop]: `${getPanelColorChangeCommand(hiddenDesktop)}`,
	}
}

function updateDesktopAppearance() {
	execFileSync(`${panelCommands[currentDesktop]}`, { shell: '/bin/sh', stdio: 'ignore' })
	previousDesktop = currentDesktop;
}

async function ensureCorrectDesktopPanelAppearance() {
	try {
		currentDesktop = execFileSync('/usr/bin/xdotool get_desktop', { shell: '/bin/sh', encoding: "utf8" }).trim();

		if (currentDesktop !== previousDesktop) {
			updateDesktopAppearance();
		}
	} catch (error) {
		console.log(error)
		sendNotification('error occured in ensureDesktop Appearance')
	}
}

updateDesktopAppearance();
setInterval(ensureCorrectDesktopPanelAppearance, 150)