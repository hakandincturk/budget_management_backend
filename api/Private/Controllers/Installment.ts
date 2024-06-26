/* eslint-disable max-len */
import { Request, Response } from 'express';

import InstallmentService from '../Services/Installment.js';

import { IInstallmentPayBody } from '../../src/models/interfaces/IInstallments.js';
import { IResponseBody } from '../../src/models/interfaces/IResponseBody';

/**
 * @typedef {object} PayInstallmentBody
 * @property { number } id
 * @property { string } date
*/

class Installment {

	/**
	 * GET /private/installment/currentMonth
	 * @tags Private/Installment
	 * @summary get monthly installment
	 * @security JWT
	 */
	static async currentMonth(req: Request, res: Response<IResponseBody>) {
		try {
			const language = req.headers.language?.toString() || 'tr';
			const result = await InstallmentService.currentMonth(language);
			return res.json({ type: true, message: result.message, data: result.data });
		}
		catch (error) {
			throw error;
		}
	}

	/**
	 * GET /private/installment/specificMonth/{year}/{month}
	 * @tags Private/Installment
	 * @summary get monthly installment
	 * @param {number} year.path.required
	 * @param {number} month.path.required
	 * @security JWT
	 */
	static async specificMonth(req: Request, res: Response<IResponseBody>) {
		try {
			const language = req.headers.language?.toString() || 'tr';
			const result = await InstallmentService.specificMonth(Number(req.params.month), Number(req.params.year), language, req.decoded);
			return res.json({ type: true, message: result.message, data: result.data });
		}
		catch (error) {
			throw error;
		}
	}

	/**
	 * POST /private/installment/pay
	 * @tags Private/Installment
	 * @summary pay installment
	 * @param { PayInstallmentBody } request.body.required
	 * @security JWT
	 */
	static async pay(req: Request<IInstallmentPayBody>, res: Response<IResponseBody>) {
		try {
			const language = req.headers.language?.toString() || 'tr';
			console.log(req.body);
			const result = await InstallmentService.pay(req.body, language);
			return res.json({ type: true, message: result.message });
		}
		catch (error) {
			throw error;
		}
	}

}

export default Installment;