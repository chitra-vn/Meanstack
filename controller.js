/*angular.module('myApp',["xeditable"])
    .controller('AppCtrl',AppCtrl);*/

    var app = angular.module('myApp',["xeditable"]);
    app.controller('AppCtrl',AppCtrl);

    app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

function AppCtrl($scope,$http){
  console.log("hello world from controller");

        $http.get('/booklist').then(function(response){
            console.log("i got the data requested",response);
            $scope.booklist=response;
  });

     $scope.addBook=function(){
        console.log($scope.book);
        $http.post('/booklist',$scope.book).then(function(response){
             console.log(response);
             location.reload();
             });
  };
  $scope.delete=function(id){
      console.log(id);
      $http.delete('/booklist/'+id).then(function(response){
            location.reload();
      });
  };

 /* $scope.edit=function(id){
        console.log($scope.book);
        $http.get('/booklist/'+id).then(function(response){
            $scope.book=response;
            console.log(response);
        });
  };*/

 $scope.updateBook=function(data,id){
        console.log(data,id);
        $http.put('/booklist/'+id,data).then(function(response){
            console.log(response);
            location.reload();
      });
       /* $http.put('/booklist/'+$scope.book._id,$scope.book).then(function(response){
            location.reload();
      });*/
  };
}   