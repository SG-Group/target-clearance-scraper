import getItems from "./src/data-fetcher.js";
import { connectToDatabase } from "./src/database-connector.js"

const main = async () => {
    connectToDatabase();
    getItems()
}

main();