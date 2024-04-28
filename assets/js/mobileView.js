window.onload = initializePage;

function addToFavorites(product) {
  const Items = document.getElementById("fav-items");

  if (favoriteProductIds.includes(product.id)) {
    alert("This item is already in your favorites.");
    return;
  }

  favoriteProductIds.push(product.id);

  const favoriteItem = document.createElement("div");
  favoriteItem.classList.add("col-lg-1");
  favoriteItem.classList.add("col-4");
  favoriteItem.innerHTML = `
        <div class="favorite-item">
            <div class="favorite-detail">
                <div class="detail-img">
                    <img src="${product.image}" alt="Product Image">
                </div>
                <div class="d-flex align-items-center justify-content-between">
                    <p style="font-size: 14px; color: orange">€${product.price.toLocaleString(
                      "en-DE"
                    )}</p>
                    <i class="fa-solid fa-heart" style="font-size: 12px; color: red"></i>
                </div>
            </div>
          
            <div class="remove-fvrt">
            <a  class="nav-link remove-favorite-btn" data-product-id="${
              product.id
            }" href="javascript:void(0)"><i class="fa-solid fa-xmark"></i></a>
</div>
        </div>
    `;

  Items.appendChild(favoriteItem);
  localStorage.setItem("new fvt items", JSON.stringify(favoriteProductIds));
  favoriteItem.addEventListener("click", () => {
    showProductDetails(product);
  });
  toggleShareButtonVisibility();

  // Attach event listener to remove button
  const removeBtn = favoriteItem.querySelector(".remove-favorite-btn");
  removeBtn.addEventListener("click", function () {
    const productId = product.id;
    const index = favoriteProductIds.indexOf(productId);
    if (index !== -1) {
      favoriteProductIds.splice(index, 1);
      favoriteItem.remove();

      toggleShareButtonVisibility();
    }
  });
}

function toggleShareButtonVisibility() {
  if (favoriteProductIds.length === 0) {
    shareBtn.style.display = "none";
  } else {
    shareBtn.style.display = "block";
  }
}