const productDetails = document.getElementById("column");
const shareBtn = document.getElementById("share-property");

shareBtn.style.display = "none";

let favoriteProductIds = [];

function initializePage() {
  const storeData = localStorage.getItem('new_fvt_items');

  if (storeData) {
    favoriteProductIds = JSON.parse(storeData);
  }

  console.log('Retrieved favorite product IDs:', favoriteProductIds);
  renderFavoriteItems();
}

window.onload = initializePage;

const renderFavoriteItems = () => {
  const Items = document.getElementById("fav-items");

  Items.innerHTML = '';

  favoriteProductIds.forEach(productId => {
    const favoriteItem = createFavoriteItem(productId);
    Items.appendChild(favoriteItem);
  });

  toggleShareButtonVisibility();
};

function createFavoriteItem(productId) {
  
  console.log(productId)

  const favoriteItem = document.createElement("div");
  favoriteItem.classList.add("col-lg-1");
  favoriteItem.classList.add("col-4");
  favoriteItem.innerHTML = ` <div class="favorite-item">
  <div class="favorite-detail">
 
  
      <div class="detail-img">
          <img src="${productId.image}" alt="Product Image" class="w-100">
      </div>
      <div class="d-flex align-items-center justify-content-between">
          <p style="font-size: 14px; color: orange">€${productId.price.toLocaleString(
            "en-DE"
          )}</p>
      </div>
  </div>
  <div class="remove-fvrt">
  <a  class="nav-link remove-favorite-btn" data-product-id="${
    productId.id
  }" href="javascript:void(0)"><i class="fa-solid fa-xmark"></i></a>
</div>
</div>
  `;

  favoriteItem.addEventListener('click',()=>{
    showProductDetails(productId)
    if (window.innerWidth <= 576) {
      const offcanvasElement = new bootstrap.Offcanvas(document.getElementById("offcanvasBottom"));
     offcanvasElement.show();
    }
  })
  // Attach event listener to remove button
  const removeBtn = favoriteItem.querySelector(".remove-favorite-btn");
  removeBtn.addEventListener("click", function (event) {
    const productIds = productId.id;
    event.stopPropagation();
    const index = favoriteProductIds.indexOf(productId);
    if (index !== -1) {
      favoriteProductIds.splice(index, 1);
      localStorage.setItem("new_fvt_items", JSON.stringify(favoriteProductIds));
      renderFavoriteItems(); 

      const offcanvasElement = new bootstrap.Offcanvas(document.getElementById("offcanvasBottom"));
    offcanvasElement.hide();
      toggleShareButtonVisibility();
    }



  });

 return favoriteItem; 




}



function addToFavorites(product) {
  const isProductInFavorites = favoriteProductIds.some(item => item.id === product.id);

  console.log(isProductInFavorites)

 
  
  if (isProductInFavorites) {
    alert("This item is already in your favorites.");
    return;
  }

  favoriteProductIds.push({
    id:product.id,
    price:product.price,
    image:product.image,
    refNo:product.refNo,
    title:product.title,
    feature:product.feature,
    location:product.location
  });
  localStorage.setItem("new_fvt_items", JSON.stringify(favoriteProductIds));
  renderFavoriteItems();

  toggleShareButtonVisibility();
}




function toggleShareButtonVisibility() {
  if (favoriteProductIds.length === 0) {
    shareBtn.style.display = "none";
  } else {
    shareBtn.style.display = "block";
  }
}







function handleAddToFavorites(product) {
  return function (event) {
    event.stopPropagation();
    addToFavorites(product);
  };
}






async function fetchData() {
  try {
    const response = await fetch("ApiData.json");
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }
}







