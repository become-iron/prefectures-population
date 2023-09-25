import axios from "axios"
import { API_KEY_HEADER_NAME } from "@/services/api/resas/constants"

export const resasClient = axios.create({
  baseURL: "https://opendata.resas-portal.go.jp/api/v1",
  headers: {
    [API_KEY_HEADER_NAME]: import.meta.env.VITE_RESAS_API_KEY,
  },
})

export class ResasService {
  static get hasApiKey() {
    return !!resasClient.defaults.headers[API_KEY_HEADER_NAME]
  }

  static setApiKey(apiKey: string) {
    resasClient.defaults.headers[API_KEY_HEADER_NAME] = apiKey
  }
}
