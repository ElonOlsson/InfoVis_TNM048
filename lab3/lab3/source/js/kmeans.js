/**
* k means algorithm
* @param data
* @param k
* @return {Object}
*/





//note to self: kolla så inte centroidArray har dataobject, utan istället själva positionen.



function kmeans(data, k) {

	//Implement the algorithm here..
	//Remember to reference any code that you have not implemented yourself! 
    var assignedData =[];
	/***********
	*Functions
	************/
	function creatCentroid(){
		for(var i=0 ; i<k ; ++i){
			var c = Math.floor((Math.random() * data.length) + 1);
			//
			var liten = [];
			for(datapoint in data[0]){
				liten.push(data[c][datapoint]);
			}
			//console.log(liten);
			centroidArray.push(liten);
    	}
	};
	function assignDataToCentroid(){
		//set to empty
        for (var i = 0; i < k; ++i) {
            assignedData[i] = [];
        }

		//calculate
		for (var i = 0; i < data.length; ++i) {	//for each dataelement
			var distance = 1000;
			var closesedCentroidIndex = 0;

            for (var j = 0; j < k; ++j) {		//for each cluster
                var theSmallestDistance = calculateEuclideanDistance(data[i], centroidArray[j]);
				if (theSmallestDistance <= distance) {
					distance = theSmallestDistance;
					//peka på just den här centroiden;
					closesedCentroidIndex = j;
				}
			}
			assignedData[closesedCentroidIndex].push(data[i]);	//pusha in dataelement istället för int
		}
	};
	function calculateEuclideanDistance(p1, p2) {
    	var totSum = 0;
    	var i = 0;
    	for(datapoint in data[0]){
    		totSum += Math.pow(p1[datapoint]-p2[i],2);
			++i;
    	}
		return Math.sqrt(totSum);
	};
	
	function calculateClusterAverage(clusterElements){	//i is index of dataelement.
		//summing
		var sumOfDimensions = [];
        for(datapoint in clusterElements[0]){
            var thisSum = 0;
            for(var i=0 ; i<clusterElements.length ; ++i){
           		thisSum += parseFloat(clusterElements[i][datapoint]);
			}
			sumOfDimensions.push(thisSum);
		}

		//averageing
        var averagePerDimensions = [];
		var thisAverage = 0;
		for(var i=0 ; i<sumOfDimensions.length ; ++i){
            thisAverage = sumOfDimensions[i]/clusterElements.length;
			averagePerDimensions.push(thisAverage);
		}
		return averagePerDimensions;
	};
	
	function squaredDistance(p1, p2){
		//något med key. loopa dimensioner
		//Math.pow( key YAO ,2);
		var totSum = 0;
		var i = 0;
		for (datapoint in p1){
			totSum += Math.abs(p1[datapoint]-p2[i]);
			++i;
		}
		return totSum;
	};

	function reorganizeAssignments() {
		for(var i=0 ; i<k ; ++i){	//for each cluster
			for(var j=0 ; j<assignedData[i].length ; j++){	//for each dataelement in this cluster
				var ind = data.indexOf(assignedData[i][j]);
				assignments[ind] = i;
			}
		}
    };
	/**********
	*Main
	***********/

	var selection = d3.selectAll(data);
	var nrOfDim = Object.keys(selection._groups[0][1]).length;    //int på vilken dimension
	//console.log("nrOfDim = " + nrOfDim);
	//console.log("selection.A = " + selection._groups[0][1].A);

	//1. Randomly place k points. Initial centroids
	var centroidArray = [];
	creatCentroid();

	var counter=0;
	var oldError=0;
    var totError=0;
	do{
		oldError = totError;
        totError = 0;
        //2. Assign all items to the closest centroid with euclidiskt avstånd
		//var assignedData = [];
		assignDataToCentroid();

		//3. recalculate the posision of the k centroids to be in the center of the cluster
		//   This is achieved by calculating the average values in all dimensions.
		var everyClustersAverage = [];
		for(var i=0 ; i<k ; ++i){
			centroidArray[i] = calculateClusterAverage(assignedData[i]);
		}
		//console.log("ett element i centroidArray: " + centroidArray[0]);
		
		//4. Check the quality of the cluster. Use the sum of the squared distance within each cluster as your measure of quality.
		//  räkna ut summan.
		//var theSmallestDistance= Math.sqrt((centroidArray[j].A - data[i].A)^2 + (centroidArray[j].B - data[i].B)^2 + (centroidArray[j].C - data[i].C)^2);
		
		//calculate tot error

		for(var i=0 ; i<k ; ++i){	//for each cluster
			var sumSqaredDistance=0;
			for(var j = 0; j < assignedData[i].length; ++j){
				sumSqaredDistance += squaredDistance(assignedData[i][j], centroidArray[i]);
			}
			totError +=sumSqaredDistance;
		}

		//check quality
		++counter;


	}while(Math.abs(oldError-totError) > 0.0001);
	console.log("Nr of iterations: " + counter);
	//console.log(assignedData);

	var assignments = new Array(data.length);
	reorganizeAssignments();

	var result = {
		"assignments": assignments,
		"banana brain": centroidArray
	};
	console.log(result.assignments);
	return result;
};