async function renderProductCards(query = '') {
  const columnsContainer = document.getElementById("columnsContainer");
  const products = await fetchData();

  // Filter products based on search query (title or location)
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase()) ||
    product.location.toLowerCase().includes(query.toLowerCase())
  );

  // Update columnsContainer innerHTML to display search results header
  columnsContainer.innerHTML = `
    <h2 class="search-result-heading">Search Results</h2>
    <h5 class="pb-2 text-center text-secondary">${filteredProducts.length} Results</h5>
  `;

  // Clear existing content in columnsContainer before rendering new products
  columnsContainer.innerHTML = '';

  // Render filtered products as product cards
  if(filteredProducts.length === 0){
    columnsContainer.innerHTML = `no property are matched`
  }else{

  filteredProducts.forEach((product) => {
    const column = document.createElement("div");
    column.classList.add("column");
    column.innerHTML = `
      <div class="card property-card-container mb-4 p-2" style="max-width: 100%;">
        <div class="row align-items-center p-card-row">
          <div class="col-sm-2 col-md-2 col-4 col-lg-4">
            <img class='p-card-img' src="${product.image}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-sm-10 col-md-10 col-8 col-lg-8">
            <div class="card-body p-0">
              <h6 class="trim card-title">${product.title}</h6>
              <p class="p-card-price card-text m-0 py-2">€${product.price.toLocaleString("en-DE")}</p>
              <p class="card-text d-flex gap-2"><i class="fas fa-map-marker-alt" style="width:15px"></i><span class="trim">${product.location}</span></p>
            </div>
          </div>
        </div>
      </div>
    `;

    columnsContainer.appendChild(column);

    // Add click event listener to show product details
    column.addEventListener("click", () => {
      showProductDetails(product);

      // Optional: Show offcanvas element on small screens
      if (window.innerWidth <= 576) {
        const offcanvasElement = new bootstrap.Offcanvas(document.getElementById("offcanvasBottom"));
        offcanvasElement.show();
      }
    });
  });
}

  // Show details of the first product if available
  if (filteredProducts.length > 0) {
    showProductDetails(filteredProducts[0]);
  }
}







function trimText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}

function updateProductDetails(productId) {
  let trimmedTitle;
  if (window.innerWidth <= 576) {
    trimmedTitle =  trimText(productId.title, 30); 
  } else if (window.innerWidth <= 992) {
      trimmedTitle =  trimText(productId.title, 30); 
  }else if (window.innerWidth <= 1024) {
    trimmedTitle =  trimText(productId.title, 30); 
}
   else if (window.innerWidth <= 768) {
      trimmedTitle =  trimText(productId.title, 30); 
  }
  else if (window.innerWidth <= 1400) {
    trimmedTitle =  trimText(productId.title, 35); 
}
   else {
    trimmedTitle = productId.title;
  }
  console.log("Original Title:", productId.title);
  console.log("Trimmed Title:", trimmedTitle);

  const titleElement = document.querySelector(".property-title");
  if (titleElement) {
    titleElement.textContent = trimmedTitle;
  }
}

function isMobileView() {
  return window.innerWidth <= 576;
}

// Handle window resize event to update the view
window.addEventListener("resize", function () {
  showProductDetails({});

    if (window.innerWidth <= 576) {
        const offcanvasElement = new bootstrap.Offcanvas(
          document.getElementById("offcanvasBottom")
        );
        offcanvasElement.show();
      } 
});







// share whatsapp funcation
// function shareToWhatsApp(product) {
//   console.log(product)
//   var imageData = product.image;
//   var message = `🏡 *${product.title}*\n💰 Price: ${product.price}\n📍 Location: ${product.location}\n\n🔗 Details: 
//   ${product.features}\n\nView more details: https://m2msearch.netlify.app/\n`;

//   console.log(imageData)

//   // Encode the message and image URL
//   var encodedMessage = encodeURIComponent(message);

//   // Construct the WhatsApp share URL
//   var whatsappUrl = `whatsapp://send?text=${encodedMessage}&media=${encodeURIComponent(imageData)}`;

//   // Open the WhatsApp app with the pre-filled message and image
//   window.location.href = whatsappUrl;
// }





// share whatsapp funcation

