document.addEventListener("DOMContentLoaded", function () {
    // Get form elements
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");

    // Helper to show validation messages
    function showValidationMessage(input, message) {
        let messageElement = input.nextElementSibling;
        if (!messageElement || !messageElement.classList.contains("validation-message")) {
            // Create a validation message element if it doesn't exist
            messageElement = document.createElement("div");
            messageElement.className = "validation-message";
            messageElement.style.color = "red";
            messageElement.style.fontSize = "0.875rem";
            input.parentElement.appendChild(messageElement);
        }
        messageElement.textContent = message;
        messageElement.style.display = message ? "block" : "none";
    }

    // Basic password encryption using Base64 (for demonstration purposes only)
    function encryptPassword(password) {
        return btoa(password); // Base64 encoding (not secure for production use)
    }

    // Update navigation bar based on login status
    function updateNavbar() {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const userProfile = document.getElementById("user-profile");
        const loginLink = document.getElementById("login-link");
        const profileName = document.getElementById("profile-name");

        if (currentUser) {
            userProfile.style.display = "block";
            loginLink.style.display = "none";
            profileName.textContent = currentUser.fullName;
        } else {
            userProfile.style.display = "none";
            loginLink.style.display = "block";
        }
    }

    // Logout functionality
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("currentUser");
            alert("You have been logged out.");
            window.location.href = "index.html";
        });
    }

    // Sign Up functionality
    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();

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
            signupForm.reset();
            window.location.href = "login.html";
        });
    }

    // Login functionality
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

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
                // Save current user session
                localStorage.setItem("currentUser", JSON.stringify(user));

                alert(`Welcome back, ${user.fullName}! Redirecting to the homepage...`);
                loginForm.reset();
                window.location.href = "index.html";
            } else {
                alert("Invalid email or password. Please try again.");
            }
        });
    }

    updateNavbar(); // Update the navigation bar on page load
});
