(function () {
    'use strict';
    angular
        .module('RKDBrewingTools')
        .controller('MashController', MashController);

    function MashController() {

        this.data = {
            time: 60,
            temperature: 155,
            grainWeight: 0,
            grainTemperate: 65,
            boilVolume: 5,
            lauterDeadspace: 0,
            mashThickness: 1.25,
            boilTemperature: 212,
            grainAbsorption: 0.1,
            mashTechnique: 0,
            equipmentProfile: {

            }
        };

        this.calculate = calculate;
        this.reset = reset;

    }
})();
