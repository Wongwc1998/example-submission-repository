import { useState } from 'react'



const NumbersDisplay = ({ numbers }) => {
  return numbers.map(number => {
    return (<p key={number.id}>{number.name} {number.number}</p>);
  })
}

const Filter = ({ filter, numbers }) => {
  return (< NumbersDisplay numbers={numbers.filter((number) => number.name.includes(filter))} />);
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
      <div>debug name: {newName}</div>
      <div>debug number: {newNumber}</div>
      <div>debug filter: {filter}</div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Filter filter={filter} numbers={persons} />
    </div>
  )
}

export default App