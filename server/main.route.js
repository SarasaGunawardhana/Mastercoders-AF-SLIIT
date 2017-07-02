'use strict';

app.config(['$routeProvider',function ($routeProvider) {

		$routeProvider.when('/', {
				templateUrl: '../views/login.html',
				controller: 'loginController'
		}).when('/admin', {
				templateUrl: '../views/sarasa/admin.html',
				controller: 'loginController'
		}).when('/adminpanel', {
				templateUrl: '../views/sarasa/adminpanel.html',
				controller: 'loginController'
		}).when('/supplier', {
				templateUrl: '../views/sarasa/supplier.html',
				controller: 'supplierController'
		}).when('/home_assistance', {
				templateUrl: '../views/home_assistance.html',
				controller: 'homeAssistanceController'
		}).when('/home_chief', {
				templateUrl: '../views/home_chief.html',
				controller: 'homeChiefController'
		}).when('/drugDetails',{
			templateUrl: '../views/wasana/drugDetails.html',
			controller: 'drugController'
		}).when('/viewrequest', {
				templateUrl: '../views/sarasa/viewRequests.html',
				controller: 'requestController'
		}).when('/viewDrug',{
			templateUrl: '../views/wasana/viewBatch.html',
			controller: 'viewBatchController'
		}).when('/batch/:id',{
			templateUrl: '../views/wasana/batchDetails.html',
			controller: 'batchController'
		}).when('/stock',{
			templateUrl: '../views/wasana/stockDetails.html',
			controller: 'stockController'


		}).when('/prescriptionDetails',{
			templateUrl: '../views/sadunika/prescriptionDetails.html',
			controller: 'prescriptionController'
		}).when('/viewPrescription',{
			templateUrl: '../views/sadunika/viewPrescription.html',
			controller: 'prescriptionController'
		}).when('/requestDetails',{
			templateUrl: '../views/sadunika/requestDetails.html',
			controller: 'requestController'
		}).when('/viewDispense',{
			templateUrl: '../views/sadunika/dispense1.html',
			controller: 'prescriptionController'


		}).when('/mailer', {
				templateUrl: '../views/sarasa/send_mail.html',
				controller: 'mailController'
		}).when('/profile', {
				templateUrl: '../views/sarasa/profile.html',
				controller: 'profileController'
		}).when('/logout', {
				templateUrl: '../views/login.html',
				controller: 'loginController'
		}).when('/400', {
				templateUrl: '../views/400.html',
				controller: 'loginController'
		}).when('/500', {
				templateUrl: '../views/500.html',
				controller: 'loginController'
		}).otherwise({
				redirectTo: "/homeifgg"
		});
}]);
