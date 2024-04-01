
const productDetails = document.getElementById('column')

 async function fetchData() {
    try {
        const response = await fetch('ApiData.Json');
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
        column.addEventListener("click",()=>{
            showProductDetails(product);
        })
        
        function showProductDetails(product) {
            productDetails.innerHTML = `
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p>Price: ${product.price}</p>
                <img src="${product.image}" />
            `;
        }

    });
}

renderProductCards();