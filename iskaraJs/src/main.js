var pump = require('@amperka/power-control').connect(P11);
var waterLevel = require('@amperka/water-level').connect(P6, {debounce: 0.5});
var hyst = require('@amperka/hysteresis')
    .create({
        high: 0.4,
        highLag: 2,
        low: 0.25,
        lowLag: 2
    });

//--------------------------------------------------------------------------------------------------------------------

setInterval(function () {
    var value = analogRead(A2);
    hyst.push(value);
}, 200);

hyst.on('low', function () {
    let message = "Start get water.";
    console.log(message);
    // pump.turnOn();
});

hyst.on('high', function () {
    let message = "End get water.";
    console.log(message);
    // pump.turnOff();
});

waterLevel.on('down', function () {
    let message = "Warning! Water level is low.";
    console.log(message);
    // pump.turnOff();
});

//--------------------------------------------------------------------------------------------------------------------
