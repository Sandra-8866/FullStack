import axios from 'axios'

const getWeather = (capital, apiKey) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
  return axios.get(url)
}

export default { getWeather }
