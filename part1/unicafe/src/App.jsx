import { useState } from 'react'

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad, veryGood }) => {
  const total = good + neutral + bad + veryGood

  if (total === 0) {
    return <p>No feedback given</p>
  }

  // scoring logic
  // very good = 2
  // good = 1
  // neutral = 0
  // bad = -1
  const average =
    (veryGood * 2 + good * 1 + bad * -1) / total

  const positive =
    ((veryGood + good) / total) * 100

  return (
    <table>
      <tbody>
        <StatisticLine text="very good" value={veryGood} />
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average.toFixed(2)} />
        <StatisticLine text="positive" value={positive.toFixed(1) + " %"} />
      </tbody>
    </table>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [veryGood, setVeryGood] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>

      <Button text="very good" onClick={() => setVeryGood(veryGood + 1)} />
      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" onClick={() => setBad(bad + 1)} />

      <h1>Statistics</h1>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        veryGood={veryGood}
      />
    </div>
  )
}

export default App

