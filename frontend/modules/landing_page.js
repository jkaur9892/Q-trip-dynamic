import config from "../conf/index.js";

async function init() {
  
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  
  //Updates the DOM with the cities
  cities.forEach((key) => {
    
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  let  url= config.backendEndpoint+"/cities"
// console.log();
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    let data=await fetch(url)
    return data.json()
  }
  catch(err){
    return null
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {

  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  
  
  let div= document.createElement('div')
  div.setAttribute('class','col-12 col-sm-6 col-lg-3 mb-4')
  div.setAttribute('id',id)

  let atag= document.createElement('a')
  atag.setAttribute('href','./pages/adventures/?city='+id)
  atag.setAttribute('id',id)
  
  let div2=document.createElement('div')
  div2.setAttribute('class','tile')

  let image1=document.createElement('img')
  image1.setAttribute('src',image)
  div2.append(image1)

  let div3= document.createElement('div')

  div3.setAttribute('class','tile-text text-white text-center')
  div2.append(div3)

  let h5=document.createElement('h5')
  h5.textContent=city
  let p=document.createElement('p')
  p.textContent=description;

  div3.append(h5,p)
  atag.append(div2)
  div.append(atag)

  document.getElementById('data').append(div)
}

export { init, fetchCities, addCityToDOM };
