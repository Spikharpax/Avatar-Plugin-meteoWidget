const {ipcRenderer, remote} = require('electron');
const {ipcMain, BrowserWindow} = remote;
const fs = require('fs-extra');

window.onbeforeunload = (e) => {
  e.preventDefault();
  close();
}

document.getElementById('exit').addEventListener('click', function(){
    close();
});

function close() {

  let meteoWidgetID = ipcRenderer.sendSync('meteoWidgetID');
  let meteoWidget = BrowserWindow.fromId(meteoWidgetID);
  let pos = meteoWidget.getPosition();
  fs.writeJsonSync('./resources/core/plugins/meteoWidget/style.json', {
    x: pos[0],
    y: pos[1]
  });

  ipcRenderer.sendSync('meteoWidget', 'quit');
}
