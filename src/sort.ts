import {sleep, shuffleArr} from './utils';

const SortTypes = {
    bogo: 0,
    buble: 1,
    recusiveBuble: 2,
    selection: 3,
    insertion: 4,
    recusiveInsertion: 5,
    quick: 6,
    merge: 7
};

class Sort{
    arr: [];
    delay: number;

    constructor(arr, delay = 0){
        this.arr = arr;
        this.delay = delay;
    }

    sort(type){
        switch(type){
            case SortTypes.bogo:
                this.bogoSort(this.arr);
                break;
            case SortTypes.buble:
                this.bubleSort(this.arr);
                break;
            case SortTypes.recusiveBuble:
                this.recusiveBubleSort(this.arr, this.arr.length);
                break;
            case SortTypes.selection:
                this.selectionSort(this.arr);
                break;
            case SortTypes.insertion:
                this.insertionSort(this.arr);
                break;
            case SortTypes.recusiveInsertion:
                this.recursiveInsertionSort(this.arr, 0);
                break;
            case SortTypes.quick:
                this.quickSort(this.arr, 0, this.arr.length - 1);
                break;
            case SortTypes.merge:
                this.mergeSort(this.arr, 0, this.arr.length - 1);
                break;
            default:
                this.mergeSort(this.arr, 0, this.arr.length - 1);
        }
    }

    async bogoSort(arr){
        var sorted = false;
        while(!sorted){
            shuffleArr(arr);

            for(let i = 0; i < arr.length - 1; i++){
                if(arr[i] > arr[i+1]) break;
                if (i == arr.length - 2) sorted = true;
            }
            await sleep(this.delay);
        }
    }
    
    async selectionSort(arr){
        for(let i = 0; i < arr.length; i++){
            let curMin = i;
            for(let j = i; j < arr.length; j++){
                if(arr[curMin] >= arr[j]){
                    curMin = j;
                }
                await sleep(this.delay);
            }
            let temp = arr[i];
            arr[i] = arr[curMin];
            arr[curMin] = temp;
        }
    }

    async bubleSort(arr){
        for(let i = 0; i < arr.length; i++){
            for(let j = 0; j < arr.length -i-1; j ++){
                if(arr[j] > arr[j+1]){
                    let temp = arr[j+1];
                    arr[j+1] = arr[j];
                    arr[j] = temp;
                }
        
                await sleep(this.delay);
            }
        }
    }

    async recusiveBubleSort(arr, n){
        if(n == 1) return;

        for(let i = 0; i < n-1; i++){
            await sleep(this.delay);

            if(arr[i] > arr[i+1]){
                let temp = arr[i+1];
                arr[i+1] = arr[i];
                arr[i] = temp;
            }
        }

        this.recusiveBubleSort(arr, n - 1);
    }

    async insertionSort(arr){
        for(let i = 1; i < arr.length; i++){
            let key = arr[i];
            for(var j = i - 1; j >= 0; j--){
                if(key >= arr[j]) break;
                else arr[j + 1] = arr[j];
                await sleep(this.delay);
            }

            arr[j + 1] = key;
        }
    }
    
    async recursiveInsertionSort(arr, n){
        if(n == arr.length) return;

        let key = arr[n];

        for(var i = n - 1; i >= 0; i--){
            if(key >= arr[i]) break;
            else arr[i + 1] = arr[i];

            await sleep(this.delay);
        }

        arr[i+1] = key;

        this.recursiveInsertionSort(arr, n + 1);
    }
    
    async quickSort(arr, low, high){
        if(low >= high) return;
    
        var index = await this.partition(arr, low, high);
        this.quickSort(arr, low, index-1);
        this.quickSort(arr, index+1, high);
        await sleep(this.delay);
    }

    async partition(arr, low, high){
        var piv = arr[high];
        var pivIndex = low-1;
    
        for(let i = low; i < high; i++){
            await sleep(this.delay);
    
            if(arr[i] < piv){
                pivIndex++;
                let temp = arr[i];
                arr[i] = arr[pivIndex];
                arr[pivIndex] = temp;
            }
        }
        
        pivIndex++;
        let temp = arr[pivIndex ];
        arr[pivIndex] = arr[high];
        arr[high] = temp;
        return pivIndex;
    }


    async mergeSort(arr, low, high){
        if(low >= high) return;
    
        var mid = Math.floor((high + low) / 2);
        
        await this.mergeSort(arr, low, mid);
        await this.mergeSort(arr, mid+1, high);
        await this.merge(arr, low, mid, high);
        
        await sleep(this.delay);
    }
    
    async merge(arr, low, mid, high){
        var helper = new Array(high - low + 1);
    
        for(let i = low; i < high + 1; i++){
            helper[i-low] = arr[i];
        }
        
        var i = low;
        var j = mid + 1;
        var k = low;
    
        while(i <= mid && j <= high){
            if(helper[i - low] <= helper[j - low]){
                arr[k] = helper[i - low];
                i++;
                await sleep(this.delay);
            }else{
                arr[k] = helper[j - low];
                j++; 
            }
            k++;
        }
    
        while(i <= mid){
            arr[k] = helper[i - low];
            k++;
            i++;
        }
    }
}

export{Sort, SortTypes};