'use strict';
var prescriptiontot="";
app.controller('drugController',['$scope','drugService','loginService','supplierService','$location', function($scope,drugService,loginService,supplierService,$location){

  $scope.logout = function(){
    loginService.logout();
  };

//  viewing drug
  function viewdrug(){
    drugService.get().then(function(data){
        var val=data.dname;
      $scope.drugs = data;

    });
  }
  viewdrug();

  //add drug
  $scope.addDrug = function(drug){

      if($scope.drug.dtype==null || $scope.drug.dprice==null || $scope.drug.dcat==null || $scope.drug.dname==null|| $scope.drug.ddanger==null || $scope.drug.dreorder==null || $scope.drug.dremark==null ){
          Alert.render("Empty Fields Please fill  ");
      }

       else{
          drugService.add(drug);
          Alert.render("Successfully Inserted");
          $scope.drug= null;
          viewdrug();
      }


  }
  //Update
  $scope.updateDrug = function(id,drug){


      if($scope.drug.dtype==null || $scope.drug.dprice==null || $scope.drug.dcat==null || $scope.drug.dname==null|| $scope.drug.ddanger==null || $scope.drug.dreorder==null || $scope.drug.dremark==null ){
          Alert.render("Empty Fields Please fill  ");
      }

    else{

          drugService.update(id,drug);
          $scope.drug= null;
          Alert.render("Successfully Updated");
          viewdrug();

      }


  }
    //Edit
      $scope.editDrug = function(id){
        drugService.getById(id).then(data => {
          $scope.drug = data;
        });
      viewdrug();
    }


//delete
$scope.deleteDrug = function(id){
  drugService.delete(id);
  Alert.render("Successfully Deleted");
   viewdrug();

}

$scope.SearchDrug=function(id){
  drugService.getByIdView(id).then(data => {
    $scope.drug = data;
  });
viewdrug();
}


$scope.clear=function(){
    $scope.drug=null;
}

}]);









app.controller('batchController',['$scope','drugService','$routeParams','loginService','supplierService','$location', function($scope,drugService,$routeParams,loginService,supplierService,$location){


    $scope.logout = function(){
        loginService.logout();
    };


    $scope.quantity=function(batch){
        var a=batch.nofcartoons;
        var b=batch.nofcards;
        var c=batch.noftablets;
        var total=a*b*c;
        batch.quantity =total;

    }


///view batch by drug id///////
    function viewBatch() {

        drugService.getById($routeParams.id).then(drug => {

            $scope.batch={};
            $scope.batch.dcat=drug.dcat;
            $scope.batch.dname=drug.dname;
            $scope.batch.dtype=drug.dtype;


            $scope.drug=drug;

        });
    }

    viewBatch();





//add batch
    $scope.addBatch = (batch) => {


        if($scope.batch.dtype==null || $scope.batch.dname==null || $scope.batch.dcat==null || $scope.batch.nofcards==null|| $scope.batch.batchno==null || $scope.batch.contentType==null || $scope.batch.content==null || $scope.batch.nofcartoons==null|| $scope.batch.noftablets==null|| $scope.batch.edate==null|| $scope.batch.mdate==null|| $scope.batch.quantity==null ){
            Alert.render("Empty Fields Please fill  ");
        }
        else{

            const id=$routeParams.id;
            drugService.addBatch(id, batch).then((drug) => {

                $scope.drug = drug;
                Alert.render("Successfully Inserted");
                viewBatch();
                $scope.batch= null;
            });


        }


    };


    //delete batch

    $scope.deleteBatch = function(id){
        console.log(id);
        drugService.deleteBatch(id);
        Alert.render("Successfully Deleted");
        viewBatch();

    }


}]);


app.controller('viewBatchController',['$scope','drugService','$routeParams','loginService','supplierService','$location', function($scope,drugService,$routeParams,loginService,supplierService,$location){


    $scope.logout = function(){
        loginService.logout();
    };


    function viewBatchDetails(){
        drugService.getBatch().then(function(batch){
            $scope.batches = batch;

        });
    }

    viewBatchDetails();



}]);


app.controller('stockController',['$scope','drugService','$routeParams','loginService','supplierService','$location', function($scope,drugService,$routeParams,loginService,supplierService,$location){


    $scope.logout = function(){
        loginService.logout();
    };


    function viewStock() {

        drugService.getStock().then(stock => {

            for (var i = 0; i < stock.length; i++) {

            for (var obj in stock[i]) {

                var dname = stock[i]._id.dname;
                var dcat = stock[i]._id.dcat;
                var dtype = stock[i]._id.dtype;

                var total = stock[i].total;
                prescriptiontot=total;

                set_values(dname,dcat,dtype,total,i);

            }

        }

            function set_values(dname,dcat,dtype,total,i){

                drugService.getStockD(dname,dcat,dtype).then(drug=>{

                    console.log(drug);

                    var reoder=drug[0].dreorder;
                    var danger=drug[0].ddanger;
                    var price =drug[0].dprice;


                    if( total > danger && total > reoder)  {
                        stock[i].status="okay";
                        stock[i].price=price;
                        $scope.stocks = stock;
                    }
                    if( total < reoder && total>danger){
                        stock[i].status="less than re-order";
                        stock[i].price=price;
                        $scope.stocks = stock;
                    }
                    if( total < reoder && total < danger){
                        stock[i].status="danger";
                        stock[i].price=price;
                        $scope.stocks = stock;
                    }




                });//end of the getting reoreder and dangers


            }//end of the setting function




        });//end of stock getting
    }//end of the viewstock function


    viewStock();

    $scope.viewPdf = function(){
        console.log("awooo");
        html2canvas(document.getElementById('exportthis'), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500,
                    }]
                };
                console.log("awooovvvv");
                pdfMake.createPdf(docDefinition).download("Stock.pdf");
            }
        });
    };

}]);