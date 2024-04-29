document.addEventListener('DOMContentLoaded', function() {
  const filterBtn = document.getElementById('filterBtn');
  const filterOffcanvas = new bootstrap.Offcanvas(document.getElementById('filterOffcanvas'));

  // Event listener for filter button click
  filterBtn.addEventListener('click', function() {
      filterOffcanvas.toggle(); // Toggle the visibility of the offcanvas
  });
});




// load more 


document.addEventListener("DOMContentLoaded", function () {
  const loadMoreBtn = document.getElementById("load-btns");
  const moreFeatures = document.getElementById("more-feature");


  console.log("clicked",loadMoreBtn)

  loadMoreBtn.addEventListener("click", function () {
    console.log("clicked")
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


