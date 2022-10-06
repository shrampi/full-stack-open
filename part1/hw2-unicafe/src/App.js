import { useState } from 'react';

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ good, neutral, bad }) => {
  if (good || neutral || bad) {
    let all = good + neutral + bad;
    let average = (good - bad) / (good + neutral + bad);
    let positive = good / (good + neutral + bad) * 100;
    return (
      <table>
        <tbody>
          <tr><StatisticLine text="good" value={good} /></tr>
          <tr><StatisticLine text="neutral" value={neutral} /></tr>
          <tr><StatisticLine text="bad" value={bad} /></tr>
          <tr><StatisticLine text="all" value={all} /></tr>
          <tr><StatisticLine text="average" value={average} /></tr>
          <tr><StatisticLine text="positive" value={positive} /><td>%</td></tr>
        </tbody>  
      </table>
    );
  }
  return (<div>No feedback given.</div>);
}

const StatisticLine = (props) => {
  return (<td>{props.text} {props.value}</td>);
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1);
  const incrementNeutral = () => setNeutral(neutral + 1);
  const incrementBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="good" onClick={incrementGood} />
      <Button text="neutral" onClick={incrementNeutral} />
      <Button text="bad" onClick={incrementBad} />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
