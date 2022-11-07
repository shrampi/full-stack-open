import { useState, useEffect } from 'react'
import axios from 'axios'



const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const getUrl = (fullName) => {
    return `https://restcountries.com/v3.1/name/${fullName}?fullText=true`
  }

  useEffect(() => {
    if (name) {
      console.log(`retrieving country ${name}`);
      axios.get(getUrl(name))
        .then(response => setCountry(response.data[0]))
        .catch(error => {
          console.log(`unable to find country ${name}`);
          setCountry(null);
        });
    }

  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>
  }
  console.log(country);
  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>population {country.population}</div>
      <div>capital {country.capital}</div>
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
