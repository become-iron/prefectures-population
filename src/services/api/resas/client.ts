import axios from "axios"

const apiKeyHeader = "X-API-KEY"

export const resasClient = axios.create({
  baseURL: "https://opendata.resas-portal.go.jp/api/v1",
  headers: {
    [apiKeyHeader]: import.meta.env.VITE_RESAS_API_KEY,
  },
})

export class ResasService {
  static get hasApiKey() {
    return !!resasClient.defaults.headers[apiKeyHeader]
  }

  static setApiKey(apiKey: string) {
    resasClient.defaults.headers[apiKeyHeader] = apiKey
  }
}
