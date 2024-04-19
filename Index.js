const productDetails = document.getElementById('column');

const favoriteProductIds = [];
const shareBtn = document.getElementById('share-property');

shareBtn.style.display = 'none'

function addToFavorites(product) {
    const Items = document.getElementById('fav-items');

    if (favoriteProductIds.includes(product.id)) {
        alert('This item is already in your favorites.');
        return;
    }

    favoriteProductIds.push(product.id);

    const favoriteItem = document.createElement('div');
    favoriteItem.classList.add('col-lg-1');
    favoriteItem.innerHTML = `
      
        <div class="favorite-item">
            <div class="favorite-detail">
                <div class="detail-img">
                    <img src="${product.image}" alt="Product Image">
                </div>
                <div class="d-flex align-items-center justify-content-between">
                    <p style="font-size: 14px; color: orange">€${product.price.toLocaleString('en-US')}</p>
                    <i class="fa-solid fa-heart" style="font-size: 12px; color: red"></i>
                </div>
            </div>
        </div>
    `;

    Items.appendChild(favoriteItem);
    localStorage.setItem("favoriteProductIds", JSON.stringify(favoriteProductIds));
    favoriteItem.addEventListener("click", () => {
        showProductDetails(product);
    });
    toggleShareButtonVisibility();

}

function toggleShareButtonVisibility() {
    shareBtn.style.display = 'block'
}

function handleAddToFavorites(product) {
    return function (event) {
        event.stopPropagation();
        addToFavorites(product);


    };
}

async function fetchData() {
    try {
        const response = await fetch('ApiData.json');
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return [];
    }
}

async function renderProductCards() {
    const columnsContainer = document.getElementById('columnsContainer');
    const products = await fetchData();

    products.forEach(product => {
        const column = document.createElement('div');
        column.classList.add('column');
        column.innerHTML = `
            <div class="card property-card-container mb-4 p-2" style="max-width: 100%;">
  <div class="row align-items-center p-card-row">
    <div class="col-md-4">
      <img class = 'p-card-img' src=${product.image} class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body p-0">
        <h6 class="trim card-title">${product.title}</h6>
        <p class="p-card-price card-text m-0 py-2">€${product.price.toLocaleString('en-DE')}</p>
        <p class="card-text d-flex gap-2"><img style="width: 15px" src="./assets/img/location.svg" alt=""><span class="trim">${product.location}</span></p>
      </div>
    </div>
  </div>
</div>
        `;
        columnsContainer.appendChild(column);

        column.addEventListener("click", () => {
            showProductDetails(product);
        });
    });

    if (products.length > 0) {
        showProductDetails(products[0]);
    }
}


// Text Trim on Small Screen //

function trimText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

function updateProductDetails(product) {
    let trimmedTitle;
    if (window.innerWidth <= 576) {
        trimmedTitle = trimText(product.title, 22);
    } else if (window.innerWidth <= 992) {
        trimmedTitle = trimText(product.title, 30);
    } else if (window.innerWidth <= 768) {
        trimmedTitle = trimText(product.title, 30);
    } else {
        trimmedTitle = product.title;
    }
    console.log('Original Title:', product.title);
    console.log('Trimmed Title:', trimmedTitle);

    const titleElement = document.querySelector('.property-title');
    if (titleElement) {
        titleElement.textContent = trimmedTitle;
    }
}

// Text Trim on Small Screen End //

