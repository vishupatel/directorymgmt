angular.module("project", []).
controller("TreeController", function($scope, $http) {
    $scope.delete = function(data) {
        data.nodes = [];
    };
    $scope.currentNode = [];
    $scope.popupFor = "";
    $scope.detailList = [];
    $scope.list = {};
    $scope.currentObject = "";
    $scope.add = function(data) {
        var post = data.nodes.length + 1;
        var newName = data.name + '-' + post;
        data.nodes.push({name: newName,nodes: []});
    };
    $scope.tree = [{name: "D:", 'fullpath' : 'D:' ,  nodes: []}];
    $scope.popupNodes = [{name: "D:", 'fullpath' : 'D:' ,  nodes: []}];
    $scope.getDirList = function(node){
        $scope.copyFrom = node.fullpath;
        $scope.currentNode = node;
        $http({
            method: 'POST',
            url: 'http://localhost:8080/api/get-dir?name=' + node.fullpath,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success( function (response) {
            node.nodes = response;  
            $scope.detailList = response;
       });
    }

    $scope.getDirList($scope.tree[0]);
    $scope.getPopupDirList = function(node){

        $scope.destinationPath =  node.fullpath;    
        $http({
            method: 'POST',
            url: 'http://localhost:8080/api/get-dir?name=' + node.fullpath,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success( function (response) {
            node.nodes = response;  
       });
    };

     $scope.openPopup = function(popupFor){
            var dataObj = [];
            for(i= 0 ; i < $scope.detailList.dir.length; i++ )
            {
                if($scope.detailList.dir[i].checked){
                    dataObj.push($scope.detailList.dir[i].fullpath);
                }
            }

            for(i= 0 ; i < $scope.detailList.files.length; i++ )
            {
                if($scope.detailList.files[i].checked){
                    dataObj.push($scope.detailList.files[i].fullpath);
                }
            }
        if(dataObj.length == 0 ){
            alert("Please select item");
            return;
        }    
        $scope.popupFor = popupFor;
        $('#myModal').modal('show');
     }   

     $scope.creteFile = function(){
        $('#createFile').modal('show');
     }

     $scope.createFilePost = function(){
        var finelObject = { fileName : $scope.newFileName , fileContent : $scope.fileContent, createIn : $scope.copyFrom};        
        $http({
                method: 'POST',
                url: 'http://localhost:8080/api/createFile',
                data : 'data=' + JSON.stringify(finelObject),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success( function (response) {
                $scope.getDirList($scope.currentNode);
                $scope.newFileName = "";
                $scope.fileContent = "";
                $('#createFile').modal('hide');
           });
     }

     $scope.copyFiles = function(){
            var dataObj = [];
            
            for(i= 0 ; i < $scope.detailList.dir.length; i++ )
            {
                if($scope.detailList.dir[i].checked){
                    dataObj.push($scope.detailList.dir[i].name);
                }
            }

            for(i= 0 ; i < $scope.detailList.files.length; i++ )
            {
                if($scope.detailList.files[i].checked){
                    dataObj.push($scope.detailList.files[i].name);
                }
            }

            var finelObject = { files : dataObj , copyTo : $scope.destinationPath, copyFrom : $scope.copyFrom};
            $http({
                method: 'POST',
                url: 'http://localhost:8080/api/copyFiles',
                data : 'data=' + JSON.stringify(finelObject),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success( function (response) {
                $scope.getDirList($scope.currentNode);
           });  
     }


     $scope.moveFiles = function(){
            var dataObj = [];
            
            for(i= 0 ; i < $scope.detailList.dir.length; i++ )
            {
                if($scope.detailList.dir[i].checked){
                    dataObj.push($scope.detailList.dir[i].name);
                }
            }

            for(i= 0 ; i < $scope.detailList.files.length; i++ )
            {
                if($scope.detailList.files[i].checked){
                    dataObj.push($scope.detailList.files[i].name);
                }
            }

            var finelObject = { files : dataObj , copyTo : $scope.destinationPath, copyFrom : $scope.copyFrom};
            $http({
                method: 'POST',
                url: 'http://localhost:8080/api/moveFiles',
                data : 'data=' + JSON.stringify(finelObject),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success( function (response) {
                $scope.getDirList($scope.currentNode);
           });  
     }

     $scope.deleteFiles = function(){
            var dataObj = [];
            
            for(i= 0 ; i < $scope.detailList.dir.length; i++ )
            {
                if($scope.detailList.dir[i].checked){
                    dataObj.push($scope.detailList.dir[i].name);
                }
            }

            for(i= 0 ; i < $scope.detailList.files.length; i++ )
            {
                if($scope.detailList.files[i].checked){
                    dataObj.push($scope.detailList.files[i].name);
                }
            }

            var finelObject = { files : dataObj , copyTo : $scope.destinationPath, copyFrom : $scope.copyFrom};
            $http({
                method: 'POST',
                url: 'http://localhost:8080/api/deleteFiles',
                data : 'data=' + JSON.stringify(finelObject),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success( function (response) {
                $scope.getDirList($scope.currentNode);
           });  
     }


     $scope.doOperation = function(){
        $('#myModal').modal('hide');
        if($scope.popupFor == "Copy"){
            $scope.copyFiles();    
        }else if($scope.popupFor == "Move"){
            $scope.moveFiles();    
        }else {

        }
        
     }


    $scope.creteDir = function(){
        $('#createDir').modal('show');
     }

     $scope.createDirPost = function(){
        var finelObject = { fileName : $scope.dirName ,  createIn : $scope.copyFrom};        
        $http({
                method: 'POST',
                url: 'http://localhost:8080/api/createDir',
                data : 'data=' + JSON.stringify(finelObject),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success( function (response) {
                $scope.getDirList($scope.currentNode);
                $scope.newFileName = "";
                $scope.fileContent = "";
                $('#createDir').modal('hide');
           });
     }


     $scope.rename = function(node){
        $scope.currentObject = node;
        $scope.newName = node.name;
        $('#rename').modal('show');
     }

     $scope.renamePost = function(){
        var finelObject = { fileName : $scope.currentObject.name ,  createIn : $scope.copyFrom , newName : $scope.newName};        
        $http({
                method: 'POST',
                url: 'http://localhost:8080/api/rename',
                data : 'data=' + JSON.stringify(finelObject),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success( function (response) {
                $scope.getDirList($scope.currentNode);
                $('#rename').modal('hide');
           });
     }



});