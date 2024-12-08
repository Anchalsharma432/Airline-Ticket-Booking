// Define valid coupons with their discount rates (as percentage)
const validCoupons = {
    SAVE10: 0.1, // 10% discount
    SAVE20: 0.2, // 20% discount
};

// Initialize total price and discount
let total = 0;
let discount = 0;

// Event listener for when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Toggle sidebar visibility when cart icon or close button is clicked
    const toggleBar =  document.getElementById("cartSidebar")
    const toggleSidebar = () => toggleBar.classList.toggle("open");
    const closeSidebar = document.getElementById('closeSidebar');
    const cartIcon = document.getElementById("cartIcon");

    // Attach click event listeners to the cart icon and close button to toggle sidebar
    cartIcon.addEventListener("click", toggleSidebar);
    closeSidebar.addEventListener("click", toggleSidebar);

    // Get all "Add to Cart" buttons and attach event listeners
    const addToCartButtons = document.getElementsByClassName("btn-add-to-cart")
    if (addToCartButtons) {
        Array.from(addToCartButtons).forEach(button => {
            button.addEventListener("click", () => onAddToCartButtonClicked(button));
        });
    }

    // Handle clicks within the flights container to add items to the cart
    const flightsContainer = document.getElementById("containar_for_card")
    if (flightsContainer) {
        // Listen to click events on buttons inside flightsContainer that can add items to the cart
        flightsContainer.addEventListener("click", (event) => {
            if (event.target.classList.contains("btn-add-to-cart")) {
                onAddToCartButtonClicked(event.target);
            }
        });
    }

    // Attach event listener to the "Clear All" button
    document.getElementById("clearAllButton").addEventListener("click", clearAllCart);

    // Update cart UI (order summary, cart count, and sidebar content)
    updateOrderSummary();
    updateCartCount();
    updateCartSidebar();
});

// Handle the "Add to Cart" button click event
function onAddToCartButtonClicked(button) {
    // All these values are data attributes that were added to the "Add to Cart" button
    const flight_id = button.getAttribute('data-flight-id');
    const price = button.getAttribute('data-price');
    const departure_city = button.getAttribute('data-departure_city');
    const destination_city = button.getAttribute('data-destination_city');
    
    // Add the item to the cart
    addToCart(flight_id, price, departure_city, destination_city);
}
  
// Update the cart count displayed on the cart icon (number of items in the cart)
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cartCount").textContent = totalItems;
    document.getElementById("totalItems").textContent = `Total Flights: ${totalItems}`;
}
    
// Function to update the order summary (total price and discount, if any)
function updateOrderSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById("totalPrice").textContent = `Total Price: $${(total - discount).toFixed(2)}`;
}

// Update the cart sidebar with current cart items
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
                <button id="removeBtn" onclick="removeItemFromCart('${item.flight_id}', '${item.price}')">Remove</button>
            </div>
    </div>
    `).join(""); // Display each item in the cart
};
  
// Apply a discount coupon based on user input
function applyCoupon()  {
    const couponInput = document.getElementById('couponInput');
    const discountInfo = document.getElementById('discountInfo');
    const applyCoupon = document.getElementById('applyCoupon');

    const couponCode = couponInput.value.trim().toUpperCase(); // Get coupon code from input field
    if (validCoupons[couponCode]) { // Check if the coupon code is valid
        const discountRate = validCoupons[couponCode];
        discount = total * discountRate; // Calculate discount based on total price

        // Update UI to show discount information
        discountInfo.style.display = "block";
        discountInfo.textContent = `Discount Applied: -$${discount.toFixed(2)} (${couponCode})`;
        couponInput.style.display = "none"; // Hide the coupon input
        applyCoupon.style.display = "none"; // Hide the apply coupon button

        // Update the order summary with the new total after discount
        updateOrderSummary();
    } else {
        toastr.error("Invalid coupon code! Please try again."); // Show error message for invalid coupon
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

// Clear all items in cart
function clearAllCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.length = 0;  // Clear all items in the cart

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(); // Update the cart count
    updateCartSidebar(); // Update the cart sidebar
    updateOrderSummary(); // Update the order summary
};

// Update quantity of item in cart (+/-)
function changeQuantity(flight_id, price, change) {
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

// Add cart item
function addToCart(flight_id, price, departure_city, destination_city) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Check if the flight is already in the cart
    const existingItem = cart.find(item => item.flight_id === flight_id && item.price === price);
    
    if (existingItem) {
        // If item already in cart, increase the quantity
        existingItem.quantity += 1;
        console.log("Flight quantity was increased");
    } else {
        // If it's a new item, add it to the cart
        cart.push({
            flight_id,
            price,
            departure_city,
            destination_city,
            image_name: destination_city.toLowerCase() + ".jpeg", // Use city name as image
            quantity: 1
        });
        console.log("Flight Added to the cart");
    }

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart)); // Save chnages to Local Storage
    updateCartCount(); // Update the cart count
    updateCartSidebar(); // Update the cart display
    updateOrderSummary(); // Update total price
}
  