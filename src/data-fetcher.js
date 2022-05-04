import axios from "axios";
import https from 'https';
import http from 'http';

/**
 * Gets items data from the Target API
 * @param {number} offset pagination offset
 * @returns raw items data
 */
export const getItems = async (offset) => {
    const targetProductsUrl = `https://redsky.target.com/redsky_aggregations/v1/web/plp_search_v1?key=9f36aeafbe60771e321a7cc95a78140772ab3e96&category=5q0ga&channel=WEB&count=28&default_purchasability_filter=true&include_sponsored=true&offset=${offset}&page=%2Fc%2F5q0ga&platform=desktop&pricing_store_id=1944&useragent=Mozilla%2F5.0+%28Macintosh%3B+Intel+Mac+OS+X+10_15_7%29+AppleWebKit%2F537.36+%28KHTML%2C+like+Gecko%29+Chrome%2F100.0.4896.60+Safari%2F537.36&visitor_id=0180869970B00201973A7206284F54AF`;
    let items = [];
    await axios.post('https://de.hideproxy.me/includes/process.php?action=update', new URLSearchParams({ u: targetProductsUrl }), {
        headers: {
            'authority': `de.hideproxy.me`,
            'origin': 'https://hide.me',
            'content-type': 'application/x-www-form-urlencoded',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'referer': 'https://hide.me/',
            'accept-language': 'en-US,en;q=0.9,sv;q=0.8,hy;q=0.7',
            'cookie': `s=qq5qmklp838e3kuufkjvtms5pb`
        },
        httpAgent: new http.Agent({ keepAlive: true }),
        httpsAgent: new https.Agent({ keepAlive: true })
    })
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
    await axios.get("https://redsky.target.com/redsky_aggregations/v1/web/plp_search_v1?key=9f36aeafbe60771e321a7cc95a78140772ab3e96&category=5q0ga&channel=WEB&count=28&default_purchasability_filter=true&include_sponsored=true&offset=0&page=%2Fc%2F5q0ga&platform=desktop&pricing_store_id=1944&useragent=Mozilla%2F5.0+%28Macintosh%3B+Intel+Mac+OS+X+10_15_7%29+AppleWebKit%2F537.36+%28KHTML%2C+like+Gecko%29+Chrome%2F100.0.4896.60+Safari%2F537.36&visitor_id=0180869970B00201973A7206284F54AF")
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