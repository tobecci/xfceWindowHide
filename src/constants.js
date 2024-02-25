const configFile = '/home/tobecci/Documents/dev/scripts/xfceWindowHide/hideWindowConfig.json';

const errorFile = '/home/tobecci/Documents/dev/scripts/xfceWindowHide/hideWindowErrors.json';

const persistentWindowNamesFile = '/home/tobecci/Documents/dev/scripts/xfceWindowHide/cache/persistentWindowNames.json'

//desktop names
const defaultDesktop = '0'
const workDesktop = '1'
const hiddenDesktop = '2'

const commandFullPaths = {
	wmctrl: '/usr/bin/wmctrl',
	xdotool: '/usr/bin/xdotool',
	paplay: '/usr/bin/paplay',
	notifySend: '/usr/bin/notify-send'
}