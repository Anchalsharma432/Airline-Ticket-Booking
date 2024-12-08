document.addEventListener('DOMContentLoaded', () => {
  fetch('./assets/data/destinations.json')
    .then(response => response.json())
    .then(destinations => {
      const destinationList = document.getElementById('destination-list');
      destinationList.innerHTML = destinations.map(destination => `
        <div class="card">
          <img src="./assets/images/${destination.City.toLowerCase()}.jpeg" alt="${destination.City}" class="destination-image">
          <h2>${destination.City}, ${destination.Country}</h2>
          <p>Price: $${destination.Price}</p>
          <p>Flight ID: ${destination.FlightId}</p>
          <p>Promotion Expires: ${destination.PromotionExpirationDate}</p> 
          <button class="favorite-btn" onclick="toggleFavorite('${destination.FlightId}', '${destination.City}', '${destination.Country}', ${destination.Price}, '${destination.PromotionExpirationDate}', this)">
            <span class="heart-icon">&#9825;</span>
          </button>
        </div>
      `).join('');
    });

  document.getElementById('view-favorites').addEventListener('click', () => {
    window.location.href = './favorites.html';
  });
});

function toggleFavorite(flight_id, city, country, price, expirationDate, button) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const existingIndex = favorites.findIndex(item => item.flight_id === flight_id);

  if (existingIndex === -1) {
    // Add to favorites with PromotionExpirationDate
    favorites.push({
      flight_id,
      city,
      country,
      price,
      quantity: 1,
      PromotionExpirationDate: expirationDate 
    });
    alert(`${city}, ${country} added to favorites!`);
  } else {
    // Remove from favorites
    favorites.splice(existingIndex, 1);
    alert(`${city}, ${country} removed from favorites!`);
  }

  // Save the updated favorites array to localStorage
  localStorage.setItem('favorites', JSON.stringify(favorites));

  // Toggle the heart icon (filled or unfilled) on the button
  button.querySelector('.heart-icon').style.color = existingIndex === -1 ? 'red' : 'black';
}

// Add effect on each destination card 
document.querySelectorAll('.card').forEach(image => {
  image.addEventListener('mouseover', () => {
    image.style.transform = 'scale(1.1)';
    image.style.transition = 'transform 0.3s ease';
  });

  image.addEventListener('mouseout', () => {
    image.style.transform = 'scale(1)';
  });
});
  