$(document).ready(function () {
    // Example to simulate the end of the loading process
    setTimeout(() => {
        $(".loading-text").text("Done!");
        $(".loading-container").fadeOut(2000, function () {
            // After fadeOut is complete, show the search results
            window.location.href ="searchflights.html";
          });
        }, 5000); // Simulates a 5-second loading time
});