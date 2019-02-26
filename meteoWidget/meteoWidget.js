// see http://www.widget-meteo.com/ for other meteo widget
// Modify the html/meteoWidget.html with other div from this site
// and add the associated width and height window size in the property file

const {Graph} = require('cyto-avatar');
const {remote, ipcRenderer} = require('electron');
const {ipcMain, BrowserWindow} = remote;
const fs = require('fs-extra');

let meteoWidget;

exports.addPluginElements = function(CY){
  if (meteoWidget) {
    meteoWidget.show();
    return;
  }

  let id = ipcRenderer.sendSync('info', 'id');
  let win = BrowserWindow.fromId(id);
  let style = {
    parent: win,
    frame: false,
    width: Config.modules.meteoWidget.width,
    height: Config.modules.meteoWidget.height,
    movable: true,
    resizable: false,
    opacity : Config.modules.meteoWidget.opacity,
    show: false,
    title: 'Widget Météo'
  }
  if (fs.existsSync('./resources/core/plugins/meteoWidget/style.json')) {
    let prop = fs.readJsonSync('./resources/core/plugins/meteoWidget/style.json', { throws: false });
    if (prop) {
        style.x = prop.x;
        style.y = prop.y;
    }
  }

  meteoWidget = new BrowserWindow(style);
  meteoWidget.loadFile('../core/plugins/meteoWidget/html/meteoWidget.html');
  ipcRenderer.sendSync('addPluginWindowID', meteoWidget.id);
  meteoWidget.once('ready-to-show', () => {
      meteoWidget.show();
  });

  meteoWidget.on('closed', function () {
    ipcMain.removeAllListeners('meteoWidgetID');
    ipcMain.removeAllListeners('meteoWidget');
    meteoWidget = null;
  });

  ipcMain.on('meteoWidgetID', (event, arg) => {
    event.returnValue = meteoWidget.id;
  });

  ipcMain.on('meteoWidget', (event, arg) => {
    switch (arg) {
      case 'quit':
        ipcRenderer.sendSync('removePluginWindowID', meteoWidget.id);
        event.returnValue = true;
        meteoWidget.close();
        break;
    }
  })
}


exports.onAvatarClose = function(callback){

  if (meteoWidget) {
    let pos = meteoWidget.getPosition();
    fs.writeJsonSync('./resources/core/plugins/meteoWidget/style.json', {
      x: pos[0],
      y: pos[1]
    });
  }
  callback();

}



exports.action = function(data, next){

  next();

}
