'use strict';

app.config(['$routeProvider',function ($routeProvider) {

	$routeProvider.when('/', {
		templateUrl: '../views/login.html',
		controller: 'loginController'
	}).when('/supplier', {
		templateUrl: '../views/sarasa/supplier.html',
		controller: 'supplierController'
	}).when('/supplier/:id', {
		templateUrl: '../views/sarasa/supplier.html',
		controller: 'supplierController'

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



	}).when('/drugDetails',{
		templateUrl: '../views/wasana/drugDetails.html',
		controller: 'drugController'
	}).when('/viewDrug',{
		templateUrl: '../views/wasana/viewDrug.html',
		controller: 'drugController'
	}).when('/home_assistance', {
		templateUrl: '../views/home_assistance.html',
		controller: 'homeAssistanceController'
	}).when('/home_chief', {
		templateUrl: '../views/home_chief.html',
		controller: 'homeChiefController'
	}).when('/logout', {
		templateUrl: '../views/login.html',
		controller: 'loginController'
	}).otherwise({
		redirectTo: "/homeifgg"
	});
}]);
/* .when('/supplier', {
templateUrl: '../views/sarasa/viewSupplier.html',
controller: 'supplierController'
})*/
