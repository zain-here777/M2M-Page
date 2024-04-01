const productDetails = document.getElementById('column');

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

    // Show details for the first product by default
    if (products.length > 0) {
        showProductDetails(products[0]);
    }
}

function showProductDetails(product) {
    productDetails.innerHTML = `
        <div class="p-header">
            <div>
                <h2 class="property-title">${product.title}</h2>
                <p>${product.price}</p>
            </div>
            <div class="add-fvrt">
                <a href="#">
                    <button>Add to Favorite</button>
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
}

renderProductCards();
