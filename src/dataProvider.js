import axios from 'axios'
import { stringify } from 'query-string'
import { RESOURCE_API } from './config'
const httpClient = axios.create({
  baseURL: RESOURCE_API,
})

httpClient.interceptors.response.use(res => res.data)

httpClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config['headers'] = { Authorization: `Bearer ${token}` }
  }
  return config
})

export default {
  getList(resource, params) {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort

    const query = {
      sort: JSON.stringify([field, order]),
      filter: JSON.stringify(params.filter),
      perPage,
      page,
    }

    const url = `${resource}?${stringify(query)}`
    return httpClient.get(url)
  },
  getOne(resource, params) {
    return httpClient.get(`${resource}/${params.id}`)
  },
  getMany(resource, params) {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    }
    const url = `${resource}?${stringify(query)}`
    return httpClient.get(url)
  },
  getManyReference(resource, params) {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    }
    const url = `${resource}?${stringify(query)}`

    return httpClient.get(url)
  },
  update(resource, params) {
    return httpClient.put(`${resource}/${params.id}`, params.data)
  },
  updateMany(resource, params) {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    }
    return httpClient.put(`${resource}?${stringify(query)}`, params.data)
  },
  create(resource, params) {
    return httpClient.post(`${resource}`, params.data)
  },
  delete(resource, params) {
    return httpClient.delete(`${resource}/${params.id}`)
  },
  deleteMany(resource, params) {
    const query = {
      filter: JSON.stringify({ ids: params.ids }),
    }
    return httpClient.delete(`${resource}?${stringify(query)}`, params.data)
  },
}
