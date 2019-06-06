//call the fetch function

async function allBeerCall(){
let result= await fetch( `https://api.punkapi.com/v2/beers`);

let data= await result.json();
return data;

}

// console.log
allBeerCall().then(data => {
  console.log(data);
  console.log(data[0].name);

  var cardHolder = document.getElementById('cardHolder');

  for (let i = 0 ; i < data.length ; i++){
    cardHolder.innerHTML += `
      <div class="card m-4" style="width: 18rem;">
        <img src="${data[i].image_url}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${data[i].name}</h5>
          <p class="card-text">${data[i].tagline}</p>
          <a href="#" class="btn btn-primary">Details</a>
        </div>
      </div>
    `;
  }
})

