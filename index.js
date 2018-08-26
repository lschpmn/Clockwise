'use strict';

const http = require('http');
const { join } = require('path');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

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
  
  //server listening to front-end
  //using this, instead of built in electron way because of issues with webpack+electron
  const server = http.createServer();
  server.listen(3000);
  
  server.on('request', (req, res) => {
    if(req.url === '/close') {
      app.quit();
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