import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  return params.get('adventure')
  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let data= await fetch(config.backendEndpoint+`/adventures/detail/?adventure=${adventureId}`)
    return await data.json()
    }
  catch(err){
  // Place holder for functionality to work in the Stubs
    return null;
    }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  console.log('adventure:--',adventure);
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById('adventure-name').append(adventure.name)
  document.getElementById('adventure-subtitle').append(adventure.subtitle)
  
  adventure.images.forEach((item)=>{
  
  let div=document.createElement('div')
  div.innerHTML=`
  <img class='activity-card-image' src='${item}'>`
  document.getElementById('photo-gallery').append(div)
  })
  document.getElementById('adventure-content').append(adventure.content)
}


//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById('photo-gallery').innerHTML=`
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner"  id="carousel-inner"></div>
   <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
     <span class="visually-hidden">Previous</span>
   </button>
   <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
     <span class="carousel-control-next-icon" aria-hidden="true"></span>
     <span class="visually-hidden">Next</span>
   </button>
 </div>
  `
  
  images.forEach((item)=>{
    let carousel= document.getElementById("carousel-inner");
    if(!carousel.innerHTML){
     let divElememt=document.createElement('div')
     divElememt.innerHTML=`
     <img src='${item}' class='activity-card-image'>`
     divElememt.className='carousel-item active'
     carousel.append(divElememt)
    }
    else{
     let divElememt=document.createElement('div')
     divElememt.innerHTML=`
     <img src='${item}' class='activity-card-image'>`
     divElememt.className='carousel-item'
     carousel.append(divElememt)
    }
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById('reservation-panel-sold-out').style.display='none'
    document.getElementById('reservation-panel-available').style.display='block'
    document.getElementById('reservation-person-cost').innerHTML=adventure.costPerHead
  }

  else{
    document.getElementById('reservation-panel-sold-out').style.display='block'
    document.getElementById('reservation-panel-available').style.display='none'
  
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById('reservation-cost').innerHTML=(adventure.costPerHead)*persons

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form=document.getElementById("myForm");
 form.addEventListener("submit",async(e)=>{
   e.preventDefault();
   let data={
    name:form.elements.name.value,
    date:new Date(form.elements.date.value),
    person:form.elements.person.value,
    adventure:adventure.id
   }
   console.log(data);
   try{
     //const url=;
     const res=await fetch(`${config.backendEndpoint}/reservations/new`,{
       method:"POST",
       headers: {'Content-Type': 'application/json'},
       body:JSON.stringify(data)
     });
    alert("success");
    window.location.reload();
   }
   catch(error){
     console.log(error);
     alert("failed");

   }
 });
  
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved==true){
    document.getElementById('reserved-banner').style.display='block'
  }
    else{
      document.getElementById('reserved-banner').style.display='none'

    }
  
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
