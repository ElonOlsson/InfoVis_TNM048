/**
* k means algorithm
* @param data
* @param k
* @return {Object}
*/

function kmeans(data, k) {

    //Implement the algorithm here..
    //Remember to reference any code that you have not implemented yourself! 

	//det axel och fanny sa
    console.log(data.length);
    var selection = d3.selectAll(data);
    var eleventhDimension = Object.keys(selection._groups[0][1]).length;
	console.log("eleventh Dimension = " + eleventhDimension);
    console.log("selection.A = " + selection._groups[0][1].A);
    //1. Randomly place k points. Initial centroids
	
    var centroidArray = [];
	
    for(var i=0 ; i<k ; ++i){
        //centroidArray[i] = [ Math.random(), Math.random(), Math.random()]; // ska det vara slumpat i rymden, eller sättas till posisionen av ett slumpat dataelement?
		var c = Math.floor((Math.random() * data.length) + 1);
		centroidArray.push(data[c]);
		console.log("what's inside centroidArray at position A: " + i + " : " + centroidArray[i].A);	//centroidArray[i][0]: undefined
    }

    // K stycken dynamiska arrayer
    var assignedData = [];
	var   cols = k;

	//init the grid matrix
	for ( var i = 0; i < cols; i++ ) {
		assignedData[i] = [];
	}
	console.log("Size of k: " + k +". Size of assignedData: "+assignedData.length);

    //2. Assign all items to the closest centroid with euclidiskt avstånd
	while(true) {
		for (var i = 0; i < data.length; ++i) {
			var distance = 1000;
			var closesedCentroidIndex = 0;

			for (var j = 0; j < k; ++j) {
				var theSmallestDistance = Math.sqrt((centroidArray[j].A - data[i].A) ^ 2 + (centroidArray[j].B - data[i].B) ^ 2 + (centroidArray[j].C - data[i].C) ^ 2);
				if (theSmallestDistance <= distance) {
					distance = theSmallestDistance;
					//peka på just den här centroiden;
					closesedCentroidIndex = j;
				}
			}
			assignedData[closesedCentroidIndex].push(i);	//pusha in dataelement istället för int
		}
		console.log(assignedData[0][0]);
		console.log(assignedData[1][0]);
		console.log(assignedData[2][0]);
		console.log(assignedData[3][0]);

		//3. recalculate the posision of the k centroids to be in the center of the cluster
		//   This is achieved by calculating the average values in all dimensions.

		for (var i = 0; i < k; ++i) {
			var AtotAverage = 0;
			var BtotAverage = 0;
			var CtotAverage = 0;
			for (var j = 0; j < assignedData[i].length; ++j) {
				//average
				AtotAverage += data[assignedData[i][j]].A;
				BtotAverage += data[assignedData[i][j]].B;
				CtotAverage += data[assignedData[i][j]].C;
			}
			AtotAverage = AtotAverage / assignedData[i].length;
			BtotAverage = BtotAverage / assignedData[i].length;
			CtotAverage = CtotAverage / assignedData[i].length;
			//assign new posision
			centroidArray[i].A = AtotAverage;
			centroidArray[i].B = BtotAverage;
			centroidArray[i].C = CtotAverage;
		}

		//4. Check the quality of the cluster. Use the sum of the squared distance within each cluster as your measure of quality.
		//  räkna ut summan.
		//var theSmallestDistance= Math.sqrt((centroidArray[j].A - data[i].A)^2 + (centroidArray[j].B - data[i].B)^2 + (centroidArray[j].C - data[i].C)^2);
		var totSum = 0;
		for (var i = 0; i < k; ++i) {	//för varje kluster
			var sumSquaredDistance = 0;
			for (var j = 0; j < assignedData[i].length; ++j) {	//och klustrets alla tillhörande dataelement
				sumSquaredDistance += (data[assignedData[i][j]].A - centroidArray[i].A) ^ 2 + (data[assignedData[i][j]].B - centroidArray[i].B) ^ 2 + (data[assignedData[i][j]].C - centroidArray[i].C) ^ 2;					//dataelement - centroid
			}
			totSum += sumSquaredDistance;			//detta sumsystemet var mest bara för att testa och se hur mycket felet blir
			console.log("totSum: " + totSum);
		}
		if (totSum < 701) {	//ska vara < än ett rimligt tröskelvärde.
			return assignedData;
		}
	}
};


