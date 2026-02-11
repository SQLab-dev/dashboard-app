const openBtn = document.getElementById("open-settings");
const closeBtn = document.getElementById("close-settings");
const settings = document.getElementById("settings-panel");

openBtn.addEventListener("click", () => {
    settings.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
    settings.classList.add("hidden");
});
