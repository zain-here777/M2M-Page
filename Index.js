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
    return function(event) {
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
            <div class="card_h">
                <img class="card-img" src="${product.image}" alt="Product Image">
                <div>
                    <div class="title_h">${product.title}</div>
                    <p class="price">$${product.price}</p>
                    <div class="property-features">
                        <div>
                            <span>${product.features}</span>
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
                <p>${product.price}</p>
            </div>
            <div class="add-fvrt">
                <a href="#">
                    <!-- Place the favorite button here -->
                </a>
            </div>
        </div>
        <div class="detail-img">
            <img src="${product.image}" alt="Product Image">
            <div>
                <div>
                    <div>
                        <p>Ref. Number</p>
                        <h6>#54546</h6>
                    </div>
                    <div>
                        <p>Ref. Number</p>
                        <h6>#54546</h6>
                    </div>
                </div>
            </div>
        </div>
    `;

    const addFvrtDiv = productDetails.querySelector('.add-fvrt');
    addFvrtDiv.insertBefore(favoriteBtn, addFvrtDiv.firstChild);
}

document.addEventListener('DOMContentLoaded', function() {
    renderProductCards(); 
});
