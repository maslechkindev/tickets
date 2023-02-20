import {connectDB, sequelize} from "./db/db";
import TicketService from "./services/ticket.service";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import createMQConsumer from "./services/amqp-consumer.service";

const PORT: number = parseInt(process.env.PORT as string, 10);
const ticketService = new TicketService()

dotenv.config();

const app = express();

if (!process.env.PORT) {
    process.exit(1);
}

app.use(helmet());
app.use(express.json());
app.use(bodyParser.json())

require("dotenv").config();

const amqpUrl: string = process.env.AMQP_URL || '';
const queue: string = process.env.QUEUE_NAME || '';


app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`);
    await connectDB();
    await createMQConsumer(amqpUrl, queue, ticketService)();
    sequelize.sync({ force: false }).then(() => {
        console.log("✅Synced database successfully...");
    });
});