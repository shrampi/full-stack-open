# FULL STACK OPEN

Deep Dive Into Modern Web Development

https://fullstackopen.com/en/

## Part 7

### React-router

- Traditional web apps with multiple pages just make GET requests for the new page html
- With react, we *could* represent each page with a component, and conditionally check the state to see which page to display
	- each page doesn't have its own address, which makes bookmarking impossible

- install **react-router-dom**
  
		import {
  			BrowserRouter as Router, Routes, Route, Link
		} from "react-router-dom"

- the above imports components that then point to your 'view' components
- useParams() hook lets you access url parameters
	- for instance, each Blog in BlogsList component is pointed to by a Link with url `/blogs/:id`
- useNavigate() hook lets us move between routes (for example, when a user logs in with their credentials, they go back to home)
- useMatch() hook lets you match the current url to a parameterized one, and access those parameters

### Custom Hooks

- we've used useEffect and useState
- we also used useImperativeHandle which allowed for components to forward something to their parent component
- we've used useSelector and useDispatch from the react-redux library, which is the newer version of their connect api

Hooks Limitations:
- don't call inside of loops, conditionals, or nested functions
- can only call from React function components, or from other custom hooks

A custom hook lets you extract reusable component logic.

Lets say we have our Blog form, which was cumbersome with all of the variables and event handlers. We could write the following hook:

	const useField = (type) => {
	  const [value, setValue] = useState('')
	  const onChange = (event) => {
	    setValue(event.target.value)
	  }
	  return {
	    type,
	    value,
	    onChange
	  }
	}

Then we can use it in our form. Each input would have its own state maintained by the hook: 

	const name = useField('text')
		...
		<input>
			type={name.type}
	        value={name.value}
	        onChange={name.onChange} 
		</input>


And even simplify it, since the hook returns all the properties that the input needs:

	<input {...name} /> 