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
    lastUpdatedPrice: DataTypes.REAL,
    originalPrice: DataTypes.REAL,
    discount: DataTypes.NUMBER,
    url: DataTypes.STRING,
    img: DataTypes.STRING
})

export const connectToDatabase = () => {
    try {
        sequelize.authenticate();
        sequelize.sync();
    } catch (error) {
        console.log("Oops! Error connecting to the db :( ", error);
    }
}

export const saveData = (data) => {
    // Persist data to the db here
}

export default {};