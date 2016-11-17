(function () {

  var daytimeColors = [
    [  0,   0,   0,   0],
    [  0,   0,  15,  10],
    [255,  57,   7,  85],
    [255, 149, 127, 255],
    [255, 175, 180, 255],
  ];


  var inputRange = {
    daytime:    document.getElementById('daytime'),

    colorRed:   document.getElementById('color-red'),
    colorGreen: document.getElementById('color-green'),
    colorBlue:  document.getElementById('color-blue'),
    colorWhite: document.getElementById('color-white')
  };

  inputRange.daytime.addEventListener('input', function (event) {
    var daytime     = event.target.value;
    var daytimeMax  = event.target.max;
    var rangeStop   = Math.min(daytimeColors.length - 2, Math.floor((daytimeColors.length - 1) * daytime / daytimeMax));
    var rangeMax    = daytimeMax / (daytimeColors.length - 1);
    var rangeValue  = (daytime % rangeMax) / rangeMax;
    if (Math.floor((daytimeColors.length - 1) * daytime / daytimeMax) === daytimeColors.length - 1) {
      rangeValue = 1;
    }

    // console.log(rangeValue);
    // console.log(daytimeColors[rangeStop]);

    inputRange.colorRed.value   = interpolate(rangeValue, daytimeColors[rangeStop][0], daytimeColors[rangeStop + 1][0]);
    inputRange.colorGreen.value = interpolate(rangeValue, daytimeColors[rangeStop][1], daytimeColors[rangeStop + 1][1]);
    inputRange.colorBlue.value  = interpolate(rangeValue, daytimeColors[rangeStop][2], daytimeColors[rangeStop + 1][2]);
    inputRange.colorWhite.value = interpolate(rangeValue, daytimeColors[rangeStop][3], daytimeColors[rangeStop + 1][3]);
  }, false);

  function interpolate(n, a, b) {
    return a + (b-a)*n;
  }

})();
