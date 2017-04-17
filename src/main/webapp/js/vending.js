/*global angular*/

var mApp = angular.module('machineApp', ['ngMessages', 'ngResource']);

mApp.controller('machineController', ['$scope', '$log', '$http', '$filter', function($scope, $log, $http, $filter){
                                    //using array form of dependency injection to avoid losing
                                    //variable names during minification
    $http.get('items')
            .then(function(response) {
                $scope.items = response.data;
                var list = $scope.items;
                $log.log(list);
                
            });
    
    $scope.purchaseItem = function(id){
        alert(id);
        $http.get('item/' + id)
                .then(function(response){
                    $scope.item = response.data;
            //ppp
                    var itemCost = item.cost;
                    var amount = $("#amount").val();
                    var sum = amount - itemCost;
                    document.getElementById("changeBack").innerHTML = sum.toFixed(2);
                    $("#vendItem").show();
                    var itemInv = item.inventory - 1;
                    //ppppppp
                });
    };
    
    

}]);

//playing with angularJS========================
//    console.log($scope);
//    $log.log('log stuff');
//    $log.info('some info');
//    $log.warn("here's a warning");
//    $log.debug("stuff to debug");
//    $log.error("error stuff");
//    
//    $scope.name = 'Jane Doe';
//    $scope.formattedname = $filter('uppercase')($scope.name);
//    $log.info($scope.name);
//    $log.info($scope.formattedname);
//
//var searchPeople = function(name, $scope, age, birthday){
//    return 'Jane Doe';
//};
//console.log(searchPeople()); //returns 'Jane Doe'
//console.log(searchPeople); //returns entire function
//console.log(searchPeople.toString()); //returns String of entire function
//
//console.log(angular.injector().annotate(searchPeople)); //parts the string and creates an array of each parameter
//===============================================

//$(document).ready(function(){
//    
//    loadItems();
//    
//});
//
//function loadItems(){
//    
//    $.ajax({
//        url : 'items',
//        type : 'GET'
//    }).success(function(data){
//        processItemMachine(data);
//        
//    });
//}


//$('#itemRows').empty();
//                var itemRows = $('#itemRows');
//                var itemRow = $("<div class='row clearfix'>");
//                $.each(list, function(index, item){

//                    var nameField = $("<div class='col-xs-3 col-sm-3 col-md-3 col-lg-3 clearfix item'>");
//
//                    var nameButton = $("<button>");

//                    nameButton.attr({
//                        'onclick' : 'purchaseItem(' +item.id+'); return false;' 
//                    });
//                    nameButton.text(item.name + ' ' + '$' + item.cost); 
//                    nameField.append(nameButton);
//
//                    if (index % 3 === 0){ //creates rows of 4 items
//                        itemRow = $("<div class='row clearfix'>");
//                    }
//
//                    itemRow.append(nameField);
//
//                    itemRows.append(itemRow);
//                });


function purchaseItem(id){
    
    $.ajax({
        type: 'GET',
        url : 'item/' + id,
        headers: {
            'Accept': 'application/json'
        }
    }).success(function(item){
        
        var itemName = item.name;
        
        var itemCost = item.cost;
        var amount = $("#amount").val();
        var sum = amount - itemCost;
        document.getElementById("changeBack").innerHTML = sum.toFixed(2);
        $("#vendItem").show();
        var itemInv = item.inventory - 1;
        
        $.ajax({
            type: 'PUT',
            url: 'item/' + id,
            headers: {
                'Content-type': 'application/json'
            },
            'dataType' : 'json',
            data : JSON.stringify({
                name : itemName,
                cost : itemCost,
                inventory : itemInv
            })
        }).success(function(item){
            loadItems();
            $("#amount").val('');
        });
    
    });
        
}


