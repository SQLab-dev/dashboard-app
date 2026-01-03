async function showNews() {
    const res = await fetch("./public/news.json");
    const data = await res.json();

    const latest = data.items[0];

    const titleEl = document.getElementById("news_title");
    titleEl.textContent = latest.title;
    titleEl.href = latest.link;
    titleEl.target = "_blank";

    const date = new Date(latest.pubDate);
    document.getElementById("news_meta").textContent =
        `${data.source}｜${date.toLocaleString("ja-JP")}`;
}

showNews();