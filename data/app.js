var debugMode = true;

var map     = Array.prototype.map;
var forEach = Array.prototype.forEach;

var requestPerSecond  = 20;
var isReadyToRequest  = false;
var isCommandDirty    = false;
var inputRange        = document.querySelectorAll('input[type=range]');
var hostname          = location.hostname || prompt('host ip', '192.168.0.10');
var ws                = new WebSocket("ws://" + hostname + ':81');



ws.onopen   = function(evt) {
  console.log("Connection open ...");
  forEach.call(inputRange, function (input) {input.disabled = false});
};
ws.onclose  = function(evt) {
  console.log("Connection closed.");
  forEach.call(inputRange, function (input) {input.disabled = true});
};
ws.onerror  = function(evt) { console.log("WebSocket error : " + e.data) };



ws.onmessage = function(evt) {
  var data = (JSON.parse(evt.data)).data;

  if (debugMode) {
    console.log('onmessage');
    console.log(data);
  }

  var i = 0;
  forEach.call(inputRange, function (input) {
    input.value = data[i++];
  });

  isReadyToRequest = true;
};




function sendCommand(command) {
  if (debugMode) {
    console.log('sendCommand');
    console.log(command);
  }

  command = typeof command !== 'undefined' ? command : {'data':[]};

  isReadyToRequest  = false;
  isCommandDirty    = false;

  ws.send(JSON.stringify(command));
}





var command = {'data' : []};

function prepareCommandResquest(event) {
  if (debugMode) console.log('prepareCommandRequest');

  command = { 'data': map.call(inputRange, function (input) { return input.value; }) };
  isCommandDirty = true;
}
// Permet de réinitialiser les valeurs à chaque nouvelle connexion.
// prepareCommandResquest();

forEach.call(inputRange, function (input) { input.addEventListener('input', prepareCommandResquest, false); });





setInterval(function () {
  if (ws.readyState == 1 && isReadyToRequest && isCommandDirty) {
    if (debugMode) console.log('readyState');
    sendCommand(command);
  } },
  1000/requestPerSecond
);
