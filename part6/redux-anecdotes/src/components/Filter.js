import { useDispatch, useSelector } from "react-redux"
import { updateFilter } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(updateFilter(event.target.value));
  }
  const style = {
    marginBottom: 10
  }
  
  const filter = useSelector(state => state.filter);

  return (
    <div style={style}>
      filter <input onChange={handleChange} value={filter} />
    </div>
  )
}

export default Filter