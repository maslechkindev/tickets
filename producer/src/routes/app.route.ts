import * as controller from "../controllers/app.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import {InputRequestDto} from "../dtos/inputRequest.dto";
import {OutputRequestDto} from "../dtos/outputRequest.dto";
const express = require('express')

export const router = express.Router();

router.post("/input", validationMiddleware(InputRequestDto), controller.input);
router.get("/output", validationMiddleware(OutputRequestDto), controller.output);
router.get("/inprogress", controller.inprogress);

export default router