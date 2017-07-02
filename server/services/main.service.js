'use strict';
var userProfile="";
app.factory('loginService',['$http','$location',function ($http, $location) {

  return {
    get : function() {
      $http.get('/').then((response)=>{
        if (response.data == "OK") {
          $location.path('/home');
        }
      }).catch(function(response){
        $location.path('/');
      });
    },
    signin : function (login) {
      $http.post('/login',login).then((response)=>{
        userProfile=response.data._id;
        if (response.data.type == "chief") {
          $location.path('/home_chief');
        }
        else if (response.data.type == "assistance") {
          $location.path('/home_assistance');
        }
        else if (response.data.type == "admin") {
          $location.path('/adminpanel');
        }
      }).catch(function(response){
        $location.path('/');
      });
    },
    add : function(user){
      console.log(user);
      $http.post('/users',user).then(function(response){
        console.log(response.data);
        if (response.data == "OK") {
          Alert.render("Successfully Inserted");
          $location.path('/adminpanel');
        }
      }).catch(function(response){
        Alert.render("Problem in inserting!");
      });
    },
    getUser: () => $http.get('/users/' + userProfile).then(function(response){
      return response.data;
    }).catch(function(response){
      return response.data;
    }),
    getUsers: () => $http.get('/users').then(function(response){
      return response.data;
    }).catch(function(response){
      return response.data;
    }),
    getUserById: (id) => $http.get('/users/' + id).then(function(response){
      return response.data;
    }).catch(function(response){
      return response.data;
    }),
    delete: id => $http.delete('/users/' + id).then(function(response){
      console.log("Successfully Deleted");
      //return response.data;
    }).catch(function(response){
      console.log(" Error in delete");
      //return response.data;
    }),
    logout : function () {
      $http.get('/logout').then((response)=>{
        if (response.data == "OK") {
          $location.path('/');
          console.log("Super");
        }
        console.log("Done");
      }).catch(function(response){
        //$location.path('/catc');
        console.log("No Done");
      });
    }

  }
}]);
app.factory('supplierService',['$http','$location',function ($http, $location) {
  return {

    getById: id => $http.get('/suppliers/' + id).then(function(response){
      return response.data;
    }).catch(function(response){
      return response.data;
    }),
    get : () =>{
      return $http.get('/suppliers').then((response)=>{

        return response.data;
      }).catch((response)=>{
        return response.data;
      });
    },
    add : function(supplier){
      $http.post('/suppliers',supplier).then(function(response){
        if (response.data == "OK") {
          $location.path('/supplier');
        }
      }).catch(function(response){
        $location.path('/');
      });
    },
    update : function(id,supplier){
      $http.put('/suppliers/'+id,supplier).then(function(response){
        console.log("success in update :"+response.data );
      }).catch(function(response){
        console.log("Error in update :"+response.data );
      });
    },
    delete: id => $http.delete('/suppliers/' + id).then(function(response){
      console.log("Successfully Deleted");
      //return response.data;
    }).catch(function(response){
      console.log(" Error in delete");
      //return response.data;
    })
  }

}]);

app.factory('mailService',['$http','$location',function ($http, $location) {
  return {
    getById: id => $http.get('/mails/' + id).then(function(response){
      return response.data;
    }).catch(function(response){
      return response.data;
    }),
    get : () =>{
      return $http.get('/mails').then(function(response){
        return response.data;
      }).catch(function(response){
        return response.data;
      });
    },
    add : (mail)=>{
      $http.post('/mails',mail).then(function(response){
        if (response.data == "OK") {
          $location.path('/mailer');
        }
      }).catch(function(response){
        $location.path('/');
      });
    },
    update : (id,mail)=>{
      $http.put('/mails/'+id,mail).then(function(response){
        console.log("success in update :"+response.data );
      }).catch(function(response){
        console.log("Error in update :"+response.data );
      });
    },
    delete: id => $http.delete('/mails/' + id).then(function(response){
      console.log("Successfully Deleted");
    }).catch(function(response){
      console.log(" Error in delete");
    })
  }

}]);

/////////////////////////////////////////DRUGS /////////////////////////////////////////////////////////////////

'use strict';

