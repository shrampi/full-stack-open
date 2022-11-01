import { useDispatch, useSelector } from 'react-redux';
import { addAction } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {

  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    dispatch(addAction(event.target.content.value));
  }

  return (
    <form onSubmit={addAnecdote}>
      <div><input name='content' /></div>
      <button type='submit'>create</button>
    </form>
  )
}

export default AnecdoteForm;