function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function shuffleArr(arr){
    for (var i = 0; i < arr.length; i++) {
        let j = Math.floor(Math.random() * (arr.length - 1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

export {sleep, shuffleArr};