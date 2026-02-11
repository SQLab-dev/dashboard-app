async function getWeather(lat, lon) {
    const res = await fetch(
        `https://weather-proxy.spdev-3141.workers.dev/?lat=${lat}&lon=${lon}`
    );
    const data = await res.json();

    const city = data.city;
    const temperature = Math.floor(data.temperature);

    console.log(city, temperature);

    return { city, temperature };
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const cur_lat = pos.coords.latitude;
            const cur_lng = pos.coords.longitude;
            console.log(cur_lat, cur_lng);
            getWeather(cur_lat, cur_lng).then(({ city, temperature }) => {
                document.getElementById("city").textContent = city;
                document.getElementById("temperature").textContent = temperature + "°";
            });
        },
        (err) => {
            console.warn('Geolocation failed, using fallback coords', err);
            getWeather(26.212, 127.681).then(({ city, temperature }) => {
                document.getElementById("city").textContent = city;
                document.getElementById("temperature").textContent = temperature + "°";
            });
        }
    );
} else {
    // Geolocation not supported — use fallback
    getWeather(26.212, 127.681).then(({ city, temperature }) => {
        document.getElementById("city").textContent = city;
        document.getElementById("temperature").textContent = temperature + "°";
    });
}
