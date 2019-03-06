import axios from 'axios'

let host = 'http://127.0.0.1:8000'

// 登录
export const login = params => { return axios.post(`${host}/login/`, params) }

// 验证码
export const getVerifyCode = parmas => { return axios.post(`${host}/codes/`, parmas) }

// 注册
export const registUser = parmas => { return axios.post(`${host}/regist/`, parmas) }

// 获取一级分类类别信息
export const getFirstCategories = params => {
  if ('id' in params) {
    return axios.get(`${host}/categories1/` + params.id + '/')
  } else {
    return axios.get(`${host}/categories1/`, params)
  }
}

// 获取二级分类类别信息
export const getSecondCategories = params => {
  if ('id' in params) {
    return axios.get(`${host}/categories2/` + params.id + '/')
  } else {
    return axios.get(`${host}/categories2/`, params)
  }
}

// 获取分类标签信息
export const getTags = params => {
  if ('id' in params) {
    return axios.get(`${host}/tags/` + params.id + '/')
  } else {
    return axios.get(`${host}/tags/`, params)
  }
}

// 获取专辑列表或专辑详情
export const getAlbums = params => {
  if ('id' in params) {
    return axios.get(`${host}/albums/` + params.id + '/')
  } else {
    return axios.get(`${host}/albums/`, params)
  }
}

// 获取文章列表或文章详情
export const getArticles = params => {
  if ('id' in params) {
    return axios.get(`${host}/articles/` + params.id + '/')
  } else {
    return axios.get(`${host}/articles/`, params)
  }
}
