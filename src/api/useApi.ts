import axios, { AxiosInstance } from "axios";

let api: AxiosInstance;

export function createApi() {
  api = axios.create({
    baseURL: "https://bank.gov.ua/NBUStatService/v1/statdirectory/",
  });

  return api;
}
export function useApi() {
  if (!api) {
    createApi();
  }
  return api;
}

export default useApi;
