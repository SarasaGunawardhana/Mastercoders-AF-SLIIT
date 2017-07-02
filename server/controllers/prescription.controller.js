'use strict';

app.controller('prescriptionController',['$scope','prescriptionService','drugService','loginService','supplierService','$location', function($scope,prescriptionService,loginService,supplierService,drugService,$location){




  $scope.pquantity=function(prescription){
      var a=prescription.dosage;
      var b=prescription.frequency;
      var c=prescription.period;
      var total=a*b*c;
      prescription.prescriptionquantity =total;

  }

//stock
  $scope.stockquantity=function(prescription){
    //  var a=prescription.dosage;
    //  var b=prescription.frequency;
    //  var c=prescription.period;
    //  var total=a*b*c;
      prescription.stockquantity = sadunika;



console.log(sadunika);


  }

  //stock
    $scope.availablequantity=function(prescription){

        var a=prescription.stockquantity;
        var b=prescription.prescriptionquantity;
        if(a > b){
        var total=a-b;
        prescription.availablequantity =total;
     }
      else{
        Alert.render("Cannot Dispense.No enough quantity. Request Drugs.");
      }


    }




//  viewing prescription
  function viewPrescription(){
    prescriptionService.get().then(function(data){
      $scope.prescriptions = data;

    });
  }
  viewPrescription();

  $scope.dispense = function(id,prescription){
    prescriptionService.update(id,prescription);

    $scope.prescription= null;
     viewPrescription();
       Alert.render("Successfully Dispensed");
  }

  //add prescription
  $scope.addPrescription = function(prescription){
    prescriptionService.add(prescription);
   Alert.render("Successfully Inserted");
   $scope.prescription= null;
   viewPrescription();

  }
  //Update prescription
  $scope.updatePrescription = function(id,prescription){
    prescriptionService.update(id,prescription);

    $scope.prescription= null;
     viewPrescription();
       Alert.render("Successfully Updated");
  }
    //Edit prescription
      $scope.editPrescription = function(id){
        prescriptionService.getById(id).then(data => {
          $scope.prescription = data;
        });
      viewPrescription();
    }


//delete prescription
$scope.deletePrescription = function(id){
  prescriptionService.delete(id);
  Alert.render("Successfully Deleted");
   viewPrescription();

}

$scope.clear=function(){
    $scope.prescription=null;
}

//view user details
function viewUser(){
  loginService.getUser().then(function(data){
    $scope.user = data;
  });
}

$scope.logout = function(){
    console.log("sdfsdfsdfs");
  loginService.logout();
}

}]);
