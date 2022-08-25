const { _, sortBy } = require('underscore');

(function () {
    const cars = [
        { name: 'Mercedes', speed: 130 },
        { name: 'Ford', speed: 100 },
        { name: 'Bmw', speed: 120 },
    ];

    var sorted = _.sortBy(cars, (car) => car.speed);
    console.log(sorted);
})();