function PMTAController(){
}



PMTAController.prototype.init = function(){
}

PMTAController.get = function(){

}

PMTAController.configToXml = function(data){
	data = data.replace(new RegExp("<virtual-mta ", "g"), "<virtual-mta>");
	data = data.replace(new RegExp("<domain ", "g"), "<domain>");
	data = data.replace(new RegExp("</virtual-mta>", "g"), "</virtual-mta><!>");
	return data;
}

PMTAController.getVMTAsFromConfig = function(configPath, FileSystem){
	var data = FileSystem.readFileSync(configPath, "utf-8");
	var xmlParser = new require("xml2js").Parser();
	var xmlNodes = PMTAController.configToXml(data).split("<!>");
	var results = new Array();
	var numberOfXmlNodes = xmlNodes.length;

	for(var i=0; i < numberOfXmlNodes; i++){
		var xmlNode = xmlNodes[i];
		if(xmlNode != null){
			xmlParser.parseString(xmlNode, function(error, result){
				if(error){
					console.log(error);
				}

				if(result != null){
					results.push(result);
				}
				
			});
		}
	}
	return results;
}

module.exports = PMTAController;