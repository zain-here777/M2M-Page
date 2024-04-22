document.addEventListener('DOMContentLoaded', function() {
    // Create offcanvas element
    const offcanvas = document.createElement('div');
    offcanvas.id = 'offcanvasBottom';
    offcanvas.classList.add('offcanvas');
    
    // Create offcanvas body
    const offcanvasBody = document.createElement('div');
    offcanvasBody.classList.add('offcanvas-body');
    
    // Append offcanvas body to offcanvas
    offcanvas.appendChild(offcanvasBody);
    
    // Append offcanvas to the document body
    document.body.appendChild(offcanvas);
});

async function renderProductCards() {
    const columnsContainer = document.getElementById('columnsContainer');
    const products = await fetchData();

    products.forEach(product => {
        const column = document.createElement('div');
        column.classList.add('column');
        column.innerHTML = `
            <div class="property-card-container mb-4 p-2" style="max-width: 100%;">
                <div class="row align-items-center p-card-row">
                    <div class="col-md-4 col-6">
                        <img class="p-card-img" src=${product.image} class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8 col-6">
                        <div class="card-body p-0">
                            <h6 class="trim card-title">${product.title}</h6>
                            <p class="p-card-price card-text m-0 py-2">€${product.price.toLocaleString('en-DE')}</p>
                            <p class="card-text d-flex gap-2"><img style="width: 15px" src="/assets/img/location.svg" alt=""><span class="trim">${product.location}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        columnsContainer.appendChild(column);

        column.addEventListener("click", () => {
            if (window.innerWidth <= 576) {
                openOffcanvas(product);
            } else {
                showProductDetails(product);
            }
        });
    });

    if (products.length > 0) {
        if (window.innerWidth >= 576) {
            showProductDetails(products[0]);
        }
    }
}

// Function to open offcanvas

function openOffcanvas(product) {
    const offcanvasBody = document.getElementById('offcanvasBottom').querySelector('.offcanvas-body');
    offcanvasBody.innerHTML = `
        <div class="offcanvas offcanvas-bottom show" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasBottomLabel">${product.title}</h5>
                 <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div class="card property-card-container mb-4 p-2" style="max-width: 100%;">
                    <div class="row align-items-center p-card-row">
                        <div class="col-12">
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
                        <div class="col-md-8 col-9">
                            <div class="card-body p-0">
                                <p class="p-card-price card-text m-0 py-2">€${product.price.toLocaleString('en-DE')}</p>
                                <p class="card-text d-flex gap-2"><img style="width: 15px" src="../img/location.svg" alt=""><span class="trim">${product.location}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

