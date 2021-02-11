import axios        from 'axios'

/*axios.defaults.transformResponse = [function (data, headers) {
    return Object.values(JSON.parse(data))[0]
  }]
  */
axios.defaults.withCredentials = true;

axios.defaults.baseURL = "http://campster1234.herokuapp.com"

export default null