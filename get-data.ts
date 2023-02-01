import wthrForecastDataSet from './wthrforecastdataset.js';
import { API_URL } from './index.js';
import fetchWithProxy from 'node-fetch-with-proxy';

//Used node-fetch-with-proxy to work behind proxy
const getWeatherForecastData = async (): Promise<wthrForecastDataSet> => {
    const response = await fetchWithProxy(API_URL);
    const wdata = (await response.json()) as Promise<wthrForecastDataSet>;
    if (!response.ok) {
        return Promise.reject(new Error(response.statusText));
    }
    return wdata;
};

export default getWeatherForecastData;
