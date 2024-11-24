window.addEventListener('load', function() {
    // Retrieve the form data from sessionStorage
    const data = JSON.parse(sessionStorage.getItem('searchData'));
  
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
      if (data.direction) {
        document.querySelector(`input[name="direction"][value="${data.direction}"]`).checked = true;
      }
    } else {
      console.log('No data found in sessionStorage');
    }

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

        console.log("filteredFlights",filteredFlights);

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
  