// TODO: Make this null safe, There was an error in console because IDs sort-price and sort-stops do not exist in index.html.
// sort-stops does exist BUT in searchflights.html

/* document.getElementById("sort-price").addEventListener("change", function () {
  const sortBy = this.value;
  const container = document.getElementById("containar_for_card");
  let flights = Array.from(container.children);

  flights.sort((a, b) => {
      const priceA = parseFloat(a.querySelector(".cabin-price").textContent.replace("CAD ", ""));
      const priceB = parseFloat(b.querySelector(".cabin-price").textContent.replace("CAD ", ""));
      return sortBy === "low-to-high" ? priceA - priceB : priceB - priceA;
  });

  container.innerHTML = ""; // Clear existing cards
  flights.forEach((flight) => container.appendChild(flight)); // Append sorted cards
}); 

document.getElementById("sort-stops").addEventListener("change", function () {
  const filterByStops = this.value;
  const container = document.getElementById("containar_for_card");
  const flights = Array.from(container.children);

  flights.forEach((flight) => {
      const stops = flight.querySelector(".stops").textContent;
      const stopCount = stops.includes("Direct") ? 0 : parseInt(stops);

      if (filterByStops === "all" || stopCount == filterByStops || (filterByStops === "direct" && stopCount === 0)) {
          flight.style.display = "block"; // Show matching flights
      } else {
          flight.style.display = "none"; // Hide non-matching flights
      }
  });
}); */



