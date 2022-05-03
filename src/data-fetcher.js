import axios from "axios";

const categoryUrl = "https://redsky.target.com/redsky_aggregations/v1/web/plp_search_v1?key=9f36aeafbe60771e321a7cc95a78140772ab3e96&category=5q0ga&channel=WEB&count=28&default_purchasability_filter=true&include_sponsored=true&offset=0&page=%2Fc%2F5q0ga&platform=desktop&pricing_store_id=1944&useragent=Mozilla%2F5.0+%28Macintosh%3B+Intel+Mac+OS+X+10_15_7%29+AppleWebKit%2F537.36+%28KHTML%2C+like+Gecko%29+Chrome%2F100.0.4896.60+Safari%2F537.36&visitor_id=0180869970B00201973A7206284F54AF";

/**
 * Gets items data from the Target API
 * @param {number} offset pagination offset
 * @returns raw items data
 */
export const getItems = async (offset) => {
    let items = [];
    await axios.get(`https://redsky.target.com/redsky_aggregations/v1/web/plp_search_v1?key=9f36aeafbe60771e321a7cc95a78140772ab3e96&category=5q0ga&channel=WEB&count=28&default_purchasability_filter=true&include_sponsored=true&offset=${offset}&page=%2Fc%2F5q0ga&platform=desktop&pricing_store_id=1944&useragent=Mozilla%2F5.0+%28Macintosh%3B+Intel+Mac+OS+X+10_15_7%29+AppleWebKit%2F537.36+%28KHTML%2C+like+Gecko%29+Chrome%2F100.0.4896.60+Safari%2F537.36&visitor_id=0180869970B00201973A7206284F54AF`)
        .then((response) => {
            if (response.status == 200) {
                items = response.data.data.search.products;
            } else {
                throw response;
            }
        }).catch((error) => {
            throw error;
        })
    return items;
}

/**
 * Gets the amount of items in the category
 * @returns {number} count of how many items are in the category
 */
export const getTotalItemCount = async () => {
    let totalItemCount = 0;
    await axios.get(categoryUrl)
        .then((response) => {
            if (response.status == 200) {
                totalItemCount = response.data.data.search.search_response.typed_metadata.total_results;
            } else {
                throw response;
            }
        }).catch((error) => {
            throw error;
        })
    return totalItemCount;
}

export default {};