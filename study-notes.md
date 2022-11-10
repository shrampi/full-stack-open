# FULL STACK OPEN

Deep Dive Into Modern Web Development

https://fullstackopen.com/en/

## Part 7

### React-router
https://fullstackopen.com/en/part7/react_router

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
https://fullstackopen.com/en/part7/custom_hooks

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


### More about styles
https://fullstackopen.com/en/part7/more_about_styles

- materialUi and bootstrap frameworks both have react libraries that can be useful
	- can also use traditional bootstrap inline class names

- styled components are another option, where you can assign styles to components with 'tagged template literals'

		~ npm install styled-components

		import styled from 'styled-components'

		const Button = styled.button`
		  background: Bisque;
		  font-size: 1em;
		  margin: 1em;
		  padding: 0.25em 1em;
		  border: 2px solid Chocolate;
		  border-radius: 3px;
		`

### Webpack
https://fullstackopen.com/en/part7/webpack#bundling

Steps to create custom webpack:
- use webpack to bundle code into one `build` folder
- add babel loader to interpret JSX
- install core-js and regenerator-runtime dependencies
- configure babel transpiler to turn code into old javascript
- add CSS and style loader to inject style directly into bundled javascript
- configure webpack dev server to let us easily see changes without having to rebuild every time
	- the result of the bundling then only exists in memory
-  configure a source map, which makes sure errors point to the right place in our unbundled code
	- this also lets us use the browser debugger
- configure a minifier, which greatly reduces file size of bundled code 
	- we use UglifyJS
- we can add webpack configuration to provide global constants to our bundled code
	- with this, we can specify that if run locally the backend is located at localhost:3001 or whatever, and in production the backend is at our heroku url. 
- add Polyfill to make stuff compatible with internet explorer
	- in our case, we can use Polyfill promises
- create-react-app stores configuration behind the scenes. We can `eject` it to store all config in a visible directory, but there's no way to automatically reverse this


### Class Components, Miscellaneous
https://fullstackopen.com/en/part7/class_components_miscellaneous

Basic class component with state:

	class App extends React.Component {
	  constructor(props) {
	    super(props)

	    this.state = {      
			anecdotes: [],      
			current: 0    
		}  
	}

	  render() {
	    if (this.state.anecdotes.length === 0) {      
			return <div>no anecdotes...</div>    
		}
	    return (
	      	<div>
	        	<h1>anecdote of the day</h1>
	        <div>          
				{this.state.anecdotes[this.state.current].content}        
			</div>        
				<button>next</button>      
			</div>
	    )
	  }
	}

- we use lifecycle methods like `componentDidMount` to, say, fetch data from the server, rather than effect hooks
- this.setState() will update the state object and re-render

### Organization of code
There's no right way. See this article: https://medium.com/hackernoon/the-100-correct-way-to-structure-a-react-app-or-why-theres-no-such-thing-3ede534ef1ed

Here's an example of putting both server and client code in same directory: https://github.com/fullstack-hy2020/create-app

### Changes on server

Our react app doesn't automatically refresh when changes to the server are made. We could manually *poll* the server with a setInterval command, or we can use a WebSocket, which is a 2-way communication channel.
	- Socket.io is a popular library for this

### Virtual DOM

- normal javascript access the DOM API provided by the browser
- React never manipulates the DOM, instead the components make up a virtual DOM in memory
- with every re-render, a new virtual DOM is defined. React computes the optimal way to make changes to the real DOM from that

### The Role of React

- react is the View in MVC
- with Flux architecture (redux), then react is even more focused on views
	- we can think of the state as the Model. Then redux handles all the controller/model stuff with action creators/store 

### Application Security

Here is a list of the most common web app threats: https://owasp.org/www-project-top-ten/

- Injection attacks:
	- don't mix logic and data, use parameterized queries
	- mongoose sanitizes queries
- Cross-site scripting (XSS):
	- injecting malicious javascript code
	- React sanitizes data in variables
	- use npm-check-updates tool to make sure dependencies have all security updates
	- can also use npm audit
- Broken Authentication / Access Control
	- our token based system is robust on https

- The single most import rule is never trust data from the browser. This includes:
	- data in url parameters
	- GET / POST request parameters
	- http headers and cookies
	- user uploaded files

- Helmet is a good library that provides middleware to eliminate vulnerabilities in Express

### Best Practices
See here: https://reactpatterns.com/