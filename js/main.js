function updateClock() {
    const now = new Date();

    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");

    const timeText = `${hh}:${mm}`;

    const y = now.getFullYear();
    const m = now.getMonth() + 1;
    const d = now.getDate();
    const week = ["日","月","火","水","木","金","土"][now.getDay()];

    const dateText = `${y}/${m}/${d} (${week})`;

    document.getElementById("time").textContent = timeText;
    document.getElementById("date").textContent = dateText;
}

updateClock();               // 初回即表示
    setInterval(updateClock, 1000);
