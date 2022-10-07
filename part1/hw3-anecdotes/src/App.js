import { useState } from 'react'

const Button = ({ text, onClick }) => (<button onClick={onClick}>{text}</button>)

const VoteCount = ({ count }) => (<div>has {count} votes</div>)

const AnecdoteDisplay = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <div>{props.anecdote}</div>
      <VoteCount count={props.votes} />
    </div>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    [0, 0, 0, 0, 0, 0, 0]
  );
  const [maxIndex, setMaxIndex] = useState(0);

  const pickNewAnecdote = () => {
    let i = Math.floor(Math.random() * anecdotes.length);
    setSelected(i);
  }

  const incrementSelectedAnecdote = () => {
      let v = [...votes];
      v[selected] += 1;
      if (v[selected] > v[maxIndex]) {
        setMaxIndex(selected);
      }
      setVotes(v);
  }

  return (
    <div>
      <AnecdoteDisplay title="Anecdote of the day" anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button text="Vote" onClick={incrementSelectedAnecdote} />
      <Button text="Randomize" onClick={pickNewAnecdote} />
      <AnecdoteDisplay title="Anecdote with most votes" anecdote={anecdotes[maxIndex]} votes={votes[maxIndex]} />
    </div>
  )
}

export default App
