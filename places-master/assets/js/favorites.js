// TODO: Copy functionality for all buttons in cart and cart items from passing.js

let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
      <button class="quantity-btn" onclick="addToCart('${favorite.flight_id}', '${favorite.city}', '${favorite.price}')">Add to cart</button>
      
      <!-- Remove Button -->
      <button class="remove-btn" onclick="removeFavorite('${favorite.flight_id}')">Remove</button>
    `;
    
    favoritesList.appendChild(card);
    totalPrice += favorite.price * favorite.quantity;
  });
  
  // Update the total price display
  totalPriceElement.textContent = totalPrice;

  // Toggle sidebar visibility
  const toggleBar =  document.getElementById("cartSidebar")
  const toggleSidebar = () => toggleBar.classList.toggle("open");
  const closeSidebar = document.getElementById('closeSidebar');
  const cartIcon = document.getElementById("cartIcon");

  cartIcon.addEventListener("click", toggleSidebar);
  closeSidebar.addEventListener("click", toggleSidebar);

  updateCartCount();
  updateCartSidebar();
  updateOrderSummary();
});

const clearAllCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.length = 0;  // Clear all items in the cart

  localStorage.setItem("cart", JSON.stringify(cart)); // Save chnages to Local Storage
  updateCartCount(); // Update the cart count
  updateCartSidebar(); // Update the cart sidebar
  updateOrderSummary(); // Update the order summary
};

// Add event listener to the Clear All button
document.getElementById("clearAllButton").addEventListener("click", clearAllCart);

window.changeQuantity = (flight_id, price, change) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const flight = cart.find(item => item.flight_id === flight_id && item.price === price);
  if (flight) {
    flight.quantity += change;
    if (flight.quantity === 0) {
      removeItemFromCart(flight_id, price); // Remove item if quantity is zero
    } else {
      localStorage.setItem("cart", JSON.stringify(cart)); // Save chnages to Local Storage
      updateCartCount(); // Update the cart count
      updateCartSidebar(); // Update the cart display
      updateOrderSummary(); // Update total price
    }
  }
}

// Function to remove a favorite destination
function removeFavorite(flight_id) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites = favorites.filter(fav => fav.flight_id !== flight_id);
  
  // Save the updated favorites list
  localStorage.setItem('favorites', JSON.stringify(favorites));
  
  // Re-render the favorites page
  window.location.reload();
}

// Update the cart count displayed on the cart icon
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cartCount").textContent = totalItems;
  document.getElementById("totalItems").textContent = `Total Flights: ${totalItems}`;
}

// Function to update the order summary (total price)
function updateOrderSummary() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("totalPrice").textContent = `Total: $${total.toFixed(2)}`;
}

  // Apply a discount coupon
  function applyCoupon()  {

    const validCoupons = {
      SAVE10: 0.1, // 10% discount
      SAVE20: 0.2, // 20% discount
    };
  
    let total = 0;
    let discount = 0;

    const couponInput = document.getElementById('couponInput');
    const discountInfo = document.getElementById('discountInfo');
    const applyCoupon = document.getElementById('applyCoupon');
  
  
    const couponCode = couponInput.value.trim().toUpperCase();
    if (validCoupons[couponCode]) {
      const discountRate = validCoupons[couponCode];
      discount = total * discountRate;
  
      // Update UI
      discountInfo.style.display = "block";
      discountInfo.textContent = `Discount Applied: -$${discount.toFixed(2)} (${couponCode})`;
      couponInput.style.display = "none";
      applyCoupon.style.display = "none";
  
      // Update total
      updateOrderSummary();
    } else {
        toastr.error("Invalid coupon code! Please try again.");
    }
  };

  // Add event Listener to Apply Coupon Button
  document.getElementById('applyCoupon').addEventListener("click", applyCoupon);

// Remove item from cart (called when the user clicks the "Remove" button)
function removeItemFromCart(flight_id, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => !(item.flight_id === flight_id && item.price === price)); // Remove the item from the cart array
  // Save the updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount(); // Update the cart count
  updateCartSidebar(); // Update the cart UI
  updateOrderSummary(); // Update the order summary (total price)
}

function updateCartSidebar() {
  const cartItems = document.getElementById('cartItems');
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.innerHTML = cart.map((item) => `
    <div class="cart-item">
      <div class="item-pic">
        <div id="item_descrip">
          <h3>${item.destination_city}</h3>
          <p>Flight ID: ${item.flight_id}</p>
          <p>Departure: ${item.departure_city}</p>
          <p>Price: $${item.price}</p>
          <div class="cart-item-actions">
            <button onclick="changeQuantity('${item.flight_id}', '${item.price}', -1)">-</button>
            <span>Quantity: ${item.quantity}</span>
            <button onclick="changeQuantity('${item.flight_id}', '${item.price}', 1)">+</button>
          </div>
        </div>
        <div id="car_img">
          <img src="./assets/images/${item.image_name}" alt="Cart" width="150" height="90">
        </div>
      </div>
      <div class="cart-item-actions">
        <button id ="removeBtn" onclick="removeItemFromCart('${item.flight_id}', '${item.price}')">Remove</button>
      </div>
    </div>
  `).join("");
};

// function to add item to cart
function addToCart(flight_id, destination_city, price) {
  //const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find(item => item.flight_id === flight_id && item.price === price);
    
  if (existingItem) {
    // If item already in cart, increase the quantity
    existingItem.quantity += 1;
  } else {
    // If it's a new item, add it to the cart
    cart.push({
      flight_id,
      price,
      departure_city: "Toronto",
      destination_city,
      image_name: destination_city.toLowerCase() + ".jpeg",
      quantity: 1
    });
  }
  
  localStorage.setItem("cart", JSON.stringify(cart)); // Save chnages to Local Storage
  
  updateCartCount();
  updateOrderSummary();
  updateCartSidebar();
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