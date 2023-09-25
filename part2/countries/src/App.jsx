import { useState, useEffect } from 'react'
import axios from 'axios'
import countriesService from './services/countries'

const api_key = import.meta.env.VITE_API_KEY;

const CountriesDisplay = ({ filter, countries, shownArray, setShownArray }) => {
  const [weather, setWeather] = useState(null);
  console.log(api_key);
  const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(filter));
  useEffect(() => {
    if (filteredCountries.length === 1) {
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${filteredCountries[0].capital}&appid=${api_key}&units=metric`;

      axios.get(apiURL)
        .then((response) => {
          setWeather(response.data);
        })
        .catch(error => {
          console.error("Error fetching weather data: ", error);
          setWeather(null);
        });
    } else {
      setWeather(null);
    }
  }, [filter]);
  if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    return (<div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area} km<sup>2</sup></div>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt="flag" width="100" height="100" />
      {weather && (
        <div>
          <h2>Weather in {country.capital[0]}</h2>
          <p>Temperature {weather.main.temp} Celsius</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} />
          <p>Wind {weather.wind.speed} m/s</p>
        </div>)
      }
    </div >);
  }
  else if (filteredCountries.length < 10) {
    console.log(shownArray);
    return filteredCountries.map((country, index) => {
      if (shownArray[index] === true) {
        return (
          <div key={country.name.common}>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital[0]}</div>
            <div>area {country.area} km<sup>2</sup></div>
            <h2>languages</h2>
            <ul>
              {Object.values(country.languages).map((language) => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt="flag" width="100" height="100" />
          </div >
        );
      }
      else {
        return (<div key={country.name.common}>
          {country.name.common}
          <button onClick={() => {
            console.log(shownArray);
            setShownArray(shownArray.map((value, index2) => index2 === index ? true : value));
          }}>show</button>
        </div>);
      }
    }
    );
  }
  else {
    return <div>Too many matches, specify another filter</div>
  }

}

const App = () => {
  console.log(api_key);
  const [input, setInput] = useState('')
  const [countries, setCountries] = useState([])
  const [shownArray, setShownArray] = useState(Array(10).fill(false))
  useEffect(() => {
    countriesService
      .getAll()
      .then(response => {
        setCountries(response.data)
        console.log(response.data);
      })
  }, []);

  return (
    <div>
      find countries <input value={input} onChange={(e) => setInput(e.target.value)} />
      <CountriesDisplay filter={input} countries={countries} shownArray={shownArray} setShownArray={setShownArray} />
    </div>
  )

}

export default App