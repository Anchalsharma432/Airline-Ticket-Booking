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
                  class="btn-primary btn-cart btn-add-to-cart"
                  data-flight-id="${flight.flight_id}"
                  data-price="${flight.economy_class_price.toFixed(2)}"
                  data-departure_city="${flight.departure_airport_city}"
                  data-destination_city="${flight.arrival_airport_city}"
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
                  class="btn-primary btn-cart btn-add-to-cart"
                  data-flight-id="${flight.flight_id}"
                  data-price="${flight.business_class_price.toFixed(2)}"
                  data-departure_city="${flight.departure_airport_city}"
                  data-destination_city="${flight.arrival_airport_city}"
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
                  class="btn-primary btn-cart btn-add-to-cart"
                  data-flight-id="${flight.flight_id}"
                  data-price="${flight.first_class_price.toFixed(2)}"
                  data-departure_city="${flight.departure_airport_city}"
                  data-destination_city="${flight.arrival_airport_city}"
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

  // Function to display flight cards
  window.displayFlights = (flights) => {
    const container = document.getElementById('containar_for_card');
    container.innerHTML = ''; // Clear existing cards
  
    flights.map((flight, index) => 
      container.innerHTML += createFlightCard(flight, index));
  }
});