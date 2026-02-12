import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'

const apiKey = import.meta.env.VITE_WEATHER_KEY

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState(null)

  // Fetch all countries
  useEffect(() => {
    countryService.getAll().then(response => {
      setCountries(response.data)
    })
  }, [])

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  // Fetch weather when exactly one country is shown
  useEffect(() => {
    if (filteredCountries.length === 1) {
      const capital = filteredCountries[0].capital[0]
      weatherService
        .getWeather(capital, apiKey)
        .then(response => {
          setWeather(response.data)
        })
    }
  }, [filteredCountries])

  const showCountry = (country) => {
    setSearch(country.name.common)
  }

  return (
    <div>
      <h1>Countries</h1>

      <div>
        find countries{' '}
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {filteredCountries.length > 10 &&
        <p>Too many matches, specify another filter</p>
      }

      {filteredCountries.length <= 10 && filteredCountries.length > 1 &&
        filteredCountries.map(country =>
          <div key={country.cca3}>
            {country.name.common}
            <button onClick={() => showCountry(country)}>show</button>
          </div>
        )
      }

      {filteredCountries.length === 1 &&
        <Country country={filteredCountries[0]} weather={weather} />
      }
    </div>
  )
}

const Country = ({ country, weather }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>

      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(lang =>
          <li key={lang}>{lang}</li>
        )}
      </ul>

      <img src={country.flags.png} alt="flag" width="150" />

      {weather &&
        <>
          <h3>Weather in {country.capital[0]}</h3>
          <p>temperature {weather.main.temp} °C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p>wind {weather.wind.speed} m/s</p>
        </>
      }
    </div>
  )
}

export default App
