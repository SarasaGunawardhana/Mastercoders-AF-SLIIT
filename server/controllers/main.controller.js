'use strict';

app.controller('loginController',['$scope','loginService', function($scope,loginService){
  $(function () {
    $('#datetimepicker1').datetimepicker();
  });
  $scope.loginCheck = function(login){
    console.log(login);
    loginService.signin(login);
  };
  function viewUsers(){
    loginService.getUsers().then(function(data){
      $scope.users = data;
      console.log(data);
    });
  }
  viewUsers();

  $scope.addUser = (user)=>{
  if(user.confirm == user.password){
    var sp = $("#sp").val();
    console.log(sp);
    var nic = $("#NIC").val().toUpperCase();
    var dob = $("#dob").val();
    user.NIC =nic;
    var nicExp = /[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][V]/;
    var date = new Date();
    var day = date.getDate();
    var month= date.getMonth() + 1; //Get month index. starts with 0.
    var year = date.getFullYear();
    var currentFullDate = year+"/"+month+"/"+day;
    var dobCheck = new Date(dob+" 00:00:00.000");
    var currentFullDateCheck = new Date(currentFullDate);

    if(dobCheck > currentFullDateCheck){
            Alert.render("Date of birth is invalid.");
            return;
    }

    if(!nic.match(nicExp)){
      Alert.render("NIC is invalid.");
      return;
    }
    var yearDOB = dob.split("-");
    console.log(yearDOB);
    console.log("one"+yearDOB[0][8]);
    console.log("two"+yearDOB[0][9]);
    var yearShort = yearDOB[0][8]+""+yearDOB[0][9];
    console.log(yearShort);
    var nicYear = nic[0]+nic[1];
    console.log(nicYear);
    if(yearShort !=  nicYear){
      Alert.render("NIC and Date of Birth doesn't match.<br>Eg: 1992-xx-xx => 92xxxxxxxV");
      return;
    }

    if(sp == "" || sp== "0" || sp== 0){
      Alert.render("Selection Box is empty");
      return;
    }



    loginService.add(user);

    viewUsers();
    $scope.user= null;
    }
    else {
    Alert.render("Confirm password validation failed");
    }

  }
  $scope.back = function () {
    window.history.back();
  };
  //Delete
  $scope.deleteuser = function(id){
    loginService.delete(id);
    Alert.render("Successfully Deleted");
    viewUsers();
    //$scope.supplier= null;
  }
  //Clear
  $scope.clear=function(){
    $scope.user=null;
  }
}]);

app.controller('homeAssistanceController',['$scope','loginService','supplierService','$location',function ($scope,loginService,supplierService,$location) {
  $scope.logout = function(){
    loginService.logout();
  }
  //view user profile details
  function viewUser(){
    loginService.getUser().then(function(data){
      $scope.user = data;
    });
  }
  viewUser();
}]);

/*
app.controller('requestController',['$scope','loginService','drugService','requestService','$location',function ($scope,loginService,requestService,drugService,$location) {

  $scope.logout = function(){
    loginService.logout();
  }

  function viewDrug(){
    drugService.get().then(function(data){
      $scope.drugs = data;
      console.log(data);
    });
  }
  viewDrug();

  function viewRequest(){
    requestService.get().then(function(data){
      $scope.requests = data;

    });
  }
  viewRequest();

  //add Request
  $scope.addRequest = function(request){
    requestService.add(request);
    Alert.render("Successfully Inserted");
    $scope.request= null;
    viewRequest();

  }

  //Update Request
  $scope.updateRequest = function(id,request){
    requestService.update(id,request);

    $scope.request= null;
    viewRequest();
    Alert.render("Successfully Updated");
  }

  //Edit Request
  $scope.editRequest = function(id){
    requestService.getById(id).then(data => {
      $scope.request = data;
    });
    viewRequest();
  }


  //delete Request
  $scope.deleteRequest = function(id){
    requestService.delete(id);
    Alert.render("Successfully Deleted");
    viewRequest();

  }

  $scope.SearchRequest=function(id){
    requestService.getByIdView(id).then(data => {
      $scope.request = data;
    });
    viewRequest();
  }


  $scope.clear=function(){
    $scope.request=null;
  }


  $scope.approveReq = function(drugId,reqId,approve) {
    console.log(approve);
    /*if(approve.requestedquantity > approve.available){
    Alert.render("Available quantity is not enough!");
    $location.path('/viewrequest');
  }
  else {
  requestService.updateReq(reqId,approve).then(()=>{
  requestService.add();
});
}
}

//view user profile details
function viewUser(){
  loginService.getUser().then(function(data){
    $scope.user = data;
  });
}
viewUser();

}]);
*/

