// window.onload = initializePage;

// function addToFavorites(product) {
//   const Items = document.getElementById("fav-items");

//   if (favoriteProductIds.includes(product.id)) {
//     alert("This item is already in your favorites.");
//     return;
//   }

//   favoriteProductIds.push(product.id);

//   const favoriteItem = document.createElement("div");
//   favoriteItem.classList.add("col-lg-1");
//   favoriteItem.classList.add("col-4");
//   favoriteItem.innerHTML = `
//         <div class="favorite-item">
//             <div class="favorite-detail">
//                 <div class="detail-img">
//                     <img src="${product.image}" alt="Product Image">
//                 </div>
//                 <div class="d-flex align-items-center justify-content-between">
//                     <p style="font-size: 14px; color: orange">€${product.price.toLocaleString(
//                       "en-DE"
//                     )}</p>
//                     <i class="fa-solid fa-heart" style="font-size: 12px; color: red"></i>
//                 </div>
//             </div>
          
//             <div class="remove-fvrt">
//             <a  class="nav-link remove-favorite-btn" data-product-id="${
//               product.id
//             }" href="javascript:void(0)"><i class="fa-solid fa-xmark"></i></a>
// </div>
//         </div>
//     `;

//   Items.appendChild(favoriteItem);
//   localStorage.setItem("new fvt items", JSON.stringify(favoriteProductIds));
//   favoriteItem.addEventListener("click", () => {
//     showProductDetails(product);
//   });
//   toggleShareButtonVisibility();

//   // Attach event listener to remove button
//   const removeBtn = favoriteItem.querySelector(".remove-favorite-btn");
//   removeBtn.addEventListener("click", function () {
//     const productId = product.id;
//     const index = favoriteProductIds.indexOf(productId);
//     if (index !== -1) {
//       favoriteProductIds.splice(index, 1);
//       favoriteItem.remove();

//       toggleShareButtonVisibility();
//     }
//   });
// }

// function toggleShareButtonVisibility() {
//   if (favoriteProductIds.length === 0) {
//     shareBtn.style.display = "none";
//   } else {
//     shareBtn.style.display = "block";
//   }
// }




// renderproductsCards

// // async function renderProductCards() {
//   const columnsContainer = document.getElementById("columnsContainer");
//   const products = await fetchData();

//   products.forEach((product) => {
//     const column = document.createElement("div");
//     column.classList.add("column");
//     column.innerHTML = `
//             <div class="card property-card-container mb-4 p-2" style="max-width: 100%;">
//   <div class="row align-items-center p-card-row">
//     <div class="col-sm-2 col-md-2 col-4 col-lg-4">
//       <img class = 'p-card-img' src=${
//         product.image
//       } class="img-fluid rounded-start" alt="...">
//     </div>
//     <div class="col-sm-10 col-md-10 col-8 col-lg-8">
//       <div class="card-body p-0">
//         <h6 class="trim card-title">${product.title}</h6>
//         <p class="p-card-price card-text m-0 py-2">€${product.price.toLocaleString(
//           "en-DE"
//         )}</p>
//         <p class="card-text d-flex gap-2"><i class="fas fa-map-marker-alt" style="width:15px"></i><span class="trim">${
//           product.location
//         }</span></p>
//       </div>
//     </div>
//   </div>
// </div>
//         `;
//     columnsContainer.appendChild(column);

//     column.addEventListener("click", () => {
//       showProductDetails(product);
//       if (window.innerWidth <= 576) {
//         const offcanvasElement = new bootstrap.Offcanvas(
//           document.getElementById("offcanvasBottom")
//         );
//         offcanvasElement.show();
//       }
//     });
//   });
//   // At least show the details of first product //
//   if (products.length > 0) {
//     showProductDetails(products[0]);
//   }

// }