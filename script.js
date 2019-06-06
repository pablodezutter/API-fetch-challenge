//call the fetch function

async function allBeerCall(page){
  let result= await fetch( `https://api.punkapi.com/v2/beers?page=${page}&per_page=25`);

  let data= await result.json();
  return data;
}

// console.log
allBeerCall(1).then(data => {
  console.log(data);
  console.log(data[0].name);
  console.log(data.length);
  console.log("eerste keer");
  buildCards(data);
})

function buildCards(data) {
  var cardHolder = document.getElementById('cardHolder');
  cardHolder.innerHTML="";
  for (let i = 0 ; i < data.length ; i++){
    cardHolder.innerHTML += `
      <div class="card m-4" style="width: 18rem;">
        <img src="${data[i].image_url}" class="card-img-top bottleImage">
        <div class="card-body">
          <h5 class="card-title">${data[i].name}</h5>
          <p class="card-text">${data[i].tagline}</p>
          <button type="button" id="${data[i].id}" class="btn btn-primary">Details</button>
          <p class="card-text">id: ${data[i].id}</p>
        </div>
      </div>
    `;
    let idNumber= data[i].id;
    document.getElementById(idNumber).addEventListener("click", function(){
        detailedCard(data,i);
        console.log("test extended card");


    });
  }
}

var currentPage = 1;
var previousButton= document.getElementById("previousButton");
var nextButton= document.getElementById("nextButton");
var randomButton=document.getElementById("randomButton");

nextButton.addEventListener("click", function() {
        if (currentPage < 13){

            currentPage= currentPage +1;
            allBeerCall(currentPage).then(data => {
              buildCards(data);
            })
        }
});

previousButton.addEventListener("click", function() {
        if (currentPage > 1){

            currentPage= currentPage -1;
            allBeerCall(currentPage).then(data => {
              buildCards(data);
            })
        }
});

async function randomBeerCall(){
  let result= await fetch( `https://api.punkapi.com/v2/beers/random`);

  let randomData= await result.json();
  return randomData;
}

randomButton.addEventListener("click", function(){
  randomBeerCall(1).then(randomData => {

   detailedCard(randomData,0);
  })
});

function detailedCard(randomData,index){
    var randomCardHolder = document.getElementById('randomCardHolder');

    console.log(randomData);

    randomCardHolder.innerHTML = "";
    randomCardHolder.innerHTML = `
      <div class="card m-4" style="width: 18rem;">
        <img src="${randomData[index].image_url}" class="card-img-top bottleImage">
        <div class="card-body">
          <h5 class="card-title">${randomData[index].name}</h5>
          <p class="card-text">${randomData[index].tagline}</p>
          <a href="#" class="btn btn-primary">Details</a>
          <p class="card-text">id: ${randomData[index].id}</p>
        </div>
      </div>
    `;



}
