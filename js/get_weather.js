let latestTemp = null;
const temperatureId = document.getElementById("temperature");

function getWeather() {
    fetch("https://weather-proxy.spdev-3141.workers.dev")
        .then(res => res.json())
        .then(data => {
            const temp =
                data?.timelines?.minutely?.[0]?.values?.temperature;

            if (temp != null) {
                latestTemp = Math.floor(temp);
            }

            else {
                console.error("Failed to get temperature from weather data:", data);
                latestTemp = "-";
            }
        });
}

getWeather();
setInterval(getWeather, 600_000);

setInterval(() => {
    if (latestTemp != null) {
        temperatureId.textContent = latestTemp + "°";
    }
}, 1000);
