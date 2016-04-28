'use strict';

const http = require('http');
const path = require('path');
const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  const indexPath = path.join(__dirname, 'public/index.html');
  const host = process.env.host;
  
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 460,
    height: 120,
    useContentSize: true,
    resizable: false,
    fullscreenable: false,
    frame: false
  });
  
  // and load the index.html of the app.
  mainWindow.loadURL(host == null ? indexPath : host);
  
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
  
  //server listening to front-end
  //using this, instead of built in electron way because of issues with webpack+electron
  const server = http.createServer();
  server.listen(5000);
  
  server.on('request', (req, res) => {
    if(req.url === '/close') {
      process.exit(0);
    }
    
    if(req.url === '/minimize') {
      mainWindow.minimize();
    }
    
    if(req.url === '/alarm') {
      if(mainWindow.isMinimized()) mainWindow.show();
    }
    
    res.setHeader('Access-Control-Allow-Origin','*');
    res.end();
  });
});