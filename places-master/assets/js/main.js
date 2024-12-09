// $(document).ready(function($) {

// 	"use strict";

// 	var isMobile = false; //initiate as false
// // device detection
// if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
//     || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

	// scroll

	var scrollWindow = function() {
		var lastScrollTop = 0;
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.probootstrap_navbar'),
					sd = $('.js-scroll-wrap');



			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
			}

		});
	};
	scrollWindow();



	// login-signup starts

	document.addEventListener("DOMContentLoaded", function () {
		console.log("in DOMContentLoaded");
		const signupForm = document.getElementById("signup-form");
		const loginForm = document.getElementById("login-form");
	  
		// Helper to show validation messages
		// function showValidationMessage(input, message) {
		//   const messageElement = input.nextElementSibling;
		//   messageElement.textContent = message;
		//   messageElement.style.display = message ? "block" : "none";
		// }
	  
		// Basic password encryption using Base64 (for demonstration purposes only)
		function encryptPassword(password) {
		  return btoa(password); // Base64 encoding (not secure for production use)
		}
	  
		console.log("signupForm...", signupForm);
		console.log("loginForm...", loginForm);
		// Sign Up Functionality
		if (signupForm) {
			signupForm.addEventListener("submit", function (event) {
				event.preventDefault();

				const password = document.getElementById('signup-password').value;
				const confirmPassword = document.getElementById('signup-confirm-password').value;

				if (password !== confirmPassword) {
					toastr.error('Passwords do not match!', 'Error');
					return;
				}

				// Collect other form data
				const userData = {
					name: document.getElementById('signup-name').value,
					username: document.getElementById('signup-username').value,
					email: document.getElementById('signup-email').value,
					phone: document.getElementById('signup-phone').value,
					password,
					dob: document.getElementById('signup-dob').value,
					gender: document.getElementById('signup-gender').value,
				};

				// Call API
				fetch('http://localhost:4200/api/signup', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(userData),
				})
					.then((response) => response.json())
					.then((data) => {
						if (data.message) {
							toastr.success(data.message, 'Success');
							signupForm.reset();
							window.location.href = "login.html";
						}
					})
					.catch((error) => {
						console.error('Error:', error);
						toastr.error('An error occurred while signing up.', 'Error');
					});
			});
		}
		
	  
		// Login Functionality
		if (loginForm) {
			loginForm.addEventListener("submit", function (e) {
				e.preventDefault();
		
				const email = document.getElementById("login-email").value.trim();
				const password = document.getElementById("login-password").value.trim();
		
				if (!email || !password) {
					toastr.error("Please enter both email and password.");
					return;
				}
		
				// Prepare login data
				const loginData = {
					email: email,
					password: password,
				};
		
				// API Call to validate user
				fetch("http://localhost:4200/api/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(loginData),
				})
					.then((response) => response.json())
					.then((data) => {
						if (data.success) {
							console.log("data...", data);
							localStorage.setItem("currentUser", JSON.stringify(data.user));
							
							loginForm.reset();
							window.location.href = "index.html";
							toastr.success(`Welcome back, ${data.user.fullName}!`);
						} else {
							toastr.error(data.message || "Invalid email or password. Please try again.");
						}
					})
					.catch((error) => {
						console.error("Error:", error);
						toastr.error("An error occurred during login. Please try again.");
					});
			});
		}
		
		
		// if (resetForm) {
		// 	resetForm.addEventListener("submit", function (e) {
		// 		e.preventDefault();
		
		// 		const email = document.getElementById("reset-email").value.trim();
		// 		const newPassword = encryptPassword(document.getElementById("reset-password").value.trim());
		// 		const confirmPassword = encryptPassword(document.getElementById("reset-confirm-password").value.trim());
		
		// 		if (newPassword !== confirmPassword) {
		// 			toastr.error("Passwords do not match.");
		// 			return;
		// 		}
		
		// 		const users = JSON.parse(localStorage.getItem("users")) || [];
		// 		const userIndex = users.findIndex((u) => u.email === email);
		
		// 		if (userIndex === -1) {
		// 			toastr.error("No account found with this email.");
		// 			return;
		// 		}
		
		// 		users[userIndex].password = newPassword;
		// 		localStorage.setItem("users", JSON.stringify(users));
		
		// 		toastr.success("Password reset successful! You can now log in.");
		// 		resetForm.reset();
		// 		window.location.href = "login.html";
		// 	});
		// }

		const currentUser = JSON.parse(localStorage.getItem("currentUser"));
		if (currentUser) {
			document.getElementById("login-link").style.display = "none";
			document.getElementById("user-profile").style.display = "block";
			document.getElementById("profile-name").textContent = currentUser.fullName;
		} else {
			document.getElementById("login-link").style.display = "block";
			document.getElementById("user-profile").style.display = "none";
		}

		document.getElementById("logout-button").addEventListener("click", function () {
			localStorage.removeItem("currentUser");
			location.reload(); // Reload to reflect changes
		});

		$('#myModal .btn-primary').click(function () {
			// Add your desired action here
			console.log('Save changes button clicked');
					event.preventDefault(); // Prevent the form from refreshing the page
		
				const data = {
				  from: document.getElementById('id_label_single').value,
				  to: document.getElementById('id_label_single2').value,
				  flightClass: document.getElementById('flight_class').value,
				  departureDate: document.getElementById('probootstrap-date-departure').value,
				  arrivalDate: document.getElementById('probootstrap-date-arrival').value,
				};
				const direction = document.querySelector('input[name="direction"]:checked');
			    const di_val = direction ? direction.value : '';
				// Save form data in sessionStorage
				sessionStorage.setItem('searchData', JSON.stringify(data));
				sessionStorage.setItem('direction',di_val);
				// Optionally, redirect to search page
				window.location.href = 'loader.html'; // Or wherever you need to go
	  
			// You can also close the modal programmatically
			$('#myModal').modal('hide');
		  });
		

	});

	// login-signup ends

	//search form starts
  

	// document.getElementById('form_search').addEventListener('submit', function(event) {
	// 	event.preventDefault(); // Prevent the form from refreshing the page
		
	// 	const data = {
	// 	  from: document.getElementById('id_label_single').value,
	// 	  to: document.getElementById('id_label_single2').value,
	// 	  flightClass: document.getElementById('flight_class').value,
	// 	  departureDate: document.getElementById('probootstrap-date-departure').value,
	// 	  arrivalDate: document.getElementById('probootstrap-date-arrival').value,
	// 	};
	// 	const direction = document.querySelector('input[name="direction"]:checked');
	//     const di_val = direction ? direction.value : '';
	// 	// Save form data in sessionStorage
	// 	sessionStorage.setItem('searchData', JSON.stringify(data));
	// 	sessionStorage.setItem('direction',di_val);
	// 	// Optionally, redirect to search page
	// 	window.location.href = 'loader.html'; // Or wherever you need to go
	//   });
	  
	//search form ends
	
	//
	
	// Get today's date in YYYY-MM-DD format
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
	const day = String(today.getDate()).padStart(2, '0'); // Add leading zero if needed
	const todayDate = `${year}-${month}-${day}`;

	// Set the min attribute to today's date for the relevant date inputs
	document.getElementById('probootstrap-date-departure').setAttribute('min', todayDate);
	document.getElementById('probootstrap-date-arrival').setAttribute('min', todayDate);

	//
	
	
	// navigation
	// var OnePageNav = function() {
	// 	var navToggler = $('.navbar-toggler');
	// 	$(".smoothscroll[href^='#'], #probootstrap-navbar ul li a[href^='#']").on('click', function(e) {
	// 	 	e.preventDefault();
	// 	 	var hash = this.hash;
		 		
	// 	 	$('html, body').animate({

	// 	    scrollTop: $(hash).offset().top
	// 	  }, 700, 'easeInOutExpo', function(){
	// 	    window.location.hash = hash;
	// 	  });
	// 	});
	// 	$("#probootstrap-navbar ul li a[href^='#']").on('click', function(e){
	// 		if ( navToggler.is(':visible') ) {
	// 	  	navToggler.click();
	// 	  }
	// 	});

	// };
	// OnePageNav();


	var select2 = function() {
		$('.js-dropdown-multiple, .js-example-basic-single').select2();
	}
	select2();


	var contentWayPoint = function() {
		var i = 0;
		if ($('.probootstrap-animate').length > 0 ) {
			$('.probootstrap-animate').waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('probootstrap-animated') ) {
					
					i++;

					$(this.element).addClass('item-animate');
					setTimeout(function(){

						$('body .probootstrap-animate.item-animate').each(function(k){
							var el = $(this);
							setTimeout( function () {
								var effect = el.data('animate-effect');
								if ( effect === 'fadeIn') {
									el.addClass('fadeIn probootstrap-animated');
								} else if ( effect === 'fadeInLeft') {
									el.addClass('fadeInLeft probootstrap-animated');
								} else if ( effect === 'fadeInRight') {
									el.addClass('fadeInRight probootstrap-animated');
								} else {
									el.addClass('fadeInUp probootstrap-animated');
								}
								el.removeClass('item-animate');
							},  k * 50, 'easeInOutExpo' );
						});
						
					}, 50);
					
				}

			} , { offset: '95%' } );
		}
	};
	contentWayPoint();
	


  var owlCarouselFunc = function() {
	  $('.js-owl-carousel').owlCarousel({
	    loop : false,
	    margin : 20,
	    nav : true,
	    stagePadding : 50,
	    navText : ["<span class='ion-chevron-left'></span>","<span class='ion-chevron-right'></span>"],
	    responsive : {
	        0 : {
	            items:1
	        },
	        600 : {
	            items:2
	        },
	        1000 : {
	            items:3
	        }
	    }
		});

		$('.js-owl-carousel-2').owlCarousel({
	    loop : false,
	    margin : 20,
	    nav : true,
	    stagePadding : 0,
	    navText : ["<span class='ion-chevron-left'></span>","<span class='ion-chevron-right'></span>"],
	    responsive : {
	        0 : {
	            items:1
	        },
	        600 : {
	            items:1
	        },
	        800 : {
	            items:2
	        },
	        1000 : {
	            items:3
	        }
	    }
		});
  };
  owlCarouselFunc();

  var ThumbnailOpacity = function() {
  	var t = $('.probootstrap-thumbnail');
  	t.hover(function(){
  		var $this = $(this);
  		t.addClass('sleep');
  		$this.removeClass('sleep');
  	}, function(){
  		var $this = $(this);
  		t.removeClass('sleep');
  	});
  }
  ThumbnailOpacity();



// });

    //disable-date-picker
	function toggleTextInput(disable) {
		const textInput = document.getElementById('probootstrap-date-arrival');
		textInput.disabled = disable;
	}

