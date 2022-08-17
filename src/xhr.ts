import { createError } from "./helpers/error"
import { parseHeaders } from "./helpers/headers"
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "./types"
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = "get",
      headers,
      responseType,
      timeout
    } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    // 初始化一个请求  第三个参数 async 表示是否异步执行操作
    request.open(method.toUpperCase(), url, true)

    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === "content-type") {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData =
        responseType !== "text" ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }

      handleResponse(response)
    }
    // 网络错误
    request.onerror = function handleError() {
      reject(createError("Network Error", config, null, request))
    }
    // 超时错误
    request.ontimeout = function handleTimeout() {
      reject(
        createError(
          `Timeout of ${timeout} ms exceeded`,
          config,
          "ECONNABORTED",
          request
        )
      )
    }

    request.send(data)

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
