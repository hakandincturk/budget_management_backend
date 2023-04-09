/* eslint-disable max-len */
import { Request, Response } from 'express';
import AuthService from '../Services/Auth.js';

import { IAuthLoginBody } from '../../src/models/interfaces/IAuthLoginBody.js';
import { IResponseBodyWithData, IResponseBodyWithoutData } from '../../src/models/interfaces/IResponseBody.js';

class Auth{

	/**
	 * User model
	 * @typedef {object} LoginRequest
	 * @property {string} email - The name
	 * @property {string} password - The surname
	 */

	/**
	 * POST /auth/login
	 * @tags Auth
	 * @summary login
	 * @param { LoginRequest } request.body.required - User model
	 * @return { object } 200 - Success message
	 */
	static async login(req: Request<IAuthLoginBody, object>, res: Response<IResponseBodyWithData, IResponseBodyWithoutData>){
		try {
			const language = req.headers.language?.toString() || 'tr';
			const result = await AuthService.login(req.body, language);
			return res.json({ type: true, message: result.message, data: result.data });
		}
		catch (error) {
			throw error;
		}
	}

}

export default Auth;