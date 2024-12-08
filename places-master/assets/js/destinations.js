// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  
  // Fetch the destinations data from the JSON file
  fetch('./assets/data/destinations.json')
    .then(response => response.json()) // Parse the JSON response
    .then(destinations => {

       // Get the element where the list of destinations will be displayed
      const destinationList = document.getElementById('destination-list');
      
      
      // Generate HTML for each destination and append it to the destination list
      destinationList.innerHTML = destinations.map(destination => `
        <div class="card">
          <!-- Image of the destination -->
          <img src="./assets/images/${destination.City.toLowerCase()}.jpeg" alt="${destination.City}" class="destination-image">
          
          <!-- Destination name (City, Country) -->
          <h2>${destination.City}, ${destination.Country}</h2>
          
          <!-- Price of the flight -->
          <p>Price: $${destination.Price}</p>
          
          <!-- Flight ID -->
          <p>Flight ID: ${destination.FlightId}</p>
          
          <!-- Promotion expiration date -->
          <p>Promotion Expires: ${destination.PromotionExpirationDate}</p> 
          
          <!-- Button to toggle favorite status, passing the necessary data to the function -->
          <button class="favorite-btn" onclick="toggleFavorite('${destination.FlightId}', '${destination.City}', '${destination.Country}', ${destination.Price}, '${destination.PromotionExpirationDate}', this)">
            <span class="heart-icon">&#9825;</span>
          </button>
        </div>
      `).join(''); // Join the generated HTML strings into one block to insert into the destination list
    });


  // Add event listener to the "view-favorites" button to navigate to the favorites page  
  document.getElementById('view-favorites').addEventListener('click', () => {
    window.location.href = './favorites.html'; // Redirect to the favorites page
  });
});


// Function to toggle a destination's favorite status
function toggleFavorite(flight_id, city, country, price, expirationDate, button) {
  
  // Retrieve the current favorites list from localStorage, or initialize it as an empty array if no data exists
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
  // Check if the destination is already in the favorites list
  const existingIndex = favorites.findIndex(item => item.flight_id === flight_id);

  if (existingIndex === -1) {
    // If the destination is not already in favorites, add it to the list
    favorites.push({
      flight_id,
      city,
      country,
      price,
      quantity: 1, // Default quantity of 1
      PromotionExpirationDate: expirationDate 
    });
    alert(`${city}, ${country} added to favorites!`);
  } else {
    // If the destination is already in favorites, remove it from the list
    favorites.splice(existingIndex, 1);

    // Show alert indicating that the destination was removed from favorites
    alert(`${city}, ${country} removed from favorites!`);
  }

  // Save the updated favorites list back to localStorage
  localStorage.setItem('favorites', JSON.stringify(favorites));

  // Toggle the heart icon (filled or unfilled) on the button
  button.querySelector('.heart-icon').style.color = existingIndex === -1 ? 'red' : 'black';
}

// Add effect on each destination card 
document.querySelectorAll('.card').forEach(image => {

  // On mouseover, apply a scaling effect to enlarge the card slightly
  image.addEventListener('mouseover', () => {
    image.style.transform = 'scale(1.1)'; // Scale the card by 10%
    image.style.transition = 'transform 0.3s ease'; // Smooth transition for scaling effect
  });


  // On mouseout, reset the scaling effect
  image.addEventListener('mouseout', () => {
    image.style.transform = 'scale(1)'; // Reset to original size
  });
});
  