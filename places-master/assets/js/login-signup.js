document.addEventListener("DOMContentLoaded", function () {
    // Get form elements
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");

    // Helper to show validation messages
    function showValidationMessage(input, message) {
        const messageElement = input.nextElementSibling;
        messageElement.textContent = message;
        messageElement.style.display = message ? "block" : "none";
    }

    // Basic password encryption using Base64 (for demonstration purposes only)
    function encryptPassword(password) {
        return btoa(password); // Base64 encoding (not secure for production use)
    }

    // Sign Up functionality
    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Prevent form submission

            // Get input values
            const fullName = document.getElementById("signup-name");
            const email = document.getElementById("signup-email");
            const password = document.getElementById("signup-password");
            const confirmPassword = document.getElementById("signup-confirm-password");

            // Clear previous validation messages
            showValidationMessage(fullName, "");
            showValidationMessage(email, "");
            showValidationMessage(password, "");
            showValidationMessage(confirmPassword, "");

            // Validate inputs
            let isValid = true;
            if (!fullName.value.trim()) {
                showValidationMessage(fullName, "Full name is required.");
                isValid = false;
            }
            if (!email.value.trim() || !email.value.includes("@")) {
                showValidationMessage(email, "Valid email is required.");
                isValid = false;
            }
            if (password.value.length < 6) {
                showValidationMessage(password, "Password must be at least 6 characters long.");
                isValid = false;
            }
            if (password.value !== confirmPassword.value) {
                showValidationMessage(confirmPassword, "Passwords do not match.");
                isValid = false;
            }

            if (!isValid) return;

            // Check if the user already exists
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const userExists = users.some((user) => user.email === email.value);

            if (userExists) {
                alert("User with this email already exists.");
                return;
            }

            // Save user to localStorage with encrypted password
            users.push({ fullName: fullName.value, email: email.value, password: encryptPassword(password.value) });
            localStorage.setItem("users", JSON.stringify(users));

            alert("Sign up successful! Redirecting to login page...");
            signupForm.reset(); // Clear the form
            window.location.href = "login.html"; // Redirect to login page
        });
    }

    // Login functionality
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Prevent form submission

            // Get input values
            const email = document.getElementById("login-email");
            const password = document.getElementById("login-password");

            // Clear previous validation messages
            showValidationMessage(email, "");
            showValidationMessage(password, "");

            // Validate inputs
            let isValid = true;
            if (!email.value.trim()) {
                showValidationMessage(email, "Email is required.");
                isValid = false;
            }
            if (!password.value.trim()) {
                showValidationMessage(password, "Password is required.");
                isValid = false;
            }

            if (!isValid) return;

            // Fetch users from localStorage
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find((user) => user.email === email.value && user.password === encryptPassword(password.value));

            if (user) {
                alert(`Welcome back, ${user.fullName}! Redirecting to the homepage...`);
                loginForm.reset(); // Clear the form
                window.location.href = "index.html"; // Redirect to homepage
            } else {
                alert("Invalid email or password. Please try again.");
            }
        });
    }
});
