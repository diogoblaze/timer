// Function to get or set the countdown end time in localStorage
function getOrSetCountdownTime() {
    const storedEndTime = localStorage.getItem('countdownEndTime');
    if (storedEndTime) {
        return parseInt(storedEndTime, 10);
    } else {
        const endTime = new Date().getTime() + 4 * 60 * 60 * 1000; // 4 hours from now
        localStorage.setItem('countdownEndTime', endTime);
        return endTime;
    }
}

// Set the countdown time
const countdownTime = getOrSetCountdownTime();

// Update the countdown every 1 second
const x = setInterval(function() {
    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the countdown time
    const distance = countdownTime - now;

    // Time calculations for hours, minutes, and seconds
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="countdown"
    document.getElementById("countdown").innerHTML =
        ("0" + hours).slice(-2) + ":" +
        ("0" + minutes).slice(-2) + ":" +
        ("0" + seconds).slice(-2);

    // If the countdown is over, display expired message
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "SALE ENDED";
        document.getElementById("text-right").innerHTML = "The Sale Has Ended";
        document.getElementById("countdown-container").style.backgroundColor = "#333";
        localStorage.removeItem('countdownEndTime'); // Remove the end time once the sale has ended
    }
}, 1000);
