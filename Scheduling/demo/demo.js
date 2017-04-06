//SPAGHETTi!
var start;
var end;
var logStart;
var logEnd;

var MtrDatepicker1 = (function() {

	var datepickers = [];
	var init = function(config, settings) {
		var datepicker = new MtrDatepicker(config);
		datepickers.push(datepicker);

		var exportFormatsContainer = document.getElementById(settings.exportFormats);
	 	datepickerChange(exportFormatsContainer, datepicker);

	 	datepicker.onChange('all', function() {
			datepickerChange(exportFormatsContainer, datepicker);
		});


		return datepicker;
	};

	/**
	 * Dump the datepicker date in different formats
	 */
	function datepickerChange(resultElement, datepicker) {
		var result =
			datepicker.toDateString() + '<br />' +
			datepicker.toLocaleDateString() + '<br /><br />' +

			datepicker.toTimeString() + '<br />' +
      datepicker.getFullTime() + '<br />' +
      datepicker.format('M/D/YYYY hh:mm A') + '<br />' +
			datepicker.format('YYYY-MM-DD HH:mm') + '<br />';

		//resultElement.innerHTML = datepicker.format('YYYY-MM-DD HH:mm');
		start = datepicker.toISOString();
		logStart = datepicker.format('M-DD HH:mm');
	}

	return {init: init};

})();


var MtrDatepicker2 = (function() {

	var datepickers = [];
	var init = function(config, settings) {
		var datepicker = new MtrDatepicker(config);
		datepickers.push(datepicker);

		var exportFormatsContainer = document.getElementById(settings.exportFormats);
	 	datepickerChange(exportFormatsContainer, datepicker);

	 	datepicker.onChange('all', function() {
			datepickerChange(exportFormatsContainer, datepicker);
		});


		return datepicker;
	};

	/**
	 * Dump the datepicker date in different formats
	 */
	function datepickerChange(resultElement, datepicker) {
		var result =
			datepicker.toDateString() + '<br />' +
			datepicker.toLocaleDateString() + '<br /><br />' +

			datepicker.toTimeString() + '<br />' +
      datepicker.getFullTime() + '<br />' +
      datepicker.format('M/D/YYYY hh:mm A') + '<br />' +
			datepicker.format('YYYY-MM-DD HH:mm') + '<br />';

		//resultElement.innerHTML = datepicker.format('YYYY-MM-DD HH:mm');
		end = datepicker.toISOString();
		logEnd = datepicker.format('M-DD HH:mm');
	}

	return {init: init};

})();

