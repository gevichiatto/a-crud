import axios from 'axios';
import store from '../store';

const apiRestHost = process.env.VUE_APP_BACKEND_HOST || 'localhost:3000';

const client = axios.create({
	baseURL: `//${apiRestHost}/`,
	json: true,
});

export default {
	serverURL: `//${apiRestHost}`,
	format(method, resource, page, data, withoutPaging = false, customFilter = {}, avoidCache = true) {
		page = page || 1;

		if (method.toUpperCase() == 'GET') {
			resource += (resource && resource.indexOf('?') > -1) ? '&' : '?';

			if (withoutPaging) {
				resource += '&withoutPaging=true';
			} else {
				resource += `&page=${page}`;
			}

			if (avoidCache) {
				const timestamp = (new Date()).getTime();
				resource += `&t=${timestamp}`;
			}

			if (data) {
				if (typeof data === 'object') {
					Object.keys(data).forEach((element) => {
						resource += `&${element}=${data[element]}`;
					});
				}
			}
			if (customFilter) {
				if (typeof customFilter === 'object') {
					Object.keys(customFilter).forEach((element) => {
						resource += `&${element}=${customFilter[element]}`;
					});
				}
			}
		}
		return resource;
	},

	getUrl(method, resource, page, data, withoutPaging = false, customFilter = {}, avoidCache = true) {
		return `//${apiRestHost}${this.format(method, resource, page, data, withoutPaging, customFilter, avoidCache)}`;
	},

	// eslint-disable-next-line max-len
	async execute(method, resource, page, data, withoutPaging = false, customFilter = {}, headers = {}, avoidCache = true) {
		return client({
			method,
			url: this.format(method, resource, page, data, withoutPaging, customFilter, avoidCache),
			data,
			headers,
		}).then((req) => {
			if (method === 'post' || method === 'put') {
				const { genericData } = store.state;
				const [, route] = resource.split('/');
				if (genericData[route]) {
					return window.location.reload();
				}
			}
			return req.data;
		}).catch((error) => {
			return Promise.reject(error);
		});
	},
};