app.factory('drugService',['$http','$location',function ($http, $location) {
  return {


    getById: id => $http.get('/drug/' + id).then(function(response){
      return response.data;
    }).catch(function(response){
      return response.data;
    }),

    get : () =>{

      return $http.get('/drug').then(function(response){
        return response.data;
      }).catch(function(response){
        return response.data;
      });
    },


    add : function(drug){
      $http.post('/drug',drug).then(function(response){
        console.log("values :"+response.data );
        if (response.data == "OK") {
          $location.path('/drugDetails');
        }
      }).catch(function(response){
        $location.path('/');
      });
    },


    update : function(id,drug){
      $http.put('/drug/'+id,drug).then(function(response){
        console.log("success in update :"+response.data );
      }).catch(function(response){
        console.log("Error in update :"+response.data );
      });
    },


    delete: id => $http.delete('/drug/' + id).then(function(response){
      console.log("Successfully Deleted");

    }).catch(function(response){
      console.log(" Error in delete");

    }),

    ///////////////////////////batch///////////////////////////////////

    deleteBatch: id => $http.delete('/batch/' + id).then(function(response){
      console.log("Successfully Deleted");

    }).catch(function(response){
      console.log(" Error in delete");

    }),


    addBatch: (id, batch) => $http.post('/drug/' + id + '/batches', batch).then(function(response){
      console.log("success in adding :"+response.data );
    }).catch(function(response){

      console.log("Error in adding :"+response.data );

    }),

    ///////////////////////////////////////////////////////////////view batch details//////////////

    getBatch : () =>{

      return $http.get('/batch').then(function(response){
        return response.data;
      }).catch(function(response){
        return response.data;
      });
    },



    ////////////////////////////////////////////stock///////////////////////////////////////////////////
    getStock : () =>{

      return $http.get('/stock').then(function(response){

        return response.data;
      }).catch(function(response){
        return response.data;
      });
    },


    getStockD : function(dname,dcat,dtype){

      return   $http.get('/stock/'+ dname + '/stocks/' + dcat + '/stocked/' + dtype ).then(function(response){
        return response.data;

      }).catch(function(response){
        return response.data;

      });
    },



  }

}]);



///////////////////////////////////////////////////DISPENSE////////////////////////////////////////////

app.factory('requestService',['$http','$location', function ($http,$location) {
  return {
    getById: id => $http.get('/request/' + id).then(function(response){
      return response.data;
    }).catch(function(response){
      return response.data;
    }),

    get : () =>{

      return $http.get('/request').then(function(response){
        return response.data;
      }).catch(function(response){
        return response.data;
      });
    },


    add : function(request){
      $http.post('/request',request).then(function(response){
        console.log("values :"+response.data );
        if (response.data == "OK") {
          $location.path('/requestDetails');
        }
      }).catch(function(response){
        $location.path('/');
      });
    },
    update : function(id,request){
      $http.put('/request/'+id,request).then(function(response){

      }).catch(function(response){

      });
    },

    delete: id => $http.delete('/request/' + id).then(function(response){
      console.log("Successfully Deleted");

    }).catch(function(response){
      console.log(" Error in delete");

    }),
/*
    updateReq : function(id,approve){
      $http.put('/requests/'+id,approve).then(function(response){
        console.log("success in update :"+response.data );
      }).catch(function(response){

      });
    }*/
  }
}]);

app.factory('prescriptionService',['$http','$location',function ($http, $location) {
  return {
    getById: id => $http.get('/prescription/' + id).then(function(response){
      return response.data;
    }).catch(function(response){
      return response.data;
    }),

    get : () =>{
      console.log("sarasa");
      return $http.get('/prescription').then(function(response){
        return response.data;
      }).catch(function(response){
        return response.data;
      });
    },


    add : function(prescription){
      $http.post('/prescription',prescription).then(function(response){
        console.log("values :"+response.data );
        if (response.data == "OK") {
          $location.path('/prescriptionDetails');
        }
      }).catch(function(response){
        $location.path('/');
      });
    },
    update : function(id,prescription){
      $http.put('/prescription/'+id,prescription).then(function(response){
        console.log("success in update :"+response.data );
      }).catch(function(response){
        console.log("Error in update :"+response.data );
      });
    },

    delete: id => $http.delete('/prescription/' + id).then(function(response){
      console.log("Successfully Deleted");

    }).catch(function(response){
      console.log(" Error in delete");

    })



  }

}]);
