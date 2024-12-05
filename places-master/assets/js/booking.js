document.addEventListener("DOMContentLoaded", function () {
    const n = 3; // Change this value to the number of passengers you want to generate forms for
    const container = document.getElementById("containar_for_card");
    const total = 2000;  
    for (let i = 1; i <= n; i++) {
      const passengerForm = document.createElement("div");
      passengerForm.className = "card mb-3";
  
      // Passenger Details
      passengerForm.innerHTML = `
        <div class="card-header">
          <h5>Passenger ${i} Details</h5>
        </div>
        <div class="card-body">
          <div class="form-row align-items-center">
            <div class="form-group col-md-2">
              <label for="title-${i}">Title</label>
              <select class="form-control form-control-sm" id="title-${i}" name="title-${i}">
                <option value="Mr">Mr</option>
                <option value="Ms">Ms</option>
                <option value="Mrs">Mrs</option>
                <option value="Dr">Dr</option>
              </select>
            </div>
            <div class="form-group col-md-3">
              <label for="first-name-${i}">First Name</label>
              <input type="text" class="form-control form-control-sm" id="first-name-${i}" name="first-name-${i}" required>
            </div>
            <div class="form-group col-md-3">
              <label for="last-name-${i}">Last Name</label>
              <input type="text" class="form-control form-control-sm" id="last-name-${i}" name="last-name-${i}" required>
            </div>
            <div class="form-group col-md-2">
              <label for="date-of-birth-${i}">Date of Birth</label>
              <input type="date" class="form-control form-control-sm" id="date-of-birth-${i}" name="date-of-birth-${i}" required>
            </div>
            <div class="form-group col-md-2">
              <label for="passenger-type-${i}">Passenger Type</label>
              <select class="form-control form-control-sm" id="passenger-type-${i}" name="passenger-type-${i}">
                <option value="Adult">Adult</option>
                <option value="Child">Child</option>
                <option value="Infant">Infant</option>
              </select>
            </div>
          </div>
        </div>
      `;
  
      // Append the passenger form to the container
      container.appendChild(passengerForm);
    }
  
    // Add the Contact Details form (it appears once)
    const contactForm = document.createElement("div");
    contactForm.className = "card mb-3";
    contactForm.innerHTML = `
      <div class="card-header">
        <h5>Contact Details</h5>
      </div>
      <div class="card-body">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="contact-person">Contact Person</label>
            <input type="text" class="form-control form-control-sm" id="contact-person" name="contact-person" required>
          </div>
          <div class="form-group col-md-6">
            <label for="mobile-number">Mobile Number</label>
            <input type="tel" class="form-control form-control-sm" id="mobile-number" name="mobile-number" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="email">Email</label>
            <input type="email" class="form-control form-control-sm" id="email" name="email" required>
          </div>
          <div class="form-group col-md-6">
            <label for="country">Country/Territory</label>
            <select class="form-control form-control-sm" id="country" name="country">
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
          </div>
        </div>
      </div>
    `;
    container.appendChild(contactForm);
  
    // Add a submit button at the end
    const submitButton = document.createElement("div");
    submitButton.className = "text-center";
    submitButton.innerHTML = `
      <button type="submit" class="btn btn-primary btn-sm">Countinue for checkout</button>
    `;
    container.appendChild(submitButton);
  });
  