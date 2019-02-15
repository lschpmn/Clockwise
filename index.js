'use strict';

const { app, BrowserWindow, ipcMain } = require('electron');
const { join } = require('path');

let mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  const indexPath = join(__dirname, 'public/index.html');
  const { host } = process.env;
  
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 460,
    height: 150,
    useContentSize: true,
    resizable: false,
    fullscreenable: false,
    frame: false
  });
  
  mainWindow.loadURL(host || indexPath);
  
  // Open the DevTools.
  if(host) mainWindow.webContents.openDevTools();

  ipcMain.on('alarm', () => {
    mainWindow.show();
  });

  ipcMain.on('close', () => {
    app.quit();
  });

  ipcMain.on('minimize', () => {
    mainWindow.minimize();
  });
});