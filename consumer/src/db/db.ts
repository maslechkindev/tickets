import {Sequelize} from "sequelize-typescript";
import Ticket from "../models/tickets.model";

require("dotenv").config();

const POSTGRES_URL = process.env.DATABASE_URL as unknown as string;
const sequelize = new Sequelize(POSTGRES_URL);

async function connectDB() {
    try {
        await sequelize.authenticate();
        await sequelize.addModels([Ticket])
        console.log("✅ Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

export { connectDB, sequelize };