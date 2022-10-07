import { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBar = ({ onChange, value }) => {
  return (
    <div>
      find countries: <input onChange={onChange} value={value} />
    </div>
  );
}

const Results = ({ filter, countries }) => {
  let filteredCountries = countries.filter(
    c => c.name.common.toLowerCase().indexOf(filter) !== -1
  );

  if (filteredCountries.length === 0) {
    return (<div>No countries match criteria</div>);
  }

  if (filteredCountries.length > 10) {
    return (<div>Too many matches, specify another filter.</div>);
  }

  if (filteredCountries.length === 1) {
    return (<CountryInfo country={filteredCountries[0]} />);
  }

  return (
    <div>
      {filteredCountries.map(country =>
        <ResultsLine key={country.name.common} country={country}/>
      )}
    </div>
  );
}

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <h3>Languages:</h3>
      <CountryLanguages country={country} />
      <CountryFlag country={country} />
      <Weather country={country} />
    </div>
  );
}

const Weather = ({ country }) => {
  const temp = 0 // TODO: get temp from api
  return(
    <div>
      temperature: {temp} Celsius
      <img alt="weather image" src=""></img>

    </div>
  );
}

const CountryLanguages = ({ country }) => {
  const languages = Object.values(country.languages);
  return (
    <ul>
      {languages.map(lang =>
        <li key={lang}>{lang}</li>
      )}
    </ul>
  );
}

const ResultsLine = ({ country }) => {
  const [shown, setShown] = useState(false);

  if (shown) {
    return (
      <div>
        {country.name.common} <button onClick={() => setShown(!shown)}>hide</button>
        <CountryInfo country={country} />
      </div>
    );
  }

  return (
    <div>
      {country.name.common} <button onClick={() => setShown(!shown)}>show</button>
    </div>
  );
}

const CountryFlag = ({ country }) => {
  console.log(country.flags.png);
  return (<img src={country.flags.png} alt="flag" />)
}

function App() {

  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);

  const countriesHook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      });
  }

  useEffect(countriesHook, []);

  const updateFilter = (event) => {
    setFilter(event.target.value);
  }

  return (
    <div>
      <SearchBar onChange={updateFilter} value={filter} />
      <Results filter={filter} countries={countries} />
    </div>

  );
}

export default App;
