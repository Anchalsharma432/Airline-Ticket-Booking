document.addEventListener("DOMContentLoaded", function () {
  const n = 3; // Number of passengers
  const container = document.getElementById("containar_for_card");

  // Create passenger forms dynamically
  for (let i = 1; i <= n; i++) {
    const passengerForm = document.createElement("div");
    passengerForm.className = "card mb-3";

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
    container.appendChild(passengerForm);
  }

  // Add contact details form
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

  // Add the submit button
  const submitButton = document.createElement("div");
  submitButton.className = "text-center";
  submitButton.innerHTML = `
    <button type="button" id="generate-pdf" class="btn btn-primary btn-sm">Continue for Checkout</button>
  `;
  container.appendChild(submitButton);

  // Generate PDF with form data
  document.getElementById("generate-pdf").addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    let yPosition = 20; // Starting Y position
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text("Passenger Booking Details", 105, yPosition, { align: "center" });

    yPosition += 10; // Add space below the title
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);

    // Loop through passengers and add their details in a table-like format
    for (let i = 1; i <= n; i++) {
      pdf.text(`Passenger ${i}`, 10, yPosition);
      yPosition += 10;

      const title = document.getElementById(`title-${i}`).value;
      const firstName = document.getElementById(`first-name-${i}`).value;
      const lastName = document.getElementById(`last-name-${i}`).value;
      const dob = document.getElementById(`date-of-birth-${i}`).value;
      const type = document.getElementById(`passenger-type-${i}`).value;

      pdf.text(`Title: ${title}`, 20, yPosition);
      pdf.text(`First Name: ${firstName}`, 60, yPosition);
      pdf.text(`Last Name: ${lastName}`, 120, yPosition);
      yPosition += 10;

      pdf.text(`Date of Birth: ${dob}`, 20, yPosition);
      pdf.text(`Passenger Type: ${type}`, 120, yPosition);
      yPosition += 20; // Add space between passengers
    }

    // Add contact details
    pdf.text("Contact Details", 10, yPosition);
    yPosition += 10;

    const contactPerson = document.getElementById("contact-person").value;
    const mobileNumber = document.getElementById("mobile-number").value;
    const email = document.getElementById("email").value;
    const country = document.getElementById("country").value;

    pdf.text(`Contact Person: ${contactPerson}`, 20, yPosition);
    yPosition += 10;
    pdf.text(`Mobile Number: ${mobileNumber}`, 20, yPosition);
    yPosition += 10;
    pdf.text(`Email: ${email}`, 20, yPosition);
    yPosition += 10;
    pdf.text(`Country: ${country}`, 20, yPosition);

    // Save the PDF
    pdf.save("BookingDetails.pdf");
  });
});
