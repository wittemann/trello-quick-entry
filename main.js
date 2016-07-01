const electron = require('electron');
const path = require('path')

// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const globalShortcut = electron.globalShortcut;

const OPEN_COMMAND = 'Alt+Return';


let mainWindow = null;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 400,
    height: 100,
    frame: false,
    center: true,
    resizable: false,
    movable: false,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}
app.dock.hide();

app.on('ready', () => {
  createTray();

  // Register a 'CommandOrControl+X' shortcut listener.
  const ret = globalShortcut.register(OPEN_COMMAND, () => {
    if (mainWindow === null) {
      createWindow();
    } else {
      mainWindow.focus();
    }
  });

  if (!ret) {
    console.log('registration failed');
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


const createTray = function() {
  const iconName = 'trello-mark-blue.png';
  const iconPath = path.join(__dirname, iconName);
  const appIcon = new electron.Tray(iconPath);
  const contextMenu = electron.Menu.buildFromTemplate([{
      label: 'Open',
      click: createWindow
    }])
  appIcon.setToolTip('Trello Quick Entry')
  appIcon.setContextMenu(contextMenu)
}
