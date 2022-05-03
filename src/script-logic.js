import { getItems, getTotalItemCount } from "./data-fetcher.js";
import { saveItems } from "./db-connector.js";

const startScraping = async () => {
    const totalItemCount = await getTotalItemCount();
    for (let itemOffset = 0; itemOffset < totalItemCount; itemOffset += 28) {
        const items = await getItems(itemOffset)
        await saveItems(items);
    }
}

export default startScraping;