const { _, min } = require('underscore');

(function () {
    const cars = [
        { name: 'Ford', speed: 100 },
        { name: 'Bmw', speed: 120 },
        { name: 'Mercedes', speed: 130 },
    ];

    var minValue = _.min(cars, (car) => car.speed);
    console.log(minValue);
})();