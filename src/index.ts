import { buildURL } from "./helpers/url"
import { AxiosRequestConfig } from "./types"
import xhr from "./xhr"

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

// 处理config 的配置
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
}

// 处理url
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

export default axios
