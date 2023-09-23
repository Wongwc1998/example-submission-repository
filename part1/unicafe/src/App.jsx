import { useState } from 'react'

const StatisticLine = ({ text, value, sign }) => {
  return (
    <tr><td>
      {text}
    </td>
      <td>
        {sign ?  `${value} ${sign}` : value}
      </td>
    </tr>
  )
}

// a proper place to define a component
const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>statistics</th>
        </tr>
      </thead>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average / total || 0} />
        <StatisticLine text="positive" value={positive / total * 100 || 0} sign="%" />
      </tbody>
    </table>
  )
}

const Button = ({ buttonText, onClickHandler }) => {
  return (
    <button onClick={onClickHandler}>{buttonText}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button buttonText="good"
        onClickHandler={() => {
          setGood(good + 1);
          setTotal(total + 1);
          setAverage(average + 1);
          setPositive(positive + 1);
        }}>good</Button>
      <Button buttonText="neutral"
        onClickHandler={() => {
          setNeutral(neutral + 1);
          setTotal(total + 1);
        }}>neutral</Button>
      <Button buttonText="bad"
        onClickHandler={() => {
          setBad(bad + 1);
          setTotal(total + 1);
          setAverage(average - 1);
        }}>bad</Button>
      {total === 0 ? <p>no feedback given</p> :
        <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
      }
    </div>
  )
}

export default App;