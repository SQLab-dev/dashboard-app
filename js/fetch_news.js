import fs from "fs";

const RSS_URL = "https://news.google.com/rss/topics/CAAqIQgKIhtDQkFTRGdvSUwyMHZNRE5mTTJRU0FtcGhLQUFQAQ?hl=ja&gl=JP&ceid=JP:ja";
const OUTPUT_DIR = "public";
const OUTPUT_FILE = "public/news.json";

async function main() {
    console.log("Fetching NHK RSS...");

    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    const res = await fetch(RSS_URL);
    if (!res.ok) {
        throw new Error(`Failed to fetch RSS: ${res.status}`);
    }

    const xml = await res.text();

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
