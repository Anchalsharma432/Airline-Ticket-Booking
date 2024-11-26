window.addEventListener('load', function() {
    // Retrieve the form data from sessionStorage
    const data = JSON.parse(sessionStorage.getItem('searchData'));
    const direction = sessionStorage.getItem('direction');
    if (data) {
      // Optionally, log or use the data
      console.log('Form Data:', data);
  
      // Use the data to populate the form or perform any action
      document.getElementById('id_label_single').value = data.from;
      document.getElementById('id_label_single2').value = data.to;
      document.getElementById('flight_class').value = data.flightClass;
      document.getElementById('num_of_adult').value = data.adults;
      document.getElementById('num_of_kids').value = data.children;
      document.getElementById('num_of_infs').value = data.infants;
      document.getElementById('probootstrap-date-departure').value = data.departureDate;
      document.getElementById('probootstrap-date-arrival').value = data.arrivalDate;
  
      // Check the radio button for direction
      if (direction) {
        const directionRadio = document.querySelector(
          `input[name="direction"][value="${direction}"]`);
        if (directionRadio) {
          directionRadio.checked = false;
        }
      }};
    	// Get today's date in YYYY-MM-DD format
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
      const day = String(today.getDate()).padStart(2, '0'); // Add leading zero if needed
      const todayDate = `${year}-${month}-${day}`;

      // Set the min attribute to today's date for the relevant date inputs
      document.getElementById('probootstrap-date-departure').setAttribute('min', todayDate);
      document.getElementById('probootstrap-date-arrival').setAttribute('min', todayDate);



    fetch('./assets/data/flights_data.json')
    .then(response => response.json())
    .then(flightsData => {
        const filteredFlights = flightsData.filter(flight => 
        flight.departure_airport_code === data.from &&
        flight.arrival_airport_code === data.to &&
        flight.departure_date === data.departureDate
        );
        console.log('Success');
        console.log("filteredFlights",filteredFlights);
        displayFlights(filteredFlights);


        

    })
    
    .catch(error => console.error('Error fetching flights data:', error));



  });

  document.getElementById('form_search').addEventListener('submit', function(event) {
        event.preventDefault();

        let from = document.getElementById('id_label_single').value;
        let to = document.getElementById('id_label_single2').value;
        let category = document.getElementById('flight_class').value;
        let adult = document.getElementById('num_of_adult').value;
        let children = document.getElementById('num_of_kids').value;
        let infant = document.getElementById('num_of_infs').value;
        let departureDate = document.getElementById('probootstrap-date-departure').value;
        let arrivalDate = document.getElementById('probootstrap-date-arrival').value;

    console.log("in search... ");


        fetch('./assets/data/flights_data.json')
        .then(response => response.json())
        .then(flightsData => {
            const filteredFlights = flightsData.filter(flight => 
            flight.departure_airport_code === from &&
            flight.arrival_airport_code === to &&
            flight.departure_date === departureDate
            );
    
            console.log("filteredFlights",filteredFlights);
    
        })
        .catch(error => console.error('Error fetching flights data:', error));



  })
  function createFlightCard(flight) {
    return `
      <div class="card">
        <div class="card-content">
          <!-- Left Section -->
          <div class="card-left">
            <div class="card-details">
              <!-- Departure Information -->
              <div class="departure-info">
                <span class="departure-code">${flight.departure_airport_code}</span>
                <span class="departure-time">${flight.departure_time}</span>
              </div>
              
              <!-- Additional Details Above Line -->
              <div class="middle-details">
                <div class="">
                  <span class="travel-time">${flight.duration}</span>
                </div>
                
                <!-- Horizontal Line -->
                <div class="divider"></div>
                
                <!-- Additional Details Below Line -->
                <div class="stop-info">
                  <span class="stops">${flight.connections_or_stops} stop${
                    flight.connections_or_stops > 1 ? 's' : ''
                  }</span>
                </div>
              </div>
              
              <!-- Arrival Information -->
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
              <span class="cabin-price">CAD ${flight.economy_class_price.toFixed(
                2
              )}</span>
            </div>
            <div class="card-cabin">
              <span class="cabin-name">Business</span>
              <span class="cabin-price">CAD ${flight.business_class_price.toFixed(
                2
              )}</span>
            </div>
            <div class="card-cabin">
              <span class="cabin-name">First</span>
              <span class="cabin-price">CAD ${flight.first_class_price.toFixed(
                2
              )}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  function displayFlights(flights) {
    const container = document.getElementById('containar_for_card');
    container.innerHTML = ''; // Clear any existing cards
  
    // Generate and append cards for each flight
    flights.forEach((flight) => {
      const cardHTML = createFlightCard(flight);
      container.innerHTML += cardHTML;
    });
  }