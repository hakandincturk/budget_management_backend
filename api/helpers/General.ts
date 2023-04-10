import { Request, Response, NextFunction } from 'express';
import md5 from 'md5';

export const loggerMiddleware = (request: Request, response: Response, next: NextFunction) => {
	console.log(`${request.method} ${request.path}`);
	next();
};

export const errorHandler = async (nodeEnv: string, response: Response) => {
	if (nodeEnv !== 'test' && nodeEnv !== 'jenkins') {
		process.on('uncaughtException', (err) => {
			console.log('Caught exception\n' + err.stack + '\n');
			const response_body = {
				type: false,
				message: 'Sistemsel bir hata oluştu, lütfen hatayı yetkililere bildiriniz.',
				error: err.message,
				stack: err.stack
			};
				
			if (response && !response.headersSent) {
				return response.status(500).json(response_body);
			}
		});
	}
};

export const generateUUID = () => {
	return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		const r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
};

export const encryptPassword = (password: string) => {
	const passwordSalt: string = process.env.PASSWORD_SALT || '';
	return md5(md5(password) + md5(passwordSalt));
};
