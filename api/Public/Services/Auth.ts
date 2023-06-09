import 'dotenv';
import jwt from 'jsonwebtoken';
import {Users} from '../../src/models/entities/Users.js';
import { dataSource } from '../../app.js';
import { IAuthLoginBody } from '../../src/models/interfaces/IAuthLoginBody.js';

import { encryptPassword } from '../../helpers/General.js';
import { Lang } from '../../src/config/enums.js';

class Auth {
	
	static async login(body: IAuthLoginBody, language: string){
		try {
			const res = await dataSource.transaction(async (transactionManager) => {
				const result = await transactionManager.findOne(Users, {
					where: {
						email: body.email,
						password: encryptPassword(body.password),
						is_removed: false
					}
				});
	
				if (!result) {
					return { 
						type: false, 
						message: Lang[language].Auth.error.wrongEmail
					};
				}
	
				const decode = {
					user_id: result.id
				};
				
				const TOKEN_SECRET = (process.env.TOKEN_SECRET)?.toString() || '123456';
	
				const token = jwt.sign(decode, TOKEN_SECRET, {expiresIn: '1days'});
	
				return { type: true, message: Lang[language].Auth.success.login, data: {token} };
			});
			return res;
		}
		catch (error) {
			throw error;
		}
	}

}

export default Auth;