function shareToWhatsApp(product) {
  const { title, price, location, features, image } = product;

<<<<<<< HEAD
  const message = `🏡 *${title}*\n💰 Price: €${price.toLocaleString("en-DE")} / Year\n📍 Location: ${location}\n\n🔗 Details: ${features}\n\nView more details: https://m2msearch.netlify.app/`;
  const encodedMessage = encodeURIComponent(message);
  const encodedImage = encodeURIComponent(image);

  const whatsappUrl = `whatsapp://send?text=${encodedMessage}&media=${encodedImage}`;

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.location.href = whatsappUrl;
  } else {
    console.log('Please use a mobile device with WhatsApp installed to share this content.');
  }
=======
  // Encode the message and image URL
  var encodedMessage = encodeURIComponent(message);
  var encodedImageUrl = encodeURIComponent(imageData);

  // Construct the WhatsApp share URL
  var whatsappUrl = `whatsapp://send?text=${encodedMessage}&image=${encodedImageUrl}`;

  // Open the WhatsApp app with the pre-filled message and image
  window.location.href = whatsappUrl;
>>>>>>> parent of 9ac3556 (latest commit)
}





<<<<<<< HEAD













=======
>>>>>>> parent of 9ac3556 (latest commit)
function showProductDetails(product) {
  if (isMobileView()) {
      // Show product details in offcanvas for mobile view
    const offcanvasBody = document
      .getElementById("offcanvasBottom")
      .querySelector(".offcanvas-body");
    if (offcanvasBody) {
      offcanvasBody.innerHTML = `
                <div>
                <div class="p-header mb-3">
                <div>
                    <h2 class="property-title mb-2">${product.title}</h2>
                </div>
                <div>
                <h5 class="p-ref-no">Ref No :${product.refNo}</h5>
                </div>
                <div class="add-fvrt">
                    <a href="#">
                        <!-- Place the favorite button here -->
                    </a>
                </div>
            </div>
            <div class="detail-img ">
                <div id="carouselExampleIndicators" class="carousel slide mb-4" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src=${product.image} class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src=${product.image1}  class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src=${product.image2}  class="d-block w-100" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
            </div>
            
             <div class="property-detail">
                             <div class="price pt-3">
                             <div class="d-flex justify-content-between align-items-center">
                             <h1>€${product.price.toLocaleString(
                               "en-DE"
                             )} / Year</h1>
                             <div class="d-flex align-items-center gap-3">
                             <button class="btn heart-btn" > <i class="fa-regular fa-heart"></i></div>
                              </div>
                              </div>
                                <p class="card-text d-flex gap-2 pt-2"><i class="fas fa-map-marker-alt" style="width:15px"></i>${
                                  product.location
                                }</p>
                            </div>
                        </div>
                        <div class="detail-border">
                        
    </div>
    <section class="property-overview">
    <h5 class="py-4">Overview</h5>
    <div class="row">
    <div class="col-lg-3 col-4">
    <div class="feature">
    <img src="/assets/img/bed.svg" alt="">
    <div >
    <p>Bedroom</p>
    <p>4</p>
    </div>
    </div>
    <div class="feature">
    <img src="/assets/img/build.svg" alt="">
    <div >
    <p>Build Year</p>
    <p>2020</p>
    </div>
    </div>
    </div>
    <div class="col-lg-3 col-4">
    <div class="feature">
    <img src="/assets/img/home.svg" alt="">
    <div>
    <p>Type</p>
    <p>Home</p>
    </div>
    </div>
    <div class="feature">
    <img src="/assets/img/box.svg" alt="">
    <div>
    <p>Sqft</p>
    <p>2200</p>
    </div>
    </div>
    </div>
    <div class="col-lg-3 col-4">
    <div class="feature">
    <img src="/assets/img/bath.svg" alt="">
    <div >
    <p>Bath</p>
    <p>4</p>
    </div>
    </div>
    <div class="feature">
    <img src="/assets/img/parking.svg" alt="">
    <div >
    <p>Parking</p>
    <p>Yes</p>
    </div>
    </div>
    </div>
    <div class="col-lg-3 col-4"></div>
    </div>
    <div class="row align-items-center pb-4">
    <div class="col-lg-4 col-md-6 col-12">
    <div class="list-date">
    <img src="./assets/img/clock.svg" alt="">
    <span><i>Last Update Wed, Mar 27</i></span>
    </div>
    </div>
    <div class="col-lg-4 col-md-6 col-6">
    <div class="list-date">
    <img src="./assets/img/calender.svg" alt="">
    <span><i>Listed on Wed, Mar 27</i></span>
    </div>
    </div>
   </div>
    </section>


            
                    <div class="col-lg-9">
                    <div id="column"></div>
                    <!-- <div id="columnDetailMobile"></div> -->
                    <div class="row my-5">
                        <div class="col-lg-6">
                            <div  class="submit-button-wrapper">
                                <button id="contct-us-whatsapp">Contact Us</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class=" col-3" id="btn-bottom">
                <button class="export-btn btn"><img src="./assets/img/export.svg" alt="" style="width: 20px">Export</button>
                <button class="btn share-btn export-btn" id="share-property" onclick="handleShare()">
               
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              
              
              
                Share </button>
                </div>

                `;

      // contact us btn
      const contactUsWhatsApp = document.getElementById("contct-us-whatsapp");

      contactUsWhatsApp.addEventListener("click", () => {
        const phoneNumber = "923206525840";
        const message = encodeURIComponent(
          "Hello! I would like to inquire about..."
        );
        const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${message}`;

        // Navigate to the WhatsApp app
        window.location.href = whatsappUrl;
      });

      // export btn

      function exportPropertyDetails(product) {
        const data = `
Property Title: ${product.title}
Price: €${product.price.toLocaleString("en-DE")} / Year
Location: ${product.location}
`;
        const blob = new Blob([data], { type: "text/plain;charset=utf-8" });

        const a = document.createElement("a");
        a.href = window.URL.createObjectURL(blob);
        a.download = "property_details.txt";

        document.body.appendChild(a);
        a.click();

        // Clean up
        document.body.removeChild(a);
      }
      const exportBtn = document.querySelector(".export-btn");
      exportBtn.addEventListener("click", () => {
        exportPropertyDetails(product);
      });

      // whatsapp
      const whatsappBtn = document.createElement("button");
      whatsappBtn.classList.add("btn", "share-btn" , "export-btn");

      // Create and append the SVG icon
      const svgIcon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      svgIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svgIcon.setAttribute("viewBox", "0 0 448 512");
      svgIcon.setAttribute("style", "width: 20px");

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute(
        "d",
        "M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
      );
      path.setAttribute("fill", "white");
      svgIcon.appendChild(path);
      whatsappBtn.appendChild(svgIcon);

      const buttonText = document.createTextNode("WhatsApp");
      whatsappBtn.appendChild(buttonText);

      whatsappBtn.addEventListener("click", function () {
        shareToWhatsApp(product);
      });

      const btnBottomDiv = document.getElementById("btn-bottom");
      if (btnBottomDiv) {
        btnBottomDiv.appendChild(whatsappBtn);
      } else {
        console.error("btnBottomDiv not found");
      }
    } else {
      console.error("offcanvasBody not found");
    }

    updateProductDetails(product);

    window.addEventListener("resize", function () {
      updateProductDetails(product);
    });

    // heart button favorite
    const heart_btn = document.querySelector(".heart-btn");

    heart_btn.addEventListener("click", () => {
      addToFavorites(product);
      heart_btn.style.color="red"

      localStorage.setItem("fvt",JSON.stringify(heart_btn))
     

      const offcanvasElement = new bootstrap.Offcanvas(
        document.getElementById("offcanvasBottom")
      );
      offcanvasElement.hide();
      
    });

    window.addEventListener('DOMContentLoaded',()=>{
      const storeData = localStorage.getItem('fvt')
      if(storeData){
        return JSON.parse(heart_btn)
      }else{
        return []
      }
    })


    // Create map container
    const mapContainer = document.createElement("div");
    mapContainer.id = "mapMobile";
    mapContainer.style.height = "300px";
    offcanvasBody.appendChild(mapContainer);

    // Initialize the map for mobile screens
    var mapMobile = L.map("mapMobile").setView([51.505, -0.09], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapMobile);

    var singleMarker = L.marker([51.5, -0.09])
      .addTo(mapMobile)
      .bindPopup("A pretty CSS popup.<br> Easily customizable.")
      .openPopup();
    singleMarker.addTo(mapMobile);

    var OpenStreetMap_Mapnik = L.tileLayer(
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );
    OpenStreetMap_Mapnik.addTo(mapMobile);

    // Layer initialization
    var OpenStreetMap_Mapnik = L.tileLayer(
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );
    OpenStreetMap_Mapnik.addTo(mapMobile);

    var Stadia_AlidadeSatellite = L.tileLayer(
      "https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}",
      {
        minZoom: 0,
        maxZoom: 20,
        attribution:
          '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: "jpg",
      }
    );
    Stadia_AlidadeSatellite.addTo(mapMobile);

    googleStreets = L.tileLayer(
      "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    );
    googleStreets.addTo(mapMobile);
    googleSat = L.tileLayer(
      "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
      {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    );
    googleSat.addTo(mapMobile);

    // Controls initialization
    var baseLayers = {
      openStreetMap: OpenStreetMap_Mapnik,
      Satellite: googleSat,
      "Google Map": googleStreets,
    };

    var overlays = {
      Marker: singleMarker,
    };
    L.control.layers(baseLayers, overlays).addTo(mapMobile);
  } else {
    // Show product details in main view for desktop
    const favoriteBtn = document.createElement("button");
    favoriteBtn.classList.add("favorite-btn");
    favoriteBtn.textContent = "Add to Comparison";
    favoriteBtn.addEventListener("click", handleAddToFavorites(product));

    productDetails.innerHTML = `
        <div class="p-header mb-3">
        <div>
            <h2 class="property-title mb-2">${product.title}</h2>
        </div>
        <div class="add-fvrt">
            <a href="#">
                <!-- Place the favorite button here -->
            </a>
        </div>
    </div>
    <div class="detail-img ">
        <div id="carouselExampleIndicators" class="carousel slide mb-4" data-bs-ride="carousel">
<div class="carousel-indicators">
<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
</div>
<div class="carousel-inner">
<div class="carousel-item active">
  <img src=${product.image} class="d-block w-100" alt="...">
</div>
<div class="carousel-item">
  <img src=${product.image1}  class="d-block w-100" alt="...">
</div>
<div class="carousel-item">
  <img src=${product.image2}  class="d-block w-100" alt="...">
</div>
</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
<span class="carousel-control-prev-icon" aria-hidden="true"></span>
<span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
<span class="carousel-control-next-icon" aria-hidden="true"></span>
<span class="visually-hidden">Next</span>
</button>
</div>
    </div>
    
     <div class="property-detail">
                     <div class="price pt-3">
                     <div class="d-flex justify-content-between align-items-center">
                     <h1> €${product.price.toLocaleString("en-DE")} / Year</h1>
                     <div class="d-flex align-items-center gap-3">
                     <h5 class="p-ref-no">${product.refNo}</h5>
                     <button class="btn heart-btn"> <i class="fa-solid fa-heart"></i></div>
                      </div>
                      </div>
                        <p class="card-text d-flex gap-2 pt-2"><i class="fas fa-map-marker-alt" style="width:15px"></i>${
                          product.location
                        }</p>
                    </div>
                </div>
                <div class="detail-border">
                
</div>
<section class="property-overview">
<h5 class="py-4">Overview</h5>
<div class="row">
<div class="col-lg-3">
<div class="feature">
<img src="/assets/img/bed.svg" alt="">
<div >
<p>Bedroom</p>
<p>4</p>
</div>
</div>
<div class="feature">
<img src="/assets/img/build.svg" alt="">
<div >
<p>Build Year</p>
<p>2020</p>
</div>
</div>
</div>
<div class="col-lg-3">
<div class="feature">
<img src="/assets/img/home.svg" alt="">
<div>
<p>Type</p>
<p>Home</p>
</div>
</div>
<div class="feature">
<img src="/assets/img/box.svg" alt="">
<div>
<p>Sqft</p>
<p>2200</p>
</div>
</div>
</div>
<div class="col-lg-3">
<div class="feature">
<img src="/assets/img/bath.svg" alt="">
<div >
<p>Bath</p>
<p>4</p>
</div>
</div>
<div class="feature">
<img src="/assets/img/parking.svg" alt="">
<div >
<p>Parking</p>
<p>Yes</p>
</div>
</div>
</div>
<div class="col-lg-3"></div>
</div>
<div class="row align-items-center pb-4">
<div class="col-lg-4 col-md-6">
<div class="list-date">
<img src="./assets/img/clock.svg" alt="">
<span><i>Last Update Wed, Mar 27</i></span>
</div>
</div>
<div class="col-lg-4 col-md-6">
<div class="list-date">
<img src="./assets/img/calender.svg" alt="">
<span><i>Listed on Wed, Mar 27</i></span>
</div>
</div>
<div class="col-lg-4 col-md-12">
<button class="export-btn btn"><img style="width: 25px" src="./assets/img/export.svg" alt="">Export Document</button>
</div>
</div>
</section>            
        `;

    updateProductDetails(product);

    window.addEventListener("resize", function () {
      updateProductDetails(product);
    });

    const addFvrtDiv = productDetails.querySelector(".add-fvrt");
    addFvrtDiv.insertBefore(favoriteBtn, addFvrtDiv.firstChild);
  }
}







document.addEventListener("DOMContentLoaded", function () {
  renderProductCards();
});

// Map Preview //

var map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var singleMarker = L.marker([51.5, -0.09])
  .addTo(map)
  .bindPopup("A pretty CSS popup.<br> Easily customizable.")
  .openPopup();
singleMarker.addTo(map);

var OpenStreetMap_Mapnik = L.tileLayer(
  "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
);
OpenStreetMap_Mapnik.addTo(map);

var Stadia_AlidadeSatellite = L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}",
  {
    minZoom: 0,
    maxZoom: 20,
    attribution:
      '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: "jpg",
  }
);
Stadia_AlidadeSatellite.addTo(map);

googleStreets = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);
googleStreets.addTo(map);
googleSat = L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
  maxZoom: 20,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
});
googleSat.addTo(map);

// Controls //

var baseLayers = {
  openStreetMap: OpenStreetMap_Mapnik,
  Satellite: googleSat,
  "Google Map": googleStreets,
};

var overlays = {
  Marker: singleMarker,
};
L.control.layers(baseLayers, overlays).addTo(map);

// share Properties
function handleShare(button) {
  if (navigator.share) {
    try {
      navigator.share({
        title: "M2M Properties",
        text: "M2M Properties",
        url: "https://m2msearch.netlify.app/",
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  } else {
    console.log("Sharing is not supported in this browser.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const loadMoreBtn = document.getElementById("load-btn");
  const moreFeatures = document.getElementById("more-features");

  loadMoreBtn.addEventListener("click", function () {
    if (loadMoreBtn.textContent === "Load More") {
      moreFeatures.innerHTML = `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="Garage" name="Garage">
                <label class="form-check-label" for="Garage">Garage</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="parking" name="parking">
                <label class="form-check-label" for="parking">Parking</label>
            </div>
            <!-- Add more checkboxes here -->
            `;
      loadMoreBtn.textContent = "Load Less";
      moreFeatures.style.maxHeight = moreFeatures.scrollHeight + "px";
    } else {
      moreFeatures.style.maxHeight = "0"; 
      loadMoreBtn.textContent = "Load More";
    }
  });
});







// Event listener for search input
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", () => {
  const query = searchInput.value.trim();
  renderProductCards(query);
});




