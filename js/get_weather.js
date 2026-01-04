let latestTemp = "null";
const temperatureId = document.getElementById("temperature");

function getweather() {
    fetch("https://weather-proxy.spdev-3141.workers.dev")
        .then(res => res.json())
        .then(data => {
        const temp =
            data?.timelines?.minutely?.[0]?.values?.temperature;

        if (temp != null) {
            latestTemp = temp;
        }
        });
    }

    getweather();
    setInterval(getweather, 60_000);

    setInterval(() => {
    if (latestTemp != null) {
        temperatureId.textContent = latestTemp + "°";
    }
}, 1000);
