import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppins', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const addName = (event) => {
    event.preventDefault();
    console.log('button clicked', event.target);
    if (persons.some((element) => element.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    }
    else {
      setPersons([...persons, { name: newName, number: newNumber }]);
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

