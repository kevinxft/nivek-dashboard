import axios from 'axios'
import { stringify } from 'query-string'
const apiUrl = 'http://localhost:4111/public-service/resource'
const httpClient = axios.create({})

httpClient.interceptors.response.use((res) => res.data)

export default {
  getList(resource, params) {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort

    const query = {
      sort: JSON.stringify([field, order]),
      filter :JSON.stringify(params.filter),
      perPage,
      page
    }

    const url = `${apiUrl}/${resource}?${stringify(query)}`
    return httpClient.get(url)
  },
  getOne(resource, params) {
    return httpClient.get(`${apiUrl}/${resource}/${params.id}`)
  },
  getMany(resource, params) {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    }
    const url = `${apiUrl}/${resource}?${stringify(query)}`
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
    const url = `${apiUrl}/${resource}?${stringify(query)}`

    return httpClient.get(url)
  },
  update(resource, params) {
    return httpClient.put(`${apiUrl}/${resource}/${params.id}`, params.data)
  },
  updateMany(resource, params) {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    }
    return httpClient.put(
      `${apiUrl}/${resource}?${stringify(query)}`,
      params.data
    )
  },
  create(resource, params) {
    return httpClient.post(`${apiUrl}/${resource}`, params.data)
  },
  delete(resource, params) {
    return httpClient.delete(`${apiUrl}/${resource}/${params.id}`)
  },
  deleteMany(resource, params) {
    const query = {
      filter: JSON.stringify({ ids: params.ids }),
    }
    return httpClient.delete(
      `${apiUrl}/${resource}?${stringify(query)}`,
      params.data
    )
  },
}
