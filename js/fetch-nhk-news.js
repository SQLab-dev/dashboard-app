// NHKのRSSのURL
const RSS_URL = "https://news.web.nhk/n-data/conf/na/rss/cat0.xml";

// 最新ニュースタイトルを保存する配列
let latestTitles = [];

async function fetchNHKTitles() {
    try {
        // ※ 必要ならプロキシを経由する
        // const proxy = "https://api.allorigins.win/raw?url=";
        // const response = await fetch(proxy + encodeURIComponent(RSS_URL));

        const response = await fetch(RSS_URL);
        if (!response.ok) {
            throw new Error(`HTTPエラー: ${response.status}`);
        }

        // XMLとしてテキストを取得
        const xmlText = await response.text();

        // DOMParserでXMLとしてパース
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");

        // <item> を全部取得
        const items = xmlDoc.querySelectorAll("item");

        // タイトルを配列に保存
        latestTitles = Array.from(items).map(item => {
            
        });

        console.log("最新タイトル一覧:", latestTitles);

    } catch (error) {
        console.error("RSSの取得・解析に失敗:", error);
    }
}

// 実行
fetchNHKTitles();
