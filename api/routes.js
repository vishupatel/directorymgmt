var fse = require('fs-extra');
var fs = require('fs');
var querystring = require('querystring');
var path = require('path');
//var data = require('./data');




module.exports = function (app, io) {
	app.post('/api/get-dir', function (req, res) {
		
		var srcpath = req.query.name + "/";
		var array = [];
		var fullName = [];
		var files = [];

		fse.readdirSync(srcpath).filter(function(file) {
			fullName.push(file);
		});
		res.contentType('application/json');
		
		console.log(state);
		for(i = 0 ; i < fullName.length; i++){
			try {
				var state = fs.statSync(path.resolve( srcpath + fullName[i]));	
				if(state.isDirectory()){
			    	array.push({"name" : fullName[i], "fullpath" : srcpath + fullName[i] , "nodes" : []});
				}else{
					
					files.push({"name" : fullName[i], "fullpath" : srcpath + fullName[i] , "nodes" : [], time : state.mtime });
				}
			 } catch(err) {
			   
			 } 
		}
		
		var finalResule = {"files" : files , "dir" : array}; 

		myJSONstring = JSON.stringify(finalResule);
		res.send(myJSONstring);
	});

	app.post('/api/copyFiles', function(req, res){		
		req.on('data', function(chunk) {
			
			var data = querystring.parse(chunk.toString());
			var requestData = JSON.parse(data.data);
			var files = requestData.files;
			var copyTo = requestData.copyTo;
			var copyFrom = requestData.copyFrom;
			var status = 1;
			console.log(files);
			for(i = 0 ; i < files.length; i++ ){
				fse.copy(copyFrom + "/" + files[i], copyTo + "/" +  files[i], function(err){
					if(err){
						status = 0;	
					}
				});
			}
			var finalResule = {"status" : status}; 
			myJSONstring = JSON.stringify(finalResule);
			res.send(myJSONstring);
		});
	});

	app.post('/api/moveFiles', function(req, res){		
		req.on('data', function(chunk) {
			
			var data = querystring.parse(chunk.toString());
			var requestData = JSON.parse(data.data);
			var files = requestData.files;
			var copyTo = requestData.copyTo;
			var copyFrom = requestData.copyFrom;
			var status = 1;
			console.log(files);
			for(i = 0 ; i < files.length; i++ ){
				fse.move(copyFrom + "/" + files[i], copyTo + "/" +  files[i], function(err){
					if(err){
						status = 0;	
					}
				});
			}
			var finalResule = {"status" : status}; 
			myJSONstring = JSON.stringify(finalResule);
			res.send(myJSONstring);
		});
	});

	app.post('/api/createFile', function(req, res){		
		req.on('data', function(chunk) {
			
			var data = querystring.parse(chunk.toString());
			var requestData = JSON.parse(data.data);
			var fileName = requestData.fileName;
			var fileContent = requestData.fileContent;
			var createIn = requestData.createIn;
			var status = 1;
			
			var ws = fse.createOutputStream(createIn + '/' + fileName);
			ws.write(fileContent);
			
			var finalResule = {"status" : status}; 
			myJSONstring = JSON.stringify(finalResule);
			res.send(myJSONstring);
		});
	});


	app.post('/api/deleteFiles', function(req, res){		
		req.on('data', function(chunk) {
			
			var data = querystring.parse(chunk.toString());
			var requestData = JSON.parse(data.data);
			var files = requestData.files;
			var copyTo = requestData.copyTo;
			var copyFrom = requestData.copyFrom;
			var status = 1;
			console.log(files);
			for(i = 0 ; i < files.length; i++ ){
				fse.remove(copyFrom + "/" + files[i], function(err){
					if(err){
						status = 0;	
					}
				});
			}
			var finalResule = {"status" : status}; 
			myJSONstring = JSON.stringify(finalResule);
			res.send(myJSONstring);
		});
	});

	app.post('/api/createDir', function(req, res){		
		req.on('data', function(chunk) {
			
			var data = querystring.parse(chunk.toString());
			var requestData = JSON.parse(data.data);
			var fileName = requestData.fileName;
			var createIn = requestData.createIn;
			var status = 1;
			

			fse.ensureDir(createIn + '/' + fileName, function (err) {
			  console.log(err) // => null
			});
			
			var finalResule = {"status" : status}; 
			myJSONstring = JSON.stringify(finalResule);
			res.send(myJSONstring);
		});
	});


	app.post('/api/rename', function(req, res){		
		req.on('data', function(chunk) {
			

			var data = querystring.parse(chunk.toString());
			var requestData = JSON.parse(data.data);
			
			console.log(requestData);
			var fileName = requestData.fileName;
			var createIn = requestData.createIn;
			var newName = requestData.newName;
			
			fse.rename( createIn + "/" + fileName , createIn + "/" + newName, function(){

			});
			var finalResule = {"status" : 1}; 
			myJSONstring = JSON.stringify(finalResule);
			res.send(myJSONstring);
		});
	});


}