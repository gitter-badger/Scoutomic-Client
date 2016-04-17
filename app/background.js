// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import { app } from 'electron';
import os from 'os';
import devHelper from './helpers/dev';
import createWindow from './helpers/window';

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from './env';

var mainWindow;

var yosemite = false;

app.on('ready', function () {
	if (os.platform() === 'darwin' && os.release().split('.')[0] >= 10) {
		yosemite = true;
	}

	var mainWindow = createWindow('main', {
		width: 750,
		height: 600,
		titleBarStyle: yosemite ? 'hidden' : undefined,
		frame: yosemite ? true : false
	});

	mainWindow.loadURL('file://' + __dirname + '/app.html');

	if (env.name !== 'production') {
		devHelper.setDevMenu();
		mainWindow.openDevTools();
	}
});

app.on('window-all-closed', function () {
	app.quit();
});
