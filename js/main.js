function updateClock() {
    const now = new Date();

    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");

    timeId.textContent = `${hh}:${mm}`;
}

const timeId = document.getElementById("time");

updateClock();
setInterval(updateClock, 1000);