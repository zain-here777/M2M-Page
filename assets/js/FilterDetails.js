




// function showFilterOffcanvas() {
//     const filterOffcanvasElement = new bootstrap.Offcanvas(document.getElementById("filterOffcanvas"));
    
//     // Update the innerHTML of the offcanvas
//     document.getElementById("filterOffcanvas").innerHTML = `
//     <div class="filter-container pt-4 px-3" id="filter-container">
//     <h5 class="pb-4">Filter</h5>
//     <form action="">
//         <select class="form-select" id="locationsidd" name="locations" style="min-width: 200px;"
//                 class="elementor-field-textual">
//             <option value="">Locations</option>
//             <option value="Marbella East">Marbella East</option>
//             <option value="Altos de los Monteros">- Altos de los Monteros</option>
//             <option value="Bahía de Marbella">- Bahía de Marbella</option>
//             <option value="Cabopino">- Cabopino</option>
//             <option value="El Rosario">- El Rosario</option>
//             <option value="Elviria">- Elviria</option>
//             <option value="La Mairena">- La Mairena</option>
//             <option value="Las Chapas">- Las Chapas</option>
//             <option value="Río Real">- Río Real</option>
//             <option value="Santa Clara">- Santa Clara</option>
//             <option value="Marbella Center">Marbella Center</option>
//             <option value="Nagüeles">- Nagüeles</option>
//             <option value="Sierra Blanca">- Sierra Blanca</option>
//             <option value="The Golden Mile">- The Golden Mile</option>
//             <option value="Marbella West">Marbella West</option>
//             <option value="Aloha">- Aloha</option>
//             <option value="Nueva Andalucía">- Nueva Andalucía</option>
//             <option value="Puerto Banús">- Puerto Banús</option>
//             <option value="San Pedro de Alcántara">- San Pedro de Alcántara</option>
//             <option value="Estepona">Estepona</option>
//             <option value="Atalaya">- Atalaya</option>
//             <option value="Costalita">- Costalita</option>
//             <option value="New Golden Mile">- New Golden Mile</option>
//             <option value="Selwo">- Selwo</option>
//             <option value="Benahavís">Benahavís</option>
//             <option value="La Quinta">- La Quinta</option>
//             <option value="La Zagaleta">- La Zagaleta</option>
//             <option value="Los Flamingos">- Los Flamingos</option>
//             <option value="Benalmadena">Benalmadena</option>
//             <option value="Fuengirola">Fuengirola</option>
//             <option value="Mijas">Mijas</option>
//             <option value="Calahonda">- Calahonda</option>
//             <option value="Calanova Golf">- Calanova Golf</option>
//             <option value="Riviera del Sol">- Riviera del Sol</option>
//         </select>
//         <div>
//             <h6 class="pb-2  pt-3">Transaction Type</h6>
//             <div class="container-fluid">
//                 <div class="row">
//                     <div class="form-check col-lg-6">
//                         <input class="form-check-input" type="checkbox" value="" id="buy" name="buy">
//                         <label class="form-check-label" for="buy">
//                             Buy
//                         </label>
//                     </div>
//                     <div class="form-check col-lg-6">
//                         <input class="form-check-input" type="checkbox" value="" id="rent" name="rent">
//                         <label class="form-check-label" for="rent">
//                             Rent
//                         </label>
//                     </div>
//                     <div class="form-check col-lg-12">
//                         <input class="form-check-input" type="checkbox" value="" id="sterm" name="sterm">
//                         <label class="form-check-label" for="sterm">
//                             Short Term
//                         </label>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <div>
//             <h6 class="pb-2 pt-3">Type of Place</h6>
//             <div class="container-fluid">
//                 <div class="row">
//                     <div class="form-check col-lg-6">
//                         <input class="form-check-input" type="checkbox" value="" id="allproperty"
//                                name="allproperty">
//                         <label class="form-check-label" for="allproperty">
//                             All
//                         </label>
//                     </div>
//                     <div class="form-check col-lg-6">
//                         <input class="form-check-input" type="checkbox" value="" id="penthouse"
//                                name="penthouse">
//                         <label class="form-check-label" for="penthouse">
//                             Penthouse
//                         </label>
//                     </div>
//                     <div class="form-check col-lg-6">
//                         <input class="form-check-input" type="checkbox" value="" id="townhouse"
//                                name="townhouse">
//                         <label class="form-check-label" for="townhouse">
//                             Townhouse
//                         </label>
//                     </div>
//                     <div class="form-check col-lg-6">
//                         <input class="form-check-input" type="checkbox" value="" id="apartment"
//                                name="apartment">
//                         <label class="form-check-label" for="apartment">
//                             Apartment
//                         </label>
//                     </div>
//                     <div class="form-check col-lg-6">
//                         <input class="form-check-input" type="checkbox" value="" id="comercial"
//                                name="comercial">
//                         <label class="form-check-label" for="comercial">
//                             Comercial
//                         </label>
//                     </div>
//                     <div class="form-check col-lg-6">
//                         <input class="form-check-input" type="checkbox" value="" id="house" name="house">
//                         <label class="form-check-label" for="house">
//                             House
//                         </label>
//                     </div>
//                     <div class="form-check col-lg-6">
//                         <input class="form-check-input" type="checkbox" value="" id="plot" name="plot">
//                         <label class="form-check-label" for="plot">
//                             Plot
//                         </label>
//                     </div>
//                 </div>
//             </div>
  
