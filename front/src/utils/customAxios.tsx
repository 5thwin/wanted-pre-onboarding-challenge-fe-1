import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getLocalStorage } from './localStorage';

const customAxios: AxiosInstance = axios.create({
	baseURL: 'http://localhost:8080',
	headers: {
		'Content-Type': 'application/json',
	},
});

customAxios.interceptors.request.use(
	function (config: AxiosRequestConfig) {
		const token = getLocalStorage("token");
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	})

export { customAxios as api };
