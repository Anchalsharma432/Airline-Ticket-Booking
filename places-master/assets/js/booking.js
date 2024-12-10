document.addEventListener("DOMContentLoaded", function () {
  let n=3;
  const container = document.getElementById("containar_for_card");

  // Create passenger forms dynamically
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let noPassenger = 0;
  let totalCost = 0;
  cart.map((item)=>{
    
    for(let i=0; i<item.quantity;i++){
      noPassenger+=1;
      totalCost+=Number(item.price);
      container.innerHTML +=  `<div class="card mb-3">
      <div class="card-header" style="display: flex; justify-content: space-between;">
              <h5>Passenger ${noPassenger} Details</h5>
              <h5> ${item.departure_city} - ${item.destination_city}</h5>
              <h5>Flight No: ${item.flight_id}</h5>
            </div>
            <div class="card-body">
              <div class="form-row align-items-center">
                <div class="form-group col-md-2">
                  <label for="title-${noPassenger}">Title</label>
                  <select class="form-control form-control-sm" id="title-${noPassenger}" name="title-${noPassenger}">
                    <option value="Mr">Mr</option>
                    <option value="Ms">Ms</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Dr">Dr</option>
                  </select>
                </div>
                <div class="form-group col-md-3">
                  <label for="first-name-${noPassenger}">First Name</label>
                  <input type="text" class="form-control form-control-sm" id="first-name-${noPassenger}" name="first-name-${noPassenger}" required>
                </div>
                <div class="form-group col-md-3">
                  <label for="last-name-${noPassenger}">Last Name</label>
                  <input type="text" class="form-control form-control-sm" id="last-name-${noPassenger}" name="last-name-${noPassenger}" required>
                </div>
                <div class="form-group col-md-2">
                  <label for="date-of-birth-${noPassenger}">Date of Birth</label>
                  <input type="date" class="form-control form-control-sm" id="date-of-birth-${noPassenger}" name="date-of-birth-${noPassenger}" required>
                </div>
                <div class="form-group col-md-2">
                  <label for="passenger-type-${noPassenger}">Passenger Type</label>
                  <select class="form-control form-control-sm" id="passenger-type-${noPassenger}" name="passenger-type-${noPassenger}">
                    <option value="Adult">Adult</option>
                    <option value="Child">Child</option>
                    <option value="Infant">Infant</option>
                  </select>
                </div>
              </div>
            </div>
            </div>`;
    }
  })

  // Add contact details form
  if(cart.length>0){
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
  }
  if(cart.length>0){
  const totalSection = document.createElement("div");
  totalSection.className = "card mb-3";
  totalSection.innerHTML = ` <div class="card-header" style="display: flex; justify-content: center; align-items: center;">
      <h5>Total Cost: ${totalCost}</h5>
    </div>`;
  container.appendChild(totalSection);  
  }
  if(cart.length==0){
    const totalSection = document.createElement("div");
    totalSection.className = "card mb-3";
    totalSection.innerHTML = ` <div class="card-header" style="display: flex; justify-content: center; align-items: center;">
        <h5>Please add tickets for checking Out</h5>
      </div>`;
    container.appendChild(totalSection);  
    }
  // Add the submit button
  const submitButton = document.createElement("div");
  submitButton.className = "card mb-3";
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
    for(let j=0;j<cart.length;j++){
      pdf.text(`${cart[j].departure_city}-${cart[j].destination_city}`, 5, yPosition);
      pdf.text(`Flight No${cart[j].flight_id}`, 90, yPosition);
      yPosition += 10;
    for (let i = 1; i <= cart[j].quantity; i++) {
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
      yPosition += 10; // Add space between passengers
    }
    yPosition += 10;
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
    yPosition += 20;
    pdf.text(`Total Price:${totalCost}`, 60, yPosition)
    pdf.text(`${totalCost}`, 100, yPosition)
    // Save the PDF
    pdf.save("BookingDetails.pdf");
  });
});
