(function () {
	'use strict';
	angular
	.module('RKDBrewingTools')
	.controller('HydrometerController', HydrometerController);

	function HydrometerController($scope) {
		this.data = {
			specificGravity: 1.050,
			temperature: 100,
			targetTemperature: 60,
			units: 'F',
			output: '',
		};
		this.calculate = calculate;
        this.convertToFahrenheit = convertToFahrenheit;
		this.reset = reset;

		function reset () {
			this.data = {
				specificGravity: 1.050,
				temperature: 100,
				targetTemperature: 60,
				units: 'F',
				output: '',
			};
		}

        function convertToFahrenheit(t) {
            return (t * (9 / 5)) + 32;
        }

		function calculate() {
			var measuredTemperature,
			    targetTemperature;
			if (this.data.units === 'C') {
				measuredTemperature = this.convertToFahrenheit(this.data.temperature);
				targetTemperature = this.convertToFahrenheit(this.data.targetTemperature);
			} else {
				measuredTemperature = this.data.temperature;
				targetTemperature = this.data.targetTemperature;
			}
			var specificGravity = this.data.specificGravity;
			var cg = (specificGravity * ((1.00130346 - 0.000134722124 * measuredTemperature + 0.00000204052596 * Math.pow(measuredTemperature, 2) - 0.00000000232820948 * Math.pow(measuredTemperature, 3)) /
                     (1.00130346 - 0.000134722124 * targetTemperature + 0.00000204052596 * Math.pow(targetTemperature, 2) - 0.00000000232820948 * Math.pow(targetTemperature, 3))));
		    var cgRounded = cg.toFixed(3);
            this.data.output = cgRounded;
		}

	}

})();
