import {Sort, SortTypes} from './sort'; 
import {sleep} from './utils';

let canvas = null;
let ctx = null;

let itemSum = 0;
let delay = 0;
let bgColor = "#000";

let vals = [];
let sortTags = [];

let gradient = false;

function draw(){
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var splitWidth = 40;
    var width = canvas.width / itemSum;
    var height = (canvas.height / vals.length) - splitWidth;

    if(gradient){
        for(let i = 0; i < vals.length; i++){
            let grd = ctx.createLinearGradient(0, 0, canvas.width, 0);

            for(let j = 0; j < itemSum; j++){
                grd.addColorStop(j/itemSum, "rgba(255,255,255,"+vals[i].arr[j]+")");
            }

            ctx.strokeStyle = "#fff";
            ctx.fillStyle = "#fff";
            
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.fillText(
                sortTags[i],
                window.innerWidth / 2,
                (i*(height+splitWidth))+10+(splitWidth/2)
            );
            
            ctx.fillStyle = grd;
            ctx.fillRect(
                    0,
                    ((i+1)*splitWidth) + i*height,
                    canvas.width,
                    height
            );
        }
    }else{
        for(let i = 0; i < vals.length; i++){
            for(let j = 0; j < itemSum; j++){
                ctx.fillStyle = "rgba(255,255,255,"+vals[i].arr[j]+")";
                ctx.fillRect(
                    j*width,
                    ((i+1)*splitWidth) + i*height,
                    width,
                    height
                );
            }

            ctx.strokeStyle = "#fff";
            ctx.fillStyle = "#fff";
            
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.fillText(
                sortTags[i],
                window.innerWidth / 2,
                (i*(height+splitWidth))+10+(splitWidth/2)
            );
        }
    }
}

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return('false');
}

function init(){

    itemSum = parseInt(getQueryVariable('len')) || 100;
    gradient = getQueryVariable('gradient') == "true" ? true : false;

    canvas = document.getElementById("visual");
    var newVals = Array.from({length: itemSum}, () => Math.random());
    vals = Array.from({length: 6}, () => new Sort([...newVals], true));

    if (canvas.getContext('2d')) {
        ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        sortTags = ["Bogo Sort", "Selection Sort", "Buble Sort", "Insertion Sort", "Quick Sort", "Merge Sort"];
        
        vals[0].sort(SortTypes.bogo);
        vals[1].sort(SortTypes.selection);
        vals[2].sort(SortTypes.buble);
        vals[3].sort(SortTypes.insertion);
        vals[4].sort(SortTypes.quick);
        vals[5].sort(SortTypes.merge);
	} else {
        console.error("canvas not surported");
    }

    drawUpdate();
}

async function drawUpdate(){
    while(true){
        await sleep(delay);
        draw();
    }
}

init();