document.addEventListener('DOMContentLoaded', () => {
  
  const favoritesList = document.getElementById('favorites-list');
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const totalPriceElement = document.getElementById('total-price');

  // Empty favorites list before appending the new content
  favoritesList.innerHTML = '';

  let totalPrice = 0;
  
  // Loop through each favorite and create a card
  favorites.forEach(favorite => {
    const card = document.createElement('div');
    card.classList.add('favorite-card');
    
    card.innerHTML = `
      <h4>${favorite.city}, ${favorite.country}</h4>
      <p>Price: $${favorite.price}</p>
      <p>Flight ID: ${favorite.flight_id}</p>
      <p>Promotion Expires: ${favorite.PromotionExpirationDate}</p>
      
      <!-- Button to add to cart -->
      <button
        class="quantity-btn btn-add-to-cart"
        data-flight-id="${favorite.flight_id}"
        data-price="${favorite.price}"
        data-departure_city="Toronto"
        data-destination_city="${favorite.city}">
          Add to cart
      </button>
      
      <!-- Remove Button -->
      <button class="remove-btn" onclick="removeFavorite('${favorite.flight_id}')">Remove</button>
    `;
    
    favoritesList.appendChild(card);
    totalPrice += favorite.price * favorite.quantity;
  });
  
  // Update the total price display
  totalPriceElement.textContent = totalPrice;

});

// Function to remove a favorite destination
function removeFavorite(flight_id) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites = favorites.filter(fav => fav.flight_id !== flight_id);
  
  // Save the updated favorites list
  localStorage.setItem('favorites', JSON.stringify(favorites));
  
  // Re-render the favorites page
  window.location.reload();
}