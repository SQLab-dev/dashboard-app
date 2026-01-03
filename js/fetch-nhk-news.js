// tools/fetch-nhk-news.js
// NHK RSSを取得して public/news.json に保存する

import fs from "fs";

const RSS_URL = "https://news.web.nhk/n-data/conf/na/rss/cat0.xml";
const OUTPUT_DIR = "public";
const OUTPUT_FILE = "public/news.json";

async function main() {
    console.log("Fetching NHK RSS...");

    // public フォルダを必ず作る（無くてもOK）
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    const res = await fetch(RSS_URL);
    if (!res.ok) {
        throw new Error(`Failed to fetch RSS: ${res.status}`);
    }

    const xml = await res.text();

    // <item> から title と link を抜き出す（シンプル＆壊れにくい）
    const items = [...xml.matchAll(
        /<item>[\s\S]*?<title>(.*?)<\/title>[\s\S]*?<link>(.*?)<\/link>/g
    )].map(match => ({
        title: match[1],
        link: match[2]
    }));

    const data = {
        updated: new Date().toISOString(),
        count: items.length,
        items
    };

    fs.writeFileSync(
        OUTPUT_FILE,
        JSON.stringify(data, null, 2),
        "utf-8"
    );

    console.log(`Saved ${items.length} items to ${OUTPUT_FILE}`);
    }

    main().catch(err => {
    console.error("Error:", err);
    process.exit(1);
});
