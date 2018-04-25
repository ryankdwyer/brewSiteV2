(function () {
    'use strict';

    angular
        .module('RKDBrewingTools')
        .controller('PrimingController', PrimingController);

    function PrimingController() {
        this.data = {
            volumes: 0,
            beerVolume: 0,
            temp: 0,
            output: 0,
        };

        this.calculate = calculate;
        this.reset = reset;
        
        function calculate() {
            var grams = 15.195 * this.data.beerVolume * 
                ( this.data.volumes - 3.0378 + ( 0.050062 * this.data.temp ) - ( 0.00026555 * ( this.data.temp * this.data.temp ) ) );
            this.data.output = ( grams  / 28.3495 ).toFixed(2);
        }

        function reset() {
            this.data = {
                volumes: 0,
                beerVolume: 0,
                temp: 0,
                output: 0,
            };
        }
    }
})();
