import { Sequelize, DataTypes } from "sequelize"

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "db.sqlite",
    logging: false
})

const DB = sequelize.define("Items", {
    sku: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.REAL,
    //lastUpdatedPrice: DataTypes.REAL,
    oldPrice: DataTypes.STRING,
    discount: DataTypes.STRING,
    url: DataTypes.STRING,
    img: DataTypes.STRING
})

/**
 * Connects to the local db
 */
export const connectToDatabase = () => {
    try {
        sequelize.authenticate();
        sequelize.sync();
    } catch (error) {
        console.log("Oops! Error connecting to the db :( ", error);
    }
}

/**
 * Processes raw product data and format it according to the db specification
 * @param {*} data raw product data
 * @returns formatted product data
 */
const proccessItemsData = (data) => {
    let formattedItemsList = [];
    for (let item of data) {
        const comparisonPrice = item.price.formatted_comparison_price || item.price.formatted_current_price;
        // comparison price is a string so conversion is need
        let formattedComparisonPrice = parseFloat(comparisonPrice.replace(/[^\d.-]/g, ''))
        let calculatedDiscount = (((formattedComparisonPrice - item.price.current_retail) / formattedComparisonPrice) * 100).toFixed(0)
        if (!Number.isFinite(formattedComparisonPrice)) {
            formattedComparisonPrice = "Location Specific"
            calculatedDiscount = "Location Specific"
        }
        formattedItemsList.push({
            sku: item.item.dpci,
            name: item.item.product_description.title.replace(/(&).*?(;)/g, ""),
            price: item.price.current_retail.toFixed(2),
            oldPrice: formattedComparisonPrice,
            discount: calculatedDiscount,
            url: item.item.enrichment.buy_url,
            img: item.item.enrichment.images.primary_image_url
        })
    }
    return formattedItemsList
}

/**
 * Persists a list of items to the local db
 * @param {*} items raw product data
 */
export const saveItems = async (items) => {
    const formattedItems = proccessItemsData(items);
    for (let item of formattedItems) {
        let itemAlreadyExists = await DB.findOne({ where: { sku: item.sku } })
        if (itemAlreadyExists && itemAlreadyExists.price != item.price) {
            /**
             * Updates item if it already exists in db and
             * saves last price to lastUpdatedPrice
             */
            await itemAlreadyExists.update({
                sku: item.dpci,
                name: item.name,
                price: item.price,
                //lastUpdatedPrice: itemAlreadyExists.price,
                oldPrice: item.originalPrice,
                discount: item.discount,
                url: item.url,
                img: item.img,
            }).catch(console.error)
        } else {
            await DB.create(item).catch(console.error)
        }
    }
}

export default {};