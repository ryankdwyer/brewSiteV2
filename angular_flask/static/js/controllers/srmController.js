(function () {
    'use strict';
    angular
        .module('RKDBrewingTools')
        .controller('SRMCalculator', SRMCalculator);

    function SRMCalculator () {
        this.data = {
            grains: [{
                grain: 'Pick a grain'
            }, {
                grain: 'Pick a grain'
            }, {
                grain: 'Pick a grain'
            }],
            srm: '',
            hex: '',
        };
        this.calculate = calculate;
        this.reset = reset;
    }
})();
