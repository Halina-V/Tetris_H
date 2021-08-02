const apiUrl = "https://pixabay.com/api/";
const apiKey = "22692515-01ea787f3cd6031c40f59dc11";
const apiQuery = apiUrl + "?key=" + apiKey + "&q=tetris&image_type=all";

fetch(apiQuery)
   .then(response => response.json())
   .then(data => {
      console.log(data);
      getImage(data);
   })
   .catch(error => console.error("Ошибка получение изоброжения . Причина: " + error));

function drawParalax() {
   let divP2 = document.createElement('div');
   divP2.id = "parallax2";
   document.body.prepend(divP2);

   let divP1 = document.createElement('div');
   divP1.id = "parallax1";
   document.body.insertBefore(divP1, divP2);

   let bgImg2 = document.createElement('div');
bgImg2.id = 'bgImage2';
bgImg2.className = 'bg-image';
bgImg2.style.top = "0";
bgImg2.style.left = "0";
bgImg2.style.width = "100vw";
bgImg2.style.height = "100vh";
divP1.append(bgImg2);
bgImg2.innerHTML = `<div style="width:100vw; height:10vh" data-depth=" 0.20">
   <img>
</div>`;
let img2 = document.querySelector('#bgImage2 img');
img2.src = 'images/bg-layer2.png';


let bgImg3 = document.createElement('div');
bgImg3.id = 'bgImage3';
bgImg3.className = 'bg-image';
bgImg3.style.top = "0";
bgImg3.style.left = "0";
bgImg3.style.width = "100vw";
bgImg3.style.height = "100vh";
divP1.append(bgImg3);
bgImg3.innerHTML = `<div style="width:100vw; height:10vh" data-depth="0.10">
   <img>
</div>`;
let img3 = document.querySelector('#bgImage3 img');
img3.src = 'images/bg-layer3.png';

   let div4 = document.createElement('div');
   div4.id = 'scene4';
   div4.className = 'scene4';
   div4.style.top = "50%";
   div4.style.left = "15vw";
   divP2.append(div4);
   div4.innerHTML = `<div data-depth=" 0.40" data-depth-y="-0.30">
   <img class="pixaby">
</div>`;
   let div5 = document.createElement('div');
   div5.id = 'scene5';
   div5.className = 'scene5';
   div5.style.top = "20%";
   div5.style.left = "85vw";
   divP2.append(div5);
   div5.innerHTML = `<div data-depth=" 0.20">
   <img class="pixaby">
</div>`;
   let div6 = document.createElement('div');
   div6.id = 'scene6';
   div6.className = 'scene6';
   div6.style.top = "40%";
   div6.style.left = "90vw";
   divP2.append(div6);
   div6.innerHTML = `<div data-depth="0.10">
   <img class="pixaby">
</div>`;

}
drawParalax();

function getImage(data) {
   let img = [];
   img.push(document.querySelectorAll('.pixaby'));
   console.log(img);
   let dataImg = [];
   dataImg.push(data.hits[9].largeImageURL);
   dataImg.push(data.hits[10].largeImageURL);
   dataImg.push(data.hits[13].largeImageURL);
   dataImg.push(data.hits[16].largeImageURL);
   dataImg.push(data.hits[15].largeImageURL);
   dataImg.push(data.hits[6].largeImageURL);
   console.log(dataImg);

   for (let i = 0; i < img[0].length; i++) {
      img[0][i].src = dataImg[i];
   }
}

let input = document.getElementById('root');

const scene4 = document.getElementById('scene4');
let parallaxInstance4 = new Parallax(scene4, {
   relativeInput: true,
   hoverOnly: true,
   inputElement: input,
});
const scene5 = document.getElementById('scene5');
let parallaxInstance5 = new Parallax(scene5, {
   relativeInput: true,
   hoverOnly: true,
   inputElement: input,
});
const scene6 = document.getElementById('scene6');
let parallaxInstance6 = new Parallax(scene6, {
   relativeInput: true,
   hoverOnly: true,
   inputElement: input,
});

const bgImg2Layer = document.getElementById('bgImage2');
let parallaxInstance2 = new Parallax(bgImg2Layer, {
   relativeInput: true,
   hoverOnly: true,
});

const bgImg3Layer = document.getElementById('bgImage3');
let parallaxInstance3 = new Parallax(bgImg3Layer, {
   relativeInput: true,
   hoverOnly: true,
});


// let load = document.createElement('div');
// document.body.prepend(load);
// load.classList.add('preloader');
// load.innerHTML=`
//       <div class='tetris'>
//       <div class='block1'></div>
//       <div class='block2'></div>
//       <div class='block3'></div>
//       <div class='block4'></div>
//     </div>`;