function showProductDetails(product) {
    const favoriteBtn = document.createElement('button');
    favoriteBtn.classList.add('favorite-btn');
    favoriteBtn.textContent = 'Add to Comparison';
    favoriteBtn.addEventListener('click', handleAddToFavorites(product));


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
                         <h1>€${product.price.toLocaleString('en-DE')} / Year</h1>
                         <div class="d-flex align-items-center gap-3">
                         <h5 class="p-ref-no">${product.refNo}</h5>
                         <button class="btn heart-btn"> <i class="fa-solid fa-heart"></i></div>
                          </div>
                          </div>
                            <p class="card-text d-flex gap-2 pt-2"><img style="width: 15px" src="./assets/img/location.svg" alt="">${product.location}</p>
                        </div>
                    </div>
                    <div class="detail-border">
                    
</div>
<section class="property-overview">
<h5 class="py-4">Overview</h5>
<div class="row">
<div class="col-lg-3">
<div class="feature">
<img src="./assets/img/bed.svg" alt="">
<div >
<p>Bedroom</p>
<p>4</p>
</div>
</div>
<div class="feature">
<img src="./assets/img/build.svg" alt="">
<div >
<p>Build Year</p>
<p>2020</p>
</div>
</div>
</div>
<div class="col-lg-3">
<div class="feature">
<img src="./assets/img/home.svg" alt="">
<div>
<p>Type</p>
<p>Home</p>
</div>
</div>
<div class="feature">
<img src="./assets/img/box.svg" alt="">
<div>
<p>Sqft</p>
<p>2200</p>
</div>
</div>
</div>
<div class="col-lg-3">
<div class="feature">
<img src="./assets/img/bath.svg" alt="">
<div >
<p>Bath</p>
<p>4</p>
</div>
</div>
<div class="feature">
<img src="./assets/img/parking.svg" alt="">
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
<span>Last Update <i> Wed, Mar 27</i></span>
</div>
</div>
<div class="col-lg-4 col-md-6">
<div class="list-date">
<img src="./assets/img/calender.svg" alt="">
<span>Listed on <i> Wed, Mar 27</i></span>
</div>
</div>
<div class="col-lg-4 col-md-12">
<button class="export-btn btn"><img style="width: 25px" src="./assets/img/export.svg" alt="">Export Document</button>
</div>
</div>
</section>
    `;

    updateProductDetails(product);

    window.addEventListener('resize', function () {
        updateProductDetails(product);
    });


    const addFvrtDiv = productDetails.querySelector('.add-fvrt');
    addFvrtDiv.insertBefore(favoriteBtn, addFvrtDiv.firstChild);
}

document.addEventListener('DOMContentLoaded', function () {

    renderProductCards();
});


// Map Preview //

var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var singleMarker = L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup();
singleMarker.addTo(map)

var OpenStreetMap_Mapnik = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
OpenStreetMap_Mapnik.addTo(map);

var Stadia_AlidadeSatellite = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
    minZoom: 0,
    maxZoom: 20,
    attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'jpg'
});
Stadia_AlidadeSatellite.addTo(map);

googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
googleStreets.addTo(map);
googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
googleSat.addTo(map)

// Controls //

var baseLayers = {
    "Open Street Map": OpenStreetMap_Mapnik,
    "Satellite": googleSat,
    "Google Map": googleStreets,
    "Water Color": Stadia_AlidadeSatellite
};

var overlays = {
    "Marker": singleMarker,
};
L.control.layers(baseLayers, overlays).addTo(map);

// Load More Features //

document.addEventListener("DOMContentLoaded", function () {
    const loadMoreBtn = document.getElementById('load-btn')
    const moreFeatures = document.getElementById('more-features');

    loadMoreBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (loadMoreBtn.textContent === 'Load More') {
            moreFeatures.innerHTML = `
            <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="newDev" name="newDev">
                            <label class="form-check-label" for="newDev">
                                New Development
                            </label>
                        </div>
                         <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="lift" name="lift">
                            <label class="form-check-label" for="lift">
                                Lift
                            </label>
                        </div>
                         <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="luxury" name="luxury">
                            <label class="form-check-label" for="luxury">
                               Luxury
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="seaview" name="seaview">
                            <label class="form-check-label" for="seaview">
                               Sea View
                            </label>
                        </div>
                        
            `;
            loadMoreBtn.textContent = 'Load Less';
            moreFeatures.style.maxHeight = moreFeatures.scrollHeight + "px";
        } else {
            moreFeatures.style.maxHeight = "0"; // Hide features slowly
            loadMoreBtn.textContent = 'Load More'
        }
    })
})