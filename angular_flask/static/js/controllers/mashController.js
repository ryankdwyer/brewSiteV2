(function () {
    'use strict';
    angular
        .module('RKDBrewingTools')
        .controller('MashController', MashController);

    function MashController() {

        this.data = {
            time: 60,
            mashTemp: 155,
            grainWeight: 5,
            grainTemp: 65,
            boilVolume: 5,
            lauterDeadspace: 0,
            mashThickness: 1.25,
            boilTemperature: 212,
            grainAbsorption: 0.1,
            thermodynamicConstant: 0.2,
            mashTechnique: 0,
        };

        this.equipmentProfile = {
            grainAbsorptionFactor: 0.1,
            boilingTemp: 212,
            lauterDeadspace: 0,
        };

        this.output = {
            mashWaterVolume: 0,
            strikeWaterTemp: 0,
            spargeWaterVolume: 0,
            combinedRunningsVolume: 0
        };

        this.calculate = calculate;
        this.reset = reset;
        this._strikeWaterTemp = _strikeWaterTemp;
        this.prettify = prettify;

        function calculate() {
            // quarts of water
            var mashWaterVolume = this.data.grainWeight * this.data.mashThickness;
            // target water temp
            var strikeWaterTemp = this._strikeWaterTemp(this.data.mashThickness, this.data.mashTemp, this.data.grainTemp);
            // quarts of water to sparge with
            var spargeWaterVolume = (this.data.boilVolume * 4) - mashWaterVolume + ( this.data.grainWeight * this.data.grainAbsorption );
            // quarts of water pre boil
            var combinedRunningsVolume = mashWaterVolume + spargeWaterVolume - ( this.data.grainWeight * this.data.grainAbsorption );

            this.output.mashWaterVolume = mashWaterVolume;
            this.output.strikeWaterTemp = strikeWaterTemp;
            this.output.spargeWaterVolume = spargeWaterVolume;
            this.output.combinedRunningsVolume = combinedRunningsVolume;
        }

        function _strikeWaterTemp(mashThickness, mashTemp, grainTemp) {
            var mt = mashThickness * 4;
            return (this.data.thermodynamicConstant / mt) * (mashTemp - grainTemp) + mashTemp;
        }

        function reset() {
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
                thermodynamicConstant: 0.2,
                mashTechnique: 0,
            };
            this.equipmentProfile = {
                grainAbsorptionFactor: 0.1,
                boilingTemp: 212,
                mashThickness: 1.25,
                lauterDeadspace: 0,
            };
            this.output = {
                mashWaterVolume: 0,
                strikeWaterTemp: 0,
                spargeWaterVolume: 0,
                combinedRunningsVolume: 0
            };
        }

        function prettify(text) {
            return text.split(/(?=[A-Z])/).join(" ");
        }

    }
})();
