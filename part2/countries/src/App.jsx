import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const CountriesDisplay = ({ filter, countries, shownArray, setShownArray }) => {
  const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(filter));
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