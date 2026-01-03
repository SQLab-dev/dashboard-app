function updateClock() {
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");

    const timeText = `${hh}:${mm}`;

    const y = now.getFullYear();
    const m = now.getMonth() + 1;

    timeId.textContent = timeText;
}

const now = new Date();
const timeId = document.getElementById("time")
const dayId = document.getElementById("day")

updateClock();
    setInterval(updateClock, 1000);