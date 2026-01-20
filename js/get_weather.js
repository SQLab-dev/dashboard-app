async function getWeather(lat, lon) {
    const res = await fetch(
        `https://weather-proxy.spdev-3141.workers.dev?lat=${lat}&lon=${lon}`
    );
    const data = await res.json();

    const city = data.city;
    const temperature = Math.floor(data.temperature);

    console.log(city, temperature);

    return { city, temperature };
}

navigator.geolocation.getCurrentPosition(success,fail);

const cur_lat = pos.coords.latitude;
const cur_lng = pos.coords.longitude;

console.log(cur_lat, cur_lng)

getWeather(26.212, 127.681).then(({ city, temperature }) => {
    document.getElementById("city").textContent = city;
    document.getElementById("temperature").textContent = temperature + "°";
});
