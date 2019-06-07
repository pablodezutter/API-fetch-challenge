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

    var divCard = document.createElement("div");
    divCard.classList.add("card","m-4");
    divCard.style.width="18rem";

    var imgCard = document.createElement("img");
    imgCard.src= data[i].image_url;
    imgCard.classList.add("card-img-top", "bottleImage");
    divCard.appendChild(imgCard);

    var divCardBody = document.createElement("div");
    divCardBody.classList.add("card-body");

    var h5CardTitle = document.createElement("h5");
    h5CardTitle.classList.add("card-title");
    h5CardTitle.innerHTML=data[i].name;
    divCardBody.appendChild(h5CardTitle);

    var pCardText = document.createElement("p");
    pCardText.classList.add("card-text");
    pCardText.innerHTML = data[i].tagline;
    divCardBody.appendChild(pCardText);

    var buttonCard = document.createElement('button');
    buttonCard.type="button";
    buttonCard.id=data[i].id;
    buttonCard.classList.add("btn", "btn-primary");
    buttonCard.innerHTML="Details";
    divCardBody.appendChild(buttonCard);

    var pCardTextId = document.createElement("p");
    pCardTextId.classList.add("card-text");
    pCardTextId.innerHTML = data[i].id;
    divCardBody.appendChild(pCardTextId);

    divCard.appendChild(divCardBody);
    cardHolder.appendChild(divCard);

  /*
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
  */

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
var lessAlc= document.getElementById("lessAlc");
var moreAlc= document.getElementById("moreAlc");

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

async function alcLessBeerCall(){
  let result= await fetch (`https://api.punkapi.com/v2/beers?abv_lt=6`);
  let alcLessData= await result.json();
  return alcLessData;
}

lessAlc.addEventListener("click", function(){
alcLessBeerCall().then(alcLessData =>{

  buildCards(alcLessData);
})

});



function detailedCard(randomData,index){
    var randomCardHolder = document.getElementById('randomCardHolder');

    console.log(randomData);

    randomCardHolder.innerHTML = "";
    randomCardHolder.innerHTML = `
      <div class="card m-4" style="width: 18rem;">
        <img src="${randomData[index].image_url}" class="card-img-top bottleImageBig">
        <div class="card-body">
          <h5 class="card-title">${randomData[index].name}</h5>
          <p class="card-text">${randomData[index].tagline}</p>
          <p class="card-text smallerText">${randomData[index].description}</p>
          <p class="card-text">abv : ${randomData[index].abv}</p>
          <p class="card-text">ibu : ${randomData[index].ibu}</p>
          <p class="card-text">ingredients :
            <br/>malt : <span id="malts"></span>
            <br/>hops : <span id="hops"></span>
            <br/>yeast : ${randomData[index].ingredients.yeast}
          </p>

          <p class="card-text">id: ${randomData[index].id}</p>
        </div>
      </div>
    `;

    var malts = document.getElementById("malts");

    for (let i = 0 ; i < randomData[index].ingredients.malt.length ; i++){
      malts.innerHTML+=randomData[index].ingredients.malt[i].name;
      if ( i < (randomData[index].ingredients.malt.length - 1) ){
        malts.innerHTML+=", ";
      }
    }


    var hops = document.getElementById("hops");

    for (let i = 0 ; i < randomData[index].ingredients.hops.length ; i++){
      hops.innerHTML+=randomData[index].ingredients.hops[i].name;
      if ( i < (randomData[index].ingredients.hops.length - 1) ){
        hops.innerHTML+=", ";
      }
    }

}
