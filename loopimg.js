//putting all img in a array
var imgArray = new Array();


imgArray[0] = new Image();
imgArray[0].src = 'images/1.jpg'; 

imgArray[1] = new Image();
imgArray[1].src = 'images/2.jpg';

imgArray[2] = new Image();
imgArray[2].src = 'images/3.jpg'; 

imgArray[3] = new Image();
imgArray[3].src = 'images/4.jpg'; 

imgArray[4] = new Image();
imgArray[4].src = 'images/5.jpg'; 

imgArray[5] = new Image();
imgArray[5].src = 'images/6.jpg'; 

imgArray[6] = new Image();
imgArray[6].src = 'images/7.jpg'; 

imgArray[7] = new Image();
imgArray[7].src = 'images/8.jpg'; 

imgArray[8] = new Image();
imgArray[8].src = 'images/9.jpg'; 

imgArray[9] = new Image();
imgArray[9].src = 'images/10.jpg'; 

imgArray[10] = new Image();
imgArray[10].src = 'images/11.jpg'; 

imgArray[11] = new Image();
imgArray[11].src = 'images/12.jpg'; 

imgArray[12] = new Image();
imgArray[12].src = 'images/13.jpg'; 

imgArray[13] = new Image();
imgArray[13].src = 'images/14.jpg'; 

imgArray[14] = new Image();
imgArray[14].src = 'images/15.jpg'; 

imgArray[15] = new Image();
imgArray[15].src = 'images/16.jpg'; 

imgArray[16] = new Image();
imgArray[16].src = 'images/17.jpg'; 

imgArray[17] = new Image();
imgArray[17].src = 'images/18.jpg'; 

imgArray[18] = new Image();
imgArray[18].src = 'images/19.jpg'; 

imgArray[19] = new Image();
imgArray[19].src = 'images/20.jpg'; 

imgArray[20] = new Image();
imgArray[20].src = 'images/21.jpg'; 

imgArray[21] = new Image();
imgArray[21].src = 'images/22.jpg'; 

imgArray[22] = new Image();
imgArray[22].src = 'images/23.jpg'; 

imgArray[23] = new Image();
imgArray[23].src = 'images/24.jpg'; 

imgArray[24] = new Image();
imgArray[24].src = 'images/25.jpg'; 

imgArray[25] = new Image();
imgArray[25].src = 'images/26.jpg'; 

imgArray[26] = new Image();
imgArray[26].src = 'images/27.jpg'; 

imgArray[27] = new Image();
imgArray[27].src = 'images/28.jpg'; 

imgArray[28] = new Image();
imgArray[28].src = 'images/29.jpg'; 

imgArray[29] = new Image();
imgArray[29].src = 'images/30.jpg'; 
//last of array
// console.log array
//console.log(imgArray);

// making a loop for all imges 
for(var i =0; i <= imgArray.length; i++){
    console.log(imgArray[i]);
    $("ul").append(imgArray[i]);
};



