import { AxiosRequestConfig } from "./types"
export default function xhr(config: AxiosRequestConfig) {
  const { data = null, url, method = "get" } = config

  const request = new XMLHttpRequest()

  // 第三个参数 async 表示是否异步执行操作
  request.open(method.toUpperCase(), url, true)

  request.send(data)
}
