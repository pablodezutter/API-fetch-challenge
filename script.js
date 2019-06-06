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
})
