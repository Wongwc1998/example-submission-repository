import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const NumbersDisplay = ({ numbers }) => {
  return numbers.map(number => {
    return (<p key={number.id}>{number.name} {number.number}</p>);
  })
}

const Persons = ({ filter, numbers }) => {
  return (< NumbersDisplay numbers={numbers.filter((number) => number.name.includes(filter))} />);
}

const Filter = ({ filter, setFilter }) => {
  return (<div>
    filter shown with <input value={filter} onChange={(e) => setFilter(e.target.value)} />
  </div>);
}

const PersonForm = ({ addName, newName, setNewName, newNumber, setNewNumber }) => {
  return (<form onSubmit={addName}>
    <div>
      name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
    </div>
    <div>number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>);
}

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, []);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const addName = (event) => {
    event.preventDefault();
    if (persons.some((element) => element.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    }
    else {
      const newPerson = {
        name: newName, number: newNumber
      }
      personService.create(newPerson)
        .then(response => {
          console.log(response);
          setPersons(persons.concat(response.data))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons filter={filter} numbers={persons} />
    </div>
  )

}

export default App

