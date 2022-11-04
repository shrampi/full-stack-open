import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdoteService';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

export const getId = () => (100000 * Math.random()).toFixed(0)

// BELOW IS THE REDUX REDUCER / ACTION CREATORS WITHOUT USING TOOLKIT SLICES

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

// export const voteAction = (id) => {
//   return {
//     type: 'VOTE',
//     data: id
//   }
// }

// export const addAction = (anecdote) => {
//   return {
//     type: 'ADD',
//     data: asObject(anecdote)
//   }
// }

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'VOTE':
//       const id = action.data;
//       const anecdoteToChange = state.find(a => a.id === id);
//       const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1};
//       return state.map(a => a.id === id ? changedAnecdote : a);
//     case 'ADD':
//       return state.concat(action.data);
//     default:
//       return state;
//   }
// }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteForAnecdote: (state, action) => {
      const id = action.payload;
      const anecdoteToChange = state.find(a => a.id === id);
      const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1};
      return state.map(a => a.id === id ? changedAnecdote : a); 
    },
    appendAnecdote: (state, action) => {
      return state.concat(action.payload);
    },
    setAnecdotes: (state, action) => {
      return action.payload;
    }
  }
})

export const { voteForAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch(appendAnecdote(newAnecdote));
  }
}

export const incrementVoteFor = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = {...anecdote, votes: anecdote.votes + 1};
    await anecdoteService.update(newAnecdote);
    dispatch(voteForAnecdote(anecdote.id));
  }
}


export default anecdoteSlice.reducer;