
function isMobileView() {
    return window.innerWidth <= 576;
}

function renderMobileView() {
    const filter = document.getElementById('filter');
    const navbar = document.getElementById('navbar');
    const propertiesContainer = document.getElementById('columnsContainer');
    const detailOnDesktop = document.getElementById('column');
    const propertiesContainerOnMobile = document.getElementById('columnsContainerMobile');
    if (isMobileView()) {
        filter.parentNode.removeChild(filter);
        detailOnDesktop.style.display = 'none'
        propertiesContainer.parentNode.removeChild(propertiesContainer)
        navbar.style.display = 'block';
        propertiesContainerOnMobile.style.display = 'block'

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
            const columnsContainer = document.getElementById('columnsContainerMobile');
            const products = await fetchData();

            products.forEach(product => {
                const column = document.createElement('div');
                column.classList.add('column');
                column.innerHTML = `
            <div class="card property-card-container mb-4 p-2" style="max-width: 100%;" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">
  <div class="row align-items-center p-card-row">
    <div class="col-md-4 col-3">
      <img class = 'p-card-img' src=${product.image} class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8 col-9">
      <div class="card-body p-0">
        <h6 class="trim card-title">${product.title}</h6>
        <p class="p-card-price card-text m-0 py-2">€${product.price.toLocaleString('en-DE')}</p>
        <p class="card-text d-flex gap-2"><img style="width: 15px" src="../img/location.svg" alt=""><span class="trim">${product.location}</span></p>
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
        document.addEventListener('DOMContentLoaded', function () {

            renderProductCards();
        });
        function showProductDetails(product) {
            const favoriteBtn = document.createElement('button');
            favoriteBtn.classList.add('favorite-btn');
            favoriteBtn.textContent = 'Add to Comparison';
            favoriteBtn.addEventListener('click', handleAddToFavorites(product));


            detailColumn.innerHTML = `
<div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasBottomLabel">Offcanvas bottom</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body small">
    ...
  </div>
</div>
       
    `;

            updateProductDetails(product);

            window.addEventListener('resize', function() {
                updateProductDetails(product);
            });


            const addFvrtDiv = productDetails.querySelector('.add-fvrt');
            addFvrtDiv.insertBefore(favoriteBtn, addFvrtDiv.firstChild);
        }
    }
    else{
        filter.appendChild(filter)
        navbar.style.display = 'none';
        propertiesContainer.style.display = 'block';
        detailOnDesktop.style.display = 'block'
        propertiesContainerOnMobile.style.display = 'none';

        parentContainer.appendChild(propertiesContainer);
    }
}

function handleViewportResize() {
    window.addEventListener('resize', function () {
        renderMobileView();
    })
}

function initMobileView() {
    renderMobileView();
    handleViewportResize();
}

initMobileView();