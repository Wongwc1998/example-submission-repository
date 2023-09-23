import { useState } from 'react'

const NumbersDisplay = ({ numbers }) => {
  return numbers.map(number => {
    return (<p key={number.name}>{number.name} {number.number}</p>);
  })
}

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
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
      <h2>Phonebook</h2>
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
      <NumbersDisplay numbers={persons} />
    </div>
  )
}

export default App