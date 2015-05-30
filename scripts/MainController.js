(function() {

	'use strict';

	angular
		.module('formlyApp')
		.controller('MainController', MainController);

		function MainController(province) {

			var vm = this;

			// The model object that we reference
			// on the <formly-form> element in index.html
			vm.rental = {};


			// An array of our form fields with configuration
			// and options set. We make reference to this in
			// the 'fields' attribute on the <formly-form> element
			vm.rentalFields = [
				{
					key: 'first_name',
					type: 'input',
					templateOptions: {
						type: 'text',
						label: 'First Name',
						placeholder: 'Enter your first name',
						required: true
					}
				},
				{
					key: 'last_name',
					type: 'input',
					templateOptions: {
						type: 'text',
						label: 'Last Name',
						placeholder: 'Enter your last name',
						required: true
					}
				},
				{
					key: 'email',
					type: 'input',
					templateOptions: {
						type: 'email',
						label: 'Email address',
						placeholder: 'Enter email',
						required: true
					}
				},
				{
					key: 'under25',
					type: 'checkbox',
					templateOptions: {
						label: 'Are you under 25?',
					},
					// Hide this field if we don't have
					// any valid input in the email field
					hideExpression: '!model.email'
				},
				{
					key: 'province',
					type: 'select',
					templateOptions: {
						label: 'Province/Territory',
						// Call our province service to get a list
						// of provinces and territories
						options: province.getProvinces()		        
					},
					hideExpression: '!model.email'
				},
				{
					key: 'license',
					type: 'input',
					templateOptions: {
						label: 'Driver\'s License Number',
						placeholder: 'Enter your drivers license number'
					},
					hideExpression: '!model.province',
					validators: {
						// Custom validator to check whether the driver's license
						// number that the user enters is valid or not
		          		driversLicense: function($viewValue, $modelValue, scope) {
		          			var value = $modelValue || $viewValue;
		          			if(value) {
		          				// call the validateDriversLicense function
		          				// which either returns true or false
		          				// depending on whether the entry is valid
		          				return validateDriversLicence(value)
		          			}
		          		}
		          	},
		          	expressionProperties: {
		          		// We currently only have a driver's license pattern for Ontario
		          		// so we need to disable this field if we've picked a province/territory
		          		// other than Ontario
		          		'templateOptions.disabled': function($viewValue, $modelValue, scope) {
		          			if(scope.model.province === 'ontario') {
		          				return false;
		          			}
		          			return true;
		          		}
		          	}
				},
				{
					key: 'insurance',
					type: 'input',
					templateOptions: {
						label: 'Insurance Policy Number',
						placeholder: 'Enter your insurance policy number'
					},
					hideExpression: '!model.under25 || !model.province',
				}

			];

			// Tests the input based on a helpful regular expression
			// gratefully borrowed from jQuery.formance by Omar Shammas
			// https://github.com/omarshammas/jquery.formance
			function validateDriversLicence(value) {
				return /[A-Za-z]\d{4}[\s|\-]*\d{5}[\s|\-]*\d{5}$/.test(value);
			}

		}

})();