/**
* k means algorithm
* @param data
* @param k
* @return {Object}
*/

function kmeans(data, k) {

    //Implement the algorithm here..
    //Remember to reference any code that you have not implemented yourself! 
	
	
    //1. Randomly place k points. Initial centroids
	
    var centroidArray = [];
	
    for(var i=0 ; i<k ; ++i){
        //centroidArray[i] = [ Math.random(), Math.random(), Math.random()]; // ska det vara slumpat i rymden, eller sättas till posisionen av ett slumpat dataelement?
		
		var c = Math.floor((Math.random() * data.length) + 1);
		centroidArray.push(data[c]);
		
    }

    //2. Assign all items to the closest centroid with euclidiskt avstånd

    // K stycken dynamiska arrayer
    var assignedData = [];
	 var   cols = 4;

//init the grid matrix
for ( var i = 0; i < cols; i++ ) {
    assignedData[i] = []; 
}
	
	
	console.log(assignedData.length)
	
	
    for(var i=0 ; i < data.length; ++i){
        var distance = 1000;
		var closesedCentroidIndex = 0;
		
        for(var j=0 ; j<k ; ++j ){
            var theSmallestDistance= Math.sqrt((centroidArray[j].A - data[i].A)^2 + (centroidArray[j].B - data[i].B)^2 + (centroidArray[j].C - data[i].C)^2);
            
			if (theSmallestDistance <= distance) {
                distance = theSmallestDistance;
                //peka på just den här centroiden;
				closesedCentroidIndex = j;
            }
        }
		assignedData[closesedCentroidIndex].push(i);
    }


    //3. recalculate the posision of the k centroids to be in the center of the cluster
    //   This is achieved by calculating the average values in all dimensions.

	for(var i = 0; i < k; ++i){
		var AtotAverage = 0;
		var BtotAverage = 0;
		var CtotAverage = 0;
		for(var j = 0; j < assignedData[i].length; ++j){
			//average
			AtotAverage += data[assignedData[i][j]].A;
			BtotAverage += data[assignedData[i][j]].B;
			CtotAverage += data[assignedData[i][j]].C;			
		}
		AtotAverage = AtotAverage/assignedData[i].length;
		BtotAverage = BtotAverage/assignedData[i].length;
		CtotAverage = CtotAverage/assignedData[i].length;
		//assign new posision
		centroidArray[i][0] = AtotAverage;
		centroidArray[i][1] = BtotAverage;
		centroidArray[i][2] = CtotAverage;
		
	}
	
	//4. Check the quality of the cluster. Use the sum of the squared distance within each cluster as your measure of quality.
    //   Kolla ekvation.
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

};


