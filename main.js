const { globalShortcut, ipcMain } = require('electron');
const menubar = require('menubar');
const mb = menubar({ 'preload-window': true });
const GLOBAL_SHORTCUT = 'CommandOrControl+Alt+N';


mb.on('after-create-window', () => {
    globalShortcut.register(GLOBAL_SHORTCUT, () => {
        mb.window.isVisible() ? mb.hideWindow() : mb.showWindow()
    });

    mb.window.openDevTools();
});

ipcMain.on('selected', () => { mb.hideWindow(); });

