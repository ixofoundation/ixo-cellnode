import * as PublicService from '../services/PublicService.js';

const fileTypes = process.env.FILE_TYPES || [''];

export const createPublic = async (args: any) => {
	if (!fileTypes.includes(args.contentType)) {
		return 'Invalid File Type';
	}
	return PublicService.createPublic(args.contentType, args.data, args.key);
};

export const fetchPublic = async (args: any) => {
	try {
		const res = await PublicService.getPublic(args.key);
		if (res) {
			return res;
		} else {
			throw new Error('Record not found');
		}
	} catch (error) {
		console.error(' image fetch error ' + error);
		return;
	}
};

export const getPublic = async (req: any, res: any) => {
	const pub = await fetchPublic(req.params);
	if (pub) {
		const buf = Buffer.from(pub.data, 'base64');
		res.writeHead(200, {
			'Content-Type': pub.contentType,
			'Content-Length': buf.length,
		});
		res.end(buf);
	} else {
		res.status(404).send('Not found');
	}
};
