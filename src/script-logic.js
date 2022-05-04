import { getItems, getTotalItemCount } from "./data-fetcher.js";
import { saveItems } from "./db-connector.js";

const startScraping = async () => {
    const totalItemCount = await getTotalItemCount();
    // Max product set for the Target API is 28
    for (let itemOffset = 0; itemOffset < totalItemCount; itemOffset += 28) {
        const items = await getItems(itemOffset)
        await saveItems(items);
    }
    startScraping();
}

export default startScraping;