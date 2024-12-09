// Wait for the DOM to be fully loaded before executing the code
document.addEventListener('DOMContentLoaded', () => {
  
  // Get the elements where the favorites list and total price will be displayed
  const favoritesList = document.getElementById('favorites-list');
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  console.log("favourite", favorites);
  const totalPriceElement = document.getElementById('total-price');

  // Empty favorites list before appending the new content
  favoritesList.innerHTML = '';

  let totalPrice = 0; // Initialize total price to 0
  
  // Loop through each favorite and create a card
  favorites.forEach(favorite => {
    // Create a new card element for each favorite destination
    const card = document.createElement('div');
    card.classList.add('favorite-card'); // Add a CSS class to the card element
    
    // Set the inner HTML of the card to display the favorite details
    card.innerHTML = `
      <h4>${favorite.city}, ${favorite.country}</h4>
      <p>Price: $${favorite.price}</p>
      <p>Flight ID: ${favorite.flight_id}</p>
      <p>Promotion Expires: ${favorite.PromotionExpirationDate}</p>
      
      <!-- Button to add to cart, passing necessary data as attributes -->
      <button
        class="quantity-btn btn-add-to-cart"
        data-flight-id="${favorite.flight_id}"
        data-price="${favorite.price}"
        data-departure_city="Toronto"
        data-destination_city="${favorite.city}">
          Add to cart
      </button>
      
      <!-- Remove Button to remove the favorite from the list -->
      <button class="remove-btn" onclick="removeFavorite('${favorite.flight_id}')">Remove</button>
    `;
    
    // Append the generated card to the favorites list container
    favoritesList.appendChild(card);

    // Add the price of the favorite item to the total price
    totalPrice += favorite.price * favorite.quantity;
  });
  
  // Update the total price display with the calculated total
  totalPriceElement.textContent = totalPrice;

});

// Function to remove a favorite destination
function removeFavorite(flight_id) {
  // Retrieve the current list of favorites from localStorage
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
  // Filter out the favorite with the matching flight ID
  favorites = favorites.filter(fav => fav.flight_id !== flight_id);
  
  // Save the updated favorites list back to localStorage
  localStorage.setItem('favorites', JSON.stringify(favorites));
  
  // Reload the page to reflect the changes (re-render the favorites list)
  window.location.reload();
}