// Array of roles/skills to type out
const roles = [
    "Electronics & Communication Engineering",
    "Cybersecurity Enthusiast",
    "C++ Developer",
    "Mechatronics Designer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingTextElement = document.getElementById("typing-text");
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        // Remove a character
        typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Add a character
        typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    // Determine the typing speed for the next frame
    let speed = isDeleting ? deletingSpeed : typingSpeed;

    // If word is complete, pause before deleting
    if (!isDeleting && charIndex === currentRole.length) {
        speed = pauseTime;
        isDeleting = true;
    } 
    // If word is completely deleted, move to next word
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 500; // brief pause before starting new word
    }

    // Call the function again after the calculated delay
    setTimeout(typeEffect, speed);
}

// Initialize the typing effect after the DOM loads
document.addEventListener("DOMContentLoaded", () => {
    // Add a blinking cursor effect via JS instead of CSS for simplicity
    setInterval(() => {
        if(typingTextElement.style.borderRight === "2px solid transparent") {
            typingTextElement.style.borderRight = "2px solid var(--accent-color)";
        } else {
            typingTextElement.style.borderRight = "2px solid transparent";
        }
    }, 500);
    
    // Start typing
    typeEffect();
});
