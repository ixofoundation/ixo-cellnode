import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import * as PublicHandler from './handlers/PublicHandler.js';
import * as StorageHandler from './handlers/Web3StorageHandler.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';

class App {
	public express: any;

	constructor() {
		this.express = express();
		this.middleware();
		this.routes();
	}

	private middleware(): void {
		this.express.set('trust proxy', process.env.TRUST_PROXY || 1);
		this.express.use(cors());
		this.express.use(compression({ threshold: 0 }));
		this.express.use(bodyParser.default.urlencoded({ limit: '50mb', extended: true }));
		this.express.use(bodyParser.default.json({ limit: '4mb' }));
		this.express.use(
			helmet({
				crossOriginResourcePolicy: false,
			}),
		);
		const limiter = rateLimit({
			windowMs: 1 * 60 * 1000, // 1 minutes
			max: 10000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
			standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
			legacyHeaders: false, // Disable the `X-RateLimit-*` headers
		});
		this.express.use(limiter);
	}

	private routes(): void {
		this.express.get('/', (req, res, next) => {
			res.send('API Running');
		});

		this.express.post('/public/createpublic', async (req, res) => {
			const pub = await PublicHandler.createPublic(req.body);
			res.json(pub);
		});
		this.express.get('/public/:key', PublicHandler.getPublic);

		this.express.post('/storage/store', async (req, res) => {
			try {
				const file = await StorageHandler.store(req.body.name, req.body.contentType, req.body.data);
				res.json(file);
			} catch (error) {
				res.json({ error: error.toString() });
			}
		});
		this.express.get('/storage/retrieve/:cid', async (req, res) => {
			const file = await StorageHandler.retrieve(req.params.cid);
			res.redirect('https://' + file?.ipfs);
		});

		// "proxy" fallback so clients dont have to use /public/cid to get files but just /cid
		// this route handles 404 if doc not found
		this.express.get('/:key', PublicHandler.getPublic);
	}
}

export default new App().express;
