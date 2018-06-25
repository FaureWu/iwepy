import wepy from 'wepy'
import HTTP_ERROR from '@/constants/HTTP_ERROR'

function checkStatus(response) {
  if (response.statusCode >= 200 && response.statusCode < 300) {
    return response
  }

  const errortext =
    HTTP_ERROR[response.statusCode] || `ERROR CODE: ${response.statusCode}`
  const error = new Error(errortext)
  error.response = response
  throw error
}

function checkSuccess(data) {
  if (typeof data === 'string') {
    return data
  }

  if (data.code === '200' || data.code === 'SUCCESS') {
    return data
  }

  const error = new Error(data.message)
  error.data = data
  throw error
}

function throwError(err) {
  throw err
}

function replaceColonUrl(options) {
  let url = options.url
  const params = options.data

  if (typeof params !== 'object') {
    return options
  }

  const reg = /\/:(\w+)/
  let match = reg.exec(url) || []
  while (match[1]) {
    if (params[match[1]]) {
      url = url.replace(match[0], `/${params[match[1]]}`)
      delete params[match[1]]
    }

    match = reg.exec(url) || []
  }

  return { ...options, url, data: params }
}

const _request = options =>
  wepy
    .request(replaceColonUrl(options))
    .then(checkStatus)
    .then(response => response.data)
    .then(checkSuccess)
    .catch(throwError)

const _get = (url, params = {}, options = {}) =>
  _request({
    ...options,
    url,
    data: params,
    method: 'GET',
  })

const _post = (url, params = {}, options = {}) =>
  _request({
    ...options,
    url,
    data: params,
    method: 'POST',
  })

const _delete = (url, params = {}, options = {}) =>
  _request({
    ...options,
    url,
    data: params,
    method: 'DELETE',
  })

export default {
  request: _request,
  get: _get,
  post: _post,
  delete: _delete,
}