document.addEventListener("DOMContentLoaded", function () {

  const validCoupons = {
    SAVE10: 0.1, // 10% discount
    SAVE20: 0.2, // 20% discount
  };

  let total = 0;
  let discount = 0;

  window.addEventListener('load', function () {
    // Retrieve the form data from sessionStorage
    const data = JSON.parse(sessionStorage.getItem('searchData'));
    const direction = sessionStorage.getItem('direction');
  
    if (data) {
      console.log('Form Data:', data);
  
      // Populate the form fields with saved data
      document.getElementById('id_label_single').value = data.from;
      document.getElementById('id_label_single2').value = data.to;
      document.getElementById('flight_class').value = data.flightClass;
      document.getElementById('probootstrap-date-departure').value = data.departureDate;
      document.getElementById('probootstrap-date-arrival').value = data.arrivalDate;
  
      // Set the correct radio button for direction
      if (direction) {
        const directionRadio = document.querySelector(
          `input[name="direction"][value="${direction}"]`
        );
        if (directionRadio) {
          directionRadio.checked = true;
        }
      }
    }
  
    // Set today's date as the minimum date for departure and arrival
    const today = new Date();
    const todayDate = today.toISOString().split('T')[0];
    document.getElementById('probootstrap-date-departure').setAttribute('min', todayDate);
    document.getElementById('probootstrap-date-arrival').setAttribute('min', todayDate);
  
    // Fetch flight data and display matching flights on page load
    fetch('./assets/data/flights_data.json')
      .then((response) => response.json())
      .then((flightsData) => {
        if (data) {
          const filteredFlights = filterFlights(flightsData, data, direction);
          displayFlights(filteredFlights);
        }
      })
      .catch((error) => console.error('Error fetching flights data:', error));
  }); // end of load
  
  // Event listener for form submission
  document.getElementById('form_search').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const from = document.getElementById('id_label_single').value;
    const to = document.getElementById('id_label_single2').value;
    const departureDate = document.getElementById('probootstrap-date-departure').value;
    const arrivalDate = document.getElementById('probootstrap-date-arrival').value;
    const direction = document.querySelector('input[name="direction"]:checked').value;
  
    const searchData = {
      from,
      to,
      departureDate,
      arrivalDate,
    };
  
    sessionStorage.setItem('searchData', JSON.stringify(searchData));
    sessionStorage.setItem('direction', direction);
  
    fetch('./assets/data/flight_data.json')
      .then((response) => response.json())
      .then((flightsData) => {
        const filteredFlights = filterFlights(flightsData, searchData, direction);
        displayFlights(filteredFlights);
      })
      .catch((error) => console.error('Error fetching flights data:', error));
  });
  
  // Function to filter flights based on search criteria
  function filterFlights(flightsData, data, direction) {
    const departureFlights = flightsData.filter(
      (flight) =>
        flight.departure_airport_code === data.from &&
        flight.arrival_airport_code === data.to &&
        flight.departure_date === data.departureDate
    );
  
    if (direction === 'round-trip') {
      const returnFlights = flightsData.filter(
        (flight) =>
          flight.departure_airport_code === data.to &&
          flight.arrival_airport_code === data.from &&
          flight.departure_date === data.arrivalDate
      );
  
      return [...departureFlights, ...returnFlights];
    }
  
    return departureFlights;
  }
  
  // Function to create a flight card
  function createFlightCard(flight, index) {
    return `
    
      <div class="card">
        <div class="card-content">
          <!-- Left Section -->
          <div class="card-left">
            <div class="card-details">
              <div class="departure-info">
                <span class="departure-code">${flight.departure_airport_code}</span>
                <span class="departure-time">${flight.departure_time}</span>
              </div>
              <div class="middle-details">
                <div class="travel-time">${flight.duration}</div>
                <div class="divider"></div>
                <div class="stop-info">${flight.connections_or_stops} stop${
      flight.connections_or_stops > 1 ? 's' : ''
    }</div>
              </div>
              <div class="arrival-info">
                <span class="arrival-code">${flight.arrival_airport_code}</span>
                <span class="arrival-time">${flight.arrival_time}</span>
              </div>
            </div>
          </div>
          <!-- Right Section -->
          <div class="card-right">
            <div class="card-cabin">
              <span class="cabin-price">${flight.aircraft_type}</span>
              <span class="cabin-price">${flight.flight_id}</span>
            </div>
            <div class="card-cabin">
              <span class="cabin-name">Economy</span>
              <span class="cabin-price">CAD ${flight.economy_class_price.toFixed(2)}</span>
              <span>
                <button
                  class="btn-primary btn-cart"
                  data-flight-id="${flight.flight_id}"
                  data-price="${flight.economy_class_price.toFixed(2)}"
                  data-departure="${flight.departure_airport_city}"
                  data-destination="${flight.arrival_airport_city}"
                  style="font-size: x-small;">
                    Add to Cart
                </button>
              </span>
            </div>
            <div class="card-cabin">
              <span class="cabin-name">Business</span>
              <span class="cabin-price">CAD ${flight.business_class_price.toFixed(2)}</span>
              <span>
                <button
                  class="btn-primary btn-cart"
                  data-flight-id="${flight.flight_id}"
                  data-price="${flight.business_class_price.toFixed(2)}"
                  data-departure="${flight.departure_airport_city}"
                  data-destination="${flight.arrival_airport_city}"
                  style="font-size: x-small;">
                    Add to Cart
                </button>
              </span>
            </div>
            <div class="card-cabin">
              <span class="cabin-name">First</span>
              <span class="cabin-price">CAD ${flight.first_class_price.toFixed(2)}</span>
              <span>
                <button
                  class="btn-primary btn-cart"
                  data-flight-id="${flight.flight_id}"
                  data-price="${flight.first_class_price.toFixed(2)}"
                  data-departure="${flight.departure_airport_city}"
                  data-destination="${flight.arrival_airport_city}"
                  style="font-size: x-small;">
                    Add to Cart
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  window.addEventListener('load', function () {
    // Clear form fields
    document.getElementById('form_search').reset();
  
    // Optionally, clear sessionStorage if you are storing form data
    sessionStorage.removeItem('searchData');
    sessionStorage.removeItem('direction');
  });

  ////////////////// CART MANAGEMENT /////////////////////

  // Initialize the cart array (either load from LocalStorage or start with an empty array)
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Toggle sidebar visibility
  const toggleBar =  document.getElementById("cartSidebar")
  const toggleSidebar = () => toggleBar.classList.toggle("open");
  const closeSidebar = document.getElementById('closeSidebar');
  const cartIcon = document.getElementById("cartIcon");

  cartIcon.addEventListener("click", toggleSidebar);
  closeSidebar.addEventListener("click", toggleSidebar);

  // Function to display flight cards
  window.displayFlights = (flights) => {
    const container = document.getElementById('containar_for_card');
    container.innerHTML = ''; // Clear existing cards
  
    flights.map((flight, index) => 
      container.innerHTML += createFlightCard(flight, index));
    /*
    flights.forEach((flight) => {
      container.innerHTML += createFlightCard(flight);
    });
    */

    /////////////////////////////////////////////////////////
    //                   Event Listeners             
    //        Adding Flights from search to the Cart
    //////////////////////////////////////////////////////////

    // Adding event listeners for adding to cart from flight cards
    const cartButtons = document.getElementsByClassName("btn-cart");

    // Loop through the collection of buttons and add an event listener to each
    Array.from(cartButtons).forEach((button) => {
        button.addEventListener('click', () => handleAddToCartButtonClick(button));
    });

    // Function to handle the Add to Cart button (called when clicked)
    function handleAddToCartButtonClick(button) {
      // All these values are data attributes that were added to the "Add to Cart button"
      const flightId = button.getAttribute('data-flight-id');
      const price = button.getAttribute('data-price');
      const departure = button.getAttribute('data-departure');
      const destination = button.getAttribute('data-destination');
      addToCart(flightId, price, departure, destination);
    }

  }

  // ------------------------------
  // Functions: Local Storage Handling
  // ------------------------------

  // Save cart into Browser's Local Storage
  const saveCartToLocalStorage = () => {
    // Step 1: Log Cart Data (Debugging)
    console.log("Saving cart to localStorage:", cart);

    // Step 2: Serialize and Save Data:
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // Load cart from localStorage
  const loadCartFromLocalStorage = () => {
    // Step 1: Get Data from localStorage
    const savedCart = localStorage.getItem("cart"); 
    console.log(savedCart)
    console.log("Saved cart from localStorage:", savedCart); // Debug

    if (savedCart) {
      try {
        // Step 2: Parse the Retrieved Data
        const parsedCart = JSON.parse(savedCart);
        console.log("Parsed cart:", parsedCart); // Debug

        // Step 3: Validate the Parsed Data:
        if (Array.isArray(parsedCart)) {
          cart.push(...parsedCart); // Only push if it's an array
        } else {
          console.error("Parsed cart is not an array:", parsedCart);
        }
      } catch (error) { // Step 4: Handle Parsing Errors
        console.error("Error parsing cart data from localStorage:", error);
      }
    }
  };
  
  // ADD TO CART FUNCTION
  window.addToCart = (flight_id, price, departure_city, destination_city)  => {
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
        image_name: destination_city.toLowerCase() + ".jpeg",
        quantity: 1
      });
      console.log("Flight Added to the cart");
    }

    updateCartCount();
    updateCartSidebar();
    updateOrderSummary();
    saveCartToLocalStorage(); // Save chnages to Local Storage
  }

  // Update the cart count displayed on the cart icon
  function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cartCount").textContent = totalItems;
    document.getElementById("totalItems").textContent = `Total Flights: ${totalItems}`;
  }
  updateCartCount();

  // Function to update the cart sidebar
  const cartItems = document.getElementById('cartItems');
  const updateCartSidebar = () => {
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
          <button onclick="removeItemFromCart('${item.flight_id}', '${item.price}',)">Remove</button>
        </div>
      </div>
    `).join("");
  };
  updateCartSidebar();

  // Function to update the order summary (total price)
  window.updateOrderSummary = () => {
    total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById("totalPrice").textContent = `Total: $${total.toFixed(2)}`;
  }
  updateOrderSummary();
  // Apply a discount coupon
  const applyCoupon = () => {

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

  window.changeQuantity = (flight_id, price, change) => {
    const flight = cart.find(item => item.flight_id === flight_id && item.price === price);
    if (flight) {
      flight.quantity += change;
      if (flight.quantity === 0) {
        removeItemFromCart(flight_id, price); // Remove item if quantity is zero
      } else {
        updateCartCount(); // Update the cart count
        updateCartSidebar(); // Update the cart display
        updateOrderSummary(); // Update total price
        saveCartToLocalStorage(); // Save chnages to Local Storage
      }
    }
  } 

  const clearAllCart = () => {
    cart.length = 0;  // Clear all items in the cart

    updateCartCount(); // Update the cart count
    updateCartSidebar(); // Update the cart sidebar
    updateOrderSummary(); // Update the order summary
    saveCartToLocalStorage(); // Save changes to local storage
  };

  // Add event listener to the Clear All button
  document.getElementById("clearAllButton").addEventListener("click", clearAllCart);

  // Remove item from cart (called when the user clicks the "Remove" button)
  window.removeItemFromCart = (flight_id, price) => {
    cart = cart.filter(flight => !(flight.flight_id === flight_id && flight.price === price));// Remove the item from the cart array
    console.log("removeItemFromCart - cart: ", cart)
    updateCartCount(); // Update the cart count
    updateCartSidebar(); // Update the cart UI
    updateOrderSummary(); // Update the order summary (total price)
    saveCartToLocalStorage(); // Save chnages to Local Storage
  }

});