
import config from "../conf/index.js";

//Implementation to extract city from query params


function getCityFromURL(search) {  
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  return params.get('city')

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

  let  url= config.backendEndpoint+"/adventures/"+'?city='+ city
    try{
      let data=await fetch(url)
      return data.json()
    }
    catch(err){
      return null
    }
  

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

let data=  document.getElementById('data');
adventures.forEach((element)=>{
let div= document.createElement('div')
div.className=`col-6 col-lg-3 mb-4`;
div.innerHTML=`
  <a href="./detail/?adventure=${element.id}" id=${element.id}>
    <div class="card activity-card">
      <div class="category-banner">${element.category}</div>
      <img src="${element.image}" class="activity-card img">
      
        <div class=" text-center d-sm-flex justify-content-between align-items-center px-2 ">
           <p style="font-weight:600">${element.name}</p>
           <p>₹${element.costPerHead}</p>
        </div>
        <div class=" text-center d-sm-flex justify-content-between align-items-center px-2">
           <p style="font-weight:600">Duration</p>
           <p>${element.duration} Hours</p>
        </div>
      
    </div>
  </a>
</div>`
data.append(div)
})
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {

  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  
  let filteredList=list.filter((item)=>{
    return (item.duration>=low && item.duration<=high)
  })
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList= list.filter((item)=>{
    return (categoryList.includes(item.category))
  })
  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {

  
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredList=[];
  
  let arr= filters["duration"].split("-");
  if(filters.duration.length>0 && filters.category.length>0){
    filteredList=filterByDuration(list,parseInt(arr[0]),parseInt(arr[1]))
    filteredList=filterByCategory(filteredList,filters.category)
    return filteredList;
    
  }
  else if(filters.category.length>0){
    filteredList=filterByCategory(list,filters.category)
    return filteredList;
  }
  else if(filters.duration.length>0){
    filteredList=filterByDuration(list,parseInt(arr[0]),parseInt(arr[1]))
    return filteredList;
  // Place holder for functionality to work in the Stubs 
  }
  return list; 
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {  
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem('filters',JSON.stringify(filters) )
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse( window.localStorage.getItem('filters'))
  return null;
  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  filters.category.forEach(element=>{
    let catList=document.getElementById("category-list");

    let pill=document.createElement("div");
    pill.setAttribute("class","category-filter");
    pill.innerText=`${element}`;
    catList.append(pill);
  })
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
