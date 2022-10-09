import { useState } from 'react';
import { useEffect } from 'react';
import phonebookService from './services/phonebook';
import ControlledTextInput from './components/ControlledTextInput';
import AddContactForm from './components/AddContactForm';
import PersonList from './components/PersonList.js';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');


  const hook = () => {
    phonebookService.getAll()
      .then(data => setPersons(data));
  }

  useEffect(hook, []);

  const addPerson = (event) => {
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

    const newID = Math.max(persons.map(person => person.id)) + 1;
    const newPerson = { name: newName, number: newNumber, id: newID };

    phonebookService.create(newPerson)
      .then(data => setPersons(persons.concat(data)));

    // setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName('');
    setNewNumber('');
  }

  const deletePerson = (person) => {
    if (window.confirm(`Are you sure your want to delete ${person.name}?`)) {
      phonebookService.deletePerson(person);
      setPersons(persons.filter(p => p.id !== person.id)); 
    }
  }

  const updateNameInput = (event) => {
    setNewName(event.target.value);
  }

  const updateNumberInput = (event) => {
    setNewNumber(event.target.value);
  }

  const updateFilterInput = (event) => {
    setFilter(event.target.value.toLowerCase());
  }

  const personsToDisplay = 
    persons.filter(person => person.name.toLowerCase().indexOf(filter) !== -1)

  return (
    <div>
      <h1>Phonebook</h1>
      <ControlledTextInput onChange={updateFilterInput} value={filter} />
      <AddContactForm addName={addPerson} onNameChange={updateNameInput} onNumberChange={updateNumberInput} name={newName} number={newNumber} />
      <PersonList persons={personsToDisplay} deletePerson={deletePerson} />
    </div>
  )
}

export default App