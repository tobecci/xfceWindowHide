export const APP_NAME = 'personal window manager';

export const configFile = '/home/tobecci/Documents/dev/scripts/xfceWindowHide/hideWindowConfig.json';

export const errorFile = '/home/tobecci/Documents/dev/scripts/xfceWindowHide/cache/logfile';

export const persistentWindowNamesFile = '/home/tobecci/Documents/dev/scripts/xfceWindowHide/cache/persistentWindowNames.json'

//desktop names
export const workDesktop = '0'
export const hiddenDesktop = '1'

export const commandFullPaths = {
	wmctrl: '/usr/bin/wmctrl',
	xdotool: '/usr/bin/xdotool',
	paplay: '/usr/bin/paplay',
	notifySend: '/usr/bin/notify-send'
}

export const timeInMilliSeconds = 7000
export const notificationId = 696969