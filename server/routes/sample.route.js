import express from 'express';
import { sampleController } from '../controllers/sample.controller.js';


const router = express.Router();

router.get('/sample',sampleController);

export default router;