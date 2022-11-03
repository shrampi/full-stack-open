import { useDispatch, useSelector } from 'react-redux';
import { voteForAnecdote } from '../reducers/anecdoteReducer';
import { addNotification, removeNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {

  const dispatch = useDispatch();

  const voteComparison = (anecdote1, anecdote2) => {
    if (anecdote1.votes < anecdote2.votes) {
      return 1;
    }
    if (anecdote1.votes > anecdote2.votes) {
      return -1;
    }
    return 0;
  }

  const anecdotes = useSelector(
    state => {
      return [...state.anecdotes]
        .sort(voteComparison)
        .filter(a => a.content.includes(state.filter))
    }
  );
  
  // TODO: this needs to make a put request to server
  const vote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote.id));
    dispatch(addNotification(`voted for ${anecdote.content}`));
    setTimeout(() => { dispatch(removeNotification()) }, 5000);
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnecdoteList;