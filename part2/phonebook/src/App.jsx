import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notify'>
      {message}
    </div>
  )
}

const DeleteButton = ({ person, deleteEffect }) => {
  return (<button onClick={() => {
    console.log(person);
    if (confirm(`delete ${person.name}?`)) {
      personService.deletePerson(person.id);
      deleteEffect(person.id);
    }
  }}>delete</button>);
}

const PersonsDisplay = ({ persons, deleteEffect }) => {
  return persons.map(person => {
    return (<div key={person.id}>
      {person.name} {person.number} {' '}
      <DeleteButton person={person} deleteEffect={deleteEffect} />
    </div>
    );
  })
}

const Persons = ({ filter, persons, deleteEffect }) => {
  return (< PersonsDisplay persons={persons.filter((person) => person.name.includes(filter))} deleteEffect={deleteEffect} />);
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
  const [message, setMessage] = useState('')
  const addName = (event) => {
    event.preventDefault();
    if (persons.some((element) => element.name === newName)) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

        const newPerson = {
          name: newName, number: newNumber
        }
        const personID = persons.find(person => person.name === newName).id
        personService.update(personID, newPerson).catch(error => {
          setMessage(`Information of ${newPerson.name} has already been removed from server`);
        })
        setPersons(persons.map(person => person.id !== personID ? person : newPerson));
      }
    }
    else {
      const newPerson = {
        name: newName, number: newNumber
      }
      personService.create(newPerson)
        .then(response => {
          console.log(response);
          setPersons(persons.concat(response.data))
          setMessage(
            `Added ${response.data.name}`
          );
          setTimeout(() => {
            setMessage(null)
          }, 5000);
        })
    }
  }
  const deleteEffect = (id) => {
    setPersons(persons.filter((person) => person.id !== id));
    console.log(persons.filter((person) => person.id !== id));
  }

  return (
    <div>
      <h1>Notes</h1>
      {message === '' ? <div></div> : <Notification message={message} />}
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} deleteEffect={deleteEffect} />
    </div>
  )

}

export default App

