import { useDispatch, useSelector } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { addNotification, removeNotification } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdoteService';

const AnecdoteForm = () => {

  const dispatch = useDispatch();

  const state = useSelector(state => state);

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    const notification = `added new anecdote ${content}`
    dispatch(addNotification(notification));
    setTimeout(() => {
      dispatch(removeNotification()) 
    }, 5000);
    dispatch(createAnecdote(content));
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