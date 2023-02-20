import express, { Request, Response } from 'express';
import {connectDB, sequelize} from "./db/db";
import * as dotenv from "dotenv";
import helmet from "helmet";
import bodyParser from "body-parser";
import router from "./routes/app.route";

const PORT: number = parseInt(process.env.PORT as string, 10);

dotenv.config();

const cors = require('cors')
const app = express();

if (!process.env.PORT) {
    process.exit(1);
}

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json())

app.use('/', router)

app.get('/', (req: Request, res: Response) => {
    res.send('Tickets api');
});

app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`);
    await connectDB();
    sequelize.sync({ force: false }).then(() => {
        console.log("✅Synced database successfully...");
    });
});