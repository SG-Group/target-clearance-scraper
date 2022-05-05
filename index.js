import startScraping from "./src/script-logic.js";
import { connectToDatabase } from "./src/db-connector.js"

const main = async () => {
    try {
        console.log("Starting Scraping!")
        connectToDatabase();
        startScraping();
    } catch (error) {
        console.log("Oops! Something went wrong :( ", error);
    }
}

main();