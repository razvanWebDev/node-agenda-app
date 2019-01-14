//min or max in an array

function findMinNumber(array){
   
    var min = array[0];
    array.forEach(function(nr){
        if (min > nr){
            min = nr 
        }
    })
    console.info('min= ', min);
}
var array = [-4, 5, 3, 2, 6, 1, 9];
// findMinNumber(array);

var array2 = [5, 3, 0, 2, 6, 1, 9];
// findMinNumber(array2);

// findMinNumber([3, 5, 2, 7, 9]);



function findMinNumber2(){
    var array = [5, 3, 2, 6, 1, 9]
    var min = array[0];
    for(var i = 1; i < array.length; i++){
        if(min > array[i]){
            min = array[i];
        }
    }
    console.info('min = ', min);
}

// findMinNumber2();

//==============sort an array(bubble sort)=============

function sortAsc(array){
    console.warn('sorting: ', array);
    // array.sort();
    for(var j = 0; j < array.length ; j++){
        for(var i = 0 ; i < array.length - 1 - j; i++){
            console.info('compare ',array[i], array[i+1]);
            if(array[i] > array[i+1]){
                console.info('change.....', i);
                var tmp = array[i];
                array[i] = array[i+1];
                array[i+1] = tmp;
            }
        }
        console.log('intermediary', array, i, j);
    }
    console.info('sorted: ', array);
}
sortAsc([1, 2, 3, 4, 5]);
sortAsc([5, 4, 3, 2, 1]);
sortAsc([1, 3, 2, 5, 4]);