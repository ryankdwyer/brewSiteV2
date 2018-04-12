(function () {
    'use strict';
    angular
        .module('RKDBrewingTools')
        .controller('SRMController', SRMController);

    SRMController.$inject = ['dataStore'];

    function SRMController (dataStore) {
        this.data = {
            grains: [{
                grain: {},
                weight: 0.00,
            }, {
                grain: {},
                weight: 0.00,
            }, {
                grain: {},
                weight: 0.00,
            }],
			gallons: 0.0,
            srm: '',
            hex: '',
        };
        this.calculate = calculate;
        this.reset = reset;
        this.addGrain = addGrain;
        this.removeGrain = removeGrain;
        this.getGrainOptions = getGrainOptions;
        this.handleGrainChage = handleGrainChage;

        function calculate () {
			var gallons = this.data.gallons;
			var mcu = 0;
			this.data.grains.forEach(function(grain) {
                if (!grain.lovibond) return false;
			    var pounds = grain.weight;
			    var lovibond = grain.lovibond;
			    mcu += calcMCU(pounds, lovibond, gallons);
			}, this);
			var srm = moreyCalc(mcu);
			this.data.srm = srm.toFixed(2);
			var colorHex = srmToHex(srm);
			this.data.hex = colorHex;
        }

        function addGrain () {
            this.data.grains.push({grain: 'Pick a grain'});
        }

        function removeGrain(idx) {
            if (idx >= this.data.grains.length - 1) {
                return false;
            }
            this.data.grains.splice(idx, 1);
        }

        function getGrainOptions () {
            return dataStore.grains;
        }

        function handleGrainChage(grain, idx) {
            grain.weight = this.data.grains[idx].weight;
            this.data.grains[idx] = grain;
        }

        function reset () {
            this.data = {
                grains: [{
                    grain: {},
                    weight: 0.00,
                }, {
                    grain: {},
                    weight: 0.00,
                }, {
                    grain: {},
                    weight: 0.00,
                }],
			    gallons: 0.0,
                srm: '',
                hex: '',
            };       
        }

        function calcMCU (pounds, lovibond, gallons) {
            return (pounds * lovibond) / gallons;
        }

        function moreyCalc (mcu) {
            return 1.4922 * (Math.pow(mcu, 0.6859));
        }

		function srmToHex(srm) {
		    // Returns an RGB value based on SRM
		    var r=0, g=0, b=0;
		
		    if (srm>=0 && srm<=1) {
		        r = 240;
		        g = 239;
		        b = 181;
		    } else if (srm>1 && srm<=2) {
		        r = 233;
		        g = 215;
		        b = 108;
		    } else if (srm>2) {
		        // Set red decimal
		        if (srm<70.6843) {
		            r = 243.8327-6.4040*srm+0.0453*srm*srm;
		        } else {
		            r = 17.5014;
		        }
		        // Set green decimal
		        if (srm<35.0674) {
		            g = 230.929-12.484*srm+0.178*srm*srm;
		        } else {
		            g = 12.0382;
		        }
		        // Set blue decimal
		        if (srm<4) {
		            b = -54*srm+216;
		        } else if (srm>=4 && srm<7) {
		            b = 0;
		        } else if (srm>=7 && srm<9) {
		            b = 13*srm-91;
		        } else if (srm>=9 && srm<13) {
		            b = 2*srm+8;
		        } else if (srm>=13 && srm<17) {
		            b = -1.5*srm+53.5;
		        } else if (srm>=17 && srm<22) {
		            b = 0.6*srm+17.8;
		        } else if (srm>=22 && srm<27) {
		            b = -2.2*srm+79.4;
		        } else if (srm>=27 && srm<34) {
		            b = -0.4285*srm + 31.5714;
		        } else {
		            b = 17;
		        }
		    }
		    var red = doubleToHex(r);
		    var green = doubleToHex(g);
		    var blue = doubleToHex(b);
		    return ""+red+green+blue;
		}

		function doubleToHex (d) {
		    // Converts decimal in string to hex in string
		    var hexText = d.toString(16);
		    var point = hexText.indexOf(".");
		    if (point != -1) {
		        hexText = hexText.substring(0,point);
		    }
		    while (hexText.length < 2) {
		        hexText = "0"+hexText;
		    }
		    return hexText;
		}
    }
})();
