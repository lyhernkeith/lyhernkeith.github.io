// script.js
document.addEventListener("DOMContentLoaded", function() {
    const carImage = document.getElementById("car-image");
    const animationContainer = document.getElementById("animation-container");
    const blackScreen = document.getElementById("black-screen");
    const blackScreenText = document.getElementById("black-screen-text");

    const typewriterText = "Road safety is no accident.";

    // Typewriter effect function
    function typeWriter(text, i, callback) {
        if (i < text.length) {
            blackScreenText.innerHTML = text.substring(0, i + 1);
            setTimeout(function() {
                typeWriter(text, i + 1, callback);
            }, 100); // Adjust typing speed here
        } else if (typeof callback == 'function') {
            setTimeout(callback, 700); // Add a delay before calling the callback
        }
    }

    // Listen for the space bar key press
    document.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
            event.preventDefault();
            console.log("Space bar pressed, starting animation");
            animationContainer.style.display = "flex"; // Show the animation container
            setTimeout(() => {
                carImage.classList.add("grow");
            }, 10); // Start the animation
        }
    });

    // Wait for the animation to complete before showing the black screen with text
    carImage.addEventListener("transitionend", () => {
        console.log("Transition ended, showing black screen with text");
        animationContainer.style.display = "none"; // Hide the animation container
        blackScreen.style.display = "flex"; // Show the black screen with text

        // Start typewriter effect
        typeWriter(typewriterText, 0, function() {
            // Fade out the black screen after the typewriter effect is complete
            blackScreen.classList.add("fade-out");

            // Refresh the page after the fade-out transition
            blackScreen.addEventListener("transitionend", () => {
                console.log("Black screen fade-out ended, refreshing page");
                location.reload();
            });
        });
    });
});
