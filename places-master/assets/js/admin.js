const API_URL = "http://localhost:4200/flights";

let editingFlightId = null; // Track editing state

const fetchFlights = async () => {
    const response = await fetch(API_URL);
    const flights = await response.json();
    renderFlights(flights);
};

const renderFlights = (flights) => {
    const tableBody = document.querySelector("#flights-table-body");
    tableBody.innerHTML = "";

    flights.forEach(flight => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${flight.flight_id}</td>
            <td>${flight.departure_airport_city}</td>
            <td>${flight.arrival_airport_city}</td>
            <td>${flight.duration}</td>
            <td>${flight.economy_class_price.toFixed(2)}</td>
            <td>${flight.business_class_price.toFixed(2)}</td>
            <td>${flight.first_class_price.toFixed(2)}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editFlight('${flight.flight_id}')">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteFlight('${flight.flight_id}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
};

const addOrEditFlight = async (e) => {
    e.preventDefault();
    const flightData = Object.fromEntries(new FormData(e.target));

    if (editingFlightId) {
        // Update flight
        await fetch(`${API_URL}/${editingFlightId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(flightData),
        });
    } else {
        // Add new flight
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(flightData),
        });
    }

    // Reset modal state
    editingFlightId = null;
    e.target.reset();
    bootstrap.Modal.getInstance(document.querySelector("#flightModal")).hide();
    fetchFlights();
};

const editFlight = (id) => {
    // Populate modal with flight details for editing
    fetch(`${API_URL}/${id}`)
        .then(res => res.json())
        .then(flight => {
            document.querySelector("#flight-id").value = flight.flight_id;
            document.querySelector("#aircraft-type").value = flight.aircraft_type;
            document.querySelector("#departure-city").value = flight.departure_airport_city;
            document.querySelector("#arrival-city").value = flight.arrival_airport_city;
            document.querySelector("#economy-price").value = flight.economy_class_price;
            document.querySelector("#business-price").value = flight.business_class_price;
            document.querySelector("#first-price").value = flight.first_class_price;

            editingFlightId = id;
            new bootstrap.Modal(document.querySelector("#flightModal")).show();
        });
};

const deleteFlight = async (id) => {
    if (confirm("Are you sure you want to delete this flight?")) {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        fetchFlights();
    }
};

document.addEventListener("DOMContentLoaded", () => {
    fetchFlights();

    document.querySelector("#flight-form").addEventListener("submit", addOrEditFlight);
    document.querySelector("#add-flight-btn").addEventListener("click", () => {
        editingFlightId = null; // Clear editing state
        document.querySelector("#flight-form").reset();
    });
});
