import { useApi } from "@/api/useApi";
import { CurrencyModel } from "@/models/CurrencyModel";

const api = useApi();

async function getCurrs(): Promise<Array<CurrencyModel>> {
  const response = await api.get<Array<CurrencyModel>>("exchange?json");
  return response.data;
}

async function getCurrency(convertFrom: string): Promise<CurrencyModel> {
  const response = await api.get<CurrencyModel>(
    `exchange?valcode=${convertFrom}&json`
  );
  return response.data;
}

export function useCurrencyService() {
  return {
    getCurrs,
    getCurrency,
  };
}
