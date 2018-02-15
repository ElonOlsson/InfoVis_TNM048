/**
* k means algorithm
* @param data
* @param k
* @return {Object}
*/

function kmeans(data, k) {

	//Implement the algorithm here..
	//Remember to reference any code that you have not implemented yourself! 

	/***********
	*Functions
	************/
	function creatCentroid(){
		for(var i=0 ; i<k ; ++i){
			var c = Math.floor((Math.random() * data.length) + 1);
			console.log(c);
			centroidArray.push(data[c]);
			console.log("what's inside centroidArray at position A: " + i + " : " + centroidArray[i].A);
		}
	};
	function assignDataToCentroid(){
		//set to empty
		for (var i = 0; i < k; ++i) {
            assignedData[i] = [];
        }
        console.log("Size of k: " + k + ". Size of assignedData: " + assignedData.length);
	
		//calculate
		for (var i = 0; i < data.length; ++i) {	//for each dataelement
			var distance = 1000;
			var closesedCentroidIndex = 0;

            for (var j = 0; j < k; ++j) {		//for each cluster
                //var theSmallestDistance = Math.sqrt(Math.pow(centroidArray[j].A - data[i].A, 2) + Math.pow(centroidArray[j].B - data[i].B, 2) + Math.pow(centroidArray[j].C - data[i].C, 2));
				var theSmallestDistance = calculateEuclideanDistance(data[i], centroidArray[j]);
				if (theSmallestDistance <= distance) {
					distance = theSmallestDistance;
					//peka på just den här centroiden;
					closesedCentroidIndex = j;
				}
			}
			assignedData[closesedCentroidIndex].push(data[i]);	//pusha in dataelement istället för int
		}
		console.log(assignedData[0][0]);
		console.log(assignedData[1][0]);
		console.log(assignedData[2][0]);
		console.log(assignedData[3][0]);
		
	};
	function calculateEuclideanDistance(p1, p2){
		for(var i=0 ; i<nrOfDim ; ++i){
			//något med keys. A-A, B-B ...etc
		}
		
		return Math.abs(p1-p2);
	};
	
	function calculateClusterAverage(c){
		//var newC = ?
		for(var i=0 ; i<nrOfDim ; ++i){
			//något med keys. Loopar antal dimensioner.
			//räkna ut average
		}
		return newC;
		
	};
	
	function squaredDistance(p1, p2){
		//något med key. loopa dimensioner
		//Math.pow( key YAO ,2);
		
	};
	
	/**********
	*Main
	***********/

	var selection = d3.selectAll(data);
	var nrOfDim = Object.keys(selection._groups[0][1]).length;    //int på vilken dimension
	console.log("nrOfDim = " + nrOfDim);
	console.log("selection.A = " + selection._groups[0][1].A);


	//1. Randomly place k points. Initial centroids
	var centroidArray = [];
	creatCentroid();
	
	do{
		//2. Assign all items to the closest centroid with euclidiskt avstånd
		var assignedData = [];
		assignDataToCentroid();
		
		//3. recalculate the posision of the k centroids to be in the center of the cluster
		//   This is achieved by calculating the average values in all dimensions.
		var average = 0;
		for(var i=0 ; i<k ; ++i){
			centroidArray[i] = calculateClusterAverage(centroidArray[i]);
		}
		
		//4. Check the quality of the cluster. Use the sum of the squared distance within each cluster as your measure of quality.
		//  räkna ut summan.
		//var theSmallestDistance= Math.sqrt((centroidArray[j].A - data[i].A)^2 + (centroidArray[j].B - data[i].B)^2 + (centroidArray[j].C - data[i].C)^2);
		
		//calculate tot error
		var totError = 0;
		for(var i=0 ; i<k ; ++i){	//for each cluster
			var sumSqaredDistance=0;
			for(var j = 0; j < assignedData[i].length; ++j){
				sumSqaredDistance += squaredDistance(data[assignedData[i][j]], centroidArray[i]);
			}
			totError +=sumSqaredDistance;
		}
			
	//chick quality
	}while(totError > 0.00001);
	return assignData;	
};


