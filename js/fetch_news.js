import fs from "fs";

const RSS_URL = "https://news.web.nhk/n-data/conf/na/rss/cat0.xml";
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

    const channelTitle =
        xml.match(/<channel>[\s\S]*?<title>(.*?)<\/title>/)?.[1]
        ?? "NHK";

    const items = [...xml.matchAll(
        /<item>[\s\S]*?<title>(.*?)<\/title>[\s\S]*?<link>(.*?)<\/link>[\s\S]*?<pubDate>(.*?)<\/pubDate>/g
    )].map(m => ({
        title: m[1],
        link: m[2],
        pubDate: m[3]
    }));

    const data = {
        source: channelTitle,
        updated: new Date().toISOString(),
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
