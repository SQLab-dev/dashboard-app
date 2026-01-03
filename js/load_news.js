async function showLatestNewsTitle() {
    try {
        const res = await fetch("./public/news.json");
        const data = await res.json();

        const latestTitle = data.items[0]?.title ?? "ニュースを取得できません";

        document.getElementById("news_title").textContent = latestTitle;

    } catch (err) {
        console.error(err);
        document.getElementById("news_title").textContent = "ニュース読み込み失敗";
    }
}

showLatestNewsTitle();