//         </div>
//         <div>
//             <h6 class="pb-2 pt-3">Price Range</h6>
//             <div class="col-sm-12">
//                 <div id="slider-range"></div>
//             </div>
//         </div>
//         <div class="slider-labels d-flex justify-content-between">
//             <div class="caption">
//                 <strong>Min:</strong> <span id="slider-range-value1"></span>
//             </div>
//             <div class="text-right caption">
//                 <strong>Max:</strong> <span id="slider-range-value2"></span>
//             </div>
//         </div>
//         <div class="row">
//             <div class="col-sm-12">
//                 <form>
//                     <input type="hidden" name="min-value" value="">
//                     <input type="hidden" name="max-value" value="">
//                 </form>
//             </div>
//         </div>
//         <div>
  
//         </div>
//         <div>
//             <h6 class="pb-2 pt-3">Features</h6>
//             <div class="form-check">
//                 <input class="form-check-input" type="checkbox" value="" id="Bargain" name="bargain">
//                 <label class="form-check-label" for="Bargain">
//                     Bargain
//                 </label>
//             </div>
//             <div class="form-check">
//                 <input class="form-check-input" type="checkbox" value="" id="Beachfront" name="beachFront">
//                 <label class="form-check-label" for="Beachfront">
//                     Beachfront
//                 </label>
//             </div>
//             <div class="form-check">
//                 <input class="form-check-input" type="checkbox" value="" id="Golf" name="golf">
//                 <label class="form-check-label" for="Golf">
//                     Golf View
//                 </label>
//             </div>
//             <div class="form-check">
//                 <input class="form-check-input" type="checkbox" value="" id="Gym" name="gym">
//                 <label class="form-check-label" for="Gym">
//                     Gym
//                 </label>
//             </div>
//             <div class="form-check">
//                 <input class="form-check-input" type="checkbox" value="" id="HeatedPool" name="heatedPool">
//                 <label class="form-check-label" for="HeatedPool">
//                     Heated Pool
//                 </label>
//             </div>
//             <div id="more-features">
  
//             </div>
//             <button class="load-more btn btn-primary mt-3 mb-2" id="load-btn">Load More</button>
//         </div>
//     </form>
//   </div>
//     `;
    
  
  
  
//     // Show the offcanvas
//     filterOffcanvasElement.show();
  
   
//   }
  
  
  
//   // Add event listener to the filter button
//   const filterBtn = document.getElementById("filterBtn");
//   filterBtn.addEventListener("click", function () {
//     // Call the function to show the filter offcanvas
//     showFilterOffcanvas();
  
   
//   });
  
   
  
  
  
  
  
  // Get references to the filter icon and offcanvas element
const filterIcon = document.getElementById('filterBtn');

const loadMOre = document.getElementById('load-btn')
console.log(loadMOre)
loadMOre.addEventListener('click',()=>{
    console.log('clicked')
})

const filterOffcanvas = new bootstrap.Offcanvas(document.getElementById('filterOffcanvas'));

// Add a click event listener to the filter icon
filterIcon.addEventListener('click', function() {
    // Toggle the offcanvas element
    filterOffcanvas.show();
});
