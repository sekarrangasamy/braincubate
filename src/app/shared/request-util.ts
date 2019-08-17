import { URLSearchParams, BaseRequestOptions } from '@angular/http';

export const createRequestOption = (req?: any): BaseRequestOptions => {
	const options: BaseRequestOptions = new BaseRequestOptions();
	if (req) {
		const params: URLSearchParams = new URLSearchParams();
		for (const key in req) {
			if (req[key]) {
				params.set(key, req[key]);
			}
		}
		options.search = params;
	}
	return options;
};
