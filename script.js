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
  var cardHolder = document.getElementById('cardHolder');
    cardHolder.innerHTML="";
  for (let i = 0 ; i < data.length ; i++){
    cardHolder.innerHTML += `
      <div class="card m-4" style="width: 18rem;">
        <img src="${data[i].image_url}" class="card-img-top bottleImage">
        <div class="card-body">
          <h5 class="card-title">${data[i].name}</h5>
          <p class="card-text">${data[i].tagline}</p>
          <a href="#" class="btn btn-primary">Details</a>
        </div>
      </div>
    `;
  }
})

var currentPage= 1;
var previousButton= document.getElementById("previousButton");
var nextButton= document.getElementById("nextButton");
var randomButton=document.getElementById("randomButton");

nextButton.addEventListener("click", function(){
        if (currentPage < 13){
            
            currentPage= currentPage +1;
            allBeerCall(currentPage).then(data => {
                              
                var cardHolder = document.getElementById('cardHolder');
                cardHolder.innerHTML= "";

                for (let i = 0 ; i < data.length ; i++){
                    
                    cardHolder.innerHTML += `
                    <div class="card m-4" style="width: 18rem;">
                      <img src="${data[i].image_url}" class="card-img-top bottleImage">
                      <div class="card-body">
                        <h5 class="card-title">${data[i].name}</h5>
                        <p class="card-text">${data[i].tagline}</p>
                        <a href="#" class="btn btn-primary">Details</a>
                      </div>
                    </div>
                  `;
                }
              })
        }


});


