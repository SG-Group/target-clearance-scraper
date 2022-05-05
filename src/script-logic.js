import { getItems } from "./data-fetcher.js";
import { saveItems } from "./db-connector.js";

const startScraping = async () => {
    // Max product set for the Target API is 28
    // Max product offset for the Target API is 1199
    for (let itemOffset = 0; itemOffset < 1199; itemOffset += 28) {
        const items = await getItems(itemOffset)
        console.log("Products Found")
        await saveItems(items);
    }
    startScraping();
}

export default startScraping;