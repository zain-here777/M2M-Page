const productDetails = document.getElementById('column');

function addToFavorites(product) {


    const favoriteItem = document.createElement('div');
    favoriteItem.classList.add('favorite-item');
    favoriteItem.innerHTML = `
    <div class="favorite-item">
        <div class="favorite-detail">
            <div class="detail-img">
                <img src="${product.image}" alt="Product Image">
            </div>
            <div>
                <h3>${product.title}</h3>
                <p>${product.price}</p>
            </div>
        </div>
        </div>
    `;
    document.body.insertBefore(favoriteItem, document.body.firstChild);
}


function handleAddToFavorites(product) {
    return function (event) {
        event.stopPropagation();
        addToFavorites(product);
        
        // Store product data in cookies
        const productData = JSON.stringify(product);
        document.cookie = `favorite_product=${productData}; expires=Fri, 31 Dec 9999 23:59:59 GMT;`;
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
  <div class="row align-items-center">
    <div class="col-md-4">
      <img class = 'p-card-img' src=${product.image} class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body p-0">
        <h6 class="card-title">${product.title}</h6>
        <p class="p-card-price card-text m-0 py-2">€${product.price}</p>
        <p class="card-text d-flex gap-2"><img style="width: 15px" src="./assets/img/location.svg" alt="">${product.location}</p>
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

function showProductDetails(product) {
    const favoriteBtn = document.createElement('button');
    favoriteBtn.classList.add('favorite-btn');
    favoriteBtn.textContent = 'Add to Favorite';
    favoriteBtn.addEventListener('click', handleAddToFavorites(product));

    productDetails.innerHTML = `
        <div class="p-header">
            <div>
                <h2 class="property-title">${product.title}</h2>
                <h3 class="p-ref-no">${product.refNo}</h3>
            </div>
            <div class="add-fvrt">
                <a href="#">
                    <!-- Place the favorite button here -->
                </a>
            </div>
        </div>
        <div class="detail-img">
            <img src="${product.image}" alt="Product Image">
        </div>
         <div class="property-detail">
                        <div class="price pt-3">
                            <h1>$${product.price} / Year</h1>
                            <p class="card-text d-flex gap-2 pt-2"><img style="width: 15px" src="./assets/img/location.svg" alt="">${product.location}</p>
                        </div>
                    </div>
                    <div class="detail-border">
                    
</div>
<section class="property-overview">
<h6 class="py-4">Overview</h6>
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
<div class="col-lg-4">
<div class="list-date">
<img src="./assets/img/clock.svg" alt="">
<span>Last Update Wednesday, March 27</span>
</div>
</div>
<div class="col-lg-4">
<div class="list-date">
<img src="./assets/img/calender.svg" alt="">
<span>Listed on Wednesday, March 27</span>
</div>
</div>
<div class="col-lg-4">
<button class="export-btn btn"><img style="width: 25px" src="./assets/img/export.svg" alt="">Export Document</button>
</div>
</div>
</section>
    `;

    const addFvrtDiv = productDetails.querySelector('.add-fvrt');
    addFvrtDiv.insertBefore(favoriteBtn, addFvrtDiv.firstChild);
}

document.addEventListener('DOMContentLoaded', function () {
    renderProductCards();
});
