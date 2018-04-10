(function () {
	'use strict';
	angular
	.module('RKDBrewingTools')
	.controller('ABVController', ABVController);

	function ABVController () {
		this.data = {
			originalGravity: 1.050,
			finalGravity: 1.008,
			abv: '',
			attenuation: '',
			calories: '',
		};
		this.calculate = calculate;
		this.reset = reset;

		function reset() {
			this.data = {
				originalGravity: 1.050,
				finalGravity: 1.008,
				abv: '',
				attenuation: '',
				calories: '',
			};
		}

		function calculate() {
			let abvCalc = _abv(this.data.originalGravity, this.data.finalGravity).toFixed(2);
			let attenuation = _attenuation(this.data.originalGravity, this.data.finalGravity).toFixed(2);
			let calories = _totalCalories(this.data.originalGravity, this.data.finalGravity).toFixed(0);
			this.data.abv = abvCalc;
			this.data.attenuation = attenuation;
			this.data.calories = calories;
		}

		function _abv (og, fg) {
			return (og - fg) * 131.25;
		}

		function _attenuation (og, fg) {
			return 100 * ((og - fg) / (og - 1));
		}

		function _caloriesFromAlcohol (og, fg) {
			return 1881.22 * fg * ( ( og - fg ) / (1.775 - og ) );
		}

		function _caloriesFromCarbohydrates (og, fg) {
			return 3550 * fg * ((0.1808 * og) + (0.8192 * fg) - 1.0004);
		}

		function _totalCalories(og, fg) {
			return _caloriesFromAlcohol(og, fg) + _caloriesFromCarbohydrates(og, fg);
		}

	}

})();
