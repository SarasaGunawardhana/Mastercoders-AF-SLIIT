'use strict';

app.controller('requestController',['$scope','requestService','loginService','prescriptionService','supplierService','$location', function($scope,requestService,loginService,prescriptionService,supplierService,$location){


//  viewing request
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
$scope.logout = function(){
  console.log("sdfsdfsdfs");
  loginService.logout();
}


}]);
