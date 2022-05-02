import axios from "axios";
import { saveData } from "./database-connector.js"

let paginateOffset = 0;

const categoryUrl = `https://redsky.target.com/redsky_aggregations/v1/web/plp_search_v1?key=9f36aeafbe60771e321a7cc95a78140772ab3e96&category=5q0ga&channel=WEB&count=28&default_purchasability_filter=true&include_sponsored=true&offset=${paginateOffset}&page=%2Fc%2F5q0ga&platform=desktop&pricing_store_id=1944&scheduled_delivery_store_id=1944&store_ids=1944%2C2448%2C1943%2C1945%2C905&useragent=Mozilla%2F5.0+%28Macintosh%3B+Intel+Mac+OS+X+10_15_7%29+AppleWebKit%2F537.36+%28KHTML%2C+like+Gecko%29+Chrome%2F100.0.4896.60+Safari%2F537.36&visitor_id=0180869970B00201973A7206284F54AF`;

const getItems = () => {
    axios.get(categoryUrl)
        .then((response) => {
            if (response.status == 200) {
                const totalItemCount = response.data.data.search.search_response.typed_metadata.total_results;
                const items = response.data.data.search.products;
                console.log(items.length)
                console.log(totalItemCount)
            } else {
                console.log("Oops! Something went wrong :( ", response)
            }
        }).catch((error) => {
            console.log("Oops! Something went wrong :( ", error)
        })
}

export default getItems;