app.controller('homeChiefController',['$scope','loginService',function ($scope,loginService) {

  //view user profile details
  function viewUser(){
    loginService.getUser().then(function(data){
      $scope.user = data;
    });
  }
  viewUser();

  //logput
  $scope.logout = function(){
    loginService.logout();
  }

}]);
app.controller('profileController',['$scope','loginService',function ($scope,loginService) {
  $(function () {
    $('#datetimepicker1').datetimepicker();
  });
  //view user profile details
  function viewUser(){
    loginService.getUser().then((data)=>{
      $scope.user = data;
    });
  }
  viewUser();

  function viewUserById(id){
    loginService.getUserById(id).then((data)=>{
      $scope.user = data;
    });
  }
  //update user profile
  $scope.updateUser = function(id,user){
    loginService.update(id,user);
    Alert.render("Successfully Updated");
    $scope.supplier= null;
    viewUserById(id);
  }
  //logout
  $scope.logout = function(){
    loginService.logout();
  }

}]);

app.controller('supplierController',['$scope','supplierService','loginService','$location','$routeParams', function($scope,supplierService,loginService,$location,$routeParams){


  //view supplier details
  function viewSup(){
    supplierService.get().then(function(data){
      $scope.suppliers = data;
    });
  }
  viewSup();

  //view user profile
  function viewUser(){
    loginService.getUser().then(function(data){
      $scope.user = data;
    });
  }
  viewUser();

  //Add

  $scope.addSupplier = (supplier)=>{
    supplierService.add(supplier);
    Alert.render("Successfully Inserted");
    viewSup();
    $scope.supplier= null;
  }

  //Update
  $scope.updateSupplier = function(id,supplier){
    supplierService.update(id,supplier);
    Alert.render("Successfully Updated");
    $scope.supplier= null;
    viewSup();
  }
  //Edit
  $scope.editSup = function(id){
    supplierService.getById(id).then(data => {
      $scope.supplier = data;
    });
    viewSup();
    $scope.supplier= null;
  }
  //Delete
  $scope.deleteSupplier = function(id){
    supplierService.delete(id);
    Alert.render("Successfully Deleted");
    viewSup();
    //$scope.supplier= null;
  }
  //Clear
  $scope.clear=function(){
    $scope.supplier=null;
  }
  //Logout
  $scope.logout = function(){
    loginService.logout();
  };

}]);

app.controller('mailController',['$scope','loginService','supplierService','mailService','$location','drugService',function ($scope,loginService,supplierService,mailService,$location,drugrService) {

  $scope.logout = function(){
    loginService.logout();
  }
  function viewMails(){
    mailService.get().then((data)=>{
      $scope.mails = data;
    });
  }
  viewMails();
  //view supplier details
  function viewSup(){
    supplierService.get().then(function(data){
      $scope.suppliers = data;
      console.log(data);
    });
  }
  viewSup();

  //view user details
  function viewUser(){
    loginService.getUser().then(function(data){
      $scope.user = data;
    });
  }
  viewUser();



  //sending mail
  $scope.sendMail = function(mail){

    mailService.add(mail);
    Alert.render("Email has been sent");
    //viewSup();
    viewMails();
    $scope.mail= null;
    //viewMails();
  }

  //view details on selection box
  function viewDrug(){
    drugrService.get().then(function(data){
      $scope.drugs = data;
    });
  }
  viewDrug();
}]);
