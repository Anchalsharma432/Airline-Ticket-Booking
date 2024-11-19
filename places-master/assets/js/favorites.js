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
      <p>Promotion Expires: ${favorite.PromotionExpirationDate}</p>
      
      <!-- Buttons to adjust quantity -->
      <button class="quantity-btn" onclick="updateQuantity('${favorite.city}', '${favorite.country}', 'decrease')">-</button>
      <span>Quantity: ${favorite.quantity}</span>
      <button class="quantity-btn" onclick="updateQuantity('${favorite.city}', '${favorite.country}', 'increase')">+</button>
      
      <!-- Remove Button -->
      <button class="remove-btn" onclick="removeFavorite('${favorite.city}', '${favorite.country}')">Remove</button>
    `;
    
    favoritesList.appendChild(card);
    totalPrice += favorite.price * favorite.quantity;
  });
  
  // Update the total price display
  totalPriceElement.textContent = totalPrice;
});

// Function to update the quantity of a favorite
function updateQuantity(city, country, action) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const index = favorites.findIndex(fav => fav.city === city && fav.country === country);
  
  if (index !== -1) {
    if (action === 'increase') {
      favorites[index].quantity++;
    } else if (action === 'decrease' && favorites[index].quantity > 1) {
      favorites[index].quantity--;
    }
    
    // Save the updated favorites to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Re-render the favorites page
    window.location.reload();
  }
}

// Function to remove a favorite destination
function removeFavorite(city, country) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites = favorites.filter(fav => fav.city !== city || fav.country !== country);
  
  // Save the updated favorites list
  localStorage.setItem('favorites', JSON.stringify(favorites));
  
  // Re-render the favorites page
  window.location.reload();
}



    /*
  
    function updateFavoritesDisplay() {
      favoritesList.innerHTML = favorites.map((favorite, index) => `
        <div class="card">
          <img src="./assets/images/${favorite.city.toLowerCase()}.jpeg" alt="${favorite.city}" class="destination-image">
          <h2>${favorite.city}, ${favorite.country}</h2>
          <p>Promotion Expires: ${favorite.promotionExpirationDate || 'N/A'}</p>
          <p>Price: $${favorite.price}</p>
          <div class="quantity-control">
            <button class="quantity-btn" onclick="decreaseQuantity(${index})">-</button>
            <span>${favorite.quantity}</span>
            <button class="quantity-btn" onclick="increaseQuantity(${index})">+</button>
          </div>
          <button class="remove-btn" onclick="removeFavorite(${index})">
            🗑️ Remove
          </button>
        </div>
      `).join('');
    }
  
    window.increaseQuantity = function (index) {
      favorites[index].quantity += 1;
      localStorage.setItem('favorites', JSON.stringify(favorites));
      updateFavoritesDisplay();
    };
  
    window.decreaseQuantity = function (index) {
      if (favorites[index].quantity > 1) {
        favorites[index].quantity -= 1;
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoritesDisplay();
      }
    };
  
    window.removeFavorite = function (index) {
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      updateFavoritesDisplay();
    };
  
    // Initial rendering of favorites
    updateFavoritesDisplay();
  });
  */