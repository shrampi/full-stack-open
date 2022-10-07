import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const ControlledTextInput = (props) => {
  return (
    <div>
      {props.label}<input onChange={props.onChange} value={props.value} />
    </div>
  );
}

const AddContactForm = (props) => {
  return (
    <div>
      <h2>Add New Contact</h2>
      <form onSubmit={props.addName}>
        <ControlledTextInput label="name:" onChange={props.onNameChange} value={props.name} />
        <ControlledTextInput label="number:" onChange={props.onNumberChange} value={props.number} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
}

const NumbersList = ({ persons, filter }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {
        persons.filter(person => person.name.toLowerCase().indexOf(filter) !== -1)
        .map(person =>
          <PersonInformation key={person.name} person={person} />
        )
      }
    </div>
  );
}

const PersonInformation = ({ person }) => (<div>{person.name} {person.number}</div>)

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const hook = () => {
    axios.get('http://localhost:3001/persons')
      .then((response) => {setPersons(response.data)});
  }

  useEffect(hook, []);

  const addName = (event) => {
    event.preventDefault();
    if (persons.map(p => p.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    if (!newName) {
      alert("Name cannot be blank");
      return;
    }
    if (!newNumber) {
      alert("Number cannot be blank");
      return;
    }
    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName('');
    setNewNumber('');
  }

  const updateNameInput = (event) => {
    setNewName(event.target.value);
  }

  const updateNumberInput = (event) => {
    setNewNumber(event.target.value);
  }

  const updateFilterInput = (event) => {
    setFilter(event.target.value.toLowerCase()  );
  }

  //const personsToDisplay = persons.filter()

  return (
    <div>
      <h1>Phonebook</h1>
      <ControlledTextInput onChange={updateFilterInput} value={filter} />
      <AddContactForm addName={addName} onNameChange={updateNameInput} onNumberChange={updateNumberInput} name={newName} number={newNumber} />
      <NumbersList persons={persons} filter={filter} />
    </div>
  )
}

export default App