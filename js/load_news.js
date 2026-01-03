async function showNews() {
    const res = await fetch("./public/news.json");
    const data = await res.json();

    const latest = data.items[0];

    document.getElementById("news_title").textContent =
        latest.title;

    const date = new Date(latest.pubDate);

    document.getElementById("news_meta").textContent =
        `${data.source}｜${date.toLocaleString("ja-JP")}`;
}

showNews();