import { useDispatch } from 'react-redux';
import { addAction } from '../reducers/anecdoteReducer';
import { addNotification, removeNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {

  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    dispatch(addNotification(`added new anecdote ${content}`));
    setTimeout(() => { dispatch(removeNotification()) }, 5000);
    dispatch(addAction(content));
    event.target.content.value = '';
  }

  return (
    <form onSubmit={addAnecdote}>
      <div><input name='content' /></div>
      <button type='submit'>create</button>
    </form>
  )
}

export default AnecdoteForm;